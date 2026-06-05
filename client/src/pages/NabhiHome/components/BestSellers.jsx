import React from "react";
import { Link } from "react-router-dom";
import product4 from "../../../../public/product-1.png";
import product1 from "../../../../public/product-2.png";
import product2 from "../../../../public/product-3.png";
import product3 from "../../../../public/product-4.png";
import product5 from "../../../../public/product-5.png";
import product6 from "../../../../public/product-6.png";

// ═══════════════════════════════════════════════════════════════
//  DATA
// ═══════════════════════════════════════════════════════════════

export const bestSellersContent = {
  subtitle: "All products",
  heading: "Our 6",
  headingHighlight: "Ayurvedic",
  headingSuffix: "Nabhi Oils",
  description:
    "Each oil is carefully crafted to target specific concerns and bring balance to your body naturally.",
};

export const products = [
  {
    id: "sleep-relief-nabhi-oil",
    name: "Deep Sleep",
    description: "Promotes deep & restful sleep",
    price: 699,
    originalPrice: 999,
    image: product1,
    route: "/products/nabhi-sleep-en",
  },
  {
    id: "digestive-care-nabhi-oil",
    name: "Digestive Care",
    description: "Improves digestion & gut health",
    price: 699,
    originalPrice: 999,
    image: product2,
    route: "/products/nabhi-amrit-en",
  },
  {
    id: "joint-relief-nabhi-oil",
    name: "Joint Relief",
    description: "Relieves joint pain & inflammation",
    price: 699,
    originalPrice: 999,
    image: product3,
    route: "/products/nabhi-joint-en",
  },
  {
    id: "eyecare-nabhi-oil",
    name: "Vision & Eyecare",
    description: "Soothes eye strain, dryness & nourishes naturally",
    price: 699,
    originalPrice: 999,
    image: product4, 
    route: "/products/nabhi-eye-en",
  },
  {
    id: "haircare-nabhi-oil",
    name: "Hair Care",
    description: "Promotes hair growth, reduces fall & nourishes roots",
    price: 699,
    originalPrice: 999,
    image: product5,
    route: "/products/nabhi-hair-en",
  },
  {
    id: "shilajit-nabhi-oil",
    name: "Nabhi Shilajit",
    description: "Boosts strength, stamina & vital energy naturally",
    price: 699,
    originalPrice: 999,
    image: product6, 
    route: "/products/nabhi-shilajit-en",
  },
];


// ═══════════════════════════════════════════════════════════════
//  PRODUCT CARD
// ═══════════════════════════════════════════════════════════════

const ProductCard = ({ product, buttonBgColor }) => (
  <Link
    to={product.route || "#"}
    className="group flex flex-col justify-between overflow-hidden border border-[#eeeaf6] bg-white text-center no-underline shadow-[0_4px_12px_rgba(37,25,70,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(37,25,70,0.15)] rounded-[7px]"
    style={{ fontFamily: "var(--font-new-1)" }}
  >
    <div className="relative aspect-square w-full overflow-hidden bg-slate-50 min-[480px]:aspect-[4/3] sm:aspect-square">
      <img
        src={product.image}
        alt={`${product.name} Nabhi Oil`}
        draggable="false"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>

    <div className="flex flex-1 flex-col justify-between p-3.5 sm:p-4">
      <div className="mb-3">
        <h3 className="text-[16px] font-extrabold leading-tight text-[var(--new-heading-text)] min-[480px]:text-[17px] xl:text-[15px] min-[1400px]:text-[17px]"
        style={{ fontFamily: "var(--font-new-1)" }}>
          {product.name} Nabhi Oil
        </h3>

        <p className="mt-1.5 line-clamp-2 text-[13px] font-medium leading-normal text-[var(--new-para-text)] xl:text-[12px] min-[1400px]:text-[13px]"
        style={{ fontFamily: "var(--font-new-1)" }}>
          {product.description}
        </p>
      </div>

      <div>
        <div className="flex items-center justify-center gap-1.5">
          <span className="text-[15px] font-extrabold text-[var(--new-accent-color)] sm:text-[16px] xl:text-[14px] min-[1400px]:text-[16px]">
            ₹{product.price}
          </span>
          <span className="text-[13px] font-bold text-[var(--new-neutral-color)] line-through sm:text-[14px] xl:text-[13px]">
            ₹{product.originalPrice}
          </span>
        </div>

        {/* HIGHLIGHT: Styled button background inline with active buttonBgColor prop logic */}
        <span
          className="mt-3 inline-flex w-full items-center justify-center py-2 text-[12px] font-extrabold capitalise tracking-wider text-white shadow-[0_3px_7px_rgba(53,16,95,0.2)] transition-opacity group-hover:opacity-90 xl:text-[11px] min-[1400px]:text-[12px] rounded"
          style={{ 
            fontFamily: "var(--font-new-1)",
            backgroundColor: buttonBgColor 
          }}
        >
          Shop Now
        </span>
      </div>
    </div>
  </Link>
);

// ═══════════════════════════════════════════════════════════════
//  MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════

const BestSellers = ({
  content = bestSellersContent,
  productList = products,
  themeColor, 
  bgMode = "default", // HIGHLIGHT: Accepts "white" or "default"
}) => {
  const displayProducts = productList.slice(0, 7);

  // Fallback tokens mapped cleanly
  const highlightTextColor = themeColor || "var(--new-purple-color)";
  const primaryButtonColor = themeColor || "var(--new-primary-color)";
  
  // HIGHLIGHT: If bgMode is exactly "white", it uses the white variable, otherwise it defaults to standard bg color
  const sectionBgColor = bgMode === "white" ? "var(--new-bg-white-color)" : "var(--new-bg-color)";

  return (
    <section 
      className="relative overflow-hidden py-12 md:py-16"
      style={{ backgroundColor: sectionBgColor }}
    >

      <div className="relative z-10 mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto mb-10 max-w-2xl text-center md:mb-12">
          <p 
            className="mb-2 text-[11px] font-extrabold uppercase tracking-[0.28em] sm:text-[12px]"
            style={{ 
              color: primaryButtonColor,
              fontFamily: "var(--font-new-1)"
            }}
          >
            {content.subtitle}
          </p>

          <h2
            className="text-[24px] font-semibold leading-tight text-[var(--color-black)] sm:text-[28px] md:text-[34px]"
            style={{ fontFamily: "var(--font-new-1)" }}
          >
            {content.heading}{" "}
            <span
              className="font-medium text-[26px] sm:text-[30px] md:text-[36px]"
              style={{
                fontFamily: "var(--font-new-2)",
                fontStyle: "italic",
                color: highlightTextColor,
              }}
            >
              {content.headingHighlight}
            </span>{" "}
            {content.headingSuffix}
          </h2>

          <p className="mt-3 text-[13px] font-medium leading-relaxed text-[var(--new-para-text)] sm:text-[14px]">
            {content.description}
          </p>
        </div>

        {displayProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 min-[480px]:gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {displayProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                buttonBgColor={primaryButtonColor} // HIGHLIGHT: Forwarded active themeColor into custom card children
              />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <p className="text-sm font-semibold text-[#2d283d]">
              No products found.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default BestSellers;