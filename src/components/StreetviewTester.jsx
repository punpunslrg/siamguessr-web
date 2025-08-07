import React, { useEffect, useRef, useState } from "react";

const StreetViewTester = ({ lat, lng }) => {
  const streetViewRef = useRef(null);
  const [available, setAvailable] = useState(null);
  const [moveable, setMoveable] = useState(null);

  useEffect(() => {
    if (!window.google || !lat || !lng) return;

    const svService = new window.google.maps.StreetViewService();
    const location = { lat: parseFloat(lat), lng: parseFloat(lng) };

    svService.getPanorama(
      { location, radius: 50 },
      (data, status) => {
        if (status === window.google.maps.StreetViewStatus.OK) {
          const panorama = new window.google.maps.StreetViewPanorama(
            streetViewRef.current,
            {
              pano: data.location.pano,
              pov: { heading: 0, pitch: 0 },
              visible: true,
            }
          );

          setAvailable(true);
          setMoveable(data.links.length > 0);
        } else {
          setAvailable(false);
          setMoveable(false);
        }
      }
    );
  }, [lat, lng]);

  return (
    <div>
      <h2>Street View Test</h2>
      <p>Lat: {lat}, Lng: {lng}</p>
      {available === null && <p>Loading...</p>}
      {available === false && <p>❌ No Street View available here.</p>}
      {available && (
        <>
          <p>✅ Street View available.</p>
          <p>{moveable ? "🟢 Moveable panorama." : "🟡 Static panorama (not moveable)."}</p>
          <div ref={streetViewRef} style={{ width: "100%", height: "400px" }} />
        </>
      )}
    </div>
  );
};

export default StreetViewTester;
