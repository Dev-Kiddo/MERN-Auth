import React from "react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { signInSuccess, signInFailure, setLoading } from "../redux/features/userSlice";
import { useSelector, useDispatch } from "react-redux";
import OAuth from "../components/OAuth";

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // const [isLoading, setIsLoading] = useState(false);
  const { isLoading } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  function handleChange(e) {
    e.preventDefault();

    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) return;

    try {
      // setIsLoading(true);
      dispatch(setLoading());

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/auth/signin`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      // const res = await fetch("http://localhost:5000/api/v1/auth/GSignin", {
      //   method: "POST",
      // credentials: "include",
      //   headers: { "Content-Type": "appliation/json" },
      //   body: JSON.stringify({
      //     username: result.user.displayName,
      //     email: result.user.email,
      //     photoURL: result.user.photoURL,
      //   }),
      // });

      const data = await res.json();

      // console.log("data:", data);

      if (!data.success) {
        dispatch(signInFailure(data.message));

        toast(data.message);
        return;
      }

      toast(data.message);

      dispatch(signInSuccess(data.data));
      // console.log(data);

      navigate("/");
    } catch (err) {
      console.log(err);

      toast(err.message);
      dispatch(signInFailure(err.message));
    }
  }

  return (
    <section className="flex justify-center items-center mt-50">
      <div className="px-4 w-full">
        <h1 className="text-3xl font-semibold text-center uppercase mb-10 ">Sign IN</h1>

        <form className="flex flex-col gap-y-5 max-w-3xl mx-auto" onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" id="email" className="bg-gray-300 p-3 rounded-lg focus:outline-none" value={formData.email} onChange={handleChange} />

          <input type="password" placeholder="Password" id="password" className="bg-gray-300 p-3 rounded-lg focus:outline-none" value={formData.password} onChange={handleChange} />

          <button className="bg-blue-600 px-5 py-3 rounded-lg text-white font-medium uppercase cursor-pointer hover:bg-blue-300 disabled:opacity-80">
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="max-w-3xl mx-auto">
          <hr className="text-gray-300 my-4" />
          <OAuth />

          <p className="flex gap-x-2 text-sm justify-center mt-4">
            Don't have an account?
            <span>
              <NavLink to="/sign-up" className="text-blue-600">
                Sign up
              </NavLink>
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
