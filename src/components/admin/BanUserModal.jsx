import { ShieldX } from 'lucide-react';

const BanUserModal = ({ player, onConfirm, onCancel }) => (
  <div className="fixed inset-0 flex justify-center items-center z-50">
    <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md text-center">
      <div className="mx-auto bg-red-100 rounded-full h-16 w-16 flex items-center justify-center">
        <ShieldX className="text-red-600" size={32} />
      </div>
      <h3 className="text-xl font-bold mt-4 text-gray-800">Confirm User Ban</h3>
      <p className="text-gray-600 mt-2">
        Are you sure you want to ban this user? <span className="font-semibold">{player.name}</span> <br/> They will no longer be able to log in.
      </p>
      <div className="mt-6 flex justify-center space-x-4">
        <button onClick={onCancel} className="px-6 py-2 rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300">
          Cancel
        </button>
        <button onClick={onConfirm} className="px-6 py-2 rounded-lg text-white bg-red-600 hover:bg-red-700">
          Confirm Ban
        </button>
      </div>
    </div>
  </div>
);

export default BanUserModal