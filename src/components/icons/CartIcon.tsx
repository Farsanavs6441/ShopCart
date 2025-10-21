import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

interface IconProps {
  size?: number;
  color?: string;
}

const CartIcon: React.FC<IconProps> = ({ size = 24, color = '#000' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M9 2L1 6v16l8 4 8-4 8 4V6l-8-4-8 4z" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    <Circle cx="9" cy="21" r="1" fill={color} />
    <Circle cx="20" cy="21" r="1" fill={color} />
    <Path d="M1 6h22M6 6l3 14h10" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export default CartIcon;
