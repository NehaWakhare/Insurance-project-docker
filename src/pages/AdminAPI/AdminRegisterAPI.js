// src/pages/AdminAPI/AdminRegisterAPI.js
import axios from "axios";

const API_BASE_URL = "http://localhost:8089/api/admin";

export const registerAdmin = async (formData) => {
  const token = localStorage.getItem("token");

  return await axios.post(`${API_BASE_URL}/register`, formData, {
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
      "Content-Type": "application/json",
    },
  });
};
