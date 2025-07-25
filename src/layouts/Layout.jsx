import { Outlet } from "react-router";
import MainNav from "../components/MainNav";

function Layout() {
  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-500 to-indigo-600">
      {/* Navbar will take its natural height */}
      <header>
        <MainNav />
      </header>

      {/* 2. The main content area will grow to fill ALL remaining space */}
      <main className="flex-grow relative">
        {/* Your router outlet will render the Gameplay page here */}
        <Outlet />
      </main>
    </div>
  );
}
export default Layout;
