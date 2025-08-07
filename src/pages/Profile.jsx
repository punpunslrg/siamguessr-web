import { useEffect, useState } from "react";
import useUserStore from "../stores/userStore";
import { Pencil } from "lucide-react";
import EditProfileModal from "../components/form/EditProfileModal";
import SubscriptionStatusCard from "../components/payment/SubscriptionStatusCard";
import useSubscriptionStore from "../stores/subscriptionStore";
import useGameHistoryStore from "../stores/gameHistoryStore";

const Profile = () => {
  const user = useUserStore((state) => state.user);
  const {
    subscription,
    isLoading,
    isCanceling,
    error,
    fetchSubscriptionStatus,
    cancelSubscription,
  } = useSubscriptionStore();
  const getProfile = useUserStore((state) => state.getProfile);
  const {
    singleplayerHistory,
    multiplayerHistory,
    fetchSingleplayerHistory,
    fetchMultiplayerHistory,
  } = useGameHistoryStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  useEffect(() => {
    fetchSubscriptionStatus(),
      fetchMultiplayerHistory(),
      fetchSingleplayerHistory();
  }, [
    fetchSubscriptionStatus,
    fetchMultiplayerHistory,
    fetchSingleplayerHistory,
  ]);

  const renderSubscriptionSection = () => {
    if (isLoading) {
      return <div className="skeleton h-32 w-full"></div>;
    }
    if (error) {
      return (
        <div className="text-error">Error loading subscription: {error}</div>
      );
    }
    return (
      <SubscriptionStatusCard
        subscription={subscription}
        onCancel={cancelSubscription}
        isCanceling={isCanceling}
      />
    );
  };

  // ------------------------ calculation zone ----------------------------------
  //----------------------- singleplayer ------------------------------------
  const singleClassicScore = singleplayerHistory
    .filter((g) => g.room?.difficulty === "classic")
    .map((g) => g.score);

  const avgSingleClassicScore = singleClassicScore.length
    ? (
        singleClassicScore.reduce((sum, user) => sum + user, 0) /
        singleClassicScore.length
      ).toFixed(0)
    : "-";

  const maxSingleClassicScore = singleClassicScore.length
    ? Math.max(...singleClassicScore)
    : "-";

  const singleChallengeScores = singleplayerHistory
    .filter((g) => g.room?.difficulty === "challenge")
    .map((g) => g.score);

  const avgSingleChallengeScore = singleChallengeScores.length
    ? (
        singleChallengeScores.reduce((sum, user) => sum + user, 0) /
        singleChallengeScores.length
      ).toFixed(0)
    : "-";

  const maxSingleChallengeScore = singleChallengeScores.length
    ? Math.max(...singleChallengeScores)
    : "-";
  //----------------------- singleplayer ------------------------------------
  //----------------------- multiplayer -------------------------------------
  const multiClassicScore = multiplayerHistory
    .filter((g) => g.room?.difficulty === "classic")
    .map((g) => g.user);

  const multiChallengeScore = multiplayerHistory
    .filter((g) => g.room?.difficulty === "challenge")
    .map((g) => g.user);

  const winRateMultiClassicScore =
    multiClassicScore[0]?.winRate[0]?.winPercentage;

    const winMultiClassicScore = multiChallengeScore[0]?.winRate[0]?.wins
    const lossMultiClassicScore = multiChallengeScore[0]?.winRate[0]?.losses
    const drawMultiClassicScore = multiChallengeScore[0]?.winRate[0]?.draws
    
    const winRateMultiChallengeScore =
    multiChallengeScore[0]?.winRate[1]?.winPercentage;

    const winMultiChallengeScore = multiChallengeScore[0]?.winRate[0]?.wins
    const lossMultiChallengeScore = multiChallengeScore[0]?.winRate[0]?.losses
    const drawMultiChallengeScore = multiChallengeScore[0]?.winRate[0]?.draws
    
  //----------------------- multiplayer -------------------------------------
  // ------------------------ calculation zone ----------------------------------

  return (
    <div className=" flex justify-center items-center bg-primary">
      <div className="w-fit h-fit mx-auto bg-white rounded-lg shadow-lg mt-8 p-6 md:p-8 ">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8 pb-8 border-b border-gray-200">
          {/* Profile Image */}
          <div className="relative w-36 h-36 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center border-4 border-gray-300 shadow-md">
            {user?.image ? (
              <img
                src={user.image}
                alt={`${user.username}'s profile`}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-500 text-sm">No Image</span>
            )}
          </div>

          {/* Username and Edit Profile */}
          <div className="flex flex-col items-center md:items-start mt-4 md:mt-0">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
              {user?.username || "Loading..."}
            </h1>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300 ease-in-out shadow-md hover:shadow-lg"
            >
              <Pencil />
              <span>Edit Profile</span>
            </button>
          </div>
        </div>

        {/* เพิ่ม Section ใหม่สำหรับ Subscription */}
        <div className="pt-8">
          <h2 className="text-xl font-bold text-gray-700 mb-6 uppercase tracking-wider">
            My Subscription
          </h2>
          {renderSubscriptionSection()}
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
                SINGLEPLAYER
              </h3>
              <p className="text-2xl font-bold text-gray-900 mb-4">CLASSIC</p>
              <p className="text-5xl font-extrabold text-blue-600 mb-4">
                {singleClassicScore.length}
              </p>
              <div className="flex justify-around w-full text-gray-600">
                <div className="flex flex-col items-center">
                  <span className="font-semibold text-xl">
                    {avgSingleClassicScore}
                  </span>
                  <span className="text-sm">AVG. SCORE</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-semibold text-xl">
                    {maxSingleClassicScore}
                  </span>
                  <span className="text-sm">MAX SCORE</span>
                </div>
              </div>
            </div>

            {/* Card: All Time High Rating */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">
                SINGLEPLAYER
              </h3>
              <p className="text-2xl font-bold text-gray-900 mb-4">CHALLENGE</p>
              <p className="text-5xl font-extrabold text-blue-600 mb-4">
                {singleChallengeScores.length}
              </p>
              <div className="flex justify-around w-full text-gray-600">
                <div className="flex flex-col items-center">
                  <span className="font-semibold text-xl">
                    {avgSingleChallengeScore}
                  </span>
                  <span className="text-sm">AVG. SCORE</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-semibold text-xl">
                    {maxSingleChallengeScore}
                  </span>
                  <span className="text-sm">MAX SCORE</span>
                </div>
              </div>
            </div>

            {/* Card: Win Ratio Duels */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">
                MULTIPLAYER
              </h3>
              <p className="text-2xl font-bold text-gray-900 mb-4">CLASSIC</p>
              <p className="text-5xl font-extrabold text-green-600 mb-4">
                {winRateMultiClassicScore !== undefined && winRateMultiClassicScore !== null ? `${winRateMultiClassicScore?.toFixed(1)} %` : "-"}
              </p>
              <div className="flex flex-col items-center w-full text-gray-600">
                <div className="flex justify-around w-full text-sm mb-2">
                  <span>WINRATE</span>
                </div>
                <div className="flex justify-around w-full text-lg font-semibold">
                  <span>
                    {winMultiClassicScore} <span className="text-sm font-normal">WINS</span> /&nbsp;
                  </span>
                  <span>
                    {lossMultiClassicScore} <span className="text-sm font-normal">LOSS</span> /&nbsp;
                  </span>
                  <span>
                    {drawMultiClassicScore} <span className="text-sm font-normal">DRAW</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Card: Win Ratio Team Duels */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">
                MULTIPLAYER
              </h3>
              <p className="text-2xl font-bold text-gray-900 mb-4">CHALLENGE</p>
              <p className="text-5xl font-extrabold text-green-600 mb-4">
                {winRateMultiChallengeScore !== undefined && winRateMultiClassicScore !== null ? `${winRateMultiChallengeScore?.toFixed(1)} %` : "-"}
              </p>
              <div className="flex flex-col items-center w-full text-gray-600">
                <div className="flex justify-around w-full text-sm mb-2">
                  <span>WINRATE</span>
                </div>
                <div className="flex justify-around w-full text-lg font-semibold">
                  <span>
                    {winMultiChallengeScore} <span className="text-sm font-normal">WINS</span> /&nbsp;
                  </span>
                  <span>
                    {lossMultiChallengeScore} <span className="text-sm font-normal">LOSS</span> /&nbsp;
                  </span>
                  <span>
                    {drawMultiChallengeScore} <span className="text-sm font-normal">DRAW</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <EditProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={user}
      />
    </div>
  );
};

export default Profile;
