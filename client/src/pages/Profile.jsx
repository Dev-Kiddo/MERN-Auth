import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Button from "../components/Button";
import { useRef } from "react";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);

  const fileRef = useRef(null);

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState(null);

  // When user selects file
  const handleImageChange = (e) => {
    console.log("file:", e.target.files);
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // Upload to Cloudinary
  useEffect(
    function () {
      const handleUpload = async () => {
        try {
          if (!image) return console.log("Please select an image first!");
          setUploading(true);
          console.log("image:", image);

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
          setUploading(false);
        } catch (err) {
          console.log(err);
        }
      };
      handleUpload();
    },
    [image]
  );

  async function handleSubmit() {
    
  }

  return (
    <section className="fixed inset-0 flex justify-center items-center">
      <div className="px-4 w-full">
        <h1 className="text-3xl font-semibold text-center uppercase mb-10">Profile</h1>

        <form className=" max-w-3xl" onSubmit={handleSubmit}>
          <input type="file" ref={fileRef} className="hidden" accept="image/*" onChange={handleImageChange} />
          <img
            className="w-18 h-18 rounded-full object-cover hover:border-2 duration-75 mb-4 mx-auto"
            src={uploadedUrl ? uploadedUrl : currentUser.photoURL}
            alt={currentUser._id}
            onClick={() => fileRef.current.click()}
          />

          {uploading && <p className="text-blue-600 text-center">Uploading...</p>}

          <div className="flex flex-col gap-4">
            <input type="text" placeholder="Username" id="username" className="bg-gray-300 p-3 rounded-lg focus:outline-none" value={currentUser.username} />

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
