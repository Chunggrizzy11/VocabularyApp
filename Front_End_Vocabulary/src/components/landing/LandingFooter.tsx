import { Link } from "react-router-dom";
import logo from "../../assets/images/Logo.png";

export default function LandingFooter() {
  const footerLinks = {
    Product: [
      { to: "/", label: "Features" },
      { to: "/topics", label: "Topics" },
      { to: "/quiz", label: "Quiz" },
      { to: "/flashcard", label: "Flashcard" },
    ],
    Company: [
      { to: "#about", label: "About" },
      { to: "#blog", label: "Blog" },
      { to: "#careers", label: "Careers" },
    ],
    Legal: [
      { to: "#privacy", label: "Privacy Policy" },
      { to: "#terms", label: "Terms of Service" },
      { to: "#cookies", label: "Cookie Policy" },
    ],
  };

  return (
    <footer
      className="mt-20"
      style={{
        borderTop: "2px solid var(--border-default)",
        backgroundColor: "var(--neutral-secondary-medium)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 no-underline mb-4">
              <img
                src={logo}
                alt="Parroto"
                className="w-9 h-9 md:w-10 md:h-10 rounded-[12px] object-cover"
              />
              <span
                className="font-extrabold text-lg tracking-tight"
                style={{ color: "var(--text-heading)" }}
              >
                <span className="text-gradient">Parroto</span>
              </span>
            </Link>
            <p
              className="text-sm max-w-xs mb-6"
              style={{ color: "var(--text-body)" }}
            >
              Master vocabulary through smart spaced repetition. Learn faster,
              remember longer, and track your progress.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              {["twitter", "facebook", "github"].map((social) => (
                <a
                  key={social}
                  href={`#${social}`}
                  className="w-8 h-8 md:w-9 md:h-9 rounded-[10px] flex items-center justify-center transition-all duration-200 hover:bg-[var(--brand-softer)]"
                  style={{
                    backgroundColor: "var(--neutral-primary-soft)",
                    border: "2px solid var(--border-default)",
                  }}
                  aria-label={social}
                >
                  <IconIcon name={social as any} />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4
                className="text-xs font-extrabold uppercase tracking-wider mb-4"
                style={{ color: "var(--text-heading)" }}
              >
                {title}
              </h4>
              <ul className="list-none p-0 m-0 flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm font-semibold no-underline transition-colors duration-200 hover:text-[var(--brand)]"
                      style={{ color: "var(--text-body)" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div
          className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid var(--border-default)" }}
        >
          <p
            className="text-xs font-semibold"
            style={{ color: "var(--text-body-subtle)" }}
          >
            &copy; {new Date().getFullYear()} Parroto. All rights reserved.
          </p>
          <p
            className="text-xs font-semibold"
            style={{ color: "var(--text-body-subtle)" }}
          >
            Made with ICON for learners
          </p>
        </div>
      </div>
    </footer>
  );
}

/* Inline social icon component — keeps Footer self-contained */
function IconIcon({ name }: { name: string }) {
  const size = 16;
  const color = "var(--text-body)";

  if (name === "twitter") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.3-.5-.4-1-.4-1.5 0-3.4 2.8-6.1 6.2-6.1 1.8 0 3.4.7 4.6 1.8l2-.6z" />
      </svg>
    );
  }
  if (name === "facebook") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    );
  }
  if (name === "github") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    );
  }
  return null;
}