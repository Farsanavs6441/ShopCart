import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  emoji: string;
  title: string;
  message: string;
  textColor?: string;
}

export const EmptyState: React.FC<Props> = ({ emoji, title, message, textColor = '#000' }) => (
  <View style={styles.container}>
    <Text style={styles.emoji}>{emoji}</Text>
    <Text style={[styles.title, { color: textColor }]}>{title}</Text>
    <Text style={[styles.message, { color: textColor, opacity: 0.7 }]}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    marginTop: 100,
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
  },
});
