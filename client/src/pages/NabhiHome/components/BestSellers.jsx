import React from "react";
import { Link } from "react-router-dom";
import product4 from "../../../../public/product-1.png";
import product1 from "../../../../public/product-2.png";
import product2 from "../../../../public/product-3.png";
import product3 from "../../../../public/product-4.png";
import product5 from "../../../../public/product-5.png";
// import product6 from "../../../../public/product-6.png";

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
    route: "/products/nabhi-sleep-en", // MATCHED
  },
  {
    id: "digestive-care-nabhi-oil",
    name: "Digestive Care",
    description: "Improves digestion & gut health",
    price: 699,
    originalPrice: 999,
    image: product2,
    route: "/products/nabhi-amrit-en", // NOTE: Ensure you add this route declaration to your App Routes if missing
  },
  {
    id: "joint-relief-nabhi-oil",
    name: "Joint Relief",
    description: "Relieves joint pain & inflammation",
    price: 699,
    originalPrice: 999,
    image: product3,
    route: "/products/nabhi-joint-en", // MATCHED
  },
  {
    id: "eyecare-nabhi-oil",
    name: "Vision & Eyecare",
    description: "Soothes eye strain, dryness & nourishes naturally",
    price: 699,
    originalPrice: 999,
    image: product4, 
    route: "/products/nabhi-eye-en", // FIXED: Matched to <NabhiEyePageEng />
  },
  {
    id: "haircare-nabhi-oil",
    name: "Hair Care",
    description: "Promotes hair growth, reduces fall & nourishes roots",
    price: 699,
    originalPrice: 999,
    image: product5,
    route: "/products/nabhi-hair-en", // MATCHED
  },
  {
    id: "shilajit-nabhi-oil",
    name: "Nabhi Shilajit",
    description: "Boosts strength, stamina & vital energy naturally",
    price: 699,
    originalPrice: 999,
    image: product5, 
    route: "/products/nabhi-shilajit-en", // FIXED: Appended missing "-en" suffix to match application router
  },
];

// ═══════════════════════════════════════════════════════════════
//  DECORATIVE FLOWER CORNERS
// ═══════════════════════════════════════════════════════════════

const FlowerCorner = ({ side = "left" }) => (
  <svg
    className={`pointer-events-none absolute top-0 h-[80px] w-[80px] opacity-40 sm:h-[112px] sm:w-[112px] md:h-[150px] md:w-[150px] ${
      side === "left" ? "left-0" : "right-0 scale-x-[-1]"
    }`}
    viewBox="0 0 160 160"
    fill="none"
    aria-hidden="true"
  >
    <g stroke="rgba(127, 80, 205, 0.25)" strokeWidth="1.25">
      <path d="M2 6C18 7 32 14 42 26C25 26 13 19 2 6Z" />
      <path d="M9 30C27 25 43 30 54 43C35 47 20 43 9 30Z" />
      <path d="M0 55C19 45 38 47 53 60C33 68 15 67 0 55Z" />
      <path d="M35 4C48 16 54 31 51 48C37 35 32 21 35 4Z" />
      <path d="M62 2C70 17 70 34 61 50C51 33 52 17 62 2Z" />
      <path d="M84 8C88 24 83 39 70 52C64 35 69 20 84 8Z" />
      <path d="M105 18C103 35 94 49 78 58C79 39 89 26 105 18Z" />
      <path d="M24 78C41 67 59 65 76 75C58 87 40 88 24 78Z" />
      <path d="M60 96C76 85 94 83 110 93C92 105 75 106 60 96Z" />
      <path d="M5 4C31 29 57 55 105 96" />
      <path d="M43 26C55 38 65 48 78 58" />
      <path d="M53 60C65 68 73 72 88 78" />
    </g>
  </svg>
);

// ═══════════════════════════════════════════════════════════════
//  PRODUCT CARD
// ═══════════════════════════════════════════════════════════════

const ProductCard = ({ product }) => (
  <Link
  to={product.route || "#"}
  className="group flex flex-col justify-between overflow-hidden border border-[#eeeaf6] bg-white text-center no-underline shadow-[0_4px_12px_rgba(37,25,70,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(37,25,70,0.15)] rounded-[7px]"
>
  {/* Image container handles shifting ratios safely */}
  <div className="relative aspect-square w-full overflow-hidden bg-slate-50 min-[480px]:aspect-[4/3] sm:aspect-square">
    <img
      src={product.image}
      alt={`${product.name} Nabhi Oil`}
      draggable="false"
      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
    />
  </div>

  {/* Content Container with fluid typographic scaling */}
  <div className="flex flex-1 flex-col justify-between p-3.5 sm:p-4">
    <div className="mb-3">
      <h3 className="text-[16px] font-extrabold leading-tight text-[var(--new-heading-text)] min-[480px]:text-[17px] xl:text-[15px] min-[1400px]:text-[17px]">
        {product.name} Nabhi Oil
      </h3>

      <p className="mt-1.5 line-clamp-2 text-[13px] font-medium leading-normal text-[var(--new-para-text)] xl:text-[12px] min-[1400px]:text-[13px]">
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

      <span
        className="mt-3 inline-flex w-full items-center justify-center bg-[var(--new-primary-color)] py-2 text-[12px] font-extrabold capitalise tracking-wider text-white shadow-[0_3px_7px_rgba(53,16,95,0.2)] transition-opacity group-hover:opacity-90 xl:text-[11px] min-[1400px]:text-[12px] rounded"
        style={{ fontFamily: "var(--font-new-1)" }}
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
}) => {
  const displayProducts = productList.slice(0, 7);

  return (
    <section className="relative overflow-hidden bg-[var(--new-bg-color)] py-12 md:py-16">
      <FlowerCorner side="left" />
      <FlowerCorner side="right" />

      <div className="relative z-10 mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto mb-10 max-w-2xl text-center md:mb-12">
          <p className="mb-2 text-[11px] font-extrabold uppercase tracking-[0.28em] text-[var(--new-heading-text)] sm:text-[12px]">
            {content.subtitle}
          </p>

          <h2
            className="text-[24px] font-semibold leading-tight text-[var(--color-black)] sm:text-[28px] md:text-[34px]"
            style={{ fontFamily: "var(--font-new-1)" }}
          >
            {content.heading}{" "}
            <span
              className="font-medium text-[var(--new-purple-color)] text-[26px] sm:text-[30px] md:text-[36px]"
              style={{
                fontFamily: "var(--font-new-2)",
                fontStyle: "italic",
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
          /* 
            Optimized Fluid Grid:
            - 2 columns on small screens (<640px)
            - 3 columns on tablets (sm)
            - 4 columns on small desktops (lg)
            - 7 columns on high-res widescreens (xl+)
          */
          <div className="grid grid-cols-2 gap-3 min-[480px]:gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {displayProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
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
