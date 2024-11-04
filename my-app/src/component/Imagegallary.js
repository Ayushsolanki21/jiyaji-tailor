import React, { useState, useEffect } from 'react';

  const ImageGallery = () => {
    const images = [
        'mobile.jpg',
        'laptop.jpg',
        'lapi.jpg',
        'bag.jpg',
        'tea.jpg'
      ];
    const [currentIndex, setCurrentIndex] = useState(0);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 2000); 
  
      return () => clearInterval(interval);

    }, [images.length]);
  
    const goToPrevious = () => {
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };
  
    const goToNext = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };
  
    return (
      <div className="relative  w-full m-10 z-1">
        <div className=" rounded-lg ">
          <img
            src={process.env.PUBLIC_URL + '/' + images[currentIndex]}
            alt={`Gallery ${currentIndex + 1}`}
            className="w-full h-80 object-cover rounded-lg shadow-sm"
          />
        </div>
        <button
          onClick={goToPrevious}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
        >
          &#9664;
        </button>
        <button
          onClick={goToNext}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
        >
          &#9654;
        </button>
      </div>
    );
  };
  
  export default ImageGallery;
  