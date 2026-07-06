import { motion } from "framer-motion";
import { Utensils, Users, Building2, Recycle } from "lucide-react";
import AnimatedCounter from "./AnimatedCounter.jsx";

const IMPACT = [
  { icon: Utensils, value: 50000, suffix: "+", label: "Meals Saved" },
  { icon: Users, value: 12000, suffix: "+", label: "Families Helped" },
  { icon: Building2, value: 350, suffix: "+", label: "NGOs Connected" },
  { icon: Recycle, value: 80, suffix: " Tons", label: "Food Waste Reduced" },
];

export default function Impact() {
  return (
    <section
      id="impact"
      className="relative py-24 md:py-28 overflow-hidden bg-primary-darker"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(700px_400px_at_90%_10%,rgba(34,197,94,0.18),transparent_70%)]"
      />
      <div className="section relative">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="eyebrow text-secondary">Our Impact</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Measurable Change, Meal by Meal
          </h2>
          <p className="mt-4 text-white/65 text-base">
            Real numbers from real communities we've served this year.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {IMPACT.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-card border border-white/10 bg-white/5 backdrop-blur-md px-6 py-9 text-center"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                <item.icon className="h-6 w-6 text-secondary" aria-hidden="true" />
              </div>
              <div className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-br from-white to-secondary bg-clip-text text-transparent">
                <AnimatedCounter value={item.value} suffix={item.suffix} />
              </div>
              <p className="mt-2 text-sm font-medium text-white/70">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
