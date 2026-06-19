import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Animate a number from 0 to target when scrolled into view.
 * Target is the resolved DOM textContent of the element.
 */
export function useCountUp(targetValue: number, duration = 1.2, deps: any[] = []) {
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasAnimated) return;

    const ctx = gsap.context(() => {
      const obj = { val: 0 };

      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        once: true,
        onEnter: () => {
          setHasAnimated(true);
          gsap.to(obj, {
            val: targetValue,
            duration,
            ease: "power2.out",
            overwrite: "auto",
            onUpdate: () => {
              el!.textContent = Math.round(obj.val).toString();
            },
          });
        },
      });
    });

    return () => ctx.revert();
  }, [targetValue, duration, hasAnimated, ...deps]);

  return ref;
}
