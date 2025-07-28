import { Navigate, Route, Routes } from "react-router";
import Home from "../pages/Home";
import Layout from "../layouts/Layout";
import Gameplay from "../pages/Gameplay";
import Login from "../pages/Login";
import Register from "../pages/Register";
import GeoRound from "../pages/CalculatePoints";
import HomePageFree from "../pages/HomePageForFree";
import Subscription from "../pages/Subscription";
import Profile from "../pages/Profile";
import Lobby from "../pages/Lobby";
import GameMode from "../pages/GameMode";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import LoginAdmin from "../pages/admin/LoginAdmin";
import ProtectRoute from "./ProtectRoute";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/round" element={<GeoRound />} />
        <Route path="/homepagefree" element={<HomePageFree />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/lobby" element={<Lobby />} />
        <Route path="/gameplay" element={<Gameplay />} />
        <Route path="/gamemode" element={<GameMode />} />
      </Route>

      <Route path="/admin/login" element={<LoginAdmin />} />

      <Route path="/admin" element={<ProtectRoute el={<AdminLayout />} allows={["admin"]} />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}
export default AppRouter;
