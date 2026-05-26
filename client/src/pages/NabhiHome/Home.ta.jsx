import React, { useEffect, useState } from 'react'
import NabhiHeader from '../../components/NabhiHeader'
import CategorySection from './components/CategorySection'

const slides = [
  {
    eyebrow: 'நம்பிக்கையுடன் மின்னுங்கள், நம்பிக்கையுடன் வாங்குங்கள்',
    title: 'உங்கள் இறுதி',
    highlight: 'அழகு மற்றும் காஸ்மெடிக்ஸ் ஹப்',
    description:
      'பிரீமியம் ஸ்கின்கேர், மேக்அப், ஹேர்கேர் மற்றும் ஃப்ராகிரன்ஸ் ஆகியவற்றின் விரிவான தொகுப்பைக் கண்டறியுங்கள்.',
    image:
      'https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=sleep1.webp&version_id=null',
    badge: 'அழகு ஷாப்',
  },
  {
    eyebrow: 'நன்மை பயக்கும் பராமரிப்பு, இயற்கையான மின்னல்',
    title: 'பிரீமியம் ஸ்கின்',
    highlight: 'கேர் எசென்ஷியல்ஸ்',
    description:
      'நம்பிக்கையான மின்னலைத் தரும் மென்மையான வழக்கம், புதிய சூத்திரங்கள் மற்றும் தினசரி அவசியங்களைக் கண்டறியுங்கள்.',
    image:
      'https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=menstrual1.webp&version_id=null',
    badge: 'ஸ்கின் கேர்',
  },
  {
    eyebrow: 'நம்பகமான தயாரிப்புகள், விரைவான விநியோகம்',
    title: 'நவீன மேக்அப்',
    highlight: 'ஒவ்வொரு நாளும்',
    description:
      'பாதுகாப்பான செக்கவுட் மற்றும் எளிதான விநியோகத்துடன் அழகு பிரியாணிகள், காஸ்மெடிக்ஸ் மற்றும் செல்ஃப்-கேர் வாங்குங்கள்.',
    image:
      'https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=shilajitcare3.webp&version_id=null',
    badge: 'சிறந்த தேர்வுகள்',
  },
]

const marqueeItems = ['ஸ்கின் கேர்', 'மேக்அப்', 'ஹேர் கேர்', 'ஃப்ராகிரன்ஸ்', 'நெய்ல் கேர்', 'பாடி கேர்']

const LeafIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-[#bd9137]">
    <path d="M20.7 3.9C13 4.2 7.9 7.1 5.5 12.8c.9-.5 1.9-.8 3.1-.9 2.7-.2 5.1.7 7.4 2.1-2.5.2-4.9.7-7.2 1.8-1.8.9-3.2 2.2-4.2 3.9 3.9-.7 7.3-2.1 10-4.1 3.6-2.7 5.7-6.6 6.1-11.7Z" />
  </svg>
)

const DotPattern = ({ className = '' }) => (
  <div className={`pointer-events-none grid grid-cols-8 gap-2 opacity-40 ${className}`}>
    {Array.from({ length: 40 }).map((_, index) => (
      <span key={index} className="h-2 w-2 rounded-full bg-slate-300" />
    ))}
  </div>
)

