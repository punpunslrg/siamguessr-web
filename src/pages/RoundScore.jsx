import { useEffect } from "react";
import { useNavigate } from "react-router";
import useGameStore from "../stores/game-store.js";
import { Map, AdvancedMarker, useMap } from "@vis.gl/react-google-maps";

// A helper component to render the map and fit the bounds
function ResultsMap({ actualLocation, guessLocation }) {
  const map = useMap();

  // This effect adjusts the map's zoom and center
  useEffect(() => {
    if (!map || !actualLocation || !guessLocation) return;

    const bounds = new window.google.maps.LatLngBounds();
    bounds.extend(new window.google.maps.LatLng(actualLocation));
    bounds.extend(new window.google.maps.LatLng(guessLocation));
    map.fitBounds(bounds, 100); // 100px padding
  }, [map, actualLocation, guessLocation]);

  // This new effect manually creates and manages the Polyline
  useEffect(() => {
    if (!map || !actualLocation || !guessLocation) return;

    const path = [actualLocation, guessLocation];
    const polyline = new window.google.maps.Polyline({
      path: path,
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
    });
    polyline.setMap(map);

    return () => polyline.setMap(null);
  }, [map, actualLocation, guessLocation]);

  if (!actualLocation || !guessLocation) {
    return <div className="w-full h-full bg-gray-300">Loading map...</div>;
  }

  return (
    <>
      <AdvancedMarker position={actualLocation} title="Actual Location" />
      <AdvancedMarker position={guessLocation} title="Your Guess">
        {/* This is the new blue pin icon */}
        <span className="text-blue-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="white"
            strokeWidth="1.5"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        </span>
      </AdvancedMarker>
    </>
  );
}

function RoundScore() {
  const navigate = useNavigate();

  // Select each piece of state individually to avoid re-render warnings
  const roundScore = useGameStore((state) => state.roundScore);
  const distance = useGameStore((state) => state.distance);
  const currentRound = useGameStore((state) => state.currentRound);
  const randomLocation = useGameStore((state) => state.randomLocation);
  const lastPlayerGuess = useGameStore((state) => state.lastPlayerGuess);

  // This effect handles the case where the user navigates here directly
  useEffect(() => {
    if (!randomLocation || !lastPlayerGuess) {
      console.log("No round data found, navigating back to gameplay.");
      navigate("/gameplay");
    }
  }, [randomLocation, lastPlayerGuess, navigate]);

  const handleNextRound = () => {
    navigate("/gameplay");
  };

  const progress = (roundScore / 5000) * 100;

  // Don't render anything until the location data is confirmed to exist
  if (!randomLocation || !lastPlayerGuess) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        Loading results...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-4 py-10">
      <h2 className="text-3xl font-bold mb-6">
        Round {currentRound - 1} Results
      </h2>

      <div className="w-full max-w-3xl h-96 bg-gray-800 mb-6 rounded-lg shadow-lg overflow-hidden">
        <Map
          defaultCenter={{ lat: 13.75, lng: 100.5 }}
          defaultZoom={3}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
          mapId="113d733319c2cd6257310524"
        >
          <ResultsMap
            actualLocation={randomLocation}
            guessLocation={lastPlayerGuess}
          />
        </Map>
      </div>

      <div className="text-center bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-4xl font-bold text-yellow-400">
          {roundScore.toLocaleString()} points
        </h3>

        <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden mx-auto my-4">
          <div
            className="h-full bg-green-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <p className="text-lg">
          Your guess was{" "}
          <strong>{distance ? distance.toFixed(2) : "0"} km</strong> away.
        </p>
      </div>

      <button
        onClick={handleNextRound}
        className="mt-8 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-lg cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 active:scale-95"
      >
        START NEXT ROUND
      </button>
    </div>
  );
}

export default RoundScore;
