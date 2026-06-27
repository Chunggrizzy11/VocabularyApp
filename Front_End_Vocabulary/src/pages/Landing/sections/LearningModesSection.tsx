import { Link } from "react-router-dom";
import Icon from "../../../components/common/Icon";
import type { IconName } from "../../../components/common/Icon";

const MODES = [
  {
    icon: "flashcard" as IconName,
    label: "Flashcards",
    desc: "Browse and review words with our intuitive flashcard system.",
    color: "var(--brand)",
    link: "/flashcard",
  },
  {
    icon: "target" as IconName,
    label: "Quizzes",
    desc: "Challenge yourself with multiple choice and typing quizzes.",
    color: "#1CB0F6",
    link: "/quiz",
  },
  {
    icon: "mic" as IconName,
    label: "Speaking",
    desc: "Practice pronunciation with AI-powered voice feedback.",
    color: "#FF6B6B",
    link: "/speaking",
  },
  {
    icon: "refresh" as IconName,
    label: "Review",
    desc: "Smart review sessions timed for maximum retention.",
    color: "#CE82FF",
    link: "/review",
  },
  {
    icon: "sparkle" as IconName,
    label: "Generate",
    desc: "Generate word lists from any topic or interest.",
    color: "#FF9600",
    link: "/generate",
  },
];

export default function LearningModesSection() {
  return (
    <section
      className="py-16 md:py-24 overflow-hidden"
      style={{ backgroundColor: "var(--neutral-primary-soft)" }}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2
            className="text-[28px] md:text-[40px] font-extrabold mb-4"
            style={{ color: "var(--text-heading)" }}
          >
            Multiple Ways to Learn
          </h2>
          <p
            className="text-base md:text-lg max-w-2xl mx-auto"
            style={{ color: "var(--text-body)" }}
          >
            Different tools for different learning styles. Mix and match to find what works
            best for you.
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-4">
          {MODES.map((mode) => (
            <Link
              key={mode.label}
              to={mode.link}
              className="flex flex-col items-center text-center p-6 rounded-[12px] no-underline card-interactive"
              style={{
                backgroundColor: "var(--neutral-primary-soft)",
                border: "2px solid var(--border-default)",
                transition: "transform 0.2s ease-out",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.borderColor = mode.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "var(--border-default)";
              }}
            >
              <div
                className="w-14 h-14 rounded-[12px] flex items-center justify-center mb-3"
                style={{ backgroundColor: `${mode.color}15` }}
              >
                <Icon name={mode.icon} size={28} color={mode.color} />
              </div>
              <h3
                className="font-extrabold text-sm mb-1"
                style={{ color: "var(--text-heading)" }}
              >
                {mode.label}
              </h3>
              <p
                className="text-xs leading-relaxed"
                style={{ color: "var(--text-body)" }}
              >
                {mode.desc}
              </p>
            </Link>
          ))}
        </div>

        {/* Mobile Scroll Snap */}
        <div
          className="md:hidden flex gap-4 overflow-x-auto pb-4"
          style={{
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {MODES.map((mode) => (
            <Link
              key={mode.label}
              to={mode.link}
              className="shrink-0 w-[70%] flex flex-col items-center text-center p-6 rounded-[12px] no-underline"
              style={{
                scrollSnapAlign: "center",
                backgroundColor: "var(--neutral-primary-soft)",
                border: "2px solid var(--border-default)",
              }}
            >
              <div
                className="w-14 h-14 rounded-[12px] flex items-center justify-center mb-3"
                style={{ backgroundColor: `${mode.color}15` }}
              >
                <Icon name={mode.icon} size={28} color={mode.color} />
              </div>
              <h3
                className="font-extrabold text-base mb-1"
                style={{ color: "var(--text-heading)" }}
              >
                {mode.label}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--text-body)" }}
              >
                {mode.desc}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}