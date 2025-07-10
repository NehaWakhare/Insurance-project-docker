import React, { useState } from 'react';
import axios from 'axios';
import './AddPolicy.css';

export default function AddPolicy() {
  const [formData, setFormData] = useState({
    planName: '',
    coverageAmount: '',
    premium: '',
    durationInYears: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8089/admin/policy-plans', formData);
      alert('Policy added successfully');
      setFormData({
        planName: '',
        coverageAmount: '',
        premium: '',
        durationInYears: '',
      });
    } catch (error) {
      console.error('Error adding policy:', error);
      alert('Failed to add policy');
    }
  };

  return (
    <div className="add-policy-container">
      <h2>Add New Policy</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Policy Name:
          <input
            type="text"
            name="planName"
            value={formData.planName}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Coverage Amount:
          <input
            type="number"
            name="coverageAmount"
            value={formData.coverageAmount}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Premium:
          <input
            type="number"
            name="premium"
            value={formData.premium}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Duration (Years):
          <input
            type="number"
            name="durationInYears"
            value={formData.durationInYears}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Add Policy</button>
      </form>
    </div>
  );
}
