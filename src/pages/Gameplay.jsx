import { useEffect, useState } from "react";
import useGameStore from "../store/game-store.js";
import StreetView from "../components/StreetView.jsx";

function Gameplay() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const actionGetRandomLocation = useGameStore(
    (state) => state.actionGetRandomLocation
  );
  const randomLocation = useGameStore((state) => state.randomLocation);
  console.log(randomLocation);

  useEffect(() => {
    if (randomLocation) {
      setCurrentLocation(randomLocation);
    }
  }, [randomLocation]);

  useEffect(() => {
    actionGetRandomLocation();
  }, [actionGetRandomLocation]);

  const changeMap = async () => {
    await actionGetRandomLocation();
  };

  return (
    <div>
      <div className="relative w-screen h-screen overflow-hidden">
        {currentLocation ? (
          <StreetView position={currentLocation} />
        ) : (
          <div className="text-white text-center">Loading Location...</div>
        )}

        {/* This is the main overlay. It gets 'pointer-events-none' 
        to let clicks pass through to the Street View below.
      */}
        <div className="absolute inset-0 flex flex-col justify-between p-4 md:p-8 z-10 pointer-events-none">
          {/* TOP SECTION */}
          <div className="flex justify-center">
            <div className="bg-blue-800 text-white px-6 py-2 rounded-full shadow-lg text-lg font-bold">
              01:23
            </div>
          </div>

          <div className="flex-grow"></div>

          {/* BOTTOM SECTION */}
          <div className="flex justify-between items-end">
            {/* We turn clicks back on for EACH button */}
            <button className="btn btn-error btn-sm shadow-lg text-white pointer-events-auto">
              Leave
            </button>
            <button
              onClick={() => changeMap()}
              className="btn btn-neutral btn-sm shadow-lg text-white pointer-events-auto"
            >
              change
            </button>

            <div className="flex flex-col items-end space-y-2">
              {/* And we turn clicks back on for the mini-map container */}
              <div className="bg-white w-64 h-40 border-2 border-gray-300 shadow-xl overflow-hidden pointer-events-auto">
                <img
                  src="https://cdn.britannica.com/50/4050-050-F7660A68/Thailand-map-features-locator.jpg?w=400&h=225&c=crop"
                  alt="Mini map"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-gray-700 text-white px-4 py-2 rounded-md text-sm shadow-md">
                PLACE YOUR PIN ON THE MAP
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Gameplay;
