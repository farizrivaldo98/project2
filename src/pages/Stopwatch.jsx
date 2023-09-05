import React, { useState, useEffect, useRef } from "react";

const Stopwatch = () => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [milliseconds, setMilliseconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setMilliseconds((prevMilliseconds) => {
          if (prevMilliseconds === 99) {
            setSeconds((prevSeconds) => {
              if (prevSeconds === 59) {
                setMinutes((prevMinutes) => prevMinutes + 1);
                return 0;
              }
              return prevSeconds + 1;
            });
            return 0;
          }
          return prevMilliseconds + 1;
        });
      }, 1);
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
    setMinutes(0);
    setSeconds(0);
    setMilliseconds(0);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl font-bold">
        {minutes.toString().padStart(2, "0")}.
        {seconds.toString().padStart(2, "0")}.
        {milliseconds.toString().padStart(3, "0")}
      </h1>
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
