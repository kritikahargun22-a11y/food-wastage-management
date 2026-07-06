import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    initials: "AM",
    from: "from-orange-200",
    to: "to-orange-400",
    name: "Arjun Mehta",
    role: "Restaurant Owner · Donor",
    quote:
      "FoodShare made it effortless to donate our restaurant's surplus every night. Pickup is always on time and the process feels genuinely trustworthy.",
  },
  {
    initials: "PN",
    from: "from-emerald-200",
    to: "to-emerald-400",
    name: "Priya Nair",
    role: "Program Coordinator · Sunrise NGO",
    quote:
      "Transparency matters for our work. The live tracking and monthly reports help us plan distribution across our shelters perfectly.",
  },
  {
    initials: "DC",
    from: "from-blue-200",
    to: "to-blue-400",
    name: "Daniel Cruz",
    role: "Individual Donor",
    quote:
      "I've donated over 40 times this year. Seeing the direct impact reports after every delivery is what keeps me coming back.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 md:py-28 bg-white">
      <div className="section">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="eyebrow">Testimonials</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-primary-darker tracking-tight">
            Loved by Donors and NGOs Alike
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{ y: -6 }}
              className="relative card p-8 bg-emerald-50/40"
            >
              <Quote
                className="absolute top-6 right-6 h-8 w-8 text-emerald-200"
                aria-hidden="true"
              />
              <div className="flex items-center gap-1 text-amber-400 mb-4" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="h-4 w-4 fill-amber-400" aria-hidden="true" />
                ))}
              </div>
              <blockquote className="text-sm text-ink/90 leading-relaxed mb-7">
                “{t.quote}”
              </blockquote>
              <figcaption className="flex items-center gap-3">
                <span
                  className={`h-11 w-11 rounded-full bg-gradient-to-br ${t.from} ${t.to} flex items-center justify-center text-xs font-bold text-white`}
                >
                  {t.initials}
                </span>
                <span>
                  <span className="block text-sm font-bold text-primary-darker">{t.name}</span>
                  <span className="block text-xs text-muted">{t.role}</span>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
