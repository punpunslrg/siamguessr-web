function CalculatePoints() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 flex flex-col items-center justify-center px-4 py-10">
      {/* Header */}
      <h2 className="text-2xl font-bold mb-6 text-white">Round 1</h2>

      {/* Map Image Placeholder */}
      <div className="w-full max-w-3xl h-96 bg-gray-300 mb-6 rounded shadow relative">
        {/* ถ้ามีแผนที่จาก Google Maps จริง ๆ สามารถฝัง iframe ตรงนี้ */}
        <iframe
          title="Map"
          className="w-full h-full rounded"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31513.01262623936!2d38.76895234460224!3d-6.792354321001591!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x185c4c9e62e2fd1f%3A0xf10b682f4d8b3908!2sDar%20es%20Salaam%2C%20Tanzania!5e0!3m2!1sen!2sus!4v1621275953952!5m2!1sen!2sus"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>

      {/* Points Section */}
      <div className="text-center">
        <h3 className="text-xl font-semibold text-white">202 points</h3>

        {/* Progress Bar */}
        <div className="w-64 h-2 bg-blue-100 rounded-full overflow-hidden mx-auto my-3">
          <div className="h-full bg-orange-500" style={{ width: "10%" }}></div>
        </div>

        <p className="text-sm text-white">
          Your guess was <strong>6,434 KM</strong> from the correct location.
        </p>
      </div>

      {/* Button */}
      <button className="mt-6 px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 active:scale-95">
        START NEXT ROUND
      </button>
    </div>
  );
}

export default CalculatePoints;
