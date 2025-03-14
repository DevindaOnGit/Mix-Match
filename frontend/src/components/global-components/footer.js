import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Footer Links */}
          <div className="mb-6 md:mb-0">
            <ul className="flex flex-wrap space-x-4 text-sm">
              <li><a href="/" className="hover:text-gray-400">About Us</a></li>
              <li><a href="/" className="hover:text-gray-400">Services</a></li>
              <li><a href="/" className="hover:text-gray-400">Contact</a></li>
              <li><a href="/" className="hover:text-gray-400">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-4">
            <a href="/" aria-label="Facebook" className="hover:text-gray-400">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="/" aria-label="Twitter" className="hover:text-gray-400">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="/" aria-label="Instagram" className="hover:text-gray-400">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="/" aria-label="LinkedIn" className="hover:text-gray-400">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="text-center mt-8 text-sm">
          <p>© 2024 Your Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
