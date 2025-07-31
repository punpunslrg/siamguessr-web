import Cartoon from "../assets/cartoon.png";
const SingleScore = () => {
  return (
    <div className=" px-4 py-8  bg-secondary  flex items-center">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* LEFT: Avatar + Game mode */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <img
              src={Cartoon}
              alt="Avatar"
              className="transform scale-x-[-1]"
            />
          </div>

          <div>
            <div className="flex gap-2"></div>
            <button className="btn-primary w-sm px-8 py-3 rounded-full text-xl shadow-lg">
              PLAY AGAIN
            </button>
          </div>
        </div>

        {/* RIGHT: Leaderboard + Victory Summary */}
        <div>
          <h3 className="text-5xl text-yellow-400 font-bold flex justify-center mt-12">
            Your Score
          </h3>
          <div className="bg-gray-700 p-8 rounded-2xl shadow-xl border-orange-500 border-8 h-fit mt-8 ">
            <div className=" flex items-center justify-center "></div>
            <div className=" text-black flex-col justify-center ">
              <div>
                <table className="table m-4">
                  {/* head */}
                  <thead className="text-yellow-400">
                    <tr>
                      <th>Round</th>
                      <th>Distance</th>
                      <th>Points</th>
                    </tr>
                  </thead>
                  <tbody className="text-white">
                    {/* row 1 */}
                    <tr>
                      <th className="pl-8">1</th>
                      <td>10 KM</td>
                      <td>1234567</td>
                    </tr>
                    {/* row 2 */}
                    <tr>
                      <th className="pl-8">2</th>
                      <td>101 KM</td>
                      <td>6543</td>
                    </tr>
                    {/* row 3 */}
                    <tr>
                      <th className="pl-8">3</th>
                      <td>210 KM</td>
                      <td>445</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SingleScore;
