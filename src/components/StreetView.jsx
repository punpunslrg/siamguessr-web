import { useEffect, useRef, useState } from "react";
import { useApiIsLoaded } from "@vis.gl/react-google-maps";

function StreetView({ position }) {
  const panoramaRef = useRef(null);
  const isLoaded = useApiIsLoaded();
  const [panorama, setPanorama] = useState(null);

  // This effect runs ONCE to create the StreetView object
  useEffect(() => {
    if (isLoaded && panoramaRef.current) {
      const panoramaInstance = new window.google.maps.StreetViewPanorama(
        panoramaRef.current
      );

      // Listener for loading status
      panoramaInstance.addListener("status_changed", () => {
        if (panoramaInstance.getStatus() !== "OK") {
          console.error(
            "Street View status is not OK:",
            panoramaInstance.getStatus()
          );
        } else {
          console.log("Street View status is OK.");
        }
      });

      // This listener checks for navigation links.
      panoramaInstance.addListener("links_changed", () => {
        const links = panoramaInstance.getLinks();
        if (links && links.length > 0) {
          console.log("This location IS MOVABLE.");
        } else {
          console.log(
            "This location IS NOT MOVABLE (it's a dead end or photosphere).", links
          );
        }
      });

      setPanorama(panoramaInstance);
    }
  }, [isLoaded]);

  // This effect runs whenever the 'position' prop changes
  useEffect(() => {
    if (panorama && position) {
      panorama.setOptions({
        position: position,
        radius: 50,
        source: window.google.maps.StreetViewSource.OUTDOOR,
        disableDefaultUI: false,
        clickToGo: true,
        showRoadLabels: false,
        addressControl: false,
      });
    }
  }, [panorama, position]);

  return <div ref={panoramaRef} className="absolute inset-0 w-full h-full" />;
}

export default StreetView;
