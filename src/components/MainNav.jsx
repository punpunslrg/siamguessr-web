import { Link, useNavigate } from "react-router";
import Logo7 from "../assets/Logo7.png";
// import authStore from "../stores/authStore";
import useUserStore from "../stores/userStore";
import { useEffect } from "react";
function MainNav() {
  const navigate = useNavigate();
  const logout = useUserStore((state) => state.logout);
  const user = useUserStore((state) => state.user);
  const hdlLogout = () => {
    logout();
    navigate("/login");
  };
  const getProfile = useUserStore((state) => state.getProfile);
  useEffect(() => {
    getProfile();
  }, [getProfile]);
  return (
    <>
      <></>
      <div className="flex justify-between bg-navbar px-12 py-2 sticky top-0 z-1000">
        <div className="flex gap-4 items-center ">
          <Link to="/" className="font-bold ">
            <img src={Logo7} className="w-40" />
          </Link>
          <Link to="/gamemode">Gameplay</Link>
          <Link to="/leaderboard">Leaderboard</Link>
          {/* ใช้เลือกหน้าชั่วคราว */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn m-1">
              Page
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-navbar rounded-box z-1 w-52 p-2 shadow-sm"
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
                <Link to="/gamehistory">GameHistory</Link>
                <Link to="/singlescore">SingleScore</Link>
                <Link to="/selectmode">SelectMode</Link>
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
          <div className="dropdown dropdown-end cursor-pointer">
            <div tabIndex={0} className=" bg-orange-500 w-12 h-12 rounded-full">
              <img
                src={user.image}
                alt={`${user.username}'s profile`}
                className="w-12 h-12 object-cover rounded-full"
              />
              <div
                aria-label="success"
                className="status status-success w-4 h-4 absolute bottom-0 right-0 border-[#112D4E] border-2 "
              ></div>
            </div>
            <ul
              tabIndex={0}
              className="bg-navbar gap-1 dropdown-content menu  rounded-box z-1 w-52 p-2 mt-2 shadow-sm "
            >
              <div className="pl-4 mb-2">
                {user?.username || "Loading..."} <br />
                <p className="text-gray-400">{user?.email}</p>
              </div>
              <hr className="border-gray-400" />
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/gamehistory">GameHistory</Link>
              </li>
              <button
                className="btn-primary font-semibold mt-2"
                onClick={hdlLogout}
              >
                Log out
              </button>
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
export default MainNav;
