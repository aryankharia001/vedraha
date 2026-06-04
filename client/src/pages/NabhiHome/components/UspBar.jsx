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
        <path d="M27 24c0-2.21-1.79-4-4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none"/>
        <circle cx="25" cy="13" r="2.5" stroke="currentColor" strokeWidth="1.6" fill="none"/>
      </svg>
    ),
  },
  {
    label: "Free Shipping",
    sub: "On Orders Above ₹999",
    icon: (
      <svg
        width="32"
        height="32"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
        />
      </svg>
    ),
  },
  {
    label: "Flexible Payment",
    sub: "100% Secure Checkout",
    icon: (
      <svg
        width="32"
        height="32"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
        />
      </svg>
    ),
  },
];

export default function UspBar() {
  return (
    <div className="pointer-events-none relative z-20 w-full -mt-8 sm:-mt-10 md:-mt-12 px-4 sm:px-6 lg:px-12">
      <div className="pointer-events-auto mx-auto max-w-[1200px] rounded-2xl border border-[rgba(170,164,184,0.18)] bg-white p-3 md:p-1.5 shadow-[0_4px_24px_rgba(33,18,76,0.08),0_1px_4px_rgba(33,18,76,0.04)]">
        
        {/* Responsive Layout Grid Engine:
            - Mobile (<768px): clean 2-column square grid block matching 4 elements perfectly
            - Desktop (>=768px): shifts beautifully into a single, seamless horizontal line */}
        <div className="grid grid-cols-2 gap-2 md:flex md:flex-row md:items-stretch md:justify-between md:gap-0">
          {USP_ITEMS.map((item, i) => (
            <div
              key={i}
              className="group relative flex items-center gap-3 rounded-xl p-3 transition-all duration-200 ease-in-out hover:bg-[rgba(93,39,170,0.03)] sm:p-4 md:flex-1 md:justify-center md:rounded-none md:py-4 md:px-5"
            >
              {/* Dynamic Borders - Active only on Tablet & Desktop rows */}
              {i > 0 && (
                <div className="absolute left-0 top-1/4 bottom-1/4 hidden w-[1px] bg-[rgba(170,164,184,0.25)] md:block" />
              )}

              {/* Icon Frame */}
              <div className="flex h-8 w-8 shrink-0 items-center justify-center text-[var(--new-purple-color,#5d27aa)] opacity-75 transition-all duration-200 group-hover:scale-105 group-hover:opacity-100 sm:h-9 sm:w-9 [&>svg]:h-full [&>svg]:w-full">
                {item.icon}
              </div>

              {/* Text Description Block */}
              <div className="flex min-w-0 flex-col gap-0.5">
                <span 
                  className="truncate text-[12px] font-bold leading-tight text-[var(--new-heading-text,#21124c)] lg:text-[13px]"
                  style={{ fontFamily: "var(--font-new-1, sans-serif)" }}
                >
                  {item.label}
                </span>
                
                <span 
                  className="truncate text-[10px] font-normal leading-tight text-[var(--new-neutral-color,#aaa4b8)] lg:text-[11px]"
                  style={{ fontFamily: "var(--font-new-1, sans-serif)" }}
                >
                  {item.sub}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}