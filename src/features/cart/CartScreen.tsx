import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { removeFromCart, updateQuantity, clearCart } from './cartSlice';
import QuantityStepper from '../../components/QuantityStepper';
import { formatCurrency } from '../../utils/currency';
import { useTheme } from '../../theme/theme';
import { EmptyState } from '../../components/EmptyState';

const CartScreen = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const colors = theme?.colors || { background: '#fff', text: '#000', textSecondary: '#666', surface: '#f8f9fa', card: '#fff', border: '#ddd' };
  const dispatch = useAppDispatch();
  const cart = useAppSelector(state => state.cart.items);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const subtotal = cart.reduce(
    (sum, item) => {
      const price = item.product?.price || 0;
      const quantity = item.quantity || 0;
      return sum + (Number(price) * Number(quantity));
    },
    0
  );
  const discountAmount = (subtotal || 0) * (discount || 0);
  const total = (subtotal || 0) - discountAmount;

  const applyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'SAVE10') {
      setDiscount(0.1);
      Alert.alert(t('promoCodeApplied'), 'You got 10% off 🎉');
    } else {
      setDiscount(0);
      Alert.alert(t('invalidPromoCode'), 'Please enter a valid promo code.');
    }
  };

  const handleQtyChange = (id: string, qty: number) => {
    if (qty < 1) return;
    dispatch(updateQuantity({ id, quantity: qty }));
  };

  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    Alert.alert(t('emptyCart'), 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Yes', onPress: () => dispatch(clearCart()) },
    ]);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>{t('cart')}</Text>

      {cart.length === 0 ? (
        <EmptyState
          emoji="🛒"
          title={t('emptyCart')}
          message={t('emptyCartMessage')}
          textColor={colors.text}
        />
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item, index) => `${item.product?.id || index}`}
            renderItem={({ item }) => (
              <View style={[styles.cartItem, { backgroundColor: colors.card }]}>
                <Image 
                  source={{ uri: item.product.images?.[0] || 'https://via.placeholder.com/80' }}
                  style={styles.productImage}
                />
                
                <View style={styles.productInfo}>
                  <Text style={[styles.itemTitle, { color: colors.text }]} numberOfLines={2}>{item.product.title}</Text>
                  <Text style={[styles.itemPrice, { color: colors.primary }]}>{formatCurrency(item.product?.price || 0)}</Text>
                  
                  <View style={styles.quantityRow}>
                    <QuantityStepper
                      quantity={item.quantity}
                      onIncrease={() =>
                        handleQtyChange(item.product.id, item.quantity + 1)
                      }
                      onDecrease={() =>
                        handleQtyChange(item.product.id, item.quantity - 1)
                      }
                    />
                    <Text style={[styles.totalPrice, { color: colors.text }]}>
                      {formatCurrency((item.product?.price || 0) * item.quantity)}
                    </Text>
                  </View>
                </View>

                <TouchableOpacity
                  onPress={() => handleRemove(item.product.id)}
                  style={styles.removeButton}
                >
                  <Text style={styles.removeText}>✕</Text>
                </TouchableOpacity>
              </View>
            )}
          />

          {/* Promo Code */}
          <View style={styles.promoContainer}>
            <TextInput
              style={[styles.input, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text }]}
              placeholder={t('enterPromoCode')}
              placeholderTextColor={colors.textSecondary}
              value={promoCode}
              onChangeText={setPromoCode}
              autoCapitalize="characters"
            />
            <TouchableOpacity style={styles.applyButton} onPress={applyPromo}>
              <Text style={styles.applyText}>{t('applyPromoCode')}</Text>
            </TouchableOpacity>
          </View>
          <Text style={[styles.promoHint, { color: colors.textSecondary }]}>Try: SAVE10 → 10% off</Text>

          {/* Summary */}
          <View style={[styles.summary, { borderColor: colors.border }]}>
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: colors.text }]}>{t('subtotal')}</Text>
              <Text style={[styles.summaryValue, { color: colors.text }]}>{formatCurrency(subtotal || 0)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: colors.text }]}>{t('discount')}</Text>
              <Text style={[styles.summaryValue, { color: colors.text }]}>
                -{formatCurrency(discountAmount || 0)}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryTotalLabel, { color: colors.text }]}>{t('total')}</Text>
              <Text style={[styles.summaryTotalValue, { color: colors.text }]}>{formatCurrency(total || 0)}</Text>
            </View>
          </View>

          {/* Checkout / Clear */}
          <View style={styles.buttons}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#4CAF50' }]}
              onPress={() => Alert.alert(t('checkout'), 'Proceeding to checkout...')}
            >
              <Text style={styles.buttonText}>{t('checkout')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#E53935' }]}
              onPress={handleClearCart}
            >
              <Text style={styles.buttonText}>{t('emptyCart')}</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 60 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 10 },
  cartItem: {
    flexDirection: 'row',
    padding: 12,
    marginVertical: 4,
    borderRadius: 8,
    alignItems: 'flex-start',
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  productInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemTitle: { 
    fontSize: 16, 
    fontWeight: '600',
    marginBottom: 4,
  },
  itemPrice: { 
    fontSize: 18, 
    fontWeight: 'bold',
    marginBottom: 8,
  },
  quantityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  removeButton: { 
    padding: 8,
    marginLeft: 8,
  },
  removeText: { 
    color: '#E53935', 
    fontSize: 20, 
    fontWeight: 'bold' 
  },

  promoContainer: {
    flexDirection: 'row',
    marginTop: 8,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
  },
  applyButton: {
    marginLeft: 10,
    backgroundColor: '#2196F3',
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  applyText: { color: '#fff', fontWeight: '600' },
  promoHint: {
    fontSize: 12,
    fontStyle: 'italic',
    marginTop: -12,
    marginBottom: 8,
  },

  summary: { borderTopWidth: 1, paddingTop: 10 },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  summaryLabel: { fontSize: 16 },
  summaryValue: { fontSize: 16 },
  summaryTotalLabel: { fontSize: 18, fontWeight: 'bold' },
  summaryTotalValue: { fontSize: 18, fontWeight: 'bold' },

  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
