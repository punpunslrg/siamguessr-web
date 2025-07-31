import Crown from "../icons";

export default function Leaderboard() {
  return (
    <div className="p-12 flex flex-col items-center text-white font-bold bg-primary h-full">
      <h1 className="text-3xl mb-24 mt-2">LEADERBOARD</h1>

      {/* Top 3 podium */}
      <div className="flex justify-center items-end mb-6 gap-8 ">
        {/* 2nd */}
        <div className="flex flex-col items-center">
          <p>2</p>
          {/* ProfilePic */}
          <div className="w-20 h-20 bg-gray-500 rounded-full border-4 border-blue-400" />
          <p className="mt-1 text-xs">USERNAME</p>
          <div className="bg-red-600 w-14 text-center rounded-t-md py-1 mt-1">
            5000
          </div>
        </div>

        {/* 1st */}
        <div className="flex flex-col items-center">
          <Crown className="absolute top-46"></Crown>
          {/* ProfilePic */}
          <div className="w-28 h-28 bg-gray-300 rounded-full border-4 border-yellow-400" />
          <p className="mt-1 text-xs">USERNAME</p>
          <div className="bg-orange-500 w-16 text-center rounded-t-md py-1 mt-1">
            10000
          </div>
        </div>

        {/* 3rd */}
        <div className="flex flex-col items-center">
          <p>3</p>
          {/* ProfilePic */}
          <div className="w-18 h-18 bg-gray-600 rounded-full border-4 border-purple-400" />
          <p className="mt-1 text-xs">USERNAME</p>
          <div className="bg-red-600 w-14 text-center rounded-t-md py-1 mt-1">
            2500
          </div>
        </div>
      </div>
      {/* table */}
      <div className="overflow-x-auto ">
        <table className="border-separate border-spacing-y-2">
          <thead>
            <tr className="text-sm uppercase  text-left ">
              <th className="px-4">Ranking</th>
              <th className="px-4">Name</th>
              <th className="px-4">Matches</th>
              <th className="px-8">Win</th>
              <th className="px-4">Points</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white text-black shadow-lg ">
              <td className="px-12 py-3 ">4</td>
              <td className="px-4 py-3">MAC</td>
              <td className="px-12 py-3">5</td>
              <td className="px-10 py-3">4</td>
              <td className="px-8 py-3">6</td>
            </tr>
            <tr className="bg-white text-black shadow-lg ">
              <td className="px-12 py-3 ">5</td>
              <td className="px-4 py-3">JOB</td>
              <td className="px-12 py-3">5</td>
              <td className="px-10 py-3">3</td>
              <td className="px-8 py-3">4</td>
            </tr>
          </tbody>
        </table>
        <div></div>
      </div>

      {/* Player List */}
      {/* <div className="bg-white w-xl  rounded-xl p-2 space-y-2 shadow-2xl"> */}
      {/* <div className=" text-black flex justify-between items-center  p-3 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 bg-gray-600 rounded-full" />
            <span className="text-sm">play1</span>
          </div>
          <div className="flex items-center gap-4 ">
            <span className="text-sm">100 score</span>
          </div>
        </div>
      </div> */}
    </div>
  );
}
