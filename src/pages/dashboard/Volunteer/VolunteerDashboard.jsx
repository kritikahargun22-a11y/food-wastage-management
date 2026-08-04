import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Truck,
  Star,
  Phone,
  ArrowRight,
  Camera,
  QrCode,
  PenLine,
} from "lucide-react";
import { useLogout } from "../../../hooks/useLogout.js";
/* ---------------- Sidebar ---------------- */
const NAV_ITEMS = [
  { label: "Overview", icon: LayoutDashboard, active: true, href: "#volunteer-dashboard" },
  { label: "Assigned Pickups", icon: Bike, href: "#assigned-pickups" },
  { label: "Navigation", icon: NavigationIcon, href: "#navigation" },
  { label: "Delivery History", icon: CheckCircle2, href: "#delivery-history" },
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

        {/* Availability toggle */}
        <div className="mx-4 mb-4 rounded-xl bg-accent/60 border border-emerald-100 px-4 py-3.5">
          <button
            onClick={onToggleAvailable}
            className="flex items-center gap-2 w-full"
          >
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
        <h1 className="text-xl font-extrabold text-primary-darker tracking-tight">
          Hey Aditi, 2 pickups today
        </h1>
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

/* ---------------- Current Pickup Banner ---------------- */
function CurrentPickupBanner({ pickedUp, onMarkPickedUp }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="relative rounded-card overflow-hidden bg-green-gradient px-7 py-8 shadow-lift"
    >
      <div aria-hidden="true" className="absolute -top-16 -right-10 h-52 w-52 rounded-full bg-white/10" />
      <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
        <div>
          <p className="text-xs font-bold text-white/70 uppercase tracking-widest mb-1.5">
            Current Pickup
          </p>
          <h2 className="text-2xl font-extrabold text-white tracking-tight mb-2">
            Fresh Vegetable Crate
          </h2>
          <p className="text-sm text-white/85">
            Green Bowl Cafe → Hope Kitchen Trust · 1.2 km away
          </p>
        </div>
        <div className="flex gap-3 flex-shrink-0">
          <button className="flex items-center gap-2 rounded-xl bg-white/20 text-white text-sm font-semibold px-4 py-2.5 hover:bg-white/30 transition">
            <Phone className="h-4 w-4" aria-hidden="true" />
            Call Donor
          </button>
          <button
            onClick={onMarkPickedUp}
            disabled={pickedUp}
            className={`flex items-center gap-2 rounded-xl text-sm font-semibold px-4 py-2.5 transition ${pickedUp
              ? "bg-white/20 text-white cursor-default"
              : "bg-white text-primary-dark hover:bg-gray-50"
              }`}
          >
            {pickedUp ? "Picked Up ✓" : "Mark Picked Up"}
            {!pickedUp && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ---------------- Assigned Pickups ---------------- */
const STATUS_STYLES = {
  "Picking Up": "bg-amber-100 text-amber-700",
  Assigned: "bg-sky-100 text-sky-700",
};

const INITIAL_PICKUPS = [
  { id: "1", emoji: "🥗", title: "Fresh Vegetable Crate", meta: "Green Bowl Cafe · 1.2 km", status: "Picking Up" },
  { id: "2", emoji: "🍞", title: "Bakery Surplus Box", meta: "Sunrise Bakery · 3.4 km", status: "Assigned" },
];

function AssignedPickups() {
  const [pickups] = useState(INITIAL_PICKUPS);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="card p-7"
    >
      <h2 className="text-lg font-bold text-primary-darker mb-5">Assigned Pickups</h2>
      <div className="space-y-3">
        {pickups.map((p) => (
          <div
            key={p.id}
            className="flex items-center justify-between rounded-xl border border-gray-100 px-4 py-3.5"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-xl flex-shrink-0">
                {p.emoji}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-bold text-ink truncate">{p.title}</p>
                <p className="text-xs text-muted">{p.meta}</p>
              </div>
            </div>
            <span
              className={`flex-shrink-0 rounded-full px-3 py-1 text-xs font-bold uppercase ${STATUS_STYLES[p.status]}`}
            >
              {p.status}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ---------------- Delivery Confirmation Checklist ---------------- */
function DeliveryChecklist() {
  const [checked, setChecked] = useState({ photo: true, qr: true, signature: false });

  const items = [
    { key: "photo", icon: Camera, label: "Photo of handoff taken" },
    { key: "qr", icon: QrCode, label: "QR code scanned at NGO" },
    { key: "signature", icon: PenLine, label: "Recipient signature (optional)" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
      className="card p-7"
    >
      <h2 className="text-lg font-bold text-primary-darker mb-5">Delivery Confirmation Checklist</h2>
      <div className="space-y-3">
        {items.map((item, i) => (
          <button
            key={item.key}
            onClick={() => setChecked((c) => ({ ...c, [item.key]: !c[item.key] }))}
            className="flex items-center gap-3 w-full text-left"
          >
            <span
              className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md text-xs font-bold transition ${checked[item.key]
                ? "bg-primary text-white"
                : "bg-gray-100 text-muted"
                }`}
            >
              {checked[item.key] ? "✓" : i + 1}
            </span>
            <span
              className={`text-sm font-medium ${checked[item.key] ? "text-ink" : "text-muted"
                }`}
            >
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </motion.div>
  );
}

/* ---------------- Navigation Card ---------------- */
function NavigationCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.5 }}
      className="card p-7"
    >
      <h2 className="text-lg font-bold text-primary-darker mb-5">Navigation</h2>

      <div className="rounded-2xl bg-primary-darker p-6">
        <div className="flex items-center gap-2 mb-5">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 flex-shrink-0" />
          <div className="flex-1 h-px bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-orange-400 flex-shrink-0" />
        </div>

        <p className="text-xs text-white/60 mb-2">Green Bowl Cafe → Hope Kitchen Trust</p>
        <p className="text-3xl font-extrabold text-white tracking-tight mb-1">8 min</p>
        <p className="text-xs text-white/50 mb-6">1.2 km · via MG Road</p>

        <button className="w-full flex items-center justify-center gap-2 rounded-xl bg-green-gradient text-white text-sm font-semibold py-3 hover:opacity-90 transition">
          Open Navigation
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </motion.div>
  );
}

/* ---------------- Main Dashboard Page ---------------- */
export default function VolunteerDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [available, setAvailable] = useState(true);
  const [pickedUp, setPickedUp] = useState(false);

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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <StatCard icon={CheckCircle2} iconBg="bg-emerald-500" value="86" label="Completed Pickups" delay={0} />
            <StatCard icon={Truck} iconBg="bg-sky-500" value="2" label="Active Today" delay={0.05} />
            <StatCard icon={Star} iconBg="bg-orange-500" value="4.9" label="Rating" delay={0.1} />
          </div>

          <CurrentPickupBanner pickedUp={pickedUp} onMarkPickedUp={() => setPickedUp(true)} />

          <div className="grid lg:grid-cols-2 gap-6">
            <AssignedPickups />
            <NavigationCard />
          </div>

          <DeliveryChecklist />
        </main>
      </div>
    </div>
  );
}