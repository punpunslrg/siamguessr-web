import { Route, Routes } from "react-router";
import Home from "../pages/Home";
import Layout from "../layouts/Layout";
import GeoRound from "../pages/CalculatePoints";
import HomePageFree from "../pages/HomePageForFree";
import Subscription from "../pages/Subscription";
import Profile from "../pages/Profile";
import Lobby from "../pages/Lobby";
import Gameplay from "../pages/Gameplay";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/round" element={<GeoRound />} />
        <Route path="/homepagefree" element={<HomePageFree />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/Lobby" element={<Lobby />} />
        <Route path="gameplay" element={<Gameplay />} />
      </Route>
    </Routes>
  );
}
export default AppRouter;
