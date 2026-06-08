import { useState } from "react";

const styles = `
  @import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap");

  .vd-root {
    font-family: 'DM Sans', sans-serif;
    background: #EDE9F5;
    color: #1a1230;
   min-height: 100vh;
    padding: 100px 24px 24px;
  }
  .vd-page {
    max-width: 960px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .vd-card {
    background: #fff;
    border-radius: 22px;
    padding: 36px 32px;
  }
  .vd-tag {
    font-size: 11px;
    letter-spacing: 0.13em;
    text-transform: uppercase;
    color: #7c6fa0;
    font-weight: 500;
    margin-bottom: 14px;
  }
  .vd-hero-heading {
    font-family: 'Playfair Display', serif;
    font-size: 30px;
    line-height: 1.25;
    font-weight: 700;
    color: #1a1230;
    margin: 0;
  }
  .vd-accent {
    font-style: italic;
    color: #7c3aed;
  }
  .vd-body {
    font-size: 13px;
    color: #6b5f80;
    line-height: 1.75;
    margin: 0;
  }
  .vd-img-placeholder {
    background: #e9e3f5;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    color: #9c8fc0;
    text-align: center;
    padding: 14px;
  }
  .vd-btn {
    background: #1a1230;
    color: #fff;
    border: none;
    border-radius: 50px;
    padding: 12px 26px;
    font-size: 13px;
    font-family: 'DM Sans', sans-serif;
    font-weight: 500;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition: background 0.2s;
  }
  .vd-btn:hover { background: #2d1f52; }
  .vd-btn-arrow {
    background: #7c3aed;
    color: #fff;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    font-size: 18px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: background 0.2s;
  }
  .vd-btn-arrow:hover { background: #6d28d9; }
  .vd-btn-arrow-sm {
    width: 32px;
    height: 32px;
    font-size: 14px;
  }
  .vd-icon-item {
    font-size: 12px;
    color: #4a3d6a;
    display: flex;
    align-items: center;
    gap: 7px;
  }
  .vd-icon-bullet {
    width: 6px;
    height: 6px;
    background: #7c3aed;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .vd-stat-num {
    font-family: 'Playfair Display', serif;
    font-size: 34px;
    font-weight: 700;
    color: #1a1230;
  }
  .vd-stat-label {
    font-size: 12px;
    color: #9c8fc0;
    margin-top: 2px;
  }
  .vd-feat-title {
    font-family: 'Playfair Display', serif;
    font-size: 17px;
    font-weight: 700;
    color: #1a1230;
    margin-bottom: 6px;
  }
  .vd-why-heading {
    font-family: 'Playfair Display', serif;
    font-size: 36px;
    font-weight: 700;
    line-height: 1.2;
    color: #1a1230;
  }
  .vd-black-banner {
    background: #1a1230;
    border-radius: 14px;
    padding: 14px 18px;
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .vd-cta-card {
    background: #e9e3f5;
    border-radius: 16px;
    padding: 20px;
    position: relative;
    min-height: 140px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  .vd-avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 2px solid #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    font-weight: 500;
    color: #4a3d6a;
    margin-left: -7px;
  }
  .vd-avatar:first-child { margin-left: 0; }
  .vd-dot {
    width: 6px;
    height: 6px;
    background: #7c3aed;
    border-radius: 50%;
  }

  @media (max-width: 680px) {
    .vd-hero-grid { grid-template-columns: 1fr !important; }
    .vd-stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
    .vd-why-grid { grid-template-columns: 1fr !important; }
    .vd-mini-grid { grid-template-columns: 1fr 1fr !important; }
  }
`;

const ImagePlaceholder = ({ src, alt, height = 200, span = 1 }) => (
  <div
    style={{
      height,
      gridColumn: span > 1 ? `span ${span}` : undefined,
      borderRadius: 16,
      overflow: "hidden",
      background: "#f6f5f8",
    }}
  >
    <img
      src={src}
      alt={alt}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "contain",
        display: "block",
      }}
    />
  </div>
);

