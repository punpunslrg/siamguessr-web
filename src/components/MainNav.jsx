import { Link } from "react-router";
import Logo from "../assets/Logo3.png";
function MainNav() {
  return (
    <div className="flex justify-between bg-[#112D4E] text-white px-12 py-2">
      <div className="flex gap-4 items-center">
        <Link to="/" className="font-bold ">
          <img src={Logo} className="w-12" />
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
            className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
          >
            <li>
              <Link to="/round">Round</Link>
              <Link to="/homepagefree">HomePageFree</Link>
              <Link to="/subscription">Subscription</Link>
              <Link to="/profile">Profile</Link>
              <Link to="/lobby">Lobby</Link>
              <Link to="/gamemode">GameMode</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}
export default MainNav;
