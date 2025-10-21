import React from 'react';
import { render } from '@testing-library/react-native';
import CartBadge from '../components/CartBadge';

// Mock theme
jest.mock('../theme/theme', () => ({
  useTheme: jest.fn(() => ({
    colors: { error: '#FF3B30' },
  })),
}));

describe('CartBadge Component', () => {
  it('renders nothing when count is 0', () => {
    const { queryByText } = render(<CartBadge count={0} />);
    expect(queryByText('0')).toBeNull();
  });

  it('renders the correct count when count <= 99', () => {
    const { getByText } = render(<CartBadge count={42} />);
    expect(getByText('42')).toBeTruthy();
  });

  it('renders "99+" when count > 99', () => {
    const { getByText } = render(<CartBadge count={150} />);
    expect(getByText('99+')).toBeTruthy();
  });

  it('applies theme error color for badge background', () => {
    const { getByTestId } = render(<CartBadge count={5} />);
    const badgeView = getByTestId('cart-badge');
    expect(badgeView.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ backgroundColor: '#FF3B30' })])
    );
  });
});
