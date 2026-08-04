import { useState } from "react";
import { motion } from "framer-motion";
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
  Download,
  FileSpreadsheet,
  FileType2,
  Calendar,
  TrendingUp,
} from "lucide-react";
import { useLogout } from "../../../hooks/useLogout.js";
/* ---------------- Sidebar ---------------- */
const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, href: "#admin-dashboard" },
  { label: "Manage Users", icon: Users, href: "#manage-users" },
  { label: "Manage Donations", icon: Truck, href: "#manage-donations" },
  { label: "Approve NGOs", icon: Building2, href: "#approve-ngos" },
  { label: "Analytics", icon: BarChart3, href: "#analytics" },
  { label: "Reports", icon: FileText, active: true, href: "#reports" },
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
          <p className="text-xs text-white/60">admin@foodshare.app</p>
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

/* ---------------- Summary Cards ---------------- */
function SummaryCard({ icon: Icon, iconBg, value, label, trend, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -4 }}
      className="card p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconBg}`}>
          <Icon className="h-5 w-5 text-white" aria-hidden="true" />
        </span>
        {trend && (
          <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 rounded-full px-2.5 py-1">
            <TrendingUp className="h-3 w-3" /> {trend}
          </span>
        )}
      </div>
      <div className="text-2xl font-extrabold text-primary-darker tracking-tight">{value}</div>
      <p className="mt-1 text-sm text-muted font-medium">{label}</p>
    </motion.div>
  );
}

/* ---------------- Monthly Reports List ---------------- */
const REPORTS = [
  { title: "June 2026 Impact Report", period: "Jun 1 – Jun 30, 2026", size: "1.2 MB", type: "pdf" },
  { title: "May 2026 Impact Report", period: "May 1 – May 31, 2026", size: "1.1 MB", type: "pdf" },
  { title: "Q2 2026 Donations Summary", period: "Apr 1 – Jun 30, 2026", size: "860 KB", type: "xlsx" },
  { title: "April 2026 Impact Report", period: "Apr 1 – Apr 30, 2026", size: "1.0 MB", type: "pdf" },
  { title: "Q1 2026 Donations Summary", period: "Jan 1 – Mar 31, 2026", size: "790 KB", type: "xlsx" },
];

function ReportsList() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="card p-7"
    >
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h2 className="text-lg font-bold text-primary-darker">Generated Reports</h2>
        <button className="btn btn-primary text-sm">
          <FileText className="h-4 w-4" aria-hidden="true" />
          Generate New Report
        </button>
      </div>

      <div className="space-y-3">
        {REPORTS.map((r) => (
          <div
            key={r.title}
            className="flex items-center justify-between rounded-xl border border-gray-100 px-4 py-3.5 hover:bg-gray-50/60 transition"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span
                className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${r.type === "pdf" ? "bg-red-50" : "bg-emerald-50"
                  }`}
              >
                {r.type === "pdf" ? (
                  <FileType2 className="h-4.5 w-4.5 text-red-500" aria-hidden="true" />
                ) : (
                  <FileSpreadsheet className="h-4.5 w-4.5 text-emerald-600" aria-hidden="true" />
                )}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-bold text-ink truncate">{r.title}</p>
                <p className="text-xs text-muted flex items-center gap-1.5">
                  <Calendar className="h-3 w-3 flex-shrink-0" aria-hidden="true" />
                  {r.period} · {r.size}
                </p>
              </div>
            </div>
            <button
              className="flex items-center gap-1.5 rounded-lg border border-gray-200 text-xs font-semibold text-ink px-3 py-2 hover:bg-accent hover:border-primary/40 transition flex-shrink-0"
              aria-label={`Download ${r.title}`}
            >
              <Download className="h-3.5 w-3.5" aria-hidden="true" />
              Download
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ---------------- Main Page ---------------- */
export default function ReportsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50/60 flex">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 px-6 py-8 max-w-6xl w-full mx-auto space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            <SummaryCard icon={FileText} iconBg="bg-emerald-500" value="24" label="Reports Generated" trend="+3" delay={0} />
            <SummaryCard icon={Truck} iconBg="bg-sky-500" value="4,812" label="Donations This Quarter" trend="+18%" delay={0.05} />
            <SummaryCard icon={Users} iconBg="bg-orange-500" value="1,240" label="New Users This Quarter" trend="+9%" delay={0.1} />
            <SummaryCard icon={Building2} iconBg="bg-slate-800" value="38" label="NGOs Onboarded" trend="+5" delay={0.15} />
          </div>

          <ReportsList />
        </main>
      </div>
    </div>
  );
}