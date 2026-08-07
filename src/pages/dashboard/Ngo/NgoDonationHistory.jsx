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
  { label: "Donation History", icon: History, active: true, href: "#ngo-donation-history" },
  { label: "Notifications", icon: Bell, href: "#ngo-notifications" },
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

/* ---------------- History Table ---------------- */
const STATUS_STYLES = {
  Claimed: "bg-amber-100 text-amber-700",
  "In Transit": "bg-sky-100 text-sky-700",
  Delivered: "bg-emerald-100 text-emerald-700",
};

const FILTERS = ["All", "Claimed", "In Transit", "Delivered"];

function NgoHistoryTable() {
  const { user } = useAuth();
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "donations"), where("ngoId", "==", user.uid));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const items = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
        items.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
        setDonations(items);
        setLoading(false);
      },
      (err) => {
        console.error("Failed to load NGO history:", err);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [user]);

  const filtered = donations.filter((d) => filter === "All" || d.status === filter);
  const deliveredCount = donations.filter((d) => d.status === "Delivered").length;

  return (
    <>
      <div className="grid grid-cols-2 gap-5 mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-6">
          <div className="text-2xl font-extrabold text-primary-darker tracking-tight">{donations.length}</div>
          <p className="mt-1 text-sm text-muted font-medium">Total Donations Received</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="card p-6">
          <div className="text-2xl font-extrabold text-primary-darker tracking-tight">{deliveredCount}</div>
          <p className="mt-1 text-sm text-muted font-medium">Successfully Delivered</p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="card p-7"
      >
        <h2 className="text-lg font-bold text-primary-darker mb-5">All Donations Received</h2>

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

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-6 w-6 text-primary animate-spin" aria-hidden="true" />
          </div>
        ) : (
          <div className="overflow-x-auto -mx-2">
            <table className="w-full text-sm min-w-[600px]">
              <thead>
                <tr className="text-left text-xs font-bold uppercase tracking-wide text-muted">
                  <th className="px-2 pb-3">Donation</th>
                  <th className="px-2 pb-3">Donor</th>
                  <th className="px-2 pb-3">Volunteer</th>
                  <th className="px-2 pb-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((d) => (
                  <tr key={d.id} className="border-t border-gray-100">
                    <td className="px-2 py-3.5 font-semibold text-ink">{d.title}</td>
                    <td className="px-2 py-3.5 text-ink/80">{d.donorName || "—"}</td>
                    <td className="px-2 py-3.5 text-ink/80">{d.volunteerName || "—"}</td>
                    <td className="px-2 py-3.5">
                      <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${STATUS_STYLES[d.status]}`}>
                        {d.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filtered.length === 0 && (
              <p className="text-sm text-muted text-center py-10">No donations match this filter.</p>
            )}
          </div>
        )}
      </motion.div>
    </>
  );
}

/* ---------------- Main Page ---------------- */
export default function NgoDonationHistory() {
  const { profile } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50/60 flex">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} orgName={profile?.name || "NGO Dashboard"} />

        <main className="flex-1 px-6 py-8 max-w-6xl w-full mx-auto">
          <NgoHistoryTable />
        </main>
      </div>
    </div>
  );
}