import React, { useEffect, useState } from "react";
import axios from "axios";
import PollHistory from "../components/PollHistory";

const PollHistoryPage = () => {
  const [pollHistory, setPollHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(
          "https://polling-system-backend-t17a.onrender.com/api/polls/history"
        );
        console.log("Poll API response:", res.data); 
        setPollHistory(res.data);
      } catch (err) {
        console.error("Failed to fetch poll history", err);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 lg:p-8">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center sm:text-left">
        Poll History
      </h1>
      <PollHistory history={pollHistory} />
    </div>
  );
};

export default PollHistoryPage;
