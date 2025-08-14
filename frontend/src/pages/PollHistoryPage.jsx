import React, { useEffect, useState } from "react";
import axios from "axios";
import PollHistory from "../components/PollHistory"; // Your styled component

const PollHistoryPage = () => {
  const [pollHistory, setPollHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get("https://polling-system-backend-t17a.onrender.com");
        setPollHistory(res.data); // Ensure it matches your backend response
      } catch (err) {
        console.error("Failed to fetch poll history", err);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 lg:p-8">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center sm:text-left">
        📜 Poll History
      </h1>

      <div className="overflow-x-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pollHistory.length > 0 ? (
            pollHistory.map((poll, index) => (
              <PollHistory key={index} poll={poll} />
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No poll history available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PollHistoryPage;
