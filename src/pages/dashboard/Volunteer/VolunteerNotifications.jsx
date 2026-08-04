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
  PackagePlus,
  CheckCircle2,
  Star,
  AlarmClock,
} from "lucide-react";
import { useLogout } from "../../../hooks/useLogout.js";
/* ---------------- Sidebar ---------------- */
const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, href: "#volunteer-dashboard" },
  { label: "Assigned Pickups", icon: Bike, href: "#assigned-pickups" },
  { label: "Navigation", icon: NavigationIcon, href: "#volunteer-navigation" },
  { label: "Delivery History", icon: History, href: "#volunteer-history" },
  { label: "Notifications", icon: BellIcon, active: true, href: "#volunteer-notifications" },
  { label: "Settings", icon: SettingsIcon, href: "#volunteer-settings" },
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
        <h1 className="text-xl font-extrabold text-primary-darker tracking-tight">Notifications</h1>
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

/* ---------------- Notifications List ---------------- */
const NOTIFICATIONS = [
  {
    id: "1",
    icon: PackagePlus,
    iconBg: "bg-sky-500",
    title: "New pickup assigned",
    desc: "Bakery Surplus Box at Sunrise Bakery · 3.4 km away",
    time: "5 min ago",
  },
  {
    id: "2",
    icon: AlarmClock,
    iconBg: "bg-orange-500",
    title: "Pickup window closing soon",
    desc: "Fresh Vegetable Crate must be collected within 30 minutes",
    time: "20 min ago",
  },
  {
    id: "3",
    icon: CheckCircle2,
    iconBg: "bg-primary",
    title: "Delivery confirmed",
    desc: "Cooked Meal Trays delivered to Anna Daan NGO",
    time: "2h ago",
  },
  {
    id: "4",
    icon: Star,
    iconBg: "bg-amber-500",
    title: "New rating received",
    desc: "Hope Kitchen Trust rated your delivery 5 stars",
    time: "1d ago",
  },
];

function NotificationsList() {
  const [items] = useState(NOTIFICATIONS);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="card p-7"
    >
      <h2 className="text-lg font-bold text-primary-darker mb-6">Notifications</h2>

      <div className="space-y-3">
        {items.map((n, i) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.08 }}
            className="flex items-start gap-4 rounded-xl border border-gray-100 px-4 py-4 hover:bg-gray-50/60 transition"
          >
            <span className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${n.iconBg}`}>
              <n.icon className="h-5 w-5 text-white" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-bold text-ink">{n.title}</p>
              <p className="text-xs text-muted mt-0.5">
                {n.desc} · {n.time}
              </p>
            </div>
          </motion.div>
        ))}

        {items.length === 0 && (
          <p className="text-sm text-muted text-center py-10">No notifications yet.</p>
        )}
      </div>
    </motion.div>
  );
}

/* ---------------- Main Page ---------------- */
export default function VolunteerNotifications() {
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

        <main className="flex-1 px-6 py-8 max-w-6xl w-full mx-auto">
          <NotificationsList />
        </main>
      </div>
    </div>
  );
}