import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  PackageSearch,
  CalendarClock,
  User,
  LogOut,
  Search,
  Bell,
  Leaf,
  Utensils,
  Clock,
  CheckCircle2,
  Truck,
  MapPin,
  Menu,
  X,
  Check,
  XCircle,
  Building2,
  TrendingUp,
  Phone,
} from "lucide-react";

/* ---------------- Sidebar ---------------- */
const NAV_ITEMS = [
  { label: "Overview", icon: LayoutDashboard, active: true },
  { label: "Nearby Donations", icon: PackageSearch },
  { label: "Pickup Schedule", icon: CalendarClock },
  { label: "Profile", icon: User, href: "#profile" },
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

        <nav className="flex-1 px-4 py-6 space-y-1" aria-label="Dashboard navigation">
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
          <a
            href="#logout"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-50"
          >
            <LogOut className="h-4.5 w-4.5" aria-hidden="true" />
            Log Out
          </a>
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
            placeholder="Search donations..."
            className="w-64 rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
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
          <span className="h-9 w-9 rounded-full bg-gradient-to-br from-emerald-200 to-emerald-400 flex items-center justify-center text-xs font-bold text-white">
            <Building2 className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="hidden sm:block text-sm font-semibold text-ink">Sunrise NGO</span>
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

/* ---------------- Nearby Donations Feed ---------------- */
const INITIAL_DONATIONS = [
  {
    id: "DN-3301",
    donor: "Green Leaf Restaurant",
    food: "Cooked rice & curry",
    qty: "30 servings",
    distance: "1.2 km away",
    expiry: "Expires in 4 hrs",
  },
  {
    id: "DN-3298",
    donor: "Priya's Bakery",
    food: "Bread & pastries",
    qty: "20 packs",
    distance: "2.5 km away",
    expiry: "Expires in 8 hrs",
  },
  {
    id: "DN-3295",
    donor: "Fresh Mart Grocers",
    food: "Mixed vegetables",
    qty: "15 kg",
    distance: "3.1 km away",
    expiry: "Expires in 12 hrs",
  },
];

function NearbyDonations() {
  const [donations, setDonations] = useState(INITIAL_DONATIONS);
  const [responded, setResponded] = useState({});

  function respond(id, action) {
    setResponded((r) => ({ ...r, [id]: action }));
    setTimeout(() => {
      setDonations((d) => d.filter((x) => x.id !== id));
    }, 600);
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
          <PackageSearch className="h-5 w-5 text-primary-dark" aria-hidden="true" />
        </span>
        <div>
          <h2 className="text-lg font-bold text-primary-darker">Nearby Donations</h2>
          <p className="text-xs text-muted">Accept a donation to schedule pickup</p>
        </div>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {donations.map((d) => {
            const status = responded[d.id];
            return (
              <motion.div
                key={d.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: status ? 0.5 : 1,
                  y: 0,
                  scale: status ? 0.98 : 1,
                }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.3 }}
                className="rounded-xl border border-gray-100 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Utensils className="h-4 w-4 text-primary-dark flex-shrink-0" aria-hidden="true" />
                      <h3 className="text-sm font-bold text-ink truncate">{d.food}</h3>
                    </div>
                    <p className="text-xs text-muted mb-2">from {d.donor} · {d.qty}</p>
                    <div className="flex flex-wrap gap-3 text-xs text-muted">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" aria-hidden="true" /> {d.distance}
                      </span>
                      <span className="flex items-center gap-1 text-amber-600 font-medium">
                        <Clock className="h-3.5 w-3.5" aria-hidden="true" /> {d.expiry}
                      </span>
                    </div>
                  </div>

                  {!status ? (
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={() => respond(d.id, "accepted")}
                        className="flex items-center gap-1.5 rounded-lg bg-primary text-white text-xs font-semibold px-3 py-2 hover:bg-primary-dark transition"
                      >
                        <Check className="h-3.5 w-3.5" aria-hidden="true" /> Accept
                      </button>
                      <button
                        onClick={() => respond(d.id, "rejected")}
                        className="flex items-center gap-1.5 rounded-lg border border-gray-200 text-muted text-xs font-semibold px-3 py-2 hover:bg-gray-50 transition"
                      >
                        <XCircle className="h-3.5 w-3.5" aria-hidden="true" /> Decline
                      </button>
                    </div>
                  ) : (
                    <span
                      className={`text-xs font-semibold px-3 py-2 rounded-lg flex-shrink-0 ${
                        status === "accepted"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-gray-100 text-muted"
                      }`}
                    >
                      {status === "accepted" ? "Accepted ✓" : "Declined"}
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {donations.length === 0 && (
          <p className="text-sm text-muted text-center py-8">
            No pending donations right now — check back soon.
          </p>
        )}
      </div>
    </motion.div>
  );
}

/* ---------------- Pickup Schedule ---------------- */
const STATUS_STYLES = {
  Scheduled: { bg: "bg-amber-100", text: "text-amber-700", icon: Clock },
  "In Transit": { bg: "bg-sky-100", text: "text-sky-700", icon: Truck },
  Completed: { bg: "bg-emerald-100", text: "text-emerald-700", icon: CheckCircle2 },
};

const PICKUPS = [
  {
    id: "PU-1042",
    donor: "Taj Banquet Hall",
    volunteer: "Rahul Singh",
    time: "Today, 4:30 PM",
    status: "Scheduled",
  },
  {
    id: "PU-1039",
    donor: "Café Ambrosia",
    volunteer: "Meena Iyer",
    time: "Today, 2:00 PM",
    status: "In Transit",
  },
  {
    id: "PU-1035",
    donor: "Green Leaf Restaurant",
    volunteer: "Rahul Singh",
    time: "Yesterday, 6:00 PM",
    status: "Completed",
  },
  {
    id: "PU-1030",
    donor: "Fresh Mart Grocers",
    volunteer: "Aditi Rao",
    time: "Jul 6, 11:00 AM",
    status: "Completed",
  },
];

function PickupSchedule() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="card p-7"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-primary-darker">Pickup Schedule</h2>
          <p className="text-xs text-muted">Volunteers assigned to your accepted donations</p>
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
              <th className="px-2 pb-3">Donor</th>
              <th className="px-2 pb-3">Volunteer</th>
              <th className="px-2 pb-3">Time</th>
              <th className="px-2 pb-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {PICKUPS.map((p) => {
              const s = STATUS_STYLES[p.status];
              return (
                <tr key={p.id} className="border-t border-gray-100">
                  <td className="px-2 py-3.5 font-semibold text-ink">{p.id}</td>
                  <td className="px-2 py-3.5 text-ink/80">{p.donor}</td>
                  <td className="px-2 py-3.5 text-ink/80">
                    <span className="flex items-center gap-1.5">
                      <Phone className="h-3.5 w-3.5 text-muted" aria-hidden="true" />
                      {p.volunteer}
                    </span>
                  </td>
                  <td className="px-2 py-3.5 text-ink/60">{p.time}</td>
                  <td className="px-2 py-3.5">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${s.bg} ${s.text}`}
                    >
                      <s.icon className="h-3.5 w-3.5" aria-hidden="true" />
                      {p.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

/* ---------------- Main Dashboard Page ---------------- */
export default function NgoDashboard() {
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
              NGO Partner Overview 🤝
            </h1>
            <p className="text-sm text-muted mt-1">
              Review nearby donations and manage your pickup schedule.
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            <StatCard icon={Utensils} value="186" label="Donations Received" trend="+15%" delay={0} />
            <StatCard icon={CheckCircle2} value="5,420" label="Meals Collected" trend="+9%" delay={0.05} />
            <StatCard icon={Truck} value="4" label="Active Pickups" delay={0.1} />
            <StatCard icon={Building2} value="27" label="Partner Donors" trend="+3%" delay={0.15} />
          </div>

          {/* Feed + Schedule */}
          <div className="grid lg:grid-cols-5 gap-6">
            <div className="lg:col-span-2">
              <NearbyDonations />
            </div>
            <div className="lg:col-span-3">
              <PickupSchedule />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}