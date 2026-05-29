import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'; 

// ═══════════════════════════════════════════════════════════════
//  DATA  (swap per language / CMS)
// ═══════════════════════════════════════════════════════════════

export const bestSellersContent = {
  subtitle:         'Our Products',
  headingPrefix:    'Our ',
  headingHighlight: 'Best Sellers',
  headingSuffix:    ' Products',
  viewAllLabel:     'View All Products',
  viewAllHref:      '#',
}

export const products = [
  {
    id: 'sleep-relief-nabhi-oil',
    category:      'nabhi-sleep',
    badge:         '50% off',
    name:          'Sleep Relief Nabhi Oil – Reduce Stress & Enjoy Deep Sleep',
    categoryLabel: 'Sleep',
    rating:        4.9,
    price:         599,
    originalPrice: 699,
    image: 'https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=sleep1.webp&version_id=null',
    hasCountdown: true,
    countdown:    { days: 5, hours: 12, minutes: 30, seconds: 25 },
    wishlist:     false,
    route:        '/products/nabhi-sleep-en',
  },
  {
    id: 'menstrual-pain-nabhi-oil',
    category:      'nabhi-menstrual',
    badge:         '35% off',
    name:          'Menstrual Pain Relief Nabhi Oil – Natural Period Pain Relief',
    categoryLabel: 'Menstrual',
    rating:        4.8,
    price:         599,
    originalPrice: 699,
    image: 'https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=menstrual1.webp&version_id=null',
    hasCountdown: false,
    wishlist:     false,
    route:        '/products/nabhi-menstrual-en',
  },
  {
    id: 'shilajit-energy-resin',
    category:      'nabhi-shilajit',
    badge:         '20% off',
    name:          'Pure Shilajit Resin – For Strength, Stamina & Energy',
    categoryLabel: 'Shilajit',
    rating:        4.7,
    price:         669,
    originalPrice: 769,
    image: 'https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=shilajitcare3.webp&version_id=null',
    hasCountdown: false,
    wishlist:     false,
    route:        '/products/nabhi-shilajit-en',
  },
  {
    id: 'hair-care-nabhi-oil',
    category:      'nabhi-hair',
    badge:         '30% off',
    name:          'Hair Care Nabhi Oil – Nourish Hair from Within',
    categoryLabel: 'Hair',
    rating:        4.6,
    price:         499,
    originalPrice: 599,
    image: 'https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=haircare1.webp&version_id=null',
    hasCountdown: false,
    wishlist:     false,
    route:        '/products/nabhi-hair-en',
  },
  {
    id: 'eye-care-nabhi-oil',
    category:      'nabhi-eye',
    badge:         '15% off',
    name:          'Eye Care Nabhi Oil – Vision Support & Eye Strain Relief',
    categoryLabel: 'Eye',
    rating:        4.5,
    price:         599,
    originalPrice: 699,
    image: 'https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=eyecare1.webp&version_id=null',
    hasCountdown: false,
    wishlist:     false,
    route:        '/products/nabhi-eye-en',
  },
  {
    id: 'joint-pain-nabhi-oil',
    category:      'nabhi-joint',
    badge:         '15% off',
    name:          'Joint Pain Remedy Nabhi Oil – Relief for Knee & Back Pain',
    categoryLabel: 'Joint',
    rating:        4.5,
    price:         549,
    originalPrice: 649,
    image: 'https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=Gemini_Generated_Image_jejzeajejzeajejz.png.webp&version_id=null',
    hasCountdown: false,
    wishlist:     false,
    route:        '/products/nabhi-joint-en',
  },
  {
    id: 'nabhi-amrit',
    category:      'nabhi-amrit',
    badge:         '15% off',
    name:          'Nabhi Amrit - Navel Oil for Digestion and Detox',
    categoryLabel: 'Amrit',
    rating:        4.5,
    price:         499,
    originalPrice: 599,
    image: 'https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=amriteng3.webp&version_id=null',
    hasCountdown: false,
    wishlist:     false,
    route:        '/products/nabhi-amrit-en',
  }
]

