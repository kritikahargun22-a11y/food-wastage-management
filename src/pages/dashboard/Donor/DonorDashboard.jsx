import { useState } from "react";
import { motion } from "framer-motion";
import {
    LayoutDashboard,
    PackagePlus,
    History,
    Bell as BellIcon,
    User,
    LogOut,
    Search,
    Leaf,
    Menu,
    X,
    TrendingUp,
    Plus,
    Camera,
    MapPin,
    BarChart3,
    Weight,
    Utensils,
    Recycle,
    Settings as SettingsIcon,
} from "lucide-react";
import { useLogout } from "../../../hooks/useLogout.js";
/* ---------------- Sidebar ---------------- */
const NAV_ITEMS = [
    { label: "Overview", icon: LayoutDashboard, active: true, href: "#dashboard" },
    { label: "Donate Food", icon: PackagePlus, href: "#donate-food" },
    { label: "Donation History", icon: History, href: "#donation-history" },
    { label: "Notifications", icon: BellIcon, href: "#notification" },
    { label: "Profile", icon: User, href: "#profile" },
    { label: "Settings", icon: SettingsIcon, href: "#settings" },
];

function Sidebar({ open, onClose }) {
    const handleLogout = useLogout();
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

                {/* Impact summary — sidebar ke andar, floating badge ki jagah */}
                <div className="mx-4 mb-4 rounded-xl bg-accent/60 border border-emerald-100 px-4 py-3.5">
                    <div className="flex items-center gap-2 mb-1">
                        <Recycle className="h-4 w-4 text-primary-dark" aria-hidden="true" />
                        <p className="text-xs font-bold text-primary-darker uppercase tracking-wide">Your Impact</p>
                    </div>
                    <p className="text-xs text-muted leading-snug">142 kg rescued · 6 donations this month</p>
                </div>

                <div className="px-4 py-6 border-t border-gray-100">
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
                <h1 className="text-xl font-extrabold text-primary-darker tracking-tight">
                    Welcome back, Aarav 👋
                </h1>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative hidden md:block">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                    <input
                        type="search"
                        placeholder="Search..."
                        className="w-56 rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
                    />
                </div>
                <button className="relative flex h-10 w-10 items-center justify-center rounded-xl hover:bg-accent" aria-label="Notifications">
                    <BellIcon className="h-5 w-5 text-ink" />
                    <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500" />
                </button>
                <span className="h-9 w-9 rounded-full bg-gradient-to-br from-orange-200 to-orange-400 flex items-center justify-center text-xs font-bold text-white">
                    AM
                </span>
            </div>
        </header>
    );
}

