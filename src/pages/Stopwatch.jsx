import React, { useState, useEffect, useRef } from "react";

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(0);

  const formatTime = (milliseconds) => {
    const totalMilliseconds = Math.floor(milliseconds);
    const totalSeconds = Math.floor(totalMilliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const millis = totalMilliseconds % 1000;
    return `${minutes.toString().padStart(2, "0")}.${seconds
      .toString()
      .padStart(2, "0")}.${millis.toString().padStart(3, "0")}`;
  };

  const updateElapsedTime = () => {
    const currentTime = Date.now();
    const elapsedTime = isRunning
      ? currentTime - startTimeRef.current + time
      : time;
    setTime(elapsedTime);
    startTimeRef.current = currentTime;
  };

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now() - time;
      intervalRef.current = setInterval(updateElapsedTime, 10);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isRunning, time]);

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
      <h1 className="text-6xl font-bold">{formatTime(time)}</h1>
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
