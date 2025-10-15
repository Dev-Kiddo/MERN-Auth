import React from "react";

const Home = () => {
  return (
    <section className="flex justify-center items-center mt-50">
      <div className="px-4 flex flex-col gap-y-5 max-w-3xl mx-auto">
        <h1 className="text-center text-3xl font-semibold ">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-indigo-600 from-violet-400">MERN Authentication System</span>
        </h1>
        <p className="text-justify text-gray-700">
          This project demonstrates a complete user authentication system built with the MERN stack (MongoDB, Express, React, Node.js). It includes essential features like user
          registration, login, logout. The backend ensures security using JWT authentication and bcrypt password hashing, while the frontend is powered by React with Redux Toolkit
          for efficient and centralized state management. This setup provides a scalable, real-world foundation for any modern web application that requires user authentication.
        </p>

        <ul className="mx-auto text-gray-500">
          <li className="list-decimal">React + Redux Toolkit — for clean and predictable state management</li>
          <li className="list-decimal">MongoDB + Mongoose — for secure and flexible data storage</li>
          <li className="list-decimal">JWT Authentication — for session handling</li>
          <li className="list-decimal">Bcrypt.js — for password encryption</li>
          <li className="list-decimal">Cloudinary — for profile image upload and management</li>
        </ul>
      </div>
    </section>
  );
};

export default Home;
