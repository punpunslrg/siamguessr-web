import { Route, Routes } from "react-router";
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
    </Routes>
  );
}
export default AppRouter;
