import React from "react";
import Button from "./Button";

import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../../firebase.js";

import { signInSuccess } from "../redux/features/userSlice.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function handleGoogleLogin() {
    try {
      // console.log("continue with google btn clicked");
      const provider = new GoogleAuthProvider();
      // console.log("provider:", provider);

      const auth = getAuth(app);
      // console.log("auth:", auth);

      const result = await signInWithPopup(auth, provider);
      // console.log("result:", result);
      // console.log("result:", result.user);

      const payload = {
        username: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
      };

      const res = await fetch("/api/v1/auth/GSignin", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      toast(data.message);

      dispatch(signInSuccess(data.data));

      navigate("/");
    } catch (error) {
      console.log("Couldn't Login with google:", error);
    }
  }
  return (
    <Button btnColor="text-gray-500" iconUrl="/google.png" hoverBg="bg-gray-800" hoverText="text-white" onclick={handleGoogleLogin}>
      Continue with google
    </Button>
  );
};

{
  /* <button className="w-full flex items-center justify-center gap-x-3 mx-auto px-5 py-3 border-1 rounded-lg text-gray-500 font-medium uppercase cursor-pointer hover:bg-gray-800 hover:text-white disabled:opacity-80">
            <img className="w-5" src="/google.png" />
            Continue with google
          </button> */
}

export default OAuth;
