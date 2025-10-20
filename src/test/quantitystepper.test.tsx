import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import QuantityStepper from '../components/QuantityStepper';// adjust path

describe('QuantityStepper Component', () => {
  const onIncreaseMock = jest.fn();
  const onDecreaseMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders initial quantity correctly', () => {
    const { getByText } = render(
      React.createElement(QuantityStepper, { quantity: 5, onIncrease: onIncreaseMock, onDecrease: onDecreaseMock })
    );
    expect(getByText('5')).toBeTruthy();
  });

  it('calls onIncrease when "+" button is pressed', () => {
    const { getByText } = render(
      React.createElement(QuantityStepper, { quantity: 5, onIncrease: onIncreaseMock, onDecrease: onDecreaseMock })
    );
    fireEvent.press(getByText('+'));
    expect(onIncreaseMock).toHaveBeenCalledTimes(1);
  });

  it('calls onDecrease when "-" button is pressed', () => {
    const { getByText } = render(
      React.createElement(QuantityStepper, { quantity: 5, onIncrease: onIncreaseMock, onDecrease: onDecreaseMock })
    );
    fireEvent.press(getByText('-'));
    expect(onDecreaseMock).toHaveBeenCalledTimes(1);
  });
});
