// ConcernSection.jsx

import React from "react";

const CONCERNS = [
  {
    label: "Poor Sleep",
    url: "/collections/sleep-oils",
    icon: (
      <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 8C14.477 8 10 12.477 10 18C10 23.523 14.477 28 20 28C23.5 28 26.6 26.3 28.5 23.7C27.7 23.9 26.9 24 26 24C20.477 24 16 19.523 16 14C16 11.9 16.6 9.9 17.7 8.3C17.2 8.1 16.6 8 16 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <path d="M24 10L25.5 8L27 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="27" cy="7" r="1" fill="currentColor"/>
        <circle cx="30" cy="11" r="1" fill="currentColor"/>
        <path d="M28 13L29.5 11.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: "Digestion",
    url: "/collections/digestion-oils",
    icon: (
      <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 10C15 10 13 11 13 14C13 17 15 18 15 21C15 24 13 25 13 28" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
        <path d="M19 10C19 10 21 11.5 21 14C21 16.5 19 17.5 19 20C19 22.5 21 23.5 21 26C21 27.5 20 28 19 28" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
        <path d="M23 12C23 12 24.5 13 24.5 15.5C24.5 18 23 19 23 21.5C23 24 24.5 25 24.5 27" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
        <ellipse cx="19" cy="9" rx="5" ry="2" stroke="currentColor" strokeWidth="1.6" fill="none"/>
      </svg>
    ),
  },
  {
    label: "Joint Pain",
    url: "/collections/joint-pain-oils",
    icon: (
      <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 10C14 10 12 13 14 17L19 19L24 17C26 13 24 10 24 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <path d="M14 28C14 28 12 25 14 21L19 19L24 21C26 25 24 28 24 28" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <circle cx="19" cy="19" r="2.5" stroke="currentColor" strokeWidth="1.6" fill="none"/>
        <path d="M11 19H16M22 19H27" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeDasharray="1.5 1.5"/>
      </svg>
    ),
  },
  {
    label: "Stress & Anxiety",
    url: "/collections/stress-relief",
    icon: (
      <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="19" cy="17" r="7" stroke="currentColor" strokeWidth="1.8" fill="none"/>
        <path d="M19 10V8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M19 14V17L21 19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 26L15 29M22 26L23 29" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M15 29H23" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        <circle cx="19" cy="17" r="1.2" fill="currentColor"/>
      </svg>
    ),
  },
  {
    label: "Low Immunity",
    url: "/collections/immunity-boosters",
    icon: (
      <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 8L27 11.5V19C27 23.5 23.5 27.5 19 29C14.5 27.5 11 23.5 11 19V11.5L19 8Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" fill="none"/>
        <path d="M15.5 19L17.5 21L22.5 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M19 8V29" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" opacity="0.3"/>
      </svg>
    ),
  },
  {
    label: "Hormonal Imbalance",
    url: "/collections/hormonal-balance",
    icon: (
      <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="19" cy="16" r="6" stroke="currentColor" strokeWidth="1.8" fill="none"/>
        <path d="M19 22V28" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M16 26H22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M24.2 11.8L26.5 9.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M26.5 9.5H29M26.5 9.5V12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: "Muscle Stiffness",
    url: "/collections/muscle-stiffness",
    icon: (
      <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 10C22 10 26 11 26 15C26 17.5 24.5 18.5 24.5 18.5L27 22C27 22 28.5 21 28.5 19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <path d="M22 10C22 10 20 9 18.5 10C17 11 17 13 17 13L14 15C14 15 12 14 12 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <path d="M17 13C17 13 16 16 17.5 18C19 20 21.5 19.5 22.5 21C23.5 22.5 23 25 21 26C19 27 17 25.5 16 24C15 22.5 15.5 20 14 19C12.5 18 11 19 11 19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="none" fill="none"/>
      </svg>
    ),
  },
];

export default function ConcernSection() {
  const handleNavigation = (url) => {
    if (url) {
      window.location.href = url;
    }
  };

  return (
    <>
      <style>{`
        /* Dynamic CSS scrollbar removal across engines */
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        /* Smoothly apply the radial gradient reflection effect on hover */
        .concern-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.15) 0%, transparent 75%);
          pointer-events: none;
          border-radius: inherit;
          opacity: 0;
          transition: opacity 0.30s ease;
        }
        .concern-card:hover::before {
          opacity: 1;
        }
      `}</style>

      <section
        className="relative overflow-hidden py-8 pb-4 md:pb-4 md:py-10"
        style={{ backgroundColor: "var(--new-bg-color, #f2eafa)" }}
      >
        {/* ── Corner botanical — top left ── */}
        <svg
          className="pointer-events-none absolute -left-14 -top-10 h-[280px] w-[280px] opacity-[0.18]"
          viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M20 260 C20 260 60 200 140 180 C200 165 240 120 260 60" stroke="#5d27aa" strokeWidth="2" fill="none" opacity="0.4"/>
          <path d="M0 200 C40 180 80 160 100 120 C120 80 110 40 140 20" stroke="#5d27aa" strokeWidth="1.5" fill="none" opacity="0.3"/>
          <ellipse cx="80" cy="200" rx="55" ry="30" transform="rotate(-30 80 200)" fill="#5d27aa" opacity="0.12"/>
          <ellipse cx="50" cy="230" rx="45" ry="22" transform="rotate(-50 50 230)" fill="#5d27aa" opacity="0.10"/>
          <ellipse cx="130" cy="155" rx="50" ry="24" transform="rotate(-20 130 155)" fill="#5d27aa" opacity="0.09"/>
          <ellipse cx="170" cy="110" rx="40" ry="20" transform="rotate(-15 170 110)" fill="#5d27aa" opacity="0.07"/>
          <circle cx="40" cy="210" r="18" fill="#df8804" opacity="0.08"/>
          <circle cx="100" cy="170" r="12" fill="#5d27aa" opacity="0.08"/>
        </svg>

        {/* ── Corner botanical — bottom right ── */}
        <svg
          className="pointer-events-none absolute -bottom-10 -right-14 h-[260px] w-[260px] rotate-180 opacity-[0.14]"
          viewBox="0 0 260 260" fill="none" xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M20 240 C20 240 60 180 130 160 C185 145 220 105 240 50" stroke="#5d27aa" strokeWidth="2" fill="none" opacity="0.4"/>
          <ellipse cx="75" cy="185" rx="52" ry="28" transform="rotate(-30 75 185)" fill="#5d27aa" opacity="0.12"/>
          <ellipse cx="45" cy="215" rx="42" ry="20" transform="rotate(-50 45 215)" fill="#5d27aa" opacity="0.10"/>
          <ellipse cx="120" cy="140" rx="46" ry="22" transform="rotate(-20 120 140)" fill="#5d27aa" opacity="0.09"/>
          <circle cx="35" cy="195" r="16" fill="#df8804" opacity="0.08"/>
          <circle cx="90" cy="155" r="11" fill="#5d27aa" opacity="0.08"/>
        </svg>

        {/* ── Content Container ── */}
        <div className="relative z-10 mx-auto max-w-[1240px] px-4 sm:px-6 md:px-8">

          {/* Section header */}
          <div className="mb-10 text-center">
            <p className="mb-3 text-[11px] sm:text-[12px] font-extrabold uppercase tracking-[0.28em] text-[var(--new-heading-text)]">
              Find the right oil for your concern
            </p>

            <h2
              className="text-[24px] font-semibold leading-tight text-[var(--color-black)] sm:text-[28px] md:text-[34px]"
              style={{ fontFamily: "var(--font-new-1)" }}
            >
              Choose Your{" "}
              <span
                className="font-medium text-[var(--new-purple-color)] text-[26px] sm:text-[30px] md:text-[36px]"
                style={{ fontFamily: "var(--font-new-2)", fontStyle: "italic" }}
              >
                Concern
              </span>
            </h2>

            {/* Gold ornament */}
            <div
              className="mt-4 flex justify-center"
              style={{ color: "var(--new-accent-color, #df8804)" }}
            >
              <svg width="72" height="14" viewBox="0 0 72 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="0" y1="7" x2="28" y2="7" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
                <path d="M32 7 L35 4 L36 2 L37 4 L40 7 L37 10 L36 12 L35 10 Z" fill="currentColor" opacity="0.9"/>
                <circle cx="30" cy="7" r="1.5" fill="currentColor" opacity="0.6"/>
                <circle cx="42" cy="7" r="1.5" fill="currentColor" opacity="0.6"/>
                <line x1="44" y1="7" x2="72" y2="7" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
              </svg>
            </div>
          </div>

          {/* Cards Track Wrapper */}
          <div className="no-scrollbar w-full overflow-x-auto pb-4 pt-2 sm:overflow-visible">
            <div className="flex w-max gap-3 px-1 sm:grid sm:w-full sm:grid-cols-3 sm:gap-4 sm:px-0 md:grid-cols-4 lg:flex lg:flex-nowrap lg:justify-between">
              {CONCERNS.map((item, i) => {
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleNavigation(item.url)}
                    className="concern-card relative flex flex-col items-center justify-center gap-3 overflow-hidden rounded-[16px] p-4 transition-all duration-300 select-none w-[135px] min-h-[120px] sm:w-auto sm:min-h-[130px] lg:w-full lg:flex-1 bg-white border border-[rgba(170,164,184,0.24)] shadow-[0_2px_8px_rgba(93,39,170,0.04)] group hover:scale-[1.02] hover:-translate-y-1 hover:border-[var(--new-primary-color)] hover:bg-[var(--new-primary-color)] hover:shadow-[0_10px_24px_rgba(53,16,95,0.22)]"
                  >
                    {/* Icon */}
                    <span
                      className="flex items-center justify-center transition-colors duration-200 transform scale-95 sm:scale-105 text-[var(--new-purple-color)] group-hover:text-white"
                    >
                      {item.icon}
                    </span>

                    {/* Label */}
                    <span
                      className="text-center text-[12px] sm:text-[13px] font-bold leading-tight transition-colors duration-200 break-words max-w-full text-[var(--new-heading-text)] group-hover:text-white"
                      style={{ fontFamily: "var(--font-new-1)" }}
                    >
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}