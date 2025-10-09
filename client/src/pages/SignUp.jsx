import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

const SignUp = () => {
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

    try {
      setIsLoading(true);
      // setError(null);
      const res = await fetch(`http://localhost:5000/api/v1/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("data:", data);

      toast(data.message);

      // handleClearForm();
    } catch (error) {
      // setError(error.message);

      toast(error.message);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="fixed inset-0 flex justify-center items-center">
      <div className="px-4 w-full">
        <h1 className="text-3xl font-semibold text-center uppercase mb-10 ">Sign Up</h1>

        <form className="flex flex-col gap-y-5 max-w-3xl mx-auto mb-4" onSubmit={handleSubmit}>
          <input type="text" placeholder="Username" id="username" className="bg-gray-300 p-3 rounded-lg focus:outline-none" value={formData.username} onChange={handleChange} />

          <input type="email" placeholder="Email" id="email" className="bg-gray-300 p-3 rounded-lg focus:outline-none" value={formData.email} onChange={handleChange} />

          <input type="password" placeholder="Password" id="password" className="bg-gray-300 p-3 rounded-lg focus:outline-none" value={formData.password} onChange={handleChange} />

          <button disabled={isLoading} className="bg-blue-600 px-5 py-3 rounded-lg text-white font-medium uppercase cursor-pointer hover:bg-blue-300 disabled:opacity-80">
            {isLoading ? "Creating user..." : "Sign Up"}
          </button>

          <hr className="text-gray-300" />

          <button className="w-full flex items-center justify-center gap-x-5 mx-auto px-5 py-3 border-1 rounded-lg text-gray-500 font-medium uppercase cursor-pointer hover:bg-gray-800 hover:text-white disabled:opacity-80">
            <img className="w-5" src="/google.png" />
            Continue with google
          </button>
        </form>

        <p className="flex gap-x-2 text-sm justify-center">
          Have an account?
          <span>
            <NavLink to="/sign-in" className="text-blue-600">
              Sign in
            </NavLink>
          </span>
        </p>
      </div>
    </section>
  );
};

export default SignUp;
