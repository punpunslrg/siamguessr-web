import { useNavigate } from "react-router";
import Globe from "../components/Globe.jsx";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center text-white font-sans bg-primary z-1">
      <header className="mb-10 flex flex-col items-center relative">
        <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg tracking-tight mb-2">
          SiamGuessr
        </h1>
        <p className="text-lg md:text-2xl text-sky-200">
          ทายตำแหน่งจากภาพ Street View ทั่วไทย
        </p>
        <Globe />
      </header>
      <main className="flex flex-col items-center gap-8 w-full max-w-md">
        <button
          onClick={() => navigate("/gamemode")}
          className="bg-orange-500 btn-primary  py-4 px-20 rounded-full text-xl shadow-lg "
        >
          START
        </button>
        <div className="mt-8 text-center text-sky-100 text-base md:text-lg">
          <p>ล็อกอินด้วย Google เพื่อบันทึกคะแนนและดู Leaderboard</p>
        </div>
      </main>
      <footer className="absolute bottom-4 text-sky-200 text-xs w-full text-center">
        &copy; {new Date().getFullYear()} SiamGuessr Tailwind CSS
      </footer>
    </div>
  );
}

export default Home;
