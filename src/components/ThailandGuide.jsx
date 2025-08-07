import RoadNumber from "../assets/RoadNumber.png";
import Abbreviations from "../assets/Abbreviations.png";
import PineTrees from "../assets/PineTrees.png";
import ChiangmaiRedTruck from "../assets/ChiangmaiRedTruck.png";
import PattayaStreet from "../assets/PattayaStreetSign.png";
export default function ThailandGuide() {
  return (
    <div className="max-w-5xl mx-auto px-4  space-y-10 ">
      <h2 className="text-3xl font-semibold text-white mb-6 flex items-center">
        💡 <span className="ml-3">What to Look For (Thailand Tips)</span>
      </h2>
      <div className="space-y-4">
        <div>
          <div className="flex items-center space-x-4 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
            <span className="text-2xl">🚙</span>
            <p className="text-gray-700">Identifying Thailand</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-start gap-6">
          <img src={RoadNumber} className="w-full md:w-1/2 rounded shadow" />
          <div className="md:w-1/2 text-white">
            <h2 className="text-xl font-semibold mb-2">Directional signs</h2>
            <p>
              Directional signs on smaller roads are white, and are composed of
              two signs: one with an arrow at the bottom, and one with the
              information at the top. These can have place names. When they do
              not, you will see them as just the road number with a Garuda.
              Moreover, highway signs are green, and frequently feature the
              place names in Latin script below the Thai name.
            </p>
          </div>
        </div>
      </div>

      <div>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-4 bg-green-200 rounded-lg border-l-4 border-green-400">
            <span className="text-2xl">🚙</span>
            <p className="text-gray-700">Regional/province-specific clues</p>
          </div>
          <div className="flex flex-col md:flex-row-reverse items-start gap-6">
            <img
              src={Abbreviations}
              className="w-full md:w-1/2 rounded shadow"
            />
            <div className="md:w-1/2 text-white">
              <h2 className="text-xl font-semibold mb-2">Waystones</h2>
              <p>
                Waystones and road signs on provincial roads will often provide
                a two-letter abbreviation of the province in Thai script. They
                will not appear on waystones or road signs for national roads.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <div className="flex items-center space-x-4 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
            <span className="text-2xl">🚙</span>
            <p className="text-gray-700">Agriculture and vegetation</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-start gap-6">
          <img src={PineTrees} className="w-full md:w-1/2 rounded shadow" />
          <div className="md:w-1/2 text-white">
            <h2 className="text-xl font-semibold mb-2">Pine trees</h2>
            <p>
              Pine trees, specifically Pinus latteri, or Tenasserim pines, are
              more or less exclusive to the north and northwest of the country.
            </p>
          </div>
        </div>
      </div>
      <div>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-4 bg-green-200 rounded-lg border-l-4 border-green-400">
            <span className="text-2xl">🚙</span>
            <p className="text-gray-700">Spotlight</p>
          </div>
          <div className="flex flex-col md:flex-row-reverse items-start gap-6">
            <img
              src={ChiangmaiRedTruck}
              className="w-full md:w-1/2 rounded shadow"
            />
            <div className="md:w-1/2 text-white">
              <h2 className="text-xl font-semibold mb-2">Red trucks</h2>
              <p>
                These red trucks, known as songthaews, are transport vehicles
                found most commonly in Chiang Mai.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-start gap-6">
        <img src={PattayaStreet} className="w-full md:w-1/2 rounded shadow" />
        <div className="md:w-1/2 text-white">
          <h2 className="text-xl font-semibold mb-2">Street signs</h2>
          <p>Street signs shaped like a helm are exclusive to Pattaya City.</p>
        </div>
      </div>
    </div>
  );
}
