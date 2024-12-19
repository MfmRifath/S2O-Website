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

        {/* Social Media Icons */}
        <div className="flex justify-center gap-4 mb-4">
          <a
            href="#"
            className="text-white bg-blue-600 rounded-full p-2 hover:bg-blue-700 transition duration-300"
          >
            <FaFacebookF />
          </a>
          <a
            href="#"
            className="text-white bg-red-500 rounded-full p-2 hover:bg-red-600 transition duration-300"
          >
            <FaGoogle />
          </a>
          <a
            href="#"
            className="text-white bg-blue-400 rounded-full p-2 hover:bg-blue-500 transition duration-300"
          >
            <FaTwitter />
          </a>
          <a
            href="#"
            className="text-white bg-gray-800 rounded-full p-2 hover:bg-gray-900 transition duration-300"
          >
            <FaGithub />
          </a>
        </div>

        <p className="text-center text-gray-600 mb-4">
          Or sign in with your email
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700"
            >
              User Name
            </label>
            <input
              type="text"
              id="email"
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

          <div className="flex items-center justify-between mb-4">
            <div>
              <input
                type="checkbox"
                id="remember"
                className="mr-2 rounded border-gray-300"
              />
              <label htmlFor="remember" className="text-sm text-gray-600">
                Remember me
              </label>
            </div>
            <a href="#" className="text-sm text-blue-500 hover:underline">
              Forgot your password?
            </a>
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