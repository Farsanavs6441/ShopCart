import React from 'react';
import { View, StyleSheet } from 'react-native';

const ProductSkeleton = () => {
  return (
    <View style={styles.container}>
      <View style={styles.image} />
      <View style={styles.content}>
        <View style={styles.title} />
        <View style={styles.price} />
        <View style={styles.rating} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 130,
    backgroundColor: '#e0e0e0',
  },
  content: {
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
    width: '60%',
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginBottom: 4,
  },
  rating: {
    height: 12,
    width: '40%',
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
  },
});

export default ProductSkeleton;