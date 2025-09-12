import { describe, it, expect } from 'vitest';
import uiReducer, {
  toggleLocale,
  signOut,
  type localeState,
  setLocale,
} from './uiSlice';

describe('uiSlice reducer', () => {
  const initialState: localeState = {
    locale: 'en',
    isAuthenticated: false,
  };

  it('should return initial state by default', () => {
    expect(uiReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should toggle locale from en to ru', () => {
    const state: localeState = { ...initialState, locale: 'en' };
    const newState = uiReducer(state, toggleLocale());

    expect(newState.locale).toBe('ru');
  });

  it('should toggle locale from ru to en', () => {
    const state: localeState = { ...initialState, locale: 'ru' };
    const newState = uiReducer(state, toggleLocale());

    expect(newState.locale).toBe('en');
  });

  it('should sign out user', () => {
    const state: localeState = { ...initialState, isAuthenticated: true };
    const newState = uiReducer(state, signOut());

    expect(newState.isAuthenticated).toBe(false);
  });

  it('should set locale explicitly', () => {
    const state = { locale: 'en', isAuthenticated: true } satisfies localeState;
    const newState = uiReducer(state, setLocale('ru'));
    expect(newState.locale).toBe('ru');
  });
});
