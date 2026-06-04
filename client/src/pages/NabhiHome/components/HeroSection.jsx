import React, { useEffect, useState, useRef } from "react";
import UspBar from "./UspBar";
import banner1 from "../../../../public/hero-img/banner-1.png";
import banner2 from "../../../../public/hero-img/banner-2.png";
import banner3 from "../../../../public/hero-img/banner-3.png";
import banner4 from "../../../../public/hero-img/banner-4.png";
import banner5 from "../../../../public/hero-img/banner-5.png";

// ─────────────────────────────────────────────────────────────
//  SLIDE CONFIGURATION
// ─────────────────────────────────────────────────────────────
const slides = [
  {
    image: banner1,
    badge: "Joint & Pain Relief",
    headline: ["Move Freely.", "Live Fully."],
    headlineAccentLine: 1,
    subtext:
      "Powerful herbal blend that penetrates deep to soothe sore joints, relieve muscle tension, and restore natural mobility.",
    features: ["Eases Joint Pain", "Reduces Inflammation", "Restores Mobility"],
    cta: { label: "Explore Now", href: "/products/pain-nabhi-oil" },
    colors: {
      text:            "var(--color-white)",
      headlineAccent:  "var(--color)",
      divider:         "var(--color)",
      /* Light semi-transparent accents over dark image backdrops */
      badgeBg:         "rgba(168, 19, 19, 0.747)",
      badgeBorder:     "var(--color)",
      pillBg:          "rgba(168, 19, 19, 0.747)",
      pillBorder:      "rgba(168, 19, 19, 0.404)",
      ctaBg:           "var(--color)",
      ctaText:         "#ffffff",
      overlay:         "linear-gradient(to right,rgba(0,0,0,0.55) 0%,rgba(0,0,0,0.25) 45%,transparent 70%)",
    },
  },
  {
    image: banner2,
    badge: "Sleep & Stress Relief",
    headline: ["Sleep Better.", "Wake Refreshed."],
    headlineAccentLine: 1,
    subtext:
      "Ancient Ayurvedic Nabhi Oil — applied at the navel to calm the mind, ease anxiety & promote deep, restorative sleep.",
    features: ["Promotes Deep Sleep", "Relieves Stress & Anxiety", "Calms Mind & Body"],
    cta: { label: "Shop Now", href: "/products/sleep-nabhi-oil" },
    colors: {
      text:            "var(--color-white)",
      headlineAccent:  "var(--new-bg-color)",
      divider:         "var(--new-bg-color)",
      /* Light tint elements to stand out against purple deep settings */
      badgeBg:         "rgba(242, 234, 250, 0.15)", // Tilted using --new-bg-color
      badgeBorder:     "rgba(242, 234, 250, 0.30)",
      pillBg:          "rgba(242, 234, 250, 0.10)",
      pillBorder:      "rgba(242, 234, 250, 0.22)",
      ctaBg:           "var(--new-primary-color)",
      ctaText:         "#ffffff",
      overlay:         "linear-gradient(to right,rgba(255,255,255,0.45) 0%,rgba(255,255,255,0.15) 45%,transparent 70%)",
    },
  },
  {
    image: banner3,
    badge: "Digestion & Detox Wellness",
    headline: ["Happy Gut,", "Happier You."],
    headlineAccentLine: 1,
    subtext:
      "Revive your digestive fire with our traditional Nabhi therapy oil — targeting the root of gut health through the navel chakra.",
    features: ["Improves Digestion", "Reduces Bloating", "Balances Gut Flora"],
    cta: { label: "Discover Now", href: "/products/gut-nabhi-oil" },
    colors: {
      text:            "var(--color-black)",
      headlineAccent:  "var(--new-accent-color)",
      divider:         "var(--new-accent-color)",
      /* Dark tint settings using black theme variables */
      badgeBg:         "rgba(33, 18, 76, 0.06)", // Subtle tint of --new-heading-text
      badgeBorder:     "rgba(33, 18, 76, 0.15)",
      pillBg:          "rgba(33, 18, 76, 0.04)",
      pillBorder:      "rgba(33, 18, 76, 0.12)",
      ctaBg:           "var(--new-accent-color)",
      ctaText:         "#ffffff",
      overlay:         "linear-gradient(to right,rgba(0,0,0,0.55) 0%,rgba(0,0,0,0.25) 45%,transparent 70%)",
    },
  },
  {
    image: banner4,
    badge: "Vision & Eyecare Care",
    headline: ["Clear Vision.", "Bright Eyes."],
    headlineAccentLine: 1,
    subtext:
      "Time-tested Ayurvedic formulation applied through the navel to soothe dry eyes, reduce strain, and nourish optical nerves naturally.",
    features: ["Soothes Eye Strain", "Reduces Dryness", "Nourishes From Within"],
    cta: { label: "Nourish Eyes", href: "/products/eyecare-nabhi-oil" },
    colors: {
      text:            "var(--new-heading-text)",
      headlineAccent:  "#2b66a0",
      divider:         "#2b66a0",
      /* Custom deep ocean blue theme transparency properties */
      badgeBg:         "rgba(43, 102, 160, 0.08)", // Tinted using #2b66a0
      badgeBorder:     "rgba(43, 102, 160, 0.22)",
      pillBg:          "rgba(43, 102, 160, 0.05)",
      pillBorder:      "rgba(43, 102, 160, 0.15)",
      ctaBg:           "#2b66a0",
      ctaText:         "#ffffff",
      overlay:         "linear-gradient(to right,rgba(255,255,255,0.5) 0%,rgba(255,255,255,0.15) 45%,transparent 70%)",
    },
  },
  {
    image: banner5,
    badge: "Immunity & Vitality",
    headline: ["Strengthen Within.", "Thrive Every Day."],
    headlineAccentLine: 1,
    subtext:
      "A powerful Ayurvedic immunity booster — applied at the navel to fortify your body's natural defence and energy systems.",
    features: ["Boosts Immunity", "Increases Energy", "Holistic Wellness"],
    cta: { label: "Build Immunity", href: "/products/immunity-nabhi-oil" },
    colors: {
      text:            "var(--color-black)",
      headlineAccent:  "#2b66a0",
      divider:         "#2b66a0",
      /* Clean, scannable deep corporate blue accent contrasts */
      badgeBg:         "rgba(43, 102, 160, 0.08)",
      badgeBorder:     "rgba(43, 102, 160, 0.22)",
      pillBg:          "rgba(43, 102, 160, 0.05)",
      pillBorder:      "rgba(43, 102, 160, 0.15)",
      ctaBg:           "#2b66a0",
      ctaText:         "#ffffff",
      overlay:         "linear-gradient(to right,rgba(0,0,0,0.55) 0%,rgba(0,0,0,0.25) 45%,transparent 70%)",
    },
  },
];

