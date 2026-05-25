/**
 * BelowFoldSections.jsx  — sharedEnglish/BelowFoldSections.jsx
 *
 * All below-fold marketing sections, now driven entirely by props.
 * Each section is rendered only when its data is passed in.
 * Import and use inside ProductPage.jsx.
 */

import React, { useState } from "react";
import { UpiStack } from "./ui";

// ─── Reusable Buy Button ──────────────────────────────────────────────────────
function BuyNowBtn({ onClick, upiIcons }) {
  return (
    <button onClick={onClick} className="p-0 border-0 rounded-2xl cursor-pointer bg-transparent outline-none" style={{ WebkitTapHighlightColor: "transparent" }}>
      <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl px-4 py-3.5 flex items-center justify-center gap-2">
          <UpiStack icons={upiIcons} />
          <span className="text-base font-extrabold text-white">ఇప్పుడే కొనండి</span>
        </div>
      </div>
    </button>
  );
}

// ─── Carousel helper ──────────────────────────────────────────────────────────
function Carousel({ items, isMobile }) {
  const [index, setIndex] = useState(0);
  const prev = () => setIndex((p) => (p - 1 + items.length) % items.length);
  const next = () => setIndex((p) => (p + 1) % items.length);

  if (!items?.length) return null;

  return isMobile ? (
    <div className="relative w-full">
      <div className="overflow-hidden rounded-2xl">
        <div className="flex transition-transform duration-400" style={{ transform: `translateX(-${index * 100}%)` }}>
          {items.map((item, i) => <img key={i} src={item.url} alt="" className="w-full flex-shrink-0 object-cover" loading="lazy" />)}
        </div>
      </div>
      <button onClick={prev} className="absolute top-1/2 left-2.5 -translate-y-1/2 bg-black text-white border-0 rounded-full w-8 h-8 cursor-pointer text-lg">‹</button>
      <button onClick={next} className="absolute top-1/2 right-2.5 -translate-y-1/2 bg-black text-white border-0 rounded-full w-8 h-8 cursor-pointer text-lg">›</button>
    </div>
  ) : (
    <div className={`grid gap-5`} style={{ gridTemplateColumns: `repeat(${items.length}, 1fr)` }}>
      {items.map((item, i) => (
        <div key={i} className="rounded-2xl overflow-hidden">
          <img src={item.url} alt="" className="w-full h-full object-cover" loading="lazy" />
        </div>
      ))}
    </div>
  );
}

// ─── HOW TO USE ───────────────────────────────────────────────────────────────
export function HowToUseSection({ isMobile, images, themeColor }) {
  if (!images?.length) return null;
  return (
    <div className="w-full py-10 px-5 bg-white">
      <h2 className="text-center text-3xl font-bold mb-5 leading-tight tracking-tight" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        How to Use
      </h2>
      <Carousel items={images} isMobile={isMobile} />
    </div>
  );
}

