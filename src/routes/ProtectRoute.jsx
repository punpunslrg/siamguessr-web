import { useEffect, useState } from "react";
import { getMe } from "../api/userApi";
import useUserStore from "../stores/userStore";
import { Navigate } from "react-router";

function ProtectRoute({ el, allows }) {
  const [ok, setOk] = useState(null);
  const token = useUserStore((state) => state.token);

  useEffect(() => {
    // แก้ไขให้ checkPermission ทำงานต่อเมื่อมี token เท่านั้น
    if (token) {
      checkPermission();
    } else {
      // ถ้าไม่มี token เลย ให้ตั้งค่าว่าไม่ได้รับอนุญาต
      setOk(false);
    }
  }, [token]);

  const checkPermission = async () => {
    try {
      const res = await getMe(token);
      const role = res.data.user.role;

      setOk(allows.includes(role));
    } catch (error) {
      setOk(false);
      console.log(error);
    }
  };
  if (ok === null && token) {
    return <h1>Loading...</h1>;
  }

  // ถ้าไม่มี token ให้ส่งไปหน้า login ทันที
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  // ถ้ามี token แต่ไม่มีสิทธิ์ ให้แสดง Unauthorization หรือส่งไปหน้าแรก
  if (!ok) {
    // return <h1>Unauthorization...</h1>;
    return <Navigate to="/" replace />; // ส่งไปหน้าแรก
  }

  return el;
}
export default ProtectRoute;
