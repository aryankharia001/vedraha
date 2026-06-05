import React from "react";
import SectionHeader from "./SectionHeader";
import step1 from "../../../../public/how-it-works/step-1.png";
import step2 from "../../../../public/how-it-works/step-2.png";
import step3 from "../../../../public/how-it-works/step-3.png";
import step4 from "../../../../public/how-it-works/step-4.png";
import step5 from "../../../../public/how-it-works/step-5.png";

// ═══════════════════════════════════════════════════════════════
//  DATA CONFIGURATION
// ═══════════════════════════════════════════════════════════════

const PROCESS_STEPS = [
  {
    stepNumber: "01",
    title: "Apply",
    description: "Take a few drops of Nabhi Oil",
    imageUrl: step1,
  },
  {
    stepNumber: "02",
    title: "Message", 
    description: "Gently massage on the Nabhi (belly button)",
    imageUrl: step2,
  },
  {
    stepNumber: "03",
    title: "Absorb",
    description: "Herbs penetrate deep through 72,000 Nadis",
    imageUrl: step3,
  },
  {
    stepNumber: "04",
    title: "Balance",
    description: "Balances body energies & restores harmony",
    imageUrl: step4,
  },
  {
    stepNumber: "05",
    title: "Results",
    description: "Feel the natural difference in your body & mind",
    imageUrl: step5,
  },
];

// ═══════════════════════════════════════════════════════════════
//  MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════

export default function HowItWorks({ themeColor }) {
  // HIGHLIGHT: Fallback checks to preserve original styling variables if prop isn't passed
  const activeColor = themeColor || "var(--new-purple-color)";
  const badgeColor = themeColor || "var(--new-primary-color)";

  return (
    <section
      className="relative w-full overflow-hidden px-4 py-12 sm:px-6 md:py-16 lg:px-8"
      style={{ backgroundColor: "var(--new-bg-white-color)" }}
    >
      {/* Decorative Floral Background (Top Right Corner) */}
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
          themeColor={activeColor}
        />

        {/* 5-Step Process Horizontal Timeline */}
        <div className="mb-14 grid w-full grid-cols-1 gap-8 min-[540px]:grid-cols-2 md:grid-cols-5 md:gap-4 lg:gap-6">
          {PROCESS_STEPS.map((step, idx) => (
            <div
              key={step.stepNumber}
              className="relative flex flex-col items-center px-2"
            >
              {/* Circular Icon Wrapper with Step Tag */}
              <div 
                className="relative mb-4 flex h-24 w-24 items-center justify-center rounded-full border bg-[#fdfdfd] p-5 shadow-sm transition-transform duration-300 hover:scale-105 sm:h-28 sm:w-28"
                style={{ 
                  // HIGHLIGHT: Uses inline styles if hex prop exists, otherwise native Tailwind border-opacity handles CSS variables smoothly
                  borderColor: "black"
                }}
              >
                <img
                  src={step.imageUrl}
                  alt={`${step.title} Icon`}
                  className="h-full w-full object-contain"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.parentNode.style.backgroundColor = themeColor ? `${themeColor}` : "rgba(93, 39, 170, 0.05)";
                  }}
                />

                {/* Number Badge */}
                <span
                  className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white shadow-sm"
                  style={{ backgroundColor: "black" }}
                >
                  {step.stepNumber}
                </span>
              </div>

              {/* Connecting Step Arrow (Hidden on mobile stack, visible between items on desktop view) */}
              {idx < PROCESS_STEPS.length - 1 && (
                <div
                  className="absolute top-12 left-[calc(50%+4rem)] hidden w-[calc(100%-8rem)] items-center justify-center opacity-80 md:flex"
                  style={{ color: "black" }}
                  aria-hidden="true"
                >
                  <svg
                    width="48"
                    height="28"
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
                className="mb-1.5 text-[15px] font-extrabold text-black"
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
        
      </div>
    </section>
  );
}