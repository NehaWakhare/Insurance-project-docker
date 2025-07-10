import './WhyChoose.css';
import { FaHospitalSymbol, FaPhoneAlt, FaMoneyCheckAlt, FaWallet } from 'react-icons/fa';

export default function WhyChoose() {
  return (
    <section className="why-choose">
      <h2>Key Benefits of Our Health Plans</h2>
      <div className="benefits-list">
        <div className="benefit-item">
          <FaHospitalSymbol className="benefit-icon" />
          <div>
            <h3>Cashless Hospitalization</h3>
            <p>Enjoy hassle-free treatment at our wide network of partner hospitals.</p>
          </div>
        </div>

        <div className="benefit-item">
          <FaPhoneAlt className="benefit-icon" />
          <div>
            <h3>24x7 Support</h3>
            <p>Our team is always available to assist you in emergencies or queries.</p>
          </div>
        </div>

        <div className="benefit-item">
          <FaMoneyCheckAlt className="benefit-icon" />
          <div>
            <h3>Easy Claims Process</h3>
            <p>Submit and track your claims with a quick and transparent process.</p>
          </div>
        </div>

        <div className="benefit-item">
          <FaWallet className="benefit-icon" />
          <div>
            <h3>Affordable Plans</h3>
            <p>Get tailored plans that suit your needs and budget.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
