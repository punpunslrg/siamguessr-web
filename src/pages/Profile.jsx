const Profile = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8 pb-8 border-b border-gray-200">
          <div className="relative w-36 h-36 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center border-4 border-gray-300 shadow-md">
            <span className="text-gray-500 text-sm">150x150</span>
          </div>

          {/* Username and Edit Profile */}
          <div className="flex flex-col items-center md:items-start mt-4 md:mt-0">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
              Username
            </h1>
            <button className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300 ease-in-out shadow-md hover:shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zm-3.109 4.887l-.462 2.651 2.651-.462c.115-.66.309-1.296.58-1.896-.28-.27-.58-.52-.89-.75l-.46-.46zm-2.121 2.121l-3.536 3.536A2 2 0 015 17.071V15h2.071l3.536-3.536-2.121-2.121z" />
              </svg>
              <span>Edit Profile</span>
            </button>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="pt-8">
          <h2 className="text-xl font-bold text-gray-700 mb-6 uppercase tracking-wider">
            Statistics
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card: Completed Games Classic */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">
                COMPLETED GAMES
              </h3>
              <p className="text-2xl font-bold text-gray-900 mb-4">CLASSIC</p>
              <p className="text-5xl font-extrabold text-blue-600 mb-4">0</p>
              <div className="flex justify-around w-full text-gray-600">
                <div className="flex flex-col items-center">
                  <span className="font-semibold text-xl">0</span>
                  <span className="text-sm">AVG. SCORE</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-semibold text-xl">0</span>
                  <span className="text-sm">MAX SCORE</span>
                </div>
              </div>
            </div>

            {/* Card: All Time High Rating */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">
                ALL TIME HIGH
              </h3>
              <p className="text-2xl font-bold text-gray-900 mb-4">RATING</p>
              <p className="text-5xl font-extrabold text-blue-600 mb-4">-</p>
              <div className="flex justify-around w-full text-gray-600 text-sm">
                <span>ALL</span>
                <span>MOVING</span>
                <span>NO MOVE</span>
                <span>HMPZ</span>
              </div>
            </div>

            {/* Card: Win Ratio Duels */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">
                WIN RATIO
              </h3>
              <p className="text-2xl font-bold text-gray-900 mb-4">DUELS</p>
              <p className="text-5xl font-extrabold text-green-600 mb-4">
                0.00%
              </p>
              <div className="flex flex-col items-center w-full text-gray-600">
                <div className="flex justify-around w-full text-sm mb-2">
                  <span>ALL</span>
                  <span>MOVING</span>
                  <span>NO MOVE</span>
                  <span>HMPZ</span>
                </div>
                <div className="flex justify-around w-full text-lg font-semibold">
                  <span>
                    0 <span className="text-sm font-normal">PLAYER</span>
                  </span>
                  <span>
                    0 <span className="text-sm font-normal">WINS</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Card: Win Ratio Team Duels */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">
                WIN RATIO
              </h3>
              <p className="text-2xl font-bold text-gray-900 mb-4">
                TEAM DUELS
              </p>
              <p className="text-5xl font-extrabold text-green-600 mb-4">
                0.00%
              </p>
              <div className="flex flex-col items-center w-full text-gray-600">
                <div className="flex justify-around w-full text-sm mb-2">
                  <span>ALL</span>
                  <span>MOVING</span>
                  <span>NO MOVE</span>
                  <span>HMPZ</span>
                </div>
                <div className="flex justify-around w-full text-lg font-semibold">
                  <span>
                    0 <span className="text-sm font-normal">PLAYER</span>
                  </span>
                  <span>
                    0 <span className="text-sm font-normal">WINS</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
