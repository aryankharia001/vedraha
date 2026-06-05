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

// ═══════════════════════════════════════════════════════════════
//  MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════

export default function Ingredients({ themeColor }) {
  const activeTextColor = themeColor || "var(--new-purple-color)";
  const activeBorderColor = themeColor ? `${themeColor}66` : "rgba(123, 43, 236, 0.4)";

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

        {/* ── Centred header block ── */}
        

        {/* ── Ingredient cards — right-aligned on desktop ── */}
        <div className="flex justify-end">
          <div className="w-full lg:w-[68%]">

<div className="mx-auto max-w-xl text-center">
          <SectionHeader
            subtitle="The Goodness Within"
            heading="Pure Herbs. Real"
            headingHighlight="Results."
            themeColor={themeColor}
          />

          <p
            className="-mt-8 mb-10 text-[13px] font-medium leading-relaxed text-[var(--new-para-text)] opacity-90 sm:text-[14px]"
            style={{ fontFamily: "var(--font-new-1)" }}
          >
            We use the finest Ayurvedic herbs and cold-pressed oils to ensure
            maximum potency and effectiveness.
          </p>
        </div>

            <div className="grid grid-cols-2 gap-2.5 min-[480px]:grid-cols-3 sm:gap-3 md:grid-cols-4 lg:grid-cols-6 lg:gap-2">
              {INGREDIENTS.map((herb) => (
                <div
                  key={herb.name}
                  className="group flex flex-col overflow-hidden rounded-[8px] bg-white shadow-[0_4px_14px_rgba(33,18,76,0.10)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(33,18,76,0.15)] min-h-[200px]"
                  style={{ borderStyle: "solid" }}
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
                      className="text-[13px] font-extrabold leading-tight lg:text-[12.5px] xl:text-[13.5px]"
                      style={{
                        fontFamily: "var(--font-new-1)",
                        color: "var(--color-black)",
                      }}
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