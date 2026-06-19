import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

/**
 * Smooth card hover with scale + shadow using GSAP.
 * Attach ref to the card element.
 */
export function useCardHover() {
  const ref = useRef<HTMLDivElement>(null);

  const enter = () => {
    gsap.to(ref.current, {
      scale: 1.02,
      boxShadow: "0 6px 0 var(--border-default), 0 8px 24px -4px rgba(0,0,0,0.08)",
      duration: 0.2,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const leave = () => {
    gsap.to(ref.current, {
      scale: 1,
      boxShadow: "0 2px 0 rgb(229 229 229 / 1)",
      duration: 0.15,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  return { ref, enter, leave };
}

/**
 * Button press animation (smoother than raw inline styles).
 */
export function useButtonPress() {
  const ref = useRef<HTMLButtonElement>(null);

  const press = () => {
    gsap.to(ref.current, {
      y: 2,
      boxShadow: "0 2px 0 var(--shadow-btn-brand)",
      duration: 0.08,
      ease: "none",
      overwrite: "auto",
    });
  };

  const release = () => {
    gsap.to(ref.current, {
      y: 0,
      boxShadow: "0 4px 0 var(--shadow-btn-brand)",
      duration: 0.1,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  return { ref, press, release };
}
