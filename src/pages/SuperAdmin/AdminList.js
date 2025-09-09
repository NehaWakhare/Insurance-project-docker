import React, { useEffect, useState } from "react";
import SuperAdminSidebar from "./SuperAdminSidebar"; 

export default function AdminList() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all admins
  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:8089/api/admin/all");
      if (!res.ok) {
        throw new Error("Failed to fetch admins");
      }
      const data = await res.json();
      setAdmins(data);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  return (
    <div style={styles.layout}>
      {/*Sidebar */}
      <SuperAdminSidebar />

      {/* Main content */}
      <div style={styles.content}>
        <div style={styles.card}>
          <h2>Admin List</h2>

          {loading ? (
            <p>Loading admins...</p>
          ) : error ? (
            <p style={{ color: "red" }}>{error}</p>
          ) : admins.length === 0 ? (
            <p>No admins found</p>
          ) : (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>GST No</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {admins.map((admin) => (
                  <tr key={admin.id}>
                    <td>{admin.id}</td>
                    <td>{admin.username}</td>
                    <td>{admin.email}</td>
                    <td>{admin.gstNumber}</td>
                    <td>{admin.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}


const styles = {
  layout: {
    display: "flex",
    minHeight: "100vh",
    background: "#f5f6fa",
  },
  content: {
    flex: 1,
    padding: "20px",
  },
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  },
};
