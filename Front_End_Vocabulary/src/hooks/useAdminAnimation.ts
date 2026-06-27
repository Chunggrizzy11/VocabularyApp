import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface AdminAnimationOptions {
  /** Tween từ dưới lên cho các section */
  sections?: boolean;
  /** Stagger fade-in cho children của 1 selector */
  staggerItems?: string;
  /** Stagger từ trái cho table rows */
  tableRows?: string;
  /** Stagger từ dưới cho grid cards */
  gridCards?: string;
}

gsap.registerPlugin(useGSAP);

/**
 * Hook dùng chung cho tất cả Admin pages.
 * Cung cấp các animation pattern:
 * - sections: từng section fade-in + slide-up
 * - staggerItems: children stagger dọc
 * - tableRows: rows stagger từ trái
 * - gridCards: cards stagger từ dưới
 * Tự động tôn trọng prefers-reduced-motion và responsive breakpoints.
 */
export function useAdminAnimation(
  deps: React.DependencyList = [],
  opts: AdminAnimationOptions = {}
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { sections, staggerItems, tableRows, gridCards } = opts;

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 768px)",
        isMobile: "(max-width: 767px)",
        reduceMotion: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const { reduceMotion } = context.conditions;
        // Khi user prefers reduced-motion → skip hết
        if (reduceMotion) return;

        const container = containerRef.current;
        if (!container) return;

        // Section entrance — từng section con fade-in & slide-up
        if (sections) {
          gsap.from(container.children, {
            y: 40,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.12,
            clearProps: "y,opacity",
          });
        }

        // Stagger items (e.g. nav links, list items)
        if (staggerItems) {
          gsap.from(staggerItems, {
            y: 20,
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.06,
            clearProps: "y,opacity",
          });
        }

        // Table rows — từ trái vào, lần lượt
        if (tableRows) {
          gsap.from(tableRows, {
            x: -20,
            opacity: 0,
            duration: 0.4,
            ease: "power2.out",
            stagger: 0.04,
            clearProps: "x,opacity",
          });
        }

        // Grid cards — từ dưới, random thứ tự nổi lên
        if (gridCards) {
          gsap.from(gridCards, {
            y: 30,
            opacity: 0,
            duration: 0.5,
            ease: "back.out(1.2)",
            stagger: { amount: 0.3, from: "random" },
            clearProps: "y,opacity",
          });
        }
      }
    );

    // Cleanup matchMedia khi unmount
    return () => mm.revert();
  }, deps);

  return containerRef;
}
