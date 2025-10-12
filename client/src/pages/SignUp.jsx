import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../components/Button";

import OAuth from "../components/OAuth";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormdata] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);

  function handleChange(e) {
    setFormdata((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }

  function handleClearForm() {
    setFormdata((prev) => ({ ...prev, username: "", email: "", password: "" }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const { username, email, password } = formData;

    if (!username || !email || !password) return;

    try {
      setIsLoading(true);
      // setError(null);
      const res = await fetch(`http://localhost:5000/api/v1/auth/signup`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      // console.log("data:", data);

      navigate("/sign-in");

      toast(data.message);

      handleClearForm();
    } catch (error) {
      // setError(error.message);

      toast(error.message);
      // console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="fixed inset-0 flex justify-center items-center">
      <div className="px-4 w-full">
        <h1 className="text-3xl font-semibold text-center uppercase mb-10 ">Sign Up</h1>

        <form className="flex flex-col gap-y-5 max-w-3xl mx-auto" onSubmit={handleSubmit}>
          <input type="text" placeholder="Username" id="username" className="bg-gray-300 p-3 rounded-lg focus:outline-none" value={formData.username} onChange={handleChange} />

          <input type="email" placeholder="Email" id="email" className="bg-gray-300 p-3 rounded-lg focus:outline-none" value={formData.email} onChange={handleChange} />

          <input type="password" placeholder="Password" id="password" className="bg-gray-300 p-3 rounded-lg focus:outline-none" value={formData.password} onChange={handleChange} />

          {/* <button disabled={isLoading} className="bg-blue-600 px-5 py-3 rounded-lg text-white font-medium uppercase cursor-pointer hover:bg-blue-300 disabled:opacity-80">
            {isLoading ? "Creating user..." : "Sign Up"}
          </button> */}

          <Button btnBg="bg-blue-600" hoverBg="bg-gray-800" hoverText="text-white">
            {isLoading ? "Creating user..." : "Sign Up"}
          </Button>
        </form>

        <div className="max-w-3xl mx-auto">
          <hr className="text-gray-300 my-4" />

          {/* <button className="w-full flex items-center justify-center gap-x-3 mx-auto px-5 py-3 border-1 rounded-lg text-gray-500 font-medium uppercase cursor-pointer hover:bg-gray-800 hover:text-white disabled:opacity-80">
            <img className="w-5" src="/google.png" />
            Continue with google
          </button> */}

          {/* <Button btnColor="text-gray-500" iconUrl="/google.png" hoverBg="bg-gray-800" hoverText="text-white">
            Continue with google
          </Button> */}

          <OAuth />

          <p className="flex gap-x-2 text-sm justify-center mt-4">
            Have an account?
            <span>
              <NavLink to="/sign-in" className="text-blue-600">
                Sign in
              </NavLink>
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
