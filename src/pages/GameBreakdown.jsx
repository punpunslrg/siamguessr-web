import Cartoon from "../assets/cartoon.png";
const GameBreakdown = () => {
  return (
    <div>
      <div className="text-center mt-8 p-4 flex flex-col items-center">
        <h1 className="text-5xl font-bold text-white tracking-tight mb-8">
          Game Breakdown
        </h1>
        <div className="overflow-x-auto ">
          <table className="min-w-full border-separate border-spacing-y-2 ">
            <thead>
              <tr className="text-sm uppercase  text-left text-white ">
                <th className="px-4">Round</th>
                <th className="px-4">Your Score</th>
                <th className="px-4">Friend Score</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white text-black shadow-lg ">
                <td className="px-8 py-3 ">1</td>
                <td className="px-4 py-3">956789 points</td>
                <td className="px-4 py-3">434234 points</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="w-90 absolute top-24 right-18">
        <img src={Cartoon} />
        {/* หน้า Profile User Friend */}
        <div className="bg-gray-500  w-28 h-28 rounded-full absolute top-16 right-26"></div>
      </div>
      <div className="w-90 absolute top-23 left-18 transform scale-x-[-1]">
        <img src={Cartoon} />
        {/* หน้า Profile User Me */}

        <div className="bg-black  w-28 h-28 rounded-full absolute top-16 right-26"></div>
      </div>
    </div>
  );
};
export default GameBreakdown;
