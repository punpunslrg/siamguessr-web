import React from "react";
import AppRouter from "./routes/AppRouter";
import { APIProvider } from "@vis.gl/react-google-maps";

function App() {
  return (
    <APIProvider apiKey="AIzaSyCUgweKR0PyiDRD0gIOpIYnqfQiQjiQccM">
      <AppRouter />
    </APIProvider>
  );
}

export default App;
