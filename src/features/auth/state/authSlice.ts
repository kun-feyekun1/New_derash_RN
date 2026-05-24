import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { User } from '../types/auth.types';

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  bootstrapped: boolean;
};

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  bootstrapped: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSession(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.bootstrapped = true;
    },
    clearSession(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.bootstrapped = true;
    },
    markBootstrapped(state) {
      state.bootstrapped = true;
    }
  }
});

export const { setSession, clearSession, markBootstrapped } = authSlice.actions;
export const authReducer = authSlice.reducer;
