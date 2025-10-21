import React from 'react';
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
import { EmptyState } from '../../components/EmptyState';

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

  const favorites = useAppSelector((s) => s.favorites.ids);
  const cachedProducts = useAppSelector((s) => s.products.items);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavProp>();

  const favoriteProducts = cachedProducts.filter((p) => favorites.includes(p.id));

  const renderItem = ({ item }: { item: Product }) => (
    <View style={{ transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }] }}>
      <ProductCard
        product={item}
        isFavorite={true}
        onToggleFavorite={(id) => dispatch(toggleFavorite(id))}
        onPress={() => navigation.navigate('ProductDetails', { product: item })}
      />
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
