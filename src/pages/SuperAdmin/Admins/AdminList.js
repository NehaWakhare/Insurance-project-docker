import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthHeaders } from "../../../api/superAdminApi";

export default function AdminList() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openMenu, setOpenMenu] = useState(null);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Fetch admins
  const fetchAdmins = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch("http://localhost:8089/api/admin/all", {
        headers: getAuthHeaders(),
      });

      if (!res.ok) throw new Error(`Failed to fetch admins: ${res.status}`);

      const data = await res.json();
      setAdmins(data);
    } catch (err) {
      console.error("Error fetching admins:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMenuToggle = (adminId) => {
    setOpenMenu(openMenu === adminId ? null : adminId);
  };

  const handleNavigation = (adminId, type) => {
    if (type === "profile") {
      navigate(`/superadmin/dashboard/admins/${adminId}/profile`);
    } else if (type === "policies") {
      navigate(`/superadmin/dashboard/admins/${adminId}/policies`);
    }
    setOpenMenu(null);
  };

  if (loading) return <p>Loading admins...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={styles.container}>
      <h2 style={{ marginBottom: "20px" }}>⚙️ Admin List</h2>

      {admins.length === 0 ? (
        <p>No admins found</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Username</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>GST No</th>
              <th style={styles.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin.id} style={styles.tr}>
                <td style={styles.td}>{admin.id}</td>
                <td style={{ ...styles.td, position: "relative" }} ref={dropdownRef}>
                  <span
                    style={styles.clickable}
                    onClick={() => handleMenuToggle(admin.id)}
                  >
                    {admin.username} ⬇️
                  </span>
                  {openMenu === admin.id && (
                    <div style={styles.dropdown}>
                      <p
                        style={styles.dropdownItem}
                        onClick={() => handleNavigation(admin.id, "profile")}
                      >
                        Admin Profile
                      </p>
                      <p
                        style={styles.dropdownItem}
                        onClick={() => handleNavigation(admin.id, "policies")}
                      >
                        Uploaded Policies
                      </p>
                    </div>
                  )}
                </td>
                <td style={styles.td}>{admin.email}</td>
                <td style={styles.td}>{admin.gstNumber || "N/A"}</td>
                <td style={styles.td}>{admin.status}</td>
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
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px",
  },
  th: {
    padding: "12px",
    background: "#2563eb",
    color: "#fff",
    textAlign: "left",
    borderBottom: "1px solid #ddd",
  },
  td: {
    padding: "12px",
    borderBottom: "1px solid #eee",
    verticalAlign: "middle",
  },
  tr: {
    transition: "background 0.2s",
  },
  clickable: {
    color: "#2563eb",
    fontWeight: "500",
    cursor: "pointer",
  },
  dropdown: {
    position: "absolute",
    top: "120%",
    left: 0,
    background: "#fff",
    border: "1px solid #ddd",
    borderRadius: "6px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
    zIndex: 10,
    minWidth: "160px",
  },
  dropdownItem: {
    padding: "10px 15px",
    cursor: "pointer",
    whiteSpace: "nowrap",
    transition: "background 0.2s",
  },
};
