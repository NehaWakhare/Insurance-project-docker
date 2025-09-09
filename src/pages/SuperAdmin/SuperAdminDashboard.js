import React from "react";
import { Routes, Route } from "react-router-dom";
import SuperAdminSidebar from "./SuperAdminSidebar";
import AdminApproval from "./AdminApproval"; 
import AdminList from "./AdminList"; 
export default function SuperAdminDashboard() {
  return (
    <div style={styles.layout}>
      {/* Sidebar */}
      <SuperAdminSidebar />

      {/* Main Content */}
      <div style={styles.content}>
        <Routes>
          <Route path="/" element={<h2>Welcome, Super Admin!</h2>} />
          <Route path="users" element={<h2>Manage Users (Coming Soon)</h2>} />
          <Route path="doctors" element={<h2>Manage Doctors (Coming Soon)</h2>} />
          <Route path="policies" element={<h2>Manage Policies (Coming Soon)</h2>} />
          <Route path="claims" element={<h2>Manage Claims (Coming Soon)</h2>} />
          <Route path="approvals" element={<AdminApproval />} />
           <Route path="admins" element={<AdminList />} />
          <Route path="logout" element={<h2>Logout Page (Coming Soon)</h2>} />
          <Route path="/superadmin/dashboard/admin-list" element={<AdminList />} />
        </Routes>
      </div>
    </div>
  );
}

const styles = {
  layout: {
    display: "flex",
    minHeight: "100vh",
  },
  content: {
    flex: 1,
    padding: "20px",
    background: "#f4f6f8",
  },
};
