import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className=" bg-gray-300 p-4">
      <div className="flex items-center justify-between mx-auto max-w-6xl">
        <NavLink to="/">
          <img src="/auth-logo.svg" alt="auth-logo" />
        </NavLink>

        <nav className="flex gap-5">
          <ul className="flex gap-5 items-center">
            <NavLink className="hover:text-blue-600 font-medium" to="/about">
              About
            </NavLink>
            <NavLink className="hover:text-blue-600 font-medium" to="/sign-in">
              Sign in
            </NavLink>
          </ul>

          {/* <NavLink to="/profile">
            <img className="w-10" src="/default-user-icon.png" alt="" />
          </NavLink> */}
        </nav>
      </div>
    </header>
  );
};

export default Header;
