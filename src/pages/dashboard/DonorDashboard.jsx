import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  PackagePlus,
  History,
  User,
  LogOut,
  Search,
  Bell,
  Leaf,
  Utensils,
  Clock,
  CheckCircle2,
  Truck,
  ImagePlus,
  MapPin,
  Calendar,
  TrendingUp,
  Menu,
  X,
} from "lucide-react";

/* ---------------- Sidebar ---------------- */
const NAV_ITEMS = [
  { label: "Overview", icon: LayoutDashboard, active: true },
  { label: "Donate Food", icon: PackagePlus },
  { label: "My Donations", icon: History },
  { label: "Profile", icon: User },
];

function Sidebar({ open, onClose }) {
  return (
    <>
      {/* mobile overlay */}
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
              href="#"
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
        <button
          onClick={onMenuClick}
          className="lg:hidden text-ink"
          aria-label="Open menu"
        >
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
          <span className="h-9 w-9 rounded-full bg-gradient-to-br from-orange-200 to-orange-400 flex items-center justify-center text-xs font-bold text-white">
            AM
          </span>
          <span className="hidden sm:block text-sm font-semibold text-ink">Arjun Mehta</span>
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

/* ---------------- Donate Food Form ---------------- */
function DonateFoodForm() {
  const [form, setForm] = useState({
    foodType: "",
    quantity: "",
    expiry: "",
    address: "",
  });

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // UI only — connect to backend later.
    console.log("Donation submitted:", form);
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
          <PackagePlus className="h-5 w-5 text-primary-dark" aria-hidden="true" />
        </span>
        <div>
          <h2 className="text-lg font-bold text-primary-darker">Donate Food</h2>
          <p className="text-xs text-muted">List surplus food in under a minute</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Photo upload */}
        <label className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-200 py-8 cursor-pointer hover:border-primary/50 hover:bg-accent/40 transition">
          <ImagePlus className="h-6 w-6 text-muted" aria-hidden="true" />
          <span className="text-sm font-semibold text-ink">Upload food photo</span>
          <span className="text-xs text-muted">PNG, JPG up to 5MB</span>
          <input type="file" accept="image/*" className="hidden" />
        </label>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="foodType" className="block text-sm font-semibold text-ink mb-1.5">
              Food type
            </label>
            <div className="relative">
              <Utensils className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
              <input
                id="foodType"
                name="foodType"
                type="text"
                required
                value={form.foodType}
                onChange={handleChange}
                placeholder="e.g. Cooked rice, vegetables"
                className="w-full rounded-xl border border-gray-200 pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
              />
            </div>
          </div>

          <div>
            <label htmlFor="quantity" className="block text-sm font-semibold text-ink mb-1.5">
              Quantity (approx. servings)
            </label>
            <input
              id="quantity"
              name="quantity"
              type="number"
              min="1"
              required
              value={form.quantity}
              onChange={handleChange}
              placeholder="e.g. 25"
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
            />
          </div>

          <div>
            <label htmlFor="expiry" className="block text-sm font-semibold text-ink mb-1.5">
              Best before
            </label>
            <div className="relative">
              <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
              <input
                id="expiry"
                name="expiry"
                type="datetime-local"
                required
                value={form.expiry}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
              />
            </div>
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-semibold text-ink mb-1.5">
              Pickup address
            </label>
            <div className="relative">
              <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
              <input
                id="address"
                name="address"
                type="text"
                required
                value={form.address}
                onChange={handleChange}
                placeholder="Street, city"
                className="w-full rounded-xl border border-gray-200 pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
              />
            </div>
          </div>
        </div>

        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full btn btn-primary justify-center text-base"
        >
          Submit Donation
        </motion.button>
      </form>
    </motion.div>
  );
}

/* ---------------- Recent Donations ---------------- */
const STATUS_STYLES = {
  Pending: { bg: "bg-amber-100", text: "text-amber-700", icon: Clock },
  "Picked Up": { bg: "bg-sky-100", text: "text-sky-700", icon: Truck },
  Delivered: { bg: "bg-emerald-100", text: "text-emerald-700", icon: CheckCircle2 },
};

const DONATIONS = [
  { id: "DN-2481", food: "Cooked rice & curry", qty: "30 servings", date: "Jul 6, 2026", status: "Delivered" },
  { id: "DN-2479", food: "Fresh vegetables", qty: "15 kg", date: "Jul 5, 2026", status: "Picked Up" },
  { id: "DN-2475", food: "Bread & bakery items", qty: "20 packs", date: "Jul 4, 2026", status: "Pending" },
  { id: "DN-2468", food: "Fruits assortment", qty: "18 kg", date: "Jul 2, 2026", status: "Delivered" },
];

function RecentDonations() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="card p-7"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-primary-darker">Recent Donations</h2>
          <p className="text-xs text-muted">Track the status of your listed food</p>
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
              <th className="px-2 pb-3">Food</th>
              <th className="px-2 pb-3">Quantity</th>
              <th className="px-2 pb-3">Date</th>
              <th className="px-2 pb-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {DONATIONS.map((d) => {
              const s = STATUS_STYLES[d.status];
              return (
                <tr key={d.id} className="border-t border-gray-100">
                  <td className="px-2 py-3.5 font-semibold text-ink">{d.id}</td>
                  <td className="px-2 py-3.5 text-ink/80">{d.food}</td>
                  <td className="px-2 py-3.5 text-ink/80">{d.qty}</td>
                  <td className="px-2 py-3.5 text-ink/60">{d.date}</td>
                  <td className="px-2 py-3.5">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${s.bg} ${s.text}`}
                    >
                      <s.icon className="h-3.5 w-3.5" aria-hidden="true" />
                      {d.status}
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
export default function DonorDashboard() {
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
              Welcome to the FoodShare's Trusrted Kitchen Network 🍲
             </h1>
            <p className="text-sm text-muted mt-1">
              Here's what's happening with your donations today.
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            <StatCard icon={Utensils} value="42" label="Total Donations" trend="+12%" delay={0} />
            <StatCard icon={CheckCircle2} value="1,260" label="Meals Contributed" trend="+8%" delay={0.05} />
            <StatCard icon={Truck} value="3" label="Active Pickups" delay={0.1} />
            <StatCard icon={TrendingUp} value="87" label="Impact Score" trend="+5%" delay={0.15} />
          </div>

          {/* Form + Recent donations */}
          <div className="grid lg:grid-cols-5 gap-6">
            <div className="lg:col-span-2">
              <DonateFoodForm />
            </div>
            <div className="lg:col-span-3">
              <RecentDonations />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}