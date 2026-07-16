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
  Settings,
  Menu,
  Timer,
} from "lucide-react";

/* ---------------- Sidebar ---------------- */
const NAV_ITEMS = [
  { label: "Overview", icon: LayoutDashboard, href: "#ngo-dashboard" },
  { label: "Available Donations", icon: PackageSearch, active: true, href: "#available-donations" },
  { label: "Manage Requests", icon: ClipboardList, href: "#manage-requests" },
  { label: "Donation History", icon: History, href: "#ngo-donation-history" },
  { label: "Notifications", icon: Bell, href: "#ngo-notifications" },
  { label: "Settings", icon: Settings, href: "#ngo-settings" },
];

function Sidebar({ open, onClose }) {
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

        {/* Verified NGO badge */}
        <div className="mx-4 mb-4 flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-100 px-4 py-3">
          <ShieldCheck className="h-4 w-4 text-emerald-600 flex-shrink-0" aria-hidden="true" />
          <span className="text-xs font-bold text-emerald-700">Verified NGO</span>
        </div>

        <div className="px-4 pb-6 border-t border-gray-100 pt-4">
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
        <h1 className="text-xl font-extrabold text-primary-darker tracking-tight">
          Hope Kitchen Trust
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative flex h-10 w-10 items-center justify-center rounded-xl hover:bg-accent" aria-label="Notifications">
          <Bell className="h-5 w-5 text-ink" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500" />
        </button>
        <span className="h-9 w-9 rounded-full bg-gradient-to-br from-emerald-200 to-emerald-500 flex items-center justify-center text-xs font-bold text-white">
          HK
        </span>
      </div>
    </header>
  );
}

/* ---------------- Donations Data ---------------- */
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
  {
    id: "4",
    emoji: "🥛",
    title: "Dairy Surplus Pack",
    meta: "12 L · 3.6 km away",
    donor: "Green Valley Farms",
    expiry: "Expires 8h 00m",
    category: "Produce",
  },
  {
    id: "5",
    emoji: "🍚",
    title: "Grain & Rice Sacks",
    meta: "40 kg · 4.8 km away",
    donor: "City Wholesale Mart",
    expiry: "Expires 5h 45m",
    category: "Produce",
  },
  {
    id: "6",
    emoji: "🧃",
    title: "Beverage Crates",
    meta: "24 bottles · 1.9 km away",
    donor: "Cafe Aroma",
    expiry: "Expires 10h 00m",
    category: "Cooked Meals",
  },
];

/* ---------------- Donation Card ---------------- */
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

/* ---------------- Available Donations Grid ---------------- */
function AvailableDonationsGrid() {
  const [category, setCategory] = useState("All");
  const [claimedIds, setClaimedIds] = useState([]);

  const filtered = NEARBY_DONATIONS.filter(
    (d) => category === "All" || d.category === category
  );

  function handleClaim(id) {
    setClaimedIds((c) => [...c, id]);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
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

      {filtered.length === 0 && (
        <p className="text-sm text-muted text-center py-16">No donations in this category right now.</p>
      )}
    </div>
  );
}

/* ---------------- Main Page ---------------- */
export default function AvailableDonations() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50/60 flex">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 px-6 py-8 max-w-6xl w-full mx-auto">
          <AvailableDonationsGrid />
        </main>
      </div>
    </div>
  );
}