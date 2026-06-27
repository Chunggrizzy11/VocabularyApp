import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface LogoItem {
  name: string;
  slug: string;
  fallbackUrl?: string;
}

const LOGOS: LogoItem[] = [
  { name: "Duolingo", slug: "duolingo" },
  { name: "Quizlet", slug: "quizlet" },
  { name: "Memrise", slug: "memrise" },
  { name: "BBC Learning", slug: "bbc" },
  { name: "Cambridge", slug: "cambridge", fallbackUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0a/Cambridge_University_Press_logo.svg/120px-Cambridge_University_Press_logo.svg.png" },
  { name: "Oxford", slug: "oxford" },
];

function getLogoUrl(slug: string, fallbackUrl?: string): string {
  return fallbackUrl || `https://cdn.simpleicons.org/${slug}/777777`;
}

export default function TrustedBySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const track = trackRef.current;
        if (!track) return;
        const distance = track.scrollWidth / 2;

        animationRef.current = gsap.to(track, {
          x: -distance,
          duration: 25,
          ease: "none",
          repeat: -1,
        });

        const section = sectionRef.current;
        if (!section) return;

        const onMouseEnter = () => animationRef.current?.pause();
        const onMouseLeave = () => animationRef.current?.resume();
        const onFocusIn = (e: FocusEvent) => {
          if (track.contains(e.target as Node)) animationRef.current?.pause();
        };
        const onFocusOut = (e: FocusEvent) => {
          if (track.contains(e.target as Node)) animationRef.current?.resume();
        };

        section.addEventListener("mouseenter", onMouseEnter);
        section.addEventListener("mouseleave", onMouseLeave);
        section.addEventListener("focusin", onFocusIn);
        section.addEventListener("focusout", onFocusOut);

        return () => {
          section.removeEventListener("mouseenter", onMouseEnter);
          section.removeEventListener("mouseleave", onMouseLeave);
          section.removeEventListener("focusin", onFocusIn);
          section.removeEventListener("focusout", onFocusOut);
          animationRef.current?.kill();
          animationRef.current = null;
        };
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="py-10 overflow-hidden"
      style={{ backgroundColor: "var(--neutral-secondary-medium)" }}
    >
      <p
        className="text-center text-xs font-extrabold uppercase tracking-widest mb-6"
        style={{ color: "var(--text-body-subtle)" }}
      >
        Trusted by learners worldwide
      </p>
      <div
        ref={trackRef}
        className="logo-track flex items-center gap-12 md:gap-20 whitespace-nowrap"
        role="list"
        aria-label="Trusted learning brands"
      >
        {[...LOGOS, ...LOGOS].map((logo, i) => (
          <div
            key={`${logo.slug}-${i}`}
            className="flex items-center gap-2 shrink-0 transition-opacity duration-300 hover:opacity-80"
            role="listitem"
          >
            <img
              src={getLogoUrl(logo.slug, logo.fallbackUrl)}
              alt={`${logo.name} logo`}
              className="h-5 md:h-6 opacity-50 grayscale transition-all duration-300 hover:opacity-70 hover:grayscale-0"
              fetchPriority={i < 6 ? "high" : "low"}
              onError={(e) => {
                const target = e.currentTarget;
                target.style.display = "none";
                const fallback = target.nextElementSibling;
                if (fallback) {
                  fallback.classList.remove("opacity-50");
                }
              }}
            />
            <span
              className="text-sm md:text-base font-bold opacity-50 transition-opacity duration-300"
              style={{ color: "var(--text-body-subtle)" }}
            >
              {logo.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
