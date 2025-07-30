import Logo7 from "../assets/Logo7.png";
import Bg1 from "../assets/bg1.png";
import Hero from "../components/Hero";
import PicsSide from "../components/PicsSide";

const HomePageForSub = () => {
  return (
    <div>
      <div className="min-h-screen text-white flex flex-col items-center justify-center p-8 space-y-8 relative overflow-hidden">
        {/* Logo / Game Name */}
        <div className=" animate-pulse">
          <img src={Logo7} />
        </div>
        <img src="" alt="" />
        {/* ปุ่มเมนู */}
        <div className=" flex gap-4">
          <button className="btn-primary py-4 px-30 text-2xl "> Play</button>
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
