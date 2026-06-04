import React from "react";

export default function SectionHeader(props) {
  // HIGHLIGHT: Destructured themeColor alongside your existing props
  const { subtitle, heading, headingHighlight, headingSuffix, themeColor } = props;

  // HIGHLIGHT: Fallback check to preserve the original purple if themeColor isn't provided
  const highlightColor = themeColor || "var(--new-purple-color)";

  return (
    <div className="mb-12 flex flex-col items-center justify-center text-center">
      {/* Subtitle */}
      {subtitle && (
        <p
          className="mb-2 text-[11px] font-extrabold uppercase tracking-[0.28em] text-[var(--new-heading-text)] sm:text-[12px]"
          style={{ fontFamily: "var(--font-new-1)", fontWeight: "900" }}
        >
          {subtitle}
        </p>
      )}

      {/* Main Title Heading */}
      <h2
        className="text-[24px] font-semibold leading-tight text-[var(--color-black)] sm:text-[28px] md:text-[34px]"
        style={{ fontFamily: "var(--font-new-1)" }}
      >
        {heading}{" "}
        {headingHighlight && (
          <span
            className="font-medium text-[26px] sm:text-[30px] md:text-[36px] italic"
            style={{ 
              fontFamily: "var(--font-new-2)",
              color: highlightColor // HIGHLIGHT: Replaced static text color variable with dynamic theme evaluation
            }}
          >
            {headingHighlight}
          </span>
        )}
        {headingSuffix && ` ${headingSuffix}`}
      </h2>

      {/* Golden Center Accent Crest Split Divider */}
      <div className="mt-3 flex items-center justify-center gap-2">
        <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-[var(--new-accent-color)]" />
        <span className="text-[var(--new-accent-color)] text-xs" aria-hidden="true">
          ✿
        </span>
        <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-[var(--new-accent-color)]" />
      </div>
    </div>
  );
}