import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "./Icon";
import type { IconName } from "./Icon";

interface TabLink {
  to: string;
  label: string;
  icon: IconName;
}

const MAIN_TABS: TabLink[] = [
  { to: "/", label: "Home", icon: "home" },
  { to: "/topics", label: "Topics", icon: "folder" },
  { to: "/flashcard", label: "Flashcard", icon: "flashcard" },
  { to: "/review", label: "Review", icon: "book-open" },
  { to: "/quiz", label: "Quiz", icon: "target" },
];

const MORE_TABS: TabLink[] = [
  { to: "/speaking", label: "Speaking", icon: "mic" },
  { to: "/generate", label: "Generate", icon: "sparkle" },
  { to: "/statistics", label: "Stats", icon: "chart" },
];

export default function MobileNav() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => location.pathname === path;

  // Close on backdrop tap or route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent | TouchEvent) => {
      if (sheetRef.current && !sheetRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    // Delay to avoid catching the same tap that opened it
    requestAnimationFrame(() => {
      document.addEventListener("mousedown", handler);
      document.addEventListener("touchstart", handler, { passive: true });
    });
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [open]);

  const anyMoreActive = MORE_TABS.some((t) => isActive(t.to));

  return (
    <>
      {/* Bottom Nav Bar */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 flex items-center md:hidden"
        style={{
          height: "64px",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
          backgroundColor: "var(--neutral-primary-soft)",
          borderTop: "2px solid var(--border-default)",
        }}
      >
        {MAIN_TABS.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="flex flex-col items-center justify-center gap-0.5 no-underline transition-all duration-150 flex-1 min-w-0"
            style={{
              padding: "2px 0",
              borderRadius: "var(--radius-default)",
              backgroundColor: isActive(link.to) ? "var(--brand-softer)" : "transparent",
              color: isActive(link.to) ? "var(--fg-brand-strong)" : "var(--text-body)",
            }}
          >
            <Icon
              name={link.icon}
              size={20}
              color={isActive(link.to) ? "var(--fg-brand-strong)" : "var(--text-body)"}
            />
            <span
              className="text-[8px] font-bold uppercase tracking-wide leading-none truncate max-w-full px-0.5"
              style={{ color: isActive(link.to) ? "var(--fg-brand-strong)" : "var(--text-body)" }}
            >
              {link.label}
            </span>
          </Link>
        ))}

        {/* More button */}
        <button
          onClick={() => setOpen(true)}
          className="flex flex-col items-center justify-center gap-0.5 flex-1 min-w-0 cursor-pointer"
          style={{
            padding: "2px 0",
            border: "none",
            borderRadius: "var(--radius-default)",
            backgroundColor: anyMoreActive && !open ? "var(--brand-softer)" : "transparent",
            color: anyMoreActive && !open ? "var(--fg-brand-strong)" : "var(--text-body)",
            fontFamily: "var(--font-primary)",
          }}
          aria-label="More options"
        >
          <Icon
            name="dots"
            size={20}
            color={anyMoreActive && !open ? "var(--fg-brand-strong)" : "var(--text-body)"}
          />
          <span
            className="text-[8px] font-bold uppercase tracking-wide leading-none"
            style={{ color: anyMoreActive && !open ? "var(--fg-brand-strong)" : "var(--text-body)" }}
          >
            More
          </span>
        </button>
      </nav>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Bottom Sheet */}
      <div
        ref={sheetRef}
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden transition-transform duration-200"
        style={{
          transform: open ? "translateY(0)" : "translateY(100%)",
          backgroundColor: "var(--neutral-primary-soft)",
          borderTopLeftRadius: "16px",
          borderTopRightRadius: "16px",
          borderTop: "2px solid var(--border-default)",
          boxShadow: "0 -4px 20px rgba(0,0,0,0.1)",
          paddingBottom: "calc(64px + env(safe-area-inset-bottom, 0px))",
          maxHeight: "50vh",
          overflowY: "auto",
        }}
      >
        {/* Handle bar */}
        <div className="flex justify-center pt-3 pb-1">
          <div
            style={{
              width: "36px",
              height: "4px",
              borderRadius: "2px",
              backgroundColor: "var(--neutral-tertiary-medium)",
            }}
          />
        </div>

        <div className="px-3 pb-4">
          <p
            className="text-[10px] font-bold uppercase tracking-wide px-3 pt-3 pb-2"
            style={{ color: "var(--text-body-subtle)" }}
          >
            More features
          </p>
          {MORE_TABS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="flex items-center gap-3 px-3 py-3 no-underline transition-all duration-150"
              style={{
                borderRadius: "var(--radius-default)",
                backgroundColor: isActive(link.to) ? "var(--brand-softer)" : "transparent",
                color: isActive(link.to) ? "var(--fg-brand-strong)" : "var(--text-heading)",
              }}
            >
              <Icon
                name={link.icon}
                size={20}
                color={isActive(link.to) ? "var(--fg-brand-strong)" : "var(--text-body)"}
              />
              <span className="text-sm font-bold">{link.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
