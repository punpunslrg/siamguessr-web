import { LockKeyhole } from "lucide-react";
import GameModePic from "../assets/bangkok.jpg";
import Yaowarat from "../assets/yaowarat.jpg";
import { Link } from "react-router";
const SelectMode = () => {
  return (
    <div className="bg-primary flex justify-center">
      <div className=" fixed top-40 left-200 flex justify-center p-4 text-white londrina-solid-regular text-7xl text-yellow-500">
        <p>Select Mode</p>
      </div>
      <div className="flex justify-center text-2xl text-white">
        {/* <p>SELECT MODE</p> */}
      </div>
      <div className="flex justify-center items-center gap-6 px-6 py-10">
        <div className="w-80 h-[500px] rounded-xl overflow-hidden shadow-lg bg-gradient-to-br transform hover:scale-105 transition">
          <div className="relative h-full flex flex-col justify-end p-4 text-white">
            <Link to="/gamemode">
              <img
                className="absolute top-0 left-0 w-full h-full object-cover "
                src={GameModePic}
              />
            </Link>
            <h2 className="text-2xl font-bold z-10 uppercase">
              Wander Thailand
            </h2>
            <p className="text-sm z-10">
              Explore the Land of Smiles from top to bottom!
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center gap-6 px-6 py-10">
        <div className="bg-gray-400 w-80 h-[500px] rounded-xl overflow-hidden shadow-lg bg-gradient-to-br transform hover:scale-105 transition">
          <div className="relative h-full flex flex-col justify-end p-4 text-white">
            <Link to="/gamemode">
              <img
                className="absolute top-0 left-0 w-full h-full object-cover "
                src={Yaowarat}
              />
            </Link>
            <h2 className="text-2xl font-bold z-10 uppercase">Tasty Trails</h2>
            <p className="text-sm z-10">
              For the foodies and street-eat adventurers
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SelectMode;
