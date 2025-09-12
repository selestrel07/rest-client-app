import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import uiReducer, { type localeState } from '../../states/uiSlice';
import { Header } from './Header';
import { describe, it, expect, beforeEach, vi } from 'vitest';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const dict: Record<string, string> = {
      main: 'Main',
      signout: 'Sign out',
    };
    return dict[key] ?? key;
  },
  useLocale: () => 'en',
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace: vi.fn() }),
  usePathname: () => '/en/main',
}));

const renderWithStore = (preloadedState?: { ui: localeState }) => {
  const store = configureStore({
    reducer: { ui: uiReducer },
    preloadedState,
  });

  return render(
    <Provider store={store}>
      <Header />
    </Provider>
  );
};

describe('Header component', () => {
  beforeEach(() => {
    window.scrollY = 0;
    cleanup();
  });

  it('renders link Main', () => {
    renderWithStore({ ui: { isAuthenticated: true, locale: 'en' } });
    expect(screen.getByText('Main')).toBeInTheDocument();
  });

  it('shows Sign out, if user is authenticated', () => {
    renderWithStore({ ui: { isAuthenticated: true, locale: 'en' } });
    expect(screen.getByText('Sign out')).toBeInTheDocument();
  });

  it("doesn't show Sign out, if user is not authenticated", () => {
    renderWithStore({ ui: { isAuthenticated: false, locale: 'en' } });
    expect(screen.queryByText('Sign out')).not.toBeInTheDocument();
  });

  it('changes styles with scroll', () => {
    renderWithStore({ ui: { isAuthenticated: true, locale: 'en' } });

    const header = screen.getByRole('banner');
    expect(header.className).toContain('bg-violet-300');
    expect(header.className).toContain('h-20');

    window.scrollY = 100;
    fireEvent.scroll(window);

    expect(header.className).toContain('bg-violet-400');
    expect(header.className).toContain('h-14');
    expect(header.className).toContain('shadow-2xl');
  });

  it('dispatches signOut when button clicked', () => {
    const store = configureStore({
      reducer: { ui: uiReducer },
      preloadedState: {
        ui: { isAuthenticated: true, locale: 'en' },
      } satisfies { ui: localeState },
    });

    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    fireEvent.click(screen.getByText('Sign out'));
    expect(store.getState().ui.isAuthenticated).toBe(false);
  });

  it('removes event listener on unmount', () => {
    const removeSpy = vi.spyOn(window, 'removeEventListener');

    const { unmount } = renderWithStore({
      ui: { isAuthenticated: true, locale: 'en' },
    });

    unmount();
    expect(removeSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
  });
});
