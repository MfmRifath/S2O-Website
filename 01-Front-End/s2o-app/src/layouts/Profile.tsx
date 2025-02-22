import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [roles, setRoles] = useState<string[]>([]);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      try {
        const decodedToken: any = jwtDecode(storedToken);
        // If token is expired, remove and redirect
        if (decodedToken.exp * 1000 < Date.now()) {
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          // Store roles and user info from token
          setRoles(decodedToken.roles || []);
          setUsername(decodedToken.sub);
          setUser({
            userId: decodedToken.userId,
            username: decodedToken.sub,
            roles: decodedToken.roles,
          });
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        localStorage.removeItem('token');
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    if (token && user?.userId) {
      axios
        .get(`/api/user/${user.userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUser(response.data);
          setEmail(response.data.email);
        })
        .catch((error) => console.error('Error fetching user data:', error));
    }
  }, [user?.userId, token]);

  const handleUpdateProfile = () => {
    if (token) {
      axios
        .put(
          `/api/user/${user?.userId}`,
          { username, email, password, roles },
          { headers: { Authorization: `Bearer ${token}` } },
        )
        .then((response) => {
          setUser(response.data);
          alert('Profile updated successfully');
        })
        .catch((error) => console.error('Error updating profile:', error));
    }
  };

  const handleChangePassword = () => {
    if (token) {
      axios
        .put(
          `/api/user/${user?.userId}/change-password`,
          null,
          {
            params: { currentPassword, newPassword },
            headers: { Authorization: `Bearer ${token}` },
          },
        )
        .then(() => alert('Password updated successfully'))
        .catch((error) => {
          if (error.response?.data?.message) {
            alert(error.response.data.message);
          } else {
            alert('Error updating password');
          }
        });
    }
  };

  if (!user) return <p className="text-center mt-8">Loading...</p>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="max-w-md w-full space-y-6">
        {/* Profile Card */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Profile
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Username
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={username}
                disabled
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Email
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Roles
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={roles.join(', ')}
                disabled
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                New Password (optional)
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              className="w-full py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
              onClick={handleUpdateProfile}
            >
              Update Profile
            </button>
          </div>
        </div>
        {/* Password Change Card */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Change Password
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Current Password
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                New Password
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <button
              className="w-full py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors"
              onClick={handleChangePassword}
            >
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;