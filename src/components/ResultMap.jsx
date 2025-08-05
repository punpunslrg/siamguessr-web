import { useEffect } from "react";
import { AdvancedMarker, useMap } from "@vis.gl/react-google-maps";
import useGameStore from "../stores/game-store.js";
import useUserStore from "../stores/userStore.js";

function ResultsMap({ actualLocation, allGuesses = [] }) {
  const map = useMap();
  const room = useGameStore((state) => state.room);
  const user = useUserStore((state) => state.user);

  const validGuesses = allGuesses.filter(
    (guess) => guess.guessedLat !== null && guess.guessedLng !== null
  );

  // Fit bounds to include actual location and only valid guesses
  useEffect(() => {
    if (!map || !actualLocation) return;

    if (validGuesses.length === 0) {
      // If no guesses, just center and zoom out a bit
      map.setCenter(actualLocation);
      map.setZoom(8);
      return;
    }

    const bounds = new window.google.maps.LatLngBounds();
    bounds.extend(new window.google.maps.LatLng(actualLocation));

    validGuesses.forEach((guess) => {
      bounds.extend(
        new window.google.maps.LatLng({
          lat: parseFloat(guess.guessedLat),
          lng: parseFloat(guess.guessedLng),
        })
      );
    });

    map.fitBounds(bounds, 100);
  }, [map, actualLocation, validGuesses]);

  // Draw dashed lines from each guess to actual location
  useEffect(() => {
    if (!map || !actualLocation || validGuesses.length === 0) return;

    const polylines = validGuesses.map((guess) => {
      const isCurrentUser = guess.userId === user.id;
      const path = [
        actualLocation,
        {
          lat: parseFloat(guess.guessedLat),
          lng: parseFloat(guess.guessedLng),
        },
      ];

      const polyline = new window.google.maps.Polyline({
        path,
        strokeOpacity: 0,
        strokeWeight: isCurrentUser ? 4 : 2,
        icons: [
          {
            icon: {
              path: "M 0,-1 0,1",
              strokeOpacity: 1,
              scale: 4,
              strokeWeight: isCurrentUser ? 4 : 2,
            },
            offset: "0",
            repeat: "17px",
          },
        ],
        strokeColor: "#FF0000",
      });

      polyline.setMap(map);
      return polyline;
    });

    return () => {
      polylines.forEach((p) => p.setMap(null));
    };
  }, [map, actualLocation, validGuesses, user.id]);

  if (!actualLocation) {
    return <div className="w-full h-full bg-gray-300">Loading map...</div>;
  }

  return (
    <>
      {/* Marker for actual location */}
      <AdvancedMarker position={actualLocation} title="Actual Location" />

      {/* Markers for valid guesses only */}
      {validGuesses.map((guess) => {
        const position = {
          lat: parseFloat(guess.guessedLat),
          lng: parseFloat(guess.guessedLng),
        };

        const matchedUser = room?.players?.find(
          (player) => player.userId === guess.userId
        );
        const userImage = matchedUser?.user.image;

        return (
          <AdvancedMarker
            key={guess.userId}
            position={position}
            title={`Guess by ${guess.userId}`}
          >
            {userImage ? (
              <img
                src={userImage}
                alt={`Guess by ${guess.userId}`}
                className="w-10 h-10 rounded-full border-2 border-white shadow-md"
              />
            ) : (
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
            )}
          </AdvancedMarker>
        );
      })}
    </>
  );
}

export default ResultsMap;
