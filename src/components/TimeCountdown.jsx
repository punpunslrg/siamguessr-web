import React, { useState, useEffect } from "react";
import { Link } from "react-router";

function RealtimeCountdown() {
  const COUNTDOWN_SECONDS = 86400;

  // Initial targetTime
  const getInitialTargetTime = () => {
    const saved = localStorage.getItem("targetTime");
    const now = Date.now();
    if (saved && !isNaN(saved)) {
      const savedTime = parseInt(saved, 10);
      return savedTime > now ? savedTime : now + COUNTDOWN_SECONDS * 1000;
    }
    return now + COUNTDOWN_SECONDS * 1000;
  };

  const [targetTime, setTargetTime] = useState(getInitialTargetTime);
  const [timeLeft, setTimeLeft] = useState({});
  const [showButton, setShowButton] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  // Main countdown
  useEffect(() => {
    const timer = setTimeout(() => {
      const updated = calculateTimeLeft();
      setTimeLeft(updated);

      if (
        updated.hours === 0 &&
        updated.minutes === 0 &&
        updated.seconds === 0
      ) {
        setShowButton(true);
      }
    }, 1000);

    return () => clearTimeout(timer);
    // eslint-disable-next-line
  }, [timeLeft, targetTime]);

  // Save targetTime
  useEffect(() => {
    localStorage.setItem("targetTime", targetTime.toString());
  }, [targetTime]);

  function calculateTimeLeft() {
    const difference = targetTime - Date.now();
    let time = {};
    if (difference > 0) {
      time = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      time = { hours: 0, minutes: 0, seconds: 0 };
    }
    return time;
  }

  const handleButtonClick = () => {
    setIsClicked(true);
    setShowButton(false);
    // Reset countdown (ถ้าอยาก reset หรือ redirect ไปหน้า gameplay ตาม logic ที่ต้องการ)
    // setTargetTime(Date.now() + COUNTDOWN_SECONDS * 1000);
    localStorage.removeItem("targetTime");
    // ไปหน้า gameplay
    // ... หรือ navigate("/gameplay")
  };

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());
    // eslint-disable-next-line
  }, [targetTime]);

  // Render
  return (
    <>
      {!showButton && (
        <div className="grid grid-flow-col gap-5 text-center auto-cols-max ">
          <div className="flex flex-col">
            <p className="text-3xl font-medium mb-4 text-white">
              PLAY AGAIN IN
            </p>
            <div className="flex flex-row gap-4">
              <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                <span className="countdown font-mono text-5xl">
                  <span style={{ "--value": timeLeft.hours || 0 }}></span>
                </span>
                hours
              </div>
              <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                <span className="countdown font-mono text-5xl">
                  <span style={{ "--value": timeLeft.minutes || 0 }}></span>
                </span>
                min
              </div>
              <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                <span className="countdown font-mono text-5xl">
                  <span style={{ "--value": timeLeft.seconds || 0 }}></span>
                </span>
                sec
              </div>
            </div>
          </div>
        </div>
      )}
      {showButton && !isClicked && (
        <Link to="/gamemode">
          {" "}
          {/*ของจริงต้องเป็น gameplay ที่ไม่มีการสร้างห้อง*/}
          <button
            className="btn-primary px-18 py-3 text-xl shadow-lg"
            onClick={handleButtonClick}
          >
            PLAY
          </button>
        </Link>
      )}
    </>
  );
}

export default RealtimeCountdown;
