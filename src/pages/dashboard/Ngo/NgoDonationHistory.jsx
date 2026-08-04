import { useState } from "react";
import { motion } from "framer-motion";
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
  Check,
  Truck,
} from "lucide-react";
import { useLogout } from "../../../hooks/useLogout.js";
/* ---------------- Sidebar ---------------- */
const NAV_ITEMS = [
  { label: "Overview", icon: LayoutDashboard, href: "#ngo-dashboard" },
  { label: "Available Donations", icon: PackageSearch, href: "#available-donations" },
  { label: "Manage Requests", icon: ClipboardList, href: "#manage-requests" },
  { label: "Donation History", icon: History, active: true, href: "#ngo-donation-history" },
  { label: "Notifications", icon: Bell, href: "#ngo-notifications" },
  { label: "Settings", icon: Settings, href: "#ngo-settings" },
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

/* ---------------- Current Delivery Timeline ---------------- */
const TIMELINE_STEPS = [
  { label: "Donation claimed", meta: "Jul 05, 2:45 PM", state: "done" },
  { label: "Volunteer assigned — Priya S.", meta: "Jul 05, 3:00 PM", state: "done" },
  { label: "Picked up — in transit", meta: "ETA 8 min", state: "active" },
  { label: "Delivered", meta: "Pending confirmation", state: "pending" },
];

function CurrentDeliveryTracker() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="card p-7"
    >
      <div className="flex items-center justify-between mb-7 flex-wrap gap-2">
        <h2 className="text-lg font-bold text-primary-darker">
          Fresh Vegetable Crate <span className="text-muted font-medium">— #FS-88213</span>
        </h2>
        <span className="rounded-full bg-sky-100 text-sky-700 text-xs font-bold uppercase px-3 py-1">
          In Transit
        </span>
      </div>

      <div className="space-y-0">
        {TIMELINE_STEPS.map((step, i) => (
          <div key={step.label} className="flex gap-4">
            <div className="flex flex-col items-center">
              <span
                className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold ${step.state === "done"
                    ? "bg-primary text-white"
                    : step.state === "active"
                      ? "bg-orange-500 text-white"
                      : "bg-gray-100 text-muted"
                  }`}
              >
                {step.state === "done" ? (
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                ) : step.state === "active" ? (
                  <span className="h-2 w-2 rounded-full bg-white" />
                ) : (
                  i + 1
                )}
              </span>
              {i < TIMELINE_STEPS.length - 1 && (
                <span
                  className={`w-px flex-1 min-h-[36px] ${step.state === "done" ? "bg-primary" : "bg-gray-200"
                    }`}
                />
              )}
            </div>
            <div className="pb-7">
              <p
                className={`text-sm font-bold ${step.state === "pending" ? "text-muted" : "text-ink"
                  }`}
              >
                {step.label}
              </p>
              <p className="text-xs text-muted mt-0.5">{step.meta}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ---------------- Full History Table ---------------- */
const STATUS_STYLES = {
  Delivered: "bg-emerald-100 text-emerald-700",
  "In Transit": "bg-sky-100 text-sky-700",
  Claimed: "bg-amber-100 text-amber-700",
};

const FILTERS = ["All", "Delivered", "In Transit", "Claimed"];

const HISTORY = [
  { donation: "Fresh Vegetable Crate", donor: "Aarav Mehta", meals: 24, status: "In Transit", date: "Jul 05" },
  { donation: "Bakery Surplus Box", donor: "Daily Bread Co.", meals: 10, status: "Claimed", date: "Jul 04" },
  { donation: "Cooked Meal Trays", donor: "Sunrise Banquets", meals: 45, status: "Delivered", date: "Jul 02" },
  { donation: "Dairy Surplus Pack", donor: "Green Valley Farms", meals: 18, status: "Delivered", date: "Jun 30" },
  { donation: "Grain & Rice Sacks", donor: "City Wholesale Mart", meals: 60, status: "Delivered", date: "Jun 28" },
  { donation: "Beverage Crates", donor: "Cafe Aroma", meals: 24, status: "Delivered", date: "Jun 25" },
];

function DonationHistoryTable() {
  const [filter, setFilter] = useState("All");

  const filtered = HISTORY.filter((h) => filter === "All" || h.status === filter);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="card p-7"
    >
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <h2 className="text-lg font-bold text-primary-darker">All Donations Received</h2>
      </div>

      <div className="flex gap-2 flex-wrap mb-6">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold border transition ${filter === f
                ? "bg-primary text-white border-primary"
                : "bg-white text-muted border-gray-200 hover:border-primary/40"
              }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto -mx-2">
        <table className="w-full text-sm min-w-[600px]">
          <thead>
            <tr className="text-left text-xs font-bold uppercase tracking-wide text-muted">
              <th className="px-2 pb-3">Donation</th>
              <th className="px-2 pb-3">Donor</th>
              <th className="px-2 pb-3">Meals</th>
              <th className="px-2 pb-3">Status</th>
              <th className="px-2 pb-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((h) => (
              <tr key={h.donation} className="border-t border-gray-100">
                <td className="px-2 py-3.5 font-semibold text-ink">{h.donation}</td>
                <td className="px-2 py-3.5 text-ink/80">{h.donor}</td>
                <td className="px-2 py-3.5 text-ink/80">{h.meals}</td>
                <td className="px-2 py-3.5">
                  <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${STATUS_STYLES[h.status]}`}>
                    {h.status}
                  </span>
                </td>
                <td className="px-2 py-3.5 text-ink/60 font-mono text-xs">{h.date}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <p className="text-sm text-muted text-center py-10">No donations match this filter.</p>
        )}
      </div>
    </motion.div>
  );
}

/* ---------------- Main Page ---------------- */
export default function NgoDonationHistory() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50/60 flex">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 px-6 py-8 max-w-6xl w-full mx-auto space-y-6">
          <CurrentDeliveryTracker />
          <DonationHistoryTable />
        </main>
      </div>
    </div>
  );
}