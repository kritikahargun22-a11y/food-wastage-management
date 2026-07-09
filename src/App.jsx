import { Suspense, lazy, useEffect, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import StatsFloating from "./components/StatsFloating.jsx";
import HowItWorks from "./components/HowItWorks.jsx";
import WhyChoose from "./components/WhyChoose.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import DonorDashboard from "./pages/dashboard/DonorDashboard.jsx";


// Lazy-load below-the-fold sections to keep the initial bundle light.
const Impact = lazy(() => import("./components/Impact.jsx"));
const Testimonials = lazy(() => import("./components/Testimonials.jsx"));
const CTA = lazy(() => import("./components/CTA.jsx"));
const Footer = lazy(() => import("./components/Footer.jsx"));

function SectionFallback() {
  return (
    <div className="py-24 flex items-center justify-center" role="status" aria-label="Loading section">
      <div className="h-8 w-8 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
    </div>
  );
}

/**
 * Minimal hash-based routing — no router dependency needed.
 * Navbar links to #login / #signup render the auth pages;
 * anything else (or no hash) shows the landing page.
 */
function useHashRoute() {
  const [hash, setHash] = useState(window.location.hash);
  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);
  return hash;
}

export default function App() {
  const hash = useHashRoute();

  if (hash === "#login") return <Login />;
  if (hash === "#signup") return <Signup />;
  if (hash === "#dashboard") return <DonorDashboard />;
  if (hash === "#dashboard") return <NgoDashboard />;

  return (
    <div className="min-h-screen bg-white text-ink">
      <Navbar />
      <main>
        <Hero />
        <StatsFloating />
        <HowItWorks />
        <WhyChoose />
        <Suspense fallback={<SectionFallback />}>
          <Impact />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Testimonials />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <CTA />
        </Suspense>
      </main>
      <Suspense fallback={<SectionFallback />}>
        <Footer />
      </Suspense>
    </div>
  );
}
