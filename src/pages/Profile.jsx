import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Lock,

  Camera,
  Save,
  Eye,
  EyeOff,
  ShieldCheck,
  Leaf,
  ArrowLeft,
} from "lucide-react";

const TABS = [
  { id: "profile", label: "Profile Info", icon: User },
  { id: "security", label: "Security", icon: Lock },
  ,
];

/* ---------------- Header ---------------- */
function ProfileHeader() {
  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-4xl mx-auto px-6 h-20 flex items-center justify-between">
        <a href="#dashboard" className="flex items-center gap-2 text-sm font-semibold text-muted hover:text-ink">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to Dashboard
        </a>
        <a href="#home" className="flex items-center gap-2.5" aria-label="FoodShare home">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-gradient">
            <Leaf className="h-4.5 w-4.5 text-white" aria-hidden="true" />
          </span>
          <span className="font-extrabold text-base text-primary-darker">FoodShare</span>
        </a>
      </div>
    </header>
  );
}

/* ---------------- Avatar + summary card ---------------- */
function ProfileSummary() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="card p-7 flex items-center gap-6 flex-wrap"
    >
      <div className="relative flex-shrink-0">
        <span className="flex h-20 w-20 rounded-full bg-gradient-to-br from-orange-200 to-orange-400 items-center justify-center text-2xl font-bold text-white">
          AM
        </span>
        <button
          className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white border-2 border-white hover:bg-primary-dark transition"
          aria-label="Change profile photo"
        >
          <Camera className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>
      <div className="min-w-0">
        <h1 className="text-xl font-extrabold text-primary-darker">Arjun Mehta</h1>
        <p className="text-sm text-muted">arjun.mehta@example.com</p>
        <span className="inline-flex items-center gap-1.5 mt-2 rounded-full bg-accent px-3 py-1 text-xs font-bold text-primary-dark">
          <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
          Verified Donor
        </span>
      </div>
    </motion.div>
  );
}

/* ---------------- Tabs ---------------- */
function TabNav({ active, onChange }) {
  return (
    <div className="flex gap-2 border-b border-gray-100 mb-6 overflow-x-auto">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors ${active === tab.id
              ? "border-primary text-primary-dark"
              : "border-transparent text-muted hover:text-ink"
            }`}
        >
          <tab.icon className="h-4 w-4" aria-hidden="true" />
          {tab.label}
        </button>
      ))}
    </div>
  );
}

/* ---------------- Profile Info Tab ---------------- */
function ProfileInfoTab() {
  const [form, setForm] = useState({
    name: "Arjun Mehta",
    email: "arjun.mehta@example.com",
    phone: "+91 98765 43210",
    address: "Model Town, Amritsar, Punjab",
  });
  const [saved, setSaved] = useState(false);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setSaved(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    // UI only — connect to backend later.
    console.log("Profile updated:", form);
    setSaved(true);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-ink mb-1.5">
            Full name
          </label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-ink mb-1.5">
            Email address
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
            />
          </div>
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-ink mb-1.5">
            Phone number
          </label>
          <div className="relative">
            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
            <input
              id="phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
            />
          </div>
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-semibold text-ink mb-1.5">
            Address
          </label>
          <div className="relative">
            <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
            <input
              id="address"
              name="address"
              value={form.address}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 pt-2">
        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="btn btn-primary text-sm"
        >
          <Save className="h-4 w-4" aria-hidden="true" />
          Save Changes
        </motion.button>
        <AnimatePresence>
          {saved && (
            <motion.span
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="text-sm font-semibold text-emerald-600"
            >
              ✓ Changes saved
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}

/* ---------------- Security Tab ---------------- */
function SecurityTab() {
  const [show, setShow] = useState({ current: false, next: false, confirm: false });
  const [form, setForm] = useState({ current: "", next: "", confirm: "" });
  const [saved, setSaved] = useState(false);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setSaved(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    // UI only — connect to backend later.
    console.log("Password change submitted:", form);
    setSaved(true);
    setForm({ current: "", next: "", confirm: "" });
  }

  const fields = [
    { name: "current", label: "Current password", key: "current" },
    { name: "next", label: "New password", key: "next" },
    { name: "confirm", label: "Confirm new password", key: "confirm" },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-md">
      {fields.map((f) => (
        <div key={f.name}>
          <label htmlFor={f.name} className="block text-sm font-semibold text-ink mb-1.5">
            {f.label}
          </label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
            <input
              id={f.name}
              name={f.name}
              type={show[f.key] ? "text" : "password"}
              required
              minLength={8}
              value={form[f.name]}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 pl-10 pr-11 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
            />
            <button
              type="button"
              onClick={() => setShow((s) => ({ ...s, [f.key]: !s[f.key] }))}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-ink"
              aria-label={show[f.key] ? "Hide password" : "Show password"}
            >
              {show[f.key] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
      ))}

      <div className="flex items-center gap-4 pt-2">
        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="btn btn-primary text-sm"
        >
          <Save className="h-4 w-4" aria-hidden="true" />
          Update Password
        </motion.button>
        <AnimatePresence>
          {saved && (
            <motion.span
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="text-sm font-semibold text-emerald-600"
            >
              ✓ Password updated
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}



/* ---------------- Main Page ---------------- */
export default function Profile() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="min-h-screen bg-gray-50/60">
      <ProfileHeader />

      <main className="max-w-4xl mx-auto px-6 py-10 space-y-6">
        <ProfileSummary />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="card p-7"
        >
          <TabNav active={activeTab} onChange={setActiveTab} />
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === "profile" && <ProfileInfoTab />}
              {activeTab === "security" && <SecurityTab />}

            </motion.div>
          </AnimatePresence>
        </motion.div>
      </main>
    </div>
  );
}