import React from "react";
import SectionHeader from "./SectionHeader";
import bgImg from "../../../../public/ingredients/ingredients-bg.png";
import ingredient1 from "../../../../public/ingredients/ingredient1.png";
import ingredient2 from "../../../../public/ingredients/ingredient2.png";
import ingredient3 from "../../../../public/ingredients/ingredient3.png";
import ingredient4 from "../../../../public/ingredients/ingredient4.png";
import ingredient5 from "../../../../public/ingredients/ingredient5.png";
import ingredient6 from "../../../../public/ingredients/ingredient6.png";

// ═══════════════════════════════════════════════════════════════
//  DATA CONFIGURATION
// ═══════════════════════════════════════════════════════════════

const INGREDIENTS = [
  {
    name: "Ashwagandha",
    description: "Relieves stress, calms the mind & strengthens nerves.",
    imageUrl: ingredient1,
  },
  {
    name: "Lavender",
    description: "Promotes deep relaxation and restful sleep.",
    imageUrl: ingredient2,
  },
  {
    name: "Brahmi",
    description: "Improves memory, focus and mental clarity.",
    imageUrl: ingredient3,
  },
  {
    name: "Ginger",
    description: "Supports digestion and reduces inflammation.",
    imageUrl: ingredient4,
  },
  {
    name: "Sesame Oil",
    description: "Nourishes skin, improves absorption and vitality.",
    imageUrl: ingredient5,
  },
  {
    name: "Sandalwood",
    description: "Soothes body, calms the mind & promotes peace.",
    imageUrl: ingredient6,
  },
];

const TRUST_BADGES = [
  {
    title: "100% Natural",
    subtitle: "Pure & Safe",
    icon: (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        className="w-7 h-7"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinejoin="round"
          d="M39 10C21.5 11.2 11.8 19.2 11.8 32.3c0 3.9 3.2 7.1 7.1 7.1C32.1 39.4 38.2 26.7 39 10Z"
        />
        <path strokeLinecap="round" d="M12 38c5.7-8.8 12.4-15 20.2-18.6" />
      </svg>
    ),
  },
  {
    title: "No Chemicals",
    subtitle: "No Toxins",
    icon: (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        className="w-7 h-7"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20 8h12M23 8v10.2L13.6 34.1A6 6 0 0 0 18.8 43h13.4a6 6 0 0 0 5.1-9.1L29 18.2V8"
        />
        <path strokeLinecap="round" d="M20.8 32h11.4M24 24l5 5M29 24l-5 5" />
      </svg>
    ),
  },
  {
    title: "Cold Pressed Oils",
    subtitle: "Maximum Potency",
    icon: (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        className="w-7 h-7"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinejoin="round"
          d="M24 8c-5 0-9.2 3.8-9.8 8.7-3.1 1.1-5.2 4-5.2 7.4 0 3.7 2.6 6.9 6.1 7.7A9.9 9.9 0 0 0 24 40h3.5V8H24Z"
        />
        <path
          strokeLinejoin="round"
          d="M27.5 12.5c5.8 0 10.5 4.7 10.5 10.5 0 2.4-.8 4.6-2.1 6.4 1.1 1.1 1.7 2.6 1.7 4.2 0 3.4-2.8 6.2-6.2 6.2h-3.9V12.5Z"
        />
      </svg>
    ),
  },
  {
    title: "Made with Authentic Herbs",
    subtitle: "Handpicked with Care",
    icon: (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        className="w-7 h-7"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinejoin="round"
          d="M39 10C21.5 11.2 11.8 19.2 11.8 32.3c0 3.9 3.2 7.1 7.1 7.1C32.1 39.4 38.2 26.7 39 10Z"
        />
        <circle cx="24" cy="24" r="5" />
        <path strokeLinecap="round" d="M12 38c5.7-8.8 12.4-15 20.2-18.6" />
      </svg>
    ),
  },
];

// ═══════════════════════════════════════════════════════════════
//  MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════

export default function Ingredients() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: "var(--new-bg-color)" }}
    >
      {/* ── Full-height background image anchored left ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-0 w-[100%] hidden lg:block"
      >
        <img
          src={bgImg}
          alt=""
          className="h-full w-full object-cover object-top"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-[40%]"
          style={{
            background:
              "linear-gradient(to top, #f2eafa5b 0%, #f2eafa5b 5%, transparent 20%, transparent 100%)",
          }}
        />
      </div>

      {/* ── Content area ── */}
      <div className="relative z-10 mx-auto max-w-[1240px] px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        {/* Header — centred */}
        <SectionHeader
          subtitle="The Goodness Within"
          heading="Pure Herbs. Real"
          headingHighlight="Results."
        />

        {/* Subheading */}
        <p
          className="mx-auto -mt-8 mb-10 max-w-xl text-center text-[13px] font-medium leading-relaxed text-[var(--new-para-text)] opacity-90 sm:text-[14px]"
          style={{ fontFamily: "var(--font-new-1)" }}
        >
          We use the finest Ayurvedic herbs and cold-pressed oils to ensure
          maximum potency and effectiveness.
        </p>

        {/* ── Ingredient cards — right-aligned on desktop ── */}
        <div className="flex justify-end">
          <div className="w-full lg:w-[68%]">
            {/* Mobile fallback image */}
            {/* <div className="mb-6 flex justify-center lg:hidden">
              <img
                src={bgImg}
                alt="Nabhi Amrit bottle"
                className="w-[200px] object-contain drop-shadow-lg"
              />
            </div> */}

            {/* Cards grid */}
            <div className="grid grid-cols-2 gap-2.5 min-[480px]:grid-cols-3 sm:gap-3 md:grid-cols-4 lg:grid-cols-6 lg:gap-2">
              {INGREDIENTS.map((herb) => (
                <div
                  key={herb.name}
                  className="group flex flex-col overflow-hidden rounded-[8px] bg-white shadow-[0_4px_14px_rgba(33,18,76,0.10)] border border-[rgba(123,43,236,0.4)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(33,18,76,0.15)] min-h-[200px]"
                >
                  {/* Image — square top half */}
                  <div className="aspect-square w-full overflow-hidden bg-slate-50/60 p-2.5">
                    <img
                      src={herb.imageUrl}
                      alt={herb.name}
                      className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Text — bottom half */}
                  <div className="flex flex-col items-center justify-start gap-1.5 px-2 py-3 pb-3 text-center">
                    <h3
                      className="text-[13px] font-extrabold leading-tight text-[var(--new-purple-color)] lg:text-[12.5px] xl:text-[13.5px]"
                      style={{ fontFamily: "var(--font-new-1)" }}
                    >
                      {herb.name}
                    </h3>
                    <p
                      className="line-clamp-3 text-[11.5px] font-medium leading-snug text-[var(--new-para-text)] opacity-80 lg:text-[11px] xl:text-[11.5px]"
                      style={{ fontFamily: "var(--font-new-1)" }}
                    >
                      {herb.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Trust badges bar ── */}
      </div>
    </section>
  );
}