const Home = () => {
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length)
    }, 4500)

    return () => window.clearInterval(interval)
  }, [])

  const slide = slides[activeSlide]
  const marqueeLoop = [...marqueeItems, ...marqueeItems, ...marqueeItems]

  const changeSlide = (direction) => {
    setActiveSlide((current) => {
      if (direction === 'next') return (current + 1) % slides.length
      return (current - 1 + slides.length) % slides.length
    })
  }

  return (
    <>
      <NabhiHeader />

      <main className="bg-[#f7f7f5]">
        <section className="mx-auto w-full max-w-[1240px] overflow-hidden bg-[#f7f7f5]">
          <style>
            {`
              @keyframes beauty-marquee {
                from { transform: translateX(0); }
                to { transform: translateX(-33.333%); }
              }

              .beauty-marquee-track {
                animation: beauty-marquee 20s linear infinite;
              }

              .beauty-marquee-track:hover {
                animation-play-state: paused;
              }
            `}
          </style>

          <div className="relative overflow-hidden">
            <DotPattern className="absolute left-1/2 top-0 hidden -translate-y-6 md:grid" />
            <DotPattern className="absolute bottom-10 left-14 hidden md:grid" />

            <div className="relative grid min-h-[570px] items-center px-5 pb-16 pt-10 sm:px-8 md:px-12 lg:grid-cols-[0.95fr_1.05fr] lg:px-[100px] lg:pb-6 lg:pt-5">
              <div className="relative z-20 mx-auto max-w-[520px] text-center lg:mx-0 lg:text-left">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-semibold text-[#202124] shadow-sm">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-[#edf4e8]">
                    <svg
                      style={{ fill: "var(--primary-color)" }}
                      viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
                      <path d="M3 7h11v8H3V7Zm12 3h3.2l2.8 3v2h-2a3 3 0 0 0-6 0h-1V9h3v1Zm-9 8a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm10 0a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                    </svg>
                  </span>
                  {slide.eyebrow}
                </div>

                <h1 className="text-[38px] font-extrabold leading-[1.14] tracking-normal text-[#202124] sm:text-5xl lg:text-[56px]">
                  {slide.title}{' '}
                  <span className="text-[#bd9137]">{slide.highlight}</span>
                </h1>

                <p className="mx-auto mt-5 max-w-[430px] text-sm leading-6 text-slate-500 lg:mx-0">
                  {slide.description}
                </p>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-6 lg:justify-start">
                  <a
                    href="#"
                    style={{backgroundColor:"var(--primary-color)"}}
                    className="inline-flex items-center gap-3 rounded-full px-8 py-4 text-sm font-semibold text-white transition hover:bg-[#11391a]"
                  >
                    இப்போது வாங்குங்கள்
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-none stroke-current stroke-2">
                      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                  <a href="#" className="text-sm font-semibold text-[#202124] underline underline-offset-4">
                    அனைத்து தயாரிப்புகளையும் காணுங்கள்
                  </a>
                </div>
              </div>

              <div className="relative z-10 mt-8 min-h-[390px] lg:mt-0 lg:min-h-[570px]">
                <img
                  src={slide.image}
                  alt={slide.highlight}
                  className="absolute bottom-0 left-1/2 z-10 h-[380px] w-[310px] -translate-x-1/2 rounded-t-[170px] object-cover object-top sm:h-[450px] sm:w-[370px] lg:h-[570px] lg:w-[430px]"
                />

                <div style={{backgroundColor:"var(--primary-color)"}} className="absolute right-4 top-2 z-20 grid h-20 w-20 place-items-center rounded-full p-2 text-center text-[9px] font-bold uppercase tracking-[0.16em] text-white shadow-xl sm:right-12 sm:top-9 sm:h-24 sm:w-24">
                  <span className="grid h-full w-full place-items-center rounded-full border border-dashed border-[#d5b260]">
                    {slide.badge}
                  </span>
                </div>

                <div className="absolute left-0 top-[45%] z-30 hidden items-center gap-2 rounded-full bg-white px-3 py-2 text-[11px] font-semibold text-slate-700 shadow-lg sm:flex">
                  <span
                    style={{backgroundColor:"var(--primary-color)"}}
                    className="grid h-7 w-7 place-items-center rounded-full">
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-white">
                      <path d="M3 7h11v8H3V7Zm12 3h3.2l2.8 3v2h-2a3 3 0 0 0-6 0h-1V9h3v1Z" />
                    </svg>
                  </span>
                  வேகமான விநியோகம்
                </div>

                <div className="absolute bottom-24 right-0 z-30 hidden items-center gap-2 rounded-full bg-white px-3 py-2 text-[11px] font-semibold text-slate-700 shadow-lg sm:flex">
                  <span style={{backgroundColor:"var(--primary-color)"}} className="grid h-7 w-7 place-items-center rounded-full">
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-white">
                      <path d="M4 6h16a2 2 0 0 1 2 2v1H2V8a2 2 0 0 1 2-2Zm-2 5h20v5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-5Zm4 3v2h6v-2H6Z" />
                    </svg>
                  </span>
                  பாதுகாப்பான பணம் செலுத்துதல்
                </div>

                <div className="absolute bottom-5 left-1/2 z-40 flex -translate-x-1/2 items-center gap-3 rounded-full bg-white/95 p-2 shadow-lg">
                  <button
                    type="button"
                    onClick={() => changeSlide('prev')}
                    style={{backgroundColor:"var(--primary-color)"}}
                    className="grid h-9 w-9 place-items-center rounded-full text-lg font-bold text-white transition hover:bg-[#11391a]"
                    aria-label="முந்தைய ஸ்லைடு"
                  >
                    &lt;
                  </button>

                  <div className="flex items-center gap-2">
                    {slides.map((item, index) => (
                      <button
                        key={item.highlight}
                        type="button"
                        onClick={() => setActiveSlide(index)}
                        className={`h-2.5 rounded-full transition-all ${
                          activeSlide === index ? 'w-8 bg-[#bd9137]' : 'w-2.5 bg-slate-300'
                        }`}
                        aria-label={`ஸ்லைடு ${index + 1}க்கு செல்லுங்கள்`}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => changeSlide('next')}
                    style={{backgroundColor:"var(--primary-color)"}}
                    className="grid h-9 w-9 place-items-center rounded-full text-lg font-bold text-white transition hover:bg-[#11391a]"
                    aria-label="அடுத்த ஸ்லைடு"
                  >
                    &gt;
                  </button>
                </div>
              </div>
            </div>
          </div>

        </section>
        <div style={{backgroundColor:"var(--primary-color)"}} className="overflow-hidden py-4 text-white">
            <div className="beauty-marquee-track flex w-max items-center gap-10">
              {marqueeLoop.map((item, index) => (
                <div key={`${item}-${index}`} className="flex min-w-max items-center gap-10 text-base font-bold sm:text-lg">
                  <span>{item}</span>
                  <LeafIcon />
                </div>
              ))}
            </div>
          </div>
      </main>

      <CategorySection/>
    </>
  )
}

export default Home
