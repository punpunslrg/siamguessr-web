import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import useGameStore from "../stores/game-store";
import useUserStore from "../stores/userStore";
import { useSocketStore } from "../stores/socketStore";
// import { useMultiplayerStore } from "../stores/multiplayerStore";

const PlayerCard = ({ player }) => {
  const user = useUserStore((state) => state.user);
  const { actionChangeStatus } = useGameStore();
  const borderColor =
    player.status === "ready" ? "border-green-500" : "border-red-500";

  const hdlReady = () => {
    actionChangeStatus(player.status);
  };

  // console.log("player", player);

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
        <img
          src={player?.user?.image}
          alt={`${user.username}'s profile`}
          className="w-full h-full object-cover"
        />
      </div>
      <h2 className="text-lg font-bold text-gray-800 truncate w-full">
        {player?.user?.username}
      </h2>
      <span
        className={`mt-2 text-sm font-semibold flex flex-col gap-2 ${
          player.status === "ready" ? "text-green-500" : "text-red-500"
        }`}
      >
        {player.status === "ready" ? "READY" : "WAITING. . ."}
        {player.userId === user.id && (
          <button className="btn" onClick={() => hdlReady()}>
            {player.status === "ready" ? "UNREADY" : "READY"}
          </button>
        )}
      </span>
    </div>
  );
};

function Lobby() {
  const { roomId } = useParams();
  // console.log("roomId", roomId);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  const [copied, setCopied] = useState(false);

  const { token, user } = useUserStore();
  const {
    room,
    actionGetLobby,
    actionLeave,
    actionPlay,
    actionJoin,
    actionListenEvents,
    actionRemoveEvents,
    playersData,
    actionResetGame,
  } = useGameStore();

  const { isConnected, connect, disconnect, isCallingToConnect } =
    useSocketStore();

  // A component for displaying an empty slot
  const EmptySlot = () => (
    <div className="bg-gray-200 bg-opacity-50 p-6 rounded-2xl shadow-inner flex flex-col items-center justify-center w-48 h-48 border-2 border-dashed border-gray-400 gap-4">
      <button
        className={`bg-green-500 text-white text-lg font-bold px-10 py-3 rounded-full shadow-lg transition-all mb-3 ${
          copied ? "bg-green-700" : ""
        }`}
        disabled={copied}
        onClick={() => hdlInvite()}
      >
        {copied ? "Copied!" : "Invite"}
      </button>
      <span className="text-gray-500 text-lg">Waiting...</span>
    </div>
  );

  const getLobby = async (roomId) => {
    try {
      await actionGetLobby(roomId);
    } catch (error) {
      console.error("Failed to fetch and join lobby:", err);
    }
  };

  useEffect(() => {
    getLobby(roomId);
  }, []);

  const fetchAndJoin = async () => {
    try {
      actionResetGame();

      const newRoom = await actionGetLobby(roomId, token);
      actionJoin(newRoom.code);
    } catch (err) {
      console.error("Failed to fetch and join lobby:", err);
      navigate("/gamemode");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isConnected) {
      fetchAndJoin();
    }
  }, [isConnected, roomId]);

  const handlePlay = () => {
    actionPlay(room);
  };

  const handleLeave = () => {
    actionLeave(room);
  };

  const hdlInvite = () => {
    // Simple copy to clipboard functionality
    const inviteLink = `${window.location.origin}/lobby/${room.id}`;
    navigator.clipboard.writeText(inviteLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
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

  // const playersData = room.players
  // console.log("playerData", playersData);
  // console.log("room", room);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600">
      {/* Room Code */}
      <div className="absolute top-8 left-0 w-full flex justify-center">
        <span className="bg-white bg-opacity-80 px-6 py-2 rounded-xl text-gray-800 text-lg font-mono tracking-widest shadow-md mt-50">
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
      <div className="absolute bottom-16 w-50 flex flex-col justify-center text-center gap-5">
        {room.hostId === user.id && (
          <button
            onClick={handlePlay}
            disabled={
              playersData?.length !== 2 ||
              !(playersData || []).every((player) => player.status === "ready")
            }
            className={`${
              playersData?.length !== 2 ||
              !(playersData || []).every((player) => player.status === "ready")
                ? "bg-gray-500 hover:cursor-not-allowed"
                : "bg-orange-500  hover:bg-orange-600 hover:cursor-pointer"
            }  text-white text-2xl font-bold px-10 py-4 rounded-full shadow-2xl transition-all`}
          >
            PLAY
          </button>
        )}
        <button
          onClick={handleLeave}
          className="bg-red-500 hover:bg-red-600 hover:cursor-pointer text-white text-2xl font-bold px-10 py-2 rounded-full shadow-2xl transition-all"
        >
          Leave
        </button>
      </div>
    </div>
  );
}

export default Lobby;
