import { MapPin } from "lucide-react";
import Logo7 from "../assets/Logo7.png";
import Hero from "../components/Hero";

const HomePageForSub = () => {
  return (
    <div className="bg-primary-full">
      <div className="min-h-screen  text-white flex flex-col items-center justify-center space-y-8  ">
        {/* Logo / Game Name */}
        {/* <div className=" animate-pulse"> */}
        <div className="">
          <img src={Logo7} />
        </div>
        {/* <img src="" alt="" /> */}
        {/* ปุ่มเมนู */}
        <div className="flex gap-4">
          <div>
            <button className="btn-primary py-4 px-22 text-2xl ">Play</button>
          </div>
          <div>
            <button className="bg-gray-500 hover:bg-gray-600  rounded-2xl text-white font-bold cursor-pointer transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95 py-4 px-16 text-2xl ">
              Multiplayer
            </button>
          </div>
          <div>
            <div className="map-pin top-30 left-16  delay-500">
              <MapPin className="w-10 h-10 text-red-400" />
            </div>
            <div className="map-pin top-32 right-50  delay-1000">
              <MapPin className="w-8 h-8 text-yellow-400" />
            </div>
            <div className="map-pin bottom-40 left-32  delay-1500">
              <MapPin className="w-12 h-12 text-green-400" />
            </div>
            <div className="map-pin bottom-20 right-40  delay-2500">
              <MapPin className="w-14 h-14 text-blue-400" />
            </div>
          </div>
        </div>
      </div>
      <div>
        <Hero />
      </div>
      <div>{/* <PicsSide /> */}</div>
    </div>
  );
};

export default HomePageForSub;
