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
  { label: "Reports", icon: FileText, href: "#reports" },
  { label: "Settings", icon: Settings, href: "#admin-settings" },
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

/* ---------------- Donations Trend (line chart) ---------------- */
function DonationsTrend() {
    const days = 14;
    const meals = [20, 28, 24, 35, 32, 42, 38, 48, 44, 52, 49, 58, 55, 64];
    const kg = [10, 12, 11, 16, 15, 18, 17, 22, 20, 24, 22, 27, 25, 30];

    const max = Math.max(...meals);
    const toPoints = (arr) =>
        arr
            .map((v, i) => {
                const x = (i / (arr.length - 1)) * 100;
                const y = 100 - (v / max) * 90;
                return `${x},${y}`;
            })
            .join(" ");

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="card p-7"
        >
            <h2 className="text-lg font-bold text-primary-darker mb-6">Donations Trend (30 days)</h2>
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-56">
                <line x1="0" y1="90" x2="100" y2="90" stroke="#F1F5F2" strokeWidth="0.5" />
                <motion.polyline
                    points={toPoints(meals)}
                    fill="none"
                    stroke="#16A34A"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                />
                
   
<polyline
                    points={toPoints(kg)}
                    fill="none"
                    stroke="#F97316"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                />
            </svg>
            <div className="flex items-center gap-6 mt-2">
                <span className="flex items-center gap-2 text-xs font-semibold text-muted">
                    <span className="h-2.5 w-2.5 rounded-full bg-primary" /> Meals saved
                </span>
                <span className="flex items-center gap-2 text-xs font-semibold text-muted">
                    <span className="h-2.5 w-2.5 rounded-full bg-orange-500" /> Kg rescued
                </span>
            </div>
        </motion.div>
    );
}

/* ---------------- Donation Status Donut ---------------- */
const STATUS_BREAKDOWN = [
    { label: "Delivered", pct: 45, color: "#16A34A" },
    { label: "In Transit", pct: 20, color: "#0EA5E9" },
    { label: "Claimed", pct: 17, color: "#F59E0B" },
    { label: "Expired", pct: 18, color: "#EF4444" },
];

function StatusDonut() {
    let cumulative = 0;
    const radius = 40;
    const circumference = 2 * Math.PI * radius;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="card p-7"
        >
            <h2 className="text-lg font-bold text-primary-darker mb-6">Donation Status Breakdown</h2>
            <div className="flex items-center gap-8 flex-wrap">
                <svg viewBox="0 0 100 100" className="h-40 w-40 -rotate-90 flex-shrink-0">
                    {STATUS_BREAKDOWN.map((s, i) => {
                        const dash = (s.pct / 100) * circumference;
                        const offset = circumference - (cumulative / 100) * circumference;
                        cumulative += s.pct;
                        return (
                            <motion.circle
                                key={s.label}
                                cx="50"
                                cy="50"
                                r={radius}
                                fill="none"
                                stroke={s.color}
                                strokeWidth="14"
                                strokeDasharray={`${dash} ${circumference - dash}`}
                                initial={{ strokeDashoffset: circumference }}
                                animate={{ strokeDashoffset: offset }}
                                transition={{ duration: 0.8, delay: 0.1 * i, ease: "easeOut" }}
                            />
                        );
                    })}
                </svg>
                <div className="space-y-2.5">
                    {STATUS_BREAKDOWN.map((s) => (
                        <div key={s.label} className="flex items-center gap-2 text-sm">
                            <span className="h-2.5 w-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />
                            <span className="text-ink font-medium">
                                {s.label} — {s.pct}%
                            </span>
                        </div>
                    ))}
                </div>
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
          <DonationsTrend />
          <StatusDonut />
        </main>
      </div>
    </div>
  );
}