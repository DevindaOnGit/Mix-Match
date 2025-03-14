import React, { useEffect, useState } from 'react';
import backgroundImage1 from './images/Background1.jpg';
import backgroundImage2 from './images/Background2.jpg';
import backgroundImage3 from './images/Background3.jpg';
import backgroundImage4 from './images/Background4.jpg';
import backgroundImage5 from './images/Background5.jpg';

const images = [backgroundImage1, backgroundImage2, backgroundImage3, backgroundImage4, backgroundImage5];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Clean up the interval on unmount
  }, []);

  return (
    <div style={{ position: 'relative', height: '50vh', overflow: 'hidden' }}>
      {/* Background Image Slider */}
      {images.map((image, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: currentIndex === index ? 1 : 0,
            transition: 'opacity 1s ease-in-out', // Smooth transition effect
          }}
        />
      ))}
    </div>
  );
};

export default ImageSlider;
