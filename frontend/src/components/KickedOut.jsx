import React from "react";

const KickedOut = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-white text-center px-4 sm:px-6 lg:px-8">
            <span className="text-xs sm:text-sm font-semibold px-3 py-1 rounded-full bg-purple-600 text-white mb-3 inline-block">
                ✦ Intervue Poll
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                You’ve been Kicked Out!
            </h1>
            <p className="text-gray-500 text-sm sm:text-base md:text-lg max-w-xs sm:max-w-md lg:max-w-lg px-2">
                Looks like the teacher has removed you from the poll system. Please try again sometime.
            </p>
        </div>
    );
};

export default KickedOut;
