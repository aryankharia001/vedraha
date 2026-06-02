    import React from "react";
import bgImg from "../../../../public/ingreidient-bg.png";

const benefits = [
  {
    label: "Improves",
    sublabel: "Sleep Quality",
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true" className="h-8 w-8">
        <path
          d="M31.7 35.6A16 16 0 0 1 17.9 12a13.8 13.8 0 1 0 17.9 17.9 15.9 15.9 0 0 1-4.1 5.7Z"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.2"
        />
        <path
          d="m33.5 13.2 1.4 3 3.2.5-2.3 2.2.5 3.2-2.8-1.5-2.9 1.5.6-3.2-2.4-2.2 3.3-.5 1.4-3ZM24 8.5v4.3M21.9 10.7h4.2"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    ),
  },
  {
    label: "Calms Mind &",
    sublabel: "Reduces Stress",
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
          d="M24 34c-7.1-1.1-12.2-4.8-15.2-11 7 .3 12.2 4 15.2 11ZM24 34c7.1-1.1 12.2-4.8 15.2-11-7 .3-12.2 4-15.2 11ZM24 27c-5.6-3-8.7-7.6-9.2-13.7 5.7 2.1 8.8 6.7 9.2 13.7ZM24 27c5.6-3 8.7-7.6 9.2-13.7-5.7 2.1-8.8 6.7-9.2 13.7Z"
          fill="none"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="2.2"
        />
      </svg>
    ),
  },
  {
    label: "Relaxes Nerves",
    sublabel: "Naturally",
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true" className="h-8 w-8">
        <path
          d="M24 8c-5 0-9.2 3.8-9.8 8.7-3.1 1.1-5.2 4-5.2 7.4 0 3.7 2.6 6.9 6.1 7.7A9.9 9.9 0 0 0 24 40h3.5V8H24Z"
          fill="none"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="2.2"
        />
        <path
          d="M27.5 12.5c5.8 0 10.5 4.7 10.5 10.5 0 2.4-.8 4.6-2.1 6.4 1.1 1.1 1.7 2.6 1.7 4.2 0 3.4-2.8 6.2-6.2 6.2h-3.9V12.5Z"
          fill="none"
          stroke="currentColor"
          strokeLinejoin="round"
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
  imageSrc,
  imageAlt = "Woman sleeping beside Nabhi oil",
}) {
  return (
    <section className="w-full bg-[var(--new-bg-white-color)] pb-8 md:pb-10">
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 items-center gap-8 px-4 md:grid-cols-[1fr_1fr] md:gap-10">
        <div className="overflow-hidden rounded-[8px]">
          <img
            src={bgImg}
            alt={imageAlt}
            className="h-[220px] md:h-[300px] w-full object-cover object-center"
          />
        </div>

        <div className="flex h-full flex-col justify-center py-2 font-[var(--font-new-1)] text-[var(--new-para-text)]">
          <p className="mb-2 text-[12px] font-extrabold uppercase tracking-[0.28em] text-[var(--new-heading-text)]">
            Best for Poor Sleep
          </p>

          <h2 className="text-[26px] font-semibold leading-tight text-[var(--color-black)] md:text-[32px]"
            style={{fontFamily: "var(--font-new-1)"}}
          >
            <span className="text-[var(--new-purple-color)]">Deep </span>
            <em className="font-medium text-[var(--new-purple-color)] text-[28px] md:text-[34px] italic"
            style={{fontFamily: "var(--font-new-2)"}}>
              Sleep
            </em>{" "}
            Nabhi Oil
          </h2>

          <p className="mt-2 text-[14px] font-medium text-[var(--new-para-text)]">
            Promotes deep & restful sleep by calming your mind, relaxing the
            nervous system and balancing Vata dosha.
          </p>

          <div className="mt-5 grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-5">
            {benefits.map((benefit) => (
              <div
                key={`${benefit.label}-${benefit.sublabel}`}
                className="flex min-w-0 flex-col items-center text-center"
              >
                <div className="grid h-[54px] w-[54px] place-items-center rounded-full border border-[color-mix(in_srgb,var(--new-purple-color)_22%,transparent)] text-[var(--new-purple-color)]">
                  {benefit.icon}
                </div>
                <p className="mt-3 text-[12px] font-bold leading-[1.28] text-[var(--new-para-text)]">
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

          <div className="mt-5 flex flex-wrap items-center gap-5">
            <div className="flex items-baseline gap-3 font-[var(--font-new-1)]">
              <span className="text-[22px] font-extrabold text-[var(--new-accent-color)]">
                ₹699
              </span>
              <span className="text-[18px] font-extrabold text-[var(--new-neutral-color)] line-through">
                ₹999
              </span>
            </div>

            <button
              type="button"
              className="h-[44px] rounded-[8px] bg-[var(--new-primary-color)] px-5 text-[14px] font-extrabold uppercase tracking-[0.03em] text-[var(--new-bg-white-color)] shadow-[0_12px_24px_rgba(53,16,95,0.24)] transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[var(--new-purple-color)] focus:ring-offset-2 focus:ring-offset-[var(--new-bg-color)]"
            >
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}