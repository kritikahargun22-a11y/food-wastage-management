import { useEffect, useState } from "react";
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
  Loader2,
} from "lucide-react";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
  orderBy,
} from "firebase/firestore";
import { db } from "../../firebase.js";
import { useAuth } from "../../context/AuthContext.jsx";

/* ---------------- Sidebar ---------------- */
const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, href: "#ngo-dashboard" },
  { label: "Available Donations", icon: PackageSearch, active: true, href: "#available-donation" },
  { label: "Manage Requests", icon: ClipboardList, href: "#manage-requests" },
  { label: "Donation History", icon: History, href: "#ngo-donation-history" },
  { label: "Notifications", icon: Bell, href: "#ngo-notifications" },
  { label: "Settings", icon: Settings, href: "#ngo-settings" },
];

function Sidebar({ open, onClose }) {
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
        </div >
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
      <div className="flex items-center gap-4">
        <button className="relative flex h-10 w-10 items-center justify-center rounded-xl hover:bg-accent" aria-label="Notifications">
          <Bell className="h-5 w-5 text-ink" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500" />
        </button>
      </div>
    </header>
  );
}

/* ---------------- Donation Card ---------------- */
const FOOD_EMOJI = {
  "Vegetables & Fruits": "🥗",
  "Cooked Meals": "🍛",
  "Bakery Items": "🍞",
  "Packaged Food": "📦",
};

function DonationCard({ item, onClaim, claiming }) {
  const emoji = FOOD_EMOJI[item.type] || "🍽️";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
      className="card p-5 flex flex-col"
    >
      <div className="flex items-start justify-between mb-4">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-2xl">
          {emoji}
        </span>
        {item.expiry && (
          <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 text-rose-600 text-xs font-semibold px-3 py-1">
            <Timer className="h-3.5 w-3.5" aria-hidden="true" /> Expires {item.expiry}
          </span>
        )}
      </div>
      <h3 className="text-base font-bold text-ink mb-1">{item.title}</h3>
      <p className="text-xs text-muted mb-1">
        {item.quantity} {item.unit} · {item.type}
      </p>
      <p className="text-xs text-muted mb-1">{item.address}</p>
      <p className="text-xs text-muted mb-4">by {item.donorName}</p>

      <button
        onClick={() => onClaim(item.id)}
        disabled={claiming === item.id}
        className="mt-auto w-full rounded-xl py-2.5 text-sm font-semibold transition bg-green-gradient text-white hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {claiming === item.id ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Claiming...
          </>
        ) : (
          "Claim Donation"
        )}
      </button>
    </motion.div>
  );
}

/* ---------------- Available Donations Grid ---------------- */
function AvailableDonationsGrid() {
  const { user, profile } = useAuth();
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [claiming, setClaiming] = useState(null);

  useEffect(() => {
    const q = query(
      collection(db, "donations"),
      where("status", "==", "Available"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const items = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
        setDonations(items);
        setLoading(false);
      },
      (err) => {
        console.error("Failed to load donations:", err);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  async function handleClaim(donationId) {
    setClaiming(donationId);
    try {
      await updateDoc(doc(db, "donations", donationId), {
        status: "Claimed",
        ngoId: user?.uid || null,
        ngoName: profile?.name || "Unknown NGO",
      });
      // onSnapshot will automatically remove it from this list
      // since status no longer matches "Available".
    } catch (err) {
      console.error("Failed to claim donation:", err);
    } finally {
      setClaiming(null);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-6 w-6 text-primary animate-spin" aria-hidden="true" />
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-lg font-bold text-primary-darker mb-6">Available Donations Nearby</h2>

      {donations.length === 0 ? (
        <p className="text-sm text-muted text-center py-16">
          No donations available right now — check back soon.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence>
            {donations.map((item) => (
              <DonationCard key={item.id} item={item} claiming={claiming} onClaim={handleClaim} />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

/* ---------------- Main Page ---------------- */
export default function AvailableDonations() {
  const { profile } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50/60 flex">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} orgName={profile?.name || "NGO Dashboard"} />

        <main className="flex-1 px-6 py-8 max-w-6xl w-full mx-auto">
          <AvailableDonationsGrid />
        </main>
      </div>
    </div>
  );
}