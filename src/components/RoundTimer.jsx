import { useEffect, useState } from "react";
import useGameStore from "../stores/game-store";
import { useNavigate } from "react-router";

function RoundTimer() {
  const room = useGameStore((state) => state.room);
  const currentRoundIndex = useGameStore((state) => state.currentRoundIndex);
  const gameState = useGameStore((state) => state.gameState);
  const actionSubmitGuess = useGameStore((state) => state.actionSubmitGuess);
  const navigate = useNavigate();

  // Calculate initial timeLeft immediately
  const calculateInitialTimeLeft = () => {
    if (!room || !room.rounds[currentRoundIndex]) return 90; // default to 1:30

    const round = room.rounds[currentRoundIndex];
    const TEST_TIMER = false;

    const endTime = TEST_TIMER
      ? Date.now() + 10 * 1000
      : new Date(round.endedAt).getTime() + 1000;

    const now = Date.now();
    const remaining = Math.max(0, Math.floor((endTime - now) / 1000));

    return remaining > 0 ? remaining : 0;
  };

  const [timeLeft, setTimeLeft] = useState(calculateInitialTimeLeft);

  useEffect(() => {
    if (!room || !room.rounds[currentRoundIndex]) return;

    const round = room.rounds[currentRoundIndex];
    const TEST_TIMER = false;

    const endTime = TEST_TIMER
      ? Date.now() + 10 * 1000
      : new Date(round.endedAt).getTime() + 2000;

    const interval = setInterval(() => {
      const now = Date.now();
      const remaining = Math.max(0, Math.floor((endTime - now) / 1000));
      setTimeLeft(remaining);

      if (remaining === 0) {
        clearInterval(interval);
        if (gameState === "playing") {
          actionSubmitGuess(null);
        }
        navigate("/round");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [room, currentRoundIndex, gameState]);

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
