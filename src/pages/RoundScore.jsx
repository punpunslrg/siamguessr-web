import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useGameStore from "../stores/game-store.js";
import { Map } from "@vis.gl/react-google-maps";
import ResultsMap from "../components/ResultMap.jsx";
import { LoaderCircle } from "lucide-react";
import useUserStore from "../stores/userStore.js";

function RoundScore() {
  const navigate = useNavigate();
  const [isMapReady, setIsMapReady] = useState(false);

  const user = useUserStore((state) => state.user);
  const {
    room,
    currentRoundIndex,
    actionNextRound,
    allGuessed,
    playersData: users,
  } = useGameStore();

  const currentRound = room?.rounds?.[currentRoundIndex];
  const nextRound = room?.rounds?.[currentRoundIndex + 1];
  const lastGuess = allGuessed?.find((g) => g.userId === user.id);
  const owner = room?.players?.find((p) => p.userId === user.id);

  const actualLocation = currentRound?.location
    ? {
        ...currentRound.location,
        lat: Number(currentRound.location.lat),
        lng: Number(currentRound.location.lng),
      }
    : undefined;

  // Redirect if room doesn't exist (e.g., direct access with invalid state)
  useEffect(() => {
    if (!room) {
      const timeout = setTimeout(() => {
        navigate("/gameplay");
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [room, navigate]);

  const handleNext = async () => {
    if (currentRoundIndex === 4) {
      navigate(room?.mode === "single" ? "/singlescore" : "/gamebreakdown");
    } else {
      await actionNextRound(nextRound.id, navigate);
      navigate("/gameplay");
    }
  };

  console.log("allGuessed", allGuessed)

  const progress = lastGuess?.score ? (lastGuess.score / 5000) * 100 : 0;

  return (
    <div className="bg-secondary flex flex-col items-center justify-center px-4 py-10">
      <div className="flex justify-center w-full max-w-3xl mb-4">
        <h2 className="text-3xl font-bold">
          Round {currentRoundIndex + 1} of {room?.rounds.length || 5}
        </h2>
      </div>

      <div className="w-full max-w-3xl h-96 bg-gray-800 mb-6 rounded-lg shadow-lg overflow-hidden relative">
        {!lastGuess ? (
          <div className="flex items-center justify-center h-full text-white text-xl font-semibold">
            Waiting for other players to guess...
          </div>
        ) : (
          <>
            {!isMapReady && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-800 z-10">
                <LoaderCircle className="animate-spin w-6 h-6 text-white" />
              </div>
            )}
            <Map
              defaultCenter={{ lat: 13.75, lng: 100.5 }}
              defaultZoom={3}
              gestureHandling="greedy"
              disableDefaultUI={true}
              mapId="113d733319c2cd6257310524"
              onTilesLoaded={() => setIsMapReady(true)}
            >
              <ResultsMap
                actualLocation={actualLocation}
                allGuesses={allGuessed}
              />
            </Map>
          </>
        )}
      </div>

      <div className="text-center bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-4xl font-bold text-yellow-400">
          {lastGuess
            ? `${lastGuess.score.toLocaleString()} points`
            : `Waiting for another player to guess...`}
        </h3>

        <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden mx-auto my-4">
          <div
            className="h-full bg-green-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-lg">
          {lastGuess ? (
            typeof lastGuess.distance === "number" ? (
              <>
                Your guess was{" "}
                <strong>{lastGuess.distance.toFixed(2)} km</strong> away.
              </>
            ) : (
              <>No guess was made for this round.</>
            )
          ) : (
            ""
          )}
        </p>
      </div>

      {(owner?.isHost && allGuessed.length === 0) && (
        <p className="-mb-5 mt-3 text-gray-400">Waiting for another player...</p>
      )}

      {!owner?.isHost && (
        <p className="-mb-5 mt-3 text-gray-400">Waiting for host...</p>
      )}

      <button
        onClick={handleNext}
        disabled={!owner?.isHost}
        className={`${(owner?.isHost && allGuessed.length !== 0) ? "btn-round" : "btn-none"}`}
      >
        {currentRoundIndex === 4 ? "VIEW FINAL RESULTS" : "START NEXT ROUND"}
      </button>
    </div>
  );
}

export default RoundScore;
