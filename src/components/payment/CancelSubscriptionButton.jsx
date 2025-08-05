const CancelSubscriptionButton = ({ onConfirm, isCanceling }) => {
  return (
    <>
      <button 
        className="btn btn-error mt-5" 
        onClick={() => document.getElementById('cancel_modal').showModal()}
        disabled={isCanceling}
      >
        Cancel Subscription
      </button>
      <dialog id="cancel_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Confirm Cancellation</h3>
          <p className="py-4">
            Are you sure? Your access will remain active until the end of the current billing period.
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn mr-2">Close</button>
            </form>
            <button 
              className="btn btn-error" 
              onClick={onConfirm}
              disabled={isCanceling}
            >
              {isCanceling && <span className="loading loading-spinner"></span>}
              {isCanceling ? 'Processing...' : 'Yes, Cancel'}
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default CancelSubscriptionButton;