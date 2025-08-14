import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../socket";
import ChatSidebar from "./ChatSidebar";

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState([
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
  ]);
  const [pollTime, setPollTime] = useState(60);
  const [currentPoll, setCurrentPoll] = useState(null);
  const [results, setResults] = useState(null);
  const [timer, setTimer] = useState(0);

  const handleOptionChange = (index, value) => {
    const updated = [...options];
    updated[index].text = value;
    setOptions(updated);
  };

  const handleCorrectToggle = (index, value) => {
    const updated = options.map((opt, i) => ({
      ...opt,
      isCorrect: i === index ? value : opt.isCorrect,
    }));
    setOptions(updated);
  };

  const addOptionField = () => {
    if (options.length < 5) setOptions([...options, { text: "", isCorrect: false }]);
  };

  const createPoll = () => {
    const cleanOptions = options.filter((opt) => opt.text.trim() !== "");
    if (!questionText || cleanOptions.length < 2 || pollTime <= 0) return;

    socket.emit("create-poll", {
      text: questionText,
      options: cleanOptions,
      timeLimit: pollTime,
    });

    setQuestionText("");
    setOptions([
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
    ]);
    setPollTime(60);
  };

  useEffect(() => {
    let interval;

    socket.on("poll-started", (poll) => {
      navigate("/live-results", {
        state: {
          poll,
          timeLimit: poll.timeLimit,
        },
      });
    });

    socket.on("poll-results", (data) => {
      setResults(data);
      clearInterval(interval);
    });

    return () => {
      socket.off("poll-started");
      socket.off("poll-results");
      clearInterval(interval);
    };
  }, [navigate]);

  return (
    <>
      <ChatSidebar />
      <div className="min-h-screen bg-white p-4 sm:p-6 lg:p-8 text-dark">
        <div className="max-w-4xl sm:max-w-6xl mx-auto p-6 sm:p-8 bg-white rounded-xl shadow border border-gray-200">
          <div className="mb-6">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary text-white mb-2 inline-block">
              ✨ Intervue Poll
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold mt-2">
              Let’s <span className="text-primary">Get Started</span>
            </h2>
            <p className="text-gray-500 mt-2 text-sm sm:text-base">
              Create and manage polls, ask questions, and monitor student responses in real-time.
            </p>
          </div>

          <div className="mb-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 max-w-lg">
            <label className="block font-medium text-gray-800 text-sm">Enter your question</label>
            <select
              value={pollTime}
              onChange={(e) => setPollTime(Number(e.target.value))}
              className="border border-gray-300 rounded px-3 py-1 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {[15, 30, 45, 60, 90, 120].map((sec) => (
                <option key={sec} value={sec}>
                  {sec} seconds
                </option>
              ))}
            </select>
          </div>

          <textarea
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value.slice(0, 100))}
            placeholder="Type your question here..."
            className="w-full max-w-lg border border-gray-300 rounded-md p-3 text-sm resize-none h-24 focus:outline-none focus:ring-2 focus:ring-primary bg-gray-50"
          />
          <div className="text-left text-xs text-gray-400 mt-1">
            {questionText.length}/100
          </div>

          <div className="mt-6">
            <div className="grid grid-cols-2 gap-2 text-sm font-semibold text-gray-700">
              <div>Edit Options</div>
              <div>Is it Correct?</div>
            </div>

            {options.map((opt, index) => (
              <div key={index} className="grid grid-cols-2 gap-2 items-center mt-2">
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 flex items-center justify-center bg-primary text-white font-bold rounded-full text-xs">
                    {index + 1}
                  </span>
                  <input
                    type="text"
                    value={opt.text}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    className="flex-1 min-w-0 bg-gray-50 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder={`Option ${index + 1}`}
                  />
                </div>
                {/* Fixed flex-nowrap for Yes/No radios */}
                <div className="flex items-center gap-2 text-sm flex-nowrap">
                  <label className="flex items-center space-x-2 text-sm font-medium">
                    <input
                      type="radio"
                      name={`correct-${index}`}
                      className="accent-primary"
                      checked={opt.isCorrect === true}
                      onChange={() => handleCorrectToggle(index, true)}
                    />
                    <span>Yes</span>
                  </label>

                  <label className="flex items-center space-x-2 text-sm font-medium">
                    <input
                      type="radio"
                      name={`correct-${index}`}
                      className="accent-primary"
                      checked={opt.isCorrect === false}
                      onChange={() => handleCorrectToggle(index, false)}
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>
            ))}

            <button
              onClick={addOptionField}
              className="mt-4 text-sm border border-primary px-3 py-1 rounded-full text-primary hover:bg-primary hover:text-white transition"
            >
              + Add More option
            </button>
          </div>

          <hr className="border-t border-muted my-4 text-gray-100" />

          <div className="flex justify-end">
            <button
              onClick={createPoll}
              className="w-full sm:w-auto bg-primary text-white font-semibold py-2 px-6 rounded-full hover:bg-purple-700 transition-all"
            >
              Ask Question
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeacherDashboard;
