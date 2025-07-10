import { useEffect, useState } from 'react';
import './ProfileInfo.css';
import axios from 'axios';

export default function ProfileInfo() {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    dob: '',
    gender: '',
    maritalStatus: '',
    occupation: '',
    nomineeName: '',
    nomineeRelation: '',
    bloodGroup: '',
    emergencyContact: '',
    policy: '',
    policyType: '',
    aadhaarNumber: '',
  });

  const [isEditing, setIsEditing] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = sessionStorage.getItem('userId');
     console.log("Fetched userId from sessionStorage:", storedUserId); 
   

    if (!storedUserId) {
      alert('User ID not found. Please login again.');
      return;
    }

    setUserId(storedUserId);
    fetchUserProfile(storedUserId);
  }, []);

  const fetchUserProfile = async (userId) => {
    try {
      const res = await axios.get(`http://localhost:8089/api/user-profiles/by-user/${userId}`);
      if (res.data) {
        console.log("Fetched profile:", res.data);
        setFormData(res.data);
        setIsEditing(false);
      } else {
        console.log("Fetched profile: null");
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert('User ID not found. Please login again.');
      return;
    }

    try {
      if (formData.id) {
        // Update existing profile
        await axios.put(`http://localhost:8089/api/user-profiles/${formData.id}`, formData);
        alert('Profile updated successfully!');
      } else {
        // Create new profile
        await axios.post(`http://localhost:8089/api/user-profiles/save/${userId}`, formData);
        alert('Profile created successfully!');
      }
      setIsEditing(false);
    } catch (err) {
      console.error('Error saving profile:', err);
      alert('Something went wrong while saving the profile.');
    }
  };

  const formatLabel = (key) =>
    key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());

  const getInputType = (key) => {
    if (key === 'dob') return 'date';
    if (key === 'email') return 'email';
    if (key === 'password') return 'password';
    if (key === 'phone' || key === 'emergencyContact') return 'tel';
    return 'text';
  };

  return (
    <div className="profile-container">
      <h2>{isEditing ? 'Complete/Edit Your Profile' : 'Your Profile'}</h2>

      {isEditing ? (
        <form className="profile-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            {Object.entries(formData).map(([key, value]) => (
              key !== 'id' && key !== 'user' && (
                <div className="form-group" key={key}>
                  <label>{formatLabel(key)}</label>
                  <input
                    type={getInputType(key)}
                    name={key}
                    value={value || ''}
                    onChange={handleChange}
                    required
                  />
                </div>
              )
            ))}
          </div>
          <button type="submit" className="submit-btn">Save Profile</button>
        </form>
      ) : (
        <div className="profile-view">
          <table>
            <tbody>
              {Object.entries(formData).map(([key, value]) => (
                key !== 'id' && key !== 'user' && (
                  <tr key={key}>
                    <td className="profile-label">{formatLabel(key)}</td>
                    <td>{value}</td>
                  </tr>
                )
              ))}
            </tbody>
          </table>
          <button onClick={() => setIsEditing(true)} className="submit-btn">Edit Profile</button>
        </div>
      )}
    </div>
  );
}
