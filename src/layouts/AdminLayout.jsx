import { Outlet } from "react-router"
import AdminNav from "../components/admin/AdminNav"
import AdminSidebar from "../components/admin/AdminSidebar"

function AdminLayout() {
  return (
    <div className="flex flex-col h-screen w-screen bg-gray-300">
        <AdminNav />
      <div className="flex flex-1">
        <AdminSidebar />
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
export default AdminLayout