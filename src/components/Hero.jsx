import { motion } from "framer-motion";
import Thai from "../assets/thailand.jpg";
const Hero = () => {
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
    <div className="bg-secondary px-6 py-12 space-y-24">
      {/* About the Game */}
      <div className=" flex items-center">
        <div>
          <img src={Thai} className="rounded-2xl" />
        </div>
        <motion.section
          className="max-w-4xl mx-auto text-start"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariant}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            🌍 About the Game
          </h2>
          <p className="text-lg leading-relaxed">
            <strong>SiamGuessr</strong> is a location guessing game that takes
            you on a virtual journey across Thailand — without ever leaving your
            seat.
          </p>
          <p className="text-lg leading-relaxed mt-4">
            From narrow streets in Chiang Mai to tropical beaches in the South,
            your challenge is to observe every clue in the image and{" "}
            <strong>pin the exact spot on the map</strong>.
          </p>
          <p className="text-lg leading-relaxed mt-4">
            Can you recognize a location just from a street sign? A hill in the
            background? A temple silhouette? This is a game of perception,
            knowledge, and intuition.
          </p>
        </motion.section>
      </div>
      {/* How to Play */}
      <motion.section
        className="max-w-4xl mx-auto text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariant}
        custom={1}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6">🎮 How to Play</h2>
        <ol className="space-y-4 text-left text-lg max-w-2xl mx-auto list-decimal list-inside">
          <li>
            <strong>Look at the location</strong> – View an image from somewhere
            in Thailand.
          </li>
          <li>
            <strong>Analyze the details</strong> – Look for signs, trees,
            buildings, etc.
          </li>
          <li>
            <strong>Make your guess</strong> – Click on the map to guess.
          </li>
          <li>
            <strong>Score points</strong> – The closer you are, the higher your
            score.
          </li>
        </ol>
      </motion.section>

      {/* Features */}
      <motion.section
        className="max-w-4xl mx-auto text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariant}
        custom={2}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          🚀 Why Play SiamGuessr?
        </h2>
        <ul className="space-y-4 text-lg text-left max-w-2xl mx-auto list-disc list-inside">
          <motion.li whileHover={{ scale: 1.02 }}>
            🌄 Explore Thailand like never before
          </motion.li>
          <motion.li whileHover={{ scale: 1.02 }}>
            🧠 Challenge your brain with location puzzles
          </motion.li>
          <motion.li whileHover={{ scale: 1.02 }}>
            🕹️ Instant play with no login required
          </motion.li>
          <motion.li whileHover={{ scale: 1.02 }}>
            👫 Compete with friends on the leaderboard
          </motion.li>
        </ul>
      </motion.section>

      {/* Target Audience */}
      <motion.section
        className="max-w-4xl mx-auto text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariant}
        custom={3}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          🌟 Who Is It For?
        </h2>
        <ul className="space-y-4 text-lg text-left max-w-2xl mx-auto list-disc list-inside">
          <li>Students who want to learn geography in a fun way</li>
          <li>Travelers & backpackers who love exploring</li>
          <li>Puzzle lovers who enjoy deduction challenges</li>
          <li>Hardcore players who recognize a place from a tree 😎</li>
        </ul>
      </motion.section>
    </div>
  );
};
export default Hero;
