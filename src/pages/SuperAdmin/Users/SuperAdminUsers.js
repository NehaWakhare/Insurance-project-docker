// src/pages/SuperAdmin/Users/SuperAdminUsers.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import SuperAdminSidebar from "../SuperAdminSidebar";
import SuperAdminNavbar from "../SuperAdminNavbar";

const API_BASE = "http://localhost:8089/api";

export default function SuperAdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ userName: "", email: "", password: "" });

  const [showProfile, setShowProfile] = useState(false);
  const [profileData, setProfileData] = useState(null);

  // Fetch users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/v1`);
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openModal = (user = null) => {
    if (user) {
      setEditingUser(user);
      setFormData({ userName: user.userName, email: user.email, password: "" });
    } else {
      setEditingUser(null);
      setFormData({ userName: "", email: "", password: "" });
    }
    setShowModal(true);
  };

  const saveUser = async () => {
    try {
      if (editingUser) {
        await axios.put(`${API_BASE}/v1/update/${editingUser.userId}`, formData);
      } else {
        await axios.post(`${API_BASE}/v1/save`, formData);
      }
      fetchUsers();
      setShowModal(false);
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`${API_BASE}/v1/delete/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const viewProfile = async (id) => {
    try {
      const res = await axios.get(`${API_BASE}/user-profiles/by-user/${id}`);
      setProfileData(res.data);
      setShowProfile(true);
    } catch (error) {
      console.error("Error fetching profile:", error);
      alert("Profile not found for this user.");
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <SuperAdminSidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <SuperAdminNavbar />

        <div style={{ flex: 1, padding: "20px", background: "#f4f6f8" }}>
          <h2 style={{ marginBottom: "20px" }}>👥 Manage Users</h2>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                background: "#fff",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              <thead style={{ background: "#4cafef", color: "#fff" }}>
                <tr>
                  <th style={{ padding: "10px", textAlign: "left" }}>ID</th>
                  <th style={{ padding: "10px", textAlign: "left" }}>Name</th>
                  <th style={{ padding: "10px", textAlign: "left" }}>Email</th>
                  <th style={{ padding: "10px", textAlign: "left" }}>Role</th>
                  <th style={{ padding: "10px", textAlign: "center" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ textAlign: "center", padding: "1rem" }}>
                      No users found.
                    </td>
                  </tr>
                ) : (
                  users.map((u) => (
                    <tr key={u.userId} style={{ borderBottom: "1px solid #f0f0f0" }}>
                      <td style={{ padding: "10px" }}>{u.userId}</td>
                      <td style={{ padding: "10px" }}>{u.userName}</td>
                      <td style={{ padding: "10px" }}>{u.email}</td>
                      <td style={{ padding: "10px" }}>{u.role}</td>
                      <td
                        style={{
                          padding: "10px",
                          display: "flex",
                          gap: "10px",
                          justifyContent: "center",
                        }}
                      >
                        <button
                          onClick={() => viewProfile(u.userId)}
                          style={buttonStyle("#2196f3")}
                        >
                          👁 View
                        </button>
                        <button
                          onClick={() => openModal(u)}
                          style={buttonStyle("#ffa500")}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => deleteUser(u.userId)}
                          style={buttonStyle("#f44336")}
                        >
                          🗑 Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}

          {/* Add/Edit Modal */}
          {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <h3>{editingUser ? "Edit User" : "Add User"}</h3>
              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                placeholder="Name"
                style={inputStyle}
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                style={inputStyle}
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                style={inputStyle}
              />
              <div style={{ marginTop: "1rem", display: "flex", gap: "10px" }}>
                <button onClick={saveUser} style={buttonStyle("#4cafef")}>
                  💾 Save
                </button>
                <button onClick={() => setShowModal(false)} style={buttonStyle("#ccc")}>
                  ❌ Cancel
                </button>
              </div>
            </Modal>
          )}

          {/* Profile Modal */}
          {showProfile && profileData && (
            <Modal onClose={() => setShowProfile(false)}>
              <h3>👤 User Profile</h3>
              <p><strong>Name:</strong> {profileData.fullName}</p>
              <p><strong>Phone:</strong> {profileData.phoneNumber}</p>
              <p><strong>Address:</strong> {profileData.address}</p>
              <p><strong>DOB:</strong> {profileData.dateOfBirth}</p>
              <div style={{ marginTop: "1rem", textAlign: "right" }}>
                <button onClick={() => setShowProfile(false)} style={buttonStyle("#4cafef")}>
                  Close
                </button>
              </div>
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
}

// Reusable Modal Component
const Modal = ({ children, onClose }) => (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 200,
    }}
  >
    <div
      style={{
        background: "#fff",
        padding: "2rem",
        borderRadius: "8px",
        minWidth: "350px",
        maxWidth: "500px",
        width: "90%",
      }}
    >
      {children}
    </div>
  </div>
);

const buttonStyle = (bgColor) => ({
  background: bgColor,
  color: "#fff",
  border: "none",
  padding: "6px 12px",
  borderRadius: "5px",
  cursor: "pointer",
});

const inputStyle = {
  width: "100%",
  margin: "8px 0",
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
};
