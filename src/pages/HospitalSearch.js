import React, { useState } from 'react';
import './HospitalSearch.css';

const hospitalsData = [
  { name: 'Apollo Hospital', city: 'Mumbai', state: 'Maharashtra', contact: '022-12345678', specialty: 'Cardiology' },
  { name: 'Fortis Hospital', city: 'Delhi', state: 'Delhi', contact: '011-98765432', specialty: 'Neurology' },
  { name: 'AIIMS', city: 'Delhi', state: 'Delhi', contact: '011-45678901', specialty: 'General' },
  { name: 'Ruby Hall Clinic', city: 'Pune', state: 'Maharashtra', contact: '020-87654321', specialty: 'Orthopedics' },
  { name: 'Manipal Hospital', city: 'Bengaluru', state: 'Karnataka', contact: '080-22334455', specialty: 'Oncology' },
];

export default function HospitalSearch() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredHospitals = hospitalsData.filter(hospital =>
    hospital.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hospital.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="hospital-search-container">
      <h2>Search Network Hospitals</h2>
      <input
        type="text"
        placeholder="Search by city or specialty"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="hospital-list">
        {filteredHospitals.length === 0 ? (
          <p>No hospitals found.</p>
        ) : (
          filteredHospitals.map((hospital, index) => (
            <div key={index} className="hospital-card">
              <h3>{hospital.name}</h3>
              <p><strong>City:</strong> {hospital.city}, {hospital.state}</p>
              <p><strong>Specialty:</strong> {hospital.specialty}</p>
              <p><strong>Contact:</strong> {hospital.contact}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
