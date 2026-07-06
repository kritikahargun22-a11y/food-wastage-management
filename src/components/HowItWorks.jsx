import { motion } from "framer-motion";
import { UploadCloud, Truck, PackageCheck, Smile } from "lucide-react";

const STEPS = [
  {
    icon: UploadCloud,
    step: "1",
    title: "Donate Food",
    desc: "Upload surplus food with photos.",
    bg: "bg-emerald-100",
    fg: "text-emerald-600",
  },
  {
    icon: Truck,
    step: "2",
    title: "Pickup",
    desc: "Volunteer collects food.",
    bg: "bg-amber-100",
    fg: "text-amber-600",
  },
  {
    icon: PackageCheck,
    step: "3",
    title: "Delivery",
    desc: "Food delivered to nearby NGOs.",
    bg: "bg-sky-100",
    fg: "text-sky-600",
  },
  {
    icon: Smile,
    step: "4",
    title: "Happy Families",
    desc: "Meals reach people in need.",
    bg: "bg-rose-100",
    fg: "text-rose-600",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 md:py-28 bg-emerald-50/40">
      <div className="section">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="eyebrow">How It Works</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-primary-darker tracking-tight">
            Simple Steps to Make a Big Difference
          </h2>
        </div>

        <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* dotted connector, desktop only */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-[68px] left-[12.5%] right-[12.5%] border-t-2 border-dashed border-emerald-300 -z-0"
          />
          {STEPS.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.55, delay: i * 0.12 }}
              whileHover={{ y: -8 }}
              className="relative z-10 card p-7 text-left"
            >
              <div className="flex items-center justify-between mb-5">
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${s.bg}`}>
                  <s.icon className={`h-7 w-7 ${s.fg}`} aria-hidden="true" />
                </div>
                <span className="text-sm font-bold text-gray-300">0{s.step}</span>
              </div>
              <h3 className="text-lg font-bold text-primary-darker mb-1.5">{s.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
