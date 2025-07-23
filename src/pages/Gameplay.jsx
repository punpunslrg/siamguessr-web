function Gameplay() {
  return (
    <div>
          <div class="relative w-screen h-screen overflow-hidden">
        <img src="https://media.istockphoto.com/id/1299125117/photo/bangkok-cityscape-traffic-and-wat-suthat-temple.jpg?s=612x612&w=0&k=20&c=gnqiLgl8yz4CKC1zc7hTHlFadki73UdIpfKlGRJv51Y=" alt="" class="absolute inset-0 w-full h-full object-cover" />

        <div class="absolute inset-0 flex flex-col justify-between p-4 md:p-8 z-10">

            <div class="flex justify-center">
                <div class="bg-blue-800 text-white px-6 py-2 rounded-full shadow-lg text-lg font-bold">
                    01:23
                </div>
            </div>

            <div class="flex-grow">
                </div>

            <div class="flex justify-between items-end">
                <button class="btn btn-error btn-sm shadow-lg text-white">
                    Leave
                </button>

                <div class="flex flex-col items-end space-y-2">
                    <div class="bg-white w-64 h-40 border-2 border-gray-300 shadow-xl overflow-hidden">
                        <img src="https://cdn.britannica.com/50/4050-050-F7660A68/Thailand-map-features-locator.jpg?w=400&h=225&c=crop" alt="Mini map" class="w-full h-full object-cover" />
                    </div>
                    <div class="bg-gray-700 text-white px-4 py-2 rounded-md text-sm shadow-md">
                        PLACE YOUR PIN ON THE MAP
                    </div>
                </div>
            </div>

        </div>
    </div>
    </div>
  )
}
export default Gameplay