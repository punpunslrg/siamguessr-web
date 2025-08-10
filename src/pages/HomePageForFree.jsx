import React, { useEffect, useState } from "react";
import CountdownTimer from "../components/TimeCountdown";
import useUserStore from "../stores/userStore";
import { useLocation, useParams } from "react-router";
import { Link } from "react-router";
import { MapPin } from "lucide-react";

function HomePageFree() {
  const location = useLocation();
  // const token = new URLSearchParams(location.search).get('token')
  const token = useUserStore((state) => state.token);
  const setToken = useUserStore((state) => state.setToken);
  const fetchUser = useUserStore((state) => state.fetchUser);

  useEffect(() => {
    if (token) {
      setToken(token);
      // ใช้ setTimeout เพื่อให้ token ถูก set ก่อน
      setTimeout(() => {
        fetchUser();
      }, 100);
    }
  }, [token, setToken, fetchUser]);

  const user = useUserStore((state) => state.user);

  return (
    <div className="bg-primary  flex items-center justify-center">
      <div className="flex flex-col md:flex-row items-center justify-between gap-32">
        {/* Left Section */}
        <div className="text-center flex flex-col justify-center items-center gap-6">
          <div className="text-7xl mb-4">⏳</div>
          {/* <MapPin className="text-red-500 font-bold size-32" /> */}
          <div className="text-white flex flex-col justify-center items-center text-shadow-lg bg-white/10 text-shadow-black mt-2 text-3xl font-extrabold backdrop-blur-xs p-6 rounded-2xl ">
            <h2 className="text-4xl text-white font-bold mb-2 ">
              {/* You got 3 free games left <br />
              to play today! */}
              No free games left to play today!
            </h2>
          </div>
          <div className="text-2xl font-bold px-6 py-2 inline-block text-black">
            <CountdownTimer />
            {/* <Link to="/gamemode">
              <button
                className="btn-primary px-18 py-3 text-xl shadow-lg"
              >
                PLAY
              </button>
            </Link> */}
          </div>
        </div>

        {/* Right Section - Subscription Card */}
        <div className="bg-card-subscription">
          <h3 className="text-xl font-semibold text-black">PRO BASIC</h3>
          <p className="text-2xl font-bold my-2 text-black">119 BATH / MONTH</p>
          <p className="text-xs text-gray-500 mb-4">BILLED MONTHLY</p>

          <div className="text-left space-y-3 mb-14">
            <div className="flex items-center gap-2 text-black mb-4">
              <span>🌍</span>
              <span>SINGLEPLAYER</span>
            </div>
            <div className="flex items-center gap-2 text-black mb-4">
              <span>🏆</span>
              <span>MULTIPLAYER</span>
            </div>
            <div className="flex items-center gap-2 text-black">
              <span>🤝</span>
              <span>HOST PRIVATE PARTIES</span>
            </div>
          </div>

          <button className="btn-secondary ">
            <Link to="/subscription">Subscription</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePageFree;
