import React, { useState } from "react";

const EditUserModal = ({ user, onSave, onCancel }) => {
  const [status, setStatus] = useState(user.status);

  const handleSave = () => {
    onSave({ ...user, status });
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg">
        <h3 className="text-xl font-bold mb-6 text-gray-800">Edit User</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="pending">Pending</option>
              <option value="active">Active</option>
              <option value="banned">Banned</option>
            </select>
          </div>
        </div>
        <div className="mt-8 flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-6 py-2 rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
