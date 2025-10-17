import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Button from "../components/Button";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { updateUserSuccess, updateUserStart, updateUserFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure, signOutSuccess } from "../redux/features/userSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  // console.log("currentUser:", currentUser);

  const fileRef = useRef(null);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  // const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState(null);
  const [formData, setFormData] = useState({
    username: currentUser.username,
    email: currentUser.email,
    password: "",
    photoURL: "",
  });

  // When user selects file
  const handleImageChange = (e) => {
    console.log("file:", e.target.files);
    const file = e.target.files[0];
    setImage(file);
    // setPreview(URL.createObjectURL(file));
  };

  const handleChange = function (e) {
    e.preventDefault();

    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // Upload to Cloudinary
  useEffect(
    function () {
      const handleUpload = async () => {
        try {
          if (!image) return console.log("Please select an image first!");
          setUploading(true);
          // console.log("image:", image);

          const formData = new FormData();
          // console.log("formData:", formData);
          formData.append("file", image);
          formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET);
          formData.append("cloud_name", import.meta.env.VITE_CLOUDINARY_NAME);
          formData.append("folder", "mernauth_profile_images");

          const res = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/image/upload`, {
            method: "POST",
            body: formData,
          });

          const data = await res.json();

          setUploadedUrl(data.secure_url);
          setFormData((prev) => ({ ...prev, photoURL: data.secure_url }));
          setUploading(false);
        } catch (err) {
          console.log(err);
        }
      };
      handleUpload();
    },
    [image]
  );

  // useEffect(
  //   function () {
  //     console.log("formData:", formData);
  //     console.log("uploadedUrl:", uploadedUrl);
  //   },
  //   [formData, uploadedUrl]
  // );

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      dispatch(updateUserStart());
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/users/${currentUser._id}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      console.log("ProfileUpdatedData:", data);
      if (data.success === false) {
        toast(data.message);
        return dispatch(updateUserFailure(data.message));
      }

      dispatch(updateUserSuccess(data.data));
      toast(data.message);
    } catch (err) {
      console.log(err);
      dispatch(updateUserFailure(err.message));
      toast(err.message);
    }
  }

  async function handleDeleteAccount(e) {
    e.preventDefault();
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/users/${currentUser._id}`, {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: currentUser._id }),
      });
      const data = await res.json();

      if (data.success === false) {
        toast(data.message);
        console.log(data.message);
      }

      dispatch(deleteUserSuccess());
      toast(data.message);
    } catch (err) {
      console.log(err);
      toast(err.message);
      dispatch(deleteUserFailure(err.message));
    }
  }

  async function handleSignOut() {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/auth/signout`, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();

      if (data.success === false) {
        toast(data.message);
        console.log(data.message);
      }

      toast(data.message);

      dispatch(signOutSuccess());
      navigate("/");
    } catch (err) {
      console.log(err);
      toast(err.message);
    }
  }

  return (
    <section className="flex justify-center items-center mt-50">
      <div className="px-4 w-full">
        <h1 className="text-3xl font-semibold text-center uppercase mb-10">Profile</h1>

        <form className=" max-w-3xl mx-auto" onSubmit={handleSubmit}>
          <input type="file" ref={fileRef} className="hidden" accept="image/*" onChange={handleImageChange} />
          <img
            className="w-18 h-18 rounded-full object-cover hover:border-2 duration-75 mb-4 mx-auto"
            src={uploadedUrl || currentUser.photoURL}
            alt={currentUser._id}
            onClick={() => fileRef.current.click()}
          />

          {uploading && <p className="text-blue-600 text-center">Uploading...</p>}

          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Username"
              id="username"
              className="bg-gray-300 p-3 rounded-lg focus:outline-none"
              defaultValue={currentUser.username}
              onChange={handleChange}
            />

            <input type="email" placeholder="Email" id="email" className="bg-gray-300 p-3 rounded-lg focus:outline-none" defaultValue={currentUser.email} onChange={handleChange} />

            <input
              type="password"
              placeholder="Password"
              id="password"
              className="bg-gray-300 p-3 rounded-lg focus:outline-none"
              defaultValue={currentUser.password}
              onChange={handleChange}
            />

            <Button btnBg="bg-blue-400"> Update</Button>

            <div className="flex justify-between">
              <span className="text-red-500 cursor-pointer" onClick={handleDeleteAccount}>
                Delete Account
              </span>
              <span className="text-red-500 cursor-pointer" onClick={handleSignOut}>
                Sign Out
              </span>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Profile;
