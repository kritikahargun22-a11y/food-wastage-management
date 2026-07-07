import { motion } from "framer-motion";
import { Leaf, ShieldCheck, Users, Utensils } from "lucide-react";

const HIGHLIGHTS = [
    { icon: Utensils, text: "10K+ meals donated so far" },
    { icon: Users, text: "5,000+ donors in the community" },
    { icon: ShieldCheck, text: "Verified NGOs, safe deliveries" },
];

/**
 * Shared shell for Login / Signup pages.
 * Left: form content passed as children.
 * Right: green gradient branding panel (hidden on small screens).
 */
export default function AuthLayout({ title, subtitle, children }) {
    return (
        <div className="min-h-screen grid lg:grid-cols-2 bg-white">
            {/* Left: form */}
            <div className="flex flex-col justify-center px-6 sm:px-10 md:px-16 lg:px-20 py-14">
                <a href="#home" className="flex items-center gap-2.5 mb-10" aria-label="FoodShare home">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-gradient shadow-soft">
                        <Leaf className="h-5 w-5 text-white" strokeWidth={2.2} aria-hidden="true" />
                    </span>
                    <span className="flex flex-col leading-none">
                        <span className="font-extrabold text-lg text-primary-darker">FoodShare</span>
                        <span className="text-[10px] font-semibold text-muted tracking-wide">
                            Reduce Waste. Feed People.
                        </span>
                    </span>
                </a>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="w-full max-w-md"
                >
                    <h1 className="text-3xl font-extrabold text-primary-darker tracking-tight mb-2">
                        {title}
                    </h1>
                    <p className="text-sm text-muted mb-8">{subtitle}</p>
                    {children}
                </motion.div>
            </div>

            {/* Right: branding panel */}
            <div className="hidden lg:flex relative overflow-hidden bg-green-gradient items-center justify-center p-16">
                <div
                    aria-hidden="true"
                    className="absolute -top-24 -right-16 h-80 w-80 rounded-full bg-white/10"
                />
                <div
                    aria-hidden="true"
                    className="absolute -bottom-24 -left-10 h-64 w-64 rounded-full bg-white/10"
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="relative z-10 max-w-md text-white"
                >
                    <h2 className="text-3xl font-extrabold tracking-tight leading-tight mb-4">
                        Every meal shared
                        <br /> creates hope.
                    </h2>
                    <p className="text-white/80 text-sm leading-relaxed mb-10">
                        Join a growing network of donors, volunteers, and NGOs working
                        together to end food waste — one delivery at a time.
                    </p>

                    <div className="space-y-4">
                        {HIGHLIGHTS.map((h, i) => (
                            <motion.div
                                key={h.text}
                                initial={{ opacity: 0, x: 16 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                                className="flex items-center gap-3 rounded-2xl bg-white/10 border border-white/15 px-4 py-3 backdrop-blur-sm"
                            >
                                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 flex-shrink-0">
                                    <h.icon className="h-4.5 w-4.5 text-white" aria-hidden="true" />
                                </span>
                                <span className="text-sm font-medium">{h.text}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
