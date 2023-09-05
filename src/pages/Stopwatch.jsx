import React, { useState, useEffect, useRef } from "react";

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const handleStartPause = () => {
    setIsRunning((prevState) => !prevState);
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTime(0);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-8xl font-bold">{time}s</h1>
      <div className="space-x-4">
        <button
          className={`bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded ${
            isRunning ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleStartPause}
          disabled={isRunning}
        >
          {isRunning ? "Pause" : "Start"}
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Stopwatch;
