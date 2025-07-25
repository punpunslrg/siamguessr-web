import React, { useState } from 'react';
// ติดตั้งไอคอน: npm install lucide-react
import { Users, ShieldX, Edit, Trash2, Search, ChevronLeft, ChevronRight } from 'lucide-react';

// Mock Data สำหรับแสดงผล
const mockPlayers = [
  { id: 1, name: 'John Doe', avatar: 'https://placehold.co/40x40/E4D9FF/4F46E5?text=JD', email: 'john.doe@example.com', joinDate: '2024-07-20', status: 'Active' },
  { id: 2, name: 'Jane Smith', avatar: 'https://placehold.co/40x40/FFD9E4/E5466A?text=JS', email: 'jane.smith@example.com', joinDate: '2024-07-19', status: 'Active' },
  { id: 3, name: 'Mike Johnson', avatar: 'https://placehold.co/40x40/D9FFDB/46E54F?text=MJ', email: 'mike.j@example.com', joinDate: '2024-07-18', status: 'Banned' },
  { id: 4, name: 'Emily Davis', avatar: 'https://placehold.co/40x40/FFF5D9/E5C046?text=ED', email: 'emily.davis@example.com', joinDate: '2024-07-17', status: 'Active' },
  { id: 5, name: 'Chris Lee', avatar: 'https://placehold.co/40x40/D9F8FF/46D9E5?text=CL', email: 'chris.lee@example.com', joinDate: '2024-07-16', status: 'Active' },
];

// --- Components ย่อย ---

