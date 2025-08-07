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
import TestLatLng from "../pages/TestLatLng.jsx";
import LayoutWithoutNav from "../layouts/LayoutWithoutNav";
import Dashboard from "../pages/admin/Dashboard";
import SuccessPage from "../pages/payment/SuccessPage";
import CanceledPage from "../pages/payment/CanceledPage";
import GameLayout from "../layouts/GameLayout.jsx";
import SelectMode from "../pages/SelectMode";
import Guidebook from "../pages/Guidebook";
import AboutUs from "../pages/AboutUs";

function AppRouter() {
  return (
    <Routes>
      {/* --- Group 1: Public Routes --- */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* --- Group 2: Protected Routes ที่ใช้ Layout ปกติ --- */}
      <Route element={<ProtectRoute allows={["user", "admin"]} redirectPath="/login" />}>
        <Route path="/" element={<Layout />}>
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/gamemode" element={<GameMode />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/gamebreakdown" element={<GameBreakdown />} />
          <Route path="/homepageforsub" element={<HomePageForSub />} />
          <Route path="/gamehistory" element={<GameHistory />} />
          <Route path="/calculatepoints" element={<CalculatePoints />} />
          <Route path="/singlescore" element={<SingleScore />} />
        <Route path="/selectmode" element={<SelectMode />} />
        <Route path="/lobby/:roomId" element={<GameLayout><Lobby /></GameLayout>} />
        <Route path="/homepagefree" element={<HomePageFree />} />
        <Route path="/guidebook" element={<Guidebook />} />
        <Route path="/aboutus" element={<AboutUs />} />
        </Route>

        {/* only for testing lat lng */}
        <Route path="/test" element={<TestLatLng />} />
      </Route>

      {/* --- Group 3: Protected Routes ที่ใช้ Layout พิเศษ (ไม่มี Nav) --- */}
      <Route
        element={
          <ProtectRoute allows={["user", "admin"]} redirectPath="/login" />
        }
      >
        <Route path="/" element={<LayoutWithoutNav />}>
          <Route path="/gameplay" element={<Gameplay />} />
          <Route path="/round" element={<RoundScore />} />
        </Route>
      </Route>

      {/* --- Group 4: Standalone Routes --- */}
      <Route path="/success" element={<SuccessPage />} />
      <Route path="/canceled" element={<CanceledPage />} />

      {/* --- Group 5: Admin Routes --- */}
      <Route path="/admin/login" element={<LoginAdmin />} />
      <Route
        path="/admin"
        element={
          <ProtectRoute allows={["admin"]} redirectPath="/admin/login" />
        }
      >
        <Route element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRouter;
