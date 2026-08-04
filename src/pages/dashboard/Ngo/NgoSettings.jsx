import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  PackageSearch,
  ClipboardList,
  History,
  Bell,
  LogOut,
  Leaf,
  X,
  ShieldCheck,
  Settings as SettingsIcon,
  Menu,
  Building2,
  Mail,
  Phone,
  MapPin,
  Globe,
  Save,
  Trash2,
  AlertTriangle,
} from "lucide-react";
import { useLogout } from "../../../hooks/useLogout.js";
/* ---------------- Sidebar ---------------- */
const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, href: "#ngo-dashboard" },
  { label: "Available Donations", icon: PackageSearch, href: "#available-donations" },
  { label: "Manage Requests", icon: ClipboardList, href: "#manage-requests" },
  { label: "Donation History", icon: History, href: "#ngo-donation-history" },
  { label: "Notifications", icon: Bell, href: "#ngo-notifications" },
  { label: "Settings", icon: SettingsIcon, active: true, href: "#ngo-settings" },
];

function Sidebar({ open, onClose }) {
  const handleLogout = useLogout();
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-white border-r border-gray-100 flex flex-col z-50 transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
      >
        <div className="flex items-center justify-between px-6 h-20 border-b border-gray-100">
          <a href="#home" className="flex items-center gap-2.5" aria-label="FoodShare home">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-gradient">
              <Leaf className="h-4.5 w-4.5 text-white" aria-hidden="true" />
            </span>
            <span className="font-extrabold text-base text-primary-darker">FoodShare</span>
          </a>
          <button onClick={onClose} className="lg:hidden text-muted" aria-label="Close menu">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1" aria-label="Dashboard navigation">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${item.active
                ? "bg-accent text-primary-dark"
                : "text-muted hover:bg-gray-50 hover:text-ink"
                }`}
            >
              <item.icon className="h-4.5 w-4.5" aria-hidden="true" />
              {item.label}
            </a>
          ))}
        </nav>

        <div className="mx-4 mb-4 flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-100 px-4 py-3">
          <ShieldCheck className="h-4 w-4 text-emerald-600 flex-shrink-0" aria-hidden="true" />
          <span className="text-xs font-bold text-emerald-700">Verified NGO</span>
        </div>

        <div className="px-4 pb-6 border-t border-gray-100 pt-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-50"
          >
            <LogOut className="h-4.5 w-4.5" aria-hidden="true" />
            Log Out
          </button>
        </div>
      </aside>
    </>
  );
}

/* ---------------- Header ---------------- */
function DashboardHeader({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-4 bg-white/90 backdrop-blur-md border-b border-gray-100 px-6 h-20">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="lg:hidden text-ink" aria-label="Open menu">
          <Menu className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-extrabold text-primary-darker tracking-tight">Settings</h1>
      </div>
      <span className="h-9 w-9 rounded-full bg-gradient-to-br from-emerald-200 to-emerald-500 flex items-center justify-center text-xs font-bold text-white">
        HK
      </span>
    </header>
  );
}

/* ---------------- Toggle Row ---------------- */
function ToggleRow({ label, desc, checked, onChange }) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0">
      <div className="pr-4">
        <p className="text-sm font-semibold text-ink">{label}</p>
        {desc && <p className="text-xs text-muted mt-0.5">{desc}</p>}
      </div>
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 flex-shrink-0 rounded-full transition-colors ${checked ? "bg-primary" : "bg-gray-200"
          }`}
      >
        <motion.span
          layout
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow"
          style={{ left: checked ? "22px" : "2px" }}
        />
      </button>
    </div>
  );
}

