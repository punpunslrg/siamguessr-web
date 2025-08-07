import { motion } from "framer-motion";
import Logo from "../assets/Logo7.png";
import { MapPin } from "lucide-react";

export default function About() {
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
    <div className="min-h-screen bg-primary-full  mx-auto px-6 py-12 space-y-10 ">
      <div className="sticky top-100">
        <div className="map-pin top-52 right-50  delay-1000">
          <MapPin className="w-8 h-8 text-yellow-400" />
        </div>
        <div className="map-pin top-50 left-16  delay-500">
          <MapPin className="w-10 h-10 text-red-400" />
        </div>
        <div className="map-pin bottom-20 right-40  delay-2500">
          <MapPin className="w-14 h-14 text-blue-400" />
        </div>
        <div className="map-pin bottom-40 left-32  delay-1500">
          <MapPin className="w-12 h-12 text-green-400" />
        </div>
      </div>
      <motion.section
        className="mt-8 flex justify-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariant}
      >
        <div className=" mb-4">
          <img src={Logo} />
          <p className="text-white text-7xl londrina-solid-regular text-center mt-2">
            About Us
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
        <div className="bg-card-opacity text-white">
          <h2 className="text-2xl font-semibold mb-2 ">🎯 Who We Are</h2>
          <p className="text-start">
            SiamGuessr is an interactive location-guessing game that lets you
            explore the rich geography, culture, and landmarks of Thailand — all
            from your screen. Inspired by GeoGuessr, our platform is focused
            entirely on Thai landscapes, cities, villages, and hidden gems.
          </p>
          <p className="mt-2">
            We're a small team of developers, designers, and geography lovers
            who believe that learning about the world (and your own country!)
            can be fun, visual, and immersive.
          </p>
        </div>
      </motion.section>
      <motion.section
        className="max-w-4xl mx-auto text-start"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariant}
        custom={2}
      >
        <section className="bg-card-opacity text-white">
          <h2 className="text-2xl font-semibold mb-2 text-center">
            🗺️ What is SiamGuessr?
          </h2>
          <p>
            SiamGuessr drops you into a random location in Thailand using
            real-world street images or photos. Your task?{" "}
            <strong>Figure out where you are</strong> by examining signs,
            terrain, architecture, and other visual clues.
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Classic (5-round solo play)</li>
            <li>Multiplayer (challenge your friends)</li>
          </ul>
        </section>
      </motion.section>

      <motion.section
        className="max-w-4xl mx-auto text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariant}
        custom={3}
      >
        <section className="bg-card-opacity text-white">
          <h2 className="text-2xl font-semibold mb-2">💡 Why We Built It</h2>
          <ul className="list-disc list-inside space-y-1 text-start">
            <li>
              To help people <strong>discover the beauty of Thailand</strong>
            </li>
            <li>
              To offer an <strong>educational tool</strong> for schools and
              students
            </li>
            <li>
              To make learning <strong>interactive and competitive</strong>
            </li>
            <li>
              To provide a <strong>Thai alternative</strong> to international
              games
            </li>
          </ul>
        </section>
      </motion.section>
    </div>
  );
}
