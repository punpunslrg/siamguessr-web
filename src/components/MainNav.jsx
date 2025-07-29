import { Link, useNavigate } from "react-router";
import useUserStore from "../stores/userStore";
import Logo7 from "../assets/Logo7.png";
function MainNav() {
  const navigate = useNavigate();
  const logout = useUserStore((state) => state.logout);
  const user = useUserStore((state) => state.user);
  const hdlLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <div className="flex justify-between bg-[#112D4E] text-white px-12 py-2 ">
      <div className="flex gap-4 items-center ">
        <Link to="/" className="font-bold ">
          <img src={Logo7} className="w-40" />
        </Link>
        <Link to="/">Home</Link>
        <Link to="/gameplay">Gameplay</Link>
        {/* ใช้เลือกหน้าชั่วคราว */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn m-1">
            Page
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-black text-white rounded-box z-1 w-52 p-2 shadow-sm"
          >
            <li>
              <Link to="/round">Round</Link>
              <Link to="/homepagefree">HomePageFree</Link>
              <Link to="/subscription">Subscription</Link>
              <Link to="/profile">Profile</Link>
              <Link to="/lobby">Lobby</Link>
              <Link to="/gamemode">GameMode</Link>
              <Link to="/leaderboard">Leaderboard</Link>
              <Link to="/gamebreakdown">GameBreakdown</Link>
              <Link to="/homepageforsub">HomePageForSub</Link>
              <Link to="/singlescore">SingleScore</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Right */}
      {!user ? (
        <div className="flex gap-4 items-center ">
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
