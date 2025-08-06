import React, { useState, useEffect } from "react";

function RealtimeCountdown() {
  const COUNTDOWN_SECONDS = 10;

  const getInitialTargetTime = () => {
    const saved = localStorage.getItem("targetTime");
    const now = new Date().getTime();

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
  const [hasFinished, setHasFinished] = useState(
    localStorage.getItem("hasFinished") === "true"
  );

  const calculateTimeLeft = () => {
    const difference = targetTime - new Date().getTime();
    return {
      seconds: difference > 0 ? Math.floor((difference / 1000) % 60) : 0,
    };
  };

  // Main countdown loop
  useEffect(() => {
    const timer = setTimeout(() => {
      const updated = calculateTimeLeft();
      setTimeLeft(updated);

      if (updated.seconds <= 0) {
        setShowButton(true);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, targetTime]);

  // บันทึก targetTime ลง localStorage
  useEffect(() => {
    localStorage.setItem("targetTime", targetTime.toString());
  }, [targetTime]);

  // กันการ refresh โดยไม่ตั้งใจ
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = ""; // สำหรับ Chrome
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  const handleButtonClick = () => {
    setIsClicked(true);
    setShowButton(false);
    const newTarget = new Date().getTime() + COUNTDOWN_SECONDS * 1000;
    setTargetTime(newTarget);
    setTimeLeft(calculateTimeLeft());
    setIsClicked(false);
    setHasFinished(true);
    localStorage.setItem("hasFinished", "true");

    // ตัวอย่างการเปลี่ยนหน้า
    console.log("ไปหน้าต่อไป...");
    // navigate("/next-page"); // ถ้าใช้ React Router
  };

  return (
    <>
      {!showButton && (
        <div className="grid grid-flow-col gap-5 text-center auto-cols-max ">
          {/* ชั่วโมง */}

          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-5xl">
              <span style={{ "--value": timeLeft.hours }}></span>
            </span>
            hours
          </div>

          {/* นาที */}
          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-5xl">
              <span style={{ "--value": timeLeft.minutes }}></span>
            </span>
            min
          </div>

          {/* วินาที */}
          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-5xl">
              <span style={{ "--value": timeLeft.seconds }}></span>
            </span>
            sec
          </div>
        </div>
      )}
      {hasFinished && showButton && !isClicked && (
        <button
          className="btn-primary px-18 py-3  text-xl shadow-lg"
          onClick={handleButtonClick}
        >
          PLAY
        </button>
      )}
    </>
  );
}

export default RealtimeCountdown;
