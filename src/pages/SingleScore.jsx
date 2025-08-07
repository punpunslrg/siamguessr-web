import { useEffect } from "react";
import Cartoon from "../assets/cartoon.png";
import useUserStore from "../stores/userStore";
import useGameStore from "../stores/game-store.js";
import { useNavigate } from "react-router";

const SingleScore = () => {
  const room = useGameStore((state) => state.room);
  const roomResult = useGameStore((state) => state.roomResult);
  const user = useUserStore((state) => state.user); // <- assuming you store user info here
  const actionGetRoomResult = useGameStore(
    (state) => state.actionGetRoomResult
  );
  const actionResetGame = useGameStore((state) => state.actionResetGame);

  const navigate = useNavigate();

  useEffect(() => {
    if (room?.id) {
      actionGetRoomResult(room.id);
    }
  }, [room?.id]);

  const currentUserResult = roomResult?.find((r) => r.userId === user?.id);

  const handlePlayAgain = async () => {
    await actionResetGame();
    navigate("/gamemode");
  };
  const getProfile = useUserStore((state) => state.getProfile);
  useEffect(() => {
    getProfile();
  }, [getProfile]);
  return (
    <div className=" px-4 py-8  bg-secondary h-[928px] flex items-center">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* LEFT: Avatar + Game mode */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <img
              src={Cartoon}
              alt="Avatar"
              className="transform scale-x-[-1]"
            />
            <div className="bg-amber-400 w-38 h-38 absolute top-23 right-50 rounded-full">
              <img
                src={user.image}
                alt={`${user.username}'s profile`}
                className="w-38 h-38"
              />
            </div>
          </div>
          <div className="flex gap-2 mt-6">
            <button
              className="btn-primary w-sm px-8 py-3 rounded-full text-xl shadow-lg"
              onClick={handlePlayAgain}
            >
              PLAY AGAIN
            </button>
          </div>
        </div>

        {/* RIGHT: Leaderboard + Victory Summary */}
        <div>
          <h3 className="text-5xl text-yellow-400 font-bold flex justify-center mt-12">
            Your Score
          </h3>
          <div className="bg-gray-700 p-8 rounded-2xl shadow-xl border-orange-500 border-8 h-fit mt-8">
            <div className="text-white">
              <table className="table m-4 w-full">
                <thead className="text-yellow-400">
                  <tr>
                    <th>Round</th>
                    <th>Distance</th>
                    <th>Points</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUserResult?.roundScores?.map((round) => (
                    <tr key={round.roundNumber}>
                      <td>Round {round.roundNumber}</td>
                      <td>
                        {round.distance?.toFixed(2) ? (
                          <span>{round.distance?.toFixed(2)} KM</span>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td>{round.score.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="font-bold text-green-400 border-t border-yellow-400 flex justify-center">
                <span className="pt-8 text-3xl">
                  Total {currentUserResult?.totalScore.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleScore;
