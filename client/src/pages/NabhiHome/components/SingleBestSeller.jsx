import React from "react";
import bgImg from "../../../../public/best-seller/best-seller.png";
import { Link } from "react-router-dom";

const benefits = [
  {
    label: "Reduces Bloating",
    sublabel: "& Gas",
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true" className="h-8 w-8">
        <path
          d="M24 38c-2.4-6.7-2.4-13.5 0-20 2.4 6.5 2.4 13.3 0 20Z"
          fill="none"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="2.2"
        />
        <path
          d="M10 24h6M32 24h6M14 16l4 3M30 29l4 3"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2.2"
        />
      </svg>
    ),
  },
  {
    label: "Flushes Toxins",
    sublabel: "Naturally",
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true" className="h-8 w-8">
        <path
          d="M24 8v24M16 22l8 8 8-8"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.2"
        />
        <path
          d="M12 36c4 3 10 4 12 4s8-1 12-4"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2.2"
        />
      </svg>
    ),
  },
  {
    label: "100% Natural",
    sublabel: "Ayurvedic",
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true" className="h-8 w-8">
        <path
          d="M39 10C21.5 11.2 11.8 19.2 11.8 32.3c0 3.9 3.2 7.1 7.1 7.1C32.1 39.4 38.2 26.7 39 10Z"
          fill="none"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="2.2"
        />
        <path
          d="M12 38c5.7-8.8 12.4-15 20.2-18.6"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2.2"
        />
      </svg>
    ),
  },
  {
    label: "No Chemicals",
    sublabel: "or Toxins",
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true" className="h-8 w-8">
        <path
          d="M20 8h12M23 8v10.2L13.6 34.1A6 6 0 0 0 18.8 43h13.4a6 6 0 0 0 5.1-9.1L29 18.2V8"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.2"
        />
        <path
          d="M20.8 32h11.4M24 24l5 5M29 24l-5 5"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2.2"
        />
      </svg>
    ),
  },
];

export default function SingleBestSeller({
  imageAlt = "Traditional Ayurvedic Nabhi oil application for digestion wellness",
  shopUrl = "/products/nabhi-amrit-en", // Default fallback URL added for cleaner config
}) {
  return (
    <section className="w-full bg-[var(--new-bg-white-color)] py-10 md:py-14">
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 items-stretch gap-8 px-4 md:grid-cols-2 md:gap-12">

        {/* ── Image CONTAINER ── */}
        <div className="overflow-hidden rounded-[10px] w-full h-[320px] sm:h-[400px] md:h-[600px]">
          <img
            src={bgImg}
            alt={imageAlt}
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* ── Content Container ── */}
        <div
          className="flex flex-col justify-center gap-5 py-2 md:py-6"
          style={{ fontFamily: "var(--font-new-1)", color: "var(--new-para-text)" }}
        >
          {/* 1. Header Text Info Block */}
          <div className="flex flex-col gap-5 order-1 md:order-1">
            {/* Eyebrow */}
            <p className="text-[11px] font-extrabold uppercase tracking-[0.28em] text-[var(--new-heading-text)]">
              Best Seller Item
            </p>

            {/* Heading */}
            <h2
              className="text-[28px] font-semibold leading-tight text-[var(--color-black)] md:text-[36px]"
              style={{ fontFamily: "var(--font-new-1)" }}
            >
              <span className="text-[var(--new-purple-color)]">Digestion & </span>
              <em
                className="font-medium italic text-[var(--new-purple-color)] text-[30px] md:text-[38px]"
                style={{ fontFamily: "var(--font-new-2)" }}
              >
                Detox
              </em>{" "}
              Nabhi Oil
            </h2> 

            {/* Description */}
            <p className="text-[15px] font-medium leading-relaxed text-[var(--new-para-text)] max-w-[440px]">
              Revives your core metabolic fire (Agni) to improve breakdown performance, eliminate stubborn gas accumulation, and naturally support complete daily detoxification through the navel.
            </p>
          </div>

          {/* 2. Price + CTA Block */}
          <div className="flex flex-col gap-5 order-2 md:order-4 mt-2 md:mt-0">
            {/* Desktop Only Divider */}
            <div className="hidden md:block h-px w-full bg-[color-mix(in_srgb,var(--new-neutral-color)_30%,transparent)] mb-2" />
            
            <div className="flex flex-wrap items-center gap-5">
              <div className="flex items-baseline gap-3">
                <span className="text-[24px] font-extrabold text-[var(--new-accent-color)]">
                  ₹699
                </span>
                <span className="text-[18px] font-extrabold text-[var(--new-neutral-color)] line-through">
                  ₹999
                </span>
                <span className="text-[12px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                  30% OFF
                </span>
              </div>

              {/* Converted Button into Link Component */}
              <Link
                to={shopUrl}
                className="inline-flex h-[46px] w-full sm:w-auto items-center justify-center rounded-[8px] bg-[var(--new-primary-color)] px-7 text-[13px] font-extrabold uppercase tracking-[0.05em] text-[var(--new-bg-white-color)] transition hover:brightness-110 decoration-none focus:outline-none focus:ring-2 focus:ring-[var(--new-purple-color)] focus:ring-offset-2 focus:ring-offset-[var(--new-bg-color)]"
              >
                Shop Now
              </Link>
            </div>
          </div>

          {/* Mobile Only Divider Line */}
          <div className="block md:hidden h-px w-full bg-[color-mix(in_srgb,var(--new-neutral-color)_30%,transparent)] order-3" />

          {/* 3. Benefits Grid Container */}
          <div className="order-4 md:order-2">
            <div className="grid grid-cols-2 gap-x-5 gap-y-7 sm:grid-cols-4 mt-1">
              {benefits.map((benefit) => (
                <div
                  key={`${benefit.label}-${benefit.sublabel}`}
                  className="flex min-w-0 flex-col items-center text-center"
                >
                  <div className="grid h-[58px] w-[58px] place-items-center rounded-full border border-[color-mix(in_srgb,var(--new-purple-color)_22%,transparent)] text-[var(--new-purple-color)]">
                    {benefit.icon}
                  </div>
                  <p className="mt-3 text-[12px] font-bold leading-[1.3] text-[var(--new-para-text)]">
                    {benefit.label}
                    {benefit.sublabel ? (
                      <>
                        <br />
                        {benefit.sublabel}
                      </>
                    ) : null}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Desktop Only Central Space Divider */}
          <div className="hidden md:block lg:hidden h-px w-full bg-[color-mix(in_srgb,var(--new-neutral-color)_30%,transparent)] order-3" />

        </div>
      </div>
    </section>
  );
}