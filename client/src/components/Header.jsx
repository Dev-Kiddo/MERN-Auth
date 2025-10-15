import React, { useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <header className=" bg-gray-300 p-4">
      <div className="flex items-center justify-between mx-auto max-w-6xl">
        <NavLink to="/">
          <img className="w-10" src="/auth-logo.svg" alt="auth-logo" />
        </NavLink>

        <nav className="flex gap-5">
          <ul className="flex gap-5 items-center">
            {currentUser ? (
              <NavLink to="/profile">
                <img className="w-8 rounded-full object-cover hover:border-2 duration-75" src={currentUser.photoURL} alt={currentUser.photoURL} />
              </NavLink>
            ) : (
              <NavLink className="hover:text-blue-600 font-medium" to="/sign-in">
                Sign in
              </NavLink>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
