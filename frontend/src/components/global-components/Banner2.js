import React from 'react';
import { useNavigate } from 'react-router-dom';

const Banner2 = () => {
  const navigate = useNavigate();
  
  const handleButtonClick = () => {
    navigate('/video');  // Replace with your desired route
  };

  return (
    <div className="bg-gradient-to-r from-blue-700 to-blue-500 max-w-6xl mx-auto min-h-[475px] w-screen rounded-3xl flex flex-col justify-center font-[sans-serif] overflow-hidden">
      <div className="grid md:grid-cols-2 justify-center items-center max-md:text-center md:gap-8 gap-16 h-full">
        <div className="md:max-w-md mx-auto">
          <h2 className="text-white text-4xl md:text-5xl font-extrabold mb-6 md:!leading-[55px]">
            Try Our AR Dressing Room
          </h2>
          <p className="text-white text-base">
            Experience the future of shopping with our augmented reality feature! Virtually try on outfits and see how they fit, right from your device. Upgrade to premium and enhance your fashion journey.
          </p>
          <div className="mt-12">
          <button
      type="button"
      className="px-8 py-2 text-base tracking-wider font-semibold outline-none border border-white bg-white text-blue-500 hover:bg-transparent hover:text-white transition-all duration-300"
      onClick={handleButtonClick}  // Call the function on button click
    >
      Try now
    </button>
          </div>
        </div>
        <div className="md:text-right">
          <img
            src="https://readymadeui.com/bg-image.webp"
            alt="AR Dressing Room"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner2;
