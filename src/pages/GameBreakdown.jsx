import { useEffect, useRef, useState } from "react";
import Cartoon from "../assets/cartoon.png";
import useGameStore from "../stores/game-store.js";
import { useNavigate } from "react-router";
import useUserStore from "../stores/userStore.js";

const GameBreakdown = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  // const isLeavingRef = useRef(false);

  const user = useUserStore((state) => state.user);
  const users = useGameStore((state) => state.playersData);

  const room = useGameStore((state) => state.room);
  const actionGetRoomResult = useGameStore(
    (state) => state.actionGetRoomResult
  );
  const roomResult = useGameStore((state) => state.roomResult);
  // const actionForfeitGame = useGameStore((state) => state.actionForfeitGame);
  const actionLeave = useGameStore((state) => state.actionLeave);

  const handleLeave = async () => {
    actionLeave(room);
    navigate("/gamemode");
  };

  useEffect(() => {
    const fetchResult = async () => {
      if (!room?.id) return;

      setLoading(true);
      try {
        await actionGetRoomResult(room.id);
      } catch (err) {
        console.error("Failed to fetch result:", err);
      }
      setLoading(false);
    };

    fetchResult();
  }, [room?.id]);

  const me = roomResult?.find((r) => r.userId === user?.id);
  const friend = roomResult?.find((r) => r.userId !== user?.id);

  const guest = users?.find((r) => r.userId !== user?.id);

  // console.log("user", user)
  // console.log("room", room)
  // console.log("roomResult", roomResult);
  // console.log("me", me);
  // console.log("friend", friend)
  // console.log("users", users)
  // console.log("guest", guest);

  return (
    <div className="bg-primary ">
      <div className="text-center flex flex-col items-center ">
        <h1 className="text-5xl text-yellow-400 font-bold mt-12 mb-8 ">
          Game Breakdown
        </h1>

        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-y-2">
            <thead className="text-white">
              <tr className="text-sm uppercase text-left">
                <th className="px-4">Round</th>
                <th className="px-4">{`${me?.username} (You)` || "You"}</th>
                <th className="px-4">{friend?.username || "Friend"}</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((round) => {
                const myScore =
                  me?.roundScores.find((r) => r.roundNumber === round)?.score ??
                  "-";
                const friendScore =
                  friend?.roundScores.find((r) => r.roundNumber === round)
                    ?.score ?? "-";

                return (
                  <tr key={round} className="bg-white text-black shadow-lg">
                    <td className="px-8 py-3 font-bold">{round}</td>
                    <td className="px-4 py-3">
                      {myScore.toLocaleString()} points
                    </td>
                    <td className="px-4 py-3">
                      {friendScore.toLocaleString()} points
                    </td>
                  </tr>
                );
              })}
              <tr className="bg-gray-800 text-white font-bold">
                <td className="px-8 py-3">Total</td>
                <td className="px-4 py-3">
                  {me?.totalScore.toLocaleString() || 0} points
                </td>
                <td className="px-4 py-3">
                  {friend?.totalScore.toLocaleString() || 0} points
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Character Images */}
      <div className="w-90 absolute top-50 right-80 hidden 2xl:block">
        <img src={Cartoon} />
        <div className="bg-gray-500 w-28 h-28 rounded-full absolute top-16 right-26 overflow-hidden">
          <img src={guest?.user?.image} alt="guest" />
        </div>
      </div>

      <div className="w-90 absolute top-49 left-80 transform scale-x-[-1] hidden 2xl:block">
        <img src={Cartoon} />
        <div className="bg-black w-28 h-28 rounded-full absolute top-16 right-26 overflow-hidden">
          <img src={user?.image} alt="you" />
        </div>
      </div>

      <div className="text-[80px] text-white flex justify-center mt-10">
        {me?.rank === 1 ? "YOU WIN !!" : "YOU LOSE"}
      </div>

      <div className="flex justify-center mt-10">
        <button
          className="btn btn-error btn-sm shadow-lg text-white pointer-events-auto text-2xl py-6 px-12"
          onClick={handleLeave}
        >
          Leave
        </button>
      </div>
    </div>
  );
};

export default GameBreakdown;
