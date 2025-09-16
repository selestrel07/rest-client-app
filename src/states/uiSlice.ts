import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface localeState {
  locale: 'en' | 'ru';
  isAuthenticated: boolean;
}

const initialState: localeState = {
  locale: 'en',
  isAuthenticated: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleLocale(state) {
      state.locale = state.locale === 'en' ? 'ru' : 'en';
    },
    setLocale(state, action: PayloadAction<'en' | 'ru'>) {
      state.locale = action.payload;
    },
    signOut(state) {
      state.isAuthenticated = false;
    },
    signIn(state) {
      state.isAuthenticated = true;
    },
  },
});

export const { toggleLocale, setLocale, signOut, signIn } = uiSlice.actions;
export default uiSlice.reducer;
