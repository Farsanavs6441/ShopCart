import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Props {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

const QuantityStepper: React.FC<Props> = ({ quantity, onIncrease, onDecrease }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onDecrease} style={styles.button}>
        <Text style={styles.text}>-</Text>
      </TouchableOpacity>
      <Text style={styles.quantity}>{quantity}</Text>
      <TouchableOpacity onPress={onIncrease} style={styles.button}>
        <Text style={styles.text}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center' },
  button: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: { fontSize: 20, fontWeight: 'bold' },
  quantity: { marginHorizontal: 10, fontSize: 16 },
});

export default QuantityStepper;
