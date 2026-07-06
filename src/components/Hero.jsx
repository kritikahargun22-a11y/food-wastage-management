import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import HeroIllustration from "./HeroIllustration.jsx";

const AVATARS = [
  { initials: "AM", from: "from-orange-200", to: "to-orange-400" },
  { initials: "PN", from: "from-emerald-200", to: "to-emerald-400" },
  { initials: "DC", from: "from-blue-200", to: "to-blue-400" },
  { initials: "RS", from: "from-pink-200", to: "to-pink-400" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
  }),
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative pt-32 pb-16 md:pt-40 md:pb-20 bg-soft-radial overflow-hidden"
    >
      <div className="section grid lg:grid-cols-2 gap-14 items-center">
        {/* Left column */}
        <div>
          <motion.span
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="inline-flex items-center gap-2 rounded-full bg-accent text-primary-dark text-sm font-semibold px-4 py-2 mb-6"
          >
            🌿 Together, We Can End Food Waste
          </motion.span>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.08] tracking-tight text-primary-darker"
          >
            Share Food.
            <br />
            <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
              Share Hope.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="mt-6 text-lg text-muted max-w-xl leading-relaxed"
          >
            FoodShare connects food donors with NGOs and people in need
            through a smart digital platform that minimizes food waste and
            maximizes social impact.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
            className="mt-9 flex flex-wrap gap-4"
          >
            <a href="#signup" className="btn btn-primary text-base">
              Donate Food
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href="#how-it-works" className="btn btn-outline text-base">
              Find Food
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={4}
            className="mt-10 flex items-center gap-4"
          >
            <div className="flex -space-x-3">
              {AVATARS.map((a) => (
                <span
                  key={a.initials}
                  className={`h-11 w-11 rounded-full border-[3px] border-white bg-gradient-to-br ${a.from} ${a.to} flex items-center justify-center text-xs font-bold text-white shadow-soft`}
                >
                  {a.initials}
                </span>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-amber-400" aria-hidden="true" />
                ))}
              </div>
              <p className="text-sm font-semibold text-ink">
                Join 5,000+ donors{" "}
                <span className="font-normal text-muted">making a difference.</span>
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right column */}

        <img
          src="/heroimage.png"
          alt="Food Donation"
          className="w-full max-w-[650px] h-auto object-contain"
        />

        <HeroIllustration />
      </div>
    </section>
  );
}
