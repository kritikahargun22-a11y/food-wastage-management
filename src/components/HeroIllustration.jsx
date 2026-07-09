import { motion } from "framer-motion";

export default function HeroIllustration() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="flex justify-center lg:justify-end"
    >
      
    </motion.div>
  );
}