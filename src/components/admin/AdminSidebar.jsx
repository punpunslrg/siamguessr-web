import { Link } from "react-router";
import {UsersRound} from "lucide-react"

function AdminSidebar() {
  return (
    <div className="w-48 min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 p-4 space-y-6 pt-30">
      <div className="flex items-center gap-3 text-white cursor-pointer">
        <UsersRound />
        
        <Link>Users</Link>
      </div>
    </div>
  );
}
export default AdminSidebar;
