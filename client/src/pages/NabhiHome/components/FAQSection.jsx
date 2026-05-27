import React, { useState } from 'react';

// Fully dynamic data schema for the accordions
const faqData = [
  {
    id: "prod-offer",
    question: "What types of products do you offer?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip."
  },
  {
    id: "discounts",
    question: "Do you offer any discounts or promotions?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut labore..."
  },
  {
    id: "feedback",
    question: "How can I provide feedback about my experience?",
    answer: "We love hearing from our community! You can submit feedback directly through our contact forms, product review segments, or email our support staff directly."
  },
  {
    id: "payments",
    question: "What payment methods do you accept?",
    answer: "We support all major credit cards, debit cards, PayPal, and flexible localized financing partners secure at your direct point of checkout."
  },
  {
    id: "support",
    question: "Do you offer customer support?",
    answer: "Yes, our dedicated support channels operate around the clock via live chat widgets, ticket logs, or priority phone queues to keep your mind completely at ease."
  },
  {
    id: "tracking",
    question: "How do I track my order?",
    answer: "Once shipped, an automated tracking sequence link will be dispatched directly to your designated checkout email address to monitor milestones live."
  }
];

// Fully dynamic data schema for the feature highlight banners at the bottom
const highlightsData = [
  {
    id: 1,
    title: "Free Shipping",
    subtitle: "Free shipping for order above $50",
    icon: (
      <svg className="w-6 h-6 stroke-[var(--color-primary,#184b24)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    )
  },
  {
    id: 2,
    title: "Flexible Payment",
    subtitle: "Multiple secure payment options",
    icon: (
      <svg className="w-6 h-6 stroke-[var(--color-primary,#184b24)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    )
  },
  {
    id: 3,
    title: "24×7 Support",
    subtitle: "We support online all days.",
    icon: (
      <svg className="w-6 h-6 stroke-[var(--color-primary,#184b24)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    )
  }
];

export default function FAQSection() {
  const [openId, setOpenId] = useState("discounts");

  const toggleFAQ = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section 
      className="w-full"
      style={{ backgroundColor: 'var(--color-off-white, #f7f7f5)', boxShadow: 'inset 0 12px 12px -10px rgba(24,75,36,0.3)'}}
    >
      
      <div className='max-w-[1240px] mx-auto px-6 py-16 select-none'>
      {/* --- Section Title Header --- */}
<div className="flex flex-col items-center text-center mb-12 relative">
  <span className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--color-primary-tint)' }}>
    FAQs
  </span>
  <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
    <span style={{ color: 'var(--color-heading)' }}>Frequently </span>
    <span className="bg-gradient-to-r from-[#C08A3E] to-[#d4a55a] bg-clip-text text-transparent">
      Asked Questions
    </span>
  </h2>
  <div className="mt-4 mx-auto w-20 h-1 bg-gradient-to-r from-[#184b24] to-[#C08A3E] rounded-full" />
</div>

      {/* --- Core Content Grid: Accordion & CTA Sidebar Box --- */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start mb-16 md:mb-20">
        
        {/* Left Column: List Layout of Accordions */}
        <div className="space-y-4 w-full">
          {faqData.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-2xl overflow-hidden transition-all duration-300"
                style={{
                  backgroundColor: isOpen ? 'var(--color-primary, #184b24)' : 'var(--color-white, #ffffff)',
                  boxShadow: isOpen ? 'var(--shadow-card, 0 4px 20px rgba(0,0,0,0.06))' : '0 2px 8px rgba(0,0,0,0.02)'
                }}
              >
                {/* Header Interactive Trigger Button */}
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left font-bold text-sm md:text-base transition-colors duration-300 focus:outline-none"
                  style={{
                    color: isOpen ? 'var(--color-white, #ffffff)' : 'var(--color-heading,#111827)'
                  }}
                >
                  <span className="pr-4 tracking-tight">{faq.question}</span>
                  <span className="text-xl md:text-2xl font-light leading-none">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                {/* Animated Body Container */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p 
                      className="px-6 pb-6 text-xs md:text-sm leading-relaxed max-w-3xl font-normal"
                      style={{
                        color: isOpen ? 'rgba(255, 255, 255, 0.85)' : 'var(--color-body, #202124)'
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
          style={{ backgroundColor: 'var(--color-primary-dark, #11391a)' }}
        >
          {/* Conversational Chat Icon Block */}
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center mb-6 relative shadow-sm"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
          >
            <svg className="w-8 h-8 fill-none stroke-white" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span 
              className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs"
              style={{ backgroundColor: 'var(--color-gold, #C08A3E)' }}
            >
              💬
            </span>
          </div>

          <h3 className="text-lg font-bold tracking-tight mb-2">
            You have different questions?
          </h3>
          
          <p className="text-xs text-slate-300 leading-relaxed mb-8 max-w-[220px]">
            Our team will answer all your questions. We ensure a quick response.
          </p>

          <a
            href="#contact"
            className="w-full max-w-[180px] bg-white font-bold text-xs py-3.5 px-4 rounded-full shadow-sm transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] text-center"
            style={{ color: 'var(--color-heading, #111827)' }}
          >
            Contact Us
          </a>
        </div>

      </div>

      {/* --- Bottom Row Horizontal Highlights Lineup --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-slate-200/60">
        {highlightsData.map((highlight) => (
          <div key={highlight.id} className="flex items-center gap-4 group">
            {/* Flexible Graphic Frame Wrapper */}
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-110"
              style={{ backgroundColor: 'var(--color-white, #ffffff)' }}
            >
              {highlight.icon}
            </div>
            
            {/* Informational Metadata Stack */}
            <div>
              <h4 className="font-bold text-sm text-[var(--color-heading,#111827)] mb-0.5">
                {highlight.title}
              </h4>
              <p className="text-xs text-[var(--color-muted,#6B7280)] font-medium">
                {highlight.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
      </div>

    </section>
  );
}