// การ์ดแสดงข้อมูลสรุป
const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4">
    <div className={`p-3 rounded-full ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

// Modal สำหรับยืนยันการแบน
const BanConfirmationModal = ({ player, onConfirm, onCancel }) => (
  <div className="fixed inset-0 flex justify-center items-center z-50">
    <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md text-center">
      <div className="mx-auto bg-red-100 rounded-full h-16 w-16 flex items-center justify-center">
        <ShieldX className="text-red-600" size={32} />
      </div>
      <h3 className="text-xl font-bold mt-4 text-gray-800">ยืนยันการแบนผู้เล่น</h3>
      <p className="text-gray-600 mt-2">
        คุณแน่ใจหรือไม่ว่าต้องการแบน <span className="font-semibold">{player.name}</span>? <br/> ผู้เล่นจะไม่สามารถเข้าสู่ระบบได้อีก
      </p>
      <div className="mt-6 flex justify-center space-x-4">
        <button onClick={onCancel} className="px-6 py-2 rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300">
          ยกเลิก
        </button>
        <button onClick={onConfirm} className="px-6 py-2 rounded-lg text-white bg-red-600 hover:bg-red-700">
          ยืนยันการแบน
        </button>
      </div>
    </div>
  </div>
);

// Modal สำหรับแก้ไขข้อมูล
const EditPlayerModal = ({ player, onSave, onCancel }) => {
    const [name, setName] = useState(player.name);
    const [email, setEmail] = useState(player.email);

    const handleSave = () => {
        onSave({ ...player, name, email });
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg">
                <h3 className="text-xl font-bold mb-6 text-gray-800">แก้ไขข้อมูลผู้เล่น</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">ชื่อผู้เล่น</label>
                        <input 
                            type="text" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">อีเมล</label>
                        <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>
                <div className="mt-8 flex justify-end space-x-4">
                    <button onClick={onCancel} className="px-6 py-2 rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300">
                        ยกเลิก
                    </button>
                    <button onClick={handleSave} className="px-6 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700">
                        บันทึกการเปลี่ยนแปลง
                    </button>
                </div>
            </div>
        </div>
    );
};

// Modal สำหรับยืนยันการลบ (เพิ่มใหม่)
const DeleteConfirmationModal = ({ player, onConfirm, onCancel }) => (
  <div className="fixed inset-0 flex justify-center items-center z-50">
    <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md text-center">
      <div className="mx-auto bg-red-100 rounded-full h-16 w-16 flex items-center justify-center">
        <Trash2 className="text-red-600" size={32} />
      </div>
      <h3 className="text-xl font-bold mt-4 text-gray-800">ยืนยันการลบผู้เล่น</h3>
      <p className="text-gray-600 mt-2">
        คุณแน่ใจหรือไม่ว่าต้องการลบ <span className="font-semibold">{player.name}</span>? <br/> ข้อมูลจะถูกลบอย่างถาวรและไม่สามารถกู้คืนได้
      </p>
      <div className="mt-6 flex justify-center space-x-4">
        <button onClick={onCancel} className="px-6 py-2 rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300">
          ยกเลิก
        </button>
        <button onClick={onConfirm} className="px-6 py-2 rounded-lg text-white bg-red-600 hover:bg-red-700">
          ยืนยันการลบ
        </button>
      </div>
    </div>
  </div>
);


// --- Component หลักของหน้า Dashboard ---
export default function Dashboard() {
  const [players, setPlayers] = useState(mockPlayers);
  const [playerToBan, setPlayerToBan] = useState(null);
  const [playerToEdit, setPlayerToEdit] = useState(null);
  const [playerToDelete, setPlayerToDelete] = useState(null); // State สำหรับการลบ

  const handleBanClick = (player) => {
    setPlayerToBan(player);
  };

  const handleEditClick = (player) => {
    setPlayerToEdit(player);
  };
  
  const handleDeleteClick = (player) => { // ฟังก์ชันเมื่อคลิกปุ่มลบ
    setPlayerToDelete(player);
  };

  const confirmBan = () => {
    setPlayers(players.map(p => p.id === playerToBan.id ? { ...p, status: 'Banned' } : p));
    console.log(`Player ${playerToBan.name} has been banned.`);
    setPlayerToBan(null);
  };
  
  const handleSaveChanges = (updatedPlayer) => {
    setPlayers(players.map(p => p.id === updatedPlayer.id ? updatedPlayer : p));
    console.log(`Player ${updatedPlayer.name} has been updated.`);
    setPlayerToEdit(null);
  };

  const confirmDelete = () => { // ✨ ฟังก์ชันยืนยันการลบ
    setPlayers(players.filter(p => p.id !== playerToDelete.id));
    console.log(`Player ${playerToDelete.name} has been deleted.`);
    setPlayerToDelete(null);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">จัดการผู้เล่น</h1>

      {/* ส่วนของการ์ดสรุปข้อมูล */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="ผู้เล่นทั้งหมด" value={players.length} icon={<Users className="text-blue-600" />} color="bg-blue-100" />
        <StatCard title="ถูกแบน" value={players.filter(p => p.status === 'Banned').length} icon={<ShieldX className="text-red-600" />} color="bg-red-100" />
      </div>

      {/* ส่วนของตารางข้อมูล */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 sm:mb-0">รายชื่อผู้เล่น</h2>
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="ค้นหาผู้เล่น..."
              className="pl-10 pr-4 py-2 w-full sm:w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* ตาราง */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 font-semibold text-gray-600">ชื่อผู้เล่น</th>
                <th className="p-4 font-semibold text-gray-600">อีเมล</th>
                <th className="p-4 font-semibold text-gray-600">วันที่สมัคร</th>
                <th className="p-4 font-semibold text-gray-600">สถานะ</th>
                <th className="p-4 font-semibold text-gray-600 text-center">การกระทำ</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player) => (
                <tr key={player.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="p-4 flex items-center space-x-3">
                    <img src={player.avatar} alt={player.name} className="w-10 h-10 rounded-full" />
                    <span className="font-medium text-gray-800">{player.name}</span>
                  </td>
                  <td className="p-4 text-gray-600">{player.email}</td>
                  <td className="p-4 text-gray-600">{player.joinDate}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      player.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {player.status}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex justify-center items-center space-x-2">
                        <button onClick={() => handleEditClick(player)} className="p-2 text-blue-600 hover:bg-blue-100 rounded-full" title="แก้ไข">
                            <Edit size={18} />
                        </button>
                        {player.status === 'Active' && (
                            <button onClick={() => handleBanClick(player)} className="p-2 text-orange-600 hover:bg-orange-100 rounded-full" title="แบน">
                                <ShieldX size={18} />
                            </button>
                        )}
                        <button onClick={() => handleDeleteClick(player)} className="p-2 text-red-600 hover:bg-red-100 rounded-full" title="ลบ">
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
            <span>แสดง 1-5 จาก {players.length} รายการ</span>
            <div className="flex items-center space-x-2">
                <button className="p-2 hover:bg-gray-200 rounded-md"><ChevronLeft size={16}/></button>
                <span className="px-3 py-1 bg-blue-600 text-white rounded-md">1</span>
                <button className="p-2 hover:bg-gray-200 rounded-md"><ChevronRight size={16}/></button>
            </div>
        </div>
      </div>

      {/* Render Modals */}
      {playerToBan && <BanConfirmationModal player={playerToBan} onConfirm={confirmBan} onCancel={() => setPlayerToBan(null)} />}
      {playerToEdit && <EditPlayerModal player={playerToEdit} onSave={handleSaveChanges} onCancel={() => setPlayerToEdit(null)} />}
      {playerToDelete && <DeleteConfirmationModal player={playerToDelete} onConfirm={confirmDelete} onCancel={() => setPlayerToDelete(null)} />}
    </div>
  );
}