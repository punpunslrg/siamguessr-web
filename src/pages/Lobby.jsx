import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import useGameStore from "../stores/game-store";
import useUserStore from "../stores/userStore";
import { useSocketStore } from "../stores/socketStore";
import { useMultiplayerStore } from "../stores/multiplayerStore";

const PlayerCard = ({ player }) => {
  const { changeStatus } = useMultiplayerStore();
  const user = useUserStore(state=>state.user)
  const borderColor =
    player.status === "ready" ? "border-green-500" : "border-red-500";
  const hdlReady = () => {
    changeStatus(player.status);
  };

  return (
    <div className="relative bg-white p-6 gap-4 rounded-2xl shadow-lg flex flex-col items-center w-48 text-center">
      {player.isHost && (
        <div className="absolute -top-15 left-1/2 -translate-x-1/2 z-10 text-5xl drop-shadow select-none pointer-events-none">
          👑
        </div>
      )}
      <div
        className={`w-28 h-28 rounded-full mb-4 shadow-inner overflow-hidden border-8 ${borderColor} flex items-center justify-center transition-colors duration-300`}
      >
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
      <span
        className={`mt-2 text-sm font-semibold flex flex-col gap-2 ${
          player.status === "ready" ? "text-green-500" : "text-red-500"
        }`}
      >
        {player.status === "ready" ? "READY" : "WAITING. . ."}
        {player.userId === user.id &&
          <button className="btn" onClick={() => hdlReady()}>
            {player.status === "ready" ? "UNREADY" : "READY"}
          </button>
        }
      </span>
    </div>
  );
};

function Lobby() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const room = useGameStore((state) => state.room);
  const [isLoading, setIsLoading] = useState(true);
  const actionGetLobby = useGameStore((state) => state.actionGetLobby);
  const token = useUserStore((state) => state.token);
  const { isConnected, connect, disconnect, isCallingToConnect, socket } =
    useSocketStore();
  const { listenEvents, join, removeEvents, playersData } =
    useMultiplayerStore();
  useEffect(() => {
    if (!isConnected && !isCallingToConnect) {
      connect();
    }
    return () => {
      if (isConnected && !isCallingToConnect) {
        disconnect();
      }
    };
  }, [isConnected, connect, disconnect, isCallingToConnect]);

  // A component for displaying an empty slot
  const EmptySlot = () => (
    <div className="bg-gray-200 bg-opacity-50 p-6 rounded-2xl shadow-inner flex flex-col items-center justify-center w-48 h-48 border-2 border-dashed border-gray-400 gap-4">
      <button
        className="btn btn-secondary border-0"
        onClick={() => hdlInvite()}
      >
        Invite
      </button>
      <span className="text-gray-500 text-lg">Waiting...</span>
    </div>
  );

  useEffect(() => {
    if (isConnected) {
      listenEvents();
      join(room.code);
    }
    return () => {
      if (isConnected) {
        removeEvents();
      }
    };
  }, [isConnected]);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        setIsLoading(true);
        await actionGetLobby(roomId, token);
      } catch (error) {
        console.error("Failed to fetch room data.", error);
        // Optional: Redirect if the room doesn't exist
        // navigate('/game-modes');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoom();
  }, [roomId, actionGetLobby, token]);

  const handlePlay = () => {
    // Logic to start the game. This would likely involve a backend call
    // and then navigating all players in the room to the gameplay screen.
    navigate("/gameplay", { state: { roomId: room.id } });
  };

  const hdlInvite = () => {
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
  // const playerSlots = [];
  // for (let i = 0; i < room.maxPlayers; i++) {
  //   if (i < room.players.length) {
  //     playerSlots.push(
  //       <PlayerCard key={room.players[i].userId} player={room.players[i]} />
  //     );
  //   } else {
  //     playerSlots.push(<EmptySlot key={`empty-${i}`} />);
  //   }
  // }
  console.log("playerData", playersData);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600">
      {/* Room Code */}
      <div className="absolute top-8 left-0 w-full flex justify-center">
        <span className="bg-white bg-opacity-80 px-6 py-2 rounded-xl text-gray-800 text-lg font-mono tracking-widest shadow-md">
          Room Code: <span className="font-bold">{room.code}</span>
        </span>
      </div>

      {/* Player Slots */}
      <div className="flex flex-row justify-center items-center gap-8 mb-16 mt-28">
        {playersData &&
          playersData.map((player) => (
            <PlayerCard key={player.userId} player={player} />
          ))}
        {playersData && playersData.length < room.maxPlayers && <EmptySlot />}
      </div>

      {/* PLAY button */}
      <div className="absolute bottom-16 w-full flex justify-center">
        <button
          onClick={handlePlay}
          className="bg-orange-500 hover:bg-orange-600 text-white text-2xl font-bold px-20 py-4 rounded-full shadow-2xl transition-all"
        >
          PLAY
        </button>
      </div>
    </div>
  );
}

export default Lobby;
