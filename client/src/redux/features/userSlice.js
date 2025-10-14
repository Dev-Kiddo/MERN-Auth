import { createSlice } from "@reduxjs/toolkit";

// const [image, setImage] = useState(null);
// const [preview, setPreview] = useState("");
// const [uploading, setUploading] = useState(false);
// const [uploadedUrl, setUploadedUrl] = useState("");

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isLoading: false,
    error: null,
    image: null,
    uploading: false,
    uploadedUrl: "",
  },
  reducers: {
    signInSuccess: (state, action) => {
      // console.log("state:", state);

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
    updateUserStart: (state) => {
      state.isLoading = true;
    },
    updateUserSuccess: (state, action) => {
      // console.log("updateUserSuccess:", state, action.payload);
      state.currentUser = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    updateUserFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { signInSuccess, setLoading, signInFailure, updateUserStart, updateUserSuccess, updateUserFailure } = userSlice.actions;

export default userSlice.reducer;
