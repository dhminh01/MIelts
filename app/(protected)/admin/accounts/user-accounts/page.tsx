"use client";

import React, { useState } from "react";
import {
  addUser,
  updateUser,
  deleteUser,
  fetchUsers,
} from "@/actions/manage-users";
import { Button } from "@/components/ui/button";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // For editing a user
  const [addForm, setAddForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER",
  });
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER",
  });

  React.useEffect(() => {
    const fetchData = async () => {
      const usersData = await fetchUsers();
      setUsers(usersData);
    };

    fetchData();
  }, []);

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    const newUser = await addUser(addForm);
    setUsers([...users, newUser]);
    setAddForm({ name: "", email: "", password: "", role: "USER" });
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setEditForm({
      name: user.name,
      email: user.email,
      password: "", // Password is not shown for security reasons
      role: user.role,
    });
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;

    const updatedUser = await updateUser(selectedUser.id, editForm);
    setUsers(
      users.map((user) => (user.id === selectedUser.id ? updatedUser : user))
    );
    setSelectedUser(null);
    setEditForm({ name: "", email: "", password: "", role: "USER" });
  };

  const handleDeleteUser = async (id: string) => {
    await deleteUser(id);
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="flex flex-col items-center justify-center px-2 py-4 lg:px-10">
      {/* Total Number of Users
      <div className="self-start">
        <span className="text-sm font-semibold text-gray-500">
          Total Accounts: {users.length}
        </span>
      </div> */}

      <h1 className="text-3xl font-bold text-center">
        Quản lý tài khoản người dùng:
      </h1>

      {/* Add User Form */}
      <div className="w-full max-w-2xl my-4">
        <h2 className="py-3 text-xl font-bold text-center">Thêm người dùng:</h2>
        <form onSubmit={handleAddUser} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Name"
            value={addForm.name}
            onChange={(e) => setAddForm({ ...addForm, name: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={addForm.email}
            onChange={(e) => setAddForm({ ...addForm, email: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={addForm.password}
            onChange={(e) =>
              setAddForm({ ...addForm, password: e.target.value })
            }
            className="w-full p-2 border rounded"
          />
          <select
            value={addForm.role}
            onChange={(e) => setAddForm({ ...addForm, role: e.target.value })}
            className="w-full p-2 border rounded"
          >
            <option value="USER">User</option>
            <option value="INSTRUCTOR">Instructor</option>
            <option value="ADMIN">Admin</option>
          </select>
          <Button type="submit" className="p-2 text-white bg-blue-500 rounded">
            Add User
          </Button>
        </form>
      </div>

      {/* Update User Form */}
      {selectedUser && (
        <div className="w-full max-w-2xl my-4">
          <h2 className="text-lg font-bold">Chỉnh sửa thông tin:</h2>
          <form onSubmit={handleUpdateUser} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Name"
              value={editForm.name}
              onChange={(e) =>
                setEditForm({ ...editForm, name: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
            <input
              type="email"
              placeholder="Email"
              value={editForm.email}
              onChange={(e) =>
                setEditForm({ ...editForm, email: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
            <input
              type="password"
              placeholder="Password (leave blank to keep current)"
              value={editForm.password}
              onChange={(e) =>
                setEditForm({ ...editForm, password: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
            <select
              value={editForm.role}
              onChange={(e) =>
                setEditForm({ ...editForm, role: e.target.value })
              }
              className="w-full p-2 border rounded"
            >
              <option value="USER">User</option>
              <option value="INSTRUCTOR">Instructor</option>
              <option value="ADMIN">Admin</option>
            </select>
            <div className="flex gap-4">
              <Button
                type="submit"
                className="flex-1 p-2 text-white bg-green-500 rounded"
              >
                Update User
              </Button>
              <Button
                type="Button"
                onClick={() => {
                  setSelectedUser(null);
                  setEditForm({
                    name: "",
                    email: "",
                    password: "",
                    role: "USER",
                  });
                }}
                className="flex-1 p-2 text-white bg-gray-500 rounded"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      <h2 className="py-3 text-xl font-bold text-center">
        Danh sách tài khoản người dùng:
      </h2>
      {/* User List Table */}
      <div className="w-full max-w-4xl overflow-x-auto">
        <table className="w-full border border-collapse border-gray-300">
          <thead>
            <tr>
              <th className="p-1">STT</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Role</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td className="p-2 text-center border">{index + 1}</td>
                <td className="p-2 border">{user.name}</td>
                <td className="p-2 border">{user.email}</td>
                <td className="p-2 border">{user.role}</td>
                <td className="flex justify-center gap-2 p-2 border ">
                  <Button
                    onClick={() => handleEditUser(user)}
                    className="text-blue-500 bg-white"
                  >
                    Sửa
                  </Button>
                  <Button
                    onClick={() => handleDeleteUser(user.id)}
                    className="text-red-500 bg-white"
                  >
                    Xóa
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer with Total Count */}
      <div className="mt-4">
        <p className="text-gray-600">
          Total number of accounts: {users.length}
        </p>
      </div>
    </div>
  );
};

export default ManageUsers;
