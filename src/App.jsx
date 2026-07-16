import { Suspense, lazy, useEffect, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import StatsFloating from "./components/StatsFloating.jsx";
import HowItWorks from "./components/HowItWorks.jsx";
import WhyChoose from "./components/WhyChoose.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";

{/*Donor Dashboard*/}
import DonorDashboard from "./pages/dashboard/Donor/DonorDashboard.jsx";
import DonateFood from "./pages/dashboard/Donor/DonateFood.jsx";
import DonationHistory from "./pages/dashboard/Donor/DonationHistory.jsx";
import Notification from "./pages/dashboard/Donor/Notification.jsx";
import Settings from "./pages/dashboard/Donor/Settings.jsx"
import Profile from "./pages/Profile.jsx";

{/*Ngo Dashboard*/}
import NgoDashboard from "./pages/dashboard/Ngo/NgoDashboard.jsx";
import AvailableDonation from "./pages/dashboard/Ngo/AvailableDonations.jsx"
import ManageRequests from "./pages/dashboard/Ngo/ManageRequests.jsx";
import NgoDonationHistory from "./pages/dashboard/Ngo/NgoDonationHistory.jsx";
import NgoNotifications from "./pages/dashboard/Ngo/NgoNotifications.jsx";
import NgoSettings from "./pages/dashboard/Ngo/NgoSettings.jsx";

{/*Admin Dashboard*/}
import AdminDashboard from "./pages/dashboard/Admin/AdminDashboard.jsx";
import ManageUser from "./pages/dashboard/Admin/ManageUser.jsx";
import ManageDonations from "./pages/dashboard/Admin/ManageDonations.jsx";
import ApproveNGOs from "./pages/dashboard/Admin/ApproveNGOs.jsx"
import Analytics from "./pages/dashboard/Admin/Analytics.jsx"
import Reports from "./pages/dashboard/Admin/Reports.jsx";
import AdminSettings from "./pages/dashboard/Admin/AdminSettings.jsx";

{/*Volunteer Dashboard*/}
import VolunteerDashboard from "./pages/dashboard/Volunteer/VolunteerDashboard.jsx";


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

  {/*Donor dashboard */}
  if (hash === "#dashboard") return <DonorDashboard />;
  if (hash === "#donate-food") return <DonateFood />;
  if (hash === "#donation-history") return <DonationHistory />;
  if (hash === "#notification") return <Notification />
  if (hash === "#settings") return <Settings />
  if (hash === "#profile") return <Profile />;
  
  {/*NGO dashboard */}
  if (hash === "#ngo-dashboard") return <NgoDashboard />;
  if (hash === "#available-donation") return <AvailableDonation />
  if (hash === "#manage-requests") return <ManageRequests />
  if (hash === "#ngo-donation-history") return <NgoDonationHistory />
  if (hash === "#ngo-notifications") return <NgoNotifications />
  if (hash === "#ngo-settings") return <NgoSettings />
  
  {/*Volunteer dashboard */}
  if (hash === "#volunteer-dashboard") return <VolunteerDashboard />;

  
  {/*Admin dashboard */}
  if (hash === "#admin-dashboard") {
    const isAdmin = sessionStorage.getItem("foodshare_isAdmin") === "true";
    if (isAdmin) return <AdminDashboard />;
    window.location.hash = "#login";
    return null;
  }
  if (hash === "#manage-user") return <ManageUser />
  if (hash === "#manage-donations") return <ManageDonations />
  if (hash === "#approve-ngos") return <ApproveNGOs />
  if (hash === "#analytics") return <Analytics />
  if (hash === "#reports") return <Reports />
  if (hash === "#admin-settings") return <AdminSettings />

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