import { motion } from "framer-motion";
import { HandHeart, ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="px-6 md:px-10 lg:px-16 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
        className="relative max-w-7xl mx-auto rounded-card bg-green-gradient px-8 py-16 md:px-16 md:py-20 overflow-hidden shadow-lift"
      >
        <div
          aria-hidden="true"
          className="absolute -top-24 -right-16 h-72 w-72 rounded-full bg-white/10"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-20 left-10 h-52 w-52 rounded-full bg-white/10"
        />

        <div className="relative flex flex-col items-center text-center gap-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
            <HandHeart className="h-7 w-7 text-white" aria-hidden="true" />
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight max-w-2xl">
            Every Meal Shared Creates Hope
          </h2>
          <p className="text-white/80 max-w-xl text-base">
            Join thousands of donors and NGOs already turning surplus food
            into shared meals across 50+ cities.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#signup" className="btn btn-white text-base">
              Donate Now
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href="#volunteer" className="btn btn-outline-light text-base">
              Become Volunteer
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
