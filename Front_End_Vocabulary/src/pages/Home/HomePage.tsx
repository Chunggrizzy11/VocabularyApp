import { useTopics } from "../../hooks/useTopics";
import Loading from "../../components/common/Loading";
import { Link } from "react-router-dom";
import { useVocabulary } from "../../hooks/useVocabulary";
import Icon from "../../components/common/Icon";
import TopicCard from "../../components/topic/TopicCard";
import { useAnimatedEntrance } from "../../hooks/useAnimatedEntrance";
import gsap from "gsap";

export default function HomePage() {
  const { topics, isLoading } = useTopics();
  const { words } = useVocabulary();
  const totalWords = topics.reduce((s, t) => s + t.totalWords, 0);
  const dueCount = words.filter((w) => !w.nextReviewAt || new Date(w.nextReviewAt) <= new Date()).length;
  const wordsInProgress = words.filter((w) => w.nextReviewAt !== null).length;
  const streak = 0;

  const containerRef = useAnimatedEntrance([isLoading, topics.length, totalWords]);

  const quickActions = [
    { to: "/review", label: "Review", desc: `${dueCount} words due`, icon: "refresh" as const, accent: "var(--brand)" },
    { to: "/flashcard", label: "Flashcard", desc: `${words.length} words`, icon: "flashcard" as const, accent: "#CE82FF" },
    { to: "/quiz", label: "Quiz", desc: "Test yourself", icon: "target" as const, accent: "#1CB0F6" },
    { to: "/speaking", label: "Speaking", desc: "Practice pronunciation", icon: "mic" as const, accent: "#FF6B6B" },
    { to: "/generate", label: "Generate", desc: "New words", icon: "sparkle" as const, accent: "#FF9600" },
  ];

  const masteredCount = totalWords - dueCount;

  const stats = [
    { label: "Total Words", value: totalWords, icon: "book" as const, color: "var(--brand)" },
    { label: "Mastered", value: masteredCount, icon: "star" as const, color: "var(--success)" },
    { label: "In Progress", value: wordsInProgress, icon: "refresh" as const, color: "#1CB0F6" },
    { label: "Streak", value: streak, icon: "fire" as const, color: "#FF4B4B" },
  ];

  return (
      <div ref={containerRef} className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6">
        {/* ── Hero ── */}
        <div
          className="relative overflow-hidden rounded-[12px] p-6 md:p-12 mb-6 md:mb-8"
          style={{
            border: "2px solid var(--border-brand-subtle)",
            backgroundColor: "var(--brand-softer)",
          }}
        >
          <div className="relative z-10 flex flex-col items-start gap-3 md:gap-4">
            <h1
              className="text-[28px] md:text-[48px] font-extrabold leading-tight"
              style={{ color: "var(--fg-brand-strong)" }}
            >
              Welcome back
            </h1>
            <p className="text-sm md:text-lg max-w-lg" style={{ color: "var(--fg-brand)" }}>
              Continue your learning journey. You have <strong style={{ color: "var(--fg-brand-strong)" }}>{dueCount}</strong> words waiting for review.
            </p>
            <div className="mt-2 md:mt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                to="/review"
                className="inline-flex items-center justify-center gap-2 font-bold text-xs md:text-sm uppercase tracking-wide no-underline"
                style={{
                  padding: "12px 20px",
                  height: "44px",
                  backgroundColor: "var(--brand)",
                  color: "#FFFFFF",
                  borderRadius: "var(--radius-default)",
                  boxShadow: "0 4px 0 var(--brand-strong)",
                }}
              >
                Start Review →
              </Link>
              <Link
                to="/topics"
                className="inline-flex items-center justify-center gap-2 font-bold text-xs md:text-sm uppercase tracking-wide no-underline"
                style={{
                  padding: "12px 20px",
                  height: "44px",
                  backgroundColor: "var(--neutral-primary-soft)",
                  color: "var(--text-heading)",
                  borderRadius: "var(--radius-default)",
                  border: "2px solid var(--border-default)",
                  boxShadow: "0 4px 0 var(--neutral-tertiary-medium)",
                }}
              >
                Browse Topics
              </Link>
            </div>
          </div>
        </div>

        {/* ── Stats ── */}
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
              {stats.map((stat) => (
                <div key={stat.label} className="card p-4 md:p-5 text-center">
                  <Icon name={stat.icon} size={24} color={stat.color} />
                  <p
                    className="text-[20px] md:text-[24px] font-extrabold mt-1"
                    style={{ color: stat.color }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-[10px] md:text-xs font-bold uppercase tracking-wide mt-0.5" style={{ color: "var(--text-body-subtle)" }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* ── Quick Actions ── */}
            <h2 className="text-lg md:text-2xl font-extrabold mb-3 md:mb-4" style={{ color: "var(--text-heading)" }}>
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
              {quickActions.map((action) => (
                <Link
                  key={action.to}
                  to={action.to}
                  className="card no-underline"
                  style={{
                    display: "block",
                    padding: "16px",
                    cursor: "pointer",
                    borderLeft: `4px solid ${action.accent}`,
                  }}
                  onMouseEnter={(e) => {
                    gsap.to(e.currentTarget, {
                      backgroundColor: "var(--brand-softer)",
                      borderColor: "var(--border-brand-subtle)",
                      scale: 1.02,
                      duration: 0.2,
                      ease: "power2.out",
                      overwrite: "auto",
                    });
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, {
                      backgroundColor: "var(--neutral-primary-soft)",
                      borderColor: "var(--border-default)",
                      scale: 1,
                      duration: 0.15,
                      ease: "power2.out",
                      overwrite: "auto",
                    });
                  }}
                >
                  <Icon name={action.icon} size={24} color={action.accent} />
                  <p className="font-bold text-sm mt-2" style={{ color: "var(--text-heading)" }}>
                    {action.label}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--text-body-subtle)" }}>
                    {action.desc}
                  </p>
                </Link>
              ))}
            </div>
          </>
        )}

        {/* ── Featured Topics ── */}
        {!isLoading && topics.length > 0 && (
          <>
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <h2 className="text-lg md:text-2xl font-extrabold" style={{ color: "var(--text-heading)" }}>
                Your Topics
              </h2>
              <Link to="/topics" className="text-xs md:text-sm font-bold uppercase tracking-wide">
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {topics.slice(0, 6).map((topic) => (
                <TopicCard key={topic._id} topic={topic} />
              ))}
            </div>
          </>
        )}

        {/* ── Empty State ── */}
        {!isLoading && topics.length === 0 && (
          <div
            className="text-center py-8 md:py-12 px-4 rounded-[12px]"
            style={{
              backgroundColor: "var(--neutral-primary-soft)",
              border: "2px dashed var(--border-default)",
            }}
          >
            <Icon name="seed" size={40} color="var(--text-body-subtle)" />
            <h2 className="text-xl md:text-2xl font-extrabold mt-4" style={{ color: "var(--text-heading)" }}>
              Get Started
            </h2>
            <p className="text-sm mt-2" style={{ color: "var(--text-body)" }}>
              Seed topics with 500+ vocabulary words to begin learning!
            </p>
            <Link
              to="/topics"
              className="inline-flex items-center gap-2 mt-6 font-bold text-sm uppercase tracking-wide no-underline"
              style={{
                padding: "14px 20px",
                height: "48px",
                backgroundColor: "var(--brand)",
                color: "#FFFFFF",
                borderRadius: "var(--radius-default)",
                boxShadow: "0 4px 0 var(--brand-strong)",
              }}
            >
              Go to Topics
            </Link>
          </div>
        )}
      </div>
  );
}
