import { useEffect } from "react";
import Crown from "../icons";
import useLeaderboardStore from "../stores/leaderboardStore";

export default function Leaderboard() {
  const { leaderboard, actionFetchLeaderboard, isLoading, error } =
    useLeaderboardStore();

  useEffect(() => {
    actionFetchLeaderboard();
  }, [actionFetchLeaderboard]);

  if (isLoading) return <div>Loading leaderboard...</div>;
  if (error) return <div>Error: {error}</div>;
  
  if (!leaderboard) {
  return <div className="font-bold text-center mt-20">Not enough data for leaderboard.</div>;
}

  return (
    <div className="p-36 flex flex-col items-center text-white font-bold bg-primary h-full">
      <h1 className="text-5xl text-yellow-400 font-bold mb-24 -mt-5">
        LEADERBOARD
      </h1>
      <p className="absolute top-60">*BEST TOP 5 OF YOUR SCORE*</p>

      {/* Top 3 podium */}
      <div className="flex justify-center items-end mb-6 gap-8 mt-7">
        {/* 2nd */}
        <div className="flex flex-col items-center">
          <p>2</p>
          {/* ProfilePic */}
          <div className="w-20 h-20 bg-gray-500 rounded-full border-4 border-blue-400"><img src={leaderboard[1]?.image} /></div>
          <p className="mt-1 text-xs">{leaderboard[1]?.username}</p>
          <div className="bg-red-600 w-14 text-center rounded-t-md py-1 mt-1">
            {leaderboard[1]?.averageTop5}
          </div>
        </div>

        {/* 1st */}
        <div className="flex flex-col items-center">
          {/* ProfilePic */}
          <div className="w-28 h-28 bg-gray-300 rounded-full border-4 border-yellow-400"><img src={leaderboard[0]?.image} /></div>
          <Crown className="absolute top-73"></Crown>
          <p className="mt-1 text-xs">{leaderboard[0]?.username}</p>
          <div className="bg-orange-500 w-16 text-center rounded-t-md py-1 mt-1">
            {leaderboard[0]?.averageTop5}
          </div>
        </div>

        {/* 3rd */}
        <div className="flex flex-col items-center">
          <p>3</p>
          {/* ProfilePic */}
          <div className="w-18 h-18 bg-gray-600 rounded-full border-4 border-purple-400"><img src={leaderboard[2]?.image} /></div>
          <p className="mt-1 text-xs">{leaderboard[2]?.username}</p>
          <div className="bg-red-600 w-14 text-center rounded-t-md py-1 mt-1">
            {leaderboard[2]?.averageTop5}
          </div>
        </div>
      </div>
      {/* table */}
      <div>
        <table className="border-separate border-spacing-y-2">
          <thead>
            <tr className="text-sm uppercase  text-left ">
              <th className="px-4">Ranking</th>
              <th className="px-4">Name</th>
              <th className="px-4">Matches</th>
              <th className="px-4">{`Points ( average top 5 )`}</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.splice(3,8).map((e) => (
              <tr className="bg-white text-black shadow-lg ">
                <td className="px-12 py-3 ">{e.rank}</td>
                <td className="px-4 py-3">{e.username}</td>
                <td className="px-12 py-3">{e.totalGames}</td>
                <td className="px-10 py-3">{e.averageTop5} points</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
