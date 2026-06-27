import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Icon from "../../../components/common/Icon";
import type { IconName } from "../../../components/common/Icon";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface FeatureItem {
  icon: IconName;
  title: string;
  desc: string;
  color: string;
  bgColor: string;
  featured?: boolean;
}

const FEATURES: FeatureItem[] = [
  {
    icon: "flashcard",
    title: "Smart Flashcards",
    desc: "Review words with an intelligent system that shows you the right card at the right time.",
    color: "var(--brand)",
    bgColor: "var(--brand-softer)",
    featured: true,
  },
  {
    icon: "target",
    title: "Adaptive Quizzes",
    desc: "Test your knowledge with multiple choice, typing, and listening exercises that adapt to your level.",
    color: "#1CB0F6",
    bgColor: "rgba(28, 176, 246, 0.1)",
  },
  {
    icon: "mic",
    title: "Speaking Practice",
    desc: "Improve pronunciation with voice recognition that gives you real-time feedback.",
    color: "#FF6B6B",
    bgColor: "rgba(255, 107, 107, 0.1)",
    featured: true,
  },
  {
    icon: "refresh",
    title: "Spaced Repetition",
    desc: "Our algorithm schedules reviews at the optimal moment to move words from short-term to long-term memory.",
    color: "#CE82FF",
    bgColor: "rgba(206, 130, 255, 0.1)",
  },
  {
    icon: "chart",
    title: "Progress Tracking",
    desc: "Track your vocabulary growth, streak days, and mastery levels with beautiful statistics.",
    color: "#FF9600",
    bgColor: "rgba(255, 150, 0, 0.1)",
  },
];

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        ScrollTrigger.create({
          trigger: ".features-grid",
          start: "top 80%",
          toggleActions: "play none none none",
          onEnter: () => {
            gsap.from(".feature-card", {
              opacity: 0,
              y: 30,
              duration: 0.5,
              stagger: 0.1,
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
      id="features"
      className="py-16 md:py-24"
      style={{ backgroundColor: "var(--neutral-primary-soft)" }}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2
            className="text-[28px] md:text-[40px] font-extrabold mb-4"
            style={{ color: "var(--text-heading)" }}
          >
            Everything you need to learn vocabulary
          </h2>
          <p
            className="text-base md:text-lg max-w-2xl mx-auto"
            style={{ color: "var(--text-body)" }}
          >
            Five powerful tools designed to help you learn, practice, and master new words
            every day.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="features-grid grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4">
          {FEATURES.map((feature, index) => {
            const isFeatured = feature.featured;
            const colSpan = isFeatured ? "md:col-span-2" : "md:col-span-1";
            const rowSpan = isFeatured ? "md:row-span-2" : "md:row-span-1";

            return (
              <div
                key={feature.title}
                className={`feature-card ${colSpan} ${rowSpan} rounded-[12px] p-5 md:p-8 card-interactive`}
                style={{
                  backgroundColor: feature.bgColor,
                  border: "2px solid var(--border-default)",
                  transition: "transform 0.2s ease-out, box-shadow 0.2s ease-out",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 0 var(--border-default-strong)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "var(--shadow-xs)";
                }}
              >
                <div
                  className="w-12 h-12 rounded-[10px] flex items-center justify-center mb-4"
                  style={{ backgroundColor: "var(--neutral-primary-soft)" }}
                >
                  <Icon name={feature.icon} size={24} color={feature.color} />
                </div>
                <h3
                  className="font-extrabold text-lg md:text-xl mb-2"
                  style={{ color: "var(--text-heading)" }}
                >
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-body)" }}>
                  {feature.desc}
                </p>

                {isFeatured && (
                  <div className="mt-4 flex items-center gap-1 text-xs font-bold">
                    <Icon name="star" size={14} color={feature.color} />
                    <span style={{ color: feature.color }}>Most popular</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}