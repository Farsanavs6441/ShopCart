import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
  rating: number; // e.g., 4.3
  maxStars?: number; // default 5
  size?: number; // font size
  color?: string; // filled star color
  emptyColor?: string; // empty star color
};

const StarRating: React.FC<Props> = ({
  rating,
  maxStars = 5,
  size = 24,
  color = '#f1c40f',
  emptyColor = '#ccc',
}) => {
  const numRating = Number(rating) || 0;
  const stars = [];

  for (let i = 0; i < maxStars; i++) {
    let fill = 0;
    if (numRating >= i + 1) fill = 1; // full star
    else if (numRating > i) fill = numRating - i; // partial star fraction
    stars.push(fill);
  }

  return (
    <View style={{ flexDirection: 'row' }}>
      {stars.map((fill, i) => (
        <View key={i} style={{ width: size, height: size, marginRight: 2 }}>
          {/* Empty star */}
          <Text style={[styles.star, { fontSize: size, color: emptyColor, position: 'absolute' }]}>
            ★
          </Text>
          {/* Filled fraction */}
          <View style={{ width: size * fill, overflow: 'hidden', position: 'absolute' }}>
            <Text style={[styles.star, { fontSize: size, color }]}>{'★'}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  star: {
    fontWeight: 'bold',
  },
});

export default StarRating;
