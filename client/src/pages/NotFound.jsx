import { Link } from "react-router-dom";
import React from 'react';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-center">
      <div className="text-gray-800 p-8 sm:p-12">
        
        {/* 404 Header */}
        <h1 className="text-9xl font-extrabold text-red-600 mb-4">404</h1>
        
        {/* Error Message */}
        <p className="text-3xl font-bold mb-4">
          <span className="text-red-700">Opps!</span> Page not found.
        </p>
        
        {/* Lead Text */}
        <p className="text-lg text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        {/* Home Button */}
        <Link 
          to="/" 
          className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-red-600 hover:bg-red-700 shadow-lg transition duration-300 transform hover:scale-105"
        >
          Go to Home
        </Link>
        
      </div>
    </div>
  );
};

export default NotFound;