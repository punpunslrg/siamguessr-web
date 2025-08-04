import React, { useState } from "react";
import { MapPin, Users } from "lucide-react";
import SingleplayerHistory from "../components/SingleplayerHistory";
import MultiplayerHistory from "../components/MultiplayerHistory";

export default function GameHistory() {
  const [activeTab, setActiveTab] = useState("multiplayer");

  const TabButton = ({ tabName, label, icon }) => (
    <button
      onClick={() => setActiveTab(tabName)}
      className={`flex items-center justify-center w-full sm:w-auto px-4 py-3 sm:px-6 sm:py-3 font-semibold rounded-t-lg transition-all duration-300 ${
        activeTab === tabName
          ? "bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 border-b-2 border-blue-600"
          : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600"
      }`}
    >
      {icon}
      {label}
    </button>
  );

  return (
    <div className="bg-primary-full min-h-screen font-sans p-4 sm:p-8 ">
      <div className="max-w-4xl mx-auto">
        <header className="mb-6">
          <h1 className="text-5xl text-yellow-400 font-extrabold  mb-2">
            Match History
          </h1>
          <p className="text-lg  text-gray-300">
            Review your performance and your adventures.
          </p>
        </header>

        <div className="flex flex-col gap-2 sm:flex-row border-b border-gray-300  mb-[-1px]">
          <TabButton
            tabName="multiplayer"
            label="Multiplayer"
            icon={<Users className="w-5 h-5 mr-2" />}
          />
          <TabButton
            tabName="singleplayer"
            label="Singleplayer"
            icon={<MapPin className="w-5 h-5 mr-2" />}
          />
        </div>

        <main className="bg-white  p-4 sm:p-6 rounded-b-xl rounded-tr-xl shadow-lg">
          {activeTab === "singleplayer" ? (
            <SingleplayerHistory />
          ) : (
            <MultiplayerHistory />
          )}
        </main>
      </div>
    </div>
  );
}
