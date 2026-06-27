import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/Logo.png";

export default function CtaSection() {
  const [email, setEmail] = useState("");

  return (
    <section
      className="py-16 md:py-24"
      style={{ backgroundColor: "var(--neutral-primary-soft)" }}
    >
      <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-8">
        <div
          className="relative overflow-hidden rounded-[16px] p-8 md:p-12 text-center"
          style={{
            backgroundColor: "var(--brand-softer)",
            border: "2px solid var(--border-brand-subtle)",
          }}
        >
          {/* Background decoration */}
          <div
            className="absolute top-[-30%] right-[-20%] w-[60%] h-[100%] rounded-full opacity-20 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse, var(--brand) 0%, transparent 70%)",
            }}
          />

          <div className="relative z-10">
            {/* Mascot */}
            <img
              src={logo}
              alt="Parroto"
              className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto rounded-[16px] object-cover mb-4 md:mb-6"
              style={{ boxShadow: "0 4px 0 var(--brand-strong)" }}
            />

            <h2
              className="text-[24px] sm:text-[28px] md:text-[40px] font-extrabold mb-3 md:mb-4"
              style={{ color: "var(--text-heading)" }}
            >
              Start Your Vocabulary Journey
            </h2>
            <p
              className="text-sm sm:text-base md:text-lg max-w-xl mx-auto mb-6 md:mb-8"
              style={{ color: "var(--text-body)" }}
            >
              Join thousands of learners. Sign up free and start building your vocabulary
              today.
            </p>

            {/* Email Capture */}
            <div className="max-w-md mx-auto mb-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="input flex-1"
                  style={{ height: "50px" }}
                />
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center font-bold text-sm uppercase tracking-wide no-underline"
                  style={{
                    padding: "14px 24px",
                    height: "50px",
                    backgroundColor: "var(--brand)",
                    color: "#FFFFFF",
                    borderRadius: "var(--radius-default)",
                    boxShadow: "0 4px 0 var(--brand-strong)",
                    whiteSpace: "nowrap",
                  }}
                >
                  Get Started Free
                </Link>
              </div>
            </div>

            <p
              className="text-xs font-semibold"
              style={{ color: "var(--text-body-subtle)" }}
            >
              No credit card required. Free forever.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}