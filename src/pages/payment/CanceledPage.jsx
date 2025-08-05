import { Link } from "react-router";

function CanceledPage() {
  return (
    <div className="text-center p-12 text-red-600">
      <h1 className="text-2xl font-bold mb-2">Order Canceled</h1>
      <p className="mb-1">Your payment process was canceled.</p>
      <p className="mb-4">
        You can continue to shop around and checkout when you're ready.
      </p>
      <Link to="/" className="mt-5 inline-block text-blue-600 hover:underline">
        Back to Home
      </Link>
    </div>
  );
}
export default CanceledPage;
