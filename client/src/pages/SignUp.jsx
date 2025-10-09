import React from "react";
import { NavLink } from "react-router-dom";

const SignUp = () => {
  return (
    <section className="fixed inset-0 flex justify-center items-center">
      <div className="px-4 w-full">
        <h1 className="text-3xl font-semibold text-center uppercase mb-10 ">Sign Up</h1>

        <form className="flex flex-col gap-y-5 max-w-3xl mx-auto mb-4">
          <input type="text" placeholder="Username" id="username" className="bg-gray-300 p-3 rounded-lg focus:outline-none" />

          <input type="email" placeholder="Email" id="email" className="bg-gray-300 p-3 rounded-lg focus:outline-none" />

          <input type="password" placeholder="Password" id="password" className="bg-gray-300 p-3 rounded-lg focus:outline-none" />

          <button className="bg-blue-600 px-5 py-3 rounded-lg text-white font-medium uppercase cursor-pointer hover:bg-blue-300 disabled:opacity-80">Sign Up</button>

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
