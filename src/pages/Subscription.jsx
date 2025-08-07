import { useEffect, useState } from "react";
import useUserStore from "../stores/userStore";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { createCheckoutSessionApi } from "../api/subscriptionApi";

function Subscription() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      toast.error("Please log in to subscribe.");
      navigate("/login");
    }
  }, [user, navigate]);

  const hdlCheckout = async () => {
    if (!user || !user.id) {
      toast.error("User information is missing. Please try logging in again.");
      return;
    }

    setIsLoading(true);
    setError(null);

    // --- ข้อมูลจำลอง ---
    // ในแอปพลิเคชันจริง คุณต้องมีวิธีเลือก Tier และรู้ว่าใคร Login อยู่
    // เช่น ดึง userId จาก Zustand Store หรือ Context API
    const checkoutData = {
      priceId: "price_1RrDvkGrzg3Hq6W5zImzX34N", // Price ID ของ Pro Plan จาก Stripe
      userId: user.id, 
    };

    try {
      // 1. เรียก API ของ Backend ที่เราสร้างไว้ (มี /api นำหน้า)
      const response = await createCheckoutSessionApi(checkoutData);

      const stripeCheckoutUrl = response.url;

      if (stripeCheckoutUrl) {
        window.location.href = stripeCheckoutUrl;
      } else {
        throw new Error("Could not retrieve the checkout URL.");
      }
    } catch (err) {
      console.error("Checkout Error:", err);
      const errMsg = err.response?.data?.error || err.message;
      setError(errMsg);
      toast.error(errMsg);
      setIsLoading(false);
    }
  };
  return (
    <div className="bg-primary flex flex-col items-center justify-center h-full">
      {/* Heading */}
      <h1 className="text-5xl text-yellow-400 font-bold  mb-4 ">
        Choose your preferred plan
      </h1>
      <p className=" mb-10 text-sm text-white">
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
          <button
            onClick={hdlCheckout}
            disabled={isLoading}
            className="btn-secondary"
          >
            {isLoading ? "Processing..." : "SUBSCRIPTION"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Subscription;
