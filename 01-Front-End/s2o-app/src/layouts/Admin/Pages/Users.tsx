import React, { useState, useEffect } from "react";
import axios from "axios";
import apiClient from "./userService";

interface User {
  id: number;
  username: string;
  email: string;
  roles: Role[];
}

interface Role {
  id: number;
  authority: string;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [newUser, setNewUser] = useState({ username: "", email: "", password: "", roles: [] as string[] });
  const [selectedUser, setSelectedUser] = useState<User | null>(null); // For editing user
  const [loading, setLoading] = useState(false);

  // Fetch users and roles
  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await apiClient.get<User[]>("/user");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await apiClient.get<Role[]>("/roles");
      setRoles(response.data);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  const handleAddUser = async () => {
    setLoading(true);
    try {
      await apiClient.post("/user", newUser, {
        params: { roles: newUser.roles.join(",") },
      });
      fetchUsers(); // Refresh users after adding
      setNewUser({ username: "", email: "", password: "", roles: [] });
    } catch (error) {
      console.error("Error adding user:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: number) => {
    try {
      await apiClient.delete(`/user/${userId}`);
      fetchUsers(); // Refresh users after deletion
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setNewUser({
      username: user.username,
      email: user.email,
      password: "", // Optionally, you could leave this blank for the user to update
      roles: user.roles.map((role) => role.authority),
    });
  };

  const handleUpdateUser = async () => {
    if (!selectedUser) return;

    setLoading(true);
    try {
      await apiClient.put(`/user/${selectedUser.id}`, {
        username: newUser.username,
        email: newUser.email,
        password: newUser.password,
        roles: newUser.roles,
      });
      fetchUsers(); // Refresh the users list after updating
      setSelectedUser(null); // Clear the selected user
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleSelection = (role: string) => {
    setNewUser((prev) => ({
      ...prev,
      roles: prev.roles.includes(role)
        ? prev.roles.filter((r) => r !== role)
        : [...prev.roles, role],
    }));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center">User Management</h1>

      {/* User List */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">User List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-left text-sm uppercase text-gray-600">
                <th className="p-3">ID</th>
                <th className="p-3">Username</th>
                <th className="p-3">Email</th>
                <th className="p-3">Roles</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-100">
                  <td className="p-3">{user.id}</td>
                  <td className="p-3">{user.username}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.roles.map(role => role.authority).join(", ")}</td>
                  <td className="p-3">
                    <button
                      onClick={() => handleEditUser(user)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit User Form */}
      <div>
        <h2 className="text-xl font-semibold mb-2">{selectedUser ? "Edit User" : "Add New User"}</h2>
        <div className="bg-white p-6 shadow rounded-lg">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Username</label>
            <input
              type="text"
              value={newUser.username}
              onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Assign Roles</label>
            <div className="flex flex-wrap gap-2">
              {roles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => handleRoleSelection(role.authority)}
                  className={`px-3 py-1 border rounded ${
                    newUser.roles.includes(role.authority) ? "bg-blue-500 text-white" : "bg-gray-100"
                  }`}
                >
                  {role.authority}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={selectedUser ? handleUpdateUser : handleAddUser}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? (selectedUser ? "Updating..." : "Adding...") : (selectedUser ? "Update User" : "Add User")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;