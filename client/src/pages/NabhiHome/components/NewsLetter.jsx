import React, { useState } from "react";
import newsletterbg from "../../../../public/newsletter-bg.jpg";

export default function NewsLetter() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log("Subscribed email:", email);
  };

  return (
    <section className="w-full px-4 py-12 sm:px-6 lg:px-8 bg-[var(--new-bg-white-color)]">
      <div
        className="relative mx-auto w-full max-w-[1240px] overflow-hidden rounded-2xl px-6 py-12 sm:px-12 sm:py-16 md:px-16 lg:py-20"
        style={{
          background: "linear-gradient(135deg, var(--new-purple-color) 0%, #1a083a 100%)"
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${newsletterbg}')` }}
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center text-center">

          <div className="mb-4 flex flex-col items-center text-[var(--new-accent-color)]">
            <div className="relative">
              <span className="absolute -left-4 -top-2 animate-pulse text-xs">✦</span>
              <span className="absolute -right-3 -top-3 text-[10px]">✦</span>
              <span className="absolute -bottom-2 -right-4 text-xs">✦</span>
              <svg
                className="h-9 w-9 stroke-current fill-transparent stroke-[1.25]"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
            </div>
          </div>

          <h2
            className="text-2xl font-normal text-white sm:text-3xl md:text-4xl tracking-wide"
            style={{ fontFamily: "var(--font-new-1)" }}
          >
            Stay Updated, <span className="italic font-light opacity-95">Stay Healthy</span>
          </h2>

          <p
            className="mt-3 text-[13px] font-medium leading-relaxed text-white/80 max-w-md sm:text-[14px]"
            style={{ fontFamily: "var(--font-new-1)" }}
          >
            Subscribe to our newsletter and get exclusive offers, health tips & updates.
          </p>

          <form
            onSubmit={handleSubscribe}
            className="group mt-8 flex w-full flex-col gap-0 overflow-hidden rounded-xl border-2 border-[var(--new-neutral-color)] bg-white shadow-lg sm:flex-row sm:items-center sm:bg-white/10 sm:backdrop-blur-md"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full flex-1 bg-white px-5 py-4 text-[16px] font-medium text-[var(--new-heading-text)] outline-none placeholder:text-neutral-400 focus:outline-none sm:bg-white"
              style={{ fontFamily: "var(--font-new-1)" }}
            />
            <button
              type="submit"
              className="flex items-center justify-center gap-2 shrink-0 bg-[var(--new-purple-color)] px-7 py-4 text-[14px] font-extrabold uppercase tracking-widest text-white transition-all duration-300 hover:bg-[#1a083a] active:scale-[0.98] sm:py-0 sm:self-stretch"
              style={{ fontFamily: "var(--font-new-1)" }}
            >
              <span>Subscribe</span>
              <svg
                className="h-3.5 w-3.5 stroke-current fill-none stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </form>

        </div>
      </div>
    </section>
  );
}