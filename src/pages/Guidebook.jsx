import { MapPin } from "lucide-react";
import Logo from "../assets/Logo7.png";
import ThailandGuide from "../components/ThailandGuide";
import { motion } from "framer-motion";

export default function Guidebook() {
  const sectionVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };
  return (
    <div className="min-h-screen bg-primary-full">
      <div className="sticky top-100">
        <div className="map-pin top-50 left-16  delay-500">
          <MapPin className="w-10 h-10 text-red-400" />
        </div>
        <div className="map-pin top-52 right-50  delay-1000">
          <MapPin className="w-8 h-8 text-yellow-400" />
        </div>
        <div className="map-pin bottom-40 left-32  delay-1500">
          <MapPin className="w-12 h-12 text-green-400" />
        </div>
        <div className="map-pin bottom-20 right-40  delay-2500">
          <MapPin className="w-14 h-14 text-blue-400" />
        </div>
      </div>
      <div className="mx-auto p-6 space-y-10">
        <motion.section
          className="mt-4 flex justify-center "
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariant}
        >
          <div className="mb-8 flex-col ">
            <img src={Logo} />
            <p className="text-white  text-center">
              Explore Thailand. Guess the location. Learn geography while having
              fun!
            </p>
          </div>
        </motion.section>

        <motion.section
          className="max-w-4xl mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariant}
          custom={1}
        >
          {/* <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100"> */}
          <div className="bg-card-opacity">
            <h2 className="text-3xl font-semibold text-white mb-6 flex items-center">
              🧭 <span className="ml-3">How to Play</span>
            </h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                <span className="bg-blue-100 text-blue-800 font-semibold px-3 py-1 rounded-full text-sm">
                  1
                </span>
                <p className="text-gray-700">
                  The game will show a random location from somewhere in
                  Thailand.
                </p>
              </div>
              <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
                <span className="bg-green-100 text-green-800 font-semibold px-3 py-1 rounded-full text-sm">
                  2
                </span>
                <p className="text-gray-700">
                  Use clues in location — signs, trees, roads — to guess where
                  you are.
                </p>
              </div>
              <div className="flex items-start space-x-4 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                <span className="bg-yellow-100 text-yellow-800 font-semibold px-3 py-1 rounded-full text-sm">
                  3
                </span>
                <p className="text-gray-700">
                  Click on the Thailand map to select your guess.
                </p>
              </div>
              <div className="flex items-start space-x-4 p-4 bg-purple-50 rounded-lg border-l-4 border-purple-400">
                <span className="bg-purple-100 text-purple-800 font-semibold px-3 py-1 rounded-full text-sm">
                  4
                </span>
                <p className="text-gray-700">
                  Press <strong className="text-purple-600">"GUESS"</strong> to
                  lock in your answer.{" "}
                </p>
              </div>
              <div className="flex items-start space-x-4 p-4 bg-red-50 rounded-lg border-l-4 border-red-400">
                <span className="bg-red-100 text-red-800 font-semibold px-3 py-1 rounded-full text-sm">
                  5
                </span>
                <p className="text-gray-700">
                  You will receive a score based on how close your guess is to
                  the real location. ! 🎯
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          className="max-w-4xl mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariant}
          custom={2}
        >
          <div className="bg-card-opacity">
            <ThailandGuide />
          </div>
        </motion.section>
      </div>
    </div>
  );
}
