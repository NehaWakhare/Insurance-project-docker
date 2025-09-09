const API_BASE_URL = "http://localhost:8089/api"; //  Base URL for backend

// Super Admin login
export async function superAdminLogin(email, password) {
  const response = await fetch(`${API_BASE_URL}/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Invalid super admin credentials");
  }

  return response.json(); // token, role
}

// Get all admins
export async function fetchAllAdmins() {
  const response = await fetch(`${API_BASE_URL}/admin/all`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch admin list");
  }

  return response.json();
}

// Get pending admins
export async function fetchPendingAdmins() {
  const response = await fetch(`${API_BASE_URL}/admin/pending`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch pending admins");
  }

  return response.json();
}

// Approve admin
export async function approveAdmin(id) {
  const response = await fetch(`${API_BASE_URL}/admin/approve/${id}`, {
    method: "PUT",
  });

  if (!response.ok) {
    throw new Error("Failed to approve admin");
  }

  return response.text();
}

// Reject admin
export async function rejectAdmin(id) {
  const response = await fetch(`${API_BASE_URL}/admin/reject/${id}`, {
    method: "PUT",
  });

  if (!response.ok) {
    throw new Error("Failed to reject admin");
  }

  return response.text();
}
