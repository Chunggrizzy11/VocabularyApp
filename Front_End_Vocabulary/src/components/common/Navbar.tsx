import { Link, useLocation } from "react-router-dom";
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

  return (
    <nav
      className="sticky top-0 z-50"
      style={{
        backgroundColor: "var(--neutral-primary-soft)",
        borderBottom: "2px solid var(--border-default)",
      }}
    >
      <div
        className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between"
      >
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 no-underline group"
        >
          <img
            src={logo}
            alt="Parroto"
            className="w-10 h-10 rounded-[12px] object-cover"
          />
          <div>
            <span
              className="font-extrabold text-lg tracking-tight"
              style={{
                color: "var(--text-heading)",
                fontFamily: "var(--font-primary)",
              }}
            >
              Parroto
            </span>
            <span
              className="text-[11px] font-bold block leading-none mt-0.5 uppercase tracking-wide"
              style={{ color: "var(--text-body-subtle)" }}
            >
              Vocabulary
            </span>
          </div>
        </Link>

        {/* Nav links — desktop */}
        <div className="hidden md:flex items-center gap-1">
          {LINKS.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className="px-4 py-2 text-sm font-bold no-underline transition-all duration-100"
                style={{
                  borderRadius: "var(--radius-default)",
                  backgroundColor: isActive ? "var(--brand-softer)" : "transparent",
                  color: isActive ? "var(--fg-brand-strong)" : "var(--text-body)",
                  textTransform: "uppercase",
                  letterSpacing: "0.6px",
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right section */}
        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <VolumeSlider />
          </div>

          <div
            className="w-10 h-10 rounded-[12px] flex items-center justify-center text-sm font-bold text-white"
            style={{
              backgroundColor: "var(--brand)",
              boxShadow: "0 2px 0 var(--brand-strong)",
            }}
          >
            U
          </div>
          <div className="md:hidden">
            <Icon name="menu" size={22} color="var(--text-body)" />
          </div>
        </div>
      </div>
    </nav>
  );
}
