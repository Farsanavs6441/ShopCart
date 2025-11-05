import React, { useCallback, useEffect, useState, useRef } from 'react';
import {
  View,
  FlatList,
  RefreshControl,
  Text,
  StyleSheet,
  I18nManager,
  TouchableOpacity,
  TextInput,
  Platform,
  UIManager,
  LayoutAnimation,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getProducts } from '../../api/products';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleFavorite } from './favoritesSlice';
import { setProducts as setCachedProducts } from './productsSlice';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/StackNavigator';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../theme/theme';
import ProductCard from './ProductCard';
import PriceRangeSelector from '../../components/RangeSlider';
import { ProductCardSkeleton } from '../../components/SkeletonLoader';
import { EmptyState } from '../../components/EmptyState';
import { ErrorState } from '../../components/ErrorState';
import { OfflineBanner } from '../../components/OfflineBanner';

interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  thumbnail: string;
  rating: number;
  images?: string[];
  category?: string;
}

type NavProp = NativeStackNavigationProp<RootStackParamList, 'Products'>;

const ProductListScreen: React.FC = () => {
  // Enable LayoutAnimation on Android
  if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const colors = theme?.colors || {
    background: '#fff',
    surface: '#f8f9fa',
    text: '#000',
    textSecondary: '#666',
    border: '#ddd',
    primary: '#007AFF',
  };
  const isDark = theme?.isDark || false;
  const toggleTheme = theme?.toggleTheme || (() => {});

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
    const shouldBeRTL = newLang === 'ar';
    if (I18nManager.isRTL !== shouldBeRTL) {
      I18nManager.allowRTL(shouldBeRTL);
      I18nManager.forceRTL(shouldBeRTL);
    }
  };

  const cachedProducts = useAppSelector((s) => s.products.items);
  const [products, setProducts] = useState<Product[]>(cachedProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(cachedProducts.length === 0);
  const [error, setError] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [showPriceSlider, setShowPriceSlider] = useState(false);

  const favorites = useAppSelector((s) => s.favorites.ids);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavProp>();

  // Responsive width calculation
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
  const numColumns = 2;
  const CARD_MARGIN = 8;
  const HORIZONTAL_PADDING = 16;
  const cardWidth = (SCREEN_WIDTH - HORIZONTAL_PADDING * 2 - CARD_MARGIN * (numColumns - 1)) / numColumns;
  
  const paddingTopNormal = Platform.OS === 'android' ? SCREEN_HEIGHT * 0.23 : SCREEN_HEIGHT * 0.19;
  const paddingTopWithSlider = Platform.OS === 'android' ? SCREEN_HEIGHT * 0.33 : SCREEN_HEIGHT * 0.29;

  const togglePriceSlider = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowPriceSlider((prev) => !prev);
  };

  const load = async () => {
    try {
      setError(null);
      setIsOffline(false);
      if (cachedProducts.length === 0) setLoading(true);
      const data = await getProducts();
      console.log('Loaded products:', data?.length || 0);
      if (data && Array.isArray(data) && data.length > 0) {
        setProducts(data);
        dispatch(setCachedProducts(data));
      } else {
        setError('No products available from API');
      }
    } catch (err) {
      console.error('Load error:', err);
      if (cachedProducts.length > 0) {
        setIsOffline(true);
        setProducts(cachedProducts);
      } else {
        setError('Failed to load products. Please start API server: npm run api');
      }
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = useCallback(() => {
    let filtered = products;
    if (debouncedSearchQuery) {
      filtered = filtered.filter((p) => p.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()));
    }
    if (selectedCategory !== 'All') filtered = filtered.filter((p) => p.category === selectedCategory);
    filtered = filtered.filter((p) => p.price >= priceRange.min && p.price <= priceRange.max);
    setFilteredProducts(filtered);
  }, [products, debouncedSearchQuery, selectedCategory, priceRange]);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearchQuery(searchQuery), 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    filterProducts();
  }, [filterProducts]);

  useEffect(() => {
    load();
  }, []);

  const renderSkeletons = () => (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 8 }}>
      {[...Array(6)].map((_, i) => <ProductCardSkeleton key={i} />)}
    </View>
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await load();
      filterProducts();
    } catch (err) {
      console.error(err);
    } finally {
      setRefreshing(false);
    }
  }, [filterProducts]);

  const categories: string[] = [
    'All',
    ...Array.from(new Set(products.map((p) => p.category).filter((c): c is string => Boolean(c)))),
  ];

  const categoryDisplayNames: { [key: string]: string } = {
    All: 'All',
    audio: 'Audio',
    wearable: 'Wearables',
    accessories: 'Accessories',
    electronics: 'Electronics',
    home: 'Home',
    sports: 'Sports',
    books: 'Books',
    clothing: 'Clothing',
    beauty: 'Beauty',
  };

  const renderItem = ({ item, index }: { item: Product; index: number }) => (
    <View style={{ width: cardWidth, marginRight: index % numColumns === 0 ? CARD_MARGIN : 0, marginBottom: CARD_MARGIN }}>
      <ProductCard
        product={item}
        isFavorite={favorites.includes(item.id)}
        onToggleFavorite={(id) => dispatch(toggleFavorite(id))}
        onPress={() => navigation.navigate('ProductDetails', { product: item })}
      />
    </View>
  );

  // Animated refreshing text
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (refreshing) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: 500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(animatedValue, {
            toValue: 0,
            duration: 500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      animatedValue.stopAnimation();
      animatedValue.setValue(0);
    }
  }, [refreshing]);

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -5],
  });

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={[ 'top','left', 'right']}>
      {/* Fixed Header */}
      <View style={[styles.fixedHeader, { backgroundColor: colors.background }]}>
        <OfflineBanner isOffline={isOffline} />
        <View style={styles.headerRow}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>{t('products')}</Text>
          <View style={styles.headerButtons}>
            <TouchableOpacity style={[styles.filterButton, { backgroundColor: colors.surface }]} onPress={toggleTheme}>
              <Text style={{ fontSize: 18 }}>{isDark ? '☀️' : '🌙'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.filterButton, { backgroundColor: colors.primary }]} onPress={toggleLanguage}>
              <Text style={{ color: '#fff', fontSize: 11, fontWeight: '600' }}>{i18n.language === 'en' ? 'عر' : 'EN'}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.searchContainer}>
          <TextInput
            style={[
              styles.searchInput,
              { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text },
            ]}
            placeholder={t('searchProducts')}
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={[styles.filterButton, { backgroundColor: colors.primary }]} onPress={togglePriceSlider}>
            <Text style={{ color: '#fff', fontSize: 16 }}>💰</Text>
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item || 'unknown'}
          inverted={I18nManager.isRTL}
          renderItem={({ item }) => {
            if (!item) return null;
            const isSelected = selectedCategory === item;
            const displayName = categoryDisplayNames[item] || item;
            return (
              <TouchableOpacity
                style={[
                  styles.categoryButton,
                  {
                    backgroundColor: isSelected ? colors.primary : colors.surface,
                    borderColor: isSelected ? colors.primary : colors.border,
                  },
                ]}
                onPress={() => setSelectedCategory(item)}
              >
                <Text style={[styles.categoryText, { color: isSelected ? '#fff' : colors.textSecondary }]}>
                  {displayName}
                </Text>
              </TouchableOpacity>
            );
          }}
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 8 }}
          style={{ marginBottom: 5 }}
        />

        {showPriceSlider && (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <PriceRangeSelector
              min={0}
              max={1000}
              initialMin={priceRange.min}
              initialMax={priceRange.max}
              onChange={(min, max) => setPriceRange({ min, max })}
            />
          </View>
        )}
      </View>

      {/* Product List */}
      {loading && !refreshing ? (
        <View style={{ paddingTop: showPriceSlider ? paddingTopWithSlider : paddingTopNormal }}>
          {renderSkeletons()}
        </View>
      ) : error ? (
        <View style={{ paddingTop: showPriceSlider ? paddingTopWithSlider : paddingTopNormal }}>
          <ErrorState message={error} onRetry={load} textColor={colors.text} buttonColor={colors.primary} />
        </View>
      ) : (
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          numColumns={numColumns}
          contentContainerStyle={{
            paddingTop: showPriceSlider ? paddingTopWithSlider : paddingTopNormal,
            paddingBottom: 40,
            paddingHorizontal: HORIZONTAL_PADDING,
          }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={colors.primary}
              colors={[colors.primary, '#ff0', '#0f0']}
            />
          }
          ListHeaderComponent={
            refreshing ? (
              <Animated.View style={{ padding: 10, alignItems: 'center', transform: [{ translateY }] }}>
                <Text style={{ color: colors.primary, fontWeight: '600', fontSize: 16 }}>Refreshing products...</Text>
              </Animated.View>
            ) : null
          }
          ListEmptyComponent={
            !loading && (
              searchQuery || selectedCategory !== 'All' || priceRange.min > 0 || priceRange.max < 1000 ? (
                <EmptyState
                  emoji="🔍"
                  title="No Products Found"
                  message="Try adjusting your search or filters"
                  textColor={colors.text}
                />
              ) : products.length === 0 && !error ? (
                <EmptyState
                  emoji="🚨"
                  title="No Products Available"
                  message="Unable to load products. Please check your connection and try again."
                  textColor={colors.text}
                />
              ) : products.length === 0 ? (
                <EmptyState
                  emoji="🚨"
                  title="Failed to Load Products"
                  message="Please start the API server: npm run api"
                  textColor={colors.text}
                />
              ) : (
                <EmptyState
                  emoji="📦"
                  title="No Products Available"
                  message="Check back later for new products"
                  textColor={colors.text}
                />
              )
            )
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 ,paddingTop:20},
  fixedHeader: { position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10, paddingTop: 10 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 8 },
  headerTitle: { fontSize: 24, fontWeight: 'bold' },
  headerButtons: { flexDirection: 'row', alignItems: 'center' },
  searchContainer: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 10 },
  searchInput: { borderWidth: 1, borderRadius: 8, padding: 10, fontSize: 16, flex: 1 },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    marginLeft: 8,
    justifyContent: 'center',
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryText: { fontSize: 13, fontWeight: '500' },
});

export default ProductListScreen;
