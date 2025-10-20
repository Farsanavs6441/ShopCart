// components/RangeSlider.tsx
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { useTheme } from '../theme/theme';

interface Props {
  min: number;          // full min from products, e.g., 0
  max: number;          // full max from products, e.g., 50000
  initialMin?: number;  // optional initial min
  initialMax?: number;  // optional initial max
  onChange: (min: number, max: number) => void;
}

const PriceRangeSelector: React.FC<Props> = ({
  min,
  max,
  initialMin,
  initialMax,
  onChange,
}) => {
  const { colors } = useTheme() || { colors: { primary: '#007AFF', text: '#000' } };

  // Use initialMin/initialMax if provided, else default to 0-1000
  const [values, setValues] = useState<number[]>([
    initialMin !== undefined ? initialMin : 0,
    initialMax !== undefined ? initialMax : 1000,
  ]);

  // Ensure slider always respects passed min/max
  useEffect(() => {
    setValues([
      initialMin !== undefined ? initialMin : 0,
      initialMax !== undefined ? initialMax : Math.min(1000, max),
    ]);
  }, [min, max, initialMin, initialMax]);

  return (
    <View style={{ paddingHorizontal: 16, marginVertical: 10 }}>
      <MultiSlider
        values={values}
        min={min}
        max={max}
        onValuesChange={(vals) => setValues(vals as number[])}
        onValuesChangeFinish={(vals) => onChange(vals[0], vals[1])}
        selectedStyle={{ backgroundColor: colors.primary }}
        unselectedStyle={{ backgroundColor: '#ddd' }}
        markerStyle={{ backgroundColor: colors.primary }}
        containerStyle={{ height: 40 }}
      />
      <Text style={{ textAlign: 'center', marginTop: 5, color: colors.text }}>
        Price: {values[0]} - {values[1]}
      </Text>
    </View>
  );
};

export default PriceRangeSelector;
