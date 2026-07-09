import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Building2,
  Truck,
  BarChart3,
  User,
  LogOut,
  Search,
  Bell,
  Leaf,
  Menu,
  X,
  TrendingUp,
  ShieldCheck,
  MoreVertical,
  CircleCheck,
  CircleX,
  Utensils,
} from "lucide-react";

/* ---------------- Sidebar ---------------- */
const NAV_ITEMS = [
  { label: "Overview", icon: LayoutDashboard, active: true },
  { label: "Donors", icon: Users },
  { label: "NGO Partners", icon: Building2 },
  { label: "Volunteers", icon: Truck },
  { label: "Reports", icon: BarChart3 },
  { label: "Profile", icon: User, href: "#profile"},
];

function Sidebar({ open, onClose }) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
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

        <div className="px-4 py-6 border-t border-gray-100">
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

/* ---------------- Topbar ---------------- */
function Topbar({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-4 bg-white/90 backdrop-blur-md border-b border-gray-100 px-6 h-20">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="lg:hidden text-ink" aria-label="Open menu">
          <Menu className="h-6 w-6" />
        </button>
        <div className="relative hidden sm:block">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
          <input
            type="search"
            placeholder="Search donors, NGOs, volunteers..."
            className="w-72 rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          className="relative flex h-10 w-10 items-center justify-center rounded-xl hover:bg-accent"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5 text-ink" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500" />
        </button>
        <div className="flex items-center gap-2.5">
          <span className="h-9 w-9 rounded-full bg-gradient-to-br from-violet-200 to-violet-500 flex items-center justify-center text-xs font-bold text-white">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="hidden sm:block text-sm font-semibold text-ink">Admin</span>
        </div>
      </div>
    </header>
  );
}

/* ---------------- Stat Card ---------------- */
function StatCard({ icon: Icon, value, label, trend, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -4 }}
      className="card p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent">
          <Icon className="h-5 w-5 text-primary-dark" aria-hidden="true" />
        </span>
        {trend && (
          <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
            <TrendingUp className="h-3.5 w-3.5" /> {trend}
          </span>
        )}
      </div>
      <div className="text-2xl font-extrabold text-primary-darker tracking-tight">{value}</div>
      <p className="mt-1 text-sm text-muted font-medium">{label}</p>
    </motion.div>
  );
}

/* ---------------- Pending Approvals ---------------- */
const INITIAL_PENDING = [
  { id: "U-501", name: "Hope Foundation", type: "NGO", location: "Amritsar" },
  { id: "U-498", name: "Rajesh Kumar", type: "Volunteer", location: "Ludhiana" },
  { id: "U-495", name: "Sunshine Bakery", type: "Donor", location: "Chandigarh" },
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
      transition={{ duration: 0.4, delay: 0.2 }}
      className="card p-7"
    >
      <div className="flex items-center gap-3 mb-6">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent">
          <ShieldCheck className="h-5 w-5 text-primary-dark" aria-hidden="true" />
        </span>
        <div>
          <h2 className="text-lg font-bold text-primary-darker">Pending Approvals</h2>
          <p className="text-xs text-muted">Review new NGO, donor & volunteer signups</p>
        </div>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded-xl border border-gray-100 px-4 py-3"
          >
            <div>
              <p className="text-sm font-bold text-ink">{item.name}</p>
              <p className="text-xs text-muted">
                {item.type} · {item.location}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => decide(item.id)}
                className="flex items-center gap-1 rounded-lg bg-primary text-white text-xs font-semibold px-3 py-2 hover:bg-primary-dark transition"
              >
                <CircleCheck className="h-3.5 w-3.5" /> Approve
              </button>
              <button
                onClick={() => decide(item.id)}
                className="flex items-center gap-1 rounded-lg border border-gray-200 text-muted text-xs font-semibold px-3 py-2 hover:bg-gray-50 transition"
              >
                <CircleX className="h-3.5 w-3.5" /> Reject
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <p className="text-sm text-muted text-center py-8">No pending approvals 🎉</p>
        )}
      </div>
    </motion.div>
  );
}

/* ---------------- Users Table ---------------- */
const USERS = [
  { id: "USR-1201", name: "Arjun Mehta", role: "Donor", donations: 42, status: "Active" },
  { id: "USR-1198", name: "Sunrise NGO", role: "NGO", donations: 186, status: "Active" },
  { id: "USR-1187", name: "Priya Nair", role: "Volunteer", donations: 58, status: "Active" },
  { id: "USR-1150", name: "Green Leaf Restaurant", role: "Donor", donations: 27, status: "Suspended" },
];

const ROLE_COLORS = {
  Donor: "bg-emerald-100 text-emerald-700",
  NGO: "bg-sky-100 text-sky-700",
  Volunteer: "bg-amber-100 text-amber-700",
};

function UsersTable() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="card p-7"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-primary-darker">All Users</h2>
          <p className="text-xs text-muted">Manage donors, NGOs and volunteers</p>
        </div>
        <a href="#" className="text-sm font-semibold text-primary hover:text-primary-dark">
          View all
        </a>
      </div>

      <div className="overflow-x-auto -mx-2">
        <table className="w-full text-sm min-w-[560px]">
          <thead>
            <tr className="text-left text-xs font-bold uppercase tracking-wide text-muted">
              <th className="px-2 pb-3">ID</th>
              <th className="px-2 pb-3">Name</th>
              <th className="px-2 pb-3">Role</th>
              <th className="px-2 pb-3">Donations</th>
              <th className="px-2 pb-3">Status</th>
              <th className="px-2 pb-3"></th>
            </tr>
          </thead>
          <tbody>
            {USERS.map((u) => (
              <tr key={u.id} className="border-t border-gray-100">
                <td className="px-2 py-3.5 font-semibold text-ink">{u.id}</td>
                <td className="px-2 py-3.5 text-ink/80">{u.name}</td>
                <td className="px-2 py-3.5">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${ROLE_COLORS[u.role]}`}>
                    {u.role}
                  </span>
                </td>
                <td className="px-2 py-3.5 text-ink/60">{u.donations}</td>
                <td className="px-2 py-3.5">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      u.status === "Active"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {u.status}
                  </span>
                </td>
                <td className="px-2 py-3.5 text-right">
                  <button className="text-muted hover:text-ink" aria-label="More options">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

/* ---------------- Main Dashboard Page ---------------- */
export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50/60 flex">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 px-6 py-8 max-w-6xl w-full mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <h1 className="text-2xl font-extrabold text-primary-darker tracking-tight">
              Platform Overview 🛡️
            </h1>
            <p className="text-sm text-muted mt-1">
              Manage donors, NGOs, volunteers and monitor platform-wide impact.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            <StatCard icon={Users} value="2,340" label="Total Donors" trend="+6%" delay={0} />
            <StatCard icon={Building2} value="350" label="NGO Partners" trend="+4%" delay={0.05} />
            <StatCard icon={Truck} value="612" label="Active Volunteers" delay={0.1} />
            <StatCard icon={Utensils} value="128K" label="Total Meals Facilitated" trend="+11%" delay={0.15} />
          </div>

          <div className="grid lg:grid-cols-5 gap-6">
            <div className="lg:col-span-2">
              <PendingApprovals />
            </div>
            <div className="lg:col-span-3">
              <UsersTable />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}