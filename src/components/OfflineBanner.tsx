import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  isOffline: boolean;
}

export const OfflineBanner: React.FC<Props> = ({ isOffline }) => {
  if (!isOffline) return null;

  return (
    <View style={styles.banner}>
      <Text style={styles.text}>📡 Offline - Showing cached data</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    backgroundColor: '#FFA726',
    padding: 8,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});
