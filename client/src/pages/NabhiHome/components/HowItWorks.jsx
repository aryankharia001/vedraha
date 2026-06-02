import React from "react";
import SectionHeader from "./SectionHeader";

// ═══════════════════════════════════════════════════════════════
//  DATA CONFIGURATION
// ═══════════════════════════════════════════════════════════════

const PROCESS_STEPS = [
  {
    stepNumber: "01",
    title: "Apply",
    description: "Take a few drops of Nabhi Oil",
    imageUrl: "https://your-cdn.com/assets/apply-icon.png", // Replace with your image asset URL
  },
  {
    stepNumber: "02",
    title: "Message", // Matching the typo "Message" verbatim from image_8eaf57.jpg
    description: "Gently massage on the Nabhi (belly button)",
    imageUrl: "https://your-cdn.com/assets/massage-icon.png",
  },
  {
    stepNumber: "03",
    title: "Absorb",
    description: "Herbs penetrate deep through 72,000 Nadis",
    imageUrl: "https://your-cdn.com/assets/absorb-icon.png",
  },
  {
    stepNumber: "04",
    title: "Balance",
    description: "Balances body energies & restores harmony",
    imageUrl: "https://your-cdn.com/assets/balance-icon.png",
  },
  {
    stepNumber: "05",
    title: "Results",
    description: "Feel the natural difference in your body & mind",
    imageUrl: "https://your-cdn.com/assets/results-icon.png",
  },
];

const HIGHLIGHT_FEATURES = [
  {
    title: "Fast Absorption",
    description: "Deep action from within",
    imageUrl: "https://your-cdn.com/assets/absorption-feat.png",
  },
  {
    title: "Ancient Ayurvedic",
    description: "Time-tested wisdom",
    imageUrl: "https://your-cdn.com/assets/ayurvedic-feat.png",
  },
  {
    title: "Safe & Natural",
    description: "Gentle, effective & non-habit forming",
    imageUrl: "https://your-cdn.com/assets/safe-feat.png",
  },
  {
    title: "For Whole Family",
    description: "Suitable for men, women & all ages",
    imageUrl: "https://your-cdn.com/assets/family-feat.png",
  },
];

// ═══════════════════════════════════════════════════════════════
//  MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════

export default function HowItWorks() {
  return (
    <section
      className="relative w-full overflow-hidden px-4 py-12 sm:px-6 md:py-16 lg:px-8"
      style={{ backgroundColor: "var(--new-bg-color)" }}
    >
      {/* Decorative Floral Background (Top Right Corner as shown in image_8eaf57.jpg) */}
      <div
        className="pointer-events-none absolute top-0 right-0 h-[220px] w-[220px] bg-contain bg-right-top bg-no-repeat opacity-40 mix-blend-multiply sm:h-[300px] sm:w-[300px] md:opacity-75 lg:h-[380px] lg:w-[380px]"
        style={{
          backgroundImage: `url('https://your-cdn.com/assets/flower-corner-bg.png')`,
        }}
        aria-hidden="true"
      />

      {/* Main Container - Constrained to 1240px and centered exactly */}
      <div className="relative z-10 mx-auto flex max-w-[1240px] flex-col items-center justify-center text-center">
        <SectionHeader
          subtitle="How It Works"
          heading="The Power of Nabhi"
          headingHighlight="Therapy"
        />

        {/* 5-Step Process Horizontal Timeline */}
        <div className="mb-14 grid w-full grid-cols-1 gap-8 min-[540px]:grid-cols-2 md:grid-cols-5 md:gap-4 lg:gap-6">
          {PROCESS_STEPS.map((step, idx) => (
            <div
              key={step.stepNumber}
              className="relative flex flex-col items-center px-2"
            >
              {/* Circular Icon Wrapper with Step Tag */}
              <div className="relative mb-4 flex h-24 w-24 items-center justify-center rounded-full border border-[var(--new-purple-color)] border-opacity-30 bg-[var(--new-bg-white-color)] p-5 shadow-sm transition-transform duration-300 hover:scale-105 sm:h-28 sm:w-28">
                {/* Image Icon replacing SVGs */}
                <img
                  src={step.imageUrl}
                  alt={`${step.title} Icon`}
                  className="h-full w-full object-contain tint-purple"
                  onError={(e) => {
                    // Fallback visual indicator if image paths aren't linked yet
                    e.target.style.display = "none";
                    e.target.parentNode.classList.add("bg-[#35105f]/5");
                  }}
                />

                {/* Number Badge */}
                <span
                  className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white shadow-sm"
                  style={{ backgroundColor: "var(--new-primary-color)" }}
                >
                  {step.stepNumber}
                </span>
              </div>

              {/* Connecting Step Arrow (Hidden on mobile stack, visible between items on desktop view) */}
              {idx < PROCESS_STEPS.length - 1 && (
                <div
                  className="absolute top-12 left-[calc(50%+4rem)] hidden w-[calc(100%-8rem)] items-center justify-center text-[var(--new-purple-color)] opacity-40 md:flex"
                  aria-hidden="true"
                >
                  <svg
                    width="20"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </div>
              )}

              {/* Content Text block */}
              <h3
                className="mb-1.5 text-[15px] font-extrabold text-[var(--new-heading-text)]"
                style={{ fontFamily: "var(--font-new-1)" }}
              >
                {step.title}
              </h3>
              <p
                className="max-w-[180px] text-[12px] font-medium leading-relaxed text-[var(--new-para-text)] opacity-95"
                style={{ fontFamily: "var(--font-new-1)" }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Feature Highlights Bar */}
        <div
          className="grid w-full grid-cols-1 gap-y-6 rounded-2xl border border-[var(--new-neutral-color)] border-opacity-20 p-5 shadow-[0_6px_20px_rgba(33,18,76,0.03)] sm:grid-cols-2 sm:p-6 md:grid-cols-4 md:divide-x md:divide-[var(--new-neutral-color)] md:divide-opacity-30 md:py-5 md:px-2 text-left"
          style={{ backgroundColor: "var(--new-bg-white-color)" }}
        >
          {HIGHLIGHT_FEATURES.map((feat) => (
            <div
              key={feat.title}
              className="flex items-center gap-4 px-4 sm:px-6 md:justify-start"
            >
              {/* Feature Image Wrapper */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-[var(--new-primary-color)]">
                <img
                  src={feat.imageUrl}
                  alt={feat.title}
                  className="h-8 w-8 object-contain"
                  onError={(e) => {
                    e.target.style.opacity = "0.3";
                  }}
                />
              </div>

              {/* Feature Content */}
              <div className="flex flex-col">
                <h4
                  className="text-[13px] font-extrabold text-[var(--new-primary-color)] leading-tight"
                  style={{ fontFamily: "var(--font-new-1)" }}
                >
                  {feat.title}
                </h4>
                <p
                  className="mt-0.5 text-[11px] font-medium text-[var(--new-para-text)] opacity-85 leading-tight"
                  style={{ fontFamily: "var(--font-new-1)" }}
                >
                  {feat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
