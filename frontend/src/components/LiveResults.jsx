import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ChatSidebar from "./ChatSidebar";
import socket from "../socket";

const LiveResults = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { poll, timeLimit } = state || {};

    const [timer, setTimer] = useState(timeLimit);
    const [results, setResults] = useState(null);

    useEffect(() => {
        let interval = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        socket.on("poll-results", (data) => {
            setResults(data);
        });

        return () => {
            socket.off("poll-results");
            clearInterval(interval);
        };
    }, []);

    if (!poll) {
        return (
            <div className="text-center text-red-500 mt-10">
                Poll data not found. Redirecting...
            </div>
        );
    }

    const totalVotes = results ? Object.values(results.answers || {}).reduce((a, b) => a + b, 0) : 0;

    return (
        <>
            <ChatSidebar/>
            <div className="min-h-screen flex flex-col items-center p-4 sm:p-6 bg-white text-dark">
                <div className="w-full max-w-3xl sm:max-w-4xl lg:max-w-6xl">

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2 sm:gap-0">
                        <h2 className="text-lg sm:text-xl font-bold">Live Poll Results</h2>
                        <span className="text-sm text-red-500 font-semibold">
                            ⏱ {timer < 10 ? `0${timer}` : timer}s
                        </span>
                    </div>

                    <div className="bg-gradient-to-r from-gray-700 to-gray-600 text-white px-4 py-3 rounded-t-md text-sm sm:text-base font-medium">
                        {poll.text}
                    </div>

                    <div className="border border-gray-200 rounded-b-md px-4 py-4 bg-white space-y-3">
                        {poll.options.map((opt, index) => {
                            const voteCount = results?.answers?.[opt._id] || 0;
                            const percent = totalVotes > 0 ? Math.round((voteCount / totalVotes) * 100) : 0;

                            return (
                                <div key={opt._id}>
                                    <div className="flex items-center gap-2 text-sm sm:text-base font-medium mb-1 flex-wrap">
                                        <span className="w-6 h-6 flex items-center justify-center bg-purple-600 text-white font-bold rounded-full text-xs sm:text-sm">
                                            {index + 1}
                                        </span>
                                        <span className="truncate max-w-full sm:max-w-[90%]">{opt.text}</span>
                                    </div>
                                    <div className="relative w-full bg-gray-100 rounded-lg h-6 overflow-hidden">
                                        <div
                                            className="bg-purple-600 h-6 rounded-lg transition-all duration-500"
                                            style={{ width: `${percent}%` }}
                                        />
                                        <div className="absolute inset-0 flex items-center justify-end pr-2 sm:pr-3 text-xs sm:text-sm font-semibold text-gray-800">
                                            {percent}%
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                        <button
                            onClick={() => navigate("/teacher")}
                            className="bg-purple-600 text-white px-5 py-2 rounded-full font-medium hover:bg-purple-700 w-full sm:w-auto"
                        >
                            + Ask a new question
                        </button>
                        <button
                            onClick={() => navigate("/poll-history")}
                            className="bg-purple-400 text-white px-5 py-2 rounded-full font-medium hover:bg-purple-500 w-full sm:w-auto"
                        >
                            👁 View Poll History
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LiveResults;
