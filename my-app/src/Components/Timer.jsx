import React, { useState, useRef } from "react";
import "./Styles.css";

const Timer = () => {
  const [inputHours, setInputHours] = useState(0);
  const [inputMinutes, setInputMinutes] = useState(0);
  const [inputSeconds, setInputSeconds] = useState(0);

  const [timerTime, setTimerTime] = useState(0);
  const [timerOn, setTimerOn] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const [completedTimers, setCompletedTimers] = useState([]);

  const timerRef = useRef(null);

  const startTimer = () => {
    if (!timerOn) {
      const totalSeconds = isPaused
        ? timerTime
        : inputHours * 3600 + inputMinutes * 60 + inputSeconds;
  
      if (totalSeconds <= 0) return; // Prevent starting the timer with 0 seconds
  
      setTimerOn(true);
      setIsPaused(false);
      setTimerTime(totalSeconds);
  
      let hasLogged = false; // Track if the timer has been logged
  
      timerRef.current = setInterval(() => {
        setTimerTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current);
            setTimerOn(false);
            setIsPaused(false);
  
            if (!hasLogged) {
              logCompletedTimer(totalSeconds); // Log only once
              hasLogged = true; // Prevent future logs
            }
  
            setTimerTime(0);
            openWebpage();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
  };
  

  const pauseTimer = () => {
    if (timerOn) {
      setTimerOn(false);
      setIsPaused(true);
      clearInterval(timerRef.current);
    }
  };

  const stopTimer = () => {
    setTimerOn(false);
    setIsPaused(false);
    clearInterval(timerRef.current);
    setTimerTime(0);
  };

  const logCompletedTimer = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    const formattedTime = `${hours > 0 ? hours + "h " : ""}${
      minutes > 0 ? minutes + "m " : ""
    }${seconds}s`;

    setCompletedTimers((prev) => [...prev, formattedTime]);
  };

  const openWebpage = () => {
    const url = "https://wordleunlimited.org/";
    window.open(url, "_blank");
  };

  const handleInputChange = (value, setter, maxValue) => {
    const numericValue = Math.max(0, Math.min(parseInt(value) || 0, maxValue));
    setter(numericValue);
  };

  const hours = Math.floor(timerTime / 3600);
  const minutes = Math.floor((timerTime % 3600) / 60);
  const seconds = timerTime % 60;

  return (
    <div className="timer-container">
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
        crossOrigin="anonymous"
      />
      <div className="time-inputs">
        <div className="input-group mb-3">
          <label className="input-group-text">Hours</label>
          <input
            type="number"
            className="form-control"
            placeholder="Hours"
            value={inputHours}
            onChange={(e) =>
              handleInputChange(e.target.value, setInputHours, 23)
            }
            disabled={timerOn && !isPaused}
          />
        </div>
        <div className="input-group mb-3">
          <label className="input-group-text">Minutes</label>
          <input
            type="number"
            className="form-control"
            placeholder="Minutes"
            value={inputMinutes}
            onChange={(e) =>
              handleInputChange(e.target.value, setInputMinutes, 59)
            }
            disabled={timerOn && !isPaused}
          />
        </div>
        <div className="input-group mb-3">
          <label className="input-group-text">Seconds</label>
          <input
            type="number"
            className="form-control"
            placeholder="Seconds"
            value={inputSeconds}
            onChange={(e) =>
              handleInputChange(e.target.value, setInputSeconds, 59)
            }
            disabled={timerOn && !isPaused}
          />
        </div>
      </div>
      <div className="timer-display">
        <h1>
          {`${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`}
        </h1>
      </div>
      <button
        type="button"
        className="btn btn-success me-2"
        onClick={startTimer}
        disabled={timerOn && !isPaused}
      >
        {isPaused ? "Resume Timer" : "Start Timer"}
      </button>
      <button
        type="button"
        className="btn btn-warning me-2"
        onClick={pauseTimer}
        disabled={!timerOn}
      >
        Pause Timer
      </button>
      <button
        type="button"
        className="btn btn-danger"
        onClick={stopTimer}
        disabled={!timerOn && !isPaused}
      >
        Stop Timer
      </button>

      <div className="completed-timers mt-4">
        <h2>Completed Timers</h2>
        <ul>
          {completedTimers.map((time, index) => (
            <li key={index}>
              Timer {index + 1}: {time}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Timer;
