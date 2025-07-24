import { useState } from "react";
import { Map, AdvancedMarker } from "@vis.gl/react-google-maps";

const mapStyles = [
  {
    featureType: "poi",
    elementType: "labels.icon",
    stylers: [{ visibility: "off" }],
  },
];

function GuessMap({ onPinPlace }) {
  const [pinPosition, setPinPosition] = useState(null);

  const handleMapClick = (event) => {
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
      gestureHandling={"greedy"}
      disableDefaultUI={true}
      // styles={mapStyles}
      // Map id
      mapId="113d733319c2cd6257310524" // e.g., "113d733319c2cd6257310524"
    >
      {pinPosition && <AdvancedMarker position={pinPosition} />}
    </Map>
  );
}

export default GuessMap;
