import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "How it Works", href: "#how-it-works" },
  { label: "Impact", href: "#impact" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-soft"
          : "bg-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="section flex items-center justify-between h-20"
      >
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2.5" aria-label="FoodShare home">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-gradient shadow-soft">
            <Leaf className="h-5 w-5 text-white" strokeWidth={2.2} aria-hidden="true" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-extrabold text-lg text-primary-darker">FoodShare</span>
            <span className="text-[10px] font-semibold text-muted tracking-wide">
              Reduce Waste. Feed People.
            </span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-9">
          {NAV_LINKS.map((link, i) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`text-sm font-medium text-ink/80 hover:text-primary transition-colors ${
                  i === 0 ? "text-primary font-semibold" : ""
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop actions */}
        <div className="hidden lg:flex items-center gap-3">
          <a href="#login" className="btn btn-outline !py-2.5">
            Login
          </a>
          <a href="#signup" className="btn btn-primary !py-2.5">
            Sign Up
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 rounded-lg hover:bg-accent"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-6 w-6 text-primary-darker" /> : <Menu className="h-6 w-6 text-primary-darker" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden bg-white border-t border-gray-100"
          >
            <ul className="flex flex-col gap-1 px-6 py-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-2.5 text-sm font-medium text-ink/80 hover:text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="flex gap-3 pt-3">
                <a href="#login" className="btn btn-outline flex-1 justify-center !py-2.5">
                  Login
                </a>
                <a href="#signup" className="btn btn-primary flex-1 justify-center !py-2.5">
                  Sign Up
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
