import React, { useState, Platform } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
  I18nManager,
  useColorScheme,
  Share,
  Animated,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleFavorite } from '../products/favoritesSlice';
import { addToCart } from '../cart/cartSlice';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n/index';
import StarRating from '../../components/StarRating';
import { formatCurrency } from '../../utils/currency';
import { cacheProduct, getCachedProduct } from '../../utils/productCache';

const { width } = Dimensions.get('window');

interface Product {
  id: string;
  title: string;
  price: number;
  rating?: number;
  description?: string;
  images?: string[];
  thumbnail: string;
  category?: string;
}

const ImageWithShimmer: React.FC<{ uri: string; index: number }> = ({ uri, index }) => {
  const [loaded, setLoaded] = useState(false);
  const shimmerAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (!loaded) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(shimmerAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(shimmerAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [loaded, shimmerAnim]);

  const shimmerOpacity = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <>
      {!loaded && (
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: '#e0e0e0', opacity: shimmerOpacity },
          ]}
        />
      )}
      <Animated.Image
        source={{ uri }}
        style={[{ width: '100%', height: '100%' }, { opacity: loaded ? 1 : 0 }]}
        resizeMode="cover"
        onLoad={() => setLoaded(true)}
      />
    </>
  );
};

const ProductDetailsScreen: React.FC = () => {
  const route = useRoute<any>();
  const productFromNav = route.params?.product;
  const [product, setProduct] = useState<Product | null>(productFromNav || null);
  const [loading, setLoading] = useState(!productFromNav);
  const [isOffline, setIsOffline] = useState(false);

  console.log('ProductDetailsScreen mounted with product:', productFromNav);
  console.log('Route params:', route.params);

  const { t } = useTranslation();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const favorites = useAppSelector((state) => state.favorites.ids);
  const dispatch = useAppDispatch();
  const isFavorite = product ? favorites.includes(product.id) : false;

  // Only fetch if product not passed from navigation
  React.useEffect(() => {
    if (productFromNav) {
      setLoading(false);
      return;
    }
    
    const fetchProduct = async () => {
      const productId = route.params?.id;
      if (!productId) return;
      
      try {
        setLoading(true);
        setIsOffline(false);
        const API_URL = Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'https://delmer-superadorn-luba.ngrok-free.dev';
        const response = await fetch(`${API_URL}/products/${productId}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data && data.id) {
          setProduct(data);
          await cacheProduct(productId, data);
        } else {
          throw new Error('Invalid product data');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        const cached = await getCachedProduct(route.params?.id);
        if (cached) {
          setProduct(cached);
          setIsOffline(true);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productFromNav, route.params]);

  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const handleAddToCart = () => {
    if (product) dispatch(addToCart({ product, quantity }));
  };

  const handleToggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
  };

  // **Share product link**
const handleShareProduct = (productId: string, productName: string) => {
  const appLink = `myshop://product/${productId}`;
  Share.share({
    message: `I found this product, Please have a look:\n\n${productName}\n${appLink}`,
  });
};


  if (loading) {
    return (
      <SafeAreaView style={[styles.center, { backgroundColor: isDark ? '#111' : '#fff' }]}>
        <Text style={{ color: isDark ? '#fff' : '#000' }}>{t('loading')}</Text>
      </SafeAreaView>
    );
  }

  if (!product) {
    return (
      <SafeAreaView style={[styles.center, { backgroundColor: isDark ? '#111' : '#fff' }]}>
        <Text style={{ color: isDark ? '#fff' : '#000', marginBottom: 20 }}>Product not found</Text>
      </SafeAreaView>
    );
  }

  const images = product.images && product.images.length > 1 
    ? product.images 
    : [
        product.thumbnail,
        product.images?.[0] || product.thumbnail,
        product.thumbnail.replace(/\/\d+\//, '/600/'),
      ].filter((img, idx, arr) => arr.indexOf(img) === idx).slice(0, 3);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: isDark ? '#111' : '#fff' }}>
      {isOffline && (
        <View style={{ backgroundColor: '#FFA726', padding: 8, alignItems: 'center' }}>
          <Text style={{ color: '#fff', fontSize: 12, fontWeight: '600' }}>📡 Offline - Showing cached data</Text>
        </View>
      )}
      <ScrollView>
        {/* Language Toggle */}
        <TouchableOpacity
          onPress={handleToggleLanguage}
          style={{
            alignSelf: I18nManager.isRTL ? 'flex-start' : 'flex-end',
            padding: 8,
            margin: 12,
            backgroundColor: '#eee',
            borderRadius: 8,
          }}
        >
          <Text>{i18n.language === 'en' ? 'العربية' : 'English'}</Text>
        </TouchableOpacity>

        {/* Images Carousel */}
        <View>
          <FlatList
            data={images}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, i) => i.toString()}
            onMomentumScrollEnd={(event) => {
              const index = Math.round(event.nativeEvent.contentOffset.x / width);
              setCurrentImageIndex(index);
            }}
            renderItem={({ item, index }) => (
              <View style={{ width, height: width * 0.75, backgroundColor: '#f0f0f0' }}>
                <ImageWithShimmer uri={item} index={index} />
                <TouchableOpacity
                  style={styles.heartButton}
                  onPress={() => dispatch(toggleFavorite(product.id))}
                >
                  <Text style={{ fontSize: 28 }}>{isFavorite ? '❤️' : '🤍'}</Text>
                </TouchableOpacity>
              </View>
            )}
          />
          {/* Carousel Indicators */}
          {images.length > 1 && (
            <View style={styles.indicators}>
              {images.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.indicator,
                    { backgroundColor: index === currentImageIndex ? '#007bff' : '#ccc' }
                  ]}
                />
              ))}
            </View>
          )}
        </View>

        {/* Product Details */}
        <View style={[styles.details, { alignItems: I18nManager.isRTL ? 'flex-end' : 'flex-start' }]}>
          <Text style={[styles.title, { color: isDark ? '#fff' : '#000', textAlign: I18nManager.isRTL ? 'right' : 'left' }]}>{product.title}</Text>
          <Text style={[styles.price, { color: isDark ? '#ccc' : '#333', textAlign: I18nManager.isRTL ? 'right' : 'left' }]}>
            {formatCurrency(product.price)}
          </Text>

          {product.rating && <StarRating rating={product.rating} size={20} />}

          {product.description && (
            <Text style={[styles.sectionLabel, { color: isDark ? '#ccc' : '#333', textAlign: I18nManager.isRTL ? 'right' : 'left' }]}>
              {product.description}
            </Text>
          )}

          {/* Quantity Stepper */}
          <Text style={[styles.quantityLabel, { color: isDark ? '#ccc' : '#333', textAlign: I18nManager.isRTL ? 'right' : 'left', marginBottom: 8 }]}>
            {t('quantity')}
          </Text>
          <View style={[styles.stepper, { flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row' }]}>
            <TouchableOpacity onPress={decrement} style={styles.stepButton}>
              <Text style={styles.stepText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantity}</Text>
            <TouchableOpacity onPress={increment} style={styles.stepButton}>
              <Text style={styles.stepText}>+</Text>
            </TouchableOpacity>
          </View>

          {/* Add to Cart */}
          <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
            <Text style={styles.addButtonText}>{t('addToCart')}</Text>
          </TouchableOpacity>

          {/* Share Button */}
          {/* <ShareButton productId={product.id} productName={product.title} /> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  image: { width: '100%', height: '100%' },
  heartButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    padding: 6,
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderRadius: 20,
  },
  details: { padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
  price: { fontSize: 18, color: '#333', marginBottom: 8 },
  sectionLabel: { fontSize: 14, color: '#666', marginBottom: 16, top: 4 },
  description: { fontSize: 14, color: '#666', marginBottom: 16, top: 4 },
  quantityLabel: { fontSize: 16, fontWeight: '600', marginTop: 8 },
  stepper: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  stepButton: { padding: 10, backgroundColor: '#eee', borderRadius: 6 },
  stepText: { fontSize: 16, fontWeight: 'bold' },
  quantity: { marginHorizontal: 12, fontSize: 16 },
  addButton: { backgroundColor: '#4CAF50', padding: 12, borderRadius: 8 },
  addButtonText: { color: '#fff', fontWeight: '600', textAlign: 'center' },
  indicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});

export default ProductDetailsScreen;
