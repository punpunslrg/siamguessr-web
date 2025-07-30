import { useEffect } from "react";
import { useNavigate } from "react-router";
import useGameStore from "../stores/game-store.js";
import { Map } from "@vis.gl/react-google-maps";
import ResultsMap from "../components/ResultMap.jsx";

// A helper component to render the map and fit the bounds

function RoundScore() {
  const navigate = useNavigate();

  // Get data and actions from the redesigned store
  const room = useGameStore((state) => state.room);
  const currentRoundIndex = useGameStore((state) => state.currentRoundIndex);
  const guesses = useGameStore((state) => state.guesses);
  const gameState = useGameStore((state) => state.gameState);
  const actionNextRound = useGameStore((state) => state.actionNextRound);
  const actionGetTotalScore = useGameStore(
    (state) => state.actionGetTotalScore
  );

  // Get the results of the most recent guess
  const lastGuess = guesses[currentRoundIndex];
  const currentRound = room?.rounds?.[currentRoundIndex];
  const actualLocation = currentRound?.location;

  // This effect handles the case where the user navigates here directly
  useEffect(() => {
    if (!room || !lastGuess) {
      console.log("No round data found, navigating back to gameplay.");
      navigate("/gameplay");
    }
  }, [room, lastGuess, navigate]);

  const handleNext = () => {
    localStorage.removeItem("roundStartTimestamp");

    if (gameState === "game-over") {
      navigate("/game-summary");
    } else {
      actionNextRound();
      navigate("/gameplay");
    }
  };

  if (!room || !lastGuess) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        Loading results...
      </div>
    );
  }

  const progress = (lastGuess.score / 5000) * 100;
  const totalScore = actionGetTotalScore();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-4 py-10">
      <div className="flex justify-center w-full max-w-3xl mb-4">
        <h2 className="text-3xl font-bold">
          Round {currentRoundIndex + 1} of {room.rounds.length}
        </h2>
      </div>

      <div className="w-full max-w-3xl h-96 bg-gray-800 mb-6 rounded-lg shadow-lg overflow-hidden">
        <Map
          defaultCenter={{ lat: 13.75, lng: 100.5 }}
          defaultZoom={3}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
          mapId="113d733319c2cd6257310524"
        >
          <ResultsMap
            actualLocation={actualLocation}
            guessLocation={lastGuess.guess}
          />
        </Map>
      </div>

      <div className="text-center bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-4xl font-bold text-yellow-400">
          {lastGuess.score.toLocaleString()} points
        </h3>

        <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden mx-auto my-4">
          <div
            className="h-full bg-green-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <p className="text-lg">
          {typeof lastGuess.distance === "number" ? (
            <>
              Your guess was <strong>{lastGuess.distance.toFixed(2)} km</strong>{" "}
              away.
            </>
          ) : (
            <>No guess was made for this round.</>
          )}
        </p>
      </div>

      <button
        onClick={handleNext}
        className="mt-8 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-lg cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 active:scale-95"
      >
        {gameState === "game-over" ? "VIEW FINAL RESULTS" : "START NEXT ROUND"}
      </button>
    </div>
  );
}

export default RoundScore;
