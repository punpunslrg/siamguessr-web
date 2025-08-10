import { useLocation, useNavigate } from "react-router";
import Globe from "../components/Globe.jsx";
import { useEffect } from "react";
import useUserStore from "../stores/userStore.js";
import Logo from "../assets/Logo7.png";
import Homebg from "../assets/homepagebg-1.jpg";

function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setToken, token, getProfile } = useUserStore();

  const hdlRegister = () =>{
    navigate("/register")
  }

  const hdlLogin = () =>{
    navigate("/login")
  }
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const accessToken = params.get("token");

    if (accessToken) {
      setToken(accessToken);
    }
  }, []);

  useEffect(() => {
    (async () => {
      await getProfile();
    })();
  }, [getProfile]);

    navigate("/homepagefree");
  
  return (
    <div
      className="flex flex-col items-center justify-center w-full h-[calc(100vh-66px)] bg-cover bg-bottom "
      style={{ backgroundImage: `url(${Homebg})` }}
    >
      <div className="mb-8 flex flex-col justify-center items-center">
        <img className="w-100" src={Logo} />

        <div className="text-white flex flex-col justify-center items-center text-shadow-lg text-shadow-black mt-2 text-3xl font-extrabold backdrop-blur-xs p-6 rounded-2xl ">
          <p className="text-[66px] ">EXPLORE THAILAND!</p>

          <p>And test how well you really know the Land of Smiles.</p>
        </div>
      </div>
      <div className="flex gap-6">
        <button className="btn-primary bg-gradient-to-br from-emerald-900 via-blue-900 to-purple-900 py-4 px-22 text-2xl" onClick={()=>hdlRegister()}>Register</button>
        <button className="btn-primary bg-gradient-to-br from-yellow-500 via-orange-500 to-red-500 py-4 px-22 text-2xl" onClick={()=>hdlLogin()}>Login</button>
      </div>
    </div>
  );
}

export default Home;
