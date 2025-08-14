import React from "react";

const WaitingScreen = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-4 sm:p-6">
      <div className="flex flex-col items-center">
        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-xs sm:text-sm md:text-base px-3 sm:px-4 py-1 rounded-full mb-4">
          ✨ Intervue Poll
        </div>
        <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-black text-center px-2 sm:px-0">
          Wait for the teacher to ask questions..
        </p>
      </div>
    </div>
  );
};

export default WaitingScreen;
