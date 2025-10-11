import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  isLoading: false,
  error: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signIn: (state) => (state.isLoading = true),
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.isLoading = false;
      state.error = false;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

console.log("userSlice:", userSlice);

export const { signIn, signInSuccess, signInFailure } = userSlice.actions;
export default userSlice.reducer;
