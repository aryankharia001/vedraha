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
  "Skin Care", "Makeup", "Hair Care",
  "Fragrances", "Nail Care", "Body Care",
];

const LeafIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-[#bd9137]">
    <path d="M20.7 3.9C13 4.2 7.9 7.1 5.5 12.8c.9-.5 1.9-.8 3.1-.9 2.7-.2 5.1.7 7.4 2.1-2.5.2-4.9.7-7.2 1.8-1.8.9-3.2 2.2-4.2 3.9 3.9-.7 7.3-2.1 10-4.1 3.6-2.7 5.7-6.6 6.1-11.7Z" />
  </svg>
);

// `lang` defaults to "en" — MainRouter passes it based on the URL prefix
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
      setActiveSlide((current) => (current - 1 + slides.length) % slides.length);
    }
  };

  return (
    <>
      {/* lang prop flows into header — controls nav links, button text, modal copy */}
      {/* <NabhiHeader/> */}

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

            <div className="mx-auto w-full max-w-[1440px] relative">
              {/* Slide Strip */}
              <div
                className="flex transition-transform duration-700 ease-in-out will-change-transform"
                style={{ transform: `translateX(-${activeSlide * 100}%)` }}
              >
                {slides.map((slide, index) => (
                  <div key={index} className="relative w-full min-w-full h-[600px]">
                    <img
                      src={slide.image}
                      alt={`Slide ${index + 1}`}
                      className="absolute inset-0 w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-black/10" />
                  </div>
                ))}
              </div>

              {/* Floating badge — Fast Delivery */}
              <div
                className="absolute left-8 top-[30%] z-30 hidden items-center gap-3 rounded-2xl px-5 py-3.5 text-[12px] font-extrabold text-slate-800 sm:flex animate-floating-badge-1"
                style={{ background: "rgba(255,255,255,0.97)", boxShadow: "0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.10)", border: "1.5px solid rgba(255,255,255,0.9)", backdropFilter: "blur(12px)" }}
              >
                <span
                  style={{ background: "var(--primary-color)", boxShadow: "0 4px 12px rgba(24,75,36,0.35)" }}
                  className="grid h-9 w-9 place-items-center rounded-xl"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-white">
                    <path d="M3 7h11v8H3V7Zm12 3h3.2l2.8 3v2h-2a3 3 0 0 0-6 0h-1V9h3v1Z" />
                  </svg>
                </span>
                <div className="flex flex-col leading-tight">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">We Offer</span>
                  <span>Fast Delivery</span>
                </div>
              </div>

              {/* Floating badge — Secure Payment */}
              <div
                className="absolute bottom-24 right-8 z-30 hidden items-center gap-3 rounded-2xl px-5 py-3.5 text-[12px] font-extrabold text-slate-800 sm:flex animate-floating-badge-2"
                style={{ background: "rgba(255,255,255,0.97)", boxShadow: "0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.10)", border: "1.5px solid rgba(255,255,255,0.9)", backdropFilter: "blur(12px)" }}
              >
                <span
                  style={{ background: "var(--primary-color)", boxShadow: "0 4px 12px rgba(24,75,36,0.35)" }}
                  className="grid h-9 w-9 place-items-center rounded-xl"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-white">
                    <path d="M4 6h16a2 2 0 0 1 2 2v1H2V8a2 2 0 0 1 2-2Zm-2 5h20v5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-5Zm4 3v2h6v-2H6Z" />
                  </svg>
                </span>
                <div className="flex flex-col leading-tight">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">100% Safe</span>
                  <span>Secure Payment</span>
                </div>
              </div>

              {/* Prev / Next + Dots */}
              <div className="absolute bottom-5 left-1/2 z-40 flex -translate-x-1/2 items-center gap-3 rounded-2xl bg-white/95 backdrop-blur-md p-2.5 shadow-xl shadow-slate-200/50 border border-slate-100/50">
                <button
                  type="button"
                  onClick={() => changeSlide("prev")}
                  style={{ background: "var(--primary-color)" }}
                  className="grid h-10 w-10 place-items-center rounded-xl text-lg font-bold text-white shadow-lg transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
                  aria-label="Previous slide"
                >&lt;</button>
                <div className="flex items-center gap-2">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setActiveSlide(index)}
                      className={`h-3 rounded-full transition-all duration-300 ${
                        activeSlide === index
                          ? "w-10 bg-gradient-to-r from-[#C08A3E] to-[#d4a55a]"
                          : "w-3 bg-slate-300 hover:bg-slate-400"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => changeSlide("next")}
                  style={{ background: "var(--primary-color)" }}
                  className="grid h-10 w-10 place-items-center rounded-xl text-lg font-bold text-white shadow-lg transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
                  aria-label="Next slide"
                >&gt;</button>
              </div>
            </div>
          </section>

          {/* Marquee 1 */}
          <div
            style={{ background: "linear-gradient(135deg, var(--primary-color) 0%, #1a5c2c 100%)" }}
            className="relative overflow-hidden py-3 text-white z-10"
          >
            <div className="beauty-marquee-track flex w-max items-center gap-12 relative z-10">
              {marqueeLoop.map((item, index) => (
                <div key={`${item}-${index}`} className="flex min-w-max items-center gap-12 text-base font-bold tracking-wide sm:text-lg">
                  <span>{item}</span>
                  <LeafIcon />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <CategorySection />
      <BestSellers />

      {/* Marquee 2 */}
      <div
        style={{ background: "linear-gradient(135deg, var(--primary-color) 0%, #1a5c2c 100%)" }}
        className="relative overflow-hidden py-3 text-white z-10"
      >
        <div className="beauty-marquee-track flex w-max items-center gap-12 relative z-10">
          {marqueeLoop.map((item, index) => (
            <div key={`${item}-${index}`} className="flex min-w-max items-center gap-12 text-base font-bold tracking-wide sm:text-lg">
              <span>{item}</span>
              <LeafIcon />
            </div>
          ))}
        </div>
      </div>

      <TestimonialCarousel />
      <FAQSection />
      <Footer />
    </>
  );
};

export default Home;