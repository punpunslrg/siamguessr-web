import { useEffect, useState, useRef } from "react";
import useGameStore from "../stores/game-store.js";
import StreetView from "../components/StreetView.jsx";
import GuessMap from "../components/GuessMap.jsx";
import { useNavigate } from "react-router";

function Gameplay() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [playerGuess, setPlayerGuess] = useState(null);
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const hoverTimeoutRef = useRef(null);
  const navigate = useNavigate();

  // --- Re-enabled Game Store Logic ---
  const actionGetRandomLocation = useGameStore(
    (state) => state.actionGetRandomLocation
  );
  const randomLocation = useGameStore((state) => state.randomLocation);
  console.log(randomLocation);

  const actionCalculateScore = useGameStore(
    (state) => state.actionCalculateScore
  );

  // Effect to load a random location on initial mount
  useEffect(() => {
    actionGetRandomLocation();
  }, [actionGetRandomLocation]);

  // Effect to update the view when a new random location is fetched from the store
  useEffect(() => {
    if (randomLocation) {
      setCurrentLocation(randomLocation);
      setPlayerGuess(null); // Reset player guess for the new round
    }
  }, [randomLocation]);

  // Cleanup effect for the hover timer
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const changeMap = async () => {
    await actionGetRandomLocation();
  };

  const handleGuess = () => {
    if (!playerGuess) return;
    console.log("Real Location:", currentLocation);
    console.log("Player Guess:", playerGuess);
    actionCalculateScore(playerGuess);
    navigate("/round");
  };

  const handleMouseEnter = () => {
    clearTimeout(hoverTimeoutRef.current);
    setIsMapExpanded(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsMapExpanded(false);
    }, 1000);
  };

  const handleMovabilityCheck = (locationData, isMovable) => {
    if (!isMovable) {
      // Find the name of the location that was just loaded
      const locationName = randomLocation?.name || "Unknown Location";

      console.warn(
        `🚩 WARNING: Location "${locationName}" is not movable.`,
        `Coordinates: { lat: ${locationData.lat}, lng: ${locationData.lng} }`,
        `Please update or remove it from your JSON list.`
      );
    }
  }; // <-- THE CLOSING BRACE WAS MOVED HERE

  // The main return statement is now correctly in the component body
  return (
    <div className="w-full h-full">
      <div className="relative w-full h-full overflow-hidden">
        {currentLocation ? (
          // Pass the new function as a prop to StreetView
          <StreetView
            position={currentLocation}
            onMovabilityCheck={handleMovabilityCheck}
          />
        ) : (
          <div className="text-white text-center">Loading Location...</div>
        )}

        <div className="absolute inset-0 flex flex-col justify-between p-4 md:p-8 z-10 pointer-events-none">
          <div className="flex justify-center">
            <div className="bg-blue-800 text-white px-6 py-2 rounded-full shadow-lg text-lg font-bold">
              01:23
            </div>
          </div>

          <div className="flex-grow"></div>

          <div className="flex justify-between items-end -mb-2">
            <button className="btn btn-error btn-sm shadow-lg text-white pointer-events-auto">
              Leave
            </button>
            <button
              onClick={() => changeMap()}
              className="btn btn-neutral btn-sm shadow-lg text-white pointer-events-auto"
            >
              Change
            </button>

            <div
              className="flex flex-col items-end space-y-2 mr-10"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div
                className={`relative overflow-hidden transition-all duration-300 ease-in-out bg-white rounded-lg shadow-xl pointer-events-auto 
                ${
                  isMapExpanded
                    ? "w-[32rem] h-80 opacity-100"
                    : "w-64 h-40 opacity-50"
                }`}
              >
                <div className="absolute bottom-0 right-0 w-[32rem] h-80">
                  <GuessMap onPinPlace={setPlayerGuess} />
                </div>
              </div>
              
              <div className="h-12">
                {!playerGuess ? (
                  <div
                    className={`h-full flex items-center justify-center bg-[rgba(0,0,0,0.5)] text-white rounded-lg text-center text-sm font-semibold p-2 pointer-events-none select-none transition-all duration-300 ease-in-out 
                    ${isMapExpanded ? "w-[32rem]" : "w-64"}`}
                  >
                    PLACE YOUR PIN ON THE MAP
                  </div>
                ) : (
                  <button
                    onClick={handleGuess}
                    className={`btn btn-success pointer-events-auto transition-all duration-300 ease-in-out font-bold 
                    ${isMapExpanded ? "w-[32rem]" : "w-64"}`}
                  >
                    GUESS
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Gameplay;
