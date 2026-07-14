import { useState } from "react";
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
  MapPin,
  Calendar,
  FileCheck2,
  Check,
  XCircle,
} from "lucide-react";

/* ---------------- Sidebar ---------------- */
const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, href: "#admin-dashboard" },
  { label: "Manage Users", icon: Users, href: "#manage-users" },
  { label: "Manage Donations", icon: Truck, href: "#manage-donations" },
  { label: "Approve NGOs", icon: Building2, active: true, href: "#approve-ngos" },
  { label: "Analytics", icon: BarChart3, href: "#analytics" },
  { label: "Reports", icon: FileText, href: "#" },
  { label: "Settings", icon: Settings, href: "#profile" },
];

function Sidebar({ open, onClose }) {
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

        <div className="mx-4 mt-5 mb-2 flex items-center gap-2 rounded-xl bg-accent px-3 py-2">
          <ShieldCheck className="h-4 w-4 text-primary-dark" aria-hidden="true" />
          <span className="text-xs font-bold text-primary-dark tracking-wide">ADMIN ACCESS</span>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1" aria-label="Dashboard navigation">
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

        <div className="mx-4 mb-4 rounded-xl bg-primary-darker px-4 py-3.5">
          <p className="text-sm font-bold text-white">Super Admin</p>
          <p className="text-xs text-white/60">admin@foodshare.app</p>
        </div>

        <div className="px-4 pb-6 border-t border-gray-100 pt-4">
          <button
            onClick={() => {
              sessionStorage.removeItem("foodshare_isAdmin");
              window.location.hash = "#login";
            }}
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
        <h1 className="text-xl font-extrabold text-primary-darker tracking-tight">Platform Overview</h1>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative flex h-10 w-10 items-center justify-center rounded-xl hover:bg-accent" aria-label="Notifications">
          <Bell className="h-5 w-5 text-ink" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500" />
        </button>
        <span className="h-9 w-9 rounded-full bg-gradient-to-br from-violet-200 to-violet-500 flex items-center justify-center text-xs font-bold text-white">
          <ShieldCheck className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>
    </header>
  );
}

/* ---------------- Pending Approvals ---------------- */
const INITIAL_PENDING = [
  {
    id: "1",
    name: "Seva Foundation",
    location: "Mumbai, Maharashtra",
    registered: "Jul 04, 2026",
    docs: 3,
  },
  {
    id: "2",
    name: "Anna Daan NGO",
    location: "Pune, Maharashtra",
    registered: "Jul 03, 2026",
    docs: 4,
  },
  {
    id: "3",
    name: "Roshni Welfare Trust",
    location: "Jaipur, Rajasthan",
    registered: "Jul 01, 2026",
    docs: 2,
  },
];

function PendingApprovals() {
  const [items, setItems] = useState(INITIAL_PENDING);

  function decide(id) {
    setItems((list) => list.filter((x) => x.id !== id));
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="card p-7"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-primary-darker">Pending Approvals</h2>
        <span className="rounded-full bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1">
          {items.length} waiting
        </span>
      </div>

      <div className="space-y-3">
        <AnimatePresence>
          {items.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              transition={{ duration: 0.3 }}
              className="rounded-xl border border-gray-100 p-5"
            >
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex items-start gap-3 min-w-0">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent flex-shrink-0">
                    <Building2 className="h-5 w-5 text-primary-dark" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-ink mb-1">{item.name}</p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" aria-hidden="true" /> {item.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" aria-hidden="true" /> Registered {item.registered}
                      </span>
                      <span className="flex items-center gap-1">
                        <FileCheck2 className="h-3.5 w-3.5" aria-hidden="true" /> {item.docs} documents submitted
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => decide(item.id)}
                    className="flex items-center gap-1.5 rounded-lg bg-primary text-white text-xs font-semibold px-4 py-2 hover:bg-primary-dark transition"
                  >
                    <Check className="h-3.5 w-3.5" aria-hidden="true" /> Approve
                  </button>
                  <button
                    onClick={() => decide(item.id)}
                    className="flex items-center gap-1.5 rounded-lg border border-gray-200 text-muted text-xs font-semibold px-4 py-2 hover:bg-gray-50 transition"
                  >
                    <XCircle className="h-3.5 w-3.5" aria-hidden="true" /> Reject
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {items.length === 0 && (
          <p className="text-sm text-muted text-center py-10">No pending NGO approvals 🎉</p>
        )}
      </div>
    </motion.div>
  );
}

/* ---------------- Approved NGOs List ---------------- */
const APPROVED_NGOS = [
  { name: "Hope Kitchen Trust", location: "Amritsar, Punjab", approved: "May 28, 2026" },
  { name: "Sunrise Foundation", location: "Delhi", approved: "Apr 15, 2026" },
  { name: "Feeding Hands NGO", location: "Bengaluru, Karnataka", approved: "Mar 02, 2026" },
];

function ApprovedNgos() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="card p-7"
    >
      <h2 className="text-lg font-bold text-primary-darker mb-6">Approved NGOs</h2>
      <div className="space-y-3">
        {APPROVED_NGOS.map((ngo) => (
          <div
            key={ngo.name}
            className="flex items-center justify-between rounded-xl border border-gray-100 px-4 py-3.5"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 flex-shrink-0">
                <Building2 className="h-4.5 w-4.5 text-emerald-600" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-bold text-ink">{ngo.name}</p>
                <p className="text-xs text-muted">{ngo.location}</p>
              </div>
            </div>
            <span className="text-xs text-muted font-mono">Since {ngo.approved}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ---------------- Main Page ---------------- */
export default function ApproveNgosPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50/60 flex">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 px-6 py-8 max-w-6xl w-full mx-auto space-y-6">
          <PendingApprovals />
          <ApprovedNgos />
        </main>
      </div>
    </div>
  );
}