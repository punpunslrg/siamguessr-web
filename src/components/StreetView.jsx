import { useEffect, useRef, useState, useImperativeHandle, forwardRef } from "react";
import { useApiIsLoaded } from "@vis.gl/react-google-maps";

// Wrap the component in forwardRef to pass the ref from Gameplay
const StreetView = forwardRef(({ position, onMovabilityCheck, difficulty = "classic" }, ref) => {
  const panoramaRef = useRef(null);
  const isLoaded = useApiIsLoaded();
  const [panorama, setPanorama] = useState(null);
  const startLocationRef = useRef(null); // Ref to store the initial location data

  // Expose a 'returnToStart' function to the parent component (Gameplay)
  useImperativeHandle(ref, () => ({
    returnToStart() {
      if (panorama && startLocationRef.current) {
        panorama.setPosition(startLocationRef.current.position);
        panorama.setPov(startLocationRef.current.pov);
      }
    },
  }));

  // This effect runs ONCE to create the StreetView object
  useEffect(() => {
    let panoramaInstance = null;
    if (isLoaded && panoramaRef.current) {
      panoramaInstance = new window.google.maps.StreetViewPanorama(
        panoramaRef.current
      );

      panoramaInstance.addListener("status_changed", () => {
        if (panoramaInstance.getStatus() === "OK") {
          // When a new panorama loads successfully, store its initial state
          startLocationRef.current = {
            position: panoramaInstance.getPosition(),
            pov: panoramaInstance.getPov(),
          };
        } else {
          console.error("Street View status is not OK:", panoramaInstance.getStatus());
        }
      });

      panoramaInstance.addListener("links_changed", () => {
        const links = panoramaInstance.getLinks();
        if (onMovabilityCheck) {
          onMovabilityCheck(
            panoramaInstance.getPosition().toJSON(),
            links && links.length > 0
          );
        }
      });

      setPanorama(panoramaInstance);
    }

    // Cleanup function
    return () => {
      if (panoramaInstance) {
        window.google.maps.event.clearInstanceListeners(panoramaInstance);
      }
    };
  }, [isLoaded, onMovabilityCheck]);

  // This effect runs whenever the 'position' or 'difficulty' prop changes
  useEffect(() => {
    if (panorama && position) {
      const isChallengeMode = difficulty === "challenge";

      panorama.setOptions({
        // --- Essential Location Properties ---
        position: position,
        radius: 50,
        source: window.google.maps.StreetViewSource.OUTDOOR,

        // --- GeoGuessr-style UI & Functionality based on Difficulty ---
        panControl: true,
        zoomControl: !isChallengeMode,
        addressControl: false,
        fullscreenControl: true,
        linksControl: !isChallengeMode,
        showRoadLabels: false, 

        // --- Disable functionality based on difficulty ---
        clickToGo: !isChallengeMode,
        scrollwheel: !isChallengeMode,
        keyboardShortcuts: !isChallengeMode,
      });
    }
  }, [panorama, position, difficulty]);

  return <div ref={panoramaRef} className="absolute inset-0 w-full h-full" />;
});

export default StreetView;
