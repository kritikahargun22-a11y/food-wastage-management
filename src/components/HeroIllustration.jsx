import { motion } from "framer-motion";

export default function HeroIllustration() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="flex justify-center lg:justify-end"
    >
      <img
        src="/hero-illustration.png"
        alt="FoodShare Hero"
        className="w-full max-w-[650px] h-auto object-contain"
      />
    </motion.div>
  );
}