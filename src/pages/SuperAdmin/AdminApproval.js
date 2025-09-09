import React, { useEffect, useState } from "react";

export default function AdminApproval() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch pending admins
  const fetchRequests = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:8089/api/admin/pending");
      if (!res.ok) {
        throw new Error("Failed to fetch pending admins");
      }
      const data = await res.json();
      console.log("Pending Admins Response:", data); // Debugging log
      setRequests(data);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Approve Admin
  const handleApprove = async (id) => {
    try {
      const res = await fetch(`http://localhost:8089/api/admin/approve/${id}`, {
        method: "PUT",
      });
      if (!res.ok) throw new Error("Failed to approve admin");
      await fetchRequests(); // refresh list
    } catch (err) {
      alert(err.message);
    }
  };

  // Reject Admin
  const handleReject = async (id) => {
    try {
      const res = await fetch(`http://localhost:8089/api/admin/reject/${id}`, {
        method: "PUT",
      });
      if (!res.ok) throw new Error("Failed to reject admin");
      await fetchRequests(); // refresh list
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading) return <p>Loading requests...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={styles.container}>
      <h2>Admin Approval Requests</h2>

      {requests.length === 0 ? (
        <p>No pending requests</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>GST No</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id}>
                <td>{req.username}</td>
                <td>{req.email}</td>
                <td>{req.gstNumber}</td> {/* ✅ fixed field */}
                <td>{req.status}</td>
                <td>
                  <button
                    style={styles.approveBtn}
                    onClick={() => handleApprove(req.id)}
                  >
                    Approve
                  </button>
                  <button
                    style={styles.rejectBtn}
                    onClick={() => handleReject(req.id)}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  },
  approveBtn: {
    background: "#4CAF50",
    color: "white",
    border: "none",
    padding: "5px 10px",
    marginRight: "10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  rejectBtn: {
    background: "#f44336",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};
