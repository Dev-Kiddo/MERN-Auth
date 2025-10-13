import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { onProfileUpdate } from "../redux/features/userSlice";
import Button from "../components/Button";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);

  const dispatch = useDispatch();

  function handleProfileUpdate() {}

  return (
    <section className="fixed inset-0 flex justify-center items-center">
      <div className="px-4 w-full">
        <h1 className="text-3xl font-semibold text-center uppercase mb-10">Profile</h1>

        <form className=" max-w-3xl">
          <img className="w-18 rounded-full object-cover hover:border-2 duration-75 mb-4 mx-auto" src={currentUser.photoURL} alt={currentUser._id} />

          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Username"
              id="username"
              className="bg-gray-300 p-3 rounded-lg focus:outline-none"
              value={currentUser.username}
              onChange={handleProfileUpdate}
            />

            <input type="email" placeholder="Email" id="email" className="bg-gray-300 p-3 rounded-lg focus:outline-none" value={currentUser.email} />

            <input type="password" placeholder="Password" id="password" className="bg-gray-300 p-3 rounded-lg focus:outline-none" />

            <Button btnBg="bg-blue-400"> Update</Button>

            <div className="flex justify-between">
              <span className="text-red-500 cursor-pointer">Delete Account</span>
              <span className="text-red-500 cursor-pointer">Sign Out</span>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Profile;
