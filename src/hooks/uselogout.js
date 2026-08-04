import { useAuth } from "../context/AuthContext.jsx";

/**
 * Shared logout handler — signs out of Firebase, clears the admin
 * session flag, and redirects to the login page. Any Sidebar's
 * "Log Out" button can call this directly.
 */
export function useLogout() {
  const { logout } = useAuth();

  return async function handleLogout() {
    await logout();
    sessionStorage.removeItem("foodshare_isAdmin");
    window.location.hash = "#login";
  };
}