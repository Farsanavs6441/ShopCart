import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

export const ProductCardSkeleton: React.FC = () => {
  const shimmer = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, { toValue: 1, duration: 1000, useNativeDriver: true }),
        Animated.timing(shimmer, { toValue: 0, duration: 1000, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const opacity = shimmer.interpolate({ inputRange: [0, 1], outputRange: [0.3, 0.7] });

  return (
    <View style={[styles.card, { width: CARD_WIDTH }]}>
      <Animated.View style={[styles.image, { opacity }]} />
      <View style={styles.details}>
        <Animated.View style={[styles.title, { opacity }]} />
        <Animated.View style={[styles.price, { opacity }]} />
        <Animated.View style={[styles.rating, { opacity }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 8,
    borderRadius: 12,
    backgroundColor: '#fff',
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    aspectRatio: 4 / 3,
    backgroundColor: '#e0e0e0',
  },
  details: {
    padding: 10,
  },
  title: {
    height: 16,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginBottom: 8,
  },
  price: {
    height: 14,
    width: '50%',
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginBottom: 8,
  },
  rating: {
    height: 12,
    width: '40%',
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
  },
});
