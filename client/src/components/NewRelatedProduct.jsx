import React, { useState } from "react";
import { Link } from "react-router-dom"; // Imported Link for routing
import SectionHeader from "../pages/NabhiHome/components/SectionHeader";

// import product1 from "../../public/product-1.png";
// import product2 from "../../public/product-2.png";
// import product3 from "../../public/product-3.png";
// import product4 from "../../public/product-4.png";
// import product5 from "../../public/product-5.png";
// import product6 from "../../public/product-6.png";

// ═══════════════════════════════════════════════════════════════
//  DATA  (swap per language / CMS)
// ═══════════════════════════════════════════════════════════════

// export const products = [
//   {
//     id: "p1",
//     category: "nabhi-menstrual",
//     badge: "50% off",
//     name: "Menstrual Relief Oil",
//     categoryLabel: "Menstrual",
//     rating: 4.9,
//     price: 499,
//     originalPrice: 999,
//     image: product1,
//     hasCountdown: true,
//     countdown: { days: 5, hours: 12, minutes: 30, seconds: 25 },
//     wishlist: false,
//   },
//   {
//     id: "nabhi-sleep-en",
//     category: "nabhi-sleep",
//     badge: "35% off",
//     name: "Deep Sleep Drops",
//     categoryLabel: "Sleep",
//     rating: 4.8,
//     price: 699,
//     originalPrice: 1099,
//     image: product2,
//     hasCountdown: false,
//     wishlist: false,
//   },
//   {
//     id: "p3",
//     category: "nabhi-shilajit",
//     badge: "20% off",
//     name: "Shilajit Care Oil",
//     categoryLabel: "Shilajit",
//     rating: 4.7,
//     price: 799,
//     originalPrice: 999,
//     image: product3,
//     hasCountdown: false,
//     wishlist: false,
//   },
//   {
//     id: "p4",
//     category: "nabhi-hair",
//     badge: "30% off",
//     name: "Hair Care Drops",
//     categoryLabel: "Hair",
//     rating: 4.6,
//     price: 549,
//     originalPrice: 799,
//     image: product4,
//     hasCountdown: false,
//     wishlist: false,
//   },
//   {
//     id: "p5",
//     category: "nabhi-eye",
//     badge: "15% off",
//     name: "Eye Care Serum",
//     categoryLabel: "Eye",
//     rating: 4.5,
//     price: 449,
//     originalPrice: 529,
//     image: product5,
//     hasCountdown: false,
//     wishlist: false,
//   },
// ];

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
      className="w-full flex flex-col rounded-2xl overflow-hidden h-full"
      style={{
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
          alt={product.title}
          draggable="false"
          className="w-full h-full object-cover select-none"
          style={{
            transform: hovered ? "scale(1.06)" : "scale(1)",
            transition: "transform 420ms cubic-bezier(0.4,0,0.2,1)",
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
            <StarIcon /> {product.rating}
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
          {product.title}
        </p>

        {/* Price + save chip */}
        <div className="flex items-center gap-2 flex-wrap mt-auto">
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
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
//  MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════

const NewRelatedProduct = ({ themeColor, products }) => {
  // const displayedProducts = productList.slice(0, 4);

  return (
    <section
      className="py-10"
      style={{
        background: "var(--new-bg-white-color)",
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

        {/* ── Grid System: Strictly 4 visible items ── */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <Link 
                to={product.url} 
                className="block cursor-pointer no-underline group" 
                key={product.title}
              >
                <ProductCard themeColor={themeColor} product={product} />
              </Link>
            ))}
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