// __tests__/ProductCard.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ProductCard from '../features/products/ProductCard';

const mockProduct = {
  id: '1',
  title: 'Test Product',
  price: 99.99,
  thumbnail: 'https://via.placeholder.com/150',
  rating: 4.5,
};

describe('ProductCard', () => {
  it('calls onToggleFavorite when heart is pressed', () => {
    const toggleFavoriteMock = jest.fn();
    const onPressMock = jest.fn();

    const { getByText } = render(
      <ProductCard
        product={mockProduct}
        isFavorite={false}
        onToggleFavorite={toggleFavoriteMock}
        onPress={onPressMock}
      />
    );

    const heart = getByText('🤍'); // initially not favorite
    fireEvent.press(heart);

    expect(toggleFavoriteMock).toHaveBeenCalledTimes(1);
    expect(toggleFavoriteMock).toHaveBeenCalledWith(mockProduct.id);
  });

  it('calls onPress when the card is pressed', () => {
    const toggleFavoriteMock = jest.fn();
    const onPressMock = jest.fn();

    const { getByTestId } = render(
      <ProductCard
        product={mockProduct}
        isFavorite={false}
        onToggleFavorite={toggleFavoriteMock}
        onPress={onPressMock}
      />
    );

    const card = getByTestId('product-card'); // we need to add testID to TouchableOpacity
    fireEvent.press(card);

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
