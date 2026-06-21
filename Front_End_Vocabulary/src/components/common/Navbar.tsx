import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import VolumeSlider from "./VolumeSlider";
import Icon from "./Icon";
import logo from "../../assets/images/Logo.png";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/topics", label: "Topics" },
  { to: "/generate", label: "Generate" },
  { to: "/flashcard", label: "Flashcard" },
  { to: "/review", label: "Review" },
  { to: "/quiz", label: "Quiz" },
  { to: "/statistics", label: "Stats" },
];

export default function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className="sticky top-0 z-50"
      style={{
        backgroundColor: "var(--neutral-primary-soft)",
        borderBottom: "2px solid var(--border-default)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 md:h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 no-underline group shrink-0">
          <img
            src={logo}
            alt="Parroto"
            className="w-8 h-8 md:w-10 md:h-10 rounded-[12px] object-cover"
          />
          <div>
            <span
              className="font-extrabold text-base md:text-lg tracking-tight"
              style={{ color: "var(--text-heading)", fontFamily: "var(--font-primary)" }}
            >
              Parroto
            </span>
            <span
              className="text-[10px] md:text-[11px] font-bold block leading-none mt-0.5 uppercase tracking-wide"
              style={{ color: "var(--text-body-subtle)" }}
            >
              Vocabulary
            </span>
          </div>
        </Link>

        {/* Nav links — desktop */}
        <div className="hidden md:flex items-center gap-1">
          {LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="px-3 lg:px-4 py-2 text-xs lg:text-sm font-bold no-underline transition-all duration-100"
              style={{
                borderRadius: "var(--radius-default)",
                backgroundColor: isActive(link.to) ? "var(--brand-softer)" : "transparent",
                color: isActive(link.to) ? "var(--fg-brand-strong)" : "var(--text-body)",
                textTransform: "uppercase",
                letterSpacing: "0.6px",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2 md:gap-3">
          <div className="hidden md:block">
            <VolumeSlider />
          </div>

          {/* Avatar */}
          <div
            className="w-8 h-8 md:w-10 md:h-10 rounded-[12px] flex items-center justify-center text-xs md:text-sm font-bold text-white shrink-0"
            style={{
              backgroundColor: "var(--brand)",
              boxShadow: "0 2px 0 var(--brand-strong)",
            }}
          >
            U
          </div>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex items-center justify-center cursor-pointer"
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "var(--radius-default)",
              background: "transparent",
              border: "none",
            }}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <Icon name={mobileOpen ? "close" : "menu"} size={24} color="var(--text-body)" />
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      {mobileOpen && (
        <div
          className="md:hidden"
          style={{
            borderTop: "2px solid var(--border-default)",
            backgroundColor: "var(--neutral-primary-soft)",
            padding: "8px 12px 16px",
          }}
        >
          <div className="flex flex-col gap-1">
            {LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-sm font-bold no-underline transition-all duration-100"
                style={{
                  borderRadius: "var(--radius-default)",
                  backgroundColor: isActive(link.to) ? "var(--brand-softer)" : "transparent",
                  color: isActive(link.to) ? "var(--fg-brand-strong)" : "var(--text-heading)",
                  textTransform: "uppercase",
                  letterSpacing: "0.6px",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Volume slider in mobile menu */}
          <div className="mt-3 px-4">
            <VolumeSlider />
          </div>
        </div>
      )}
    </nav>
  );
}
