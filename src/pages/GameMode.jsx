import { useState } from "react";
import { useNavigate } from "react-router";
import GameModePic from "../assets/bangkok.jpg";
import useGameStore from "../stores/game-store.js";
import useUserStore from "../stores/userStore.js";

function GameMode() {
  const navigate = useNavigate();
  const [selectedMode, setSelectedMode] = useState("single"); // Use values from your schema
  const [selectedDifficulty, setSelectedDifficulty] = useState("classic");
  const [isLoading, setIsLoading] = useState(false);

  const user = useUserStore((state) => state.user)
  const actionStartNewGame = useGameStore((state) => state.actionStartNewGame);

  const handlePlay = async () => {
    if (!user) {
      console.error("User is not logged in.");
      navigate("/login");
      return;
    }
    setIsLoading(true);

    try {
      const roomData = {
        mode: selectedMode,
        difficulty: selectedDifficulty,
        maxPlayers: selectedMode === "multi" ? 2 : 1,
        hostId: user.id,
      };
      
      // 2. Call the backend to create the room
      const newRoom = await actionStartNewGame(roomData);
      console.log("Created room:", newRoom);

      // 3. Navigate based on the selected mode
      if (selectedMode === "single") {
        navigate("/gameplay", { state: { roomId: newRoom.id } });
      } else {
        // For multiplayer, go to a lobby page with the room ID
        navigate(`/lobby/${newRoom.id}`);
      }
    } catch (error) {
      console.error("Failed to start game:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-primary">
      <div className=" text-white p-12">
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
                <p className="text-sm text-gray-300 mt-2">
                  A tour of the Land of Smiles.
                </p>
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
                A kingdom in Southeast Asia – the Land of a Thousand Smiles,
                this country attracts tourists from all over the world. White
                sand beaches, snorkeling and festivals are some of the
                activities to participate in while in Thailand. As long as you
                follow the local rules of having underwear on when leaving the
                house and a shirt on while driving – you're ready to explore!
              </p>
            </div>
          </div>

          {/* Slider for Medals */}
          <div className="bg-gray-800 rounded-lg p-4 mt-8 shadow-lg">
            <h2 className="text-xl mb-2">Your Medals</h2>
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
                onClick={() => setSelectedMode("single")}
                className={`px-4 py-2 rounded text-white cursor-pointer transition-colors ${
                  selectedMode === "single"
                    ? "bg-purple-700 hover:bg-purple-600"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
              >
                Singleplayer
              </button>
              <button
                onClick={() => setSelectedMode("multi")}
                className={`px-4 py-2 rounded text-white cursor-pointer transition-colors ${
                  selectedMode === "multi"
                    ? "bg-purple-700 hover:bg-purple-600"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
              >
                Multiplayer
              </button>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedDifficulty("classic")}
                className={`px-3 py-1 rounded text-white cursor-pointer transition-colors ${
                  selectedDifficulty === "classic"
                    ? "bg-purple-700 hover:bg-purple-600"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
              >
                CLASSIC
              </button>
              <button
                onClick={() => setSelectedDifficulty("challenge")}
                className={`px-3 py-1 rounded text-white cursor-pointer transition-colors ${
                  selectedDifficulty === "challenge"
                    ? "bg-purple-700 hover:bg-purple-600"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
              >
                CHALLENGE
              </button>
            </div>
            <button
              onClick={handlePlay}
              disabled={isLoading}
              className="btn-primary px-8 py-2 disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
              {isLoading ? "Starting..." : "Play"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default GameMode;
