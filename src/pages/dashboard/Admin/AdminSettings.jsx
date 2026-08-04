import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    Settings as SettingsIcon,
    Globe,
    Moon,
    Trash2,
    Save,
    Recycle,
    AlertTriangle,
} from "lucide-react";
import { useLogout } from "../../../hooks/useLogout.js";
/* ---------------- Sidebar ---------------- */
const NAV_ITEMS = [
    { label: "Overview", icon: LayoutDashboard, href: "#dashboard" },
    { label: "Donate Food", icon: PackagePlus, href: "#donate-food" },
    { label: "Donation History", icon: History, href: "#donation-history" },
    { label: "Notifications", icon: BellIcon, href: "#notifications" },
    { label: "Profile", icon: User, href: "#profile" },
    { label: "Settings", icon: SettingsIcon, active: true, href: "#admin-settings" },
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

                <div className="mx-4 mb-4 rounded-xl bg-accent/60 border border-emerald-100 px-4 py-3.5">
                    <div className="flex items-center gap-2 mb-1">
                        <Recycle className="h-4 w-4 text-primary-dark" aria-hidden="true" />
                        <p className="text-xs font-bold text-primary-darker uppercase tracking-wide">Your Impact</p>
                    </div>
                    <p className="text-xs text-muted leading-snug">142 kg rescued · 6 donations this month</p>
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
                <h1 className="text-xl font-extrabold text-primary-darker tracking-tight">Settings</h1>
            </div>
            <span className="h-9 w-9 rounded-full bg-gradient-to-br from-orange-200 to-orange-400 flex items-center justify-center text-xs font-bold text-white">
                AM
            </span>
        </header>
    );
}

/* ---------------- Toggle Row ---------------- */
function ToggleRow({ label, desc, checked, onChange }) {
    return (
        <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0">
            <div className="pr-4">
                <p className="text-sm font-semibold text-ink">{label}</p>
                {desc && <p className="text-xs text-muted mt-0.5">{desc}</p>}
            </div>
            <button
                role="switch"
                aria-checked={checked}
                onClick={() => onChange(!checked)}
                className={`relative h-6 w-11 flex-shrink-0 rounded-full transition-colors ${checked ? "bg-primary" : "bg-gray-200"
                    }`}
            >
                <motion.span
                    layout
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow"
                    style={{ left: checked ? "22px" : "2px" }}
                />
            </button>
        </div>
    );
}

/* ---------------- Notification Preferences ---------------- */
function NotificationPreferences() {
    const [prefs, setPrefs] = useState({
        pickup: true,
        ngoAccept: true,
        impactReports: true,
        promotions: false,
    });

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="card p-7"
        >
            <h2 className="text-lg font-bold text-primary-darker mb-1">Notification Preferences</h2>
            <p className="text-xs text-muted mb-2">Choose what you get notified about</p>

            <ToggleRow
                label="New Donation Alerts"
                desc="Get notified when a new food donation is submitted."
                checked={prefs.pickup}
                onChange={(v) => setPrefs((p) => ({ ...p, pickup: v }))}
            />
            <ToggleRow
                label="NGO auto-approval"
                desc="NGOs will be approved automatically."
                checked={prefs.ngoAccept}
                onChange={(v) => setPrefs((p) => ({ ...p, ngoAccept: v }))}
            />
            <ToggleRow
                label="Monthly impact reports"
                desc="Receive a summary of meals and families you've helped."
                checked={prefs.impactReports}
                onChange={(v) => setPrefs((p) => ({ ...p, impactReports: v }))}
            />
            <ToggleRow
                label="Promotions & news"
                desc="Occasional updates about new features and events."
                checked={prefs.promotions}
                onChange={(v) => setPrefs((p) => ({ ...p, promotions: v }))}
            />
        </motion.div>
    );
}

/* ---------------- App Preferences ---------------- */
const LANGUAGES = ["English", "हिन्दी", "ਪੰਜਾਬੀ"];

