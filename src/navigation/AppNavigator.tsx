import React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAppSelector } from '../store/hooks';
import { useTheme } from '../theme/theme';
import CartBadge from '../components/CartBadge';

import ProductListScreen from '../features/products/ProductListScreen';
import ProductDetailsScreen from '../features/products/ProductDetailsScreen';
import CartScreen from '../features/cart/CartScreen';
import FavoritesScreen from '../features/favorites/FavoritesScreen';

export type RootTabParamList = {
  Products: { screen?: string; params?: { id?: string } };
  Favorites: undefined;
  Cart: undefined;
};

export type ProductStackParamList = {
  ProductList: undefined;
  ProductDetails: { id: string };
};

const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createNativeStackNavigator<ProductStackParamList>();

// Stack navigator for Products tab
function ProductStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProductList"
        component={ProductListScreen}
        options={{ title: 'Products' }}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={{ title: 'Details' }}
      />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  const theme = useTheme();
  const isDark = theme?.isDark || false;
  const colors = theme?.colors || {
    primary: '#007AFF',
    textSecondary: '#666666',
    card: '#ffffff',
    border: '#dddddd',
  };
  const cartCount = useAppSelector(state => state.cart.items.length);
  const favCount = useAppSelector(state => state.favorites.ids.length);

  const linking = {
    prefixes: ['myshop://', 'https://myshop.com'],
    config: {
      screens: {
        Products: {
          path: 'products/:id',
          screens: {
            ProductList: '',
            ProductDetails: 'product/:id',
          },
        },
        Favorites: 'favorites',
        Cart: 'cart',
      },
    },
  };

  return (
    <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
      <Tab.Navigator
        initialRouteName="Products"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => {
            let icon: string;
            let badgeCount = 0;

            switch (route.name) {
              case 'Products':
                icon = '🏠';
                break;
              case 'Favorites':
                icon = focused ? '❤️' : '🤍';
                badgeCount = favCount;
                break;
              case 'Cart':
                icon = '🛒';
                badgeCount = cartCount;
                break;
              default:
                icon = '⭕';
            }

            return (
              <View style={{ position: 'relative' }}>
                <Text style={{ fontSize: size, color }}>{icon}</Text>
                {badgeCount > 0 && <CartBadge count={badgeCount} />}
              </View>
            );
          },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textSecondary,
          tabBarStyle: {
            backgroundColor: colors.card,
            borderTopColor: colors.border,
          },
        })}
      >
        <Tab.Screen name="Products" component={ProductStack} />
        <Tab.Screen name="Favorites" component={FavoritesScreen} />
        <Tab.Screen name="Cart" component={CartScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
