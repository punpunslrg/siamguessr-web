import { useEffect, useState } from "react";
import {
  Users,
  ShieldX,
  Edit,
  Trash2,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import BanUserModal from "@/src/components/admin/BanUserModal";
import EditUserModal from "@/src/components/admin/EditUserModal";
import DeleteUserModal from "@/src/components/admin/DeleteUserModal";
import useUserStore from "@/src/stores/userStore";
import { toast } from "react-toastify";

// การ์ดแสดงข้อมูลสรุป
const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4">
    <div className={`p-3 rounded-full ${color}`}>{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

export default function Dashboard() {
  const allUsers = useUserStore((state) => state.allUsers);
  const getAllUsers = useUserStore((state) => state.getAllUsers);
  const token = useUserStore((state) => state.token);
  const updateUserByAdmin = useUserStore((state) => state.updateUserByAdmin);
  const deleteUserByAdmin = useUserStore((state) => state.deleteUserByAdmin);

  const [loading, setLoading] = useState(true);
  // const [users, setUsers] = useState([]);
  const [userToBan, setUserToBan] = useState(null);
  const [userToEdit, setUserToEdit] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);

  // เรียก API เพื่อดึงข้อมูล user เมื่อ component ถูกโหลด
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      await getAllUsers();
      setLoading(false);
    };

    if (token) {
      fetchUsers();
    }
  }, [token, getAllUsers]);

  const handleBanClick = (user) => setUserToBan(user);
  const handleEditClick = (user) => setUserToEdit(user);
  const handleDeleteClick = (user) => setUserToDelete(user);

  const confirmBan = () => {
    setUsers(
      users.map((u) => (u.id === userToBan.id ? { ...u, status: "banned" } : u))
    );
    console.log(`User ${userToBan.username} has been banned.`);
    setUserToBan(null);
  };

  const handleSaveChanges = async (updatedUserFromModal) => {
    setUserToEdit(null);
    const userId = updatedUserFromModal.id;
    const dataToUpdate = {
      status: updatedUserFromModal.status,
    };
    // เรียก Action จาก Store เพื่ออัปเดตข้อมูล
    const result = await updateUserByAdmin(userId, dataToUpdate);
    if (result.success) {
      toast.success("User updated successfully!");
    } else {
      toast.error(`Error: ${result.message}`);
    }
  };

  const confirmDelete = async () => {
    if (!userToDelete) return;

    const userId = userToDelete.id;
    setUserToDelete(null);

    const result = await deleteUserByAdmin(userId);

    if (result.success) {
      toast.success("User deleted successfully!");
    } else {
      toast.error(`Error: ${result.message}`);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Users Management
      </h1>

      {/* ส่วนของการ์ดสรุปข้อมูล */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Users"
          value={allUsers.length}
          icon={<Users className="text-blue-600" />}
          color="bg-blue-100"
        />
        <StatCard
          title="Banned Users"
          value={
            allUsers.filter((u) => u.status.toLowerCase() === "banned").length
          }
          icon={<ShieldX className="text-red-600" />}
          color="bg-red-100"
        />
      </div>

      {/* ส่วนของตารางข้อมูล */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 sm:mb-0">
            Users List
          </h2>
          <div className="relative w-full sm:w-auto">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search users..."
              className="pl-10 pr-4 py-2 w-full sm:w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* ตาราง */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 font-semibold text-gray-600">Users</th>
                <th className="p-4 font-semibold text-gray-600">Email</th>
                <th className="p-4 font-semibold text-gray-600">Join Date</th>
                <th className="p-4 font-semibold text-gray-600">Status</th>
                <th className="p-4 font-semibold text-gray-600 text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="p-4 flex items-center space-x-3">
                    <img src={user.image} className="w-10 h-10 rounded-full" />
                    <span className="font-medium text-gray-800">
                      {user.username}
                    </span>
                  </td>
                  <td className="p-4 text-gray-600">{user.email}</td>
                  <td className="p-4 text-gray-600">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <span
                      className={`capitalize px-3 py-1 text-xs font-semibold rounded-full ${
                        user.status.toLowerCase() !== "banned"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex justify-center items-center space-x-2">
                      <button
                        onClick={() => handleEditClick(user)}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-full"
                        title="Edit"
                      >
                        <Edit size={18} />
                      </button>
                      {user.status.toLowerCase() !== "banned" && (
                        <button
                          onClick={() => handleBanClick(user)}
                          className="p-2 text-orange-600 hover:bg-orange-100 rounded-full"
                          title="Ban"
                        >
                          <ShieldX size={18} />
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteClick(user)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-full"
                        title="delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
          <span>Showing 1-10 of {allUsers.length} users</span>
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-200 rounded-md">
              <ChevronLeft size={16} />
            </button>
            <span className="px-3 py-1 bg-blue-600 text-white rounded-md">
              1
            </span>
            <button className="p-2 hover:bg-gray-200 rounded-md">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Render Modals */}
      {userToBan && (
        <BanUserModal
          user={userToBan}
          onConfirm={confirmBan}
          onCancel={() => setUserToBan(null)}
        />
      )}
      {userToEdit && (
        <EditUserModal
          user={userToEdit}
          onSave={handleSaveChanges}
          onCancel={() => setUserToEdit(null)}
        />
      )}
      {userToDelete && (
        <DeleteUserModal
          user={userToDelete}
          onConfirm={confirmDelete}
          onCancel={() => setUserToDelete(null)}
        />
      )}
    </div>
  );
}
