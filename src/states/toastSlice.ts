import { ToastProps } from '@components';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ToastState = ToastProps | null;

const initialState: ToastState = null as ToastState;

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    setToastValue: (_state, action: PayloadAction<ToastState>) =>
      action.payload,
    clearValue: () => null,
  },
});

export const { setToastValue, clearValue } = toastSlice.actions;

export default toastSlice.reducer;
