function Subscription() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 flex flex-col items-center justify-center px-4 py-12">
      {/* Heading */}
      <h1 className="text-2xl md:text-3xl font-bold mb-2 ">
        Choose your preferred plan
      </h1>
      <p className=" mb-10 text-sm">
        Unlock all game modes. Cancel at any time.
      </p>

      {/* Subscription Card */}
      <div className="bg-white p-6 rounded-xl shadow-md w-80 text-left">
        <h3 className="text-sm font-semibold text-black mb-1">PRO BASIC</h3>
        <p className="text-2xl font-bold text-black mb-1">119 BATH / MONTH</p>
        <p className="text-xs text-gray-500 mb-4">BILLED MONTHLY</p>

        <div className="space-y-4 text-sm text-gray-800">
          <div className="flex items-start gap-2">
            <span>🌍</span>
            <span>
              <strong>SINGLEPLAYER</strong>
              <br />
              Explore thousands of maps and travel the globe
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span>🏆</span>
            <span>
              <strong>MULTIPLAYER</strong>
              <br />
              Face off against players from all over the world
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span>🤝</span>
            <span>
              <strong>HOST PRIVATE PARTIES</strong>
              <br />
              Invite your friends to unlimited free live play
            </span>
          </div>
        </div>

        {/* Subscribe Button */}
        <div className="mt-8 text-center">
          <button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-full">
            SUBSCRIPTION
          </button>
        </div>
      </div>
    </div>
  );
}

export default Subscription;
