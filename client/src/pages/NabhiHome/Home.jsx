import React, { useEffect, useState, useRef } from 'react'
import NabhiHeader from '../../components/NabhiHeader'
import CategorySection from './components/CategorySection'
import BestSellers from './components/BestSellers'
import TestimonialCarousel from './components/TestimonialCarousel'
import FAQSection from './components/FAQSection'

const slides = [
  {
    eyebrow: 'Glow with Confidence, Shop with Trust',
    title: 'Your Ultimate',
    highlight: 'Beauty & Cosmetics Hub',
    description:
      'Discover our curated collection of premium beauty essentials, skincare must-haves, and cosmetics that bring out your natural radiance.',
    image:
      'https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=sleep1.webp&version_id=null',
    badge: 'Beauty Shop',
  },
  {
    eyebrow: 'Fresh Care, Natural Glow',
    title: 'Premium Skin',
    highlight: 'Care Essentials',
    description:
      'Discover gentle routines, fresh formulas, and daily essentials crafted for a confident glowing look.',
    image:
      'https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=menstrual1.webp&version_id=null',
    badge: 'Skin Care',
  },
  {
    eyebrow: 'Trusted Products, Fast Delivery',
    title: 'Modern Makeup',
    highlight: 'For Every Day',
    description:
      'Shop beauty favorites, cosmetics, fragrances, and self-care picks with secure checkout and easy delivery.',
    image:
      'https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=shilajitcare3.webp&version_id=null',
    badge: 'Top Picks',
  },
]

const marqueeItems = ['Skin Care', 'Makeup', 'Hair Care', 'Fragrances', 'Nail Care', 'Body Care']

const LeafIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-[#bd9137]">
    <path d="M20.7 3.9C13 4.2 7.9 7.1 5.5 12.8c.9-.5 1.9-.8 3.1-.9 2.7-.2 5.1.7 7.4 2.1-2.5.2-4.9.7-7.2 1.8-1.8.9-3.2 2.2-4.2 3.9 3.9-.7 7.3-2.1 10-4.1 3.6-2.7 5.7-6.6 6.1-11.7Z" />
  </svg>
)

const DotPattern = ({ className = '' }) => (
  <div className={`pointer-events-none grid grid-cols-8 gap-2 opacity-30 ${className}`}>
    {Array.from({ length: 40 }).map((_, index) => (
      <span key={index} className="h-2 w-2 rounded-full bg-slate-300" />
    ))}
  </div>
)

const GlowOrb = ({ className = '', color = 'rgba(24,75,36,0.08)' }) => (
  <div
    className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
    style={{ background: color }}
  />
)

