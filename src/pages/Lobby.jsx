import React from "react";

const Lobby = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-500 to-indigo-600">
      <div className="flex gap-24 items-center space-y-8 row ">
        <div className="bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl border border-gray-100">
          {/* Avatar */}
          <div className="w-32 h-32 rounded-full bg-gray-500 flex items-center justify-center mb-6 shadow-lg border-4 border-white overflow-hidden">
            <img className="w-full h-full object-cover p-2 rounded-full" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 uppercase tracking-wide">
            Username
          </h2>
        </div>

        {/* Invite Card */}
        <div className="bg-gray-200  p-8 rounded-2xl shadow-xl flex flex-col items-center justify-center  transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl border border-gray-300">
          <button className="bg-lime-500 text-white text-xl font-bold py-4 px-8 rounded-full shadow-lg hover:bg-lime-600 cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 active:scale-95">
            INVITE
          </button>
        </div>
      </div>

      {/* Play Button */}
      <button className="absolute bottom-10 bg-orange-500 text-white text-2xl font-bold py-4 px-16 rounded-full shadow-xl hover:bg-orange-600 transition duration-300 ease-in-out transform hover:scale-105 active:scale-95">
        PLAY
      </button>
    </div>
  );
};

export default Lobby;
