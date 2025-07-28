import React from "react";
import AppRouter from "./routes/AppRouter";
import { ToastContainer } from "react-toastify";
import { APIProvider } from "@vis.gl/react-google-maps";

function App() {
  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <AppRouter />
      <ToastContainer position="top-right" style={{ zIndex: 9999 }} />
    </APIProvider>
  );
}

export default App;
