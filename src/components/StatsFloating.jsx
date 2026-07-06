import { motion } from "framer-motion";
import { UtensilsCrossed, HeartHandshake, MapPinned, CircleCheckBig } from "lucide-react";

const STATS = [
  { icon: UtensilsCrossed, value: "10K+", label: "Meals Donated" },
  { icon: HeartHandshake, value: "300+", label: "NGO Partners" },
  { icon: MapPinned, value: "50+", label: "Cities" },
  { icon: CircleCheckBig, value: "98%", label: "Successful Deliveries" },
];

export default function StatsFloating() {
  return (
    <section aria-label="Platform statistics" className="relative z-10 -mt-8 md:-mt-14">
      <div className="section grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            whileHover={{ y: -8, boxShadow: "0 20px 45px rgba(22,163,74,0.22)" }}
            className="rounded-card border border-white/60 bg-white/70 backdrop-blur-xl shadow-glass px-6 py-7 text-center cursor-default"
          >
            <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-accent">
              <stat.icon className="h-5 w-5 text-primary-dark" aria-hidden="true" />
            </div>
            <div className="text-2xl md:text-3xl font-extrabold text-primary-darker tracking-tight">
              {stat.value}
            </div>
            <p className="mt-1 text-xs md:text-sm font-semibold text-muted">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
