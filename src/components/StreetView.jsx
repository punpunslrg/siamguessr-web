import { useEffect, useRef } from "react";
import { useApiIsLoaded } from "@vis.gl/react-google-maps";

function StreetView({ position }) {
  const panoramaRef = useRef(null);
  const isLoaded = useApiIsLoaded();

  useEffect(() => {
    if (isLoaded && panoramaRef.current && position) {
      const streetViewService = new window.google.maps.StreetViewService();

      // Ask Google for the panorama data at the given position
      streetViewService.getPanorama({ location: position, radius: 50 }, (data, status) => {
        if (status === "OK") {
          // If the official panorama is on a road, create the Street View
          new window.google.maps.StreetViewPanorama(panoramaRef.current, {
            position: data.location.latLng, // Use the official, road-snapped position
            pov: { heading: 34, pitch: 10 },
            disableDefaultUI: false,
            clickToGo: true,
            showRoadLabels: false,
          });
        } else {
          // Handle the case where no Street View is found at all
          console.error("Street View data not found for this location.");
        }
      });
    }
  }, [isLoaded, position]);

  return <div ref={panoramaRef} className="absolute inset-0 w-full h-full" />;
}

export default StreetView;