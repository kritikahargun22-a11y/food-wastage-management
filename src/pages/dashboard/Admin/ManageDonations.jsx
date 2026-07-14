import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Building2,
  Truck,
  BarChart3,
  FileText,
  Settings,
  LogOut,
  Bell,
  Leaf,
  Menu,
  X,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

/* ---------------- Sidebar ---------------- */
const NAV_ITEMS = [
  { label: "Overview", icon: LayoutDashboard, href: "#admin-dashboard" },
  { label: "Manage Users", icon: Users, href: "#manage-users" },
  { label: "Manage Donations", icon: Truck, active: true, href: "#manage-donations" },
  { label: "Approve NGOs", icon: Building2, href: "#approve-ngos" },
  { label: "Analytics", icon: BarChart3, href: "#analytics" },
  { label: "Reports", icon: FileText, href: "#reports" },
  { label: "Settings", icon: Settings, href: "#profile" },
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

        <div className="mx-4 mt-5 mb-2 flex items-center gap-2 rounded-xl bg-accent px-3 py-2">
          <ShieldCheck className="h-4 w-4 text-primary-dark" aria-hidden="true" />
          <span className="text-xs font-bold text-primary-dark tracking-wide">ADMIN ACCESS</span>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1" aria-label="Dashboard navigation">
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

        <div className="mx-4 mb-4 rounded-xl bg-primary-darker px-4 py-3.5">
          <p className="text-sm font-bold text-white">Super Admin</p>
          <p className="text-xs text-white/60">admin@foodshare.app</p>
        </div>

        <div className="px-4 pb-6 border-t border-gray-100 pt-4">
          <button
            onClick={() => {
              sessionStorage.removeItem("foodshare_isAdmin");
              window.location.hash = "#login";
            }}
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
        <h1 className="text-xl font-extrabold text-primary-darker tracking-tight">Platform Overview</h1>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative flex h-10 w-10 items-center justify-center rounded-xl hover:bg-accent" aria-label="Notifications">
          <Bell className="h-5 w-5 text-ink" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500" />
        </button>
        <span className="h-9 w-9 rounded-full bg-gradient-to-br from-violet-200 to-violet-500 flex items-center justify-center text-xs font-bold text-white">
          <ShieldCheck className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>
    </header>
  );
}

/* ---------------- Donations Data ---------------- */
const STATUS_STYLES = {
  Available: "bg-emerald-100 text-emerald-700",
  Claimed: "bg-amber-100 text-amber-700",
  "In Transit": "bg-sky-100 text-sky-700",
  Delivered: "bg-gray-100 text-gray-600",
  Expired: "bg-red-100 text-red-600",
};

const ALL_DONATIONS = [
  { id: "FS-88213", food: "Fresh Vegetable Crate", donor: "Aarav Mehta", ngo: "Hope Kitchen Trust", volunteer: "Priya Sharma", status: "In Transit", date: "Jul 05" },
  { id: "FS-88209", food: "Bakery Surplus Box", donor: "Daily Bread Co.", ngo: "—", volunteer: "—", status: "Available", date: "Jul 05" },
  { id: "FS-88198", food: "Cooked Meal Trays", donor: "Sunrise Banquets", ngo: "Seva Foundation", volunteer: "Rohan Kapoor", status: "Claimed", date: "Jul 04" },
  { id: "FS-88175", food: "Mixed Fruits", donor: "Fresh Mart", ngo: "Anna Daan NGO", volunteer: "Priya Sharma", status: "Delivered", date: "Jul 02" },
  { id: "FS-88160", food: "Dairy Products", donor: "Green Valley Farms", ngo: "—", volunteer: "—", status: "Expired", date: "Jun 30" },
];

const FILTERS = ["All", "Available", "Claimed", "In Transit", "Delivered", "Expired"];

/* ---------------- Manage Donations Table ---------------- */
function ManageDonations() {
  const [filter, setFilter] = useState("All");

  const filtered = ALL_DONATIONS.filter((d) => filter === "All" || d.status === filter);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="card p-7"
    >
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <h2 className="text-lg font-bold text-primary-darker">All Donations</h2>
      </div>

      <div className="flex gap-2 flex-wrap mb-6">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold border transition ${
              filter === f
                ? "bg-primary text-white border-primary"
                : "bg-white text-muted border-gray-200 hover:border-primary/40"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto -mx-2">
        <table className="w-full text-sm min-w-[760px]">
          <thead>
            <tr className="text-left text-xs font-bold uppercase tracking-wide text-muted">
              <th className="px-2 pb-3">ID</th>
              <th className="px-2 pb-3">Food</th>
              <th className="px-2 pb-3">Donor</th>
              <th className="px-2 pb-3">NGO</th>
              <th className="px-2 pb-3">Volunteer</th>
              <th className="px-2 pb-3">Status</th>
              <th className="px-2 pb-3">Date</th>
              <th className="px-2 pb-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {filtered.map((d) => (
                <motion.tr
                  key={d.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="border-t border-gray-100"
                >
                  <td className="px-2 py-3.5 font-mono text-xs text-muted">{d.id}</td>
                  <td className="px-2 py-3.5 font-semibold text-ink">{d.food}</td>
                  <td className="px-2 py-3.5 text-ink/80">{d.donor}</td>
                  <td className="px-2 py-3.5 text-ink/80">{d.ngo}</td>
                  <td className="px-2 py-3.5 text-ink/80">{d.volunteer}</td>
                  <td className="px-2 py-3.5">
                    <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${STATUS_STYLES[d.status]}`}>
                      {d.status}
                    </span>
                  </td>
                  <td className="px-2 py-3.5 text-ink/60 font-mono text-xs">{d.date}</td>
                  <td className="px-2 py-3.5 text-right">
                    <a
                      href="#"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-dark"
                    >
                      View <ArrowRight className="h-3 w-3" aria-hidden="true" />
                    </a>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
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
export default function ManageDonationsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50/60 flex">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 px-6 py-8 max-w-6xl w-full mx-auto">
          <ManageDonations />
        </main>
      </div>
    </div>
  );
}