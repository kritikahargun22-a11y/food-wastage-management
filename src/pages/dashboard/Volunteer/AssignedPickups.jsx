import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sendNotification } from "../../../utils/notify.js";
import {
  LayoutDashboard,
  Bike,
  Navigation as NavigationIcon,
  History,
  Bell as BellIcon,
  User,
  LogOut,
  Leaf,
  Menu,
  X,
  Phone,
  MapPin,
  Clock,
  Package,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { collection, query, where, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase.js";
import { useAuth } from "../../../context/AuthContext.jsx";
import { useLogout } from "../../../hooks/useLogout.js";
/* ---------------- Sidebar ---------------- */
const NAV_ITEMS = [
  { label: "Overview", icon: LayoutDashboard, href: "#volunteer-dashboard" },
  { label: "Assigned Pickups", icon: Bike, active: true, href: "#assigned-pickups" },
  { label: "Navigation", icon: NavigationIcon, href: "#volunteer-navigation" },
  { label: "Delivery History", icon: History, href: "#volunteer-history" },
  { label: "Notifications", icon: BellIcon, href: "#volunteer-notifications" },
  { label: "Profile", icon: User, href: "#profile" },
  { label: "Settings", icon: LayoutDashboard, href: "#volunteer-settings" },
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
        <h1 className="text-xl font-extrabold text-primary-darker tracking-tight">Assigned Pickups</h1>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative flex h-10 w-10 items-center justify-center rounded-xl hover:bg-accent" aria-label="Notifications">
          <BellIcon className="h-5 w-5 text-ink" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500" />
        </button>
      </div>
    </header>
  );
}

/* ---------------- Pickup Card ---------------- */
const STATUS_STYLES = {
  "In Transit": { bg: "bg-sky-100", text: "text-sky-700" },
  Delivered: { bg: "bg-emerald-100", text: "text-emerald-700" },
};

const FOOD_EMOJI = {
  "Vegetables & Fruits": "🥗",
  "Cooked Meals": "🍛",
  "Bakery Items": "🍞",
  "Packaged Food": "📦",
};

function PickupCard({ pickup, onMarkDelivered, updating }) {
  const s = STATUS_STYLES[pickup.status] || STATUS_STYLES["In Transit"];
  const emoji = FOOD_EMOJI[pickup.type] || "🍽️";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="card p-5"
    >
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-start gap-3 min-w-0">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-2xl flex-shrink-0">
            {emoji}
          </span>
          <div className="min-w-0">
            <p className="text-sm font-bold text-ink mb-1">{pickup.title}</p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
              <span className="flex items-center gap-1">
                <Package className="h-3.5 w-3.5" aria-hidden="true" />
                {pickup.donorName} → {pickup.ngoName}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" /> {pickup.address}
              </span>
              {pickup.window && (
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" aria-hidden="true" /> {pickup.window}
                </span>
              )}
            </div>
          </div>
        </div>

        <span className={`flex-shrink-0 rounded-full px-3 py-1 text-xs font-bold uppercase ${s.bg} ${s.text}`}>
          {pickup.status}
        </span>
      </div>

      {pickup.status === "In Transit" && (
        <div className="flex gap-2 mt-4">
          <button className="flex items-center gap-2 rounded-xl border border-gray-200 text-ink text-xs font-semibold px-4 py-2.5 hover:bg-gray-50 transition">
            <Phone className="h-3.5 w-3.5" aria-hidden="true" />
            Call Donor
          </button>
          <button
            onClick={() => onMarkDelivered(pickup.id)}
            disabled={updating === pickup.id}
            className="flex items-center gap-2 rounded-xl bg-green-gradient text-white text-xs font-semibold px-4 py-2.5 hover:opacity-90 transition disabled:opacity-60"
          >
            {updating === pickup.id ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                Updating...
              </>
            ) : (
              <>
                Mark Delivered
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </>
            )}
          </button>
        </div>
      )}
    </motion.div>
  );
}

/* ---------------- Pickups List ---------------- */
const FILTERS = ["All", "In Transit", "Delivered"];

function PickupsList() {
  const { user } = useAuth();
  const [pickups, setPickups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [updating, setUpdating] = useState(null);

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "donations"), where("volunteerId", "==", user.uid));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const items = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
        items.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
        setPickups(items);
        setLoading(false);
      },
      (err) => {
        console.error("Failed to load pickups:", err);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [user]);

  async function markDelivered(id) {
    setUpdating(id);
    try {
      const pickup = pickups.find((p) => p.id === id);
      await updateDoc(doc(db, "donations", id), { status: "Delivered" });

      // Notify donor and NGO
      if (pickup?.donorId) {
        await sendNotification({
          userId: pickup.donorId,
          title: "Donation delivered",
          desc: `Your "${pickup.title}" was successfully delivered`,
          type: "delivery",
        });
      }
      if (pickup?.ngoId) {
        await sendNotification({
          userId: pickup.ngoId,
          title: "Delivery confirmed",
          desc: `"${pickup.title}" has been delivered`,
          type: "delivery",
        });
      }
    } catch (err) {
      console.error("Failed to mark delivered:", err);
    } finally {
      setUpdating(null);
    }
  }

  const filtered = pickups.filter((p) => filter === "All" || p.status === filter);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-6 w-6 text-primary animate-spin" aria-hidden="true" />
      </div>
    );
  }

  return (
    <div>
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

      <div className="space-y-4">
        <AnimatePresence>
          {filtered.map((pickup) => (
            <PickupCard key={pickup.id} pickup={pickup} onMarkDelivered={markDelivered} updating={updating} />
          ))}
        </AnimatePresence>

        {filtered.length === 0 && (
          <p className="text-sm text-muted text-center py-16">No pickups assigned to you yet.</p>
        )}
      </div>
    </div>
  );
}

/* ---------------- Main Page ---------------- */
export default function AssignedPickups() {
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

        <main className="flex-1 px-6 py-8 max-w-4xl w-full mx-auto">
          <PickupsList />
        </main>
      </div>
    </div>
  );
}