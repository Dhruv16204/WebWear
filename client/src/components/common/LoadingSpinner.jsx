import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center w-full h-screen bg-black">
      {/* Custom black and white loading spinner */}
      <div className="w-16 h-16 border-t-4 border-white border-solid rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;

