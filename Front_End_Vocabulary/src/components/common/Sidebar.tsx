import { Link, useLocation } from "react-router-dom";
import VolumeSlider from "./VolumeSlider";
import Icon from "./Icon";
import type { IconName } from "./Icon";
import logo from "../../assets/images/Logo.png";

const LINKS: { to: string; label: string; icon: IconName }[] = [
  { to: "/", label: "Home", icon: "home" },
  { to: "/topics", label: "Topics", icon: "folder" },
  { to: "/generate", label: "Generate", icon: "sparkle" },
  { to: "/flashcard", label: "Flashcard", icon: "flashcard" },
  { to: "/review", label: "Review", icon: "book-open" },
  { to: "/quiz", label: "Quiz", icon: "target" },
  { to: "/statistics", label: "Stats", icon: "chart" },
];

export default function Sidebar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside
      className="fixed top-0 left-0 z-50 h-screen flex flex-col shrink-0"
      style={{
        width: "220px",
        backgroundColor: "var(--neutral-primary-soft)",
        borderRight: "2px solid var(--border-default)",
      }}
    >
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2.5 no-underline px-5 py-4 shrink-0">
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
            style={{ color: "var(--text-body-subtle)" }}
          >
            Vocabulary
          </span>
        </div>
      </Link>

      {/* Divider */}
      <div
        className="w-full h-px mx-auto"
        style={{ backgroundColor: "var(--border-default)" }}
      />

      {/* Nav links */}
      <nav className="flex-1 overflow-y-auto px-3 py-3">
        <div className="flex flex-col gap-0.5">
          {LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="flex items-center gap-3 px-4 py-2.5 text-[13px] font-semibold no-underline transition-all duration-150"
              style={{
                borderRadius: "var(--radius-default)",
                backgroundColor: isActive(link.to) ? "var(--brand-softer)" : "transparent",
                color: isActive(link.to) ? "var(--fg-brand-strong)" : "var(--text-body)",
              }}
            >
              <Icon
                name={link.icon}
                size={18}
                color={isActive(link.to) ? "var(--fg-brand-strong)" : "var(--text-body)"}
              />
              {link.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Bottom section: Volume + Avatar */}
      <div
        className="shrink-0 px-5 py-4 flex items-center gap-3"
        style={{ borderTop: "2px solid var(--border-default)" }}
      >
        <VolumeSlider />
        <div
          className="w-8 h-8 rounded-[12px] flex items-center justify-center text-xs font-bold text-white shrink-0 ml-auto"
          style={{
            backgroundColor: "var(--brand)",
            boxShadow: "0 2px 0 var(--brand-strong)",
          }}
        >
          U
        </div>
      </div>
    </aside>
  );
}