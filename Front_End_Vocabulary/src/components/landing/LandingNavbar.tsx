import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/images/Logo.png";

export default function LandingNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { id: "features", label: "Features" },
    { id: "how-it-works", label: "How It Works" },
    { id: "faq", label: "FAQ" },
  ];

  const handleNavClick = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "py-3 bg-white/90 backdrop-blur-md shadow-sm"
          : "py-5 bg-transparent"
      }`}
      style={{
        borderBottom: isScrolled ? "1px solid var(--border-default)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 no-underline group"
          >
            <img
              src={logo}
              alt="Parroto"
              className="w-9 h-9 rounded-[12px] object-cover transition-transform duration-200 group-hover:scale-110"
            />
            <span
              className="font-extrabold text-lg tracking-tight"
              style={{ color: "var(--text-heading)" }}
            >
              <span className="text-gradient">Parroto</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                className="text-sm font-bold no-underline transition-colors duration-200 hover:text-[var(--brand)]"
                style={{ color: "var(--text-body)" }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/login"
              className="px-5 py-2.5 text-sm font-bold no-underline rounded-[10px] transition-all duration-200 hover:bg-[var(--brand-softer)]"
              style={{
                color: "var(--fg-brand-strong)",
                border: "2px solid var(--border-default)",
              }}
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="px-5 py-2.5 text-sm font-bold no-underline rounded-[10px] text-white transition-all duration-200"
              style={{
                backgroundColor: "var(--brand)",
                boxShadow: "0 3px 0 var(--brand-strong)",
              }}
            >
              Start Free
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-[8px] cursor-pointer"
            style={{ color: "var(--text-heading)" }}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              {isMobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            className="md:hidden mt-4 p-4 rounded-[12px] animate-fade-up"
            style={{
              backgroundColor: "var(--neutral-primary-soft)",
              border: "2px solid var(--border-default)",
              boxShadow: "var(--shadow-lg)",
            }}
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className="text-sm font-bold no-underline py-2 transition-colors"
                  style={{ color: "var(--text-body)" }}
                >
                  {link.label}
                </a>
              ))}
              <div className="h-px" style={{ backgroundColor: "var(--border-default)" }} />
              <Link
                to="/login"
                className="text-center py-3 text-sm font-bold no-underline rounded-[10px]"
                style={{
                  color: "var(--fg-brand-strong)",
                  border: "2px solid var(--border-default)",
                }}
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="text-center py-3 text-sm font-bold no-underline rounded-[10px] text-white"
                style={{
                  backgroundColor: "var(--brand)",
                  boxShadow: "0 3px 0 var(--brand-strong)",
                }}
              >
                Start Free
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}