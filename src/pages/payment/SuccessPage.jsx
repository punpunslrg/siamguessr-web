import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";

function SuccessPage() {
  const [searchParams] = useSearchParams();
  const [sessionId, setSessionId] = useState("");

  useEffect(() => {
    // ดึง session_id จาก URL (เช่น /success?session_id=cs_test_123)
    const sid = searchParams.get("session_id");
    if (sid) {
      setSessionId(sid);
      // ในอนาคต คุณสามารถใช้ session_id นี้เรียก API
      // เพื่อดึงข้อมูลการสั่งซื้อล่าสุดมาแสดงได้
      console.log("Stripe Session ID:", sid);
    }
  }, [searchParams]);
  return (
    <div className="text-center p-12 text-green-600">
      <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
      <p className="mb-1">Thank you for your subscription.</p>
      <p className="mb-4">
        Your account has been upgraded. You will receive an email confirmation
        shortly.
      </p>
      {sessionId && (
        <p className="text-xs text-gray-500 mb-4">Session ID: {sessionId}</p>
      )}
      <Link to="/homepageforsub" className="mt-5 inline-block text-blue-600 hover:underline">
        Back to Home
      </Link>
    </div>
  );
}
export default SuccessPage;
