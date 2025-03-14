// src/components/Gallery.js
import React from 'react';

const Gallery = () => {
  return (
    <div className="grid gap-4">
      {/* Main Image */}
      <div>
        <img
          className="h-auto max-w-md rounded-lg"
          src="https://flowbite.s3.amazonaws.com/docs/gallery/featured/image.jpg"
          alt="Main Featured"
        />
      </div>

      {/* Grid of Smaller Images */}
      <div className="grid grid-cols-5 gap-4">
        <div>
          <img
            className="h-auto max-w-full rounded-lg"
            src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg"
            alt="Gallery Image 1"
          />
        </div>
        <div>
          <img
            className="h-auto max-w-full rounded-lg"
            src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg"
            alt="Gallery Image 2"
          />
        </div>
        <div>
          <img
            className="h-auto max-w-full rounded-lg"
            src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg"
            alt="Gallery Image 3"
          />
        </div>
        <div>
          <img
            className="h-auto max-w-full rounded-lg"
            src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg"
            alt="Gallery Image 4"
          />
        </div>
        <div>
          <img
            className="h-auto max-w-full rounded-lg"
            src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg"
            alt="Gallery Image 5"
          />
        </div>
      </div>
    </div>
  );
};

export default Gallery;
