import React from "react";
import ChatSidebar from "./ChatSidebar";

const PollHistory = ({ history }) => {
    return (
        <>
            <ChatSidebar />
            <div className="max-w-full sm:max-w-4xl lg:max-w-6xl mx-auto p-4 sm:p-6">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center">
                    View <span className="text-purple-600">Poll History</span>
                </h2>

                {history.map(({ _id, question, options }, index) => {
                    const totalVotes = options.reduce((acc, opt) => acc + opt.count, 0);

                    return (
                        <div
                            key={_id}
                            className="mb-6 sm:mb-8 border border-gray-300 rounded-lg shadow-md overflow-hidden"
                        >
                            <h3 className="font-semibold mb-2 px-4 pt-4 text-sm sm:text-base">
                                Question {index + 1}
                            </h3>

                            {/* Question */}
                            <div className="bg-gradient-to-r from-gray-700 to-gray-500 text-white px-4 py-2 text-sm sm:text-base font-medium">
                                {question}
                            </div>

                            {/* Options */}
                            <div className="border border-purple-300 border-t-0 rounded-b-md p-4 space-y-3">
                                {options.map((opt, idx) => (
                                    <div key={opt._id} className="w-full">
                                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm sm:text-base mb-1 gap-1">
                                            <span className="flex items-center gap-2 flex-wrap sm:flex-nowrap max-w-full">
                                                <span className="bg-purple-600 text-white w-6 h-6 rounded-full text-center text-xs sm:text-sm font-bold flex items-center justify-center">
                                                    {idx + 1}
                                                </span>
                                                <span className="truncate max-w-[80%]">{opt.text}</span>
                                            </span>
                                            <span className="font-medium text-sm sm:text-base">{opt.percentage}%</span>
                                        </div>
                                        <div className="w-full h-4 bg-gray-100 rounded">
                                            <div
                                                className="h-4 bg-purple-500 rounded transition-all duration-500"
                                                style={{ width: `${opt.percentage}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default PollHistory;
