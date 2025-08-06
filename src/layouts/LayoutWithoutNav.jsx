import { Outlet } from "react-router"

function LayoutWithoutNav() {
  
  return (
    <div>
      <Outlet />
    </div>
  )
}
export default LayoutWithoutNav