export default function AboutEnglish() {
  return (
    <>
      <style>{styles}</style>
      <div className="vd-root">
        <div className="vd-page">

          {/* ── HERO SECTION ── */}
          <div className="vd-card">
            <div className="vd-tag">About Vedraha</div>
            <h1 className="vd-hero-heading" style={{ marginTop: 16, marginBottom: 20 }}>
              Transform Your Wellness Journey with <span className="vd-accent">Nabhi Chikitsa</span>
            </h1>
            <div
              className="vd-hero-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 24,
                alignItems: "start",
              }}
            >
              {/* Left */}
              <div>
                <p className="vd-body" style={{ marginBottom: 18 }}>
                  Apply 2–3 drops nightly to your navel for targeted relief,
                  naturally rooted in ancient Ayurvedic wisdom passed down
                  through generations.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, margin: "16px 0" }}>
                  {[
                    "100% Natural Ingredients",
                    "Nightly Navel Application",
                    "Nabhi Chikitsa Rooted",
                  ].map((item) => (
                    <div key={item} className="vd-icon-item">
                      <span className="vd-icon-bullet" />
                      {item}
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 10, marginTop: 22, alignItems: "center" }}>
                  <button className="vd-btn">Shop Oils</button>
                  <button className="vd-btn-arrow">↗</button>
                </div>
              </div>

              {/* Center — featured */}
              <div>
                {/* Replace ImagePlaceholder with <img src="..." /> */}
                <ImagePlaceholder src="/product-1-about.png" alt="Deep Sleep Nabhi Oil" height={210} />
                <div className="vd-black-banner">
                  <span style={{ fontSize: 12, color: "#e9e3f5", fontWeight: 500 }}>
                    Navel Therapy — Ancient &amp; Proven
                  </span>
                  <button className="vd-btn-arrow vd-btn-arrow-sm">↗</button>
                </div>
              </div>

              {/* Right — collage */}
              <div>
                <div
                  className="vd-mini-grid"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 8,
                    marginBottom: 10,
                  }}
                >
                  <ImagePlaceholder src="/product-2-about.png" alt="Hair Care Oil" height={95} />
                  <ImagePlaceholder src="/product-3.png" alt="Joint Relief Oil" height={95} />
                  <div style={{ gridColumn: "span 2" }}>
                    <ImagePlaceholder src="/product-4-about.png" alt="Vision & Eyecare Oil" height={95} />
                  </div>
                </div>
                <p className="vd-body" style={{ fontSize: 12, color: "#9c8fc0" }}>
                  Real results from customers healing through the navel, naturally.
                </p>
              </div>
            </div>
          </div>

          {/* ── STATS BAR ── */}
          <div className="vd-card" style={{ padding: "28px 32px" }}>
            <div
              className="vd-stats-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 16,
                textAlign: "center",
              }}
            >
              {[
                { num: "6+", label: "Nabhi oil variants" },
                { num: "100%", label: "Ayurvedic formulas" },
                { num: "₹699", label: "starting price" },
                { num: "4.8", label: "average rating" },
              ].map(({ num, label }) => (
                <div key={label}>
                  <div className="vd-stat-num">{num}</div>
                  <div className="vd-stat-label">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── WHY CHOOSE US ── */}
          <div className="vd-card" style={{ paddingBottom: 40 }}>
            <div className="vd-tag">Why Choose Us</div>
            <div
              className="vd-why-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 36,
                alignItems: "start",
              }}
            >
              {/* Left */}
              <div>
                <p className="vd-why-heading">
                  Why customers choose{" "}
                  <span className="vd-accent">Vedraha</span>
                </p>
                <p className="vd-body" style={{ margin: "12px 0 24px" }}>
                  Every oil we craft honours the science of Nabhi Chikitsa —
                  healing through the navel chakra, backed by nature.
                </p>

                {/* Dot grid decoration */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(6, 10px)",
                    gap: 8,
                    marginBottom: 28,
                  }}
                >
                  {Array.from({ length: 18 }).map((_, i) => (
                    <div
                      key={i}
                      className="vd-dot"
                      style={{ opacity: i < 6 ? 0.25 : i < 12 ? 0.15 : 0.08 }}
                    />
                  ))}
                </div>

                <div>
                  <p className="vd-feat-title">Local Herbal Expertise</p>
                  <p className="vd-body">
                    Formulated by Ayurvedic practitioners using ethically sourced
                    herbs from across India.
                  </p>
                </div>
              </div>

              {/* Right */}
              <div>
                <p
                  className="vd-body"
                  style={{ textAlign: "right", marginBottom: 22 }}
                >
                  Every bottle we make is built on trust, purity, and the
                  age-old tradition of navel healing.
                </p>

                <div style={{ marginBottom: 20 }}>
                  <p className="vd-feat-title">Certified Ayurvedic Formulas</p>
                  <p className="vd-body">
                    Each oil follows traditional Nabhi Chikitsa principles,
                    targeting specific body concerns through the navel.
                  </p>
                </div>

                <div style={{ marginBottom: 22 }}>
                  <p className="vd-feat-title">Community &amp; Wellness</p>
                  <div style={{ display: "flex", margin: "10px 0 8px" }}>
                    {[
                      { initials: "RK", bg: "#d8d0ee" },
                      { initials: "PM", bg: "#c9bfe4" },
                      { initials: "SA", bg: "#baafda" },
                      { initials: "NV", bg: "#ab9fd0" },
                    ].map(({ initials, bg }) => (
                      <div key={initials} className="vd-avatar" style={{ background: bg }}>
                        {initials}
                      </div>
                    ))}
                  </div>
                  <p className="vd-body">
                    Trusted by thousands across India healing through traditional
                    Ayurvedic navel therapy.
                  </p>
                </div>

                {/* CTA card — see our full collection */}
                <div className="vd-cta-card">
                  <div>
                    <div style={{ fontSize: 11, color: "#9c8fc0", marginBottom: 6 }}>
                      Our Product Collection
                    </div>
                    <div style={{ fontSize: 13, color: "#4a3d6a", fontWeight: 500, marginBottom: 8 }}>
                      Explore all 6+ Nabhi oils for your wellness journey
                    </div>
                    <div style={{ display: "flex", gap: 4, marginTop: 8 }}>
                      {[1, 2, 3, 4, 5].map((num) => (
                        <img
                          key={num}
                          src={`/product-${num}.png`}
                          alt={`Product ${num}`}
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: 8,
                            objectFit: "cover",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  <button
                    className="vd-btn-arrow vd-btn-arrow-sm"
                    style={{ position: "absolute", bottom: 14, right: 14 }}
                  >
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