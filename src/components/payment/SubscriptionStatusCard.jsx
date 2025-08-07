import { Link } from "react-router";
import CancelSubscriptionButton from "./CancelSubscriptionButton";

const SubscriptionStatusCard = ({ subscription, onCancel, isCanceling }) => {
  if (!subscription) return null;

  // --- เพิ่ม: จัดการกรณีที่กำลังจะถูกยกเลิก ---
  if (subscription.isActive && subscription.willCancel) {
    const endDate = new Date(subscription.periodEndDate).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
    return (
      <div className="card bg-base-200 shadow-xl p-6">
        <p>Status: <span className="badge badge-warning">Pending Cancellation</span></p>
        <p className="mt-2">
          Your current plan: 
          <span className="font-bold capitalize ml-2">{subscription.tierName}</span>
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Your access will remain active until {endDate}. You will not be charged again.
        </p>
        {/* เราจะไม่แสดงปุ่ม Cancel อีก เพราะมันถูกยกเลิกไปแล้ว */}
      </div>
    );
  }

  // --- กรณี Active ปกติ ---
  if (subscription.isActive) {
    return (
      <div className="card bg-base-200 shadow-xl p-6">
        <p>Status: <span className="badge badge-success">Active</span></p>
        <p className="mt-2">
          Your current plan: 
          <span className="font-bold capitalize ml-2">{subscription.tierName}</span>
        </p>
        <CancelSubscriptionButton onConfirm={onCancel} isCanceling={isCanceling} />
      </div>
    );
  }

  // --- กรณี Inactive ---
  return (
    <div className="card bg-base-200 shadow-xl p-6">
      <p className="font-semibold">Status: <span className="text-red-500">Inactive</span></p>
      <p className="mt-2">You do not have an active subscription.</p>
      <Link to="/subscription" className="btn btn-primary mt-5 w-fit">Upgrade Now</Link>
    </div>
  );
};

export default SubscriptionStatusCard;