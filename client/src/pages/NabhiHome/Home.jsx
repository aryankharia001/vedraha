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
  "AYURVEDA",
  "AYURVEDA",
  "AYURVEDA",
  "AYURVEDA",
  "AYURVEDA",
  "AYURVEDA",
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


  const marqueeLoop = [...marqueeItems, ...marqueeItems, ...marqueeItems];

  return (
    <>

      <HeroSection/>

      <ConcernSection/>

      <SingleBestSeller/>

      <BestSellers />

      <HowItWorks/>

      <Ingredients/>

      {/* Marquee */}
      {/* <div
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
      </div> */}

      <TestimonialCarousel />

      <FAQSection />

      <NewsLetter/>
    </>
  );
};

export default Home;
