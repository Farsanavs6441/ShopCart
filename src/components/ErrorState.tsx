import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Props {
  message: string;
  onRetry: () => void;
  textColor?: string;
  buttonColor?: string;
}

export const ErrorState: React.FC<Props> = ({ 
  message, 
  onRetry, 
  textColor = '#000',
  buttonColor = '#007AFF'
}) => (
  <View style={styles.container}>
    <Text style={styles.emoji}>⚠️</Text>
    <Text style={[styles.title, { color: textColor }]}>Oops!</Text>
    <Text style={[styles.message, { color: textColor, opacity: 0.7 }]}>{message}</Text>
    <TouchableOpacity 
      style={[styles.button, { backgroundColor: buttonColor }]} 
      onPress={onRetry}
    >
      <Text style={styles.buttonText}>Retry</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
    width: '100%',
  },
  button: {
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
