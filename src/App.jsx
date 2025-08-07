import React, { useEffect } from "react";
import AppRouter from "./routes/AppRouter";
import { ToastContainer } from "react-toastify";
import { APIProvider } from "@vis.gl/react-google-maps";
import { fetchCsrfToken } from "./config/axios";

function App() {
  useEffect(() => {
    fetchCsrfToken();
  }, []);

  return (
    <div className="dm-sans">
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <AppRouter />
        <ToastContainer position="top-right" style={{ zIndex: 9999 }} />
      </APIProvider>
    </div>
  );
}

export default App;
