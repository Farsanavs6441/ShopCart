import React from 'react';
import { render } from '@testing-library/react-native';
import { EmptyState } from '../components/EmptyState';

describe('EmptyState Component', () => {
  it('renders emoji, title, and message', () => {
    const { getByText } = render(
      <EmptyState emoji="💔" title="No Favorites" message="Start adding products!" />
    );

    expect(getByText('💔')).toBeTruthy();
    expect(getByText('No Favorites')).toBeTruthy();
    expect(getByText('Start adding products!')).toBeTruthy();
  });

  it('applies custom textColor to title and message', () => {
    const { getByText } = render(
      <EmptyState
        emoji="💔"
        title="No Favorites"
        message="Start adding products!"
        textColor="red"
      />
    );

    const title = getByText('No Favorites');
    const message = getByText('Start adding products!');
    expect(title.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ color: 'red' })])
    );
    expect(message.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ color: 'red', opacity: 0.7 })])
    );
  });

  it('uses default textColor if not provided', () => {
    const { getByText } = render(
      <EmptyState emoji="💔" title="No Favorites" message="Start adding products!" />
    );

    const title = getByText('No Favorites');
    const message = getByText('Start adding products!');
    expect(title.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ color: '#000' })])
    );
    expect(message.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ color: '#000', opacity: 0.7 })])
    );
  });
});
