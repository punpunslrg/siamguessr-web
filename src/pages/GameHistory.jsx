import React, { useState } from "react";
import {
  MapPin,
  Trophy,
  Calendar,
  Swords,
  Users,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

// --- Mock Data (English) ---
const mockSingleplayerData = [
  { id: 1, mapName: "A Diverse World", score: 23450, date: "Jul 28, 2025" },
  { id: 2, mapName: "Famous Places", score: 19870, date: "Jul 27, 2025" },
  { id: 3, mapName: "I Saw The Sign", score: 24990, date: "Jul 27, 2025" },
  { id: 4, mapName: "United States", score: 21500, date: "Jul 25, 2025" },
  { id: 5, mapName: "Japanese Landmarks", score: 18230, date: "Jul 24, 2025" },
];

const mockMultiplayerData = [
  {
    id: 1,
    mode: "Duels",
    result: "Victory",
    opponent: "GeoWizard99",
    rankChange: "+15",
    date: "Jul 29, 2025",
  },
  {
    id: 2,
    mode: "Battle Royale",
    result: "3rd Place",
    opponent: "9 Players",
    rankChange: "+5",
    date: "Jul 29, 2025",
  },
  {
    id: 3,
    mode: "Duels",
    result: "Defeat",
    opponent: "MapMaster",
    rankChange: "-12",
    date: "Jul 28, 2025",
  },
  {
    id: 4,
    mode: "Team Duels",
    result: "Victory",
    opponent: "Team Explorers",
    rankChange: "+20",
    date: "Jul 26, 2025",
  },
  {
    id: 5,
    mode: "Country Streak",
    result: "12 Streak",
    opponent: "-",
    rankChange: "+8",
    date: "Jul 25, 2025",
  },
];

// --- History Card Component ---
const HistoryCard = ({ children }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg w-full">
    <div className="p-5">{children}</div>
  </div>
);

const InfoLine = ({ icon, label, value, valueClassName = "" }) => (
  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
    {icon}
    <span className="font-semibold mr-2">{label}:</span>
    <span className={`flex-1 text-right ${valueClassName}`}>{value}</span>
  </div>
);

// --- Singleplayer History Component ---
const SingleplayerHistory = () => (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
      Singleplayer History
    </h2>
    {mockSingleplayerData.map((game) => (
      <HistoryCard key={game.id}>
        <div className="flex flex-col sm:flex-row justify-between sm:items-center">
          <div className="flex-grow mb-4 sm:mb-0">
            <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400">
              {game.mapName}
            </h3>
            <InfoLine
              icon={<Trophy className="w-4 h-4 mr-2 text-yellow-500" />}
              label="Score"
              value={game.score.toLocaleString()}
              valueClassName="font-bold text-gray-800 dark:text-white"
            />
            <InfoLine
              icon={<Calendar className="w-4 h-4 mr-2 text-gray-500" />}
              label="Date"
              value={game.date}
            />
          </div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 w-full sm:w-auto">
            View Details
          </button>
        </div>
      </HistoryCard>
    ))}
  </div>
);

// --- Multiplayer History Component ---
const MultiplayerHistory = () => (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
      Multiplayer History
    </h2>
    {mockMultiplayerData.map((game) => {
      const isVictory = game.result === "Victory";
      const isDefeat = game.result === "Defeat";
      const rankChangePositive = game.rankChange.startsWith("+");

      return (
        <HistoryCard key={game.id}>
          <div className="flex flex-col sm:flex-row justify-between sm:items-center">
            <div className="flex-grow mb-4 sm:mb-0">
              <div className="flex items-center mb-2">
                <span
                  className={`text-lg font-bold ${
                    isVictory
                      ? "text-green-500"
                      : isDefeat
                      ? "text-red-500"
                      : "text-yellow-500"
                  }`}
                >
                  {game.result}
                </span>
                <span className="mx-2 text-gray-400 dark:text-gray-600">|</span>
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  {game.mode}
                </span>
              </div>

              <InfoLine
                icon={
                  game.mode === "Duels" || game.mode === "Team Duels" ? (
                    <Swords className="w-4 h-4 mr-2 text-gray-500" />
                  ) : (
                    <Users className="w-4 h-4 mr-2 text-gray-500" />
                  )
                }
                label={game.mode === "Duels" ? "Opponent" : "Players"}
                value={game.opponent}
              />
              <InfoLine
                icon={
                  rankChangePositive ? (
                    <TrendingUp className="w-4 h-4 mr-2 text-green-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 mr-2 text-red-500" />
                  )
                }
                label="Rank"
                value={game.rankChange}
                valueClassName={
                  rankChangePositive
                    ? "text-green-500 font-bold"
                    : "text-red-500 font-bold"
                }
              />
              <InfoLine
                icon={<Calendar className="w-4 h-4 mr-2 text-gray-500" />}
                label="Date"
                value={game.date}
              />
            </div>
            <button
              className={`font-bold py-2 px-4 rounded-lg transition-colors duration-300 w-full sm:w-auto ${
                isVictory
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : isDefeat
                  ? "bg-red-500 hover:bg-red-600 text-white"
                  : "bg-gray-500 hover:bg-gray-600 text-white"
              }`}
            >
              View Details
            </button>
          </div>
        </HistoryCard>
      );
    })}
  </div>
);

// --- Main App Component ---
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
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen font-sans p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-6">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
            Match History
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Review your performance and your adventures.
          </p>
        </header>

        <div className="flex flex-col sm:flex-row border-b border-gray-300 dark:border-gray-700 mb-[-1px]">
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

        <main className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-b-xl rounded-tr-xl shadow-lg">
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
