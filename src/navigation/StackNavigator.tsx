import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductListScreen from '../features/products/ProductListScreen';
import ProductDetailsScreen from '../features/products/ProductDetailsScreen';
import CartScreen from '../features/cart/CartScreen';
import FavoritesScreen from '../features/favorites/FavoritesScreen';

export type RootStackParamList = {
  Products: undefined;
  ProductDetails: { id: string };
  Cart: undefined;
  Favorites: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Products"
    screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="Products" 
        component={ProductListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="ProductDetails" 
        component={ProductDetailsScreen}
        options={{ title: 'Product Details' }}
      />
      <Stack.Screen 
        name="Cart" 
        component={CartScreen}
        options={{ title: 'Cart' }}
      />
      <Stack.Screen 
        name="Favorites" 
        component={FavoritesScreen}
        options={{ title: 'Favorites' }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;