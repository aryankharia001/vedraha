import React, { useEffect, useState, useRef } from "react";
import NabhiHeader from "../../components/NabhiHeader";
import Footer from "../../components/Footer";
import CategorySection from "./components/CategorySection";
import BestSellers from "./components/BestSellers";
import TestimonialCarousel from "./components/TestimonialCarousel";
import FAQSection from "./components/FAQSection";
import UspBar from "./components/UspBar.jsx";
import SingleBestSeller from "./components/SingleBestSeller";
import HowItWorks from "./components/HowItWorks";
import Ingredients from "./components/Ingredients";
import NewsLetter from "./components/NewsLetter";
import HeroSection from "./components/HeroSection.jsx";
import ConcernSection from "./components/ConcernSection.jsx";

const marqueeItems = [
  {
    text: "100% Ayurvedic",
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18M12 3a9 9 0 110 18 9 9 0 010-18z" />
      </svg>
    )
  },
  {
    text: "Made with Authentic Herbs",
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.7 3.9C13 4.2 7.9 7.1 5.5 12.8c.9-.5 1.9-.8 3.1-.9 2.7-.2 5.1.7 7.4 2.1-2.5.2-4.9.7-7.2 1.8-1.8.9-3.2 2.2-4.2 3.9 3.9-.7 7.3-2.1 10-4.1 3.6-2.7 5.7-6.6 6.1-11.7Z" />
      </svg>
    )
  },
  {
    text: "No Mineral Oil / No Chemicals",
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
      </svg>
    )
  },
  {
    text: "Cruelty Free",
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    )
  },
  {
    text: "Free Shipping on Orders ₹999+",
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
      </svg>
    )
  }
];

const Home = ({ lang = "en" }) => {
  // Creating a robust loop to prevent visual clipping gaps during high-resolution infinite passes
  const marqueeLoop = [...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems];

  return (
    <>
      {/* ── Marquee CSS Engine ── */}
      <style>{`
        @keyframes structuralMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.3333%); }
        }
        .beauty-marquee-track {
          display: flex;
          width: max-content;
          animation: structuralMarquee 28s linear infinite;
        }
        /* Pauses animation when user hovers over it for clear scannability */
        .beauty-marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <HeroSection/>

      <ConcernSection/>

      <SingleBestSeller/>

      <BestSellers />

      {/* ── Dynamic Infinite Marquee Bar ── */}
      <div className="w-full overflow-hidden select-none">
        <div
          style={{ background: "var(--new-primary-color)" }}
          className="relative w-full overflow-hidden py-3 text-white"
        >
          <div className="beauty-marquee-track relative z-10 flex items-center">
            {marqueeLoop.map((item, index) => (
              <div
                key={`${item.text}-${index}`}
                className="flex min-w-max items-center"
              >
                {/* Item Content Wrapper */}
                <div
                  className="flex items-center gap-2 text-xs font-medium tracking-wide"
                  style={{ color: "rgba(255,255,255,0.95)" }}
                >
                  <span
                    style={{ color: "#d9a05b" }}
                    className="flex items-center shrink-0"
                  >
                    {item.icon}
                  </span>
                  <span>{item.text}</span>
                </div>

                {/* Vertical Separator Pipeline */}
                <span
                  className="mx-6 text-[10px] font-light opacity-40"
                  style={{ color: "rgba(255,255,255,0.25)" }}
                >
                  |
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <HowItWorks/>

      <Ingredients/>

      <TestimonialCarousel />

      <FAQSection />

      <NewsLetter/>
    </>
  );
};

export default Home;