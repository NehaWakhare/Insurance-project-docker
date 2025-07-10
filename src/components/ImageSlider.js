import React, { useState, useEffect } from 'react';
import './ImageSlider.css';
import slide1 from '../assets/slide1.jpg';
import slide2 from '../assets/slide2.jpg';
import slide3 from '../assets/slide3.jpg';

const images = [slide1, slide2, slide3];

export default function ImageSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000); // Slide every 4 seconds

    return () => clearInterval(interval);
  }, []);

  const goToNext = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const goToPrev = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="slider">
      <img src={images[current]} alt={`Slide ${current + 1}`} className="slider-image" />
      <div className="slider-controls">
        <button onClick={goToPrev}>&#10094;</button>
        <button onClick={goToNext}>&#10095;</button>
      </div>
    </div>
  );
}