const Home = () => {
  const [activeSlide, setActiveSlide] = useState(0)
  const timeoutRef = useRef(null)

  const resetTimeout = () => {
    if (timeoutRef.current) {
      window.clearInterval(timeoutRef.current)
    }
  }

  useEffect(() => {
    resetTimeout()
    timeoutRef.current = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length)
    }, 5500)

    return () => resetTimeout()
  }, [activeSlide])

  const marqueeLoop = [...marqueeItems, ...marqueeItems, ...marqueeItems]

  const changeSlide = (direction) => {
    if (direction === 'next') {
      setActiveSlide((current) => (current + 1) % slides.length)
    } else {
      setActiveSlide((current) => (current - 1 + slides.length) % slides.length)
    }
  }

  return (
    <>
      <NabhiHeader />

      <main className="bg-gradient-to-b from-[#f7f7f5] to-[#f0f0ed]">
        <section className="mx-auto w-full max-w-[1240px] overflow-hidden">
          <style>
            {`
              @keyframes beauty-marquee {
                from { transform: translateX(0); }
                to { transform: translateX(-33.333%); }
              }

              @keyframes smooth-float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-10px); }
              }

              @keyframes smooth-float-delayed {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-8px); }
              }

              @keyframes pulse-glow {
                0%, 100% { opacity: 0.6; transform: scale(1); }
                50% { opacity: 0.9; transform: scale(1.05); }
              }

              @keyframes shimmer {
                0% { background-position: -200% 0; }
                100% { background-position: 200% 0; }
              }

              .beauty-marquee-track {
                animation: beauty-marquee 25s linear infinite;
              }

              .beauty-marquee-track:hover {
                animation-play-state: paused;
              }

              .animate-floating-badge-1 {
                animation: smooth-float 4s ease-in-out infinite;
              }

              .animate-floating-badge-2 {
                animation: smooth-float-delayed 4.5s ease-in-out infinite;
              }

              .shimmer-effect {
                background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%);
                background-size: 200% 100%;
                animation: shimmer 3s ease-in-out infinite;
              }
            `}
          </style>

          <div className="relative overflow-hidden w-full">
            {/* Background decorative elements */}
            <GlowOrb className="w-[600px] h-[600px] -top-48 -left-48" color="rgba(24,75,36,0.05)" />
            <GlowOrb className="w-[400px] h-[400px] top-20 right-0" color="rgba(192,138,62,0.06)" />
            <DotPattern className="absolute left-1/2 top-0 hidden -translate-y-6 md:grid" />
            <DotPattern className="absolute bottom-10 left-14 hidden md:grid" />

            {/* Carousel Slider Window Wrap */}
            <div
              className="flex transition-transform duration-700 ease-in-out will-change-transform"
              style={{ transform: `translateX(-${activeSlide * 100}%)` }}
            >
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className="w-full min-w-full grid min-h-[570px] items-center px-5 pb-16 pt-10 sm:px-8 md:px-12 lg:grid-cols-[0.95fr_1.05fr] lg:px-[100px] lg:pb-6 lg:pt-5"
                >
                  {/* Left Column Content Area */}
                  <div className="relative z-20 mx-auto max-w-[520px] text-center lg:mx-0 lg:text-left">
                    {/* Eyebrow badge with shimmer effect */}
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-sm px-5 py-3.5 text-sm font-semibold text-[#202124] shadow-lg shadow-slate-200/50 border border-slate-100/50">
                      <span className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-[#edf4e8] to-[#d4ebd0]">
                        <svg
                          style={{ fill: "var(--primary-color)" }}
                          viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4"
                        >
                          <path d="M3 7h11v8H3V7Zm12 3h3.2l2.8 3v2h-2a3 3 0 0 0-6 0h-1V9h3v1Zm-9 8a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm10 0a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                        </svg>
                      </span>
                      <span className="tracking-tight">{slide.eyebrow}</span>
                    </div>

                    {/* Main heading with gradient text */}
                    <h1 className="text-[38px] font-bold leading-[1.12] tracking-tight text-[#202124] sm:text-5xl lg:text-[56px]">
                      {slide.title}{' '}
                      <span className="bg-gradient-to-r from-[#C08A3E] to-[#d4a55a] bg-clip-text text-transparent">
                        {slide.highlight}
                      </span>
                    </h1>

                    <p className="mx-auto mt-5 max-w-[430px] text-sm leading-6 text-slate-500 lg:mx-0">
                      {slide.description}
                    </p>

                    {/* CTA buttons with enhanced styling */}
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-6 lg:justify-start">
                      <a
                        href="#"
                        className="group relative inline-flex items-center gap-3 rounded-full px-8 py-4 text-sm font-bold text-white transition-all duration-300 hover:shadow-xl hover:shadow-[#184b24]/25 hover:-translate-y-0.5 active:translate-y-0"
                        style={{ background: "var(--primary-color)" }}
                      >
                        <span className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        Shop Now
                        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1">
                          <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </a>
                      <a href="#" className="group text-sm font-bold text-[#202124] underline underline-offset-4 transition-colors hover:text-[#184b24]">
                        View All Products
                      </a>
                    </div>
                  </div>

                  {/* Right Column Imagery Area */}
                  <div className="relative z-10 mt-8 min-h-[390px] lg:mt-0 lg:min-h-[570px] w-full">
                    {/* Product image with enhanced shadow */}
                    <img
                      src={slide.image}
                      alt={slide.highlight}
                      className="absolute bottom-0 left-1/2 z-10 h-[380px] w-[310px] -translate-x-1/2 rounded-t-[180px] object-cover object-top shadow-2xl shadow-slate-900/20 sm:h-[450px] sm:w-[370px] lg:h-[570px] lg:w-[430px]"
                      style={{
                        boxShadow: '0 40px 80px rgba(0,0,0,0.15), 0 20px 40px rgba(0,0,0,0.1)',
                      }}
                    />

                    {/* Circular Promo Tag Badge with pulse effect */}
                    <div
                      style={{ background: "var(--primary-color)" }}
                      className="absolute right-4 top-2 z-20 grid h-20 w-20 place-items-center rounded-full p-2 text-center text-[9px] font-bold uppercase tracking-[0.16em] text-white shadow-xl sm:right-12 sm:top-9 sm:h-24 sm:w-24 animate-pulse-glow"
                    >
                      <span className="grid h-full w-full place-items-center rounded-full border-2 border-dashed border-[#d5b260]/50 backdrop-blur-sm">
                        {slide.badge}
                      </span>
                    </div>

                    {/* Floating Fast Delivery Item Badge */}
                    <div className="absolute left-0 top-[35%] z-30 hidden items-center gap-2.5 rounded-2xl bg-white/95 backdrop-blur-md px-4 py-3 text-[11px] font-bold text-slate-700 shadow-xl shadow-slate-200/50 sm:flex animate-floating-badge-1 border border-slate-100/50">
                      <span
                        style={{ background: "var(--primary-color)" }}
                        className="grid h-8 w-8 place-items-center rounded-xl shadow-lg"
                      >
                        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-white">
                          <path d="M3 7h11v8H3V7Zm12 3h3.2l2.8 3v2h-2a3 3 0 0 0-6 0h-1V9h3v1Z" />
                        </svg>
                      </span>
                      Fast Delivery
                    </div>

                    {/* Floating Secure Payment Item Badge */}
                    <div className="absolute bottom-28 right-0 z-30 hidden items-center gap-2.5 rounded-2xl bg-white/95 backdrop-blur-md px-4 py-3 text-[11px] font-bold text-slate-700 shadow-xl shadow-slate-200/50 sm:flex animate-floating-badge-2 border border-slate-100/50">
                      <span
                        style={{ background: "var(--primary-color)" }}
                        className="grid h-8 w-8 place-items-center rounded-xl shadow-lg"
                      >
                        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-white">
                          <path d="M4 6h16a2 2 0 0 1 2 2v1H2V8a2 2 0 0 1 2-2Zm-2 5h20v5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-5Zm4 3v2h6v-2H6Z" />
                        </svg>
                      </span>
                      Secure Payment
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Static Centered Control Buttons Overlay */}
            <div className="absolute bottom-5 left-1/2 z-40 flex -translate-x-1/2 items-center gap-3 rounded-2xl bg-white/95 backdrop-blur-md p-2.5 shadow-xl shadow-slate-200/50 border border-slate-100/50">
              <button
                type="button"
                onClick={() => changeSlide('prev')}
                style={{ background: "var(--primary-color)" }}
                className="grid h-10 w-10 place-items-center rounded-xl text-lg font-bold text-white shadow-lg transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
                aria-label="Previous slide"
              >
                &lt;
              </button>

              <div className="flex items-center gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setActiveSlide(index)}
                    className={`h-3 rounded-full transition-all duration-300 ${
                      activeSlide === index ? 'w-10 bg-gradient-to-r from-[#C08A3E] to-[#d4a55a]' : 'w-3 bg-slate-300 hover:bg-slate-400'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => changeSlide('next')}
                style={{ background: "var(--primary-color)" }}
                className="grid h-10 w-10 place-items-center rounded-xl text-lg font-bold text-white shadow-lg transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
                aria-label="Next slide"
              >
                &gt;
              </button>
            </div>
          </div>
        </section>

        {/* Marquee Segment with gradient overlay */}
        <div style={{ background: "linear-gradient(135deg, var(--primary-color) 0%, #1a5c2c 100%)" }} className="relative overflow-hidden py-5 text-white">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48cGF0aCBkPSJNIDUwIDAgTCAwIDUwIEwgMTAwIDUwIEwgNTAgMCBaIiBmaWxsPSJ0cmFuc3BhcmVudCIvPjwvc3ZnPg==')] opacity-20" />
          <div className="beauty-marquee-track flex w-max items-center gap-12 relative z-10">
            {marqueeLoop.map((item, index) => (
              <div key={`${item}-${index}`} className="flex min-w-max items-center gap-12 text-base font-bold tracking-wide sm:text-lg">
                <span>{item}</span>
                <LeafIcon />
              </div>
            ))}
          </div>
        </div>
      </main>

      <CategorySection />
      <BestSellers />

      {/* Marquee Segment 2 */}
      <div style={{ background: "linear-gradient(135deg, var(--primary-color) 0%, #1a5c2c 100%)" }} className="relative overflow-hidden py-5 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48cGF0aCBkPSJNIDUwIDAgTCAwIDUwIEwgMTAwIDUwIEwgNTAgMCBaIiBmaWxsPSJ0cmFuc3BhcmVudCIvPjwvc3ZnPg==')] opacity-20" />
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
    </>
  )
}

export default Home