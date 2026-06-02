// UspBar.jsx — Placed right after the hero slider </section>
// Overlaps the bottom of the banner smoothly across all viewport breakpoints.

import React from "react";

const USP_ITEMS = [
  {
    label: "Ayurvedic",
    sub: "Science Backed",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="10" r="4" stroke="currentColor" strokeWidth="1.6" fill="none"/>
        <circle cx="9"  cy="22" r="4" stroke="currentColor" strokeWidth="1.6" fill="none"/>
        <circle cx="23" cy="22" r="4" stroke="currentColor" strokeWidth="1.6" fill="none"/>
        <line x1="16" y1="14" x2="12" y2="18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        <line x1="16" y1="14" x2="20" y2="18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: "Trusted by",
    sub: "10,000+ Families",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 20c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none"/>
        <circle cx="16" cy="10" r="3.5" stroke="currentColor" strokeWidth="1.6" fill="none"/>
        <path d="M5 24c0-2.21 1.79-4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none"/>
        <circle cx="7" cy="13" r="2.5" stroke="currentColor" strokeWidth="1.6" fill="none"/>
        <path d="M27 24c0-2.21-1.79-4-4-4" stroke="currentColor" strokeWidth="1.6" fill="none"/>
        <circle cx="25" cy="13" r="2.5" stroke="currentColor" strokeWidth="1.6" fill="none"/>
      </svg>
    ),
  },
  {
    label: "Crafted with",
    sub: "Pure Herbs",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 26 C16 26 8 20 8 13 C8 9 11.5 7 14 8 C15 8.5 15.5 9.5 16 10 C16.5 9.5 17 8.5 18 8 C20.5 7 24 9 24 13 C24 20 16 26 16 26Z" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinejoin="round"/>
        <line x1="16" y1="26" x2="16" y2="15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M16 19 C14 17 11 17 10 15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
      </svg>
    ),
  },
  {
    label: "Safe for Daily",
    sub: "Use",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 5 L26 9 L26 17 C26 22 21.5 26.5 16 28 C10.5 26.5 6 22 6 17 L6 9 Z" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinejoin="round"/>
        <path d="M11.5 16 L14.5 19 L20.5 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: "Made in India",
    sub: "with",
    heart: true,
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 10 L16 6 L26 10 L26 22 L16 26 L6 22 Z" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinejoin="round"/>
        <line x1="16" y1="6"  x2="16" y2="26" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 2"/>
        <line x1="6"  y1="16" x2="26" y2="16" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 2"/>
      </svg>
    ),
  },
];

export default function UspBar() {
  return (
    <div className="pointer-events-none relative z-20 w-full -mt-8 sm:-mt-10 md:-mt-12 px-4 sm:px-6 md:px-12">
      <div className="pointer-events-auto mx-auto max-w-[1180px] rounded-xl sm:rounded-2xl border border-[rgba(170,164,184,0.18)] bg-white p-2 sm:p-3 md:p-4 shadow-[0_4px_24px_rgba(33,18,76,0.08),0_1px_4px_rgba(33,18,76,0.04)]">
        {/* Responsive Breakpoint Layouts:
          - Base (< 480px): 2-Column Grid (Last element stretches across full span)
          - Sm (480px - 768px): 3-Column Grid
          - Md+ (> 768px): Clean Flex Row alignment with uniform dynamic spacing
        */}
        <div className="grid grid-cols-2 gap-x-2 gap-y-3 min-[480px]:grid-cols-3 md:flex md:flex-row md:items-stretch md:justify-between md:gap-0">
          {USP_ITEMS.map((item, i) => (
            <div
              key={i}
              className={`group relative flex items-center gap-2 rounded-lg p-3 transition-colors duration-200 ease-in-out hover:bg-[rgba(93,39,170,0.03)] sm:gap-3 sm:p-4 md:flex-1 md:justify-center md:rounded-none md:p-5
                ${i === USP_ITEMS.length - 1 ? "col-span-2 min-[480px]:col-span-1" : ""}
              `}
            >
              {/* Vertical border dividers for md+ viewports */}
              {i > 0 && (
                <div className="absolute left-0 top-1/4 bottom-1/4 hidden w-[1px] bg-[rgba(170,164,184,0.35)] md:block" />
              )}

              {/* Icon Frame */}
              <div className="flex h-7 w-7 shrink-0 items-center justify-center text-[var(--new-purple-color,#aaa4b8)] transition-colors duration-200 group-hover:text-[var(--new-purple-color,#5d27aa)] sm:h-9 sm:w-9 [&>svg]:h-full [&>svg]:w-full">
                {item.icon}
              </div>

              {/* Text Area */}
              <div className="flex min-w-0 flex-col gap-0.5">
                <span 
                  className="truncate text-[11px] font-bold leading-tight text-[var(--new-purple-color,#21124c)] sm:text-[12px] md:text-[13px]"
                  style={{ fontFamily: "var(--font-new-1, sans-serif)" }}
                >
                  {item.label}
                </span>
                
                <span 
                  className="flex items-center gap-1 text-[10px] font-normal leading-tight text-[var(--new-neutral-color,#aaa4b8)] sm:text-[11px] md:text-[12px]"
                  style={{ fontFamily: "var(--font-new-1, sans-serif)" }}
                >
                  {item.sub || "with"}
                  {item.heart && (
                    <span className="inline-flex shrink-0 items-center">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="#e53e3e" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 10.5S1 7 1 3.5A2.5 2.5 0 016 2.1 2.5 2.5 0 0111 3.5C11 7 6 10.5 6 10.5Z"/>
                      </svg>
                    </span>
                  )}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}