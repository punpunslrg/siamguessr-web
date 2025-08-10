import { Outlet } from "react-router";
import MainNav from "../components/MainNav";

function Layout() {
  return (
    // <div className="flex flex-col h-screen bg-primary ">
    //   {/* Navbar will take its natural height */}
    //   <header>
    //     <MainNav />
    //   </header>

    //   {/* 2. The main content area will grow to fill ALL remaining space */}
    //   <main className="flex-grow relative">
    //     {/* Your router outlet will render the Gameplay page here */}
    //     <Outlet />
    //   </main>
    // </div>
    <div className="flex flex-col">
      <MainNav />
      <Outlet />
    </div>
  );
}
export default Layout;
