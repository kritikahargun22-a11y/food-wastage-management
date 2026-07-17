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
  Phone,
  MapPin,
  ArrowRight,
  Flag,
} from "lucide-react";

/* ---------------- Sidebar ---------------- */
const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, href: "#volunteer-dashboard" },
  { label: "Assigned Pickups", icon: Bike, href: "#assigned-pickups" },
  { label: "Navigation", icon: NavigationIcon, active: true, href: "#navigation" },
  { label: "Delivery History", icon: History, href: "#delivery-history" },
  { label: "Notifications", icon: BellIcon, href: "#volunteer-notifications" },
  
  { label: "Settings", icon: SettingsIcon,href: "#" },
];

function Sidebar({ open, onClose, available, onToggleAvailable }) {
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

        <div className="mx-4 mb-4 rounded-xl bg-accent/60 border border-emerald-100 px-4 py-3.5">
          <button onClick={onToggleAvailable} className="flex items-center gap-2 w-full">
            <span
              className={`h-2.5 w-2.5 rounded-full flex-shrink-0 ${
                available ? "bg-emerald-500" : "bg-gray-300"
              }`}
            />
            <span className="text-xs font-bold text-primary-darker">
              {available ? "Available for pickups" : "Offline"}
            </span>
          </button>
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
        <h1 className="text-xl font-extrabold text-primary-darker tracking-tight">Navigation</h1>
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

/* ---------------- Route Map ---------------- */
function RouteMap() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="card p-7"
    >
      <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
        <h2 className="text-lg font-bold text-primary-darker">
          Green Bowl Cafe <span className="text-muted font-medium">→ Hope Kitchen Trust</span>
        </h2>
        <span className="rounded-full bg-sky-100 text-sky-700 text-xs font-bold px-3 py-1">
          8 min · 1.2 km
        </span>
      </div>

      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-sky-50 to-emerald-50 aspect-[16/8]">
        <svg viewBox="0 0 800 350" className="h-full w-full">
          <path
            d="M60 60 Q 260 60 300 160 T 720 300"
            fill="none"
            stroke="#94A3B8"
            strokeWidth="3"
            strokeDasharray="7 9"
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
          <span className="text-xs font-semibold text-ink">Pickup: Green Bowl Cafe</span>
        </div>
        <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-lg bg-white/90 backdrop-blur px-3 py-1.5 shadow-soft">
          <span className="h-2.5 w-2.5 rounded-full bg-orange-500" />
          <span className="text-xs font-semibold text-ink">Drop-off: Hope Kitchen Trust</span>
        </div>
      </div>

      <div className="flex gap-3 mt-5">
        <button className="flex items-center gap-2 rounded-xl border border-gray-200 text-ink text-sm font-semibold px-4 py-2.5 hover:bg-gray-50 transition">
          <Phone className="h-4 w-4" aria-hidden="true" />
          Call Donor
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-green-gradient text-white text-sm font-semibold py-2.5 hover:opacity-90 transition">
          Open in Maps
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </motion.div>
  );
}

/* ---------------- Turn-by-turn Directions ---------------- */
const DIRECTIONS = [
  { instruction: "Head north on MG Road", distance: "300 m" },
  { instruction: "Turn right onto Church Street", distance: "450 m" },
  { instruction: "Continue straight past Sector 10 signal", distance: "280 m" },
  { instruction: "Turn left onto Sector 12 Main Road", distance: "170 m" },
  { instruction: "Arrive at Hope Kitchen Trust", distance: "Destination" },
];

function DirectionsList() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="card p-7"
    >
      <h2 className="text-lg font-bold text-primary-darker mb-5">Turn-by-Turn Directions</h2>
      <div className="space-y-0">
        {DIRECTIONS.map((step, i) => (
          <div key={i} className="flex gap-4">
            <div className="flex flex-col items-center">
              <span
                className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  i === DIRECTIONS.length - 1
                    ? "bg-orange-500 text-white"
                    : "bg-accent text-primary-dark"
                }`}
              >
                {i === DIRECTIONS.length - 1 ? (
                  <Flag className="h-3.5 w-3.5" aria-hidden="true" />
                ) : (
                  <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                )}
              </span>
              {i < DIRECTIONS.length - 1 && (
                <span className="w-px flex-1 min-h-[28px] bg-gray-200" />
              )}
            </div>
            <div className="pb-6">
              <p className="text-sm font-semibold text-ink">{step.instruction}</p>
              <p className="text-xs text-muted mt-0.5">{step.distance}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ---------------- Main Page ---------------- */
export default function VolunteerNavigation() {
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

        <main className="flex-1 px-6 py-8 max-w-3xl w-full mx-auto space-y-6">
          <RouteMap />
          <DirectionsList />
        </main>
      </div>
    </div>
  );
}
