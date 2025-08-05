import { Navigate } from "react-router";
import useUserStore from "../stores/userStore";

const PublicRoute = ({ children }) => {
  const token = useUserStore((state) => state.token);

  // ถ้ามี Token (แปลว่า Login อยู่)
  if (token) {
    // ให้ redirect ไปที่หน้า Homepage
    return <Navigate to="/" replace />;
  }

  // ถ้าไม่มี Token, ให้แสดง Component ที่ต้องการได้เลย (เช่น หน้า Login)
  return children;
};

export default PublicRoute;