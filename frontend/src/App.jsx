import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import StudentPage from "./pages/StudentPage";
import TeacherPage from "./pages/TeacherPage";
import KickedOut from "./components/KickedOut";
import PollHistoryPage from './pages/PollHistoryPage';
import LiveResults from "./components/LiveResults";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/student" element={<StudentPage />} />
        <Route path="/teacher" element={<TeacherPage />} />
        <Route path="/poll-history" element={<PollHistoryPage />} />
        <Route path="/live-results" element={<LiveResults />} />
        <Route path="/kicked" element={<KickedOut />} />
      </Routes>
    </Router>
  );
};

export default App;

const Home = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("");

  const handleContinue = () => {
    if (selectedRole === "student") {
      navigate("/student");
    } else if (selectedRole === "teacher") {
      localStorage.setItem('userRole', "teacher");
      navigate("/teacher");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 bg-white text-dark">
      {/* Badge */}
      <span className="text-xs sm:text-sm font-semibold px-3 py-1 rounded-full bg-primary text-white mb-4">
        ✨ Intervue Poll
      </span>

      {/* Heading */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center mb-2 px-2">
        Welcome to the <span className="font-bold text-black">Live Polling System</span>
      </h1>
      <p className="text-gray-500 text-sm sm:text-base text-center mb-8 max-w-md sm:max-w-lg lg:max-w-xl px-2">
        Please select the role that best describes you to begin using the live polling system
      </p>

      {/* Role Selection Cards */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8 w-full max-w-xl">
        <div
          onClick={() => setSelectedRole("student")}
          className={`flex-1 border rounded-xl p-5 cursor-pointer transition-all duration-300 transform
            ${selectedRole === "student"
              ? "border-primary shadow-md scale-105"
              : "border-gray-300 bg-white hover:border-primary hover:shadow-md hover:scale-105"
            }`}
        >
          <h3 className="font-bold text-lg sm:text-xl mb-1 text-center sm:text-left">I’m a Student</h3>
          <p className="text-sm sm:text-base text-gray-500 text-center sm:text-left">
            Submit answers and view live poll results in real-time.
          </p>
        </div>

        <div
          onClick={() => setSelectedRole("teacher")}
          className={`flex-1 border rounded-xl p-5 cursor-pointer transition-all duration-300 transform
            ${selectedRole === "teacher"
              ? "border-primary shadow-md scale-105"
              : "border-gray-300 bg-white hover:border-primary hover:shadow-md hover:scale-105"
            }`}
        >
          <h3 className="font-bold text-lg sm:text-xl mb-1 text-center sm:text-left">I’m a Teacher</h3>
          <p className="text-sm sm:text-base text-gray-500 text-center sm:text-left">
            Create questions and manage the poll results effectively.
          </p>
        </div>
      </div>

      {/* Continue Button */}
      <button
        onClick={handleContinue}
        className="bg-primary hover:bg-secondary text-white px-6 sm:px-8 py-3 rounded-full text-sm sm:text-base font-semibold transition-all duration-300 transform hover:scale-105"
      >
        Continue
      </button>
    </div>
  );
};
