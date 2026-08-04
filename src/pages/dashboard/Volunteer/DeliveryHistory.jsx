import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Bike,
  Navigation as NavigationIcon,
  History,
  Bell as BellIcon,
  Settings as SettingsIcon,
  User,
  LogOut,
  Leaf,
  Menu,
  X,
  CheckCircle2,
  Star,
  Weight,
  TrendingUp,
} from "lucide-react";
import { useLogout } from "../../../hooks/useLogout.js";
/* ---------------- Sidebar ---------------- */
const NAV_ITEMS = [
  { label: "Overview", icon: LayoutDashboard, href: "#volunteer-dashboard" },
  { label: "Assigned Pickups", icon: Bike, href: "#assigned-pickups" },
  { label: "Navigation", icon: NavigationIcon, href: "#volunteer-navigation" },
  { label: "Delivery History", icon: History, active: true, href: "#delivery-history" },
  { label: "Notifications", icon: BellIcon, href: "#volunteer-notifications" },

  { label: "Settings", icon: SettingsIcon, href: "#" },
];

function Sidebar({ open, onClose, available, onToggleAvailable }) {
  const handleLogout = useLogout();
  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/30 z-40 lg:hidden" onClick={onClose} aria-hidden="true" />
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

        <div className="mx-4 mb-4 rounded-xl bg-accent/60 border border-emerald-100 px-4 py-3.5">
          <button onClick={onToggleAvailable} className="flex items-center gap-2 w-full">
            <span
              className={`h-2.5 w-2.5 rounded-full flex-shrink-0 ${available ? "bg-emerald-500" : "bg-gray-300"
                }`}
            />
            <span className="text-xs font-bold text-primary-darker">
              {available ? "Available for pickups" : "Offline"}
            </span>
          </button>
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
        <h1 className="text-xl font-extrabold text-primary-darker tracking-tight">Delivery History</h1>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative flex h-10 w-10 items-center justify-center rounded-xl hover:bg-accent" aria-label="Notifications">
          <BellIcon className="h-5 w-5 text-ink" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500" />
        </button>
        <span className="h-9 w-9 rounded-full bg-gradient-to-br from-sky-200 to-sky-500 flex items-center justify-center text-xs font-bold text-white">
          AD
        </span>
      </div>
    </header>
  );
}

/* ---------------- Stat Card ---------------- */
function StatCard({ icon: Icon, iconBg, value, label, trend, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -4 }}
      className="card p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconBg}`}>
          <Icon className="h-5 w-5 text-white" aria-hidden="true" />
        </span>
        {trend && (
          <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 rounded-full px-2.5 py-1">
            <TrendingUp className="h-3 w-3" /> {trend}
          </span>
        )}
      </div>
      <div className="text-2xl font-extrabold text-primary-darker tracking-tight">{value}</div>
      <p className="mt-1 text-sm text-muted font-medium">{label}</p>
    </motion.div>
  );
}

/* ---------------- History Table ---------------- */
const FILTERS = ["All", "This Week", "This Month"];

const DELIVERIES = [
  { id: "PU-1042", food: "Fresh Vegetable Crate", donor: "Green Bowl Cafe", ngo: "Hope Kitchen Trust", rating: 5, date: "Jul 05" },
  { id: "PU-1039", food: "Cooked Meal Trays", donor: "Taj Banquet Hall", ngo: "Anna Daan NGO", rating: 5, date: "Jul 04" },
  { id: "PU-1035", food: "Bakery Surplus Box", donor: "Sunrise Bakery", ngo: "Seva Foundation", rating: 4, date: "Jul 02" },
  { id: "PU-1030", food: "Dairy Surplus Pack", donor: "Green Valley Farms", ngo: "Hope Kitchen Trust", rating: 5, date: "Jun 30" },
  { id: "PU-1024", food: "Grain & Rice Sacks", donor: "City Wholesale Mart", ngo: "Anna Daan NGO", rating: 5, date: "Jun 27" },
  { id: "PU-1018", food: "Beverage Crates", donor: "Cafe Aroma", ngo: "Seva Foundation", rating: 4, date: "Jun 24" },
];

function DeliveryHistoryTable() {
  const [filter, setFilter] = useState("All");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="card p-7"
    >
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <h2 className="text-lg font-bold text-primary-darker">Completed Deliveries</h2>
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
        <table className="w-full text-sm min-w-[640px]">
          <thead>
            <tr className="text-left text-xs font-bold uppercase tracking-wide text-muted">
              <th className="px-2 pb-3">ID</th>
              <th className="px-2 pb-3">Food</th>
              <th className="px-2 pb-3">Donor</th>
              <th className="px-2 pb-3">NGO</th>
              <th className="px-2 pb-3">Rating</th>
              <th className="px-2 pb-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {DELIVERIES.map((d) => (
              <tr key={d.id} className="border-t border-gray-100">
                <td className="px-2 py-3.5 font-mono text-xs text-muted">{d.id}</td>
                <td className="px-2 py-3.5 font-semibold text-ink">{d.food}</td>
                <td className="px-2 py-3.5 text-ink/80">{d.donor}</td>
                <td className="px-2 py-3.5 text-ink/80">{d.ngo}</td>
                <td className="px-2 py-3.5">
                  <span className="flex items-center gap-1 text-amber-500">
                    <Star className="h-3.5 w-3.5 fill-amber-400" aria-hidden="true" />
                    <span className="text-ink font-semibold text-xs">{d.rating}.0</span>
                  </span>
                </td>
                <td className="px-2 py-3.5 text-ink/60 font-mono text-xs">{d.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

/* ---------------- Main Page ---------------- */
export default function VolunteerHistory() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [available, setAvailable] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50/60 flex">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        available={available}
        onToggleAvailable={() => setAvailable((a) => !a)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 px-6 py-8 max-w-6xl w-full mx-auto space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
            <StatCard icon={CheckCircle2} iconBg="bg-emerald-500" value="86" label="Total Deliveries" trend="+6" delay={0} />
            <StatCard icon={Weight} iconBg="bg-orange-500" value="640 kg" label="Food Delivered" trend="+45 kg" delay={0.05} />
            <StatCard icon={Star} iconBg="bg-amber-500" value="4.9" label="Average Rating" delay={0.1} />
          </div>

          <DeliveryHistoryTable />
        </main>
      </div>
    </div>
  );
}
