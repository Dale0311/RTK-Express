import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: { token: null },
  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload.accessToken;
    },
    logOut: (state) => {
      state.token = null;
    },
  },
});

export const { logOut, setCredentials } = authSlice.actions;
export default authSlice.reducer;

export const selectToken = (state) => state.auth.token;
