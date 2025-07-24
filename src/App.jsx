import React from "react";
import AppRouter from "./routes/AppRouter";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
    <AppRouter />
    <ToastContainer position="top-right" style={{ zIndex: 9999}} />
    </>
  )
}

export default App;
