import { ToastProps } from '@components';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ToastState = ToastProps | null;

const initialState: ToastState = null as ToastState;

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    setValue: (_state, action: PayloadAction<ToastState>) => action.payload,
    clearValue: () => null,
  },
});

export const { setValue, clearValue } = toastSlice.actions;

export default toastSlice.reducer;