export const promoContent = {
  badge:            'Special Savings',
  heading:          'Summer ',
  highlight:        'Glow Deals',
  subtext:          'Get 50% off – Limited Time Offer!',
  ctaLabel:         'Shop Now',
  ctaHref:          '#',
  leftImage:        'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?auto=format&fit=crop&w=400&q=80',
  rightImage:       'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=400&q=80',
  countdownSeconds: 4 * 3600 + 14 * 60 + 48,
  countdownLabels:  ['Days', 'Hours', 'Minutes', 'Seconds'],
}

// ═══════════════════════════════════════════════════════════════
//  ICONS
// ═══════════════════════════════════════════════════════════════

const StarIcon = () => (
  <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
)

const HeartIcon = ({ filled }) => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

// ═══════════════════════════════════════════════════════════════
//  COUNTDOWN HOOK
// ═══════════════════════════════════════════════════════════════

function useCountdown(initialSeconds) {
  const [secs, setSecs] = useState(initialSeconds)
  useEffect(() => {
    if (!initialSeconds) return
    const t = setInterval(() => setSecs(s => Math.max(0, s - 1)), 1000)
    return () => clearInterval(t)
  }, [initialSeconds])
  return {
    d: Math.floor(secs / 86400),
    h: Math.floor((secs % 86400) / 3600),
    m: Math.floor((secs % 3600) / 60),
    s: secs % 60,
  }
}

// ═══════════════════════════════════════════════════════════════
//  COUNTDOWN UNIT — promo banner
// ═══════════════════════════════════════════════════════════════

const CountdownUnit = ({ value, label }) => (
  <div className="flex flex-col items-center gap-1">
    <div
      className="w-12 h-12 flex items-center justify-center rounded-xl text-lg font-extrabold tracking-tight"
      style={{
        background: 'var(--color-countdown-bg)',
        color:      'var(--color-countdown-txt)',
        boxShadow:  'inset 0 1px 0 rgba(255,255,255,0.08)',
      }}
    >
      {String(value).padStart(2, '0')}
    </div>
    <span className="text-[10px] font-medium uppercase tracking-wider" style={{ color: 'var(--color-muted)' }}>
      {label}
    </span>
  </div>
)

const Colon = () => (
  <span className="text-xl font-black pb-5" style={{ color: 'var(--color-border)' }}>:</span>
)

// ═══════════════════════════════════════════════════════════════
//  PRODUCT CARD layout
// ═══════════════════════════════════════════════════════════════

