import { useEffect } from "react";
import { AdvancedMarker, useMap } from "@vis.gl/react-google-maps";

function ResultsMap({ actualLocation, guessLocation }) {
  const map = useMap();

  // Fit bounds to include actualLocation and guessLocation if available
  useEffect(() => {
    if (!map || !actualLocation) return;

    const bounds = new window.google.maps.LatLngBounds();
    bounds.extend(new window.google.maps.LatLng(actualLocation));

    if (guessLocation) {
      bounds.extend(new window.google.maps.LatLng(guessLocation));
    } else {
      const offset = 0.004; // tweak this value for more or less zoom out
      bounds.extend({
        lat: actualLocation.lat + offset,
        lng: actualLocation.lng + offset,
      });
      bounds.extend({
        lat: actualLocation.lat - offset,
        lng: actualLocation.lng - offset,
      });
    }

    map.fitBounds(bounds, 100);
  }, [map, actualLocation, guessLocation]);

  // Draw polyline only if guessLocation exists
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

  // Show loading only if actualLocation missing (which should not happen)
  if (!actualLocation) {
    return <div className="w-full h-full bg-gray-300">Loading map...</div>;
  }

  return (
    <>
      {/* Always show Actual Location marker */}
      <AdvancedMarker position={actualLocation} title="Actual Location" />

      {/* Show Guess marker only if guessLocation exists */}
      {guessLocation && (
        <AdvancedMarker position={guessLocation} title="Your Guess">
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
      )}
    </>
  );
}

export default ResultsMap;
