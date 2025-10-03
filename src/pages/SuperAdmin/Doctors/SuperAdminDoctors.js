import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button, Chip, Dialog,
  DialogTitle, DialogContent, DialogActions, TextField
} from "@mui/material";

export default function SuperAdminDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [open, setOpen] = useState(false);
  const [newDoctor, setNewDoctor] = useState({
    doctorName: "",
    specialization: "",
    status: "Available",
    location: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8089/api/doctors/all")
      .then((res) => res.json())
      .then((data) => setDoctors(data))
      .catch((err) => console.error("Error fetching doctors:", err));
  }, []);

  const handleAddDoctor = async () => {
    try {
      await fetch("http://localhost:8089/api/doctors/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newDoctor),
      });
      setOpen(false);
      window.location.reload();
    } catch (err) {
      console.error("Error adding doctor:", err);
    }
  };

  return (
    <div>
      <h2>Doctors Management</h2>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Add Doctor
      </Button>

      {/* Doctor Table */}
      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Doctor Name</TableCell>
              <TableCell>Specialization</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Location</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {doctors.map((doc) => (
              <TableRow
                key={doc.id}
                hover
                onClick={() => navigate(`/superadmin/dashboard/doctors/${doc.id}`)}
                style={{ cursor: "pointer" }}
              >
                <TableCell>{doc.id}</TableCell>
                <TableCell>{doc.doctorName}</TableCell>
                <TableCell>{doc.specialization}</TableCell>
                <TableCell>
                  <Chip
                    label={doc.status}
                    color={doc.status === "Available" ? "success" : "error"}
                  />
                </TableCell>
                <TableCell>{doc.location}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Doctor Modal */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Doctor</DialogTitle>
        <DialogContent>
          <TextField
            label="Doctor Name"
            fullWidth
            margin="normal"
            value={newDoctor.doctorName}
            onChange={(e) => setNewDoctor({ ...newDoctor, doctorName: e.target.value })}
          />
          <TextField
            label="Specialization"
            fullWidth
            margin="normal"
            value={newDoctor.specialization}
            onChange={(e) => setNewDoctor({ ...newDoctor, specialization: e.target.value })}
          />
          <TextField
            label="Status"
            fullWidth
            margin="normal"
            value={newDoctor.status}
            onChange={(e) => setNewDoctor({ ...newDoctor, status: e.target.value })}
          />
          <TextField
            label="Location"
            fullWidth
            margin="normal"
            value={newDoctor.location}
            onChange={(e) => setNewDoctor({ ...newDoctor, location: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleAddDoctor}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