// ── Feature icons ─────────────────────────────────────────────
const MoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 shrink-0" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
  </svg>
);
const LeafIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 shrink-0" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.7 3.9C13 4.2 7.9 7.1 5.5 12.8c.9-.5 1.9-.8 3.1-.9 2.7-.2 5.1.7 7.4 2.1-2.5.2-4.9.7-7.2 1.8-1.8.9-3.2 2.2-4.2 3.9 3.9-.7 7.3-2.1 10-4.1 3.6-2.7 5.7-6.6 6.1-11.7Z" />
  </svg>
);
const MeditateIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 shrink-0" stroke="currentColor" strokeWidth={2}>
    <circle cx="12" cy="5" r="2" />
    <path strokeLinecap="round" d="M8 21c1-4 6-7 8-9M7 14c1-2 3-3 5-3s4 1 5 3" />
  </svg>
);
const featureIcons = [<MoonIcon />, <LeafIcon />, <MeditateIcon />];

// ─────────────────────────────────────────────────────────────
//  HERO SECTION
// ─────────────────────────────────────────────────────────────
const HeroSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [animKey, setAnimKey]         = useState(0);
  const intervalRef                   = useRef(null);

  const clearTimer = () => { if (intervalRef.current) clearInterval(intervalRef.current); };

  useEffect(() => {
    clearTimer();
    intervalRef.current = setInterval(() => {
      setActiveSlide((c) => (c + 1) % slides.length);
      setAnimKey((k) => k + 1);
    }, 5500);
    return clearTimer;
  }, [activeSlide]);

  const goTo = (i) => { setActiveSlide(i); setAnimKey((k) => k + 1); };
  const prev  = () => goTo((activeSlide - 1 + slides.length) % slides.length);
  const next  = () => goTo((activeSlide + 1) % slides.length);

  const { colors } = slides[activeSlide];
  const slide      = slides[activeSlide];

  return (
    <div className="relative bg-[var(--new-bg-color)]">
    <section className="relative w-full overflow-hidden h-[clamp(520px,70vw,800px)]">

      <style>{`
        @keyframes heroFadeUp {
          from { opacity:0; transform:translateY(20px); }
          to   { opacity:1; transform:translateY(0);    }
        }
        @keyframes heroBadgePop {
          from { opacity:0; transform:scale(0.88) translateY(8px); }
          to   { opacity:1; transform:scale(1) translateY(0);      }
        }
        .anim-badge { animation: heroBadgePop 0.5s cubic-bezier(0.34,1.56,0.64,1) both; }
        .anim-1 { animation: heroFadeUp 0.55s ease both; animation-delay: 0.08s; }
        .anim-2 { animation: heroFadeUp 0.55s ease both; animation-delay: 0.18s; }
        .anim-3 { animation: heroFadeUp 0.55s ease both; animation-delay: 0.18s; } /* Slipped down with text */
        .anim-4 { animation: heroFadeUp 0.55s ease both; animation-delay: 0.28s; }
        .anim-5 { animation: heroFadeUp 0.55s ease both; animation-delay: 0.38s; }
        .anim-6 { animation: heroFadeUp 0.55s ease both; animation-delay: 0.48s; }
      `}</style>

      {/* ── Image strip ── */}
      <div
        className="flex h-full will-change-transform transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.18,1)]"
        style={{ transform: `translateX(-${activeSlide * 100}%)` }}
      >
        {slides.map((s, i) => (
          <div key={i} className="relative min-w-full w-full h-full shrink-0">
            <img
              src={s.image}
              alt={`Slide ${i + 1}`}
              className="absolute inset-0 w-full h-full object-cover object-top"
              loading={i === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </div>

      {/* ── Gradient scrim ── */}
      <div className="absolute inset-0 pointer-events-none" />

      {/* ── Text content ── */}
      <div
        key={animKey}
        className="absolute inset-0 flex items-center pointer-events-none"
        style={{ color: colors.text }}
      >
        <div className="w-full max-w-[1240px] mx-auto px-6 md:px-10 lg:px-12">
          <div className="max-w-[540px] flex flex-col">

            {/* Badge */}
            <div className="anim-badge pointer-events-auto inline-flex mb-4 sm:mb-5">
              <span
                className="text-[0.62rem] font-bold tracking-[0.18em] uppercase px-3 py-1.5 rounded-sm backdrop-blur-md"
                style={{
                  color:       colors.text,
                  background:  colors.badgeBg,
                  border:      `1px solid ${colors.badgeBorder}`,
                  fontFamily:  "var(--font-new-1)",
                }}
              >
                ✦&nbsp;&nbsp;{slide.badge}
              </span>
            </div>

            {/* Headline Group with Multi-Font Separation */}
            <h1
              className="leading-[1.1] tracking-tight mb-3"
              style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)" }}
            >
              {/* Part 1: Primary Heading Font */}
              <span 
                className="block font-bold anim-1"
                style={{ 
                  fontFamily: "var(--font-new-1)",
                  color: slide.headlineAccentLine === 0 ? colors.headlineAccent : colors.text
                }}
              >
                {slide.headline[0]}
              </span>
              
              {/* Part 2: Accent Elegant/Italic Font Style */}
              <em 
                className="block font-medium italic not-implemented anim-2"
                style={{ 
                  fontFamily: "var(--font-new-2)",
                  color: slide.headlineAccentLine === 1 ? colors.headlineAccent : colors.text,
                  fontSize: "1.05em" // Slightly boosted to balance out display weight differences typical of italic scripts
                }}
              >
                {slide.headline[1]}
              </em>
            </h1>

            {/* Divider */}
            <div
              className="anim-3 mb-4 h-0.5 w-12 rounded-full"
              style={{ background: colors.divider }}
            />

            {/* Subtext */}
            <p
              className="anim-4 leading-relaxed opacity-90 mb-5 max-w-[400px] text-sm sm:text-[0.9rem]"
              style={{
                color:      colors.text,
                fontFamily: "var(--font-new-1)",
              }}
            >
              {slide.subtext}
            </p>

            {/* Feature pills */}
            <div
              className="anim-5 hidden sm:flex flex-wrap gap-2 mb-6 pointer-events-auto"
              style={{ color: colors.text }}
            >
              {slide.features.map((feat, fi) => (
                <span
                  key={fi}
                  className="flex items-center gap-1.5 text-[0.7rem] font-semibold tracking-wide px-2.5 py-1.5 rounded-full whitespace-nowrap backdrop-blur-md"
                  style={{
                    background: colors.pillBg,
                    border:     `1px solid ${colors.pillBorder}`,
                    fontFamily: "var(--font-new-1)",
                  }}
                >
                  {featureIcons[fi % featureIcons.length]}
                  {feat}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="anim-6 pointer-events-auto">
              <a
                href={slide.cta.href}
                className="inline-block text-[0.78rem] font-bold uppercase tracking-widest px-7 py-3 rounded-sm transition-all duration-200 hover:brightness-110 hover:-translate-y-0.5"
                style={{
                  background:  colors.ctaBg,
                  color:       colors.ctaText,
                  fontFamily:  "var(--font-new-1)",
                }}
              >
                {slide.cta.label} →
              </a>
            </div>

          </div>
        </div>
      </div>

      {/* ── Dots + Arrows ── */}
      <div className="absolute bottom-20 inset-x-0 max-w-[1240px] mx-auto px-6 md:px-10 flex items-center gap-3 pointer-events-auto">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous slide"
          className="grid place-items-center w-9 h-9 rounded-full border border-white/50 bg-white/10 backdrop-blur-sm text-white text-lg leading-none transition-all duration-200 hover:bg-white/25 hover:border-white/80"
        >
          ‹
        </button>

        <div className="flex items-center gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width:      i === activeSlide ? "24px" : "8px",
                background: i === activeSlide ? colors.divider : "rgba(255,255,255,0.4)",
              }}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={next}
          aria-label="Next slide"
          className="grid place-items-center w-9 h-9 rounded-full border border-white/50 bg-white/10 backdrop-blur-sm text-white text-lg leading-none transition-all duration-200 hover:bg-white/25 hover:border-white/80"
        >
          ›
        </button>
      </div>
    </section>

      <UspBar />
    </div>
  );
};

export default HeroSection;