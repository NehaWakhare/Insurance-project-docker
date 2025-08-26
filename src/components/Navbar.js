import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/logo.png';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showExplore, setShowExplore] = useState(false);

  const handleLogout = () => {
    logoutUser();
    navigate('/auth');
  };

  const toggleExplore = () => {
    setShowExplore((prev) => !prev);
  };

  return (
    <nav className="navbar">
      <div className="logo-section">
        <img src={logo} alt="Logo" className="logo" />
      </div>

      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>

        {user?.role === 'USER' && (
          <>
            <Link to="/dashboard/profile" className="nav-link">Dashboard</Link>
            
            {/* Explore Dropdown */}
            <div className="dropdown">
              <span className="nav-link" onClick={toggleExplore}>Explore ▼</span>
              {showExplore && (
                <div className="dropdown-menu">
                  <a href="/#hospitals" className="dropdown-item">Hospitals</a>
                  <a href="/#teleconsult" className="dropdown-item">Teleconsultation</a>
                  <a href="/#wellness" className="dropdown-item">Health & Wellness</a>
                  <a href="/#policies" className="dropdown-item">Policies</a>
                </div>
              )}
            </div>

            <Link to="/claims" className="nav-link">Claims</Link>
            <span className="nav-link logout" onClick={handleLogout}>Logout</span>
          </>
        )}

        {user?.role === 'ADMIN' && (
          <>
            <Link to="/admin/dashboard" className="nav-link">Admin Dashboard</Link>
            <span className="nav-link logout" onClick={handleLogout}>Logout</span>
          </>
        )}

        {!user && <Link to="/auth" className="nav-link">Login</Link>}
        <Link to="/support" className="nav-link contact">24*7 Contact</Link>
      </div>
    </nav>
  );
}
