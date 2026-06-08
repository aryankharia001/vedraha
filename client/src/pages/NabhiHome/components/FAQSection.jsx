import React, { useState } from "react";
import SectionHeader from "./SectionHeader";
import { Link } from "react-router-dom";


// Fully dynamic data schema for the accordions
const faqData = [
  {
    id: "prod-offer",
    question: "What types of products does Vedraha offer?",
    answer:
      "Vedraha specializes in premium, 100% natural Ayurvedic Nabhi (naval) oils. Our targeted formulations are designed to support various wellness needs, including menstrual discomfort relief, deep sleep promotion, hair care, skin radiance, and overall vitality.",
  },
  {
    id: "how-it-works",
    question: "How does Nabhi (naval) oil therapy work?",
    answer:
      "According to Ayurveda, the Nabhi (naval) is the focal center of the body's nervous system. Applying organic botanical oils to the naval allows nutrients to be absorbed directly into the body's pathway, restoring dosha balances and stimulating deep, holistic healing.",
  },
  {
    id: "usage-instructions",
    question: "How do I apply Vedraha Nabhi oils?",
    answer:
      "Put 2–3 drops of the specific Vedraha oil directly into your belly button before bedtime. Gently massage in a circular, clockwise motion around the naval for a minute to aid absorption. Leave it overnight for best results.",
  },
  {
    id: "safety-ingredients",
    question: "Are your oils safe and completely chemical-free?",
    answer:
      "Yes, absolutely. All Vedraha products are crafted using 100% pure, therapeutic-grade Ayurvedic herbs and cold-pressed carrier oils. They are completely free from synthetic fragrances, parabens, silicones, and mineral oils.",
  },
  {
    id: "discounts",
    question: "Do you offer any discounts or promotions?",
    answer:
      "Yes! We frequently run seasonal promotions and offer exclusive discounts on bundle purchases. Keep an eye out for our dynamic sale badges across the product page, or subscribe to our newsletter for exclusive community offers.",
  },
  {
    id: "tracking",
    question: "How do I track my order?",
    answer:
      "Once your order is processed, an automated tracking sequence link will be sent directly to your registered email address and phone number so you can monitor your wellness delivery milestones live.",
  },
];

export default function FAQSection({ themeColor, bgMode = "default" }) {
  const [openId, setOpenId] = useState("discounts");

  const toggleFAQ = (id) => {
    setOpenId(openId === id ? null : id);
  };

  // HIGHLIGHT: Dynamic evaluation of the color tokens based on incoming themeColor prop
  // Evaluate if themeColor exists first, otherwise use the CSS variable
  const activeBgColor = themeColor
    ? `${themeColor}22`
    : "var(--new-bg-color, #f2eafa)";
  const primaryThemeColor = themeColor || "var(--new-purple-color, #7b2bec)";
  const purpleThemeColor = themeColor || "var(--new-purple-color, #7b2bec)";

  return (
    <section
    id="faqs"
      className="w-full"
      style={{
        backgroundColor: activeBgColor,
      }}
    >
      <div className="max-w-[1240px] mx-auto px-6 py-16 select-none">
        {/* --- Section Title Header --- */}
        <div className="w-full flex flex-col items-center justify-center text-center mb-4">
          <SectionHeader
            subtitle="Faqs"
            heading="Frequently"
            headingHighlight="Asked Questions"
            themeColor={themeColor}
          />
        </div>

        {/* --- Core Content Grid: Accordion & CTA Sidebar Box --- */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start">
          {/* Left Column: List Layout of Accordions */}
          <div className="space-y-4 w-full">
            {faqData.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="rounded-2xl overflow-hidden transition-all duration-300"
                  style={{
                    fontFamily: "var(--font-new-1)",
                    backgroundColor: isOpen
                      ? primaryThemeColor // HIGHLIGHT: Replaced static variable with the evaluated dynamic primary color
                      : "var(--color-white, #ffffff)",
                    boxShadow: isOpen
                      ? "var(--shadow-card, 0 4px 20px rgba(0,0,0,0.06))"
                      : "0 2px 8px rgba(0,0,0,0.02)",
                  }}
                >
                  {/* Header Interactive Trigger Button */}
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left font-bold text-sm md:text-base transition-colors duration-300 focus:outline-none"
                    style={{
                      color: isOpen
                        ? "var(--color-white, #ffffff)"
                        : "var(--color-heading,#111827)",
                    }}
                  >
                    <span className="pr-4 tracking-tight">{faq.question}</span>
                    <span className="text-xl md:text-2xl font-light leading-none">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  {/* Animated Body Container */}
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p
                        className="px-6 pb-6 text-xs md:text-sm leading-relaxed max-w-3xl font-normal"
                        style={{
                          color: isOpen
                            ? "rgba(255, 255, 255, 0.85)"
                            : "var(--color-body, #202124)",
                        }}
                      >
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: CTA Sidebar Panel Info Box */}
          <div
            className="rounded-3xl p-8 text-center flex flex-col items-center justify-center min-h-[340px] text-white w-full shadow-md"
            style={{
              backgroundColor: purpleThemeColor,
              fontFamily: "var(--font-new-1)",
            }} // HIGHLIGHT: Updated sidebar box background with dynamic purple color evaluation
          >
            {/* Conversational Chat Icon Block */}
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mb-6 relative shadow-sm"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.08)" }}
            >
              <svg
                className="w-8 h-8 fill-none stroke-white"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <span
                className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs"
                style={{ backgroundColor: "var(--color-gold, #C08A3E)" }}
              >
                💬
              </span>
            </div>

            <h3 className="text-lg font-bold tracking-tight mb-2">
              You have different questions?
            </h3>

            <p className="text-xs text-[rgba(255, 255, 255, 0.85)] leading-relaxed mb-8 max-w-[220px]">
              Our team will answer all your questions. We ensure a quick
              response.
            </p>

            <Link
              to="/products/nabhi-contact-en"
              className="w-full max-w-[180px] bg-white font-bold text-xs py-3.5 px-4 rounded-full shadow-sm transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] text-center"
              style={{ color: "var(--color-heading, #111827)" }}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
