import { useState } from "react";
import { Leaf, Facebook, Instagram, Twitter, Linkedin, ArrowRight } from "lucide-react";

const QUICK_LINKS = [
  { label: "About Us", href: "#about" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Our Impact", href: "#impact" },
  { label: "Become a Partner", href: "#contact" },
];

const RESOURCES = [
  { label: "Help Center", href: "#" },
  { label: "Contact Us", href: "#contact" },
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
];

const SOCIALS = [
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
  }

  return (
    <footer id="contact" className="bg-primary-darker text-white/70">
      <div className="section pt-20 pb-10">
        <div className="grid md:grid-cols-4 gap-12 pb-14 border-b border-white/10">
          {/* Logo + description */}
          <div className="md:col-span-1">
            <a href="#home" className="flex items-center gap-2.5 mb-4" aria-label="FoodShare home">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-gradient">
                <Leaf className="h-5 w-5 text-white" aria-hidden="true" />
              </span>
              <span className="font-extrabold text-lg text-white">FoodShare</span>
            </a>
            <p className="text-sm leading-relaxed text-white/55 max-w-xs mb-6">
              Connecting surplus food with the people who need it most — one
              delivery at a time.
            </p>
            <div className="flex gap-2.5">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 border border-white/10 hover:bg-primary transition-colors"
                >
                  <s.icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <nav aria-label="Quick links">
            <h3 className="text-xs font-bold tracking-widest uppercase text-white mb-5">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {QUICK_LINKS.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm hover:text-white transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Resources */}
          <nav aria-label="Resources">
            <h3 className="text-xs font-bold tracking-widest uppercase text-white mb-5">
              Resources
            </h3>
            <ul className="space-y-3">
              {RESOURCES.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm hover:text-white transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Newsletter */}
          <div>
            <h3 className="text-xs font-bold tracking-widest uppercase text-white mb-5">
              Stay Updated
            </h3>
            <p className="text-sm text-white/55 mb-4">
              Get monthly impact reports delivered to your inbox.
            </p>
            <form onSubmit={handleSubmit} className="flex gap-2" aria-label="Newsletter signup">
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 min-w-0 rounded-xl bg-white/5 border border-white/15 px-3.5 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-secondary"
              />
              <button
                type="submit"
                className="flex items-center justify-center rounded-xl bg-primary px-3.5 py-2.5 hover:bg-secondary transition-colors"
                aria-label="Subscribe"
              >
                <ArrowRight className="h-4 w-4 text-white" aria-hidden="true" />
              </button>
            </form>
            {submitted && (
              <p className="mt-2 text-xs text-secondary" role="status">
                Thanks for subscribing!
              </p>
            )}
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>© {new Date().getFullYear()} FoodShare. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
