import React, { useState } from "react";
import LocationPreviewWithStreetView from "../components/LocationPreviewWithStreetView.jsx";
import StreetViewTester from "../components/StreetviewTester.jsx";
import StreetViewChecker from "../components/StreetViewChecker.jsx";

function TestLatLng() {
  const [lat, setLat] = useState("13.7563");
  const [lng, setLng] = useState("100.5018");
  return (
    <div className="h-screen">
      <LocationPreviewWithStreetView />
      <StreetViewChecker />
    </div>
  );
}

export default TestLatLng;
