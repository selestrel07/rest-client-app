import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, MockedFunction } from 'vitest';
import { ResponseViewer } from './ResponseViewer';

// Мокаем утилиты
vi.mock('@utils/isValidJson', () => ({
  isValidJson: vi.fn(),
}));
vi.mock('@utils/prettifyJson', () => ({
  prettifyJson: vi.fn(),
}));

import { isValidJson } from '@utils/isValidJson';

describe('ResponseViewer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders status', () => {
    (isValidJson as MockedFunction<typeof isValidJson>).mockReturnValue(false);

    render(<ResponseViewer data={{ status: 200, data: 'ok' }} />);

    expect(screen.getByText(/Status: 200/)).toBeInTheDocument();
  });

  it('renders raw data when not valid JSON', () => {
    (isValidJson as MockedFunction<typeof isValidJson>).mockReturnValue(false);

    render(<ResponseViewer data={{ status: 404, data: 'Not Found' }} />);

    expect(screen.getByText('Not Found')).toBeInTheDocument();
  });
});
