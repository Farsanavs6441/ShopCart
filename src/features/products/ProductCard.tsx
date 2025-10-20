import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  I18nManager,
  Dimensions,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../theme/theme';
import StarRating from '../../components/StarRating';
import { formatCurrency } from '../../utils/currency';

interface Product {
  id: string;
  title: string;
  price: number;
  thumbnail: string;
  rating: number;
}

type Props = {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onPress: () => void;
};

const windowWidth = Dimensions.get('window').width;
const CARD_MARGIN = 8;
const CARD_WIDTH = (windowWidth - CARD_MARGIN * 6) / 2; // 2-column grid

const ProductCard: React.FC<Props> = ({ product, isFavorite, onToggleFavorite, onPress }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const colors = theme?.colors || {
    card: '#ffffff',
    border: '#dddddd',
    text: '#000000',
    textSecondary: '#666666',
  };

  const [opacity] = useState(new Animated.Value(0));
  const [loaded, setLoaded] = useState(false);

  const handleImageLoad = () => {
    setLoaded(true);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      style={[styles.card, { width: CARD_WIDTH, backgroundColor: colors.card, borderColor: colors.border }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        {/* Loader */}
       <ActivityIndicator
         size="small"
         color={colors.textSecondary}
         style={StyleSheet.absoluteFill}
         animating={!loaded}
       />

        {/* Animated image */}
        <Animated.Image
          source={{ uri: product.thumbnail }}
          style={[styles.image, { opacity }]}
          resizeMode="cover"
          onLoad={handleImageLoad}
        />

        {/* Favorite heart */}
        <TouchableOpacity
          style={styles.heartButton}
          onPress={() => onToggleFavorite(product.id)}
          activeOpacity={0.7}
        >
          <Text style={styles.heartIcon}>{isFavorite ? '❤️' : '🤍'}</Text>
        </TouchableOpacity>
      </View>

      {/* Product details */}
      <View style={styles.details}>
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
          {product.title}
        </Text>
        <Text style={[styles.price, { color: colors.textSecondary }]}>
          {formatCurrency(product.price)}
        </Text>
        <StarRating rating={product.rating} size={16} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: CARD_MARGIN,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
  },
  imageContainer: {
    position: 'relative',
    backgroundColor: '#f0f0f0',
  },
  image: {
    width: '100%',
    aspectRatio: 4 / 3,
  },
  heartButton: {
    position: 'absolute',
    top: 8,
    right: I18nManager.isRTL ? undefined : 8,
    left: I18nManager.isRTL ? 8 : undefined,
    padding: 4,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 20,
  },
  heartIcon: {
    fontSize: 22,
  },
  details: {
    padding: 10,
    alignItems: I18nManager.isRTL ? 'flex-end' : 'flex-start',
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  price: {
    fontSize: 13,
    marginBottom: 4,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
});

export default ProductCard;
