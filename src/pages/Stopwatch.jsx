import React, { useState, useEffect, useRef } from "react";

const Stopwatch = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        if (seconds === 59) {
          if (minutes === 59) {
            setHours((prevHours) => prevHours + 1);
            setMinutes(0);
          } else {
            setMinutes((prevMinutes) => prevMinutes + 1);
          }
          setSeconds(0);
        } else {
          setSeconds((prevSeconds) => prevSeconds + 1);
        }
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isRunning, seconds, minutes, hours]);

  const handleStartPause = () => {
    setIsRunning((prevState) => !prevState);
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <h1 className="text-4xl font-bold">
        {hours.toString().padStart(2, "0")}:
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </h1>
      <div className="space-x-4">
        <button
          className={`bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded `}
          onClick={handleStartPause}
          disabled={isRunning}
        >
          {isRunning ? "Pause" : "Start"}
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Stopwatch;
