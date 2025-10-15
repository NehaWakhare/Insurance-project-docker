import React from "react";
import { LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SuperAdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/superadmin/login");
  };

  const handleProfile = () => {
    navigate("/superadmin/dashboard/profile");
  };

  return (
    <div style={styles.navbar}>
      <div style={styles.left}>
        <h2 style={styles.logo}>Super Admin Dashboard</h2>
      </div>

      <div style={styles.right}>
        <button style={styles.profileBtn} onClick={handleProfile}>
          <User size={18} style={{ marginRight: "6px" }} />
          Profile
        </button>
        <button style={styles.logoutBtn} onClick={handleLogout}>
          <LogOut size={18} style={{ marginRight: "6px" }} />
          Logout
        </button>
      </div>
    </div>
  );
}

const styles = {
  navbar: {
    width: "100%",
    height: "60px",
    backgroundColor: "#2563eb",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 25px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  left: {
    display: "flex",
    alignItems: "center",
  },
  logo: {
    fontSize: "20px",
    fontWeight: "bold",
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  profileBtn: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#10b981", // green
    color: "#fff",
    border: "none",
    padding: "6px 14px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "0.3s",
  },
  logoutBtn: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#ef4444", // red
    color: "#fff",
    border: "none",
    padding: "6px 14px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "0.3s",
  },
};
