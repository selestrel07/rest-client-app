import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ErrorBoundary } from './ErrorBoundary';

const Fallback = () => <div data-testid="fallback">Something went wrong</div>;
const SafeChild = () => <div data-testid="safe-child">Hello</div>;
const ErrorChild = () => {
  throw new Error('Boom!');
};

describe('ErrorBoundary', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('renders children when no error', () => {
    render(
      <ErrorBoundary fallback={<Fallback />}>
        <SafeChild />
      </ErrorBoundary>
    );

    expect(screen.getByTestId('safe-child')).toBeInTheDocument();
  });

  it('renders fallback when child throws error', () => {
    render(
      <ErrorBoundary fallback={<Fallback />}>
        <ErrorChild />
      </ErrorBoundary>
    );

    expect(screen.getByTestId('fallback')).toBeInTheDocument();
  });
});
