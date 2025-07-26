import { useEffect, useState, useRef, useCallback } from "react";
import useGameStore from "../stores/game-store.js";
import StreetView from "../components/StreetView.jsx";
import GuessMap from "../components/GuessMap.jsx";
import { useNavigate, useLocation } from "react-router";
import { getRoomDetails } from "../api/gameApi.js"; // Assuming you have this API function

// Configuration for the map sizes
const mapSizeConfig = {
  sm: { container: "w-64 h-40", button: "w-64" },
  md: { container: "w-[32rem] h-80", button: "w-[32rem]" },
  lg: { container: "w-[40rem] h-[30rem]", button: "w-[40rem]" },
  xl: { container: "w-[48rem] h-[36rem]", button: "w-[48rem]" },
};
// Define the levels available for the EXPANDED map
const expandedMapSizeLevels = ["md", "lg", "xl"];

function Gameplay() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [playerGuess, setPlayerGuess] = useState(null);
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const [gameDifficulty, setGameDifficulty] = useState("classic");
  const [expandedMapSize, setExpandedMapSize] = useState("md"); // Default expanded size
  const hoverTimeoutRef = useRef(null);
  const streetViewRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const actionGetRandomLocation = useGameStore(
    (state) => state.actionGetRandomLocation
  );
  const randomLocation = useGameStore((state) => state.randomLocation);
  const actionCalculateScore = useGameStore(
    (state) => state.actionCalculateScore
  );

  useEffect(() => {
    const setupGame = async () => {
      const roomId = location.state?.roomId;
      if (roomId) {
        try {
          const roomDetails = await getRoomDetails(roomId);
          setGameDifficulty(roomDetails.difficulty);
        } catch (error) {
          console.error("Failed to fetch room details:", error);
        }
      }
      actionGetRandomLocation();
    };
    setupGame();
  }, [actionGetRandomLocation, location.state]);

  useEffect(() => {
    if (randomLocation) {
      setCurrentLocation(randomLocation);
      setPlayerGuess(null);
    }
  }, [randomLocation]);

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

  const handleMovabilityCheck = useCallback(
    (locationData, isMovable) => {
      if (!isMovable) {
        const locationName = randomLocation?.name || "Unknown Location";
        console.warn(
          `🚩 WARNING: Location "${locationName}" is not movable.`,
          `Coordinates: { lat: ${locationData.lat}, lng: ${locationData.lng} }`,
          `Please update or remove it from your JSON list.`
        );
      }
    },
    [randomLocation]
  );

  // Handlers to control the EXPANDED map size
  const handleIncreaseMapSize = (e) => {
    e.stopPropagation(); // Prevent hover state from flickering
    const currentIndex = expandedMapSizeLevels.indexOf(expandedMapSize);
    if (currentIndex < expandedMapSizeLevels.length - 1) {
      setExpandedMapSize(expandedMapSizeLevels[currentIndex + 1]);
    }
  };

  const handleDecreaseMapSize = (e) => {
    e.stopPropagation();
    const currentIndex = expandedMapSizeLevels.indexOf(expandedMapSize);
    if (currentIndex > 0) {
      setExpandedMapSize(expandedMapSizeLevels[currentIndex - 1]);
    }
  };

  // Determine the current size classes based on hover state
  const currentContainerClass = isMapExpanded
    ? mapSizeConfig[expandedMapSize].container
    : mapSizeConfig.sm.container;
  const currentButtonClass = isMapExpanded
    ? mapSizeConfig[expandedMapSize].button
    : mapSizeConfig.sm.button;

  return (
    <div className="w-full h-full">
      <div className="relative w-full h-full overflow-hidden">
        {currentLocation ? (
          <StreetView
            ref={streetViewRef}
            position={currentLocation}
            onMovabilityCheck={handleMovabilityCheck}
            difficulty={gameDifficulty}
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
            <div className="flex items-end gap-2">
              <button className="btn btn-error btn-sm shadow-lg text-white pointer-events-auto">
                Leave
              </button>
              <button
                onClick={() => changeMap()}
                className="btn btn-neutral btn-sm shadow-lg text-white pointer-events-auto"
              >
                Change
              </button>
            </div>

            <div
              className="flex flex-col items-end space-y-2 mr-10"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div
                className={`relative overflow-hidden transition-all duration-300 ease-in-out bg-white rounded-lg shadow-xl pointer-events-auto 
                ${
                  isMapExpanded
                    ? currentContainerClass + " opacity-100"
                    : currentContainerClass + " opacity-50"
                }`}
              >
                {/* Size Control Buttons - visible only when expanded */}
                <div
                  className={`absolute top-2 left-2 z-10 flex flex-col gap-1 transition-opacity duration-300 ${
                    isMapExpanded ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <button
                    onClick={handleIncreaseMapSize}
                    disabled={expandedMapSize === "xl"}
                    className="btn btn-xs btn-circle btn-neutral disabled:opacity-50 pointer-events-auto"
                  >
                    +
                  </button>
                  <button
                    onClick={handleDecreaseMapSize}
                    disabled={expandedMapSize === "md"}
                    className="btn btn-xs btn-circle btn-neutral disabled:opacity-50 pointer-events-auto"
                  >
                    -
                  </button>
                </div>

                <div className="absolute bottom-0 right-0 w-full h-full">
                  <GuessMap onPinPlace={setPlayerGuess} />
                </div>
              </div>

              <div className="h-12">
                {!playerGuess ? (
                  <div
                    className={`h-full flex items-center justify-center bg-[rgba(0,0,0,0.5)] text-white rounded-lg text-center text-sm font-semibold p-2 pointer-events-none select-none transition-all duration-300 ease-in-out 
                    ${currentButtonClass}`}
                  >
                    PLACE YOUR PIN ON THE MAP
                  </div>
                ) : (
                  <button
                    onClick={handleGuess}
                    className={`btn btn-success pointer-events-auto transition-all duration-300 ease-in-out font-bold 
                    ${currentButtonClass}`}
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
