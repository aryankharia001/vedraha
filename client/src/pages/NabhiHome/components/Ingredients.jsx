import React from "react";
import SectionHeader from "./SectionHeader"; // Using the dynamic header component created earlier
import bgImg from "../../../../public/ingreidient-bg.png";
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
  }
];

const TRUST_BADGES = [
  {
    title: "100% Natural",
    subtitle: "Pure & Safe",
    imageUrl: "https://your-cdn.com/assets/natural-badge.png",
  },
  {
    title: "No Chemicals",
    subtitle: "No Toxins",
    imageUrl: "https://your-cdn.com/assets/chemical-badge.png",
  },
  {
    title: "Cold Pressed Oils",
    subtitle: "Maximum Potency",
    imageUrl: "https://your-cdn.com/assets/oils-badge.png",
  },
  {
    title: "Made with Authentic Herbs",
    subtitle: "Handpicked with Care",
    imageUrl: "https://your-cdn.com/assets/herbs-badge.png",
  },
];

// ═══════════════════════════════════════════════════════════════
//  MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════

export default function Ingredients() {
  return (
    <section
      className="relative w-full overflow-hidden px-4 py-12 sm:px-6 md:py-16 lg:px-8"
      style={{ backgroundColor: "var(--new-bg-white-color)" }}
    >
      {/* 
        FULL-HEIGHT BACKGROUND IMAGE WRAPPER 
        - Placed perfectly as a direct child of the section tag to take up full height (`inset-y-0`)
        - Hidden on mobile to prevent layouts crashing, rendering beautifully on desktop viewports
        - Employs gradient feathers to replicate the appearance of image_8cddfd.jpg seamlessly
      */}
      <div className="pointer-events-none absolute inset-y-0 left-[-200px] z-0 hidden w-[45%] max-w-[580px] lg:block">
        {/* Left Side Blur Fade */}
        <div 
          className="absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[var(--new-bg-white-color)] to-transparent" 
          aria-hidden="true"
        />

        {/* 100% Height Local Asset Image Rendering Layer */}
        <img
          src={bgImg}
          alt="Nabhi Amrit Premium Bottle ambient environment background presentation"
          className="h-full w-full object-cover object-left mix-blend-multiply opacity-95"
        />

        {/* Right Side Blur Edge Feathering */}
        <div 
          className="absolute inset-y-0 right-0 z-10 w-40 bg-gradient-to-l from-[var(--new-bg-white-color)] via-[var(--new-bg-white-color)]/30 to-transparent" 
          aria-hidden="true"
        />
      </div>

      {/* Center-Aligned Core Content Area */}
      <div className="relative z-10 mx-auto max-w-[1240px]">
        
        {/* Dynamic Header Component Instance */}
        <SectionHeader
          subtitle="The Goodness Within"
          heading="Pure Herbs. Real"
          headingHighlight="Results."
        />

        {/* Subtitle Description text directly below headers */}
        <p
          className="mx-auto -mt-8 mb-12 max-w-xl text-center text-[13px] font-medium leading-relaxed text-[var(--new-para-text)] opacity-90 sm:text-[14px]"
          style={{ fontFamily: "var(--font-new-1)" }}
        >
          We use the finest Ayurvedic herbs and cold-pressed oils to ensure
          maximum potency and effectiveness.
        </p>

        {/* Parent Grid Layer Layout Row */}
        <div className="relative grid w-full grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-4 xl:gap-5">
          
          {/* MOBILE SPOTLIGHT DISPLAY FALLBACK 
              - Your image handles mobile responsively here where the background asset layout drops off
          */}
          <div className="flex w-full flex-col items-center justify-center p-2 lg:hidden">
            <img
              src={bgImg}
              alt="Nabhi Amrit Premium Bottle presentation mobile fallback"
              className="h-auto w-full max-w-[240px] object-contain drop-shadow-[0_10px_25px_rgba(33,18,76,0.12)]"
            />
          </div>

          {/* Right Column Layout: Safely nesting your matrix code blocks */}
          <div className="w-full lg:col-span-8 lg:col-start-5 lg:justify-self-end">
            {/* 7-column matrix dynamically scaling across screen sizes */}
            <div className="grid w-full grid-cols-2 gap-2.5 min-[480px]:grid-cols-3 sm:gap-3 md:grid-cols-4 lg:grid-cols-6 lg:gap-1.5 xl:gap-2">
              {INGREDIENTS.map((herb) => (
                <div
                  key={herb.name}
                  className="group flex h-[250px] flex-col overflow-hidden rounded-[8px] border-opacity-20 bg-white shadow-[0_4px_8px_rgba(33,18,76,0.4)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(33,18,76,0.07)] min-[480px]:h-[230px] lg:h-[190px] xl:h-[230px]"
                >
                  {/* Top Section - Exactly 50% height for the Image */}
                  <div className="flex h-1/2 w-full items-center justify-center bg-slate-50/40 p-2 overflow-hidden relative">
                    <img
                      src={herb.imageUrl}
                      alt={`${herb.name} Herb element`}
                      className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Bottom Section - Exactly 50% height for Content */}
                  <div className="flex h-1/2 w-full flex-col items-center justify-center p-2 text-center bg-white">
                    <h3
                      className="mb-1 text-[11px] font-extrabold text-[var(--new-purple-color)] leading-tight sm:text-[12px] lg:text-[11px] xl:text-[12px]"
                      style={{ fontFamily: "var(--font-new-1)" }}
                    >
                      {herb.name}
                    </h3>

                    <p
                      className="line-clamp-3 text-[10px] font-medium leading-normal text-[var(--new-para-text)] opacity-85 lg:text-[9.5px] xl:text-[10px]"
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

        {/* Bottom Horizontal Trust Metrics Deck */}
        {/* <div className="mt-20 grid w-full grid-cols-2 gap-x-4 gap-y-8 border-t border-neutral-200/60 pt-10 sm:gap-6 md:grid-cols-4 md:divide-x md:divide-neutral-200/50">
          {TRUST_BADGES.map((badge) => (
            <div
              key={badge.title}
              className="flex flex-col items-center gap-2.5 text-center px-4 sm:flex-row sm:text-left sm:justify-center sm:gap-3.5"
            >
              
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-50/80 text-[var(--new-purple-color)] p-2.5 border border-neutral-100">
                <img
                  src={badge.imageUrl}
                  alt={badge.title}
                  className="h-full w-full object-contain"
                />
              </div>

              
              <div className="flex flex-col">
                <h4
                  className="text-[12px] font-extrabold uppercase tracking-wide text-[var(--new-heading-text)] leading-tight sm:text-[13px]"
                  style={{ fontFamily: "var(--font-new-1)" }}
                >
                  {badge.title}
                </h4>
                <p
                  className="mt-0.5 text-[11px] font-medium text-[var(--new-para-text)] opacity-65 sm:text-[12px]"
                  style={{ fontFamily: "var(--font-new-1)" }}
                >
                  {badge.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div> */}
        
      </div>
    </section>
  );
}