import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Icon from "../../../components/common/Icon";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const STEPS = [
  {
    num: "1",
    title: "Pick a Topic",
    desc: "Choose from dozens of curated topics or create your own. Each topic contains carefully selected vocabulary words.",
    icon: "folder" as const,
    color: "var(--brand)",
  },
  {
    num: "2",
    title: "Learn with Flashcards",
    desc: "Swipe through flashcards with example sentences, audio pronunciation, and helpful mnemonics.",
    icon: "flashcard" as const,
    color: "#1CB0F6",
  },
  {
    num: "3",
    title: "Review and Master",
    desc: "Our spaced repetition algorithm schedules smart reviews so words stick in your long-term memory.",
    icon: "star" as const,
    color: "#CE82FF",
  },
];

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Scroll reveal for step cards
        const cards = gsap.utils.toArray<HTMLElement>(".step-card");
        cards.forEach((card, i) => {
          ScrollTrigger.create({
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none none",
            onEnter: () => {
              gsap.from(card, {
                opacity: 0,
                x: i % 2 === 0 ? -30 : 30,
                duration: 0.6,
                ease: "power3.out",
              });
            },
          });
        });

        // Number animation
        ScrollTrigger.create({
          trigger: ".steps-container",
          start: "top 70%",
          toggleActions: "play none none none",
          onEnter: () => {
            gsap.from(".step-number", {
              scale: 0,
              duration: 0.5,
              stagger: 0.2,
              ease: "back.out(1.7)",
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
      id="how-it-works"
      className="py-16 md:py-24"
      style={{ backgroundColor: "var(--neutral-secondary-medium)" }}
    >
      <div className="max-w-5xl mx-auto px-3 sm:px-4 md:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2
            className="text-[28px] md:text-[40px] font-extrabold mb-4"
            style={{ color: "var(--text-heading)" }}
          >
            How It Works
          </h2>
          <p
            className="text-base md:text-lg max-w-2xl mx-auto"
            style={{ color: "var(--text-body)" }}
          >
            Three simple steps to build your vocabulary and keep it growing.
          </p>
        </div>

        <div className="steps-container flex flex-col gap-8 md:gap-12">
          {STEPS.map((step, index) => (
            <div
              key={step.title}
              className="step-card flex flex-col md:flex-row items-center gap-6 md:gap-10 p-6 md:p-8 rounded-[12px]"
              style={{
                backgroundColor: "var(--neutral-primary-soft)",
                border: "2px solid var(--border-default)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              {/* Number */}
              <div
                className="step-number w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center shrink-0"
                style={{
                  backgroundColor: step.color,
                  boxShadow: `0 4px 0 color-mix(in srgb, ${step.color} 60%, black)`,
                }}
              >
                <span
                  className="text-2xl md:text-3xl font-extrabold text-white"
                  style={{ color: "#FFFFFF" }}
                >
                  {step.num}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                  <Icon name={step.icon} size={20} color={step.color} />
                  <h3
                    className="font-extrabold text-xl md:text-2xl"
                    style={{ color: "var(--text-heading)" }}
                  >
                    {step.title}
                  </h3>
                </div>
                <p className="text-sm md:text-base" style={{ color: "var(--text-body)" }}>
                  {step.desc}
                </p>
              </div>

              {/* Connector line (desktop only) */}
              {index < STEPS.length - 1 && (
                <div
                  className=""
                  style={{ backgroundColor: "var(--border-default)" }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}