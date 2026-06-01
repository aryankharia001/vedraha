import React from "react";
import { Link } from "react-router-dom";

// ═══════════════════════════════════════════════════════════════
//  DATA
// ═══════════════════════════════════════════════════════════════

export const bestSellersContent = {
  subtitle: "Our Best Sellers",
  heading: "Our 7",
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
    image:
      "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=sleep1.webp&version_id=null",
    route: "/products/nabhi-sleep-en",
  },
  {
    id: "digestive-care-nabhi-oil",
    name: "Digestive Care",
    description: "Improves digestion & gut health",
    price: 699,
    originalPrice: 999,
    image:
      "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=amriteng3.webp&version_id=null",
    route: "/products/nabhi-amrit-en",
  },
  {
    id: "joint-relief-nabhi-oil",
    name: "Joint Relief",
    description: "Relieves joint pain & inflammation",
    price: 699,
    originalPrice: 999,
    image:
      "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=Gemini_Generated_Image_jejzeajejzeajejz.png.webp&version_id=null",
    route: "/products/nabhi-joint-en",
  },
  {
    id: "stress-relief-nabhi-oil",
    name: "Stress Relief",
    description: "Reduces stress, anxiety & tension",
    price: 699,
    originalPrice: 999,
    image:
      "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=menstrual1.webp&version_id=null",
    route: "/products/nabhi-menstrual-en",
  },
  {
    id: "immunity-boost-nabhi-oil",
    name: "Immunity Boost",
    description: "Strengthens immunity naturally",
    price: 699,
    originalPrice: 999,
    image:
      "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=haircare1.webp&version_id=null",
    route: "/products/nabhi-hair-en",
  },
  {
    id: "womens-care-nabhi-oil",
    name: "Women's Care",
    description: "Supports hormonal balance",
    price: 699,
    originalPrice: 999,
    image:
      "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=eyecare1.webp&version_id=null",
    route: "/products/nabhi-eye-en",
  },
  {
    id: "muscle-relax-nabhi-oil",
    name: "Muscle Relax",
    description: "Relaxes muscles & reduces stiffness",
    price: 699,
    originalPrice: 999,
    image:
      "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=shilajitcare3.webp&version_id=null",
    route: "/products/nabhi-shilajit-en",
  },
];

// ═══════════════════════════════════════════════════════════════
//  DECORATIVE FLOWER CORNERS
// ═══════════════════════════════════════════════════════════════

const FlowerCorner = ({ side = "left" }) => (
  <svg
    className={`pointer-events-none absolute top-0 h-[112px] w-[112px] opacity-70 md:h-[150px] md:w-[150px] ${
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
  className="group flex h-[300px] flex-col overflow-hidden rounded-[10px] border border-[#eeeaf6] bg-white text-center no-underline shadow-[0_3px_5px_rgba(37,25,70,0.15)] transition-transform duration-300 hover:-translate-y-1"
>
  {/* Image Section - 50% */}
  <div className="h-1/2 w-full overflow-hidden">
    <img
      src={product.image}
      alt={`${product.name} Nabhi Oil`}
      draggable="false"
      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
    />
  </div>

  {/* Content Section - 50% */}
  <div className="flex h-1/2 flex-col items-center justify-between p-3 pt-2 pb-4">
    <div>
      <h3 className="text-[15px] font-extrabold leading-[1.12] text-[var(--new-heading-text)]">
        {product.name}
        <br />
        Nabhi Oil
      </h3>

      <p className="mt-2 text-[11px] font-medium leading-[1.35] text-[var(--new-para-text)]">
        {product.description}
      </p>
    </div>

    <div>
      <div className="flex items-center justify-center gap-2">
        <span className="text-[13px] font-extrabold text-[var(--new-accent-color)]">
          ₹{product.price}
        </span>
        <span className="text-[13px] font-bold text-[var(--new-neutral-color)] line-through">
          ₹{product.originalPrice}
        </span>
      </div>

      <span className="mt-3 inline-flex h-7 min-w-[84px] items-center justify-center rounded-[5px] bg-[var(--new-primary-color)] px-4 text-[10px] font-extrabold uppercase tracking-wide text-white shadow-[0_3px_7px_rgba(53,16,95,0.28)]">
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
    <section className="relative overflow-hidden bg-[#f2eafa] py-8 md:py-9">
      <FlowerCorner side="left" />
      <FlowerCorner side="right" />

      <div className="relative z-10 mx-auto max-w-[1220px] px-4 md:px-8">
        <div className="mb-10 text-center">
          <p className="mb-2 text-[12px] font-extrabold uppercase tracking-[0.28em] text-[var(--new-heading-text)]">
            {content.subtitle}
          </p>

          <h2
            className="text-[26px] font-semibold leading-tight text-[#171021] md:text-[32px]"
            style={{ fontFamily: "var(--font-new-1)" }}
          >
            {content.heading}{" "}
            <span
              className="font-medium text-[var(--new-purple-color)] text-[28px] md:text-[34px]"
              style={{
                fontFamily: "var(--font-new-2)",
                fontStyle: "italic",
              }}
            >
              {content.headingHighlight}
            </span>{" "}
            {content.headingSuffix}
          </h2>

          <p className="mt-2 text-[14px] font-medium text-[var(--new-para-text)]">
            {content.description}
          </p>
        </div>

        {displayProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
            {displayProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-10 text-center">
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