/* ---------------- Stat Card ---------------- */
function StatCard({ icon: Icon, iconBg, value, label, trend, delay }) {
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

/* ---------------- Donations Over Time (chart placeholder) ---------------- */
const RANGES = ["Month", "Quarter", "Year"];
const CHART_DATA = [40, 65, 30, 80, 55, 90, 45];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function DonationsChart() {
    const [range, setRange] = useState("Month");

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="card p-7"
        >
            <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
                <h2 className="text-lg font-bold text-primary-darker">Donations Over Time</h2>
                <div className="flex gap-1 rounded-xl bg-gray-100 p-1">
                    {RANGES.map((r) => (
                        <button
                            key={r}
                            onClick={() => setRange(r)}
                            className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${range === r ? "bg-white text-primary-dark shadow-soft" : "text-muted"
                                }`}
                        >
                            {r}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex items-end justify-between gap-3 h-52 px-2">
                {CHART_DATA.map((h, i) => (
                    <div key={DAYS[i]} className="flex-1 flex flex-col items-center gap-3">
                        <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${h}%` }}
                            transition={{ duration: 0.6, delay: 0.1 * i, ease: "easeOut" }}
                            className="w-full max-w-[36px] rounded-t-lg bg-green-gradient"
                        />
                        <span className="text-xs font-medium text-muted">{DAYS[i]}</span>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}

/* ---------------- Quick Actions ---------------- */
function QuickActions() {
    const actions = [
        { icon: Camera, label: "Upload food photo", bg: "bg-sky-500" },
        { icon: MapPin, label: "Set pickup address", bg: "bg-amber-500" },
        { icon: BarChart3, label: "View full history", bg: "bg-slate-800" },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="card p-7 flex flex-col"
        >
            <h2 className="text-lg font-bold text-primary-darker mb-5">Quick Actions</h2>

            <button className="w-full flex items-center justify-center gap-2 rounded-xl bg-green-gradient text-white font-semibold text-sm py-3.5 mb-4 hover:opacity-90 transition">
                <Plus className="h-4 w-4" aria-hidden="true" />
                Donate Food Now
            </button>

            <div className="space-y-3">
                {actions.map((a) => (
                    <button
                        key={a.label}
                        className="w-full flex items-center gap-3 rounded-xl border border-gray-100 px-4 py-3 text-sm font-semibold text-ink hover:bg-gray-50 transition"
                    >
                        <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${a.bg}`}>
                            <a.icon className="h-4 w-4 text-white" aria-hidden="true" />
                        </span>
                        {a.label}
                    </button>
                ))}
            </div>
        </motion.div>
    );
}

/* ---------------- Active Donations ---------------- */
const STATUS_STYLES = {
    Available: "bg-emerald-100 text-emerald-700",
    "In Transit": "bg-sky-100 text-sky-700",
    Delivered: "bg-gray-100 text-gray-600",
};

const ACTIVE_DONATIONS = [
    { emoji: "🥗", title: "Fresh Vegetable Crate", meta: "18 kg · Expires in 3h 20m", status: "Available" },
    { emoji: "🍞", title: "Bakery Surplus Box", meta: "6 kg · Picked up 4:30 PM", status: "In Transit" },
    { emoji: "🍛", title: "Cooked Meal Trays", meta: "30 servings · Delivered", status: "Delivered" },
];

function ActiveDonations() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
        >
            <h2 className="text-lg font-bold text-primary-darker mb-5">Active Donations</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {ACTIVE_DONATIONS.map((d) => (
                    <motion.div key={d.title} whileHover={{ y: -4 }} className="card overflow-hidden">
                        <div className="h-28 flex items-center justify-center text-4xl bg-gradient-to-br from-emerald-50 to-amber-50">
                            {d.emoji}
                        </div>
                        <div className="p-5">
                            <h3 className="text-sm font-bold text-ink mb-1">{d.title}</h3>
                            <p className="text-xs text-muted mb-3">{d.meta}</p>
                            <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold uppercase ${STATUS_STYLES[d.status]}`}>
                                {d.status}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

/* ---------------- Recent Activity Table ---------------- */
const RECENT_ACTIVITY = [
    { donation: "Fresh Vegetable Crate", ngo: "Hope Kitchen Trust", status: "Available", date: "Jul 05" },
    { donation: "Bakery Surplus Box", ngo: "Seva Foundation", status: "In Transit", date: "Jul 04" },
    { donation: "Cooked Meal Trays", ngo: "Anna Daan NGO", status: "Delivered", date: "Jul 02" },
];

function RecentActivity() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="card p-7"
        >
            <h2 className="text-lg font-bold text-primary-darker mb-6">Recent Activity</h2>
            <div className="overflow-x-auto -mx-2">
                <table className="w-full text-sm min-w-[560px]">
                    <thead>
                        <tr className="text-left text-xs font-bold uppercase tracking-wide text-muted">
                            <th className="px-2 pb-3">Donation</th>
                            <th className="px-2 pb-3">NGO</th>
                            <th className="px-2 pb-3">Status</th>
                            <th className="px-2 pb-3">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {RECENT_ACTIVITY.map((r) => (
                            <tr key={r.donation} className="border-t border-gray-100">
                                <td className="px-2 py-3.5 font-semibold text-ink">{r.donation}</td>
                                <td className="px-2 py-3.5 text-ink/80">{r.ngo}</td>
                                <td className="px-2 py-3.5">
                                    <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${STATUS_STYLES[r.status]}`}>
                                        {r.status}
                                    </span>
                                </td>
                                <td className="px-2 py-3.5 text-ink/60 font-mono text-xs">{r.date}</td>
                            </tr>
                        ))}
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
                <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />

                <main className="flex-1 px-6 py-8 max-w-6xl w-full mx-auto space-y-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                        <StatCard icon={PackagePlus} iconBg="bg-emerald-500" value="24" label="Total Donations" trend="+12%" delay={0} />
                        <StatCard icon={Weight} iconBg="bg-orange-500" value="142 kg" label="Food Donated" trend="+8%" delay={0.05} />
                        <StatCard icon={Utensils} iconBg="bg-sky-500" value="312" label="Meals Provided" trend="+15%" delay={0.1} />
                        <StatCard icon={Recycle} iconBg="bg-slate-800" value="89 kg" label="CO₂ Reduced" trend="+5%" delay={0.15} />
                    </div>

                    <div className="grid lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                            <DonationsChart />
                        </div>
                        <QuickActions />
                    </div>

                    <ActiveDonations />
                    <RecentActivity />
                </main>
            </div>
        </div>
    );
}