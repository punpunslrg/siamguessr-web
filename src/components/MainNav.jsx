import { Link, useNavigate } from "react-router";
import useUserStore from "../stores/userStore";

function MainNav() {
  const navigate = useNavigate();
  const logout = useUserStore((state) => state.logout);
  const user = useUserStore((state) => state.user);
  const hdlLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <div className="flex justify-between bg-black text-white px-8 py-2">
      {/* Left */}
      <div className="flex gap-4">
        <Link to="/" className="font-bold">
          LOGO
        </Link>
        <Link to="/">Home</Link>
        <Link to="/gameplay">Gameplay</Link>
      </div>

      {/* Right */}
      {!user ? (
        <div className="flex gap-4">
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </div>
      ) : (
        <button
          className="bg-red-500 text-white font-semibold rounded-full hover:bg-red-400"
          onClick={hdlLogout}
        >
          Log out
        </button>
      )}
    </div>
  );
}
export default MainNav;
