import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="bg-gray-900 text-white min-h-screen w-64 flex flex-col py-6 px-4 space-y-6 shadow-lg mt-16">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-extrabold text-blue-500">
          Admin Panel
        </h1>
        <p className="text-sm text-gray-400 mt-1">Manage with ease</p>
      </div>

      {/* Navigation Links */}
      <div className="space-y-3">
        <Link
          to="/adminUsers"
          className={`flex items-center px-4 py-3 rounded-md text-lg font-medium transition-transform duration-300 ${
            location.pathname === "/adminUsers"
              ? "bg-blue-600 scale-105 shadow-lg"
              : "hover:bg-gray-700 hover:scale-105"
          }`}
        >
          <i className="fas fa-users mr-3"></i>
          <span>Users Management</span>
        </Link>
        <Link
          to="/adminReports"
          className={`flex items-center px-4 py-3 rounded-md text-lg font-medium transition-transform duration-300 ${
            location.pathname === "/adminReports"
              ? "bg-blue-600 scale-105 shadow-lg"
              : "hover:bg-gray-700 hover:scale-105"
          }`}
        >
          <i className="fas fa-file-alt mr-3"></i>
          <span>Reports</span>
        </Link>
        <Link
          to="/adminAnalytics"
          className={`flex items-center px-4 py-3 rounded-md text-lg font-medium transition-transform duration-300 ${
            location.pathname === "/adminAnalytics"
              ? "bg-blue-600 scale-105 shadow-lg"
              : "hover:bg-gray-700 hover:scale-105"
          }`}
        >
          <i className="fas fa-chart-line mr-3"></i>
          <span>Analytics</span>
        </Link>

        {/* Dropdown */}
        <div className="relative group">
          <button
            className={`flex items-center px-4 py-3 rounded-md text-lg font-medium w-full transition-transform duration-300 ${
              location.pathname.startsWith("/adminSettings")
                ? "bg-blue-600 scale-105 shadow-lg"
                : "hover:bg-gray-700 hover:scale-105"
            }`}
          >
            <i className="fas fa-cog mr-3"></i>
            <span>Settings</span>
            <i className="fas fa-chevron-down ml-auto"></i>
          </button>
          <ul className="bg-gray-800 mt-2 rounded-lg hidden group-hover:block">
            <li>
              <Link
                to="/siteSettings"
                className={`block px-4 py-2 text-sm rounded-md ${
                  location.pathname === "/adminSettings/site"
                    ? "bg-blue-600"
                    : "hover:bg-gray-700"
                }`}
              >
                Site Settings
              </Link>
            </li>
            <li>
              <Link
                to="/securitySettings"
                className={`block px-4 py-2 text-sm rounded-md ${
                  location.pathname === "/adminSettings/security"
                    ? "bg-blue-600"
                    : "hover:bg-gray-700"
                }`}
              >
                Security Settings
              </Link>
            </li>
          </ul>
        </div>

        <Link
          to="/adminDonationManagment"
          className={`flex items-center px-4 py-3 rounded-md text-lg font-medium transition-transform duration-300 ${
            location.pathname === "/adminDonationManagment"
              ? "bg-blue-600 scale-105 shadow-lg"
              : "hover:bg-gray-700 hover:scale-105"
          }`}
        >
          <i className="fas fa-donate mr-3"></i>
          <span>Donation Management</span>
        </Link>
        <Link
          to="/content"
          className={`flex items-center px-4 py-3 rounded-md text-lg font-medium transition-transform duration-300 ${
            location.pathname === "/content"
              ? "bg-blue-600 scale-105 shadow-lg"
              : "hover:bg-gray-700 hover:scale-105"
          }`}
        >
          <i className="fas fa-edit mr-3"></i>
          <span>Website Management</span>
        </Link>
      </div>

      {/* Footer */}
      <div className="mt-auto text-center text-sm text-gray-400">
        <p>&copy; 2024 Admin Panel</p>
      </div>
    </nav>
  );
};

export default Sidebar;