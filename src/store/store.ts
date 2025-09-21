import { configureStore, combineReducers } from '@reduxjs/toolkit';
import uiReducer from '@states/uiSlice';
import toastReducer from '@states/toastSlice';
import restClientReducer from '@states/restClientSlice';

const rootReducer = combineReducers({
  ui: uiReducer,
  toast: toastReducer,
  restClient: restClientReducer,
});

export const createStore = (
  preloadedState?: Partial<ReturnType<typeof rootReducer>>
) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type AppStore = ReturnType<typeof createStore>;
export type AppDispatch = AppStore['dispatch'];
export type RootState = ReturnType<AppStore['getState']>;
