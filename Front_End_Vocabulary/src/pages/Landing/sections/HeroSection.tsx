import { useRef } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import logo from "../../../assets/images/Logo.png";

gsap.registerPlugin(useGSAP);

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(headingRef.current, { y: -30, opacity: 0, duration: 0.6 })
        .from(subtextRef.current, { y: -20, opacity: 0, duration: 0.5 }, "-=0.3")
        .from(ctasRef.current?.children, { y: 20, opacity: 0, scale: 0.95, duration: 0.4, stagger: 0.1 }, "-=0.2")
        .from(visualRef.current, { x: 40, opacity: 0, scale: 0.95, duration: 0.6 }, "-=0.4");

      gsap.to(visualRef.current?.querySelector(".parrot-float"), {
        y: -10,
        duration: 2.5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="min-h-[100dvh] flex items-center pt-16 pb-10 md:pt-32 md:pb-16 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Text Side */}
          <div className="flex flex-col gap-6">
            <span
              className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-[0.18em] self-start px-3 py-1.5 rounded-[8px]"
              style={{
                backgroundColor: "var(--brand-softer)",
                color: "var(--fg-brand-strong)",
                border: "1px solid var(--border-brand-subtle)",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              New words daily
            </span>

            <h1
              ref={headingRef}
              className="text-[32px] sm:text-[40px] md:text-[56px] lg:text-[64px] font-extrabold leading-[1.05] tracking-tight"
              style={{ color: "var(--text-heading)" }}
            >
              Learn Smarter,{" "}
              <span className="text-gradient whitespace-nowrap">Remember Longer</span>
            </h1>

            <p
              ref={subtextRef}
              className="text-sm sm:text-base md:text-lg max-w-lg leading-relaxed"
              style={{ color: "var(--text-body)" }}
            >
              Master 5,000+ vocabulary words with smart spaced repetition.
              Flashcard, quiz, and speaking practice all in one playful app.
            </p>

            <div
              ref={ctasRef}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3"
            >
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-sm font-extrabold uppercase tracking-wide no-underline rounded-[12px] text-white transition-all duration-200 hover:translate-y-[-2px]"
                style={{
                  backgroundColor: "var(--brand)",
                  boxShadow: "0 4px 0 var(--brand-strong)",
                }}
              >
                Start Learning Free
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="hidden sm:block">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-sm font-bold no-underline rounded-[12px] transition-all duration-200"
                style={{
                  color: "var(--fg-brand-strong)",
                  border: "2px solid var(--border-default)",
                }}
              >
                Sign In
              </Link>
            </div>

            <div className="flex items-center gap-3 mt-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2"
                    style={{
                      borderColor: "var(--neutral-primary-soft)",
                      background: `var(--brand-softer)`,
                    }}
                  />
                ))}
              </div>
              <p className="text-xs font-bold" style={{ color: "var(--text-body-subtle)" }}>
                Loved by <span style={{ color: "var(--fg-brand-strong)" }}>10,000+</span> learners
              </p>
            </div>
          </div>

          {/* Visual Side */}
          <div
            ref={visualRef}
            className="relative flex items-center justify-center"
          >
            <div className="parrot-float relative">
              <div className="relative">
                <div
                  className="absolute -top-3 -left-3 w-full h-full rounded-[16px]"
                  style={{
                    backgroundColor: "var(--accent-sky)",
                    opacity: 0.3,
                    transform: "rotate(-6deg)",
                  }}
                />
                <div
                  className="absolute -bottom-2 -right-2 w-full h-full rounded-[16px]"
                  style={{
                    backgroundColor: "var(--accent-purple)",
                    opacity: 0.25,
                    transform: "rotate(4deg)",
                  }}
                />
                <div
                  className="relative rounded-[16px] p-6 md:p-10 text-center"
                  style={{
                    backgroundColor: "var(--neutral-primary-soft)",
                    border: "2px solid var(--border-default)",
                    boxShadow: "var(--shadow-lg)",
                  }}
                >
                  <img
                    src={logo}
                    alt="Parroto"
                    className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto rounded-[16px] object-cover mb-3 md:mb-4"
                  />
                  <div className="text-gradient font-extrabold text-xl sm:text-2xl md:text-3xl tracking-tight mb-2">
                    Parroto
                  </div>
                  <p
                    className="text-xs font-bold"
                    style={{ color: "var(--text-body-subtle)" }}
                  >
                    Your vocabulary companion
                  </p>

                  <div className="mt-6 grid grid-cols-3 gap-2">
                    {[
                      { emoji: "flashcard", label: "Cards" },
                      { emoji: "target", label: "Quiz" },
                      { emoji: "mic", label: "Speak" },
                    ].map((item) => (
                      <div
                        key={item.emoji}
                        className="py-2 px-1 rounded-[8px] text-center"
                        style={{
                          backgroundColor: "var(--brand-softer)",
                          border: "1px solid var(--border-brand-subtle)",
                        }}
                      >
                        <p
                          className="text-xs font-extrabold"
                          style={{ color: "var(--fg-brand-strong)" }}
                        >
                          {item.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div
              className="absolute -top-2 -right-2 md:top-4 md:right-4 px-3 py-1.5 rounded-[10px] text-xs font-extrabold uppercase tracking-wide"
              style={{
                backgroundColor: "var(--brand)",
                color: "#FFFFFF",
                boxShadow: "0 3px 0 var(--brand-strong)",
              }}
            >
              Free
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}