import { Link, useNavigate, useLocation } from "react-router";
import Logo7 from "../assets/Logo7.png";
import useUserStore from "../stores/userStore";
import { useEffect } from "react";
function MainNav() {
  const location = useLocation();
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
      <div className="flex justify-between bg-navbar px-12 py-5 sticky top-0 z-1000">
        <div className="flex gap-6 items-center ">
          <Link to="/" className="font-bold ">
            <img src={Logo7} className="w-40" />
          </Link>
          <Link to="/guidebook">
            <p className="text-xl group relative w-max cursor-pointer ">
              <span>Guides</span>
              <span className="hover-line-l"></span>
              <span className="hover-line-r"></span>
            </p>
          </Link>
          <Link to="/leaderboard">
            <p className="text-xl group relative w-max cursor-pointer ">
              <span>Leaderboard</span>
              <span className="hover-line-l"></span>
              <span className="hover-line-r"></span>
            </p>
          </Link>
          <Link to="/aboutus">
            <p className="text-xl group relative w-max cursor-pointer ">
              <span>About Us</span>
              <span className="hover-line-l"></span>
              <span className="hover-line-r"></span>
            </p>
          </Link>
        </div>

        {/* Right */}
        {!user ? (
          <div className="flex gap-4 items-center text-xl">
            {location.pathname === "/" ? (
              <div className="flex gap-6">
                <Link to="/register">
                  <p className="text-xl group relative w-max cursor-pointer ">
                    <span>Register</span>
                    <span className="hover-line-l"></span>
                    <span className="hover-line-r"></span>
                  </p>
                </Link>
                <Link to="/login">
                  <p className="text-xl group relative w-max cursor-pointer ">
                    <span>Login</span>
                    <span className="hover-line-l"></span>
                    <span className="hover-line-r"></span>
                  </p>
                </Link>
              </div>
            ) : location.pathname === "/register" ? (
              <Link to="/login">
                <p className="text-xl group relative w-max cursor-pointer ">
                  <span>Login</span>
                  <span className="hover-line-l"></span>
                  <span className="hover-line-r"></span>
                </p>
              </Link>
            ) : (
              <Link to="/register">
                <p className="text-xl group relative w-max cursor-pointer ">
                  <span>Register</span>
                  <span className="hover-line-l"></span>
                  <span className="hover-line-r"></span>
                </p>
              </Link>
            )}
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
              className="bg-navbar gap-1 dropdown-content menu rounded-box z-1 w-76 p-2 mt-2 shadow-sm "
            >
              <div className="pl-4 mb-2">
                {user?.username || "Loading..."} <br />
                <p className="text-gray-400">{user?.email}</p>
              </div>
              <div className="divider divider-accent -mt-1 -mb-1"></div>
              <li>
                <Link to="/profile" className="hover:bg-gray-600">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/gamehistory" className="hover:bg-gray-600">
                  GameHistory
                </Link>
              </li>
              <div className="divider divider-accent -mt-1 -mb-1"></div>
              <div className="flex justify-center">
                <button
                  className="h-10 w-40 btn-primary font-semibold mt-2"
                  onClick={hdlLogout}
                >
                  Log out
                </button>
              </div>
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
export default MainNav;
