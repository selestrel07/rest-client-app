import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserData {
  uid: string;
  email: string | null;
}

export interface UiState {
  locale: 'en' | 'ru';
  isAuthenticated: boolean;
  user: UserData | null;
}

// const initialState: UiState = {
//   locale: 'en',
//   isAuthenticated: false,
//   user: null,
// };

// it's for checking authentificated user (fake user)
// need delete it

const initialState: UiState = {
  locale: 'en',
  isAuthenticated: true,
  user: { uid: '123', email: 'test@example.com' },
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
    signIn(state, action: PayloadAction<UserData>) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    signOut(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { toggleLocale, setLocale, signIn, signOut } = uiSlice.actions;
export default uiSlice.reducer;
