import { useState } from "react";
import GameModePic from "../assets/bangkok.jpg";
import useRoomStore from "../stores/roomStore";
function GameMode() {
  const [mode, setMode] = useState("single");
  const [difficulty, setDifficulty] = useState("classic");
  const createRoom = useRoomStore(state=>state.createRoom)
  console.log('createRoom', createRoom)
  const hdlPlay =()=>{
    alert("play!")
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-6 ">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Classic Maps</h1>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Map Card */}
          <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg col-span-1">
            <img
              src={GameModePic}
              alt="Thailand"
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <h2 className="text-2xl font-semibold">Thailand</h2>
              <p className="text-sm text-gray-300 mt-2">MODE...</p>
            </div>
          </div>

          {/* Stats Card */}
          <div className="col-span-2 bg-gray-800 rounded-lg p-4 shadow-lg space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 text-accent" />
              <span>413,032 plays</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 text-accent" />
              <span>10K+ locations</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 text-red-500" />
              <span>4,100 liked this map</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 text-yellow-400" />
              <span>11,885 average score</span>
            </div>
            <p className="mt-3 text-sm">
              A kingdom in Southeast Asia – the Land of a Thousand Smiles, this
              country attracts tourists from all over the world. White sand
              beaches, snorkeling and festivals are some of the activities to
              participate in while in Thailand. As long as you follow the local
              rules of having underwear on when leaving the house and a shirt on
              while driving – you're ready to explore!
            </p>
          </div>
        </div>

        {/* Slider for Medals */}
        <div className="bg-gray-800 rounded-lg p-4 mt-8 shadow-lg">
          <h2 className="text-xl mb-2">Your Medals</h2>
          {/* <div
            defaultValue={[15000]}
            max={25000}
            step={1000}
            className="mb-2"
          /> */}
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Bronze: 5,000</span>
            <span className="text-gray-400">Silver: 15,000</span>
            <span className="text-gray-400">Gold: 22,500</span>
          </div>
        </div>

        {/* Mode and Play Buttons */}
        <div className="mt-8 bg-gray-800 p-4 rounded-lg shadow-lg flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-2">
            <button
              className={`px-4 py-2 rounded text-white cursor-pointer ${
                mode === "single"
                  ? "bg-purple-700 hover:bg-purple-600"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
              onClick={() => setMode("single")}
            >
              Singleplayer
            </button>
            <button
              className={`px-4 py-2 rounded text-white cursor-pointer ${
                mode === "multi"
                  ? "bg-purple-700 hover:bg-purple-600"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
              onClick={() => setMode("multi")}
            >
              Multiplayer
            </button>
          </div>
          <div className="flex gap-2">
            <button className={`px-4 py-2 rounded text-white cursor-pointer ${
                difficulty === "classic"
                  ? "bg-purple-700 hover:bg-purple-600"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
              onClick={() => setDifficulty("classic")}>
              Classic
            </button>
            <button className={`px-4 py-2 rounded text-white cursor-pointer ${
                difficulty === "challenge"
                  ? "bg-purple-700 hover:bg-purple-600"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
              onClick={() => setDifficulty("challenge")}>
              Challenge
            </button>
          </div>
          <button className="bg-orange-500 hover:bg-orange-600 px-6 py-2 rounded text-white font-bold cursor-pointer"
          onClick = {hdlPlay}>
            Play
          </button>
        </div>
      </div>
    </div>
  );
}
export default GameMode;
