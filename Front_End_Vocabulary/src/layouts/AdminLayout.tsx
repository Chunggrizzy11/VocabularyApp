import { useState, useRef } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";
import Icon from "../components/common/Icon";
import AdminIcon from "../components/common/AdminIcon";
import { useAdminAnimation } from "../hooks/useAdminAnimation";
import type { AdminIconName } from "../components/common/AdminIcon";
import logo from "../assets/images/Logo.png";

const ADMIN_LINKS: { to: string; label: string; icon: AdminIconName }[] = [
  { to: "/admin", label: "Dashboard", icon: "dashboard" },
  { to: "/admin/topics", label: "Topics", icon: "topics" },
  { to: "/admin/vocabulary", label: "Vocabulary", icon: "vocabulary" },
  { to: "/admin/users", label: "Users", icon: "users" },
];

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const isActive = (path: string) => location.pathname === path;
  const [collapsed, setCollapsed] = useState(false);

  // Animation cho sidebar nav links
  const navLinksRef = useAdminAnimation([], { staggerItems: "[data-admin-nav]" });

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "var(--neutral-primary-soft)" }}>
      {/* ── Toggle buttons ── */}
      {!collapsed && (
        <button
          onClick={() => setCollapsed(true)}
          className="fixed z-[60] items-center justify-center transition-all duration-300 ease-in-out max-md:hidden"
          style={{
            top: "50%",
            left: "240px",
            transform: "translateY(-50%)",
            backgroundColor: "#58CC02",
            color: "white",
            border: "none",
            borderRadius: "0 6px 6px 0",
            padding: "12px 5px",
            cursor: "pointer",
            fontSize: "14px",
            lineHeight: 1,
            boxShadow: "2px 0 4px rgba(0,0,0,0.15)",
          }}
          aria-label="Thu gọn sidebar"
        >
          ◀
        </button>
      )}

      {collapsed && (
        <button
          onClick={() => setCollapsed(false)}
          className="fixed z-[60] items-center justify-center transition-all duration-300 ease-in-out max-md:hidden"
          style={{
            top: "50%",
            left: "0",
            transform: "translateY(-50%)",
            backgroundColor: "#58CC02",
            color: "white",
            border: "none",
            borderRadius: "0 6px 6px 0",
            padding: "12px 5px",
            cursor: "pointer",
            fontSize: "14px",
            lineHeight: 1,
            boxShadow: "2px 0 4px rgba(0,0,0,0.15)",
          }}
          aria-label="Mở sidebar"
        >
          ▶
        </button>
      )}

      {/* ── Admin Sidebar ── */}
      <aside
        className={`fixed top-0 z-50 h-screen flex flex-col shrink-0 transition-transform duration-300 ease-in-out max-md:hidden ${
          collapsed ? "-translate-x-full" : "translate-x-0"
        }`}
        style={{
          width: "240px",
          left: "0",
          backgroundColor: "var(--neutral-primary-soft)",
          borderRight: "2px solid var(--border-default)",
        }}
      >
        {/* Logo */}
        <Link to="/admin" className="flex items-center gap-2.5 no-underline px-5 py-4 shrink-0">
          <img
            src={logo}
            alt="Parroto"
            className="w-9 h-9 rounded-[12px] object-cover"
          />
          <div>
            <span
              className="font-extrabold text-base tracking-tight block"
              style={{ color: "var(--text-heading)", fontFamily: "var(--font-primary)" }}
            >
              Parroto
            </span>
            <span
              className="text-[10px] font-bold leading-none uppercase tracking-wide block mt-0.5"
              style={{ color: "var(--fg-brand-strong)" }}
            >
              Admin
            </span>
          </div>
        </Link>

        {/* Divider */}
        <div className="w-full h-px" style={{ backgroundColor: "var(--border-default)" }} />

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto px-3 py-3">
          <div ref={navLinksRef} className="flex flex-col gap-0.5">
            {ADMIN_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                data-admin-nav
                className="flex items-center gap-3 px-4 py-2.5 text-[13px] font-semibold no-underline transition-all duration-150"
                title={collapsed ? link.label : undefined}
                style={{
                  borderRadius: "var(--radius-default)",
                  backgroundColor: isActive(link.to) ? "var(--brand-softer)" : "transparent",
                  color: isActive(link.to) ? "var(--fg-brand-strong)" : "var(--text-body)",
                  justifyContent: collapsed ? "center" : "flex-start",
                  padding: collapsed ? "10px" : undefined,
                }}
              >
                <AdminIcon
                  name={link.icon}
                  size={20}
                  className="shrink-0"
                />
                {!collapsed && link.label}
              </Link>
            ))}
          </div>
        </nav>

        {/* Bottom section: User info + Logout */}
        <div
          className="shrink-0 px-4 py-4 flex flex-col gap-3"
          style={{ borderTop: "2px solid var(--border-default)" }}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-[12px] flex items-center justify-center text-xs font-bold text-white shrink-0"
              style={{
                backgroundColor: "var(--brand)",
                boxShadow: "0 2px 0 var(--brand-strong)",
              }}
            >
              {user?.name?.charAt(0)?.toUpperCase() || "A"}
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <p
                  className="text-[12px] font-bold truncate"
                  style={{ color: "var(--text-heading)" }}
                >
                  {user?.name || "Admin"}
                </p>
                <p
                  className="text-[10px] truncate"
                  style={{ color: "var(--text-body-subtle)" }}
                >
                  {user?.email}
                </p>
              </div>
            )}
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2 text-[12px] font-bold rounded-[8px] transition-all duration-200 cursor-pointer"
            style={{
              backgroundColor: "rgba(255, 75, 75, 0.1)",
              color: "#FF4B4B",
              border: "1px solid rgba(255, 75, 75, 0.2)",
            }}
            title={collapsed ? "Logout" : undefined}
          >
            <Icon name="home" size={14} color="#FF4B4B" />
            {!collapsed && "Logout"}
          </button>
        </div>
      </aside>

      {/* ── Main content ── */}
      <main
        className={`flex-1 px-3 py-3 pb-20 md:pb-6 sm:px-4 md:px-8 md:py-6 transition-all duration-300 ease-in-out ${
          collapsed ? "md:ml-0" : "md:ml-[240px]"
        }`}
      >
        {/* Mobile header */}
        <div className="md:hidden flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Parroto" className="w-7 h-7 sm:w-8 sm:h-8 rounded-[8px] object-cover" />
            <span className="font-extrabold text-xs sm:text-sm" style={{ color: "var(--text-heading)" }}>
              Admin
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 text-[10px] sm:text-[11px] font-bold rounded-[8px] cursor-pointer"
              style={{
                backgroundColor: "rgba(255, 75, 75, 0.1)",
                color: "#FF4B4B",
              }}
            >
              Logout
            </button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
