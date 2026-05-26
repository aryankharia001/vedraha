import React, { useCallback, useEffect, useRef, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'

const sectionContent = {
  subtitle: 'మా కేటగిరీలు',
  headingPrefix: 'కేటగిరీ ప్రకారం ',
  headingHighlight: 'కొనుగోలు చేయండి',
}

const categories = [
  {
    id: 'skin-care',
    title: 'స్కిన్ కేర్',
    image: 'https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=sleep1.webp&version_id=null',
    href: '#',
  },
  {
    id: 'makeup',
    title: 'మేకప్',
    image: 'https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=menstrual1.webp&version_id=null',
    href: '#',
  },
  {
    id: 'hair-care',
    title: 'హెయిర్ కేర్',
    image: 'https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=shilajitcare3.webp&version_id=null',
    href: '#',
  },
  {
    id: 'fragrances',
    title: 'ఫ్రాగ్రెన్స్',
    image: 'https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=haircare1.webp&version_id=null',
    href: '#',
  },
  {
    id: 'nail-care',
    title: 'నైల్ కేర్',
    image: 'https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=eyecare2.webp&version_id=null',
    href: '#',
  },
  {
    id: 'body-care',
    title: 'బాడీ కేర్',
    image: 'https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=Gemini_Generated_Image_3y48f93y48f93y48.png.webp&version_id=null',
    href: '#',
  },
  {
    id: 'accessories',
    title: 'యాక్సెసరీస్',
    image: 'https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=3e_V1.jpg&version_id=null',
    href: '#',
  },
]

const promoCards = [
  {
    id: 'hair-promo',
    badge: '25% డిస్కౌంట్',
    headingPrefix: 'ప్రత్యేక ',
    headingHighlight: 'హెయిర్ కేర్',
    headingSuffix: ' ఆఫర్లు',
    description: 'ప్రీమియం ట్రీట్‌మెంట్ శ్రేణితో మీ జుట్టును పోషించండి మరియు బలపరంచి.',
    ctaLabel: 'కొనండి',
    ctaHref: '#',
    image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=500&q=80',
    imageAlt: 'ఆరోగ్యకరమైన జుట్టు గల మహిళ',
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
    badge: '20% డిస్కౌంట్',
    headingPrefix: 'స్కిన్‌కేర్‌పై ',
    headingHighlight: 'పెద్ద ఆదా',
    headingSuffix: '',
    description: 'అసాధారణ ధరల వద్ద CURATED స్కిన్‌కేర్ బండిల్‌తో ప్రతిరోజూ మెలుకువలుండండి.',
    ctaLabel: 'కొనండి',
    ctaHref: '#',
    image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=500&q=80',
    imageAlt: 'ఫేస్ మాస్క్ వేసుకుంటున్న మహిళ',
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

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const CategoryCard = ({ title, image, href }) => (
  <a
    href={href}
    className="flex flex-col items-center space-y-2 py-4 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C08A3E] rounded-2xl"
    aria-label={`${title}`}
  >
    <img
      src={image}
      alt={title}
      draggable="false"
      className="w-45 h-45 rounded-full object-cover shadow-[0_8px_25px_rgba(0,0,0,0.08)] group-hover:scale-105 transition duration-300 select-none"
    />
    <p className="text-lg font-medium text-[#111827] mt-2">{title}</p>
  </a>
)

const PromoCard = ({
  badge, headingPrefix, headingHighlight, headingSuffix,
  description, ctaLabel, ctaHref,
  image, imageAlt, imagePosition,
  bg, badgeBg, badgeText, headingColor, highlightColor, bodyColor,
  ctaBg, ctaHoverBg, ctaText,
}) => (
  <div
    className="relative rounded-3xl overflow-hidden h-[320px] shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition duration-300 flex items-center"
    style={{ background: bg }}
  >
    <div className="relative z-10 p-8 md:p-10 max-w-[55%]">
      <span
        className="inline-block text-xs font-semibold px-4 py-1.5 rounded-full mb-4"
        style={{ background: badgeBg, color: badgeText }}
      >
        {badge}
      </span>

      <h3 className="text-2xl font-bold leading-snug mb-3" style={{ color: headingColor }}>
        {headingPrefix}
        <span style={{ color: highlightColor }}>{headingHighlight}</span>
        {headingSuffix}
      </h3>

      <p className="text-sm mb-6" style={{ color: bodyColor }}>
        {description}
      </p>

      <a
        href={ctaHref}
        className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full transition focus:outline-none focus-visible:ring-2"
        style={{ background: ctaBg, color: ctaText }}
        onMouseEnter={e => (e.currentTarget.style.background = ctaHoverBg)}
        onMouseLeave={e => (e.currentTarget.style.background = ctaBg)}
      >
        {ctaLabel} <ArrowIcon />
      </a>
    </div>

    <img
      src={image}
      alt={imageAlt}
      className={`absolute right-0 bottom-0 h-full w-[55%] object-cover ${imagePosition}`}
      style={{
        maskImage: 'linear-gradient(to right, transparent 0%, black 30%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 30%)',
      }}
    />
  </div>
)

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
    <section className="bg-white py-20">
      <div className="max-w-[1240px] mx-auto px-4 md:px-8 lg:px-12">

        <div className="text-center mb-12">
          <p className="text-sm font-medium text-gray-500 mb-2">{content.subtitle}</p>
          <h2 className="text-4xl font-bold">
            <span className="text-[#111827]">{content.headingPrefix}</span>
            <span className="text-[#C08A3E]">{content.headingHighlight}</span>
          </h2>
        </div>

        <div className="mb-16">
          <div
            className="overflow-hidden cursor-grab active:cursor-grabbing"
            ref={emblaRef}
          >
            <div className="flex select-none">
              {categoryItems.map((cat) => (
                <div
                  key={cat.id}
                  className="flex-none w-1/2 md:w-1/3 lg:w-1/5 px-3"
                  onClick={(e) => { if (isDragging.current) e.preventDefault() }}
                >
                  <CategoryCard {...cat} />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-6" role="tablist" aria-label="క్యారోసెల్ నావిగేషన్">
            {scrollSnaps.map((_, idx) => (
              <button
                key={idx}
                role="tab"
                aria-selected={selectedIndex === idx}
                onClick={() => scrollTo(idx)}
                className={`h-2.5 rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C08A3E] ${
                  selectedIndex === idx ? 'w-8 bg-[#C08A3E]' : 'w-2.5 bg-gray-200'
                }`}
                aria-label={`స్లైడ్ ${idx + 1}కు వెళ్ళండి`}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {promoItems.map((card) => (
            <PromoCard key={card.id} {...card} />
          ))}
        </div>

      </div>
    </section>
  )
}

export default CategorySection