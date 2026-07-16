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
  ArrowRight,
} from "lucide-react";

/* ---------------- Sidebar ---------------- */
const NAV_ITEMS = [
  { label: "Overview", icon: LayoutDashboard, href: "#ngo-dashboard" },
  { label: "Available Donations", icon: PackageSearch, href: "#available-donations" },
  { label: "Manage Requests", icon: ClipboardList, active: true, href: "#manage-requests" },
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

/* ---------------- Requests Data ---------------- */
const STATUS_STYLES = {
  Claimed: { bg: "bg-amber-100", text: "text-amber-700" },
  "In Transit": { bg: "bg-sky-100", text: "text-sky-700" },
  Delivered: { bg: "bg-emerald-100", text: "text-emerald-700" },
};

const FILTERS = ["All", "Claimed", "In Transit", "Delivered"];

const ALL_REQUESTS = [
  { donation: "Fresh Vegetable Crate", donor: "Aarav Mehta", volunteer: "Priya S.", status: "In Transit", action: "Track" },
  { donation: "Bakery Surplus Box", donor: "Daily Bread Co.", volunteer: "Rohan K.", status: "Claimed", action: "Assign" },
  { donation: "Cooked Meal Trays", donor: "Sunrise Banquets", volunteer: "Priya S.", status: "Delivered", action: "View" },
  { donation: "Dairy Surplus Pack", donor: "Green Valley Farms", volunteer: "—", status: "Claimed", action: "Assign" },
  { donation: "Grain & Rice Sacks", donor: "City Wholesale Mart", volunteer: "Aditi R.", status: "In Transit", action: "Track" },
];

/* ---------------- Manage Requests Table ---------------- */
function ManageRequests() {
  const [filter, setFilter] = useState("All");

  const filtered = ALL_REQUESTS.filter((r) => filter === "All" || r.status === filter);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="card p-7"
    >
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <h2 className="text-lg font-bold text-primary-darker">Manage Requests</h2>
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
            {filtered.map((r) => {
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

        {filtered.length === 0 && (
          <p className="text-sm text-muted text-center py-10">No requests match this filter.</p>
        )}
      </div>
    </motion.div>
  );
}

/* ---------------- Main Page ---------------- */
export default function ManageRequestsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50/60 flex">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 px-6 py-8 max-w-6xl w-full mx-auto">
          <ManageRequests />
        </main>
      </div>
    </div>
  );
}