// ─── BLOAT-FREE / FEATURE SECTION (text + video) ─────────────────────────────
export function BloatFreeSection({ data, onBuyNow, upiIcons }) {
  if (!data) return null;
  return (
    <div className="bg-[#f5f4ef]">
      <div className="max-w-[1100px] mx-auto px-5">
        <div className="py-13 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4 leading-tight tracking-tight" style={{ fontFamily: "'DM Sans', sans-serif" }}>{data.title}</h2>
            {data.body1 && <p className="text-gray-500 text-base leading-loose mb-3.5">{data.body1}</p>}
            {data.body2 && <p className="text-gray-500 text-base leading-loose">{data.body2}</p>}
            <div className="mt-5"><BuyNowBtn onClick={onBuyNow} upiIcons={upiIcons} /></div>
          </div>
          <div className="rounded-2xl overflow-hidden aspect-square border border-gray-200">
            {data.videoSrc
              ? <video src={data.videoSrc} autoPlay loop muted playsInline className="w-full h-full object-cover" />
              : data.imageSrc && <img src={data.imageSrc} alt={data.title} className="w-full h-full object-cover" loading="lazy" />
            }
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── OIL/PRODUCT BENEFITS CAROUSEL ───────────────────────────────────────────
export function OilBenefitsSection({ isMobile, images, title = "One Product, Many Benefits" }) {
  if (!images?.length) return null;
  return (
    <div className="w-full mt-5 bg-white">
      <h2 className="text-center text-3xl font-bold mb-5 leading-tight tracking-tight" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        {title}
      </h2>
      <Carousel items={images} isMobile={isMobile} />
    </div>
  );
}

// ─── BALANCE / FEATURE VIDEO SECTION ─────────────────────────────────────────
export function BalanceVideoSection({ data, onBuyNow, upiIcons }) {
  const [muted, setMuted] = useState(true);
  const vRef = React.useRef(null);

  if (!data) return null;
  return (
    <div className="max-w-[1100px] mx-auto px-5">
      <div className="py-13 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="rounded-2xl overflow-hidden border border-gray-200 relative bg-[#f5f4ef]" style={{ aspectRatio: "16/20" }}>
          {data.videoSrc && data.videoSrc !== false
            ? <video src={data.videoSrc} autoPlay loop muted playsInline className="w-full h-full object-cover" />
            : data.imageSrc && <img src={data.imageSrc} alt={data.title} className="w-full h-full object-cover" loading="lazy" />
          }
          {data.videoSrc ? <button
            onClick={() => setMuted((p) => !p)}
            className="absolute bottom-3 right-3 z-10 bg-black/55 border-0 rounded-full w-9 h-9 flex items-center justify-center cursor-pointer backdrop-blur-sm"
          >
            {muted
              ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" /></svg>
              : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><path d="M15.54 8.46a5 5 0 0 1 0 7.07" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14" /></svg>
            }
          </button> : <></>}
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-4 leading-tight tracking-tight" style={{ fontFamily: "'DM Sans', sans-serif" }}>{data.title}</h2>
          {data.body1 && <p className="text-gray-500 text-base leading-loose mb-3.5" dangerouslySetInnerHTML={{ __html: data.body1 }} />}
          {data.body2 && <p className="text-gray-500 text-base leading-loose">{data.body2}</p>}
          <div className="mt-5"><BuyNowBtn onClick={onBuyNow} upiIcons={upiIcons} /></div>
        </div>
      </div>
    </div>
  );
}

// ─── HERO BANNER (stats strip) ────────────────────────────────────────────────
export function HeroBannerSection({ data }) {
  if (!data) return null;
  return (
    <div className="bg-black text-white py-13 px-5 text-center">
      <div className="max-w-[1100px] mx-auto">
        <h2 className="text-4xl font-bold mb-3.5 tracking-tight" style={{ fontFamily: "'DM Sans', sans-serif" }}>{data.title}</h2>
        {data.body && <p className="text-base leading-loose max-w-[660px] mx-auto mb-8 opacity-90">{data.body}</p>}
        <div className="flex gap-8 justify-center flex-wrap mt-8">
          {data.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold" style={{ fontFamily: "'DM Sans', sans-serif" }}>{stat.num}</div>
              <div className="text-sm opacity-75 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── RITUAL / HOW IT WORKS ────────────────────────────────────────────────────
export function RitualFeaturesSection({ data }) {
  if (!data) return null;
  return (
    <div id="ritual" className="bg-white">
      <div className="max-w-[1100px] mx-auto px-5">
        <div className="py-13">
          <h2 className="text-center text-3xl font-bold mb-2.5 tracking-tight leading-tight" style={{ fontFamily: "'DM Sans', sans-serif" }}>{data.title}</h2>
          {data.subtitle && <p className="text-center text-gray-500 text-base max-w-[600px] mx-auto mb-9 leading-loose">{data.subtitle}</p>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {data.items.map((r) => (
              <div key={r.title} className="benefit-card">
                <div className="mb-3">{r.icon}</div>
                <h3 className="text-lg font-bold text-[#2d5a27] m-0 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>{r.title}</h3>
                <p className="text-gray-500 text-sm leading-loose m-0">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── WHY US ───────────────────────────────────────────────────────────────────
export function WhyUsSection({ data }) {
  if (!data) return null;
  return (
    <div id="about" className="w-full bg-[#f5f4ef]">
      <div className="max-w-[1100px] mx-auto px-5">
        <div className="py-13">
          <h2 className="text-center text-3xl font-bold mb-2.5 tracking-tight leading-tight" style={{ fontFamily: "'DM Sans', sans-serif" }}>{data.title}</h2>
          {data.subtitle && <p className="text-center text-gray-500 text-base max-w-[600px] mx-auto mb-9 leading-loose">{data.subtitle}</p>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {data.items.map((b) => (
              <div key={b.title} className="benefit-card">
                <div className="benefit-icon">{b.icon}</div>
                <h3 className="text-lg font-bold m-0 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>{b.title}</h3>
                <p className="text-gray-500 text-sm leading-loose m-0">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── GREEN MARQUEE ────────────────────────────────────────────────────────────
export function GreenMarqueeSection({ items, themeColor = "#2d5a27" }) {
  if (!items?.length) return null;
  return (
    <div className="text-white py-4 overflow-hidden whitespace-nowrap text-sm font-bold tracking-widest" style={{ background: themeColor }}>
      {[0, 1].map((k) => (
        <div key={k} className="inline-block" style={{ animation: "marquee 14s linear infinite" }}>
          {items.map((item, i) => (
            <span key={i} className="mr-12 inline-flex items-center gap-2.5">
              {item.icon} {item.text}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

// ─── DEFAULT EXPORT: all sections driven by props ─────────────────────────────
export default function BelowFoldSections({
  isMobile,
  themeColor,
  upiIcons,
  onBuyNow,
  howToUseImages,
  benefitsCarouselImages,
  bloatSection,
  balanceSection,
  heroBannerSection,
  ritualSection,
  whyUsSection,
  greenMarqueeItems,
}) {
  return (
    <>
      <HowToUseSection isMobile={isMobile} images={howToUseImages} themeColor={themeColor} />
      <BloatFreeSection data={bloatSection} onBuyNow={onBuyNow} upiIcons={upiIcons} />
      <OilBenefitsSection isMobile={isMobile} images={benefitsCarouselImages} />
      <BalanceVideoSection data={balanceSection} onBuyNow={onBuyNow} upiIcons={upiIcons} />
      <HeroBannerSection data={heroBannerSection} />
      <RitualFeaturesSection data={ritualSection} />
      <GreenMarqueeSection items={greenMarqueeItems} themeColor={themeColor} />
      <WhyUsSection data={whyUsSection} />
    </>
  );
}