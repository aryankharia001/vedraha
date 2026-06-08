import { useState } from "react";

// Kept only style properties that depend heavily on dynamic custom app variables
const inlineStyles = `
  
  .vd-font-serif { font-family: var(--font-new-1) }
  .vd-font-sans { font-family: var(--font-new-2) }
  .vd-bg-root { background: var(--new-bg-white-color); }
  .vd-text-primary { color: var(--new-primary-color); }
  .vd-bg-primary { background: var(--new-primary-color); }
  .vd-text-purple { color: var(--new-purple-color); }
  .vd-bg-purple { background: var(--new-purple-color); }
`;

const ImagePlaceholder = ({ src, alt, height = 200, span = 1 }) => (
  <div
    className="overflow-hidden rounded-2xl bg-[#f6f5f8]"
    style={{
      height,
      gridColumn: span > 1 ? `span ${span}` : undefined,
    }}
  >
    <img
      src={src}
      alt={alt}
      className="h-full w-full object-contain block"
    />
  </div>
);

export default function AboutEnglish() {
  return (
    <>
      <style>{inlineStyles}</style>
      <div className="vd-bg-root vd-font-serif min-h-screen text-[#1a1230] px-6 pt-[100px] pb-6">
        {/* Maximum inner canvas constraint restored to 1060px */}
        <div className="max-w-[1060px] mx-auto flex flex-col gap-4">

          {/* ── HERO SECTION ── */}
          <div className="bg-white rounded-[14px] p-9 md:p-[52px_48px] border border-black/5">
            <div className="vd-text-primary text-[13px] tracking-[0.15em] uppercase font-semibold">
              About Vedraha
            </div>
            <h1 className="vd-font-serif text-[30px] md:text-[36px] leading-tight font-light text-black mt-4 mb-7">
              Transform Your Wellness Journey with <span className="vd-font-sans italic vd-text-purple font-medium">Nabhi Chikitsa</span>
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr_1fr] gap-8 items-start">
              {/* Left Column */}
              <div>
                <p className="text-[15px] text-black leading-relaxed mb-6">
                  Apply 2–3 drops nightly to your navel for targeted relief,
                  naturally rooted in ancient Ayurvedic wisdom passed down
                  through generations.
                </p>
                <div className="flex flex-col gap-3.5 my-5">
                  {[
                    "100% Natural Ingredients",
                    "Nightly Navel Application",
                    "Nabhi Chikitsa Rooted",
                  ].map((item) => (
                    <div key={item} className="text-[14px] text-[#4a3d6a] flex items-center gap-2.5 font-medium">
                      <span className="w-1.5 h-1.5 vd-bg-purple rounded-full flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
                <div className="flex gap-3 mt-8 items-center">
                  <button className="vd-bg-primary text-white border-none rounded-[50px] py-3.5 px-8 text-[14px] font-medium cursor-pointer inline-flex items-center gap-2 hover:bg-[#2d1f52] transition-colors">
                    Shop Oils
                  </button>
                  <button className="vd-bg-purple text-white border-none rounded-full w-11 h-11 text-[20px] cursor-pointer inline-flex items-center justify-center flex-shrink-0 hover:bg-[#6d28d9] transition-colors">
                    ↗
                  </button>
                </div>
              </div>

              {/* Center Column — Featured product showcase */}
              <div>
                <ImagePlaceholder src="/product-1-about.png" alt="Deep Sleep Nabhi Oil" height={230} />
                <div className="bg-[#1a1230] rounded-xl p-[14px_18px] mt-3 flex items-center justify-between">
                  <span className="text-[12px] text-[#e9e3f5] font-medium vd-font-serif">
                    Navel Therapy — Ancient &amp; Proven
                  </span>
                  <button className="vd-bg-purple text-white border-none rounded-full w-8 h-8 text-[14px] cursor-pointer inline-flex items-center justify-center flex-shrink-0 hover:bg-[#6d28d9] transition-colors">
                    ↗
                  </button>
                </div>
              </div>

              {/* Right Column — Imagery structure metrics */}
              <div>
                <div className="grid grid-cols-2 gap-3 mb-3.5">
                  <ImagePlaceholder src="/product-2-about.png" alt="Hair Care Oil" height={105} />
                  <ImagePlaceholder src="/product-3.png" alt="Joint Relief Oil" height={105} />
                  <div className="col-span-2">
                    <ImagePlaceholder src="/product-4-about.png" alt="Vision & Eyecare Oil" height={105} />
                  </div>
                </div>
                <p className="text-[13px] text-[#9c8fc0]">
                  Real results from customers healing through the navel, naturally.
                </p>
              </div>
            </div>
          </div>

          {/* ── STATS BAR ── */}
          <div className="bg-white rounded-[14px] p-[36px_48px] border border-black/5">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              {[
                { num: "6+", label: "Nabhi oil variants" },
                { num: "100%", label: "Ayurvedic formulas" },
                { num: "₹699", label: "starting price" },
                { num: "4.8", label: "average rating" },
              ].map(({ num, label }) => (
                <div key={label}>
                  <div className="vd-font-serif text-[42px] font-bold text-[#1a1230] mountaineer-line-height-1">
                    {num}
                  </div>
                  <div className="text-[12px] text-[#9c8fc0] mt-1.5 uppercase tracking-wider">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── WHY CHOOSE US ── */}
          <div className="bg-white rounded-[14px] p-9 md:p-[52px_48px_52px] border border-black/5">
            <div className="vd-text-primary text-[13px] tracking-[0.15em] uppercase font-semibold">
              Why Choose Us
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mt-4">
              {/* Left Column */}
              <div>
                <h2 className="vd-font-serif text-[40px] md:text-[44px] font-medium text-[#1a1230] leading-tight">
                  Why customers choose <span className="vd-font-sans italic vd-text-purple font-medium">Vedraha</span>
                </h2>
                <p className="text-[15px] text-black leading-relaxed my-5">
                  Every oil we craft honours the science of Nabhi Chikitsa —
                  healing through the navel chakra, backed by nature.
                </p>

                {/* Decorative Dot Matrix Grid */}
                <div className="grid grid-cols-6 gap-2 w-max mb-8">
                  {Array.from({ length: 18 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-1.5 h-1.5 vd-bg-purple rounded-full"
                      style={{ opacity: i < 6 ? 0.25 : i < 12 ? 0.15 : 0.08 }}
                    />
                  ))}
                </div>

                <div>
                  <h3 className="vd-font-serif text-[22px] font-semibold text-[#1a1230] mb-2">
                    Local Herbal Expertise
                  </h3>
                  <p className="text-[15px] text-black leading-relaxed">
                    Formulated by Ayurvedic practitioners using ethically sourced
                    herbs from across India.
                  </p>
                </div>
              </div>

              {/* Right Column */}
              <div className="md:mt-1.5">
                <p className="vd-font-serif text-[18px] text-[#4a3d6a] italic text-right mb-8">
                  "Every bottle we make is built on trust, purity, and the
                  age-old tradition of navel healing."
                </p>

                <div className="mb-7">
                  <h3 className="vd-font-serif text-[22px] font-semibold text-[#1a1230] mb-2">
                    Certified Ayurvedic Formulas
                  </h3>
                  <p className="text-[15px] text-black leading-relaxed">
                    Each oil follows traditional Nabhi Chikitsa principles,
                    targeting specific body concerns through the navel.
                  </p>
                </div>

                <div className="mb-8">
                  <h3 className="vd-font-serif text-[22px] font-semibold text-[#1a1230] mb-2">
                    Community &amp; Wellness
                  </h3>
                  <div className="flex my-3.5 pl-2">
                    {[
                      { initials: "RK", bg: "#d8d0ee" },
                      { initials: "PM", bg: "#c9bfe4" },
                      { initials: "SA", bg: "#baafda" },
                      { initials: "NV", bg: "#ab9fd0" },
                    ].map(({ initials, bg }) => (
                      <div
                        key={initials}
                        className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-[11px] font-bold text-[#4a3d6a] -ml-2.5 first:ml-0"
                        style={{ background: bg }}
                      >
                        {initials}
                      </div>
                    ))}
                  </div>
                  <p className="text-[15px] text-black leading-relaxed">
                    Trusted by thousands across India healing through traditional
                    Ayurvedic navel therapy.
                  </p>
                </div>

                {/* Action-Oriented Cards Segment */}
                <div className="bg-[#e9e3f5] rounded-2xl p-7 relative min-h-[160px] flex items-center justify-center text-center">
                  <div>
                    <div className="text-[12px] text-[#9c8fc0] mb-2 uppercase tracking-wider">
                      Our Product Collection
                    </div>
                    <div className="vd-font-serif text-[16px] font-semibold text-[#1a1230] mb-3.5">
                      Explore all 6+ Nabhi oils for your wellness journey
                    </div>
                    <div className="flex gap-1.5 justify-center mt-2">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <img
                          key={num}
                          src={`/product-${num}.png`}
                          alt={`Product ${num}`}
                          className="w-10 h-10 rounded-lg object-cover border border-white/60"
                        />
                      ))}
                    </div>
                  </div>
                  <button className="vd-bg-purple text-white border-none rounded-full w-8 h-8 text-[14px] cursor-pointer inline-flex items-center justify-center flex-shrink-0 hover:bg-[#6d28d9] transition-colors absolute bottom-4 right-4">
                    ↗
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}