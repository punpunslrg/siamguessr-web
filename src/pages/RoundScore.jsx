import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useGameStore from "../stores/game-store.js";
import { Map } from "@vis.gl/react-google-maps";
import ResultsMap from "../components/ResultMap.jsx";
import { LoaderCircle } from "lucide-react";
import useUserStore from "../stores/userStore.js";

// A helper component to render the map and fit the bounds

function RoundScore() {
  const navigate = useNavigate();
  const [isMapReady, setIsMapReady] = useState(false);

  const user = useUserStore(state => state.user)

  // Get data and actions from the redesigned store
  const room = useGameStore((state) => state.room);
  const currentRoundIndex = useGameStore((state) => state.currentRoundIndex);
  const guesses = useGameStore((state) => state.guesses);
  const actionNextRound = useGameStore((state) => state.actionNextRound);

  // Get the results of the most recent guess
  const lastGuess = guesses[currentRoundIndex];
  const currentRound = room?.rounds?.[currentRoundIndex];
  const nextRound = room?.rounds?.[currentRoundIndex + 1];
  const actualLocation = currentRound?.location
    ? {
        ...currentRound.location,
        lat: Number(currentRound.location.lat),
        lng: Number(currentRound.location.lng),
      }
    : undefined;

  // This effect handles the case where the user navigates here directly
  useEffect(() => {
    if (!room || !lastGuess) {
      navigate("/gameplay");
    }
  }, [room, lastGuess, navigate]);

  const handleNext = () => {
    if (currentRoundIndex === 4) {
      navigate("/singlescore");
    } else {
      actionNextRound(nextRound.id);
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

  return (
    <div className=" bg-secondary flex flex-col items-center justify-center px-4 py-10">
      <div className="flex justify-center w-full max-w-3xl mb-4">
        <h2 className="text-3xl font-bold">
          Round {currentRoundIndex + 1} of {room.rounds.length}
        </h2>
      </div>

      <div className="w-full max-w-3xl h-96 bg-gray-800 mb-6 rounded-lg shadow-lg overflow-hidden">
        {/* หน้ากาก Loading จะแสดงอยู่ด้านบนสุด */}
        {!isMapReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800 z-10">
            <LoaderCircle className="animate-spin w-6 h-6 text-white" />
          </div>
        )}

        {/* แผนที่จะถูกเรนเดอร์ตามปกติอยู่ข้างใต้ */}
        <Map
          defaultCenter={{ lat: 13.75, lng: 100.5 }}
          defaultZoom={3}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
          mapId="113d733319c2cd6257310524"
          onTilesLoaded={() => setIsMapReady(true)}
        >
          <ResultsMap
            actualLocation={actualLocation}
            guessLocation={lastGuess.guess}
            userImage ={user?.image}
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

      <button onClick={handleNext} className="btn-round">
        {currentRoundIndex === 4 ? "VIEW FINAL RESULTS" : "START NEXT ROUND"}
      </button>
    </div>
  );
}

export default RoundScore;
