import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ResponseViewer } from '@components';

describe('ResponseViewer', () => {
  it('should display error message for ErrorResponse', () => {
    render(<ResponseViewer data={{ error: 'Something went wrong' }} />);

    const pre = screen.getByText('Something went wrong');
    expect(pre).toBeInTheDocument();
    expect(pre).toHaveClass('text-red-500');
  });
});
