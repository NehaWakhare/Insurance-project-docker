import IntroBanner from '../components/IntroBanner';
import WhyChoose from '../components/WhyChoose';
import HealthPlans from '../components/HealthPlans';
import WhyChooseUs from '../components/WhyChooseUs';
import Faqs from '../components/Faqs';
import { Link } from 'react-router-dom';
import PolicyTiles from '../components/PolicyTiles';
import Footer from '../components/Footer';
import './Home.css';


import hospitalImg from '../assets/hospital.png';
import doctorImg from '../assets/doctor.png';
import wellnessImg from '../assets/wellness.png';

export default function Home() {
  const userRole = sessionStorage.getItem('userRole');

  return (
    <div className="home-page">
      <IntroBanner />
      <WhyChooseUs />
      <HealthPlans />
      
      <PolicyTiles />

     {userRole === 'USER' ? (
  <div className="user-actions">
    <Link to="/my-policies" className="action-btn">View/Claim Policies</Link>
  </div>
) : (
  <div className="user-actions">
    <p style={{ textAlign: 'center' }}>
      <Link to="/login" className="action-btn">Login</Link> to view or claim your policies.
    </p>
  </div>
)}

      {/* 🏥 Hospital Search Preview */}
<div className="section preview-section hospital-preview">
  <img src={hospitalImg} alt="Hospital" className="preview-image large" />
  <h2>Find Network Hospitals</h2>
  <p>
    Easily locate cashless hospitals near you across India. 
    Our partnered network ensures smooth admission and discharge without financial stress.
  </p>
  <p>
    You can check hospital specialties, availability, and directly connect with the facility for faster access.
  </p>
  <Link to="/hospitals" className="btn-small">Search Hospitals</Link>
</div>

{/* 🩺 Teleconsultation Preview */}
<div className="section preview-section doctor-preview">
  <img src={doctorImg} alt="Teleconsult" className="preview-image large" />
  <h2>Book a Doctor Online</h2>
  <p>
    Consult with certified doctors from the comfort of your home through secure video calls. 
    No queues. No travel. Just expert care at your fingertips.
  </p>
  <p>
    Choose from general physicians, pediatricians, dermatologists, and more based on your health needs.
  </p>
  <Link to="/doctors" className="btn-small">Book Teleconsult</Link>
</div>

{/* 🌱 Health & Wellness Preview */}
<div className="section preview-section wellness-preview">
  <img src={wellnessImg} alt="Wellness" className="preview-image large" />
  <h2>Health & Wellness</h2>
  <p>
    Our wellness section is designed to help you lead a healthier lifestyle with tools like:
  </p>
  <ul className="wellness-list">
    <li>🧘 Guided Meditation Sessions for Stress Relief</li>
    <li>🍎 Personalized Nutrition Plans by Experts</li>
    <li>📊 Health Risk Assessment for Preventive Care</li>
    <li>💡 Daily Health Tips & Mental Wellness Programs</li>
  </ul>
  <Link to="/wellness" className="btn-small">Explore Wellness</Link>
</div>


      <WhyChoose />
      <Faqs />
      <Footer />
    </div>
  );
}
