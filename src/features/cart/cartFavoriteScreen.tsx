import React from 'react';
import { View, Text, FlatList, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { removeFromCart, updateQuantity } from './cartSlice';
import QuantityStepper from '../../components/QuantityStepper';
import { toggleFavorite } from '../products/favoritesSlice';

const CartFavoritesScreen = () => {
  const cart = useAppSelector(state => state.cart.items);
  const favorites = useAppSelector(state => state.favorites.ids);
  const dispatch = useAppDispatch();

  const favoriteItems: any[] = [];
  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleRemoveCart = (id: string) => dispatch(removeFromCart(id));
  const handleQtyChange = (id: string, qty: number) =>
    dispatch(updateQuantity({ id, quantity: qty }));

  const handleToggleFavorite = (id: string) => dispatch(toggleFavorite(id));

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {/* Favorites Section */}
      <Text style={styles.sectionTitle}>Favorites</Text>
      <Text>No favorite items</Text>

      {/* Cart Section */}
      <Text style={styles.sectionTitle}>Cart</Text>
      {cart.length === 0 ? (
        <Text>Your cart is empty</Text>
      ) : (
        <FlatList
          data={cart}
          keyExtractor={item => item.product.id}
          renderItem={({ item }) => (
            <View style={styles.cartCard}>
              <Text style={styles.title}>{item.product.title}</Text>
              <Text>${item.product.price.toFixed(2)}</Text>
              <QuantityStepper
                quantity={item.quantity}
                onIncrease={() => handleQtyChange(item.product.id, item.quantity + 1)}
                onDecrease={() =>
                  handleQtyChange(item.product.id, item.quantity > 1 ? item.quantity - 1 : 1)
                }
              />
              <Button title="Remove from Cart" onPress={() => handleRemoveCart(item.product.id)} />
            </View>
          )}
        />
      )}

      <View style={styles.total}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Cart Total: ${total.toFixed(2)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginVertical: 10 },
  favoriteCard: {
    marginRight: 10,
    padding: 10,
    backgroundColor: '#ffe0e0',
    borderRadius: 8,
  },
  cartCard: {
    marginBottom: 16,
    padding: 10,
    backgroundColor: '#e0f7ff',
    borderRadius: 8,
  },
  title: { fontSize: 16, fontWeight: 'bold' },
  total: { marginTop: 20, alignItems: 'center' },
});

export default CartFavoritesScreen;
