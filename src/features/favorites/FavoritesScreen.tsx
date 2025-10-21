import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, I18nManager } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleFavorite } from '../products/favoritesSlice';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/StackNavigator';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../theme/theme';
import ProductCard from '../products/ProductCard';
import { ProductCardSkeleton } from '../../components/SkeletonLoader';
import { EmptyState } from '../../components/EmptyState';
import { ErrorState } from '../../components/ErrorState';

interface Product {
  id: string;
  title: string;
  price: number;
  thumbnail: string;
  rating: number;
}

type NavProp = NativeStackNavigationProp<RootStackParamList, 'Favorites'>;

const FavoritesScreen: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const colors = theme?.colors || {
    background: '#ffffff',
    text: '#000000',
    textSecondary: '#666666',
  };

  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const favorites = useAppSelector((s) => s.favorites.ids);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavProp>();

  const fetchFavorites = useCallback(async () => {
    if (favorites.length === 0) {
      setFavoriteProducts([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const products = await Promise.all(
        favorites.map(async (id) => {
          const response = await fetch(`http://localhost:3000/products/${id}`);
          return response.json();
        })
      );
      setFavoriteProducts(products);
    } catch (error) {
      console.error('Error fetching favorites:', error);
      setError('Failed to load favorites. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [favorites]);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const renderItem = ({ item }: { item: Product }) => (
    <View style={{ transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }] }}>
      <ProductCard
        product={item}
        isFavorite={true}
        onToggleFavorite={(id) => dispatch(toggleFavorite(id))}
        onPress={() => navigation.navigate('ProductDetails', { id: item.id })}
      />
    </View>
  );

  const renderSkeletons = () => (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 8 }}>
      {[...Array(4)].map((_, i) => <ProductCardSkeleton key={i} />)}
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top', 'left', 'right']}>
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            Favorites ({favorites.length})
          </Text>
        </View>

        {loading ? (
          renderSkeletons()
        ) : error ? (
          <ErrorState message={error} onRetry={fetchFavorites} textColor={colors.text} />
        ) : (
          <FlatList
            data={favoriteProducts}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            numColumns={2}
            contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 8, paddingTop: 10 }}
            ListEmptyComponent={
              <EmptyState
                emoji="💔"
                title="No Favorites"
                message="Start adding products to your favorites!"
                textColor={colors.text}
              />
            }
            style={{ transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }] }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  title: { fontSize: 24, fontWeight: 'bold' },
});

export default FavoritesScreen;
