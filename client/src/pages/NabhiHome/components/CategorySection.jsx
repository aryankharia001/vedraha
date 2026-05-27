import React, { useCallback, useEffect, useRef, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'

// ─── CONTENT DATA (swap per language / CMS) ───────────────────────────────────

const sectionContent = {
  subtitle: 'Our Categories',
  headingPrefix: 'Shop By ',
  headingHighlight: 'Category',
}

const categories = [
  {
    id: 'nabhi-sleep',
    title: 'Sleep',
    image: 'https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=sleep1.webp&version_id=null',
    href: '#',
  },
  {
    id: 'nabhi-menstrual',
    title: 'Menstrual',
    image: 'https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=menstrual1.webp&version_id=null',
    href: '#',
  },
  {
    id: 'nabhi-shilajit',
    title: 'Shilajit',
    image: 'https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=shilajitcare3.webp&version_id=null',
    href: '#',
  },
  {
    id: 'nabhi-hair',
    title: 'Hair',
    image: 'https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=haircare1.webp&version_id=null',
    href: '#',
  },
  {
    id: 'nabhi-eye',
    title: 'Eye',
    image: 'https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=eyecare2.webp&version_id=null',
    href: '#',
  },
  {
    id: 'nabhi-joint',
    title: 'Joint',
    image: 'https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=Gemini_Generated_Image_3y48f93y48f93y48.png.webp&version_id=null',
    href: '#',
  },
  {
    id: 'nabhi-amrit',
    title: 'Amrit',
    image: 'https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=3e_V1.jpg&version_id=null',
    href: '#',
  },
]

const promoCards = [
  {
    id: 'hair-promo',
    badge: 'Flat 25% Discount',
    headingPrefix: 'Special ',
    headingHighlight: 'Hair Care',
    headingSuffix: ' Deals',
    description: 'Nourish and strengthen your hair with our premium range of treatments.',
    ctaLabel: 'Shop Now',
    ctaHref: '#',
    image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=500&q=80',
    imageAlt: 'Woman with healthy hair',
    imagePosition: 'object-top',
    theme: 'light',
    bg: '#F5F1EC',
    badgeBg: '#C08A3E',
    badgeText: '#ffffff',
    headingColor: '#111827',
    highlightColor: '#C08A3E',
    bodyColor: '#6B7280',
    ctaBg: 'var(--primary-color)',
    ctaHoverBg: '#183d29',
    ctaText: '#ffffff',
  },
  {
    id: 'skin-promo',
    badge: 'Flat 20% Discount',
    headingPrefix: 'Save Big on ',
    headingHighlight: 'Skincare',
    headingSuffix: '',
    description: 'Glow every day with our curated skincare bundles at unbeatable prices.',
    ctaLabel: 'Shop Now',
    ctaHref: '#',
    image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=500&q=80',
    imageAlt: 'Woman with face mask',
    imagePosition: 'object-center',
    theme: 'dark',
    bg: 'var(--primary-color)',
    badgeBg: '#2a7048',
    badgeText: '#ffffff',
    headingColor: '#ffffff',
    highlightColor: '#C08A3E',
    bodyColor: 'rgba(187,247,208,0.75)',
    ctaBg: '#ffffff',
    ctaHoverBg: '#f3f4f6',
    ctaText: 'var(--primary-color)',
  },
]

// ─── ICONS ────────────────────────────────────────────────────────────────────

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

// ─── CATEGORY CARD ────────────────────────────────────────────────────────────

const CategoryCard = ({ title, image, href }) => (
  <a
    href={href}
    className="group flex flex-col items-center py-0 md:py-6 px-3 rounded-2xl transition-all duration-300 hover:bg-white/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C08A3E]"
    aria-label={`${title}`}
  >
    <div className="relative mb-3">
      <img
        src={image}
        alt={title}
        draggable="false"
        className="w-30 h-30 md:w-44 md:h-44 rounded-full object-cover shadow-lg shadow-slate-200/50 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-slate-300/60 group-hover:scale-105 select-none"
      />
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
    <p className="text-base font-semibold text-[#111827] tracking-tight">{title}</p>
  </a>
)

// ─── PROMO CARD ───────────────────────────────────────────────────────────────

const PromoCard = ({
  badge, headingPrefix, headingHighlight, headingSuffix,
  description, ctaLabel, ctaHref,
  image, imageAlt, imagePosition,
  bg, badgeBg, badgeText, headingColor, highlightColor, bodyColor,
  ctaBg, ctaHoverBg, ctaText,
}) => (
  <div
    className="group relative overflow-hidden rounded-3xl h-[340px] transition-all duration-500 hover:-translate-y-2 flex items-center"
    style={{
      background: bg,
      boxShadow: '0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)',
    }}
  >
    {/* Gradient overlay */}
    <div
      className="absolute inset-0 opacity-30 transition-opacity duration-500 group-hover:opacity-40"
      style={{
        background: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.3) 0%, transparent 60%)',
        pointerEvents: 'none'
      }}
    />

    {/* Text content */}
    <div className="relative z-10 p-8 md:p-10 max-w-[55%]">
      <span
        className="inline-block text-xs font-bold px-4 py-1.5 rounded-full mb-4 shadow-md"
        style={{ background: badgeBg, color: badgeText }}
      >
        {badge}
      </span>

      <h3 className="text-2xl font-bold leading-snug mb-3 tracking-tight" style={{ color: headingColor }}>
        {headingPrefix}
        <span style={{ color: highlightColor }}>{headingHighlight}</span>
        {headingSuffix}
      </h3>

      <p className="text-sm mb-6 leading-relaxed" style={{ color: bodyColor }}>
        {description}
      </p>

      <a
        href={ctaHref}
        className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:shadow-lg focus:outline-none focus-visible:ring-2"
        style={{ background: ctaBg, color: ctaText }}
        onMouseEnter={e => {
          e.currentTarget.style.background = ctaHoverBg;
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = ctaBg;
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        {ctaLabel}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 transition-transform group-hover:translate-x-1">
          <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </div>

    {/* Image with fade effect */}
    <img
      src={image}
      alt={imageAlt}
      className={`absolute right-0 bottom-0 h-full w-[55%] object-cover ${imagePosition} transition-transform duration-500 group-hover:scale-105`}
      style={{
        maskImage: 'linear-gradient(to right, transparent 0%, black 35%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 35%)',
      }}
    />
  </div>
)

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

const CategorySection = ({
  content = sectionContent,
  categoryItems = categories,
  promoItems = promoCards,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    dragFree: true,
    watchDrag: true,
  })

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState([])
  const isDragging = useRef(false)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on('select', onSelect)
    emblaApi.on('pointerDown', () => { isDragging.current = false })
    emblaApi.on('scroll', () => { isDragging.current = true })
    onSelect()
  }, [emblaApi, onSelect])

  const scrollTo = useCallback((index) => emblaApi && emblaApi.scrollTo(index), [emblaApi])

  return (
    <section className="bg-gradient-to-b from-white to-[#f7f7f5] py-10">
      <div className="max-w-[1240px] mx-auto px-4 md:px-8 lg:px-12">
        {/* ── Header ── */}
        <div className="text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-[#2a7048] mb-3 font-['DM_Sans']">
            {content.subtitle}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            <span className="text-[#111827]">{content.headingPrefix}</span>
            <span className="bg-gradient-to-r from-[#C08A3E] to-[#d4a55a] bg-clip-text text-transparent">
              {content.headingHighlight}
            </span>
          </h2>
          <div className="mt-4 mx-auto w-20 h-1 bg-gradient-to-r from-[#184b24] to-[#C08A3E] rounded-full" />
        </div>

        {/* ── Category Carousel ── */}
        <div className="mb-16">
          <div
            className="overflow-hidden cursor-grab active:cursor-grabbing py-4 bg-white/50 rounded-3xl shadow-lg shadow-slate-100/50 border border-slate-100/30"
            ref={emblaRef}
          >
            <div className="flex select-none px-2">
              {categoryItems.map((cat) => (
                <div
                  key={cat.id}
                  className="flex-none w-1/2 md:w-1/3 lg:w-1/5 px-2"
                  onClick={(e) => { if (isDragging.current) e.preventDefault() }}
                >
                  <CategoryCard {...cat} />
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8" role="tablist" aria-label="Carousel navigation">
            {scrollSnaps.map((_, idx) => (
              <button
                key={idx}
                role="tab"
                aria-selected={selectedIndex === idx}
                onClick={() => scrollTo(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C08A3E] focus-visible:ring-offset-2 ${
                  selectedIndex === idx ? 'w-10 bg-gradient-to-r from-[#C08A3E] to-[#d4a55a]' : 'w-2.5 bg-slate-200 hover:bg-slate-300'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* ── Promo Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {promoItems.map((card) => (
            <PromoCard key={card.id} {...card} />
          ))}
        </div>

      </div>
    </section>
  )
}

export default CategorySection