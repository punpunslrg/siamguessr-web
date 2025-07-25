import React, { useEffect, useState } from "react";
import CountdownTimer from "../components/TimeCountdown";

function HomePageFree() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center px-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left Section */}
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <h2 className="text-2xl font-semibold mb-2 text-white">
            No free locations left to play today!
          </h2>
          <p className="text-md font-medium mb-4 text-white">PLAY AGAIN IN</p>
          <div className="text-2xl font-bold px-6 py-2 inline-block text-black">
            <CountdownTimer />
          </div>
        </div>

        {/* Right Section - Subscription Card */}
        <div className="bg-white p-6 rounded-xl shadow-lg w-72 text-center transition duration-300 ease-in-out transform hover:scale-115 active:scale-100">
          <h3 className="text-xl font-semibold text-black">PRO BASIC</h3>
          <p className="text-2xl font-bold my-2 text-black">119 BATH / MONTH</p>
          <p className="text-xs text-gray-500 mb-4">BILLED MONTHLY</p>

          <div className="text-left space-y-3 mb-6">
            <div className="flex items-center gap-2 text-black">
              <span>🌍</span>
              <span>SINGLEPLAYER</span>
            </div>
            <div className="flex items-center gap-2 text-black">
              <span>🏆</span>
              <span>MULTIPLAYER</span>
            </div>
            <div className="flex items-center gap-2 text-black">
              <span>🤝</span>
              <span>HOST PRIVATE PARTIES</span>
            </div>
          </div>

          <button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-full cursor-pointer ">
            SUBSCRIPTION
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePageFree;
