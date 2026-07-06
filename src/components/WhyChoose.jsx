import { motion } from "framer-motion";
import {
  Sparkles,
  MapPinned,
  Activity,
  ShieldCheck,
  UsersRound,
  LayoutDashboard,
} from "lucide-react";

const FEATURES = [
  {
    icon: Sparkles,
    title: "Smart Matching",
    desc: "Our algorithm pairs surplus food with the NGO that needs it most, minimizing waste and delay.",
  },
  {
    icon: MapPinned,
    title: "Nearby NGO Finder",
    desc: "Instantly locate verified NGOs closest to your donation for the fastest possible pickup.",
  },
  {
    icon: Activity,
    title: "Real-Time Tracking",
    desc: "Follow every donation live, from pickup to final delivery, with full transparency.",
  },
  {
    icon: ShieldCheck,
    title: "Food Quality Verification",
    desc: "Every donation is checked against safety guidelines before it reaches a family.",
  },
  {
    icon: UsersRound,
    title: "Volunteer Network",
    desc: "A trained, background-checked community of volunteers powers every pickup and delivery.",
  },
  {
    icon: LayoutDashboard,
    title: "Impact Dashboard",
    desc: "Track your personal contribution with detailed reports on meals saved and lives touched.",
  },
];

export default function WhyChoose() {
  return (
    <section id="about" className="py-24 md:py-28">
      <div className="section">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="eyebrow">Why Choose FoodShare</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-primary-darker tracking-tight">
            Everything you need to give with confidence
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(17,24,39,0.08)" }}
              className="card p-7"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent mb-5">
                <f.icon className="h-6 w-6 text-primary-dark" aria-hidden="true" />
              </div>
              <h3 className="text-base font-bold text-primary-darker mb-2">{f.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