/* ---------------- Organization Info ---------------- */
function OrganizationInfo() {
  const [form, setForm] = useState({
    name: "Hope Kitchen Trust",
    email: "contact@hopekitchen.org",
    phone: "+91 98765 12340",
    address: "Sector 12, Amritsar, Punjab",
  });
  const [saved, setSaved] = useState(false);

  function update(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
    setSaved(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Organization info updated:", form);
    setSaved(true);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="card p-7"
    >
      <div className="flex items-center gap-3 mb-6">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent">
          <Building2 className="h-5 w-5 text-primary-dark" aria-hidden="true" />
        </span>
        <div>
          <h2 className="text-lg font-bold text-primary-darker">Organization Info</h2>
          <p className="text-xs text-muted">Keep your NGO details up to date</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="org-name" className="block text-sm font-semibold text-ink mb-1.5">
            Organization name
          </label>
          <div className="relative">
            <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
            <input
              id="org-name"
              type="text"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className="w-full rounded-xl border border-gray-200 pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="org-email" className="block text-sm font-semibold text-ink mb-1.5">
              Email address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
              <input
                id="org-email"
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className="w-full rounded-xl border border-gray-200 pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
              />
            </div>
          </div>

          <div>
            <label htmlFor="org-phone" className="block text-sm font-semibold text-ink mb-1.5">
              Phone number
            </label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
              <input
                id="org-phone"
                type="tel"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                className="w-full rounded-xl border border-gray-200 pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
              />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="org-address" className="block text-sm font-semibold text-ink mb-1.5">
            Address
          </label>
          <div className="relative">
            <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
            <input
              id="org-address"
              type="text"
              value={form.address}
              onChange={(e) => update("address", e.target.value)}
              className="w-full rounded-xl border border-gray-200 pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
            />
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
    </motion.div>
  );
}

/* ---------------- Notification Preferences ---------------- */
function NotificationPreferences() {
  const [prefs, setPrefs] = useState({
    newDonations: true,
    pickupUpdates: true,
    expiryAlerts: true,
    weeklyDigest: false,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="card p-7"
    >
      <h2 className="text-lg font-bold text-primary-darker mb-1">Notification Preferences</h2>
      <p className="text-xs text-muted mb-2">Choose what your team gets notified about</p>

      <ToggleRow
        label="New donations nearby"
        desc="Alert when a matching donation is posted close to you."
        checked={prefs.newDonations}
        onChange={(v) => setPrefs((p) => ({ ...p, newDonations: v }))}
      />
      <ToggleRow
        label="Pickup updates"
        desc="Get notified when a volunteer picks up or delivers."
        checked={prefs.pickupUpdates}
        onChange={(v) => setPrefs((p) => ({ ...p, pickupUpdates: v }))}
      />
      <ToggleRow
        label="Expiry alerts"
        desc="Warn when a claimed donation is close to expiring."
        checked={prefs.expiryAlerts}
        onChange={(v) => setPrefs((p) => ({ ...p, expiryAlerts: v }))}
      />
      <ToggleRow
        label="Weekly digest"
        desc="A summary email of donations received each week."
        checked={prefs.weeklyDigest}
        onChange={(v) => setPrefs((p) => ({ ...p, weeklyDigest: v }))}
      />
    </motion.div>
  );
}

/* ---------------- Regional Preferences ---------------- */
const LANGUAGES = ["English", "हिन्दी", "ਪੰਜਾਬੀ"];

function RegionalPreferences() {
  const [language, setLanguage] = useState("English");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="card p-7"
    >
      <h2 className="text-lg font-bold text-primary-darker mb-1">Language & Region</h2>
      <p className="text-xs text-muted mb-5">Choose your preferred language</p>

      <div className="flex gap-2 flex-wrap">
        {LANGUAGES.map((lang) => (
          <button
            key={lang}
            onClick={() => setLanguage(lang)}
            className={`flex items-center gap-1.5 rounded-xl border px-4 py-2 text-sm font-semibold transition ${language === lang
              ? "border-primary bg-accent text-primary-dark"
              : "border-gray-200 text-muted hover:border-primary/40"
              }`}
          >
            <Globe className="h-3.5 w-3.5" aria-hidden="true" />
            {lang}
          </button>
        ))}
      </div>
    </motion.div>
  );
}

/* ---------------- Danger Zone ---------------- */
function DangerZone() {
  const [confirming, setConfirming] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="card p-7 border-red-100"
    >
      <div className="flex items-center gap-2 mb-1">
        <AlertTriangle className="h-4.5 w-4.5 text-red-500" aria-hidden="true" />
        <h2 className="text-lg font-bold text-red-600">Danger Zone</h2>
      </div>
      <p className="text-xs text-muted mb-5">Irreversible actions — proceed with caution</p>

      <div className="flex items-center justify-between rounded-xl border border-red-100 bg-red-50/50 px-4 py-4 flex-wrap gap-3">
        <div>
          <p className="text-sm font-bold text-ink">Deactivate NGO account</p>
          <p className="text-xs text-muted mt-0.5">
            Your organization will stop receiving donation matches and requests.
          </p>
        </div>
        {!confirming ? (
          <button
            onClick={() => setConfirming(true)}
            className="flex items-center gap-2 rounded-xl border border-red-300 text-red-600 text-sm font-semibold px-4 py-2 hover:bg-red-100 transition flex-shrink-0"
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
            Deactivate Account
          </button>
        ) : (
          <div className="flex gap-2 flex-shrink-0">
            <button
              onClick={() => console.log("NGO deactivation confirmed")}
              className="rounded-xl bg-red-600 text-white text-sm font-semibold px-4 py-2 hover:bg-red-700 transition"
            >
              Confirm Deactivate
            </button>
            <button
              onClick={() => setConfirming(false)}
              className="rounded-xl border border-gray-200 text-muted text-sm font-semibold px-4 py-2 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ---------------- Main Page ---------------- */
export default function NgoSettings() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50/60 flex">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 px-6 py-8 max-w-3xl w-full mx-auto space-y-6">
          <OrganizationInfo />
          <NotificationPreferences />
          <RegionalPreferences />
          <DangerZone />
        </main>
      </div>
    </div>
  );
}