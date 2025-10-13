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
      console.log("state:", state);

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
    onSetImage: (state, action) => {
      state.image = action.payload;
    },
  },
});

export const { signInSuccess, setLoading, signInFailure, onSetImage } = userSlice.actions;
export default userSlice.reducer;
