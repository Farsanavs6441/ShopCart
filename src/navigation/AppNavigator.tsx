import React from 'react';
import { Platform, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../store/hooks';
import { useTheme } from '../theme/theme';
import CartBadge from '../components/CartBadge';
import HomeIcon from '../components/icons/HomeIcon';
import HeartIcon from '../components/icons/HeartIcon';
import CartIcon from '../components/icons/CartIcon';

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
  ProductDetails: { product: any };
};

const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createNativeStackNavigator<ProductStackParamList>();

// Stack navigator for Products tab
function ProductStack() {
  const { t } = useTranslation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProductList"
        component={ProductListScreen}
        options={{
    headerShown: Platform.OS !== 'android', // Hide header on iOS only
    title: Platform.OS === 'ios' ? '' : t('products'),
  }}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={{ title: t('productListTitle') }}
      />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  const { t } = useTranslation();
  const theme = useTheme();
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
            let IconComponent;
            let badgeCount = 0;

            switch (route.name) {
              case 'Products':
                IconComponent = <HomeIcon size={size} color={color} />;
                break;
              case 'Favorites':
                IconComponent = <HeartIcon size={size} color={color} filled={focused} />;
                badgeCount = favCount;
                break;
              case 'Cart':
                IconComponent = <CartIcon size={size} color={color} />;
                badgeCount = cartCount;
                break;
              default:
                IconComponent = <HomeIcon size={size} color={color} />;
            }

            return (
              <View style={{ position: 'relative' }}>
                {IconComponent}
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
        <Tab.Screen 
          name="Products" 
          component={ProductStack} 
          options={{ headerShown: false,  }}
        />
        <Tab.Screen 
          name="Favorites" 
          component={FavoritesScreen} 
          options={{ tabBarLabel: t('favorites') }}
        />
        <Tab.Screen 
          name="Cart" 
          component={CartScreen} 
          options={{ tabBarLabel: t('cart') }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
