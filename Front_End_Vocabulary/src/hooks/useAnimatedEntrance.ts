import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

/**
 * Animate entrance for a container and its children with stagger.
 * Uses gsap.set() + gsap.to() to avoid immediateRender conflicts.
 */
export function useAnimatedEntrance(deps: any[] = []) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll<HTMLElement>(
      ".card, .card-interactive, .animate-stagger > *"
    );

    const heading = container.querySelector("h1, h2");
    const paragraph = container.querySelector("p");

    const tl = gsap.timeline({
      defaults: { ease: "power3.out", duration: 0.5 },
      // Don't pause — let it play immediately
    });

    // Set initial states
    if (heading) {
      gsap.set(heading, { opacity: 0, y: -12 });
    }
    if (paragraph) {
      gsap.set(paragraph, { opacity: 0, y: -8 });
    }
    if (cards.length > 0) {
      cards.forEach((card) => {
        gsap.set(card, { opacity: 0, y: 20, scale: 0.97 });
      });
    }

    // Animate in
    if (heading) {
      tl.to(heading, { opacity: 1, y: 0, duration: 0.4 }, 0);
    }
    if (paragraph) {
      tl.to(paragraph, { opacity: 1, y: 0, duration: 0.4 }, "-=0.15");
    }
    if (cards.length > 0) {
      tl.to(cards, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.4,
        stagger: { amount: 0.4, from: "start" },
      }, "-=0.1");
    }
  }, { scope: containerRef, dependencies: deps });

  return containerRef;
}
