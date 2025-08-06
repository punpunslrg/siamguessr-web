import { Navigate, Route, Routes } from "react-router";
import Home from "../pages/Home";
import Layout from "../layouts/Layout";
import Gameplay from "../pages/Gameplay";
import Login from "../pages/Login";
import Register from "../pages/Register";
import HomePageFree from "../pages/HomePageForFree";
import Subscription from "../pages/Subscription";
import Profile from "../pages/Profile";
import Lobby from "../pages/Lobby";
import GameMode from "../pages/GameMode";
import RoundScore from "../pages/RoundScore.jsx";
import AdminLayout from "../layouts/AdminLayout";
import LoginAdmin from "../pages/admin/LoginAdmin";
import Leaderboard from "../pages/LeaderBoard";
import GameBreakdown from "../pages/GameBreakdown";
import HomePageForSub from "../pages/HomePageForSub";
import ProtectRoute from "./ProtectRoute";
import GameHistory from "../pages/GameHistory";
import CalculatePoints from "../pages/CalculatePoints";
import SingleScore from "../pages/SingleScore";
import LayoutWithoutNav from "../layouts/LayoutWithoutNav";
import Dashboard from "../pages/admin/Dashboard";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/homepagefree" element={<HomePageFree />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/lobby/:roomId" element={<Lobby />} />
        <Route path="/gamemode" element={<GameMode />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/gamebreakdown" element={<GameBreakdown />} />
        <Route path="/homepageforsub" element={<HomePageForSub />} />
        <Route path="/gamehistory" element={<GameHistory />} />
        <Route path="/calculatepoints" element={<CalculatePoints />} />
        <Route path="/singlescore" element={<SingleScore />} />
      </Route>

      <Route path="/" element={<LayoutWithoutNav />}>
        <Route path="/gameplay" element={<Gameplay />} />
        <Route path="/round" element={<RoundScore />} />
      </Route>

      <Route path="/admin/login" element={<LoginAdmin />} />

      <Route
        path="/admin"
        element={<ProtectRoute el={<AdminLayout />} allows={["admin"]} />}
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}
export default AppRouter;
