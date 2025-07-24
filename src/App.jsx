import React from "react";
import AppRouter from "./routes/AppRouter";
import { ToastContainer } from "react-toastify";
import { APIProvider } from "@vis.gl/react-google-maps";

function App() {
  return (
    <APIProvider apiKey="AIzaSyCUgweKR0PyiDRD0gIOpIYnqfQiQjiQccM">
      <AppRouter />
      <ToastContainer position="top-right" style={{ zIndex: 9999 }} />
    </APIProvider>
  );
}

export default App;
