import Cartoon from "../assets/cartoon.png";
import useUserStore from "../stores/userStore";

const GameBreakdown = () => {
  const user = useUserStore((state) => state.user);
  return (
    <div className="bg-primary ">
      <div className="text-center flex flex-col items-center p-36">
        <h1 className="text-5xl text-yellow-400 font-bold  mb-8 mt-12">
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
      <div className="w-90 absolute top-70 right-80 max-2xl:right-50 max-xl:hidden">
        <img src={Cartoon} />
        {/* หน้า Profile User Friend */}
        <div className="bg-green-500  w-29 h-29 rounded-full absolute top-16 right-26"></div>
      </div>
      <div className="w-90 absolute top-68 left-80 transform scale-x-[-1] max-2xl:left-50 max-xl:hidden">
        <img src={Cartoon} />
        {/* หน้า Profile User Me */}

        <div className="w-29 h-29 bg-orange-400 rounded-full absolute top-16 right-26">
          <img src={user.image} />
        </div>
      </div>
    </div>
  );
};
export default GameBreakdown;
