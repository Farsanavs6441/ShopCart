import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { useTheme } from '../theme/theme';

interface CartBadgeProps {
  count: number;
}

const CartBadge: React.FC<CartBadgeProps> = ({ count }) => {
  const theme = useTheme();
  const colors = theme?.colors || { error: '#FF3B30' };

  if (count === 0) return null;

  return (
    <View style={[styles.badge, { backgroundColor: colors.error }]}>
      <Text style={styles.badgeText}>{count > 99 ? '99+' : count}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: -6,
    right: -6,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default CartBadge;