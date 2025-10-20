import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ErrorState } from '../components/ErrorState';

describe('ErrorState Component', () => {
  it('renders the error message', () => {
    const { getByText } = render(
      <ErrorState message="Something went wrong" onRetry={jest.fn()} />
    );

    expect(getByText('Something went wrong')).toBeTruthy();
  });

  it('calls onRetry when retry button is pressed', () => {
    const onRetryMock = jest.fn();
    const { getByText } = render(
      <ErrorState message="Something went wrong" onRetry={onRetryMock} />
    );

    const retryButton = getByText('Retry');
    fireEvent.press(retryButton);

    expect(onRetryMock).toHaveBeenCalledTimes(1);
  });

  it('applies custom textColor if provided', () => {
    const { getByText } = render(
      <ErrorState message="Error occurred" onRetry={jest.fn()} textColor="red" />
    );

    const message = getByText('Error occurred');
    expect(message.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ color: 'red' })])
    );
  });

  it('uses default textColor when not provided', () => {
    const { getByText } = render(
      <ErrorState message="Error occurred" onRetry={jest.fn()} />
    );

    const message = getByText('Error occurred');
    expect(message.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ color: '#000' })])
    );
  });
});
