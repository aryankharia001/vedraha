import React, { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import SectionHeader from "../pages/NabhiHome/components/SectionHeader";

// ═══════════════════════════════════════════════════════════════
//  DATA  (swap per language / CMS)
// ═══════════════════════════════════════════════════════════════

export const products = [
  {
    id: "p1",
    category: "nabhi-menstrual",
    badge: "50% off",
    name: "Menstrual Relief Oil",
    categoryLabel: "Menstrual",
    rating: 4.9,
    price: 499,
    originalPrice: 999,
    image:
      "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=menstrual1.webp&version_id=null",
    hasCountdown: true,
    countdown: { days: 5, hours: 12, minutes: 30, seconds: 25 },
    wishlist: false,
  },
  {
    id: "p2",
    category: "nabhi-sleep",
    badge: "35% off",
    name: "Deep Sleep Drops",
    categoryLabel: "Sleep",
    rating: 4.8,
    price: 699,
    originalPrice: 1099,
    image:
      "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=sleep1.webp&version_id=null",
    hasCountdown: false,
    wishlist: false,
  },
  {
    id: "p3",
    category: "nabhi-shilajit",
    badge: "20% off",
    name: "Shilajit Care Oil",
    categoryLabel: "Shilajit",
    rating: 4.7,
    price: 799,
    originalPrice: 999,
    image:
      "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=shilajitcare3.webp&version_id=null",
    hasCountdown: false,
    wishlist: false,
  },
  {
    id: "p4",
    category: "nabhi-hair",
    badge: "30% off",
    name: "Hair Care Drops",
    categoryLabel: "Hair",
    rating: 4.6,
    price: 549,
    originalPrice: 799,
    image:
      "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=haircare1.webp&version_id=null",
    hasCountdown: false,
    wishlist: false,
  },
  {
    id: "p5",
    category: "nabhi-eye",
    badge: "15% off",
    name: "Eye Care Serum",
    categoryLabel: "Eye",
    rating: 4.5,
    price: 449,
    originalPrice: 529,
    image:
      "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=eyecare2.webp&version_id=null",
    hasCountdown: false,
    wishlist: false,
  },
];

// ═══════════════════════════════════════════════════════════════
//  ICONS
// ═══════════════════════════════════════════════════════════════

const StarIcon = () => (
  <svg
    viewBox="0 0 20 20"
    className="h-3.5 w-3.5"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);
// ═══════════════════════════════════════════════════════════════
//  PRODUCT CARD — VERTICAL layout
// ═══════════════════════════════════════════════════════════════

const ProductCard = ({ product, themeColor }) => {
  const [hovered, setHovered] = useState(false);

  const activeColor = themeColor || "var(--new-purple-color)";

  return (
    <div
      /* fixed width so exactly 4 fit; Embla controls the scroll */
      className="flex-none flex flex-col rounded-2xl overflow-hidden"
      style={{
        width: "260px",
        background: "var(--color-white)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "var(--transition-base)",
        fontFamily: "var(--font-new-1)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── Image ── */}
      <div
        className="relative overflow-hidden"
        style={{ height: "220px", background: "var(--color-white)" }}
      >
        <img
          src={product.image}
          alt={product.name}
          draggable="false"
          className="w-full h-full object-cover select-none"
          style={{
            transform: hovered ? "scale(1.06)" : "scale(1)",
            transition: "transform 420ms cubic-bezier(0.4,0,0.2,1)",
          }}
        />

        {/* Bottom depth gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.22) 0%, transparent 55%)",
          }}
        />

        {/* Sale badge */}
        {product.badge && (
          <span
            className="absolute top-3 left-3 text-[11px] font-bold px-2.5 py-1 rounded-full"
            style={{
              background: activeColor,
              color: "var(--color-sale-text)",
              boxShadow: "var(--shadow-badge)",
              letterSpacing: "0.03em",
            }}
          >
            {product.badge}
          </span>
        )}

        {/* Wishlist */}

        {/* Countdown overlay at bottom of image */}
      </div>

      {/* ── Info ── */}
      <div className="flex flex-col flex-1 px-4 pt-3.5 pb-4 gap-2">
        {/* Category + rating row */}
        <div className="flex items-center justify-between">
          <span
            className="text-[10px] font-bold uppercase tracking-widest"
            style={{ color: activeColor }}
          >
            {product.categoryLabel}
          </span>
          <span
            className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full"
            style={{
              background: `${activeColor}22`,
              color: activeColor,
            }}
          >
            <StarIcon /> {product.rating.toFixed(1)}
          </span>
        </div>

        {/* Name — 2-line clamp */}
        <p
          className="text-[14px] font-bold leading-snug"
          style={{
            color: "var(--color-black)",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {product.name}
        </p>

        {/* Price + save chip */}
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="text-base font-extrabold"
            style={{ color: "var(--color-black)" }}
          >
            ₹{product.price.toFixed(0)}
          </span>
          <span
            className="text-xs line-through"
            style={{ color: "var(--new-neutral-color)" }}
          >
            ₹{product.originalPrice.toFixed(0)}
          </span>
        </div>

        {/* Divider */}
        {/* <div className="h-px w-full" style={{ background: 'var(--color-border)' }} /> */}

        {/* Shop Now */}
        {/* <a
          href="#"
          className="mt-auto inline-flex items-center gap-2 self-start text-sm font-bold px-4 py-2 rounded-xl transition-all"
          style={{
            background: 'var(--color-primary)',
            color:      'var(--color-white)',
            boxShadow:  'var(--shadow-btn)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'var(--color-primary-dark)'
            e.currentTarget.style.transform  = 'translateY(-1px)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'var(--color-primary)'
            e.currentTarget.style.transform  = 'translateY(0)'
          }}
        >
          Shop Now <ArrowIcon />
        </a> */}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
//  PROMO BANNER
// ═══════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════
//  MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════

const NewRelatedProduct = ({ themeColor, productList = products }) => {
  // ── Product carousel — dragFree, shows 4 at once on desktop ──
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    dragFree: true,
    watchDrag: true,
    containScroll: "trimSnaps",
  });
  const isDragging = useRef(false);

  useEffect(() => {
    if (emblaApi) emblaApi.reInit();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("pointerDown", () => {
      isDragging.current = false;
    });
    emblaApi.on("scroll", () => {
      isDragging.current = true;
    });
  }, [emblaApi]);

  return (
    <section
      className="py-10"
      style={{
        background: "var(--color-off-white)",
        boxShadow: "inset 0 12px 12px -10px rgba(24,75,36,0.3)",
      }}
    >
      <div className="max-w-[1240px] mx-auto px-4 md:px-8 lg:px-12">
        {/* ── Header ── */}

        <SectionHeader
          themeColor={themeColor}
          subtitle="Related Products"
          heading="Explore"
          headingHighlight="Related Products"
        />

        {/* ── Product carousel — 4 visible, drag to reveal more ── */}
        {productList.length > 0 ? (
          <div
            className="overflow-hidden active:cursor-grabbing -mx-1 px-1"
            ref={emblaRef}
          >
            {/* gap-4 between cards; each card is 260px so 4×260 + 3×16 = 1088px ≈ fits 1240px container */}
            <div className="flex gap-4 select-none py-2">
              {productList.map((product) => (
                <div
                  className="cursor-pointer"
                  key={product.id}
                  onClick={(e) => {
                    if (isDragging.current) e.preventDefault();
                  }}
                >
                  <ProductCard themeColor={themeColor} product={product} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div
            className="w-full py-14 flex flex-col items-center gap-3 rounded-2xl"
            style={{
              background: "var(--color-surface-1)",
              border: "1px dashed var(--color-border)",
            }}
          >
            <p className="text-2xl">🌿</p>
            <p
              className="text-sm font-medium"
              style={{ color: "var(--color-muted)" }}
            >
              No products in this category yet.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewRelatedProduct;
