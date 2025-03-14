import React from "react";
import NavBar from '../NavBar';
import Footer from "./footer";

import AR from './images/AR.jpg'
import Rec from './images/Rec.jpg'
import Trends from './images/Trends.jpg'
import Sus from './images/Sus.jpg'

const AboutUs = () => {
  return (
    <div>
      <NavBar/>
    <section className="bg-white py-16 px-6 lg:px-24">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          About <span className="text-indigo-600">Urban'94</span>
        </h2>
        <p className="text-gray-600 text-lg lg:text-xl mb-10">
          Welcome to <strong>TechWear</strong> – where fashion meets the future! 
          We blend cutting-edge technology with the latest fashion trends to bring you 
          an immersive, personalized shopping experience.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* AR Try-on Feature */}
          <div className="flex flex-col items-center text-gray-800">
            <img
              src={AR}
              alt="AR Try-On"
              className="mb-4 w-36 h-36 rounded-full shadow-lg object-cover"
            />
            <h3 className="text-2xl font-semibold mb-2">AR Try-On</h3>
            <p className="text-base lg:text-lg">
              Experience your favorite styles in augmented reality. See how clothes
              fit on you before you buy, all from your screen!
            </p>
          </div>

          {/* AI-Powered Recommendations */}
          <div className="flex flex-col items-center text-gray-800">
            <img
              src={Rec}
              alt="AI Recommendations"
              className="mb-4 w-36 h-36 rounded-full shadow-lg object-cover"
            />
            <h3 className="text-2xl font-semibold mb-2">AI Recommendations</h3>
            <p className="text-base lg:text-lg">
              Our AI analyzes your preferences and style to recommend outfits tailored 
              just for you. Elevate your fashion game with smarter shopping!
            </p>
          </div>

          {/* Sustainable Fashion */}
          <div className="flex flex-col items-center text-gray-800">
            <img
              src={Sus}
              alt="Sustainable Fashion"
              className="mb-4 w-36 h-36 rounded-full shadow-lg object-cover"
            />
            <h3 className="text-2xl font-semibold mb-2">Sustainable Fashion</h3>
            <p className="text-base lg:text-lg">
              We’re committed to a sustainable future, blending eco-friendly materials 
              with timeless designs. Tech + nature? Now that's chic.
            </p>
          </div>

          {/* Fashion Trends */}
          <div className="flex flex-col items-center text-gray-800">
            <img
              src={Trends}
              alt="Latest Fashion Trends"
              className="mb-4 w-36 h-36 rounded-full shadow-lg object-cover"
            />
            <h3 className="text-2xl font-semibold mb-2">Latest Trends</h3>
            <p className="text-base lg:text-lg">
              Stay ahead of the curve with real-time updates on the latest trends. 
              Be the first to rock what’s in before everyone else.
            </p>
          </div>
        </div>

        <div className="mt-12">
          <a
            href="/home"
            className="px-6 py-3 bg-indigo-600 text-white text-lg font-semibold rounded-full shadow-md hover:bg-indigo-500 transition-colors"
          >
            Explore Our Collection
          </a>
        </div>
      </div>
    </section>
    <Footer/>
    </div>
  );
};

export default AboutUs;
