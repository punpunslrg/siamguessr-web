import { useEffect, useRef, useState } from "react";
import useGameStore from "../stores/game-store";

function RoundTimer({ onTimeout }) {
  const room = useGameStore((state) => state.room);
  const currentRoundIndex = useGameStore((state) => state.currentRoundIndex);
  const gameState = useGameStore((state) => state.gameState);
  const hasSubmittedRef = useRef(false);

  const TEST_TIMER = false; // ✅ toggle this to true for local testing 

  const calculateInitialTimeLeft = () => {
    if (!room || !room.rounds[currentRoundIndex]) return 90;

    const endTime = TEST_TIMER
      ? Date.now() + 10 * 1000
      : new Date(room.rounds[currentRoundIndex].endedAt).getTime() + 1000;

    const now = Date.now();
    return Math.max(0, Math.floor((endTime - now) / 1000));
  };

  const [timeLeft, setTimeLeft] = useState(calculateInitialTimeLeft);

  useEffect(() => {
    hasSubmittedRef.current = false;
    setTimeLeft(calculateInitialTimeLeft());
  }, [room, currentRoundIndex]);

  useEffect(() => {
    if (!room || !room.rounds[currentRoundIndex]) return;

    const endTime = TEST_TIMER
      ? Date.now() + 10 * 1000
      : new Date(room.rounds[currentRoundIndex].endedAt).getTime() + 2000;

    const interval = setInterval(() => {
      const now = Date.now();
      const remaining = Math.max(0, Math.floor((endTime - now) / 1000));
      setTimeLeft(remaining);

      // if (
      //   remaining === 0 &&
      //   !hasSubmittedRef.current &&
      //   gameState === "playing"
      // ) {
      //   hasSubmittedRef.current = true;
      //   onTimeout?.();
      //   clearInterval(interval);
      // }

      if (remaining === 0 && !hasSubmittedRef.current) {
        hasSubmittedRef.current = true;
        onTimeout?.();
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [room, currentRoundIndex, gameState, onTimeout]);

  const formatTime = (seconds) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const isTimeLow = timeLeft !== null && timeLeft <= 15;

  return (
    <div className={`text-2xl font-bold ${isTimeLow ? "text-yellow-400" : ""}`}>
      {formatTime(timeLeft)}
    </div>
  );
}

export default RoundTimer;
