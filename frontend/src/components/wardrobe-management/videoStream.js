import React from 'react';
import NavBar from '../NavBar';
import Footer from '../global-components/footer';

const VideoStream = () => {
  return (
    <div>
      <NavBar/>
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        <header className="bg-indigo-600 text-white py-4 text-center">
          <h1 className="text-3xl font-bold tracking-wide">Live Try-On</h1>
        </header>
        <div className="p-4 flex justify-center items-center">
          <div className="w-full h-full aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg shadow-inner">
            <img
              src="http://localhost:5999/video_feed"
              alt="Live Try-On"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
        <footer className="bg-gray-50 text-center py-4">
          <p className="text-gray-500 text-sm">Enjoy our virtual try-on feature powered by AI!</p>
        </footer>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default VideoStream;
