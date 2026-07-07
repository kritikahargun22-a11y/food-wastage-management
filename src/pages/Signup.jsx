import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, HeartHandshake, Utensils } from "lucide-react";
import AuthLayout from "../components/AuthLayout.jsx";

const ROLES = [
    { id: "donor", label: "Donor", desc: "I want to donate surplus food", icon: Utensils },
    { id: "ngo", label: "NGO / Volunteer", desc: "I want to receive & distribute food", icon: HeartHandshake },
];

export default function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const [role, setRole] = useState("donor");
    const [agree, setAgree] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", password: "" });

    function handleChange(e) {
        setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        // UI only — wire this up to your auth backend.
        console.log("Signup submitted:", { ...form, role, agree });
    }

    return (
        <AuthLayout
            title="Create your account"
            subtitle="Join 5,000+ donors and NGOs turning surplus food into shared meals."
        >
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Role selector */}
                <div>
                    <span className="block text-sm font-semibold text-ink mb-2">I am joining as a</span>
                    <div className="grid grid-cols-2 gap-3">
                        {ROLES.map((r) => (
                            <button
                                key={r.id}
                                type="button"
                                onClick={() => setRole(r.id)}
                                aria-pressed={role === r.id}
                                className={`text-left rounded-xl border px-4 py-3 transition ${role === r.id
                                        ? "border-primary bg-accent shadow-soft"
                                        : "border-gray-200 hover:border-primary/40"
                                    }`}
                            >
                                <r.icon
                                    className={`h-4.5 w-4.5 mb-2 ${role === r.id ? "text-primary-dark" : "text-muted"}`}
                                    aria-hidden="true"
                                />
                                <span className="block text-sm font-bold text-ink">{r.label}</span>
                                <span className="block text-xs text-muted mt-0.5">{r.desc}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Name */}
                <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-ink mb-1.5">
                        Full name
                    </label>
                    <div className="relative">
                        <User
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-muted"
                            aria-hidden="true"
                        />
                        <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            autoComplete="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Your full name"
                            className="w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 py-3 text-sm text-ink placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition"
                        />
                    </div>
                </div>

                {/* Email */}
                <div>
                    <label htmlFor="signup-email" className="block text-sm font-semibold text-ink mb-1.5">
                        Email address
                    </label>
                    <div className="relative">
                        <Mail
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-muted"
                            aria-hidden="true"
                        />
                        <input
                            id="signup-email"
                            name="email"
                            type="email"
                            required
                            autoComplete="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            className="w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 py-3 text-sm text-ink placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition"
                        />
                    </div>
                </div>

                {/* Password */}
                <div>
                    <label htmlFor="signup-password" className="block text-sm font-semibold text-ink mb-1.5">
                        Password
                    </label>
                    <div className="relative">
                        <Lock
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-muted"
                            aria-hidden="true"
                        />
                        <input
                            id="signup-password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            required
                            minLength={8}
                            autoComplete="new-password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="At least 8 characters"
                            className="w-full rounded-xl border border-gray-200 bg-white pl-10 pr-11 py-3 text-sm text-ink placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((v) => !v)}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-ink"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                        </button>
                    </div>
                </div>

                {/* Terms */}
                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                    <input
                        type="checkbox"
                        required
                        checked={agree}
                        onChange={(e) => setAgree(e.target.checked)}
                        className="mt-0.5 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary/30"
                    />
                    <span className="text-sm text-muted">
                        I agree to the{" "}
                        <a href="#terms" className="font-semibold text-primary hover:text-primary-dark">
                            Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="#privacy" className="font-semibold text-primary hover:text-primary-dark">
                            Privacy Policy
                        </a>
                    </span>
                </label>

                <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full btn btn-primary justify-center text-base"
                >
                    Create Account
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </motion.button>

                {/* Divider */}
                <div className="flex items-center gap-3 py-1">
                    <span className="h-px flex-1 bg-gray-200" />
                    <span className="text-xs font-medium text-muted">or sign up with</span>
                    <span className="h-px flex-1 bg-gray-200" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <button
                        type="button"
                        className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 py-2.5 text-sm font-semibold text-ink hover:bg-accent transition"
                    >
                        <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
                            <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.2-2.27H12v4.3h6.47c-.28 1.5-1.13 2.77-2.4 3.62v3h3.87c2.27-2.09 3.55-5.17 3.55-8.65z" />
                            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.92l-3.87-3c-1.08.72-2.45 1.15-4.06 1.15-3.13 0-5.78-2.11-6.73-4.96H1.28v3.1C3.25 21.3 7.31 24 12 24z" />
                            <path fill="#FBBC05" d="M5.27 14.27A7.2 7.2 0 0 1 4.9 12c0-.79.14-1.56.37-2.27v-3.1H1.28A11.98 11.98 0 0 0 0 12c0 1.93.46 3.76 1.28 5.37l3.99-3.1z" />
                            <path fill="#EA4335" d="M12 4.77c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.94 1.19 15.24 0 12 0 7.31 0 3.25 2.7 1.28 6.63l3.99 3.1C6.22 6.88 8.87 4.77 12 4.77z" />
                        </svg>
                        Google
                    </button>
                    <button
                        type="button"
                        className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 py-2.5 text-sm font-semibold text-ink hover:bg-accent transition"
                    >
                        <svg className="h-4 w-4" fill="#1877F2" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06C2 17.06 5.66 21.2 10.44 22v-7.03H7.9v-2.91h2.54V9.85c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46H15.2c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.91h-2.34V22C18.34 21.2 22 17.06 22 12.06z" />
                        </svg>
                        Facebook
                    </button>
                </div>
            </form>

            <p className="mt-8 text-center text-sm text-muted">
                Already have an account?{" "}
                <a href="#login" className="font-semibold text-primary hover:text-primary-dark">
                    Log in
                </a>
            </p>
        </AuthLayout>
    );
}
