// GameLayout.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useSocketStore } from "../stores/socketStore";
import useGameStore from "../stores/game-store";
import { Outlet } from "react-router";

export default function GameLayout({ children }) {
  const navigate = useNavigate();
  const { isConnected, isCallingToConnect, connect } = useSocketStore();
  const { room, actionListenEvents, actionRemoveEvents, actionJoin } = useGameStore();

  const isMultiplayer = room?.mode === "multi";

  useEffect(() => {
    if (isMultiplayer && !isConnected && !isCallingToConnect) {
      connect();
    }
    // No cleanup here (as you mentioned)
  }, [isMultiplayer, isConnected, isCallingToConnect]);

  useEffect(() => {
    if (isMultiplayer && isConnected && room?.code) {
      actionJoin(room.code);
      actionListenEvents(navigate);
    }
    return () => {
      if (isMultiplayer) actionRemoveEvents(); // <-- only remove events if multiplayer
    };
  }, [isMultiplayer, isConnected, room]);

  return (
    <div className="bg-black text-white">
      {children ? children : <Outlet />}
    </div>
  );
}
