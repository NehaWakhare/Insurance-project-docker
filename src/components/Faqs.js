import React, { useState } from 'react';
import './Faqs.css';

const faqs = [
  {
    question: '1. What is health insurance?',
    answer: 'Health insurance is a contract that covers your medical expenses in case of illness, injury, or hospitalization. It ensures financial support when you need it the most.',
  },
  {
    question: '2. What types of policies are available?',
    answer: 'We offer Health, Life, Travel, and Motor insurance policies to meet a variety of individual and family needs.',
  },
  {
    question: '3. How do I claim my policy?',
    answer: 'You can claim your policy through the My Policies section after logging in. It’s quick and paperless.',
  },
  {
    question: '4. Can I buy policies online?',
    answer: 'Yes. All our insurance products can be purchased online with instant digital policy issuance.',
  },
  {
    question: '5. How can I contact support?',
    answer: 'Visit our 24*7 Contact page or call our toll-free number. We’re always here to help.',
  },
];

export default function Faqs() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="faq-section">
      <h2>Frequently Asked Questions</h2>
      {faqs.map((item, index) => (
        <div
          key={index}
          className={`faq-item ${activeIndex === index ? 'active' : ''}`}
          onClick={() => toggle(index)}
        >
          <div className="faq-question">
            <span>{item.question}</span>
            <span className="faq-toggle">{activeIndex === index ? '–' : '+'}</span>
          </div>
          {activeIndex === index && <div className="faq-answer">{item.answer}</div>}
        </div>
      ))}
    </div>
  );
}
