import React, { useState } from 'react';
import './Teleconsultation.css';

const doctors = [
  { name: 'Dr. Aarti Sharma', specialty: 'General Physician', available: 'Mon-Fri 10am-2pm' },
  { name: 'Dr. Rahul Mehta', specialty: 'Cardiologist', available: 'Tue, Thu 4pm-6pm' },
  { name: 'Dr. Neha Kapoor', specialty: 'Dermatologist', available: 'Mon, Wed, Fri 11am-1pm' },
  { name: 'Dr. Vinod Rao', specialty: 'Psychiatrist', available: 'Daily 5pm-8pm' },
  { name: 'Dr. Priya Nair', specialty: 'Nutritionist', available: 'Weekends 10am-12pm' },
];

export default function Teleconsultation() {
  const [filter, setFilter] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleBook = (doctorName) => {
    setSuccessMsg(`Appointment booked with ${doctorName}. Confirmation sent to your email.`);
    setTimeout(() => setSuccessMsg(''), 4000); // Auto-hide
  };

  const filteredDoctors = doctors.filter(doc =>
    doc.specialty.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="teleconsultation-container">
      <h2>Book a Teleconsultation</h2>

      <input
        type="text"
        placeholder="Filter by specialty (e.g. Cardiologist)"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      <div className="doctor-list">
        {filteredDoctors.length === 0 ? (
          <p>No doctors found.</p>
        ) : (
          filteredDoctors.map((doc, index) => (
            <div key={index} className="doctor-card">
              <h3>{doc.name}</h3>
              <p><strong>Specialty:</strong> {doc.specialty}</p>
              <p><strong>Available:</strong> {doc.available}</p>
              <button onClick={() => handleBook(doc.name)}>Book Now</button>
            </div>
          ))
        )}
      </div>

      {successMsg && <p className="success-msg">{successMsg}</p>}
    </div>
  );
}
