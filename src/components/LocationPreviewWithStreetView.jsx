import { useState, useRef, useEffect } from "react";

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

function loadGoogleMapsScript(apiKey) {
  return new Promise((resolve, reject) => {
    if (window.google && window.google.maps) {
      resolve();
      return;
    }

    const existingScript = document.querySelector(
      `script[src*="maps.googleapis.com/maps/api/js"]`
    );
    if (existingScript) {
      existingScript.addEventListener("load", resolve);
      existingScript.addEventListener("error", reject);
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () =>
      reject(new Error("Google Maps script failed to load"));
    document.head.appendChild(script);
  });
}

export default function LocationPreviewWithStreetView() {
  const [inputLat, setInputLat] = useState("");
  const [inputLng, setInputLng] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const streetViewRef = useRef(null);
  const panoramaRef = useRef(null);
  const serviceRef = useRef(null);

  useEffect(() => {
    if (!lat || !lng) return;

    loadGoogleMapsScript(apiKey)
      .then(() => {
        if (!window.google) return;

        const position = {
          lat: parseFloat(lat),
          lng: parseFloat(lng),
        };

        if (!serviceRef.current) {
          serviceRef.current = new window.google.maps.StreetViewService();
        }

        serviceRef.current.getPanorama(
          { location: position, radius: 50 },
          (data, status) => {
            if (status === window.google.maps.StreetViewStatus.OK) {
              if (!panoramaRef.current) {
                panoramaRef.current = new window.google.maps.StreetViewPanorama(
                  streetViewRef.current,
                  {
                    position,
                    pov: { heading: 165, pitch: 0 },
                    visible: true,
                    zoom: 1,
                    panControl: true,
                    enableCloseButton: false,
                  }
                );
              } else {
                panoramaRef.current.setPosition(position);
                panoramaRef.current.setVisible(true);
              }
            } else {
              if (panoramaRef.current) {
                panoramaRef.current.setVisible(false);
              }
              alert("No Street View available at this location.");
            }
          }
        );
      })
      .catch((err) => {
        console.error("Google Maps failed to load:", err);
      });
  }, [lat, lng]);

  const handleConfirm = () => {
    setLat(inputLat);
    setLng(inputLng);
  };

  return (
    <div className="p-4 space-y-6 max-w-4xl mx-auto">
      <div className="flex gap-4">
        <input
          type="number"
          step="0.0001"
          placeholder="Latitude"
          value={inputLat}
          onChange={(e) => setInputLat(e.target.value)}
          className="border p-2 rounded flex-grow"
        />
        <input
          type="number"
          step="0.0001"
          placeholder="Longitude"
          value={inputLng}
          onChange={(e) => setInputLng(e.target.value)}
          className="border p-2 rounded flex-grow"
        />
        <button
          onClick={handleConfirm}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Confirm
        </button>
      </div>

      {lat && lng && (
        <div className="flex gap-4">
          <iframe
            title="Map Preview"
            width="50%"
            height="400"
            loading="lazy"
            allowFullScreen
            style={{ borderRadius: "8px" }}
            src={`https://www.google.com/maps/embed/v1/view?key=${apiKey}&center=${lat},${lng}&zoom=17&maptype=satellite`}
          />
          <div
            ref={streetViewRef}
            style={{
              width: "100%",
              height: "800px",
              borderRadius: "8px",
              backgroundColor: "#eee",
            }}
          />
        </div>
      )}
    </div>
  );
}
