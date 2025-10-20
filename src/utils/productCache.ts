import AsyncStorage from '@react-native-async-storage/async-storage';

const CACHE_KEY = 'product_details_';

export const cacheProduct = async (id: string, product: any) => {
  try {
    await AsyncStorage.setItem(`${CACHE_KEY}${id}`, JSON.stringify(product));
  } catch (error) {
    console.error('Error caching product:', error);
  }
};

export const getCachedProduct = async (id: string) => {
  try {
    const cached = await AsyncStorage.getItem(`${CACHE_KEY}${id}`);
    return cached ? JSON.parse(cached) : null;
  } catch (error) {
    console.error('Error getting cached product:', error);
    return null;
  }
};
