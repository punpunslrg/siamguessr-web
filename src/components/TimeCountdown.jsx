import React, { useState, useEffect } from "react";

function RealtimeCountdown() {
  const calculateTimeLeft = () => {
    // กำหนดวันเป้าหมาย: เที่ยงคืนของวันพรุ่งนี้
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0); // ตั้งเป็นเวลา 00:00:00

    const difference = +tomorrow - +new Date(); // ส่วนต่างเวลา (หน่วยเป็นมิลลิวินาที)
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    // ตั้ง interval ให้คำนวณเวลาใหม่ทุกๆ 1 วินาที
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearTimeout(timer);
  }); // ไม่ต้องใส่ dependency array เพื่อให้ re-render ทุกครั้ง

  return (
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
  );
}

export default RealtimeCountdown;
