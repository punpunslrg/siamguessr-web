import { useEffect, useState, useRef, useCallback } from "react";
import useGameStore from "../stores/game-store.js";
import StreetView from "../components/StreetView.jsx";
import GuessMap from "../components/GuessMap.jsx";
import { useNavigate } from "react-router";

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
  const [playerGuess, setPlayerGuess] = useState(null);
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const [expandedMapSize, setExpandedMapSize] = useState("md");
  const hoverTimeoutRef = useRef(null);
  const streetViewRef = useRef(null);
  const navigate = useNavigate();

  // --- New Store Integration ---
  const room = useGameStore((state) => state.room);
  const currentRoundIndex = useGameStore((state) => state.currentRoundIndex);
  const actionStartNewGame = useGameStore((state) => state.actionStartNewGame);
  const actionSubmitGuess = useGameStore((state) => state.actionSubmitGuess);

  // Derive the current round and location from the store's state
  const currentRound = room?.rounds?.[currentRoundIndex];
  const currentLocation = currentRound?.location;

  // This effect runs once to start the game with the mock data
  useEffect(() => {
    const initGame = async () => {
      if (!room) {
        await actionStartNewGame();
      }
    };
    initGame();
  }, [room, actionStartNewGame]);

  console.log(room);
  // Effect to reset the player's guess when the round changes
  useEffect(() => {
    setPlayerGuess(null);
  }, [currentRoundIndex]);

  const handleGuess = () => {
    if (!playerGuess) {
      actionSubmitGuess(null); // Optional: handle skipped round
    } else {
      console.log(playerGuess)
      actionSubmitGuess(playerGuess);
    }
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
  const handleIncreaseMapSize = (e) => {
    e.stopPropagation();
    const i = expandedMapSizeLevels.indexOf(expandedMapSize);
    if (i < expandedMapSizeLevels.length - 1)
      setExpandedMapSize(expandedMapSizeLevels[i + 1]);
  };
  const handleDecreaseMapSize = (e) => {
    e.stopPropagation();
    const i = expandedMapSizeLevels.indexOf(expandedMapSize);
    if (i > 0) setExpandedMapSize(expandedMapSizeLevels[i - 1]);
  };

  const handleMovabilityCheck = useCallback(() => {}, []);

  const currentContainerClass = isMapExpanded
    ? mapSizeConfig[expandedMapSize].container
    : mapSizeConfig.sm.container;
  const currentButtonClass = isMapExpanded
    ? mapSizeConfig[expandedMapSize].button
    : mapSizeConfig.sm.button;

  return (
    <div className="w-screen h-screen">
      <div className="relative w-full h-full overflow-hidden">
        {currentLocation ? (
          <StreetView
            ref={streetViewRef}
            position={{
              lat: parseFloat(currentLocation.lat),
              lng: parseFloat(currentLocation.lng),
            }}
            onMovabilityCheck={handleMovabilityCheck}
            difficulty={room?.difficulty || "classic"}
          />
        ) : (
          <div className="text-white text-center">Loading Location...</div>
        )}

        <div className="absolute inset-0 flex flex-col justify-between p-4 md:p-8 z-10 pointer-events-none">
          <div className="absolute top-4 right-16 bg-blue-800 text-white px-4 py-2 rounded-full shadow-lg text-sm font-bold z-10">
            Round {currentRoundIndex + 1} / {room?.rounds?.length || 5}
          </div>

          {/* Timer centered at top */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-blue-800 text-white px-6 py-2 rounded-full shadow-lg text-xl font-bold z-10">
            {/* <span
              className={`${
                timeLeft < 10 ? "text-red-500" : "text-yellow-300"
              }`}
            >
              {formatTime(timeLeft)}
            </span> */}
          </div>

          <div className="flex-grow"></div>

          <div className="flex justify-between items-end -mb-2">
            <div className="flex items-end gap-2">
              <button className="btn btn-error btn-sm shadow-lg text-white pointer-events-auto">
                Leave
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
