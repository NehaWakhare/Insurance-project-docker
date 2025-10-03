import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Divider,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";

export default function DoctorDetails() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Doctor Profile
        const docRes = await fetch(`http://localhost:8089/api/doctors/${id}`);
        const docData = await docRes.json();
        setDoctor(docData);

        // Fetch Doctor Appointments
        const apptRes = await fetch(
          `http://localhost:8089/appointments/doctor/${id}`
        );
        const apptData = await apptRes.json();

        if (Array.isArray(apptData)) {
          setAppointments(apptData);
        } else if (apptData && apptData.appointments) {
          setAppointments(apptData.appointments);
        } else {
          setAppointments([]);
        }
      } catch (err) {
        console.error("Error fetching doctor details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <p>Loading doctor details...</p>;
  if (!doctor) return <p>Doctor not found.</p>;

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Doctor Details
      </Typography>

      {/* Doctor Profile */}
      <Card style={{ marginBottom: "20px" }}>
        <CardContent>
          <Typography variant="h6">{doctor.doctorName}</Typography>
          <Typography>Specialization: {doctor.specialization}</Typography>
          <Typography>Status: {doctor.status}</Typography>
          <Typography>Location: {doctor.location}</Typography>
        </CardContent>
      </Card>

      {/* Booked Appointments */}
      <Typography variant="h6" gutterBottom>
        Booked Appointments
      </Typography>
      <Divider style={{ marginBottom: "10px" }} />

      {appointments.length === 0 ? (
        <p>No appointments booked for this doctor.</p>
      ) : (
        <Paper style={{ overflowX: "auto" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>Appointment ID</b></TableCell>
                <TableCell><b>User ID</b></TableCell>
                <TableCell><b>Date</b></TableCell>
                <TableCell><b>Time</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.map((appt) => (
                <TableRow key={appt.id}>
                  <TableCell>{appt.id}</TableCell>
                  <TableCell>{appt.userProfileId}</TableCell>
                  <TableCell>{appt.appointmentDate}</TableCell>
                  <TableCell>{appt.appointmentTime}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
    </div>
  );
}
