import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer-section">
         <h3 className="footer-heading">Important Legal Disclaimer</h3>
      <p>
        QST Insurance Portal presents a composite view of benefits drawn from multiple insurance policies, which are also available individually. Please review the complete policy brochures for the 
        <em>QST Comprehensive Health Insurance Policy</em> and the <em>QST Senior Citizen Health Protection Plan</em> before making any decisions. The purpose of this illustration is informational only and should not be construed as policy documentation.
      </p>
      <p>
        QST Insurance Co. Ltd., Regd. Office: #123, Health Tower, Wellness Avenue, Navi Mumbai – 400706. CIN: L66010MH2020PLC123456 | IRDAI Reg. No.: 234 | UAN: QST/2025‑26/ONLINE‑LP/COMP‑QSTHIP0101V062525. Insurance is the subject matter of solicitation. For full details on risk factors, terms, conditions, and exclusions, refer to the official policy documents.
      </p>
      <p>
        <strong>IRDAI Advisory:</strong> The IRDAI does not sell insurance, collect premiums, or declare bonuses. Beware of fraudulent communications claiming otherwise; please report such activity to the police immediately.
      </p>
      <p>
        Contact us: <a href="mailto:info@qstinsurance.in">info@qstinsurance.in</a> | Toll-Free: 1800‑123‑4567 / 1800‑987‑6543 | Website: <a href="https://www.qstinsurance.in">www.qstinsurance.in</a>
      </p>
      <p className="footer-copy">
        Privacy Policy | Copyright ©
        <span id="current-year">{new Date().getFullYear()}</span> QST Insurance. All rights reserved.
      </p>
    </footer>
  );
}
