import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

type APIResponse = { error: string } | { status: number; data: unknown } | null;
export type HeaderItem = { key: string; value: string };

interface RestClientState {
  method: string;
  endpoint: string;
  headers: HeaderItem[];
  body: string;
  isJson: boolean;
  response: APIResponse;
  isLoading: boolean;
}

const initialState: RestClientState = {
  method: 'GET',
  endpoint: '',
  headers: [],
  body: '',
  isJson: true,
  response: null,
  isLoading: false,
};

export const sendRequest = createAsyncThunk(
  'restClient/sendRequest',
  async (
    {
      method,
      endpoint,
      headers,
      body,
    }: Omit<RestClientState, 'response' | 'isJson' | 'isLoading'>,
    { rejectWithValue }
  ) => {
    try {
      const res = await fetch(endpoint, {
        method,
        headers: headers.reduce(
          (acc, h) => {
            if (h.key) acc[h.key] = h.value;
            return acc;
          },
          {} as Record<string, string>
        ),
        body: method === 'GET' || !body ? undefined : body,
      });

      let data: unknown;
      try {
        data = await res.json();
      } catch {
        data = await res.text();
      }

      return { status: res.status, data };
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : 'Unknown error'
      );
    }
  }
);

const restClientSlice = createSlice({
  name: 'restClient',
  initialState,
  reducers: {
    setMethod: (state, action: PayloadAction<string>) => {
      state.method = action.payload;
    },
    setEndpoint: (state, action: PayloadAction<string>) => {
      state.endpoint = action.payload;
    },
    addHeader: (state, action: PayloadAction<HeaderItem>) => {
      state.headers.push(action.payload);
    },
    setHeaders: (state, action: PayloadAction<HeaderItem[]>) => {
      state.headers = action.payload;
    },
    setBody: (state, action: PayloadAction<string>) => {
      state.body = action.payload;
    },
    setIsJson: (state, action: PayloadAction<boolean>) => {
      state.isJson = action.payload;
    },
    clearResponse: (state) => {
      state.response = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendRequest.pending, (state) => {
        state.isLoading = true;
        state.response = null;
      })
      .addCase(sendRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.response = action.payload as APIResponse;
      })
      .addCase(sendRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.response = { error: action.payload as string };
      });
  },
});

export const {
  setMethod,
  setEndpoint,
  addHeader,
  setHeaders,
  setBody,
  setIsJson,
  clearResponse,
} = restClientSlice.actions;
export default restClientSlice.reducer;
