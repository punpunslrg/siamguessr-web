import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { getRoomDetails } from "../api/gameApi.js";

// A component for displaying each player card
const PlayerCard = ({ player }) => (
  <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center w-48 text-center">
    <div className="w-24 h-24 rounded-full bg-gray-300 mb-4 shadow-inner overflow-hidden">
      {player.image ? (
        <img
          src={player.image}
          alt={player.username}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-gray-400"></div>
      )}
    </div>
    <h2 className="text-lg font-bold text-gray-800 truncate w-full">
      {player.username}
    </h2>
  </div>
);

// A component for displaying an empty slot
const EmptySlot = () => (
  <div className="bg-gray-200 bg-opacity-50 p-6 rounded-2xl shadow-inner flex flex-col items-center justify-center w-48 h-48 border-2 border-dashed border-gray-400">
    <span className="text-gray-500 text-lg">Waiting...</span>
  </div>
);

function Lobby() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        setIsLoading(true);
        const roomData = await getRoomDetails(roomId);
        setRoom(roomData);
      } catch (error) {
        console.error("Failed to fetch room data.", error);
        // Optional: Redirect if the room doesn't exist
        // navigate('/game-modes');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoom();
  }, [roomId, navigate]);

  const handlePlay = () => {
    // Logic to start the game. This would likely involve a backend call
    // and then navigating all players in the room to the gameplay screen.
    navigate("/gameplay", { state: { roomId: room.id } });
  };

  const handleInvite = () => {
    // Simple copy to clipboard functionality
    const inviteLink = `${window.location.origin}/lobby/${roomId}`;
    navigator.clipboard.writeText(inviteLink).then(() => {
      alert("Invite link copied to clipboard!");
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        Loading Lobby...
      </div>
    );
  }

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        Room not found.
      </div>
    );
  }

  // Create an array of player cards and empty slots
  const playerSlots = [];
  for (let i = 0; i < room.maxPlayers; i++) {
    if (i < room.players.length) {
      playerSlots.push(
        <PlayerCard key={room.players[i].userId} player={room.players[i]} />
      );
    } else {
      playerSlots.push(<EmptySlot key={`empty-${i}`} />);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 ">
      <h1 className="text-4xl font-bold text-white mb-2">LOBBY</h1>
      <p className="text-white mb-8">
        Room Code:{" "}
        <span className="font-mono bg-black/30 px-2 py-1 rounded">
          {room.code}
        </span>
      </p>

      <div className="flex flex-wrap justify-center gap-8 mb-16">
        {playerSlots}
      </div>

      <div className="absolute bottom-10 flex gap-4">
        <button
          onClick={handleInvite}
          className="bg-lime-500 text-white text-xl font-bold py-4 px-8 rounded-full shadow-lg hover:bg-lime-600 cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 active:scale-95"
        >
          INVITE
        </button>
        <button
          onClick={handlePlay}
          className="bg-orange-500 text-white text-2xl font-bold py-4 px-16 rounded-full shadow-xl hover:bg-orange-600 transition duration-300 ease-in-out transform hover:scale-105 active:scale-95"
        >
          PLAY
        </button>
      </div>
    </div>
  );
}

export default Lobby;
