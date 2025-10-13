import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },

    signInFailure: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    onProfileUpdate: (state, action) => {
      state.currentUser.username = action.payload;
      state.currentUser.email = action.payload;
    },
  },
});

export const { signInSuccess, setLoading, signInFailure, onProfileUpdate } = userSlice.actions;
export default userSlice.reducer;
