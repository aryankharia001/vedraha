import React, { useEffect, useState, useRef } from "react";
import NabhiHeader from "../../components/NabhiHeader";
import Footer from "../../components/Footer";
import CategorySection from "./components/CategorySection";
import BestSellers from "./components/BestSellers";
import TestimonialCarousel from "./components/TestimonialCarousel";
import FAQSection from "./components/FAQSection";
import banner1 from "../../../public/hero-img/banner-1.png";
import banner2 from "../../../public/hero-img/banner-2.png";
import banner3 from "../../../public/hero-img/banner-3.png";
import banner4 from "../../../public/hero-img/banner-4.png";
import banner5 from "../../../public/hero-img/banner-5.png";
import banner6 from "../../../public/hero-img/banner-6.png";

const slides = [
  { image: banner1 },
  { image: banner2 },
  { image: banner3 },
  { image: banner4 },
  { image: banner5 },
  { image: banner6 },
];

const marqueeItems = [
  "AYURVEDA",
  "AYURVEDA",
  "AYURVEDA",
  "AYURVEDA",
  "AYURVEDA",
  "AYURVEDA",
];

const highlightsData = [
  {
    id: 1,
    title: "Free Shipping",
    subtitle: "Free shipping for order above $50",
    icon: (
      <svg
        className="w-6 h-6 stroke-[var(--color-primary,#184b24)]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
        />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Flexible Payment",
    subtitle: "Multiple secure payment options",
    icon: (
      <svg
        className="w-6 h-6 stroke-[var(--color-primary,#184b24)]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
        />
      </svg>
    ),
  },
  {
    id: 3,
    title: "24×7 Support",
    subtitle: "We support online all days.",
    icon: (
      <svg
        className="w-6 h-6 stroke-[var(--color-primary,#184b24)]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    ),
  },
];

const LeafIcon = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className="h-5 w-5 fill-[#bd9137]"
  >
    <path d="M20.7 3.9C13 4.2 7.9 7.1 5.5 12.8c.9-.5 1.9-.8 3.1-.9 2.7-.2 5.1.7 7.4 2.1-2.5.2-4.9.7-7.2 1.8-1.8.9-3.2 2.2-4.2 3.9 3.9-.7 7.3-2.1 10-4.1 3.6-2.7 5.7-6.6 6.1-11.7Z" />
  </svg>
);

const Home = ({ lang = "en" }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const timeoutRef = useRef(null);

  const resetTimeout = () => {
    if (timeoutRef.current) window.clearInterval(timeoutRef.current);
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 5500);
    return () => resetTimeout();
  }, [activeSlide]);

  const marqueeLoop = [...marqueeItems, ...marqueeItems, ...marqueeItems];

  const changeSlide = (direction) => {
    if (direction === "next") {
      setActiveSlide((current) => (current + 1) % slides.length);
    } else {
      setActiveSlide(
        (current) => (current - 1 + slides.length) % slides.length,
      );
    }
  };

  return (
    <>
      {/* <NabhiHeader lang={lang} /> */}

      <main className="bg-gradient-to-b from-[#f7f7f5] to-[#f0f0ed]">
        <div className="relative overflow-hidden">
          {/* Hero Slider */}
          <section className="relative w-full overflow-hidden">
            <style>{`
    @keyframes beauty-marquee {
      from { transform: translateX(0); }
      to   { transform: translateX(-33.333%); }
    }
    @keyframes smooth-float {
      0%, 100% { transform: translateY(0px); }
      50%       { transform: translateY(-10px); }
    }
    @keyframes smooth-float-delayed {
      0%, 100% { transform: translateY(0px); }
      50%       { transform: translateY(-8px); }
    }
    .beauty-marquee-track { animation: beauty-marquee 25s linear infinite; }
    .beauty-marquee-track:hover { animation-play-state: paused; }
    .animate-floating-badge-1 { animation: smooth-float 4s ease-in-out infinite; }
    .animate-floating-badge-2 { animation: smooth-float-delayed 4.5s ease-in-out infinite; }
  `}</style>

            <div className="relative w-full">
              {/* Slide Strip - Full Width */}
              <div
                className="flex transition-transform duration-700 ease-in-out will-change-transform"
                style={{ transform: `translateX(-${activeSlide * 100}%)` }}
              >
                {slides.map((slide, index) => (
                  <a
                    key={index}
                    href={slide.href || "#"}
                    className="relative w-full min-w-full h-[700px] block cursor-pointer"
                  >
                    <img
                      src={slide.image}
                      alt={`Slide ${index + 1}`}
                      className="absolute inset-0 w-full h-full object-cover object-center"
                    />
                  </a>
                ))}
              </div>

              {/* Container for positioned elements - Max Width 1240px */}
              <div className="absolute inset-0 w-full max-w-[1240px] mx-auto pointer-events-none">
                {/* Glassmorphism Badge 1 — Fast Delivery */}
                <div className="absolute left-8 top-[30%] z-30 hidden items-center gap-1.5 rounded-xl px-2 py-1.5 text-[11px] font-extrabold text-slate-800 sm:flex animate-floating-badge-1 bg-white/70 border border-white/40 shadow-[0_6px_24px_0_rgba(0,0,0,0.08)] backdrop-blur-md pointer-events-auto">
                  <span
                    style={{ background: "var(--color-primary, #184b24)" }}
                    className="grid h-6 w-6 place-items-center rounded-lg shadow-[0_3px_10px_rgba(24,75,36,0.25)]"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="h-4 w-4 fill-white"
                    >
                      <path d="M3 7h11v8H3V7Zm12 3h3.2l2.8 3v2h-2a3 3 0 0 0-6 0h-1V9h3v1Z" />
                    </svg>
                  </span>
                  <div className="flex flex-col leading-tight">
                    <span className="text-[9px] font-semibold text-slate-500 uppercase tracking-widest">
                      We Offer
                    </span>
                    <span className="text-slate-900">Fast Delivery</span>
                  </div>
                </div>

                {/* Glassmorphism Badge 2 — Secure Payment */}
                <div className="absolute bottom-24 right-8 z-30 hidden items-center gap-1.5 rounded-xl px-2 py-1.5 text-[11px] font-extrabold text-slate-800 sm:flex animate-floating-badge-2 bg-white/70 border border-white/40 shadow-[0_6px_24px_0_rgba(0,0,0,0.08)] backdrop-blur-md pointer-events-auto">
                  <span
                    style={{ background: "var(--color-primary, #184b24)" }}
                    className="grid h-6 w-6 place-items-center rounded-lg shadow-[0_3px_10px_rgba(24,75,36,0.25)]"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="h-4 w-4 fill-white"
                    >
                      <path d="M4 6h16a2 2 0 0 1 2 2v1H2V8a2 2 0 0 1 2-2Zm-2 5h20v5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-5Zm4 3v2h6v-2H6Z" />
                    </svg>
                  </span>
                  <div className="flex flex-col leading-tight">
                    <span className="text-[9px] font-semibold text-slate-500 uppercase tracking-widest">
                      100% Safe
                    </span>
                    <span className="text-slate-900">Secure Payment</span>
                  </div>
                </div>

                {/* Prev / Next + Dots - Smaller Size */}
                <div className="absolute bottom-3 left-1/2 z-40 flex -translate-x-1/2 items-center gap-1.5 rounded-lg bg-white/80 backdrop-blur-md p-1 shadow-lg border border-white/40 pointer-events-auto">
                  <button
                    type="button"
                    onClick={() => changeSlide("prev")}
                    style={{ background: "var(--color-black, black)" }}
                    className="grid h-6 w-6 place-items-center rounded text-xs font-bold text-white shadow-md transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
                    aria-label="Previous slide"
                  >
                    &lt;
                  </button>

                  <div className="flex items-center gap-1">
                    {slides.map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setActiveSlide(index)}
                        className={`h-1 rounded-full transition-all duration-300 ${
                          activeSlide === index
                            ? "w-5 bg-gradient-to-r from-[#C08A3E] to-[#d4a55a]"
                            : "w-1 bg-slate-300 hover:bg-slate-400"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => changeSlide("next")}
                    style={{ background: "var(--color-black, black)" }}
                    className="grid h-6 w-6 place-items-center rounded text-xs font-bold text-white shadow-md transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
                    aria-label="Next slide"
                  >
                    &gt;
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Marquee */}
          <div
            style={{
              background: "var(--color-black)",
            }}
            className="relative overflow-hidden py-2.5 text-white z-10"
          >
            <div className="beauty-marquee-track flex w-max items-center relative z-10">
              {marqueeLoop.map((item, index) => (
                <div
                  key={`${item}-${index}`}
                  className="flex min-w-max items-center"
                >
                  <span
                    className="text-xs font-semibold tracking-[0.2em] uppercase italic"
                    style={{ color: "rgba(255,255,255,0.85)" }}
                  >
                    {item}
                  </span>
                  <span
                    className="mx-3 text-xs"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    •
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <CategorySection />
      <BestSellers />

      {/* Marquee 2 */}
      {/* <div
        style={{
          background:
            "linear-gradient(135deg, var(--color-primary, #184b24) 0%, #1a5c2c 100%)",
        }}
        className="relative overflow-hidden py-3 text-white z-10"
      >
        <div className="beauty-marquee-track flex w-max items-center gap-12 relative z-10">
          {marqueeLoop.map((item, index) => (
            <div
              key={`${item}-${index}`}
              className="flex min-w-max items-center gap-12 text-base font-bold tracking-wide sm:text-lg"
            >
              <span>{item}</span>
              <LeafIcon />
            </div>
          ))}
        </div>
      </div> */}

      {/* Marquee */}
      <div
        style={{
          background: "var(--color-black)",
        }}
        className="relative overflow-hidden py-2.5 text-white z-10"
      >
        <div className="beauty-marquee-track flex w-max items-center relative z-10">
          {marqueeLoop.map((item, index) => (
            <div
              key={`${item}-${index}`}
              className="flex min-w-max items-center"
            >
              <span
                className="text-xs font-semibold tracking-[0.2em] uppercase italic"
                style={{ color: "rgba(255,255,255,0.85)" }}
              >
                {item}
              </span>
              <span
                className="mx-3 text-xs"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                •
              </span>
            </div>
          ))}
        </div>
      </div>

      <TestimonialCarousel />
      <FAQSection />

      {/* Marquee */}
      <div
        style={{
          background: "var(--color-black)",
        }}
        className="relative overflow-hidden py-2.5 text-white z-10"
      >
        <div className="beauty-marquee-track flex w-max items-center relative z-10">
          {marqueeLoop.map((item, index) => (
            <div
              key={`${item}-${index}`}
              className="flex min-w-max items-center"
            >
              <span
                className="text-xs font-semibold tracking-[0.2em] uppercase italic"
                style={{ color: "rgba(255,255,255,0.85)" }}
              >
                {item}
              </span>
              <span
                className="mx-3 text-xs"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                •
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Highlights Section Container — Styled for clean page layout */}
      <section className="bg-white py-10 px-4 border-t border-slate-100">
        <div className="max-w-[1240px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlightsData.map((highlight) => (
              <div
                key={highlight.id}
                className="flex flex-col items-center text-center gap-4 group p-6 rounded-2xl transition-all duration-300 hover:bg-slate-50"
              >
                {/* Flexible Graphic Frame Wrapper */}
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm border border-slate-100 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: "var(--color-white, #ffffff)" }}
                >
                  {highlight.icon}
                </div>

                {/* Informational Metadata Stack */}
                <div>
                  <h4 className="font-bold text-base text-[var(--color-heading,#111827)] mb-1">
                    {highlight.title}
                  </h4>
                  <p className="text-sm text-[var(--color-muted,#6B7280)] font-medium">
                    {highlight.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
