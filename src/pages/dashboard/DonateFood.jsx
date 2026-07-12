import { useState } from "react";
import { motion } from "framer-motion";
import {
    LayoutDashboard,
    PackagePlus,
    History,
    Bell as BellIcon,
    User,
    LogOut,
    Leaf,
    Menu,
    X,
    ImagePlus,
    Weight,
    MapPin,
    Clock,
    Timer,
    ArrowRight,
    Recycle,
} from "lucide-react";

/* ---------------- Sidebar ---------------- */
const NAV_ITEMS = [
    { label: "Dashboard", icon: LayoutDashboard, href: "#dashboard" },
    { label: "Donate Food", icon: PackagePlus, active: true, href: "#donate-food" },
    { label: "Donation History", icon: History, href: "#" },
    { label: "Notifications", icon: BellIcon, href: "#" },
    { label: "Profile", icon: User, href: "#profile" },
];

function Sidebar({ open, onClose }) {
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

                <div className="mx-4 mb-4 rounded-xl bg-accent/60 border border-emerald-100 px-4 py-3.5">
                    <div className="flex items-center gap-2 mb-1">
                        <Recycle className="h-4 w-4 text-primary-dark" aria-hidden="true" />
                        <p className="text-xs font-bold text-primary-darker uppercase tracking-wide">Your Impact</p>
                    </div>
                    <p className="text-xs text-muted leading-snug">142 kg rescued · 6 donations this month</p>
                </div>

                <div className="px-4 pb-6 border-t border-gray-100 pt-4">
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

/* ---------------- Form ---------------- */
const FOOD_TYPES = ["Vegetables & Fruits", "Cooked Meals", "Bakery Items", "Packaged Food"];
const FOOD_EMOJI = {
    "Vegetables & Fruits": "🥗",
    "Cooked Meals": "🍛",
    "Bakery Items": "🍞",
    "Packaged Food": "📦",
};

function DonateFoodForm({ form, setForm }) {
    function update(key, value) {
        setForm((f) => ({ ...f, [key]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        // UI only — connect to backend later.
        console.log("Donation posted:", form);
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="card p-7"
        >
            {/* Upload dropzone */}
            <label className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-200 py-9 cursor-pointer hover:border-primary/50 hover:bg-accent/40 transition mb-6">
                <ImagePlus className="h-6 w-6 text-muted" aria-hidden="true" />
                <span className="text-sm font-semibold text-ink">Upload food photos</span>
                <span className="text-xs text-muted">Drag & drop or click to browse — up to 4 images</span>
                <input type="file" accept="image/*" multiple className="hidden" />
            </label>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Food title */}
                <div>
                    <label htmlFor="title" className="block text-sm font-semibold text-ink mb-1.5">
                        Food title
                    </label>
                    <input
                        id="title"
                        type="text"
                        value={form.title}
                        onChange={(e) => update("title", e.target.value)}
                        placeholder="e.g. Fresh Vegetable Crate"
                        className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
                    />
                </div>

                {/* Food type pills */}
                <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Food type</label>
                    <div className="flex flex-wrap gap-2">
                        {FOOD_TYPES.map((type) => (
                            <button
                                key={type}
                                type="button"
                                onClick={() => update("type", type)}
                                className={`rounded-full px-4 py-2 text-sm font-semibold border transition ${form.type === type
                                        ? "border-primary bg-accent text-primary-dark"
                                        : "border-gray-200 text-muted hover:border-primary/40"
                                    }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Quantity + unit */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="quantity" className="block text-sm font-semibold text-ink mb-1.5">
                            Quantity
                        </label>
                        <input
                            id="quantity"
                            type="number"
                            min="1"
                            value={form.quantity}
                            onChange={(e) => update("quantity", e.target.value)}
                            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
                        />
                    </div>
                    <div>
                        <label htmlFor="unit" className="block text-sm font-semibold text-ink mb-1.5">
                            Unit
                        </label>
                        <select
                            id="unit"
                            value={form.unit}
                            onChange={(e) => update("unit", e.target.value)}
                            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
                        >
                            <option>kg</option>
                            <option>servings</option>
                            <option>packs</option>
                            <option>boxes</option>
                        </select>
                    </div>
                </div>

                {/* Pickup address */}
                <div>
                    <label htmlFor="address" className="block text-sm font-semibold text-ink mb-1.5">
                        Pickup address
                    </label>
                    <div className="relative">
                        <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                        <input
                            id="address"
                            type="text"
                            value={form.address}
                            onChange={(e) => update("address", e.target.value)}
                            placeholder="123 MG Road, Sector 12"
                            className="w-full rounded-xl border border-gray-200 pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
                        />
                    </div>
                </div>

                {/* Pickup window + expiry */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="window" className="block text-sm font-semibold text-ink mb-1.5">
                            Pickup window
                        </label>
                        <div className="relative">
                            <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                            <input
                                id="window"
                                type="text"
                                value={form.window}
                                onChange={(e) => update("window", e.target.value)}
                                placeholder="4:00 PM – 6:00 PM"
                                className="w-full rounded-xl border border-gray-200 pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="expiry" className="block text-sm font-semibold text-ink mb-1.5">
                            Expiry time
                        </label>
                        <div className="relative">
                            <Timer className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                            <input
                                id="expiry"
                                type="text"
                                value={form.expiry}
                                onChange={(e) => update("expiry", e.target.value)}
                                placeholder="Today, 8:00 PM"
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
                    Post Donation
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </motion.button>
            </form>
        </motion.div>
    );
}

/* ---------------- Live Preview Card ---------------- */
function LivePreview({ form }) {
    const emoji = FOOD_EMOJI[form.type] || "🍽️";
    const isComplete = form.title && form.quantity && form.address;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="card overflow-hidden h-fit"
        >
            <div className="h-40 flex items-center justify-center text-5xl bg-gradient-to-br from-emerald-50 to-amber-50">
                {emoji}
            </div>
            <div className="p-6">
                <h3 className="text-base font-bold text-ink mb-3">
                    {form.title || "Your donation title"}
                </h3>

                <div className="space-y-2 mb-4">
                    <p className="flex items-center gap-2 text-xs text-muted">
                        <Weight className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
                        {form.quantity ? `${form.quantity} ${form.unit}` : "—"} · {form.type || "Select a food type"}
                    </p>
                    <p className="flex items-center gap-2 text-xs text-muted">
                        <MapPin className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
                        {form.address || "Pickup address"}
                    </p>
                    <p className="flex items-center gap-2 text-xs text-muted">
                        <Timer className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
                        Pickup {form.window || "—"} · Expires {form.expiry || "—"}
                    </p>
                </div>

                <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-bold uppercase ${isComplete
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-gray-100 text-gray-500"
                        }`}
                >
                    {isComplete ? "Will post as available" : "Fill in details"}
                </span>
            </div>
        </motion.div>
    );
}

/* ---------------- Main Page ---------------- */
export default function DonateFood() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [form, setForm] = useState({
        title: "Fresh Vegetable Crate",
        type: "Vegetables & Fruits",
        quantity: "18",
        unit: "kg",
        address: "123 MG Road, Sector 12",
        window: "4:00 PM – 6:00 PM",
        expiry: "Today, 8:00 PM",
    });

    return (
        <div className="min-h-screen bg-gray-50/60 flex">
            <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className="flex-1 flex flex-col min-w-0">
                <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />

                <main className="flex-1 px-6 py-8 max-w-6xl w-full mx-auto">
                    <div className="grid lg:grid-cols-5 gap-6">
                        <div className="lg:col-span-3">
                            <DonateFoodForm form={form} setForm={setForm} />
                        </div>
                        <div className="lg:col-span-2">
                            <LivePreview form={form} />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}