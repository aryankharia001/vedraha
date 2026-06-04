import React from "react";

const USP_ITEMS = [
  // --- Kept top 2 original USP items ---
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
        <path d="M27 24c0-2.21-1.79-4-4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none"/>
        <circle cx="25" cy="13" r="2.5" stroke="currentColor" strokeWidth="1.6" fill="none"/>
      </svg>
    ),
  },

  // --- Replaced bottom 3 items with highlightsData ---
  {
    label: "Free Shipping",
    sub: "Free shipping for order",
    icon: (
      <svg
        width="32"
        height="32"
        className="stroke-[var(--color-primary,#184b24)]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
        //   strokeWidth={2}
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
        />
      </svg>
    ),
  },
  {
    label: "Flexible Payment",
    sub: "Secure payment options",
    icon: (
      <svg
        width="32"
        height="32"
        className="stroke-[var(--color-primary,#184b24)]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
        //   strokeWidth={2}
          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
        />
      </svg>
    ),
  },
  {
    label: "24×7 Support",
    sub: "Support online all days.",
    icon: (
      <svg
        width="32"
        height="32"
        className="stroke-[var(--color-primary,#184b24)]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
        //   strokeWidth={2}
          d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
        />
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