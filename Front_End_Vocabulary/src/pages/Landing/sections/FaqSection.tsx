import { useState } from "react";
import Icon from "../../../components/common/Icon";

const FAQS = [
  {
    q: "Is Parroto really free?",
    a: "Yes! The Free plan gives you access to 500 vocabulary words with basic flashcards and daily review sessions. You can upgrade to Pro anytime when you need more.",
  },
  {
    q: "How does spaced repetition work?",
    a: "Spaced repetition schedules reviews at increasing intervals based on how well you know each word. Words you find difficult appear more often, while mastered words appear less frequently. This moves vocabulary from short-term to long-term memory efficiently.",
  },
  {
    q: "Can I create my own word lists?",
    a: "Pro and Lifetime users can create custom word lists from any topic. Free users can access our curated topic library.",
  },
  {
    q: "What languages are supported?",
    a: "Parroto currently supports English vocabulary learning with definitions, example sentences, and audio pronunciation. More languages are coming soon.",
  },
  {
    q: "Is there a mobile app?",
    a: "Parroto is fully responsive and works great on mobile browsers. Native iOS and Android apps are in development.",
  },
  {
    q: "Can I cancel my subscription anytime?",
    a: "Yes, you can cancel your Pro subscription at any time. Your access continues until the end of your billing period. Lifetime purchases are non-refundable.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="py-16 md:py-24"
      style={{ backgroundColor: "var(--neutral-primary-soft)" }}
    >
      <div className="max-w-3xl mx-auto px-3 sm:px-4 md:px-8">
        <div className="text-center mb-12">
          <h2
            className="text-[28px] md:text-[40px] font-extrabold mb-4"
            style={{ color: "var(--text-heading)" }}
          >
            Frequently Asked Questions
          </h2>
        </div>

        <div className="flex flex-col gap-2">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="rounded-[12px] overflow-hidden transition-all duration-200"
                style={{
                  border: "2px solid",
                  borderColor: isOpen ? "var(--border-brand)" : "var(--border-default)",
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer"
                  style={{
                    backgroundColor: "var(--neutral-primary-soft)",
                    border: "none",
                  }}
                  aria-expanded={isOpen}
                >
                  <span
                    className="font-bold text-sm md:text-base pr-4"
                    style={{ color: "var(--text-heading)" }}
                  >
                    {faq.q}
                  </span>
                  <Icon
                    name="chevron-right"
                    size={16}
                    color="var(--text-body-subtle)"
                    style={{
                      transition: "transform 0.2s ease",
                      transform: isOpen ? "rotate(90deg)" : "rotate(0)",
                    }}
                  />
                </button>

                {isOpen && (
                  <div
                    className="px-5 pb-4"
                    style={{
                      backgroundColor: "var(--neutral-primary-soft)",
                    }}
                  >
                    <p
                      className="text-sm leading-relaxed m-0"
                      style={{ color: "var(--text-body)" }}
                    >
                      {faq.a}
                    </p>
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