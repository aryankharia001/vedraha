import React from "react";
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
import NewsBlogs from "./components/NewsBlogs.jsx";

// HIGHLIGHT: Import your brand new extracted component 
import MarqueeBar from "./components/MarqueeBar.jsx";

const Home = ({ lang = "en" }) => {
  return (
    <>
      <HeroSection />

      

      <ConcernSection />

      <SingleBestSeller />

      <BestSellers />

      {/* HIGHLIGHT: Replaced raw messy inline configuration blocks with clean component view tag */}
      <MarqueeBar />

      <HowItWorks />

      <Ingredients />

      <TestimonialCarousel />

      <NewsBlogs/>

      <FAQSection />

      <NewsLetter />
    </>
  );
};

export default Home;