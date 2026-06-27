import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const TESTIMONIALS = [
  {
    quote: "Parroto completely changed how I learn vocabulary. The spaced repetition system is incredible. I've learned over 200 words in just two weeks.",
    name: "Sarah Chen",
    role: "English Learner",
    seed: "sarah-chen",
  },
  {
    quote: "The speaking practice feature is a game changer. I can finally hear my pronunciation and improve it with real-time feedback.",
    name: "Marcus Rivera",
    role: "TOEFL Student",
    seed: "marcus-rivera",
  },
  {
    quote: "I tried many vocabulary apps, but Parroto is the only one that actually made words stick. The adaptive quizzes keep me engaged every day.",
    name: "Yuki Tanaka",
    role: "University Student",
    seed: "yuki-tanaka",
  },
  {
    quote: "As a teacher, I recommend Parroto to all my students. The progress tracking and review system are exactly what learners need.",
    name: "Dr. Emily Foster",
    role: "Language Teacher",
    seed: "emily-foster",
  },
];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        ScrollTrigger.create({
          trigger: ".testimonials-grid",
          start: "top 80%",
          toggleActions: "play none none none",
          onEnter: () => {
            gsap.from(".testimonial-card", {
              opacity: 0,
              y: 30,
              duration: 0.5,
              stagger: 0.12,
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
      style={{ backgroundColor: "var(--neutral-secondary-medium)" }}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2
            className="text-[28px] md:text-[40px] font-extrabold mb-4"
            style={{ color: "var(--text-heading)" }}
          >
            What Our Learners Say
          </h2>
          <p
            className="text-base md:text-lg max-w-2xl mx-auto"
            style={{ color: "var(--text-body)" }}
          >
            Join thousands of students who have transformed their vocabulary learning.
          </p>
        </div>

        <div className="testimonials-grid grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="testimonial-card p-5 md:p-6 rounded-[12px]"
              style={{
                backgroundColor: "var(--neutral-primary-soft)",
                border: "2px solid var(--border-default)",
              }}
            >
              <p
                className="text-sm md:text-base leading-relaxed mb-4"
                style={{ color: "var(--text-heading)" }}
              >
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3">
                <img
                  src={`https://picsum.photos/seed/${t.seed}/48/48`}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover"
                  style={{
                    border: "2px solid var(--border-brand-subtle)",
                  }}
                  loading="lazy"
                />
                <div>
                  <p
                    className="font-extrabold text-sm"
                    style={{ color: "var(--text-heading)" }}
                  >
                    {t.name}
                  </p>
                  <p
                    className="text-xs font-semibold"
                    style={{ color: "var(--text-body-subtle)" }}
                  >
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}