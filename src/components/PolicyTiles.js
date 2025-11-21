import './PolicyTiles.css';
import { FaUserPlus, FaUserFriends, FaUserShield, FaArrowCircleUp, FaHeartbeat } from 'react-icons/fa';

export default function PolicyTypes() {
  return (
    <section className="policy-types-section">
      <h2>Types of Health Insurance Plans</h2>
      <div className="policy-type-grid">

        <div className="policy-card">
          <FaUserPlus className="policy-icon" />
          <h3>Individual Health Plan</h3>
          <p>Coverage for a single person’s medical expenses.</p>
        </div>

        <div className="policy-card">
          <FaUserFriends className="policy-icon" />
          <h3>Family Floater</h3>
          <p>One plan that covers the entire family under a shared sum insured.</p>
        </div>

        <div className="policy-card">
          <FaUserShield className="policy-icon" />
          <h3>Senior Citizen Plan</h3>
          <p>Specialized health insurance for people aged 60 and above.</p>
        </div>

        <div className="policy-card">
          <FaArrowCircleUp className="policy-icon" />
          <h3>Top-up Plan</h3>
          <p>Provides additional coverage when your base plan gets exhausted.</p>
        </div>

        <div className="policy-card">
          <FaHeartbeat className="policy-icon" />
          <h3>Critical Illness Plan</h3>
          <p>Lump sum coverage for major illnesses like cancer, heart disease, etc.</p>
        </div>

      </div>
    </section>
  );
}
