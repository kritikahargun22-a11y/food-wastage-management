import { useEffect, useState } from "react";
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
  Loader2,
} from "lucide-react";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase.js";
import { useLogout } from "../../../hooks/useLogout.js";

/* ---------------- Sidebar ---------------- */
const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, href: "#admin-dashboard" },
  { label: "Manage Users", icon: Users, active: true, href: "#manage-user" },
  { label: "Manage Donations", icon: Truck, href: "#manage-donations" },
  { label: "Approve NGOs", icon: Building2, href: "#approve-ngos" },
  { label: "Analytics", icon: BarChart3, href: "#analytics" },
  { label: "Reports", icon: FileText, href: "#reports" },
  { label: "Settings", icon: Settings, href: "#admin-settings" },
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

        <div className="mx-4 mt-5 mb-2 flex items-center gap-2 rounded-xl bg-accent px-3 py-2">
          <ShieldCheck className="h-4 w-4 text-primary-dark" aria-hidden="true" />
          <span className="text-xs font-bold text-primary-dark tracking-wide">ADMIN ACCESS</span>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1" aria-label="Dashboard navigation">
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

        <div className="mx-4 mb-4 rounded-xl bg-primary-darker px-4 py-3.5">
          <p className="text-sm font-bold text-white">Super Admin</p>
          <p className="text-xs text-white/60">admin@foodshare.com</p>
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
        <h1 className="text-xl font-extrabold text-primary-darker tracking-tight">Manage Users</h1>
      </div>
      <button className="relative flex h-10 w-10 items-center justify-center rounded-xl hover:bg-accent" aria-label="Notifications">
        <Bell className="h-5 w-5 text-ink" />
        <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500" />
      </button>
    </header>
  );
}

/* ---------------- Users Table ---------------- */
const ROLE_STYLES = {
  donor: "bg-emerald-100 text-emerald-700",
  ngo: "bg-sky-100 text-sky-700",
  volunteer: "bg-amber-100 text-amber-700",
  admin: "bg-violet-100 text-violet-700",
};

const FILTERS = ["All", "donor", "ngo", "volunteer"];
const FILTER_LABELS = { All: "All", donor: "Donors", ngo: "NGOs", volunteer: "Volunteers" };

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [updating, setUpdating] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "users"),
      (snapshot) => {
        const items = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
        items.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
        setUsers(items);
        setLoading(false);
      },
      (err) => {
        console.error("Failed to load users:", err);
        setLoading(false);
      }
    );
    return unsubscribe;
  }, []);

  async function toggleBlock(userId, currentlyBlocked) {
    setUpdating(userId);
    try {
      await updateDoc(doc(db, "users", userId), { blocked: !currentlyBlocked });
    } catch (err) {
      console.error("Failed to update user status:", err);
    } finally {
      setUpdating(null);
    }
  }

  const filtered = users.filter((u) => filter === "All" || u.role === filter);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="card p-7"
    >
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <h2 className="text-lg font-bold text-primary-darker">All Users</h2>
        <span className="text-xs font-semibold text-muted">{users.length} total</span>
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
            {FILTER_LABELS[f]}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-6 w-6 text-primary animate-spin" aria-hidden="true" />
        </div>
      ) : (
        <div className="overflow-x-auto -mx-2">
          <table className="w-full text-sm min-w-[720px]">
            <thead>
              <tr className="text-left text-xs font-bold uppercase tracking-wide text-muted">
                <th className="px-2 pb-3">Name</th>
                <th className="px-2 pb-3">Role</th>
                <th className="px-2 pb-3">Email</th>
                <th className="px-2 pb-3">Status</th>
                <th className="px-2 pb-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filtered.map((u) => {
                  const isBlocked = u.blocked === true;
                  return (
                    <motion.tr
                      key={u.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="border-t border-gray-100"
                    >
                      <td className="px-2 py-3.5 font-semibold text-ink">{u.name || "—"}</td>
                      <td className="px-2 py-3.5">
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${ROLE_STYLES[u.role] || "bg-gray-100 text-gray-600"}`}>
                          {u.role || "unknown"}
                        </span>
                      </td>
                      <td className="px-2 py-3.5 text-ink/70 font-mono text-xs">{u.email}</td>
                      <td className="px-2 py-3.5">
                        <span
                          className={`inline-flex items-center gap-1.5 text-xs font-semibold ${isBlocked ? "text-red-500" : "text-emerald-600"
                            }`}
                        >
                          <span className={`h-1.5 w-1.5 rounded-full ${isBlocked ? "bg-red-500" : "bg-emerald-500"}`} />
                          {isBlocked ? "Blocked" : "Active"}
                        </span>
                      </td>
                      <td className="px-2 py-3.5 text-right">
                        <button
                          onClick={() => toggleBlock(u.id, isBlocked)}
                          disabled={updating === u.id}
                          className="text-xs font-semibold text-muted hover:text-ink disabled:opacity-50"
                        >
                          {updating === u.id ? "..." : isBlocked ? "Unblock" : "Block"}
                        </button>
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>

          {filtered.length === 0 && (
            <p className="text-sm text-muted text-center py-10">No users match this filter.</p>
          )}
        </div>
      )}
    </motion.div>
  );
}

/* ---------------- Main Page ---------------- */
export default function ManageUser() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50/60 flex">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 px-6 py-8 max-w-6xl w-full mx-auto">
          <ManageUsers />
        </main>
      </div>
    </div>
  );
}