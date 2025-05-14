
import React, { useState, useEffect } from 'react';
import { sliderImages } from '../data/weddingData';

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      {sliderImages.map((image, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={image}
            alt={`Wedding slide ${index + 1}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <div className="text-center px-4">
              <h2 className="text-white text-4xl md:text-5xl font-playfair font-bold mb-4 animate-fade-in">
                Your Perfect Wedding Awaits
              </h2>
              <p className="text-white text-lg md:text-xl max-w-2xl mx-auto animate-slide-up">
                Let us make your special day unforgettable
              </p>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {sliderImages.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
