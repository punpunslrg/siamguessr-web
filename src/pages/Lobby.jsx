import React from "react";

// เอา icon crown จาก lucide-react, หรือใช้ emoji ก็ได้
const Crown = () => <span className="text-yellow-400 text-lg ml-1">👑</span>;

const Lobby = ({
  host = { name: "Boss", avatar: "https://i.pravatar.cc/150?img=3", status: "ready" },
  guest = null, // guest ยังไม่ join หรือ guest = { name, avatar, status }
  roomCode = "A1B2C3",
  isHost = true,
  onInvite = () => window.alert("Copy and send: siamguessr.com/join/A1B2C3"),
  onPlay = () => window.alert("เริ่มเกม!"),
  onLeave = () => window.alert("ออกจากห้อง"),
}) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-400 to-indigo-500 relative">
      {/* Bar Room Info */}
      <div className="absolute top-0 left-0 right-0 flex justify-between items-center px-8 py-4 bg-black/40 z-10">
        <div className="text-white font-semibold text-xl">
          SiamGuessr
        </div>
        <div className="bg-white/80 px-4 py-2 rounded-lg font-mono text-sm tracking-widest">
          Room Code: <span className="font-bold text-blue-600">{roomCode}</span>
        </div>
        <button
          className="text-white underline hover:text-orange-500 text-sm"
          onClick={onLeave}
        >
          Leave Room
        </button>
      </div>
      
      {/* Main lobby */}
      <div className="flex flex-col items-center justify-center flex-1 w-full">
        {/* Card */}
        <div className="flex flex-row items-center space-x-10 my-24">
          {/* Host Card */}
          <div className="bg-white w-56 h-64 rounded-2xl shadow-xl flex flex-col items-center justify-center relative">
            {/* Avatar */}
            <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center mb-4 shadow">
              {host.avatar
                ? <img src={host.avatar} alt="host" className="w-full h-full rounded-full object-cover" />
                : <span className="text-3xl text-white">👤</span>}
            </div>
            <div className="flex items-center">
              <span className="text-xl font-bold text-gray-700">{host.name}</span>
              <Crown />
            </div>
            <div className="mt-2 text-xs font-semibold text-blue-500 tracking-wide">
              HOST
            </div>
            <div className={`mt-2 text-xs font-bold ${host.status === "ready" ? "text-lime-600" : "text-gray-400"}`}>
              {host.status === "ready" ? "READY" : "WAITING"}
            </div>
          </div>
          {/* Guest Card */}
          <div className="bg-gray-100 w-56 h-64 rounded-2xl shadow-xl flex flex-col items-center justify-center">
            {guest ? (
              <>
                <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center mb-4 shadow">
                  <img src={guest.avatar} alt="guest" className="w-full h-full rounded-full object-cover" />
                </div>
                <div className="text-xl font-bold text-gray-700">{guest.name}</div>
                <div className="mt-2 text-xs font-semibold text-green-500 tracking-wide">
                  GUEST
                </div>
                <div className={`mt-2 text-xs font-bold ${guest.status === "ready" ? "text-lime-600" : "text-gray-400"}`}>
                  {guest.status === "ready" ? "READY" : "WAITING"}
                </div>
              </>
            ) : (
              <>
                <button
                  className="bg-lime-500 text-white text-lg font-bold py-3 px-8 rounded-full shadow hover:bg-lime-600 transition"
                  onClick={onInvite}
                >
                  INVITE
                </button>
                <div className="mt-6 text-sm text-gray-500">Waiting for friend...</div>
              </>
            )}
          </div>
        </div>
        {/* Play Button */}
        {isHost && (
          <button
            className="bg-orange-500 text-white text-xl font-bold py-4 px-20 rounded-full shadow hover:bg-orange-600 transition absolute bottom-14"
            onClick={onPlay}
            disabled={!guest || host.status !== "ready" || guest.status !== "ready"}
            style={{ left: "50%", transform: "translateX(-50%)" }}
          >
            PLAY
          </button>
        )}
      </div>
    </div>
  );
};

export default Lobby;
