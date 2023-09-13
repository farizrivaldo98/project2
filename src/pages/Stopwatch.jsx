import React, { useState, useRef, useEffect } from "react";
import { Select } from "@chakra-ui/react";

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isTen, setTen] = useState();
  const intervalRef = useRef(null);

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

  const startStopwatch = () => {
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTime((prevTime) => prevTime + 10);
    }, 10);
  };

  const selectMinuits = (e) => {
    setTen(e.target.value);
  };

  useEffect(() => {
    if (isTen == 20) {
      if (time >= 1000 && time < 1020000) {
        document.body.style.backgroundColor = "green";
      } else if (time >= 1020000 && time < 1200000) {
        document.body.style.backgroundColor = "yellow";
      } else if (time >= 1200000) {
        document.body.style.backgroundColor = "red";
      }
    } else if (isTen == 10) {
      if (time >= 1000 && time < 420000) {
        document.body.style.backgroundColor = "green";
      } else if (time >= 420000 && time < 600000) {
        document.body.style.backgroundColor = "yellow";
      } else if (time >= 600000) {
        document.body.style.backgroundColor = "red";
      }
    } else if (isTen == 15) {
      if (time >= 1000 && time < 720000) {
        document.body.style.backgroundColor = "green";
      } else if (time >= 720000 && time < 900000) {
        document.body.style.backgroundColor = "yellow";
      } else if (time >= 900000) {
        document.body.style.backgroundColor = "red";
      }
    }
  }, [time]);

  useEffect(() => {
    if (time == 0) {
      document.body.style.backgroundColor = "white";
    }
  }, [time]);

  const pauseStopwatch = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  const resetStopwatch = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
    setTime(0);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-9xl font-bold">{formatTime(time)}</h1>
      <div className="space-x-4">
        {!isRunning ? (
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded"
            onClick={startStopwatch}
          >
            Start
          </button>
        ) : (
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded"
            onClick={pauseStopwatch}
          >
            Pause
          </button>
        )}
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded"
          onClick={resetStopwatch}
        >
          Reset
        </button>
        <button>
          <Select placeholder="Select Min" onChange={selectMinuits}>
            <option value={10}>10 Menit</option>
            <option value={15}>15 Menit</option>
            <option value={20}>20 Menit</option>
          </Select>
        </button>
      </div>
    </div>
  );
};

export default Stopwatch;
