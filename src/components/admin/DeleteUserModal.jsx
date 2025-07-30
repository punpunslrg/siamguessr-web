import { Trash2 } from "lucide-react";

const DeleteUserModal = ({ user, onConfirm, onCancel }) => (
  <div className="fixed inset-0 flex justify-center items-center z-50">
    <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md text-center">
      <div className="mx-auto bg-red-100 rounded-full h-16 w-16 flex items-center justify-center">
        <Trash2 className="text-red-600" size={32} />
      </div>
      <h3 className="text-xl font-bold mt-4 text-gray-800">
        Confirm User Deletion
      </h3>
      <p className="text-gray-600 mt-2">
        Are you sure you want to delete this user?{" "}
        <span className="font-semibold">{user.name}</span> <br /> All data will
        be permanently deleted and cannot be recovered.
      </p>
      <div className="mt-6 flex justify-center space-x-4">
        <button
          onClick={onCancel}
          className="px-6 py-2 rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-6 py-2 rounded-lg text-white bg-red-600 hover:bg-red-700"
        >
          Confirm Deletion
        </button>
      </div>
    </div>
  </div>
);

export default DeleteUserModal;
