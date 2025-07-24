import { Route, Routes } from "react-router";
import Home from "../pages/Home";
import Layout from "../layouts/Layout";
import Gameplay from "../pages/Gameplay";
import Login from "../pages/Login";
import Register from "../pages/Register";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="gameplay" element={<Gameplay />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
}
export default AppRouter;
