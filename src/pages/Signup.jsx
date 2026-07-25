import { useState } from "react";
import { motion } from "framer-motion";
import {
  Leaf,
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  PackageOpen,
  Building2,
  Bike,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

const ROLES = [
  { id: "donor", label: "Donor", desc: "Give surplus food", icon: PackageOpen, color: "text-emerald-600" },
  { id: "ngo", label: "NGO", desc: "Receive & distribute", icon: Building2, color: "text-sky-600" },
  { id: "volunteer", label: "Volunteer", desc: "Handle pickups", icon: Bike, color: "text-amber-600" },
];

export default function Signup() {
  const { signup } = useAuth();
  const [role, setRole] = useState("donor");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      await signup({
        name: form.name,
        email: form.email,
        password: form.password,
        phone: form.phone,
        role,
      });

      if (role === "ngo") {
        window.location.hash = "#ngo-dashboard";
      } else if (role === "volunteer") {
        window.location.hash = "#volunteer-dashboard";
      } else {
        window.location.hash = "#dashboard";
      }
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("An account with this email already exists.");
      } else if (err.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else {
        setError("Something went wrong. Please try again.");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-soft-radial bg-gray-50/40">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-lg bg-white rounded-card shadow-lift px-8 py-10 sm:px-10"
      >
        <div className="flex items-center justify-center gap-2.5 mb-6">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-gradient shadow-soft">
            <Leaf className="h-5 w-5 text-white" strokeWidth={2.2} aria-hidden="true" />
          </span>
          <span className="font-extrabold text-lg text-primary-darker">FoodShare</span>
        </div>

        <h1 className="text-center text-2xl sm:text-3xl font-extrabold text-primary-darker tracking-tight">
          Create your account
        </h1>
        <p className="text-center text-sm text-muted mt-2 mb-7">
          Join as a donor, NGO, or volunteer — free, always.
        </p>

        {error && (
          <div className="flex items-center gap-2 rounded-xl bg-red-50 border border-red-100 px-4 py-3 mb-5 text-sm text-red-600">
            <AlertCircle className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-3 gap-3">
            {ROLES.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setRole(r.id)}
                aria-pressed={role === r.id}
                className={`flex flex-col items-center text-center rounded-xl border-2 px-3 py-4 transition ${
                  role === r.id ? "border-primary bg-accent" : "border-gray-200 hover:border-primary/40"
                }`}
              >
                <r.icon className={`h-6 w-6 mb-2 ${role === r.id ? r.color : "text-muted"}`} aria-hidden="true" />
                <span className="text-sm font-bold text-ink">{r.label}</span>
                <span className="text-[11px] text-muted mt-0.5 leading-tight">{r.desc}</span>
              </button>
            ))}
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-ink mb-1.5">
              Full name
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-muted" aria-hidden="true" />
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Jordan Lee"
                className="w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 py-3 text-sm text-ink placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-ink mb-1.5">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-muted" aria-hidden="true" />
                <input
                  id="email"
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

            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-ink mb-1.5">
                Phone number
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-muted" aria-hidden="true" />
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  className="w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 py-3 text-sm text-ink placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition"
                />
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-ink mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-muted" aria-hidden="true" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={6}
                  autoComplete="new-password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 bg-white pl-10 pr-11 py-3 text-sm text-ink focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition"
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

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-ink mb-1.5">
                Confirm password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-muted" aria-hidden="true" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  required
                  minLength={6}
                  autoComplete="new-password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 bg-white pl-10 pr-11 py-3 text-sm text-ink focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-ink"
                  aria-label={showConfirm ? "Hide password" : "Show password"}
                >
                  {showConfirm ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                </button>
              </div>
            </div>
          </div>

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
              .
            </span>
          </label>

          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full btn btn-primary justify-center text-base disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Create Account"}
            {!loading && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
          </motion.button>
        </form>

        <p className="mt-6 text-center text-sm text-muted">
          Already have an account?{" "}
          <a href="#login" className="font-semibold text-primary hover:text-primary-dark">
            Log in
          </a>
        </p>
      </motion.div>
    </div>
  );
}