function AppPreferences() {
    const [language, setLanguage] = useState("English");
    const [darkMode, setDarkMode] = useState(false);
    const [saved, setSaved] = useState(false);

    function handleSave() {
        console.log("Preferences saved:", { language, darkMode });
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="card p-7"
        >
            <h2 className="text-lg font-bold text-primary-darker mb-1">App Preferences</h2>
            <p className="text-xs text-muted mb-5">Language, appearance and region</p>

            <div className="mb-2">
                <label className="block text-sm font-semibold text-ink mb-2">Language</label>
                <div className="flex gap-2 flex-wrap">
                    {LANGUAGES.map((lang) => (
                        <button
                            key={lang}
                            onClick={() => setLanguage(lang)}
                            className={`flex items-center gap-1.5 rounded-xl border px-4 py-2 text-sm font-semibold transition ${language === lang
                                ? "border-primary bg-accent text-primary-dark"
                                : "border-gray-200 text-muted hover:border-primary/40"
                                }`}
                        >
                            <Globe className="h-3.5 w-3.5" aria-hidden="true" />
                            {lang}
                        </button>
                    ))}
                </div>
            </div>

            <ToggleRow
                label="Dark mode"
                desc="Switch the dashboard to a darker color theme."
                checked={darkMode}
                onChange={setDarkMode}
            />

            <div className="flex items-center gap-4 pt-5">
                <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSave}
                    className="btn btn-primary text-sm"
                >
                    <Save className="h-4 w-4" aria-hidden="true" />
                    Save Preferences
                </motion.button>
                <AnimatePresence>
                    {saved && (
                        <motion.span
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0 }}
                            className="text-sm font-semibold text-emerald-600"
                        >
                            ✓ Preferences saved
                        </motion.span>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}

/* ---------------- Danger Zone ---------------- */
function DangerZone() {
    const [confirming, setConfirming] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="card p-7 border-red-100"
        >
            <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="h-4.5 w-4.5 text-red-500" aria-hidden="true" />
                <h2 className="text-lg font-bold text-red-600">Danger Zone</h2>
            </div>
            <p className="text-xs text-muted mb-5">Irreversible actions — proceed with caution</p>

            <div className="flex items-center justify-between rounded-xl border border-red-100 bg-red-50/50 px-4 py-4 flex-wrap gap-3">
                <div>
                    <p className="text-sm font-bold text-ink">Delete account</p>
                    <p className="text-xs text-muted mt-0.5">
                        Permanently remove your account and all donation history.
                    </p>
                </div>
                {!confirming ? (
                    <button
                        onClick={() => setConfirming(true)}
                        className="flex items-center gap-2 rounded-xl border border-red-300 text-red-600 text-sm font-semibold px-4 py-2 hover:bg-red-100 transition flex-shrink-0"
                    >
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                        Delete Account
                    </button>
                ) : (
                    <div className="flex gap-2 flex-shrink-0">
                        <button
                            onClick={() => console.log("Account deletion confirmed")}
                            className="rounded-xl bg-red-600 text-white text-sm font-semibold px-4 py-2 hover:bg-red-700 transition"
                        >
                            Confirm Delete
                        </button>
                        <button
                            onClick={() => setConfirming(false)}
                            className="rounded-xl border border-gray-200 text-muted text-sm font-semibold px-4 py-2 hover:bg-gray-50 transition"
                        >
                            Cancel
                        </button>
                    </div>
                )}
            </div>
        </motion.div>
    );
}

/* ---------------- Main Page ---------------- */
export default function Settings() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50/60 flex">
            <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className="flex-1 flex flex-col min-w-0">
                <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />

                <main className="flex-1 px-6 py-8 max-w-3xl w-full mx-auto space-y-6">
                    <NotificationPreferences />
                    <AppPreferences />
                    <DangerZone />
                </main>
            </div>
        </div>
    );
}