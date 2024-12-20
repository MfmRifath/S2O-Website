import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

// JWT and User Interfaces
interface JwtPayload {
  sub: string;
  userId: number;
  roles: string[];
}

interface User {
  userId: number;
  username: string;
  email: string;
  roles: Role[];
}

interface Role {
  id: number;
  authority: string;
}

const getUserDetailsFromToken = (token: string): JwtPayload | null => {
  try {
    return jwtDecode<JwtPayload>(token);
  } catch {
    return null;
  }
};

const ProfilePage: React.FC = () => {
  const [userDetails, setUserDetails] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "settings">("overview");
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedUser = getUserDetailsFromToken(token);
      if (decodedUser) {
        axios
          .get(`http://localhost:8080/api/user/${decodedUser.userId}`)
          .then((response) => {
            setUserDetails(response.data);
            setLoading(false);
          })
          .catch(() => {
            setError("Failed to load user details.");
            setLoading(false);
          });
      } else {
        setError("Invalid token.");
        setLoading(false);
      }
    } else {
      setError("No token found.");
      setLoading(false);
    }
  }, []);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();

    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("New passwords do not match.");
      return;
    }

    axios
      .post("http://localhost:8080/api/user/change-password", {
        userId: userDetails?.userId,
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
      })
      .then(() => {
        alert("Password changed successfully!");
        setPasswords({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      })
      .catch(() => {
        alert("Failed to change password.");
      });
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
        {/* Tabs */}
        <div className="flex border-b mb-6">
          <button
            className={`px-6 py-2 text-lg font-medium ${
              activeTab === "overview"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-800"
            }`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            className={`px-6 py-2 text-lg font-medium ${
              activeTab === "settings"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-800"
            }`}
            onClick={() => setActiveTab("settings")}
          >
            Settings
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div>
            {/* Overview Section */}
            <div className="text-center">
              <div className="w-28 h-28 mx-auto rounded-full border-4 border-blue-500 overflow-hidden shadow-md">
                <img
                  src={`https://ui-avatars.com/api/?name=${userDetails?.username}&background=random`}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="mt-4 text-2xl font-semibold text-gray-800">
                {userDetails?.username}
              </h2>
              <p className="text-gray-500">{userDetails?.email}</p>
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-700">Roles</h3>
              <div className="flex flex-wrap gap-3 mt-3">
                {userDetails?.roles.map((role) => (
                  <span
                    key={role.id}
                    className="text-sm font-medium px-4 py-1 rounded-full bg-blue-100 text-blue-600 shadow"
                  >
                    {role.authority}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div>
            {/* Settings Section */}
            <h3 className="text-lg font-semibold text-gray-700">Profile Settings</h3>
            <form className="mt-4 space-y-4">
              <div>
                <label className="block text-gray-600">Username</label>
                <input
                  type="text"
                  defaultValue={userDetails?.username}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-600">Email</label>
                <input
                  type="email"
                  defaultValue={userDetails?.email}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
              >
                Save Changes
              </button>
            </form>

            {/* Change Password */}
            <h3 className="mt-8 text-lg font-semibold text-gray-700">Change Password</h3>
            <form onSubmit={handleChangePassword} className="mt-4 space-y-4">
              <div>
                <label className="block text-gray-600">Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwords.currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-600">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwords.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-600">Confirm New Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwords.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Change Password
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;