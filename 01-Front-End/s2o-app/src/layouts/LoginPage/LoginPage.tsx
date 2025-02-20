import React, { useState } from "react";
import {
  FaFacebookF,
  FaGoogle,
  FaTwitter,
  FaGithub,
  FaInstagram,
  FaPinterest,
  FaDribbble,
} from "react-icons/fa";
import { login } from "./AuthenticationService";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setError(''); // Clear previous errors

    try {
      await login(username, password);
      window.location.href = '/home';
    } catch (err: any) {
      if (err.response?.status === 401) {
        setError('Invalid username or password');
      } else if (err.response?.status === 500) {
        setError('Internal server error. Please try again later.');
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600"
      style={{
        backgroundImage: `url(${require("./../../Images/bg.jpg")})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Login Form Card */}
      <div className="w-full max-w-md bg-white bg-opacity-90 shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-4">
          Log In
        </h2>

        {/* Display Error Message */}
        {error && (
          <p className="text-red-500 text-center bg-red-100 border border-red-400 px-3 py-2 rounded-md mb-4">
            {error}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-semibold text-gray-700"
            >
              User Name
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your User Name"
              className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition duration-300"
          >
            Log In
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center mt-4 text-gray-600">
          Don’t have an account?{" "}
          <a href="/signUp" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;