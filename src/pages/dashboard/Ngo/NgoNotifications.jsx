import { useEffect, useState } from "react";
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
  Loader2,
  PackagePlus,
  Truck,
  CheckCircle2,
  AlarmClock,
} from "lucide-react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase.js";
import { useAuth } from "../../../context/AuthContext.jsx";
import { useLogout } from "../../../hooks/useLogout.js";

/* ---------------- Sidebar ---------------- */
const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, href: "#ngo-dashboard" },
  { label: "Available Donations", icon: PackageSearch, href: "#available-donation" },
  { label: "Manage Requests", icon: ClipboardList, href: "#manage-requests" },
  { label: "Donation History", icon: History, href: "#ngo-donation-history" },
  { label: "Notifications", icon: Bell, active: true, href: "#ngo-notifications" },
  { label: "Settings", icon: Settings, href: "#ngo-settings" },
];

function Sidebar({ open, onClose }) {
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
            key = { item.label }
              href = { item.href }
              className = {`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${item.active
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
    </aside >
    </>
  );
}

/* ---------------- Header ---------------- */
function DashboardHeader({ onMenuClick, orgName }) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-4 bg-white/90 backdrop-blur-md border-b border-gray-100 px-6 h-20">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="lg:hidden text-ink" aria-label="Open menu">
          <Menu className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-extrabold text-primary-darker tracking-tight">{orgName}</h1>
      </div>
    </header>
  );
}

/* ---------------- Notifications List ---------------- */
const ICON_MAP = {
  donation: { icon: PackagePlus, bg: "bg-emerald-500" },
  pickup: { icon: Truck, bg: "bg-sky-500" },
  delivery: { icon: CheckCircle2, bg: "bg-primary" },
  expiry: { icon: AlarmClock, bg: "bg-orange-500" },
};

function timeAgo(timestamp) {
  if (!timestamp?.seconds) return "";
  const diffMs = Date.now() - timestamp.seconds * 1000;
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function NotificationsList() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "notifications"), where("userId", "==", user.uid));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const list = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
        list.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
        setItems(list);
        setLoading(false);
      },
      (err) => {
        console.error("Failed to load notifications:", err);
        setLoading(false);
      }
    );
    return unsubscribe;
  }, [user]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="card p-7"
    >
      <h2 className="text-lg font-bold text-primary-darker mb-6">Notifications</h2>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-6 w-6 text-primary animate-spin" aria-hidden="true" />
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((n, i) => {
            const meta = ICON_MAP[n.type] || ICON_MAP.donation;
            return (
              <motion.div
                key={n.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="flex items-start gap-4 rounded-xl border border-gray-100 px-4 py-4 hover:bg-gray-50/60 transition"
              >
                <span className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${meta.bg}`}>
                  <meta.icon className="h-5 w-5 text-white" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-ink">{n.title}</p>
                  <p className="text-xs text-muted mt-0.5">
                    {n.desc} · {timeAgo(n.createdAt)}
                  </p>
                </div>
              </motion.div>
            );
          })}

          {items.length === 0 && (
            <p className="text-sm text-muted text-center py-10">No notifications yet.</p>
          )}
        </div>
      )}
    </motion.div>
  );
}

/* ---------------- Main Page ---------------- */
export default function NgoNotifications() {
  const { profile } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50/60 flex">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} orgName={profile?.name || "NGO Dashboard"} />

        <main className="flex-1 px-6 py-8 max-w-6xl w-full mx-auto">
          <NotificationsList />
        </main>
      </div>
    </div>
  );
}