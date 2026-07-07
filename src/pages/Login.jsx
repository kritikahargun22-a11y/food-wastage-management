import { useState } from "react";
import { motion } from "framer-motion";
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowRight,
} from "lucide-react";

export default function Login() {
    const [role, setRole] = useState("donor");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log({
            role,
            email,
            password,
            rememberMe,
        });
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-green-50 via-white to-emerald-100 flex items-center justify-center px-6 py-10">

            {/* Background Glow */}
            <div className="absolute top-20 left-10 w-64 h-64 bg-green-200 rounded-full blur-3xl opacity-30"></div>

            <div className="absolute bottom-10 right-20 w-80 h-80 bg-emerald-200 rounded-full blur-3xl opacity-30"></div>

            {/* Login Card */}
            <motion.div
                initial={{ opacity: 0, y: 40, scale: .95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: .6 }}
                className="relative z-10 w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-2xl grid lg:grid-cols-2"
            >

                {/* Left Side */}
                <div className="hidden lg:flex items-center justify-center bg-green-50 p-10">

                    <img
                        src="/login-illustration.png"
                        alt="FoodShare"
                        className="w-full max-w-md"
                    />

                </div>

                {/* Right Side */}
                <div className="p-10 md:p-14">

                    {/* Logo */}

                    <div className="flex items-center gap-3 mb-8">

                        <div className="w-12 h-12 rounded-xl bg-green-600 flex items-center justify-center text-white text-xl">

                            🌿

                        </div>

                        <div>

                            <h2 className="font-bold text-2xl">

                                FoodShare

                            </h2>

                            <p className="text-sm text-gray-500">

                                Share Food. Share Hope.

                            </p>

                        </div>

                    </div>

                    <h1 className="text-4xl font-bold text-gray-800">

                        Welcome Back 👋

                    </h1>

                    <p className="mt-2 text-gray-500">

                        Login to continue reducing food waste.

                    </p>

                    {/* Role Selector */}

                    <div className="mt-8 flex rounded-xl bg-gray-100 p-1">

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: .95 }}
                            onClick={() => setRole("donor")}
                            className={`flex-1 rounded-xl py-3 font-medium transition ${role === "donor"
                                ? "bg-green-600 text-white shadow-lg"
                                : "text-gray-600"
                                }`}
                        >
                            Donor
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: .95 }}
                            onClick={() => setRole("ngo")}
                            className={`flex-1 rounded-xl py-3 font-medium transition ${role === "ngo"
                                ? "bg-green-600 text-white shadow-lg"
                                : "text-gray-600"
                                }`}
                        >
                            NGO
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: .95 }}
                            onClick={() => setRole("volunteer")}
                            className={`flex-1 rounded-xl py-3 font-medium transition ${role === "volunteer"
                                ? "bg-green-600 text-white shadow-lg"
                                : "text-gray-600"
                                }`}
                        >
                            Volunteer
                        </motion.button>

                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="mt-8 space-y-6"
                    >

                        {/* Email */}

                        <div>

                            <label className="mb-2 block text-sm font-semibold text-gray-700">

                                Email Address

                            </label>

                            <div className="relative">

                                <Mail
                                    size={20}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                />

                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-4 transition-all duration-300 focus:border-green-500 focus:outline-none focus:ring-4 focus:ring-green-100"
                                />

                            </div>

                        </div>

                        {/* Password */}

                        <div>

                            <label className="mb-2 block text-sm font-semibold text-gray-700">

                                Password

                            </label>

                            <div className="relative">

                                <Lock
                                    size={20}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                />

                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-12 transition-all duration-300 focus:border-green-500 focus:outline-none focus:ring-4 focus:ring-green-100"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                                >
                                    {showPassword ? (
                                        <EyeOff size={20} />
                                    ) : (
                                        <Eye size={20} />
                                    )}
                                </button>

                            </div>

                        </div>
                        {/* Remember Me & Forgot Password */}

                        <div className="flex items-center justify-between">

                            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">

                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="h-4 w-4 accent-green-600"
                                />

                                Remember Me

                            </label>

                            <button
                                type="button"
                                className="text-sm font-medium text-green-600 hover:text-green-700"
                            >
                                Forgot Password?
                            </button>

                        </div>

                        {/* Login Button */}

                        <motion.button
                            whileHover={{
                                scale: 1.02,
                                boxShadow: "0 15px 35px rgba(34,197,94,.35)",
                            }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 py-3 font-semibold text-white transition"
                        >
                            Log In
                            <ArrowRight size={18} />
                        </motion.button>

                        {/* Divider */}

                        <div className="flex items-center gap-4">

                            <div className="h-px flex-1 bg-gray-300"></div>

                            <span className="text-sm text-gray-400">
                                OR
                            </span>

                            <div className="h-px flex-1 bg-gray-300"></div>

                        </div>

                        {/* Google Login */}

                        <button
                            type="button"
                            className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 py-3 font-medium transition hover:bg-gray-50"
                        >
                            <img
                                src="https://www.svgrepo.com/show/475656/google-color.svg"
                                alt="Google"
                                className="h-5 w-5"
                            />

                            Continue with Google

                        </button>

                        {/* Sign Up */}

                        <p className="text-center text-gray-600">

                            Don't have an account?{" "}

                            <span className="cursor-pointer font-semibold text-green-600 hover:underline">

                                Sign Up

                            </span>

                        </p>

                    </form>

                </div>

            </motion.div>

        </div>
    );
}
