import { Calendar, Swords, Trophy } from "lucide-react";
import useGameHistoryStore from "../stores/gameHistoryStore";
import { useEffect } from "react";

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
          return (
            <HistoryCard key={game.id}>
              <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                <div className="flex-grow mb-4 sm:mb-0">
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
                    label="Score"
                    value={game.score.toLocaleString()}
                    valueClassName="font-bold text-gray-800 dark:text-white"
                  />
                  <InfoLine
                    icon={<Calendar className="w-4 h-4 mr-2 text-gray-500" />}
                    label="Date"
                    value={new Date(game.playedAt).toLocaleDateString()}
                  />
                </div>
              </div>
            </HistoryCard>
          );
        })
      )}
    </div>
  );
};

export default MultiplayerHistory;
