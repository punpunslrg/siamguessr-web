import {
  Calendar,
  Swords,
  Users,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import useGameHistoryStore from "../stores/gameHistoryStore";
import { useEffect } from "react";

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

const MultiplayerHistory = () => {
  const multiplayerHistory = useGameHistoryStore(
    (state) => state.multiplayerHistory
  );
  const fetchMultiplayerHistory = useGameHistoryStore(
    (state) => state.fetchMultiplayerHistory
  );

  useEffect(() => {
    fetchMultiplayerHistory();
  }, [fetchMultiplayerHistory]);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
        Multiplayer History
      </h2>
      {multiplayerHistory.length === 0 ? (
        <p>No multiplayer games played yet.</p>
      ) : (
        multiplayerHistory.map((game) => {
          // const isVictory = game.result === "Victory";
          // const isDefeat = game.result === "Defeat";
          // const rankChangePositive = game.rankChange.startsWith("+");

          return (
            <HistoryCard key={game.id}>
              <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                <div className="flex-grow mb-4 sm:mb-0">
                  {/* <div className="flex items-center mb-2">
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
                  <span className="mx-2 text-gray-400 dark:text-gray-600">
                    |
                  </span>
                  <span className="font-semibold text-gray-700 dark:text-gray-300">
                    {game.mode}
                  </span>
                </div> */}
                  <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400 capitalize mb-2">
                    Multiplayer Match
                  </h3>

                  <InfoLine
                    icon={<Swords className="w-4 h-4 mr-2 text-gray-500" />}
                    label="Difficulty"
                    value={game.room.difficulty}
                    valueClassName="capitalize"
                  />
                  <InfoLine
                    icon={<Trophy className="w-4 h-4 mr-2 text-yellow-500" />}
                    label="Final Score"
                    value={game.score.toLocaleString()}
                    valueClassName="font-bold text-gray-800 dark:text-white"
                  />
                  <InfoLine
                    icon={<Calendar className="w-4 h-4 mr-2 text-gray-500" />}
                    label="Date"
                    value={new Date(game.playedAt).toLocaleDateString()}
                  />
                </div>
                <button
                  className={`font-bold py-2 px-4 rounded-lg transition-colors duration-300 w-full sm:w-auto bg-gray-500 hover:bg-gray-600 text-white`}
                >
                  View Details
                </button>
              </div>
            </HistoryCard>
          );
        })
      )}
    </div>
  );
};

export default MultiplayerHistory;