const ProductCard = ({ product }) => {
  const [wished, setWished] = useState(product.wishlist)
  const [hovered, setHovered] = useState(false)

  const totalSecs = product.hasCountdown
    ? product.countdown.days * 86400 + product.countdown.hours * 3600 + product.countdown.minutes * 60 + product.countdown.seconds
    : 0
  const { d, h, m, s } = useCountdown(totalSecs)
  const savePercent = Math.round((1 - product.price / product.originalPrice) * 100)

  return (
    <a
      href={product.route || `#`}
      className="flex flex-col rounded-2xl overflow-hidden block no-underline w-full"
      style={{
        background: 'var(--color-surface-1)',
        boxShadow:  hovered ? 'var(--shadow-card-hover)' : 'var(--shadow-card)',
        transform:  hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'var(--transition-base)',
        border:     '1px solid var(--color-border)',
        cursor:     'pointer'
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── Image ── */}
      <div className="relative overflow-hidden" style={{ height: '220px', background: 'var(--color-surface-2)' }}>
        <img
          src={product.image}
          alt={product.name}
          draggable="false"
          className="w-full h-full object-cover select-none"
          style={{
            transform:  hovered ? 'scale(1.06)' : 'scale(1)',
            transition: 'transform 420ms cubic-bezier(0.4,0,0.2,1)',
          }}
        />

        {/* Bottom depth gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.22) 0%, transparent 55%)' }}
        />

        {/* Sale badge */}
        {product.badge && (
          <span
            className="absolute top-3 left-3 text-[11px] font-bold px-2.5 py-1 rounded-full"
            style={{
              background:    'var(--color-sale-badge)',
              color:         'var(--color-sale-text)',
              boxShadow:     'var(--shadow-badge)',
              letterSpacing: '0.03em',
            }}
          >
            {product.badge}
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();   
            e.stopPropagation();  
            setWished(w => !w);
          }}
          className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center transition-all z-10"
          style={{
            background:    'rgba(255,255,255,0.90)',
            color:          wished ? 'var(--color-wishlist)' : 'var(--color-muted)',
            boxShadow:     'var(--shadow-badge)',
            backdropFilter: 'blur(4px)',
          }}
          aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <HeartIcon filled={wished} />
        </button>

        {/* Countdown overlay */}
        {product.hasCountdown && (
          <div
            className="absolute bottom-0 left-0 right-0 px-3 pb-2.5 pt-10"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.80) 0%, transparent 100%)' }}
          >
            <div className="flex items-end justify-center gap-1.5">
              {[
                { v: d, l: 'D' },
                { v: h, l: 'H' },
                { v: m, l: 'M' },
                { v: s, l: 'S' },
              ].map((unit, i, arr) => (
                <React.Fragment key={unit.l}>
                  <div className="flex flex-col items-center">
                    <span
                      className="w-9 h-9 flex items-center justify-center rounded-lg text-sm font-bold"
                      style={{ background: 'rgba(17,24,39,0.88)', color: '#fff' }}
                    >
                      {String(unit.v).padStart(2, '0')}
                    </span>
                    <span className="text-[8px] mt-0.5 font-medium" style={{ color: 'rgba(255,255,255,0.65)' }}>
                      {unit.l}
                    </span>
                  </div>
                  {i < arr.length - 1 && (
                    <span className="text-white/60 font-bold pb-4 text-sm">:</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Info ── */}
      <div className="flex flex-col flex-1 px-4 pt-3.5 pb-4 gap-2">
        {/* Category + rating row */}
        <div className="flex items-center justify-between">
          <span
            className="text-[10px] font-bold uppercase tracking-widest"
            style={{ color: 'var(--color-primary-tint)' }}
          >
            {product.categoryLabel}
          </span>
          <span
            className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full"
            style={{ background: 'var(--color-gold-bg)', color: 'var(--color-gold-dark)' }}
          >
            <StarIcon /> {product.rating.toFixed(1)}
          </span>
        </div>

        {/* Name — 2-line clamp */}
        <p
          className="text-[14px] font-bold leading-snug"
          style={{
            color:              'var(--color-heading)',
            display:           '-webkit-box',
            WebkitLineClamp:   2,
            WebkitBoxOrient:   'vertical',
            overflow:          'hidden',
          }}
        >
          {product.name}
        </p>

        {/* Price + save chip */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-base font-extrabold" style={{ color: 'var(--color-price-active)' }}>
            ₹{product.price.toFixed(0)}
          </span>
          <span className="text-xs line-through" style={{ color: 'var(--color-subtle)' }}>
            ₹{product.originalPrice.toFixed(0)}
          </span>
          <span
            className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full"
            style={{ background: 'var(--color-primary-xlight)', color: 'var(--color-primary)' }}
          >
            Save {savePercent}%
          </span>
        </div>
      </div>
    </a>
  )
}

// ═══════════════════════════════════════════════════════════════
//  PROMO BANNER
// ═══════════════════════════════════════════════════════════════

const PromoBanner = ({ content = promoContent }) => {
  const { d, h, m, s } = useCountdown(content.countdownSeconds)
  const labels = content.countdownLabels || ['Days', 'Hours', 'Minutes', 'Seconds']
  const units  = [{ v: d }, { v: h }, { v: m }, { v: s }]

  return (
    <div className="relative rounded-3xl overflow-hidden mt-10 flex items-stretch min-h-[260px] gap-5">
      <div className="hidden sm:block w-[26%] flex-none relative rounded-3xl overflow-hidden bg-[var(--color-cream)]">
        <img src="https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=shilajitcare3.webp&version_id=null" alt="Promo left" className="absolute inset-0 w-full h-full object-cover object-top" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, transparent 60%, var(--color-cream) 100%)' }} />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-12 z-10 relative rounded-3xl overflow-hidden bg-[var(--color-cream)]">
        <span className="inline-block text-xs font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider" style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary)' }}>
          {content.badge}
        </span>
        <h3 className="text-4xl font-extrabold leading-tight mb-2" style={{ color: 'var(--color-heading)', letterSpacing: '-0.02em' }}>
          {content.heading}<span style={{ color: 'var(--color-gold)' }}>{content.highlight}</span>
        </h3>
        <p className="text-sm mb-8" style={{ color: 'var(--color-muted)' }}>{content.subtext}</p>

        <div className="inline-flex items-end gap-3 px-6 py-4 rounded-2xl mb-8" style={{ background: 'var(--color-surface-1)', boxShadow: 'var(--shadow-card)', border: '1px solid var(--color-border)' }}>
          {units.map((u, i) => (
            <React.Fragment key={i}>
              <CountdownUnit value={u.v} label={labels[i]} />
              {i < units.length - 1 && <Colon />}
            </React.Fragment>
          ))}
        </div>

        <a
          href={content.ctaHref}
          className="inline-flex items-center gap-2 text-sm font-bold px-7 py-3 rounded-full transition-all"
          style={{ background: 'var(--color-primary)', color: 'var(--color-white)', boxShadow: 'var(--shadow-btn)' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-primary-dark)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(24,75,36,0.40)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'var(--color-primary)'; e.currentTarget.style.boxShadow = 'var(--shadow-btn)' }}
        >
          {content.ctaLabel} <ArrowIcon />
        </a>
      </div>

      <div className="hidden sm:block w-[26%] flex-none relative rounded-3xl overflow-hidden bg-[var(--color-cream)]">
        <img src='https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=shilajitcare3.webp&version_id=null' alt="Promo right" className="absolute inset-0 w-full h-full object-cover object-top" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to left, transparent 60%, var(--color-cream) 100%)' }} />
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
//  MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════

const BestSellers = ({
  content     = bestSellersContent,
  productList = products,
  promo       = promoContent,
  showPromo   = true,
}) => {
  // Directly grab the first 4 products to keep the design clean and static
  const displayProducts = productList.slice(0, 4);

  return (
    <section className="py-10" style={{ background: 'var(--color-off-white)', boxShadow: 'inset 0 12px 12px -10px rgba(24,75,36,0.3)'}}>
      <div className="max-w-[1240px] mx-auto px-4 md:px-8 lg:px-12">

        {/* ── Header ── */}
        <div className="flex items-start justify-between flex-wrap gap-4 mb-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--color-primary-tint)' }}>
              {content.subtitle}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              <span style={{ color: 'var(--color-heading)' }}>{content.headingPrefix}</span>
              <span className="bg-gradient-to-r from-[#C08A3E] to-[#d4a55a] bg-clip-text text-transparent">
                {content.headingHighlight}
              </span>
              <span style={{ color: 'var(--color-heading)' }}>{content.headingSuffix}</span>
            </h2>
            <div className="mt-4 w-20 h-1 bg-gradient-to-r from-[#184b24] to-[#C08A3E] rounded-full" />
          </div>

          <a
            href={content.viewAllHref}
            className="self-center inline-flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-full transition-all"
            style={{ background: 'var(--color-primary)', color: 'var(--color-white)', boxShadow: 'var(--shadow-btn)' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-primary-dark)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--color-primary)';      e.currentTarget.style.transform = 'translateY(0)' }}
          >
            {content.viewAllLabel}
          </a>
        </div>

        {/* ── Product Grid — 4 items strictly displayed, no scroll ── */}
        {displayProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-2">
            {displayProducts.map(product => (
              <div key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div
            className="w-full py-14 flex flex-col items-center gap-3 rounded-2xl"
            style={{ background: 'var(--color-surface-1)', border: '1px dashed var(--color-border)' }}
          >
            <p className="text-2xl">🌿</p>
            <p className="text-sm font-medium" style={{ color: 'var(--color-muted)' }}>
              No products found.
            </p>
          </div>
        )}

        {/* ── Promo banner ── */}
        {showPromo && <PromoBanner content={promo} />}

      </div>
    </section>
  )
}

export default BestSellers