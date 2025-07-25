import { Link, useNavigate } from "react-router";
import Logo from "../../assets/Logo3.png";
import useUserStore from "../../stores/userStore";

function AdminNav() {
  const navigate = useNavigate();
  const logout = useUserStore((state) => state.logout);

  const hdlLogout = () => {
    logout();
    navigate("/admin/login");
  };
  return (
    <div className="flex justify-between bg-[#112D4E] text-white px-12 py-2">
      <div className="flex gap-4 items-center">
        <Link to="/" className="font-bold ">
          <img src={Logo} className="w-12" />
        </Link>
      </div>

      <button
        className="bg-red-500 text-white px-2 font-semibold rounded-full hover:bg-red-400"
        onClick={hdlLogout}
      >
        Log out
      </button>
    </div>
  );
}
export default AdminNav;
