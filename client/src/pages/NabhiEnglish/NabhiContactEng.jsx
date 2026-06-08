import React, { useState } from "react";
import { backendurl } from "../../App";

const brand = {
  name:           "Home With Care · Vedraha",
  email:          "vedraha@gmail.com",
  phone:          "+91 97171 43189",
  whatsappNumber: "919717143189",
};

const CATEGORIES = [
  { id: "product",   label: "Product Enquiry" },
  { id: "order",     label: "Order & Delivery" },
  { id: "wellness",  label: "Wellness Guidance" },
  { id: "wholesale", label: "Wholesale / B2B" },
  { id: "feedback",  label: "Feedback & Reviews" },
  { id: "other",     label: "Other" },
];

export default function NabhiContactEng() {
  const [form, setForm]           = useState({ name: "", email: "", phone: "", message: "", category: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [errors, setErrors]       = useState({});
  const [serverError, setServerError] = useState("");

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name     = "Name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
                              e.email    = "Enter a valid email address";
    if (form.phone.trim() && !/^[0-9]{10}$/.test(form.phone.trim()))
                              e.phone    = "Phone must be exactly 10 digits";
    if (!form.category)       e.category = "Please select a category";
    if (!form.message.trim()) e.message  = "Please enter your message";
    return e;
  };

  const handleChange = (field, val) => {
    setForm((f) => ({ ...f, [field]: val }));
    setErrors((e) => { const n = { ...e }; delete n[field]; return n; });
    setServerError("");
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setServerError("");
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      const res = await fetch(`${backendurl}/api/contact`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(), email: form.email.trim(),
          phone: form.phone.trim(), message: form.message.trim(),
          category: form.category, lang: "en",
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) { setServerError(data.message || "Something went wrong."); return; }
      setSubmitted(true);
    } catch {
      setServerError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const whatsappHref = `https://api.whatsapp.com/send/?phone=${brand.whatsappNumber}&text=${encodeURIComponent("Hi, I need help with my order.")}&type=phone_number&app_absent=0`;

  /* shared input style */
  const inputBase = {
    fontFamily:  "var(--font-new-1)",
    color:       "var(--new-para-text)",
    background:  "rgba(255,255,255,0.72)",
    border:      "1.5px solid rgba(93,39,170,0.18)",
    backdropFilter: "blur(6px)",
    WebkitBackdropFilter: "blur(6px)",
  };
  const inputErrBorder = { borderColor: "var(--color)" };

  return (
    <div style={{ fontFamily: "var(--font-new-1)" }}>

      {/* ══════════════════════ CONTACT SECTION ══════════════════════ */}
      <section
        className="max-w-[1060px] mx-auto mt-22 px-6 py-16 rounded-3xl"
        style={{ background: "var(--new-bg-color)" }}
      >
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl mb-3">
          <span
            style={{
              fontFamily: "var(--font-new-1)",
              color: "var(--new-heading-text)",
            }}
          >
            Contact
          </span>{" "}
          <em
            style={{
              fontFamily: "var(--font-new-2)",
              fontStyle: "italic",
              color: "var(--new-purple-color)",
            }}
          >
            Us
          </em>
        </h1>
          <p className="text-sm max-w-md mx-auto" style={{ color: "var(--new-neutral-color)" }}>
            We're here to help. Whether you have questions, feedback, or need support, our team is ready to assist you.
          </p>
        </div>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-10 items-start">

          {/* ── LEFT: info ── */}
          <div>
            <h2
              className="text-4xl md:text-5xl leading-tight mb-8"
              style={{ fontFamily: "var(--font-new-1)", color: "var(--new-heading-text)" }}
            >
              Get in <em style={{ fontStyle: "italic", color: "var(--new-purple-color)",fontFamily: "var(--font-new-2)" }}>touch</em>
            </h2>

            <div className="space-y-6">
              {[
                { label: "Email",   val: brand.email },
                { label: "Phone",   val: brand.phone },
                { label: "Address", val: "Home With Care\nVedraha" },
              ].map(({ label, val }) => (
                <div key={label}>
                  <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "var(--new-neutral-color)" }}>{label}</p>
                  <p className="font-semibold text-base whitespace-pre-line" style={{ color: "var(--new-para-text)" }}>{val}</p>
                </div>
              ))}
            </div>

            {/* Follow Us */}
            <div className="mt-10">
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--new-neutral-color)" }}>Follow Us</p>
              <div className="flex items-center gap-3">
                {/* YouTube */}
                <a href="#" aria-label="YouTube" className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  style={{ background: "var(--new-bg-white-color)", border: "1px solid var(--new-neutral-color)" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                    <path d="M22.54 6.42A2.78 2.78 0 0 0 20.6 4.47C18.88 4 12 4 12 4s-6.88 0-8.6.47A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.4 19.53C5.12 20 12 20 12 20s6.88 0 8.6-.47a2.78 2.78 0 0 0 1.94-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" fill="var(--new-primary-color)"/>
                    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>
                  </svg>
                </a>
                {/* Instagram */}
                <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  style={{ background: "var(--new-bg-white-color)", border: "1px solid var(--new-neutral-color)" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--new-primary-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <circle cx="12" cy="12" r="4"/>
                    <circle cx="17.5" cy="6.5" r="0.8" fill="var(--new-primary-color)" stroke="none"/>
                  </svg>
                </a>
                {/* WhatsApp */}
                <a href={whatsappHref} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  style={{ background: "var(--new-bg-white-color)", border: "1px solid var(--new-neutral-color)" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="var(--new-primary-color)">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.118 1.533 5.845L0 24l6.335-1.503A11.954 11.954 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.695-.5-5.243-1.374l-.374-.222-3.763.893.951-3.67-.244-.389A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                  </svg>
                </a>
                {/* Twitter/X */}
                <a href="#" aria-label="Twitter" className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  style={{ background: "var(--new-bg-white-color)", border: "1px solid var(--new-neutral-color)" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--new-primary-color)">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.737-8.841L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* ── RIGHT: FORM with glassmorphism bg ── */}
          <div
            className="rounded-3xl p-7 md:p-9"
            style={{
              background: "linear-gradient(135deg, rgba(248, 243, 255, 0.98) 0%, rgb(245, 245, 245) 100%)",
              border: "1.5px solid rgba(93,39,170,0.13)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              boxShadow: "0 8px 40px rgba(53,16,95,0.08)",
            }}
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-14 text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                  style={{ background: "var(--new-primary-color)" }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: "var(--new-heading-text)", fontFamily: "var(--font-new-2)" }}>Message Sent!</h3>
                <p className="text-sm" style={{ color: "var(--new-neutral-color)" }}>We'll get back to you as soon as possible.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">

                {/* Category dropdown */}
                <div>
                  <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide"
                    style={{ color: "var(--new-neutral-color)" }}>How can we help?</label>
                  <div className="relative">
                    <select
                      value={form.category}
                      onChange={(e) => handleChange("category", e.target.value)}
                      className="w-full appearance-none rounded-full px-5 py-3 text-sm outline-none transition-all cursor-pointer"
                      style={{
                        ...inputBase,
                        ...(errors.category ? inputErrBorder : {}),
                        color: form.category ? "var(--new-para-text)" : "var(--new-neutral-color)",
                      }}
                    >
                      <option value="" disabled>Select a category</option>
                      {CATEGORIES.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.label}</option>
                      ))}
                    </select>
                    <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                        stroke="var(--new-neutral-color)" strokeWidth="2.2"
                        strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"/>
                      </svg>
                    </span>
                  </div>
                  {errors.category && <p className="text-xs mt-1.5" style={{ color: "var(--color)" }}>{errors.category}</p>}
                </div>

                {/* Divider */}
                <div style={{ height: "1px", background: "rgba(93,39,170,0.1)" }} />

                {/* Name + Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide"
                      style={{ color: "var(--new-neutral-color)" }}>Your Name</label>
                    <input
                      type="text"
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      className="w-full rounded-full px-5 py-3 text-sm outline-none transition-all"
                      style={{ ...inputBase, ...(errors.name ? inputErrBorder : {}) }}
                    />
                    {errors.name && <p className="text-xs mt-1" style={{ color: "var(--color)" }}>{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide"
                      style={{ color: "var(--new-neutral-color)" }}>Email</label>
                    <input
                      type="email"
                      placeholder="Your email address"
                      value={form.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      className="w-full rounded-full px-5 py-3 text-sm outline-none transition-all"
                      style={{ ...inputBase, ...(errors.email ? inputErrBorder : {}) }}
                    />
                    {errors.email && <p className="text-xs mt-1" style={{ color: "var(--color)" }}>{errors.email}</p>}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide"
                    style={{ color: "var(--new-neutral-color)" }}>Message</label>
                  <textarea
                    rows={5}
                    placeholder="Write something..."
                    value={form.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    className="w-full rounded-2xl px-5 py-4 text-sm outline-none resize-none transition-all"
                    style={{ ...inputBase, ...(errors.message ? inputErrBorder : {}) }}
                  />
                  {errors.message && <p className="text-xs mt-1" style={{ color: "var(--color)" }}>{errors.message}</p>}
                </div>

                {serverError && (
                  <p className="text-sm text-center" style={{ color: "var(--color)" }}>{serverError}</p>
                )}

                {/* ── Beautiful Submit Button ── */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full relative overflow-hidden rounded-full text-white font-semibold text-sm tracking-wider transition-all"
                  style={{
                    fontFamily: "var(--font-new-1)",
                    padding:    "14px 28px",
                    background: loading
                      ? "var(--new-neutral-color)"
                      : "linear-gradient(135deg, var(--new-primary-color) 0%, var(--new-purple-color) 60%, #7c3aed 100%)",
                    boxShadow: loading
                      ? "none"
                      : "0 6px 24px rgba(53,16,95,0.35), 0 1px 0 rgba(255,255,255,0.12) inset",
                    letterSpacing: "0.06em",
                    transform: loading ? "none" : undefined,
                  }}
                >
                  {/* shimmer strip */}
                  {!loading && (
                    <span
                      aria-hidden
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.12) 50%, transparent 60%)",
                        backgroundSize: "200% 100%",
                        animation: "shimmer 2.4s infinite linear",
                      }}
                    />
                  )}
                  <span className="relative flex items-center justify-center gap-2.5">
                    {loading ? (
                      <>
                        <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round"/>
                        </svg>
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="22" y1="2" x2="11" y2="13"/>
                          <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                        </svg>
                      </>
                    )}
                  </span>
                  <style>{`@keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}`}</style>
                </button>

              </form>
            )}
          </div>
        </div>
      </section>

      {/* ══════════════════════ CTA BANNER SECTION ══════════════════════ */}
      <section
        className="max-w-6xl mx-auto mt-8 mb-16 rounded-3xl overflow-hidden relative"
        style={{ background: "var(--new-primary-color)", minHeight: "260px" }}
      >
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)", backgroundSize: "28px 28px" }}/>
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full pointer-events-none" style={{ background: "rgba(255,255,255,0.05)" }}/>
        <div className="absolute -bottom-16 right-32 w-48 h-48 rounded-full pointer-events-none" style={{ background: "rgba(255,255,255,0.04)" }}/>

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 px-10 py-14">
          <div className="max-w-lg">
            <h2 className="text-3xl md:text-4xl leading-tight mb-4 text-white" style={{ fontFamily: "var(--font-new-2)" }}>
              Ready to Experience <br />
              <em style={{ fontStyle: "italic", color: "var(--new-accent-color)" }}>Holistic Wellness</em> at Home?
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
              Explore our trusted Ayurvedic care services. Start your wellness journey with Home With Care · Vedraha today!
            </p>
          </div>

          <div className="flex flex-col items-center gap-5 shrink-0">
            {/* Decorative card */}
            <div className="w-64 rounded-2xl p-5 relative overflow-hidden"
              style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.18)", backdropFilter: "blur(8px)" }}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-xs text-white opacity-60 mb-0.5">Home With Care</p>
                  <p className="text-sm font-semibold text-white">Vedraha</p>
                </div>
                <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                  <circle cx="16" cy="16" r="16" fill="rgba(255,255,255,0.15)"/>
                  <path d="M16 22c-3.3-2.1-5-5-5-8 0-1.7.8-3 2-3.8C14 9.4 15 9 16 9c1 0 2 .4 3 1.2 1.2.8 2 2.1 2 3.8 0 3-1.7 5.9-5 8z" fill="var(--new-accent-color)" opacity="0.9"/>
                  <path d="M11 13.5C9.5 14.5 9 16.5 9 18c0 1 .2 2 .6 2.8C8.4 19.8 8 18.4 8 17c0-2.2 1.2-3.8 3-3.5z" fill="rgba(255,255,255,0.5)"/>
                  <path d="M21 13.5C22.5 14.5 23 16.5 23 18c0 1-.2 2-.6 2.8.2-.8.6-2.2.6-3.8 0-2.2-1.2-3.8-3-3.5z" fill="rgba(255,255,255,0.5)"/>
                </svg>
              </div>
              <div className="flex gap-1 mb-4">
                {[1,2,3,4].map(i => (
                  <div key={i} className="flex-1 h-1 rounded-full" style={{ background: i <= 2 ? "var(--new-accent-color)" : "rgba(255,255,255,0.2)" }}/>
                ))}
              </div>
              <p className="text-xs tracking-widest text-white opacity-50">WELLNESS · CARE</p>
            </div>

            <a href="#" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm transition-all hover:scale-105"
              style={{ background: "var(--new-bg-white-color)", color: "var(--new-primary-color)", fontFamily: "var(--font-new-1)", boxShadow: "0 4px 20px rgba(0,0,0,0.18)" }}>
              Book a Consultation
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}