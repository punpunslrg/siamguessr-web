import { LockKeyhole } from "lucide-react";
import GameModePic from "../assets/bangkok.jpg";
const SelectMode = () => {
  return (
    <div className="bg-primary flex justify-center">
      <div className="flex justify-center text-2xl text-white">
        {/* <p>SELECT MODE</p> */}
      </div>
      <div className="flex justify-center items-center gap-6 px-6 py-10">
        <div className="w-80 h-[500px] rounded-xl overflow-hidden shadow-lg bg-gradient-to-br transform hover:scale-125 transition">
          <div className="relative h-full flex flex-col justify-end p-4 text-white">
            <img
              className="absolute top-0 left-0 w-full h-full object-cover "
              src={GameModePic}
            />
            <h2 className="text-2xl font-bold z-10 uppercase">Thailand</h2>
            <p className="text-sm z-10">dxfv</p>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center gap-6 px-6 py-10">
        <div className="bg-gray-400 w-80 h-[500px] rounded-xl overflow-hidden shadow-lg bg-gradient-to-br transform hover:scale-125 transition">
          <div className="relative h-full flex flex-col justify-end p-4 text-white">
            <div>
              <LockKeyhole className="w-24 h-24 absolute top-45 right-30 text-gray-300 " />
            </div>
            <img className="absolute top-0 left-0 w-full h-full object-cover opacity-30" />
            <h2 className="text-2xl font-bold z-10">?????</h2>
            <p className="text-sm z-10">???</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SelectMode;
