import React, { useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";
import axios from "axios";
import { AiOutlineLogout } from "react-icons/ai";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfilePage: React.FC = () => {
  interface UserDetails {
    userId: string;
    username: string;
    email: string;
    bio?: string;
    profilePicture?: string;
  }

  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  useEffect(() => {
    interface DecodedToken {
      userId: string;
    }

    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedUser = jwtDecode<DecodedToken>(token);
        axios
          .get(`http://localhost:8080/api/user/${decodedUser.userId}`)
          .then((res) => {
            setUserDetails(res.data);
            setUpdatedEmail(res.data.email);
            setLoading(false);
          })
          .catch(() => setError("Failed to load user details."));
      } catch {
        setError("Invalid token.");
      }
    } else {
      setError("No token found.");
    }
  }, []);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
  };

  const handleEmailUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8080/api/user/${userDetails?.userId}`, {
        email: updatedEmail,
      })
      .then(() => {
        toast.success("Email updated successfully!");
        setUserDetails((prev) => (prev ? { ...prev, email: updatedEmail } : prev));
      })
      .catch(() => toast.error("Failed to update email."));
  };

  const handleProfilePictureUpload = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!profilePicture) {
      toast.error("Please select a profile picture.");
      return;
    }

    const formData = new FormData();
    formData.append("profilePicture", profilePicture);
    formData.append("userId", userDetails?.userId || "");

    axios
      .post(`http://localhost:8080/api/user/upload-profile-picture`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        toast.success("Profile picture updated successfully!");
        setUserDetails((prev) => (prev ? { ...prev, profilePicture: res.data.url } : prev));
      })
      .catch(() => toast.error("Failed to upload profile picture."));
  };

  const handleChangePassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    axios
      .post("http://localhost:8080/api/user/change-password", {
        userId: userDetails?.userId,
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
      })
      .then(() => toast.success("Password changed successfully!"))
      .catch(() => toast.error("Failed to change password."));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">My Profile</h1>
          <button className="flex items-center text-red-500">
            <AiOutlineLogout className="mr-2" /> Logout
          </button>
        </div>
      </header>

      <main className="container mx-auto mt-8 p-6 bg-white shadow rounded">
        <div className="flex border-b mb-4">
          {["overview", "settings"].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 ${
                activeTab === tab
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "overview" ? "Overview" : "Settings"}
            </button>
          ))}
        </div>

        {activeTab === "overview" && (
          <section className="mt-4 text-center">
            <img
              src={userDetails?.profilePicture || `https://ui-avatars.com/api/?name=${userDetails?.username}&background=random`}
              alt="Avatar"
              className="w-24 h-24 rounded-full mx-auto border-2 border-blue-500"
            />
            <h2 className="mt-4 text-2xl font-semibold text-gray-800">
              {userDetails?.username}
            </h2>
            <p className="text-gray-500">{userDetails?.email}</p>
          </section>
        )}

        {activeTab === "settings" && (
          <section className="mt-4 space-y-8">
            {/* Update Email */}
            <form onSubmit={handleEmailUpdate} className="space-y-4">
              <h3 className="text-xl font-semibold">Update Email</h3>
              <div>
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  value={updatedEmail}
                  onChange={(e) => setUpdatedEmail(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <button
                type="submit"
                className="p-2 bg-blue-500 text-white rounded"
              >
                Update Email
              </button>
            </form>

            {/* Update Profile Picture */}
            <form onSubmit={handleProfilePictureUpload} className="space-y-4">
              <h3 className="text-xl font-semibold">Update Profile Picture</h3>
              <div>
                <label className="block text-gray-700">Upload Picture</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setProfilePicture(e.target.files ? e.target.files[0] : null)
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
              <button
                type="submit"
                className="p-2 bg-blue-500 text-white rounded"
              >
                Upload Picture
              </button>
            </form>

            {/* Change Password */}
            <form onSubmit={handleChangePassword} className="space-y-4">
              <h3 className="text-xl font-semibold">Change Password</h3>
              <div>
                <label className="block text-gray-700">Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  onChange={handlePasswordChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  onChange={handlePasswordChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  onChange={handlePasswordChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <button
                type="submit"
                className="p-2 bg-blue-500 text-white rounded"
              >
                Change Password
              </button>
            </form>
          </section>
        )}
      </main>
    </div>
  );
};

export default ProfilePage;