import { Link } from "react-router";

function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-sans">
      <header className="mb-10 flex flex-col items-center">
        <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg tracking-tight mb-2">
          SiamGuessr
        </h1>
        <p className="text-lg md:text-2xl text-sky-200">
          ทายตำแหน่งจากภาพ Street View ทั่วโลก
        </p>
      </header>
      <main className="flex flex-col items-center gap-8 w-full max-w-md">
        <Link href="/game">
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-10 rounded-full text-xl shadow-lg transition-all duration-200 w-full">
            เริ่มเล่นเกม
          </button>
        </Link>
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
