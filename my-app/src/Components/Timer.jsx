import React, { useState, useRef } from 'react';
import './Styles.css';

const Timer = () => {
  const [inputHours, setInputHours] = useState(0);
  const [inputMinutes, setInputMinutes] = useState(0);
  const [inputSeconds, setInputSeconds] = useState(0);
  const [timerTime, setTimerTime] = useState(0); // Time in seconds
  const [timerOn, setTimerOn] = useState(false);
  const [isPaused, setIsPaused] = useState(false); // New state for pause tracking
  const [completedTimers, setCompletedTimers] = useState([]); // State for completed timers

  const timerRef = useRef(null);

  const startTimer = () => {
    let endTime;

    if (isPaused) {
      setTimerOn(true);
      setIsPaused(false);
      timerRef.current = setInterval(() => {
        const timeLeft = Math.max(0, endTime - Date.now());
        setTimerTime(Math.ceil(timeLeft / 1000));
        if (timeLeft <= 0) {
          clearInterval(timerRef.current);
          setTimerOn(false);
          logCompletedTimer(timerTime);
          openWebpage();
        }
      }, 1000);
      return;
    }

    if (!timerOn) {
      const totalSeconds = inputHours * 3600 + inputMinutes * 60 + inputSeconds;
      if (totalSeconds <= 0) return; // Prevent starting with 0 time
      endTime = Date.now() + totalSeconds * 1000; // Calculate end time
      setTimerOn(true);
      setTimerTime(totalSeconds);

      timerRef.current = setInterval(() => {
        const timeLeft = Math.max(0, endTime - Date.now());
        setTimerTime(Math.ceil(timeLeft / 1000));
        if (timeLeft <= 0) {
          clearInterval(timerRef.current);
          setTimerOn(false);
          logCompletedTimer(totalSeconds);
          openWebpage();
        }
      }, 1000);
    }
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
    setTimerOn(false);
    setTimerTime(0);
    setIsPaused(false);
  };

  const pauseTimer = () => {
    if (timerOn) {
      clearInterval(timerRef.current);
      timerRef.current = null;
      setTimerOn(false);
      setIsPaused(true);
    }
  };

  const openWebpage = (() => {
    let triggered = false;
    return () => {
      if (!triggered) {
        triggered = true;
        window.open("https://wordleunlimited.org/", "_blank");
        setTimeout(() => (triggered = false), 1000);
      }
    };
  })();

  const handleInputChange = (value, setter, maxValue) => {
    const numericValue = Math.max(0, Math.min(parseInt(value) || 0, maxValue));
    setter(numericValue);
  };

  const logCompletedTimer = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    setCompletedTimers((prevTimers) => [...prevTimers, formattedTime]);
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
          {`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`}
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
        className="btn btn-danger me-2"
        onClick={stopTimer}
        disabled={!timerOn && !isPaused}
      >
        Stop Timer
      </button>
      <button
        type="button"
        className="btn btn-warning"
        onClick={pauseTimer}
        disabled={!timerOn}
      >
        Pause Timer
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
