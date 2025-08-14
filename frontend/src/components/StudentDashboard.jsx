import React, { useEffect, useState } from "react";
import socket from "../socket";
import PollQuestion from "./PollQuestion";
import ChatSidebar from "./ChatSidebar";
import WaitingScreen from "./WaitingScreen";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [isRegistered, setIsRegistered] = useState(false);
    const [question, setQuestion] = useState(null);
    const [selectedOption, setSelectedOption] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [result, setResult] = useState(null);
    const [timer, setTimer] = useState(60);

    useEffect(() => {
        socket.on('kicked', () => {
            localStorage.removeItem("studentName");
            localStorage.removeItem("userRole");
            navigate('/kicked');
        });

        return () => {
            socket.off('kicked');
        };
    }, []);

    useEffect(() => {
        const storedName = localStorage.getItem("studentName");
        const storedRole = localStorage.getItem("userRole");

        if (storedName && storedRole) {
            setName(storedName);
            socket.emit("register-student", { name: storedName });
            setIsRegistered(true);
        }
    }, []);

    const handleRegister = () => {
        if (!name.trim()) return;
        socket.emit("register-student", { name });
        socket.once("registration:success", () => {
            localStorage.setItem("studentName", name);
            localStorage.setItem("userRole", "student");
            setIsRegistered(true);
            socket.emit("request-participants");
        });
    };

    useEffect(() => {
        socket.on("poll-started", (q) => {
            setQuestion(q);
            setSubmitted(false);
            setResult(null);
            setSelectedOption("");
            setTimer(q.timeLimit || 60);
        });

        socket.on("poll-results", (data) => setResult(data));

        return () => {
            socket.off("poll-started");
            socket.off("poll-results");
        };
    }, []);

    useEffect(() => {
        if (!question || submitted) return;

        const interval = setInterval(() => {
            setTimer(prev => {
                if (prev <= 1) {
                    clearInterval(interval);
                    socket.emit("timeout", { questionId: question._id });
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [question, submitted]);

    const handleSubmit = () => {
        if (!selectedOption || !question) return;
        socket.emit("submit-answer", {
            questionId: question._id,
            answer: selectedOption,
        });
        setSubmitted(true);
    };

    return (
        <div className="min-h-screen bg-white px-4 sm:px-6">
            {!isRegistered ? (
                <div className="min-h-screen flex items-center justify-center bg-white px-4">
                    <div className="w-full max-w-md sm:max-w-xl mx-auto text-center">
                        <span className="text-xs sm:text-sm font-semibold px-3 py-1 rounded-full bg-purple-600 text-white mb-6 inline-block">
                            ✨ Intervue Poll
                        </span>

                        <h1 className="text-2xl sm:text-3xl font-semibold mb-2">
                            Let’s <span className="font-bold text-black">Get Started</span>
                        </h1>
                        <p className="text-gray-500 text-sm sm:text-base mb-8">
                            Submit your answers, participate in live polls, and see how your responses compare with your classmates.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Your full name"
                                className="w-full sm:flex-1 p-3 rounded-full bg-gray-100 border border-gray-300 text-dark focus:outline-none focus:ring-2 focus:ring-purple-600"
                            />
                            <button
                                onClick={handleRegister}
                                className="w-full sm:w-auto py-3 px-6 rounded-full bg-gradient-to-r from-purple-600 to-purple-400 text-white font-semibold hover:opacity-90 transition-all"
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <ChatSidebar />
                    {!question ? (
                        <WaitingScreen />
                    ) : (
                        <div className="min-h-screen flex items-center justify-center bg-white px-4 sm:px-6">
                            <div className="w-full max-w-full sm:max-w-3xl lg:max-w-6xl p-4 sm:p-6 rounded-xl shadow-md space-y-6 bg-white">
                                <h2 className="text-center text-xl sm:text-2xl font-semibold">Welcome, {name}!</h2>
                                {!submitted && (
                                    <PollQuestion
                                        question={question}
                                        selectedOption={selectedOption}
                                        setSelectedOption={setSelectedOption}
                                        handleSubmit={handleSubmit}
                                        timer={timer}
                                    />
                                )}
                                {submitted && !result && (
                                    <div className="text-center mt-4 text-purple-600 text-lg sm:text-xl font-medium">
                                        Waiting for results...
                                    </div>
                                )}
                                {result && (
                                    <PollQuestion
                                        question={question}
                                        selectedOption={selectedOption}
                                        setSelectedOption={setSelectedOption}
                                        handleSubmit={handleSubmit}
                                        timer={timer}
                                        submitted={submitted}
                                        result={result}
                                    />
                                )}
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default StudentDashboard;
