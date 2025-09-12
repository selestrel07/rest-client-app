import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LanguageToggle } from './LanguageToggle';

const mockUseLocale = vi.fn();

vi.mock('next-intl', () => ({
  useLocale: () => mockUseLocale(),
}));

const mockReplace = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace: mockReplace }),
  usePathname: () => '/en/main',
}));

describe('LanguageToggle (next-intl)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders with EN active', () => {
    mockUseLocale.mockReturnValue('en');
    render(<LanguageToggle />);

    expect(screen.getByText('EN')).toHaveClass('font-bold');
    expect(screen.getByText('RU')).not.toHaveClass('font-bold');
  });

  it('renders with RU active', () => {
    mockUseLocale.mockReturnValue('ru');
    render(<LanguageToggle />);

    expect(screen.getByText('RU')).toHaveClass('font-bold');
    expect(screen.getByText('EN')).not.toHaveClass('font-bold');
  });

  it('toggles locale on click', () => {
    mockUseLocale.mockReturnValue('en');
    render(<LanguageToggle />);

    fireEvent.click(screen.getByRole('button'));

    expect(mockReplace).toHaveBeenCalledWith('/ru/main');
  });

  it('toggles locale from RU to EN on click', () => {
    mockUseLocale.mockReturnValue('ru');
    render(<LanguageToggle />);

    fireEvent.click(screen.getByRole('button'));

    expect(mockReplace).toHaveBeenCalledWith('/en/main');
  });
});
