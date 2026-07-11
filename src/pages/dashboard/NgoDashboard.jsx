import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  PackageSearch,
  ClipboardList,
  History,
  Bell as BellIcon,
  User,
  LogOut,
  Leaf,
  Menu,
  X,
  Clock,
  Truck,
  MapPin,
  Utensils,
  Timer,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

/* ---------------- Sidebar ---------------- */
const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, active: true, href: "#ngo-dashboard" },
  { label: "Available Donations", icon: PackageSearch, href: "#" },
  { label: "Manage Requests", icon: ClipboardList, href: "#" },
  { label: "Donation History", icon: History, href: "#" },
  { label: "Notifications", icon: BellIcon, href: "#" },
  { label: "Profile", icon: User, href: "#profile" },
];

function Sidebar({ open, onClose }) {
  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/30 z-40 lg:hidden" onClick={onClose} aria-hidden="true" />
      )}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-white border-r border-gray-100 flex flex-col z-50 transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
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
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                item.active
                  ? "bg-accent text-primary-dark"
                  : "text-muted hover:bg-gray-50 hover:text-ink"
              }`}
            >
              <item.icon className="h-4.5 w-4.5" aria-hidden="true" />
              {item.label}
            </a>
          ))}
        </nav>

        <div className="px-4 py-6 border-t border-gray-100">
          <a
            href="#logout"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-50"
          >
            <LogOut className="h-4.5 w-4.5" aria-hidden="true" />
            Log Out
          </a>
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
        <div>
          <h1 className="text-xl font-extrabold text-primary-darker tracking-tight">
            Hope Kitchen Trust
          </h1>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" /> Verified NGO
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative flex h-10 w-10 items-center justify-center rounded-xl hover:bg-accent" aria-label="Notifications">
          <BellIcon className="h-5 w-5 text-ink" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500" />
        </button>
        <span className="h-9 w-9 rounded-full bg-gradient-to-br from-emerald-200 to-emerald-500 flex items-center justify-center text-xs font-bold text-white">
          HK
        </span>
      </div>
    </header>
  );
}

/* ---------------- Stat Card ---------------- */
function StatCard({ icon: Icon, iconBg, value, label, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -4 }}
      className="card p-6"
    >
      <span className={`flex h-11 w-11 items-center justify-center rounded-xl mb-4 ${iconBg}`}>
        <Icon className="h-5 w-5 text-white" aria-hidden="true" />
      </span>
      <div className="text-2xl font-extrabold text-primary-darker tracking-tight">{value}</div>
      <p className="mt-1 text-sm text-muted font-medium">{label}</p>
    </motion.div>
  );
}

/* ---------------- Available Donations Nearby ---------------- */
const CATEGORIES = ["All", "Cooked Meals", "Produce", "Bakery"];

const NEARBY_DONATIONS = [
  {
    id: "1",
    emoji: "🥗",
    title: "Fresh Vegetable Crate",
    meta: "18 kg · 2.4 km away",
    donor: "Aarav Mehta",
    expiry: "Expires 2h 10m",
    category: "Produce",
  },
  {
    id: "2",
    emoji: "🍛",
    title: "Wedding Hall Meal Trays",
    meta: "45 servings · 5.1 km away",
    donor: "Sunrise Banquets",
    expiry: "Expires 4h 00m",
    category: "Cooked Meals",
  },
  {
    id: "3",
    emoji: "🍞",
    title: "Bakery Surplus Box",
    meta: "6 kg · 1.2 km away",
    donor: "Daily Bread Co.",
    expiry: "Expires 6h 30m",
    category: "Bakery",
  },
];

function DonationCard({ item, onClaim, claimed }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -4 }}
      className="card p-5 flex flex-col"
    >
      <div className="flex items-start justify-between mb-4">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-2xl">
          {item.emoji}
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 text-rose-600 text-xs font-semibold px-3 py-1">
          <Timer className="h-3.5 w-3.5" aria-hidden="true" /> {item.expiry}
        </span>
      </div>
      <h3 className="text-base font-bold text-ink mb-1">{item.title}</h3>
      <p className="text-xs text-muted mb-1">{item.meta}</p>
      <p className="text-xs text-muted mb-4">{item.donor}</p>

      <button
        onClick={() => onClaim(item.id)}
        disabled={claimed}
        className={`mt-auto w-full rounded-xl py-2.5 text-sm font-semibold transition ${
          claimed
            ? "bg-emerald-100 text-emerald-700 cursor-default"
            : "bg-green-gradient text-white hover:opacity-90"
        }`}
      >
        {claimed ? "Claimed ✓" : "Claim Donation"}
      </button>
    </motion.div>
  );
}

function AvailableDonations() {
  const [category, setCategory] = useState("All");
  const [claimedIds, setClaimedIds] = useState([]);

  const filtered = NEARBY_DONATIONS.filter(
    (d) => category === "All" || d.category === category
  );

  function handleClaim(id) {
    setClaimedIds((c) => [...c, id]);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <h2 className="text-lg font-bold text-primary-darker">Available Donations Nearby</h2>
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold border transition ${
                category === cat
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-muted border-gray-200 hover:border-primary/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence>
          {filtered.map((item) => (
            <DonationCard
              key={item.id}
              item={item}
              claimed={claimedIds.includes(item.id)}
              onClaim={handleClaim}
            />
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ---------------- Manage Requests Table ---------------- */
const STATUS_STYLES = {
  "In Transit": { bg: "bg-sky-100", text: "text-sky-700" },
  Claimed: { bg: "bg-amber-100", text: "text-amber-700" },
  Delivered: { bg: "bg-emerald-100", text: "text-emerald-700" },
};

const REQUESTS = [
  { donation: "Fresh Vegetable Crate", donor: "Aarav Mehta", volunteer: "Priya S.", status: "In Transit", action: "Track" },
  { donation: "Bakery Surplus Box", donor: "Daily Bread Co.", volunteer: "Rohan K.", status: "Claimed", action: "Assign" },
  { donation: "Cooked Meal Trays", donor: "Sunrise Banquets", volunteer: "Priya S.", status: "Delivered", action: "View" },
];

function ManageRequests() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="card p-7"
    >
      <h2 className="text-lg font-bold text-primary-darker mb-6">Manage Requests</h2>
      <div className="overflow-x-auto -mx-2">
        <table className="w-full text-sm min-w-[600px]">
          <thead>
            <tr className="text-left text-xs font-bold uppercase tracking-wide text-muted">
              <th className="px-2 pb-3">Donation</th>
              <th className="px-2 pb-3">Donor</th>
              <th className="px-2 pb-3">Volunteer</th>
              <th className="px-2 pb-3">Status</th>
              <th className="px-2 pb-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {REQUESTS.map((r) => {
              const s = STATUS_STYLES[r.status];
              return (
                <tr key={r.donation} className="border-t border-gray-100">
                  <td className="px-2 py-3.5 font-semibold text-ink">{r.donation}</td>
                  <td className="px-2 py-3.5 text-ink/80">{r.donor}</td>
                  <td className="px-2 py-3.5 text-ink/80">{r.volunteer}</td>
                  <td className="px-2 py-3.5">
                    <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${s.bg} ${s.text}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-2 py-3.5 text-right">
                    <a
                      href="#"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-dark"
                    >
                      {r.action} <ArrowRight className="h-3 w-3" aria-hidden="true" />
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

/* ---------------- Live Pickup Tracker ---------------- */
function LivePickupTracker() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
      className="card p-7"
    >
      <h2 className="text-lg font-bold text-primary-darker mb-6">Live Pickup Tracker</h2>

      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-50 to-orange-50 aspect-[16/7]">
        <svg viewBox="0 0 800 350" className="h-full w-full">
          <path
            d="M60 60 L60 260 Q60 300 100 300 L720 300"
            fill="none"
            stroke="#9CA3AF"
            strokeWidth="2"
            strokeDasharray="6 8"
          />
          <circle cx="60" cy="60" r="7" fill="#16A34A" />
          <circle cx="60" cy="60" r="14" fill="#16A34A" opacity="0.25">
            <animate attributeName="r" values="10;22;10" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.35;0;0.35" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="720" cy="300" r="7" fill="#F97316" />
        </svg>

        <div className="absolute top-4 left-4 flex items-center gap-2 rounded-lg bg-white/90 backdrop-blur px-3 py-1.5 shadow-soft">
          <span className="h-2.5 w-2.5 rounded-full bg-primary" />
          <span className="text-xs font-semibold text-ink">Donor: Aarav Mehta, MG Road</span>
        </div>
        <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-lg bg-white/90 backdrop-blur px-3 py-1.5 shadow-soft">
          <span className="h-2.5 w-2.5 rounded-full bg-orange-500" />
          <span className="text-xs font-semibold text-ink">Drop-off: Hope Kitchen Trust, Sector 12</span>
        </div>
      </div>
    </motion.div>
  );
}

/* ---------------- Main Dashboard Page ---------------- */
export default function NgoDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50/60 flex">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 px-6 py-8 max-w-6xl w-full mx-auto space-y-8">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            <StatCard icon={PackageSearch} iconBg="bg-emerald-500" value="18" label="Donations Claimed" delay={0} />
            <StatCard icon={Truck} iconBg="bg-orange-500" value="3" label="Pickups In Transit" delay={0.05} />
            <StatCard icon={Utensils} iconBg="bg-sky-500" value="960" label="Meals Distributed" delay={0.1} />
            <StatCard icon={Clock} iconBg="bg-slate-800" value="22 min" label="Avg. Response Time" delay={0.15} />
          </div>

          <AvailableDonations />
          <ManageRequests />
          <LivePickupTracker />
        </main>
      </div>
    </div>
  );
}