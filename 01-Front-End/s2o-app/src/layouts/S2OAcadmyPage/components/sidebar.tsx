import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import {
  FaHome,
  FaChalkboardTeacher,
  FaStar,
  FaEnvelope,
  FaBook,
  FaChartLine,
  FaUser,
  FaBars,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Sidebar: React.FC = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setSidebarVisible(!isSidebarVisible);

  return (
    <div className="relative flex">
      {/* Sidebar and Toggle Button Container */}
      <div
        className={`relative flex shadow-lg mt-10 items-start transition-transform duration-700 ease-in-out z-10 ${
          isSidebarVisible ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        {/* Sidebar Container */}
        <div className="mt-5 bg-gradient-to-b from-gray-800 to-gray-900 text-white shadow-lg w-64 md:w-80 h-auto flex-shrink-0 flex flex-col">
          {/* Logo Section */}
          <div className="flex flex-col items-center mt-6">
            <img
              src={require("./../../../Images/s2o-academy.jpg")}
              className="h-16 w-16 rounded-full shadow-md transition-transform duration-500 hover:scale-110"
              alt="S2O Academy Logo"
            />
            <h2 className="text-lg font-semibold mt-3 text-gray-300">
              <span className="text-yellow-500">S2O</span> Academy
            </h2>
          </div>
          <hr className="my-4 border-gray-600" />

          {/* Navigation Links */}
          <Nav className="flex flex-col space-y-3 px-4">
            {[
              { hash: "#home", label: "Home", icon: <FaHome /> },
              { hash: "#teachers", label: "Our Teachers", icon: <FaChalkboardTeacher /> },
              { hash: "#results", label: "Our Best Results", icon: <FaStar /> },
              { hash: "#contact", label: "Contact Us", icon: <FaEnvelope /> },
            ].map(({ hash, label, icon }) => (
              <Nav.Link
                key={hash}
                href={hash}
                className={`flex items-center p-3 rounded-md text-sm font-medium transition-transform transform hover:scale-105 ${
                  location.hash === hash
                    ? "bg-yellow-500 text-gray-800 shadow-md"
                    : "hover:bg-gray-700 hover:text-yellow-300"
                }`}
              >
                {icon}
                <span className="ml-3">{label}</span>
              </Nav.Link>
            ))}
            <hr className="my-2 border-gray-600" />
            <Link
              to="/S2OLibrary"
              className={`flex items-center p-3 rounded-md text-sm font-medium transition-transform transform hover:scale-105 ${
                location.pathname === "/S2OLibrary"
                  ? "bg-yellow-500 text-gray-800 shadow-md"
                  : "hover:bg-gray-700 hover:text-yellow-300"
              }`}
            >
              <FaBook />
              <span className="ml-3">S2O Library</span>
            </Link>
            <Link
              to="/resultPortal"
              className={`flex items-center p-3 rounded-md text-sm font-medium transition-transform transform hover:scale-105 ${
                location.pathname === "/resultPortal"
                  ? "bg-yellow-500 text-gray-800 shadow-md"
                  : "hover:bg-gray-700 hover:text-yellow-300"
              }`}
            >
              <FaChartLine />
              <span className="ml-3">Result Portal</span>
            </Link>
          </Nav>
          <hr className="my-4 border-gray-600" />

          {/* User Profile Section */}
          <div className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-700 rounded-md cursor-pointer transition-transform transform hover:scale-105">
            <div className="h-10 w-10 bg-gray-600 rounded-full flex items-center justify-center shadow-md">
              <FaUser className="text-xl text-white" />
            </div>
            <div>
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-gray-400">johndoe@example.com</p>
            </div>
          </div>
        </div>

        {/* Toggle Button */}
        <button
          className="absolute top-6 right-[-20px] p-2 bg-blue-500 text-white rounded-md shadow-lg transition-transform transform hover:scale-105 hover:bg-blue-600"
          onClick={toggleSidebar}
        >
          <FaBars />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;