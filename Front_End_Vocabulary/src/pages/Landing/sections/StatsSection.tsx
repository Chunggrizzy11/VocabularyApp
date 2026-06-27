import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const STATS = [
  { label: "Vocabulary Words", target: 5000, prefix: "", suffix: "+" },
  { label: "Active Learners", target: 50000, prefix: "", suffix: "+" },
  { label: "Success Rate", target: 92, prefix: "", suffix: "%" },
];

export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const countersRef = useRef<Record<string, HTMLParagraphElement | null>>({});

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Counter animation
        ScrollTrigger.create({
          trigger: ".stats-grid",
          start: "top 75%",
          toggleActions: "play none none none",
          onEnter: () => {
            STATS.forEach((stat) => {
              const el = countersRef.current[stat.label];
              if (!el) return;

              const obj = { val: 0 };
              gsap.to(obj, {
                val: stat.target,
                duration: 2,
                ease: "power2.out",
                onUpdate: () => {
                  el.textContent =
                    stat.prefix + Math.round(obj.val).toLocaleString() + stat.suffix;
                },
              });
            });

            // Entrance animation
            gsap.from(".stat-item", {
              opacity: 0,
              y: 30,
              duration: 0.5,
              stagger: 0.15,
              ease: "power3.out",
            });
          },
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24"
      style={{ backgroundColor: "var(--neutral-primary-soft)" }}
    >
      <div className="max-w-5xl mx-auto px-3 sm:px-4 md:px-8">
        <div className="stats-grid grid grid-cols-3 gap-4 md:gap-12">
          {STATS.map((stat) => (
            <div key={stat.label} className="stat-item text-center">
              <p
                ref={(ref) => {
                  countersRef.current[stat.label] = ref;
                }}
                className="text-[24px] sm:text-[40px] md:text-[56px] font-extrabold leading-none mb-2"
                style={{
                  color: "var(--brand)",
                  textShadow: "0 2px 0 var(--brand-strong)",
                }}
              >
                {stat.prefix}0{stat.suffix}
              </p>
              <p
                className="text-[10px] sm:text-sm md:text-base font-bold uppercase tracking-wide"
                style={{ color: "var(--text-body)" }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}