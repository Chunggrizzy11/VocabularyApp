import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/common/Icon";

const PLANS = [
  {
    name: "Free",
    price: { monthly: 0, yearly: 0 },
    desc: "Get started with the basics",
    features: [
      "500 vocabulary words",
      "Basic flashcards",
      "Daily review sessions",
      "Progress tracking",
    ],
    cta: "Get Started",
    featured: false,
    color: "var(--text-body)",
  },
  {
    name: "Pro",
    price: { monthly: 5, yearly: 49 },
    desc: "Unlock the full learning experience",
    features: [
      "Unlimited vocabulary words",
      "AI-powered quizzes",
      "Speaking practice with feedback",
      "Priority support",
      "Advanced statistics",
      "Custom word lists",
    ],
    cta: "Start Free Trial",
    featured: true,
    color: "var(--brand)",
  },
  {
    name: "Lifetime",
    price: { monthly: 99, yearly: 99 },
    desc: "One payment, lifetime access",
    features: [
      "Everything in Pro",
      "All future features",
      "Lifetime upgrades",
      "Early access to new tools",
    ],
    cta: "Get Lifetime",
    featured: false,
    color: "#CE82FF",
  },
];

export default function PricingSection() {
  const [annual, setAnnual] = useState(false);

  return (
    <section
      id="pricing"
      className="py-16 md:py-24"
      style={{ backgroundColor: "var(--neutral-secondary-medium)" }}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-8">
        <div className="text-center mb-12">
          <h2
            className="text-[28px] md:text-[40px] font-extrabold mb-4"
            style={{ color: "var(--text-heading)" }}
          >
            Simple, Transparent Pricing
          </h2>
          <p
            className="text-base md:text-lg max-w-2xl mx-auto mb-6"
            style={{ color: "var(--text-body)" }}
          >
            Start free, upgrade when you are ready. No hidden fees, no surprises.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 p-1 rounded-[12px]" style={{ backgroundColor: "var(--neutral-primary-soft)", border: "2px solid var(--border-default)" }}>
            <button
              onClick={() => setAnnual(false)}
              className="px-4 py-2 text-sm font-bold rounded-[8px] transition-all duration-150 cursor-pointer"
              style={{
                backgroundColor: !annual ? "var(--brand)" : "transparent",
                color: !annual ? "#FFFFFF" : "var(--text-heading)",
              }}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className="px-4 py-2 text-sm font-bold rounded-[8px] transition-all duration-150 cursor-pointer"
              style={{
                backgroundColor: annual ? "var(--brand)" : "transparent",
                color: annual ? "#FFFFFF" : "var(--text-heading)",
              }}
            >
              Yearly
              <span
                className="ml-1.5 px-1.5 py-0.5 text-[10px] rounded-[4px] font-extrabold"
                style={{
                  backgroundColor: "var(--brand-strong)",
                  color: "#FFFFFF",
                }}
              >
                Save up to 20%
              </span>
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 max-w-5xl mx-auto px-2 sm:px-0">
          {PLANS.map((plan) => {
            const price = annual ? plan.price.yearly : plan.price.monthly;
            const isFree = price === 0;

            return (
              <div
                key={plan.name}
                className="rounded-[12px] p-6 md:p-8 flex flex-col"
                style={{
                  backgroundColor: "var(--neutral-primary-soft)",
                  border: plan.featured
                    ? "2px solid var(--border-brand)"
                    : "2px solid var(--border-default)",
                  boxShadow: plan.featured
                    ? "0 6px 0 var(--border-brand)"
                    : "var(--shadow-xs)",
                  position: "relative",
                }}
              >
                {plan.featured && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-[8px] text-xs font-extrabold uppercase tracking-wide"
                    style={{
                      backgroundColor: "var(--brand)",
                      color: "#FFFFFF",
                      boxShadow: "0 3px 0 var(--brand-strong)",
                    }}
                  >
                    Most Popular
                  </div>
                )}

                <h3
                  className="font-extrabold text-xl mb-1"
                  style={{ color: "var(--text-heading)" }}
                >
                  {plan.name}
                </h3>
                <p className="text-sm mb-4" style={{ color: "var(--text-body)" }}>
                  {plan.desc}
                </p>

                <div className="mb-6">
                  <span
                    className="text-[32px] md:text-[44px] font-extrabold"
                    style={{ color: "var(--text-heading)" }}
                  >
                    {isFree ? "Free" : `$${price}`}
                  </span>
                  {!isFree && (
                    <span
                      className="text-xs md:text-sm font-semibold ml-1"
                      style={{ color: "var(--text-body-subtle)" }}
                    >
                      /{annual ? "year" : "month"}
                    </span>
                  )}
                </div>

                <ul className="flex-1 list-none p-0 m-0 mb-6 flex flex-col gap-2.5">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-sm font-semibold"
                      style={{ color: "var(--text-heading)" }}
                    >
                      <Icon
                        name="check"
                        size={16}
                        color={plan.featured ? "var(--brand)" : "var(--text-body-subtle)"}
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  to="/register"
                  className="block text-center py-3 text-sm font-extrabold no-underline rounded-[8px] transition-all duration-150"
                  style={{
                    backgroundColor: plan.featured ? "var(--brand)" : "var(--neutral-primary-soft)",
                    color: plan.featured ? "#FFFFFF" : "var(--text-heading)",
                    border: plan.featured ? "none" : "2px solid var(--border-default)",
                    boxShadow: plan.featured ? "0 4px 0 var(--brand-strong)" : "0 4px 0 var(--border-default)",
                  }}
                >
                  {plan.cta}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}