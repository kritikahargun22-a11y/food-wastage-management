import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sendNotification } from "../../../utils/notify.js";
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
  X as XIcon,
} from "lucide-react";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "../../../firebase.js";
import { useAuth } from "../../../context/AuthContext.jsx";
import { useLogout } from "../../../hooks/useLogout.js";
/* ---------------- Sidebar ---------------- */
const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, href: "#ngo-dashboard" },
  { label: "Available Donations", icon: PackageSearch, href: "#available-donation" },
  { label: "Manage Requests", icon: ClipboardList, active: true, href: "#manage-requests" },
  { label: "Donation History", icon: History, href: "#ngo-donation-history" },
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

/* ---------------- Assign Volunteer Modal ---------------- */
function AssignModal({ donation, volunteers, loadingVolunteers, onAssign, onClose, assigning }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-card p-7 w-full max-w-md"
      >
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-lg font-bold text-primary-darker">Assign Volunteer</h3>
          <button onClick={onClose} className="text-muted hover:text-ink" aria-label="Close">
            <XIcon className="h-5 w-5" />
          </button>
        </div>
        <p className="text-sm text-muted mb-5">{donation.title}</p>

        {loadingVolunteers ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-5 w-5 text-primary animate-spin" aria-hidden="true" />
          </div>
        ) : volunteers.length === 0 ? (
          <p className="text-sm text-muted text-center py-8">
            No registered volunteers yet. Ask a volunteer to sign up first.
          </p>
        ) : (
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {volunteers.map((v) => (
              <button
                key={v.id}
                onClick={() => onAssign(v)}
                disabled={assigning}
                className="w-full flex items-center gap-3 rounded-xl border border-gray-100 px-4 py-3 hover:bg-accent/50 hover:border-primary/30 transition text-left disabled:opacity-60"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-sky-200 to-sky-500 text-white text-xs font-bold flex-shrink-0">
                  {v.name?.slice(0, 2).toUpperCase() || "V"}
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">{v.name}</p>
                  <p className="text-xs text-muted">{v.phone || v.email}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

/* ---------------- Requests Table ---------------- */
const STATUS_STYLES = {
  Claimed: { bg: "bg-amber-100", text: "text-amber-700" },
  "In Transit": { bg: "bg-sky-100", text: "text-sky-700" },
  Delivered: { bg: "bg-emerald-100", text: "text-emerald-700" },
};

const FILTERS = ["All", "Claimed", "In Transit", "Delivered"];

function ManageRequests() {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  const [assignTarget, setAssignTarget] = useState(null);
  const [volunteers, setVolunteers] = useState([]);
  const [loadingVolunteers, setLoadingVolunteers] = useState(false);
  const [assigning, setAssigning] = useState(false);

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "donations"), where("ngoId", "==", user.uid));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const items = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
        items.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
        setRequests(items);
        setLoading(false);
      },
      (err) => {
        console.error("Failed to load requests:", err);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [user]);

  async function openAssignModal(donation) {
    setAssignTarget(donation);
    setLoadingVolunteers(true);
    try {
      const q = query(collection(db, "users"), where("role", "==", "volunteer"));
      const snapshot = await getDocs(q);
      setVolunteers(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch (err) {
      console.error("Failed to load volunteers:", err);
    } finally {
      setLoadingVolunteers(false);
    }
  }

  async function handleAssign(volunteer) {
    if (!assignTarget) return;
    setAssigning(true);
    try {
      await updateDoc(doc(db, "donations", assignTarget.id), {
        status: "In Transit",
        volunteerId: volunteer.id,
        volunteerName: volunteer.name,
      });

      // Notify the volunteer
      await sendNotification({
        userId: volunteer.id,
        title: "New pickup assigned",
        desc: `You've been assigned to pick up "${assignTarget.title}"`,
        type: "pickup",
      });

      setAssignTarget(null);
    } catch (err) {
      console.error("Failed to assign volunteer:", err);
    } finally {
      setAssigning(false);
    }
  }

  async function markDelivered(donationId) {
    try {
      const donation = requests.find((r) => r.id === donationId);
      await updateDoc(doc(db, "donations", donationId), { status: "Delivered" });

      // Notify the donor
      if (donation?.donorId) {
        await sendNotification({
          userId: donation.donorId,
          title: "Donation delivered",
          desc: `Your "${donation.title}" was successfully delivered`,
          type: "delivery",
        });
      }
    } catch (err) {
      console.error("Failed to mark delivered:", err);
    }
  }
  const filtered = requests.filter((r) => filter === "All" || r.status === filter);

  return (
    <>
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
                  <th className="px-2 pb-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filtered.map((r) => {
                    const s = STATUS_STYLES[r.status] || STATUS_STYLES.Claimed;
                    return (
                      <motion.tr
                        key={r.id}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="border-t border-gray-100"
                      >
                        <td className="px-2 py-3.5 font-semibold text-ink">{r.title}</td>
                        <td className="px-2 py-3.5 text-ink/80">{r.donorName || "—"}</td>
                        <td className="px-2 py-3.5 text-ink/80">{r.volunteerName || "—"}</td>
                        <td className="px-2 py-3.5">
                          <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${s.bg} ${s.text}`}>
                            {r.status}
                          </span>
                        </td>
                        <td className="px-2 py-3.5 text-right">
                          {r.status === "Claimed" && (
                            <button
                              onClick={() => openAssignModal(r)}
                              className="text-xs font-semibold text-primary hover:text-primary-dark"
                            >
                              Assign →
                            </button>
                          )}
                          {r.status === "In Transit" && (
                            <button
                              onClick={() => markDelivered(r.id)}
                              className="text-xs font-semibold text-primary hover:text-primary-dark"
                            >
                              Mark Delivered →
                            </button>
                          )}
                          {r.status === "Delivered" && (
                            <span className="text-xs font-semibold text-muted">Completed</span>
                          )}
                        </td>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
              </tbody>
            </table>

            {filtered.length === 0 && (
              <p className="text-sm text-muted text-center py-10">No requests match this filter.</p>
            )}
          </div>
        )}
      </motion.div>

      <AnimatePresence>
        {assignTarget && (
          <AssignModal
            donation={assignTarget}
            volunteers={volunteers}
            loadingVolunteers={loadingVolunteers}
            assigning={assigning}
            onAssign={handleAssign}
            onClose={() => setAssignTarget(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

/* ---------------- Main Page ---------------- */
export default function ManageRequestsPage() {
  const { profile } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50/60 flex">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} orgName={profile?.name || "NGO Dashboard"} />

        <main className="flex-1 px-6 py-8 max-w-6xl w-full mx-auto">
          <ManageRequests />
        </main>
      </div>
    </div>
  );
}