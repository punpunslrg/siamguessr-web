import { useState } from "react";
import { Map, AdvancedMarker, useMap } from "@vis.gl/react-google-maps";

function GuessMap({ onPinPlace }) {
  const [pinPosition, setPinPosition] = useState(null);

  const handleMapClick = (event) => {
    if (event.placeId) {
      event.stop();
    }

    const newPosition = {
      lat: event.detail.latLng.lat,
      lng: event.detail.latLng.lng,
    };
    setPinPosition(newPosition);
    onPinPlace(newPosition);
  };

  return (
    <Map
      defaultCenter={{ lat: 13.75, lng: 100.5 }}
      defaultZoom={5}
      onClick={handleMapClick}
      gestureHandling="greedy"
      disableDefaultUI={true}
      mapId="113d733319c2cd6257310524"
      options={{
        clickableIcons: false,
        styles: [
          {
            featureType: "poi",
            stylers: [{ visibility: "off" }],
          },
        ],
      }}
    >
      {pinPosition && <AdvancedMarker position={pinPosition} />}
    </Map>
  );
}

export default GuessMap;
