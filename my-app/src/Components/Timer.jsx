import React, { useState, useRef } from 'react';
import './Styles.css';

const Timer = () => {
  const [inputHours, setInputHours] = useState(0);
  const [inputMinutes, setInputMinutes] = useState(0);
  const [inputSeconds, setInputSeconds] = useState(0);

  const [timerTime, setTimerTime] = useState(0); // Time in seconds
  const [timerOn, setTimerOn] = useState(false);
  const [isPaused, setIsPaused] = useState(false); // New state for pause tracking
  const timerRef = useRef(null);

  const startTimer = () => {
    // If the timer is paused, resume without resetting the timerTime
    if (isPaused) {
      setTimerOn(true);
      setIsPaused(false); // Reset the pause state

      timerRef.current = setInterval(() => {
        setTimerTime((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setTimerOn(false);
            openWebpage();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return;
    }

    // Start the timer fresh
    if (!timerOn) {
      setTimerOn(true);
      let totalSeconds = inputHours * 3600 + inputMinutes * 60 + inputSeconds;
      setTimerTime(totalSeconds);

      timerRef.current = setInterval(() => {
        setTimerTime((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setTimerOn(false);
            openWebpage();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const stopTimer = () => {
    setTimerOn(false);
    clearInterval(timerRef.current);
    setTimerTime(0); // Reset timer
    setIsPaused(false); // Reset pause state
  };

  const pauseTimer = () => {
    if (timerOn) {
      setTimerOn(false);
      setIsPaused(true); // Set the pause state
      clearInterval(timerRef.current); // Stop the countdown without resetting the timer
    }
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
          {`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`}
        </h1>
      </div>
      <button
        type="button"
        className="btn btn-success me-2"
        onClick={startTimer}
        disabled={timerOn && !isPaused} // Disable only when timer is actively running
      >
        {isPaused ? "Resume Timer" : "Start Timer"}
      </button>
      <button
        type="button"
        className="btn btn-danger me-2"
        onClick={stopTimer}
        disabled={!timerOn && !isPaused} // Disable when timer is not running or paused
      >
        Stop Timer
      </button>
      <button
        type="button"
        className="btn btn-warning"
        onClick={pauseTimer}
        disabled={!timerOn} // Disable button when timer is not running
      >
        Pause Timer
      </button>
    </div>
  );
};

export default Timer;
