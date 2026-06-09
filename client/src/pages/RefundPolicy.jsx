/**
 * PolicyPage.jsx — Refund & Cancellation Policy
 *
 * Fully Tailwind, matching MyOrdersEnglish exactly:
 * - font-[var(--font-new-1)] body  ·  var(--font-new-2) display / headings
 * - var(--color-black), var(--new-purple-color), var(--new-bg-white-color) from index.css
 * - #21124c primary text  ·  #aaa4b8 muted  ·  #f2eafa purple-tint surface
 * - bg-white border border-[#aaa4b8]/30 rounded-xl shadow-xs cards
 * - <style> only for @keyframes — everything else Tailwind
 * - All content unchanged
 */

// ── Data ──────────────────────────────────────────────────────────────────────

const scenarios = [
  { scenario: "We cannot deliver your session",             status: "yes",  label: "Full Refund",    notes: "Within 3–5 business days, no deductions" },
  { scenario: "Duplicate charge due to technical error",    status: "yes",  label: "Full Refund",    notes: "Resolved within 5 business days" },
  { scenario: "Cancellation 48+ hours before session",      status: "part", label: "Partial Refund", notes: "Minus 2–3% payment gateway fee" },
  { scenario: "Cancellation within 48 hours of session",    status: "no",   label: "No Refund",      notes: "Preparation time already committed" },
  { scenario: "Reading already delivered",                  status: "no",   label: "No Refund",      notes: "Service fully rendered" },
  { scenario: "Session conducted (full or partial)",        status: "no",   label: "No Refund",      notes: "Consultation time has been used" },
  { scenario: "No-show for scheduled session",              status: "no",   label: "No Refund",      notes: "Slot forfeited" },
  { scenario: "Change of mind before session is scheduled", status: "part", label: "Case by Case",   notes: "Assessed based on preparation stage" },
];

const toc = [
  "Understanding Token Payments",
  "When You Are Eligible for a Refund",
  "When Refunds Are Not Issued",
  "Refund Scenarios at a Glance",
  "Cancellation Policy",
  "Rescheduling a Session",
  "How to Request a Refund",
  "Refund Processing Time",
  "Payment Disputes",
  "Changes to This Policy",
  "Contact Us",
];

// ── Sub-components ────────────────────────────────────────────────────────────

/** Badge — matches STATUS_META pill style in MyOrdersEnglish */
function Badge({ status, label }) {
  const styles = {
    yes:  "bg-[var(--color-black)]/10 text-[var(--color-black)] border-[var(--color-black)]/20",
    no:   "bg-[#a81313]/10 text-[#a81313] border-[#a81313]/20",
    part: "bg-[#df8804]/10 text-[#df8804] border-[#df8804]/20",
  };
  const icon = status === "yes" ? "✓" : status === "no" ? "✗" : "~";
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-[11px] font-bold rounded-md border whitespace-nowrap font-[var(--font-new-1)] ${styles[status]}`}>
      {icon} {label}
    </span>
  );
}

/** Section heading — number pill + Times/font-new-2 title */
function SH({ num, title }) {
  return (
    <div className="flex items-center gap-2.5 mb-5">
      <span className="text-[11px] font-bold text-white bg-[var(--color-black)] rounded-md px-2 py-0.5 tracking-wide font-[var(--font-new-1)]">
        {num}
      </span>
      <h2
        className="text-[19px] font-medium text-[#21124c] tracking-tight"
        style={{ fontFamily: "var(--font-new-2)" }}
      >
        {title}
      </h2>
    </div>
  );
}

/** Callout block — #f2eafa bg with left border, mirrors MyOrders accent */
function Callout({ children }) {
  return (
    <div className="bg-[#f2eafa] border-l-[3px] border-[var(--color-black)] rounded-r-lg px-4 py-3.5 my-4 text-[13.5px] text-[var(--new-purple-color)] leading-relaxed font-medium font-[var(--font-new-1)]">
      {children}
    </div>
  );
}

/** Bullet list — separator lines matching MyOrders card rows */
function PList({ items }) {
  return (
    <ul className="my-3.5 mb-4">
      {items.map((item, i) => (
        <li
          key={i}
          className={`flex gap-2.5 py-2.5 text-[13.5px] text-[#6b6080] leading-relaxed font-[var(--font-new-1)] ${
            i < items.length - 1 ? "border-b border-[#aaa4b8]/20" : ""
          }`}
        >
          <span className="text-[#aaa4b8] text-sm flex-shrink-0 mt-0.5">·</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Animated wrapper — identical to MyOrdersEnglish AnimatedSection */
function AnimatedSection({ children, delay = 0, className = "" }) {
  return (
    <div
      className={`animate-fade-in-up ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/** Thin section divider */
function Divider() {
  return <div className="border-t border-[#aaa4b8]/25 mb-10" />;
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function PolicyPage() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="min-h-screen bg-[var(--new-bg-white-color)] pb-24 text-[#21124c] font-[var(--font-new-1)] antialiased px-[1rem]">

      {/* Only keyframes live here — no other CSS */}
      <style>{`
        body { background: var(--new-bg-white-color); }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25%       { transform: translateX(-4px); }
          75%       { transform: translateX(4px); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.4s cubic-bezier(0.16,1,0.3,1) forwards; opacity: 0; }
        .animate-shake       { animation: shake 0.4s ease-in-out; }
      `}</style>

      <div className="w-full max-w-[1260px] mx-auto px-4 sm:px-6 pt-12 mt-12">

        {/* ══ HEADER — same border-b pb-4 mb-6 pattern as MyOrdersEnglish ══ */}
        <AnimatedSection delay={0}>
          <div className="flex items-start justify-between border-b border-[#aaa4b8]/40 pb-4 mb-6">
            <div>
              <p className="text-[11px] font-bold text-[#aaa4b8] tracking-widest uppercase mb-1 font-[var(--font-new-1)]">
                | Vedraha · Legal
              </p>
              <h1 className="text-3xl font-medium text-[#21124c] tracking-tight font-[var(--font-new-1)]">
                Refund &amp;{" "}
                <span className="italic" style={{ fontFamily: "var(--font-new-2)" }}>Cancellation</span>
                {" "}Policy
              </h1>
              <p className="text-xs text-[#aaa4b8] mt-1.5 font-[var(--font-new-1)]">
                Effective: 1 January 2026 &nbsp;·&nbsp; Last Updated: 1 January 2026
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* ══ SUMMARY CARDS ══ */}
        <AnimatedSection delay={50}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              { title: "Service Unfulfilled", body: "Full refund within 3–5 days if we can't deliver your session." },
              { title: "Cancellation by You", body: "48+ hours before session may qualify for a refund." },
              { title: "Token Payments",      body: "Tokens are credited against the full session cost, not charged separately." },
            ].map((c, i) => (
              <div key={i} className="bg-white border border-[#aaa4b8]/30 rounded-xl px-5 py-4 shadow-xs">
                <p className="text-[10.5px] font-bold text-[#aaa4b8] tracking-widest uppercase mb-2 font-[var(--font-new-1)]">
                  {c.title}
                </p>
                <p className="text-[13px] text-[#21124c] leading-relaxed font-[var(--font-new-1)]">{c.body}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* ══ TABLE OF CONTENTS — bg-white card with #fafafa header strip ══ */}
        <AnimatedSection delay={100}>
          <div className="bg-white border border-[#aaa4b8]/30 rounded-xl overflow-hidden shadow-xs mb-10">
            <div className="flex items-center gap-2 px-6 py-3.5 bg-[#fafafa] border-b border-[#aaa4b8]/20">
              <span className="text-[10.5px] font-bold text-[#aaa4b8] tracking-widest uppercase font-[var(--font-new-1)]">
                Table of Contents
              </span>
            </div>
            <div className="px-6 py-5">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                {toc.map((item, i) => (
                  <li
                    key={i}
                    onClick={() => scrollTo(`s${i + 1}`)}
                    className="flex items-baseline gap-2.5 py-[5px] cursor-pointer group"
                  >
                    <span className="text-[11px] font-bold text-[#aaa4b8]/50 min-w-[22px] font-[var(--font-new-1)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[13px] text-[#21124c] group-hover:text-[var(--new-purple-color)] transition-colors duration-150 font-[var(--font-new-1)]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </AnimatedSection>

        {/* ══ S01 ══ */}
        <AnimatedSection delay={140}>
          <section className="mb-10" id="s1">
            <SH num={1} title="Understanding Token Payments" />
            <p className="text-[14px] text-[#6b6080] leading-[1.85] mb-3 font-[var(--font-new-1)]">
              When you book a session, you pay a token amount to confirm your booking. Here is what you need to know:
            </p>
            <PList items={[
              "The token is not a standalone charge — it is a deposit credited toward the total session cost.",
              "It reserves your slot and allows us to begin preparing your personalized blueprint.",
              "You will not be charged the token in addition to the session fee.",
              "Any remaining balance is collected before or at the time of your session.",
            ]} />
            <Callout>Think of the token as a booking deposit — it confirms your place and ensures we dedicate time to your reading.</Callout>
          </section>
        </AnimatedSection>
        <Divider />

        {/* ══ S02 ══ */}
        <AnimatedSection delay={160}>
          <section className="mb-10" id="s2">
            <SH num={2} title="When You Are Eligible for a Refund" />
            <p className="text-[14px] text-[#6b6080] leading-[1.85] mb-3 font-[var(--font-new-1)]">
              We issue refunds promptly in the following circumstances:
            </p>
            <PList items={[
              <><strong className="text-[#21124c] font-semibold">We cannot fulfil your session:</strong> You will receive a full refund. No questions asked.</>,
              <><strong className="text-[#21124c] font-semibold">Duplicate payment:</strong> The duplicate amount will be refunded in full.</>,
              <><strong className="text-[#21124c] font-semibold">Cancellation 48+ hours before session:</strong> Token refunded minus 2–3% Razorpay gateway fees.</>,
              <><strong className="text-[#21124c] font-semibold">Technical payment failure:</strong> If your payment failed but was debited, we will investigate and refund in full.</>,
            ]} />
            <p className="text-[14px] text-[#6b6080] leading-[1.85] font-[var(--font-new-1)]">
              Refunds are always returned to the original payment method.
            </p>
          </section>
        </AnimatedSection>
        <Divider />

        {/* ══ S03 ══ */}
        <AnimatedSection delay={180}>
          <section className="mb-10" id="s3">
            <SH num={3} title="When Refunds Are Not Issued" />
            <PList items={[
              <><strong className="text-[#21124c] font-semibold">After reading delivered:</strong> Once your blueprint has been shared, the payment is non-refundable.</>,
              <><strong className="text-[#21124c] font-semibold">After 1:1 session conducted:</strong> Once a consultation has taken place, in full or in part, no refund is issued.</>,
              <><strong className="text-[#21124c] font-semibold">Change of mind post-delivery:</strong> Disagreement with insights does not qualify for a refund.</>,
              <><strong className="text-[#21124c] font-semibold">Cancellation within 48 hours:</strong> Preparation time has already been committed.</>,
              <><strong className="text-[#21124c] font-semibold">No-show:</strong> If you miss your session without notice, the token is forfeited.</>,
              <><strong className="text-[#21124c] font-semibold">Partial use:</strong> If you disengage mid-session, no partial refund is issued.</>,
            ]} />
            <Callout>Please ensure you are ready and committed before booking.</Callout>
          </section>
        </AnimatedSection>
        <Divider />

        {/* ══ S04 — Table ══ */}
        <AnimatedSection delay={200}>
          <section className="mb-10" id="s4">
            <SH num={4} title="Refund Scenarios at a Glance" />
            <div className="overflow-x-auto border border-[#aaa4b8]/30 rounded-xl shadow-xs">
              <table className="w-full border-collapse text-[13.5px]">
                <thead>
                  <tr>
                    {["Scenario", "Status", "Notes"].map((h) => (
                      <th
                        key={h}
                        className="bg-[#fafafa] text-[10.5px] font-bold text-[#aaa4b8] tracking-widest uppercase px-5 py-3 text-left border-b border-[#aaa4b8]/20 font-[var(--font-new-1)]"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {scenarios.map((r, i) => (
                    <tr key={i} className="hover:bg-[#fafafa] transition-colors duration-100">
                      <td className={`px-5 py-3 text-[#21124c] font-semibold text-[13px] font-[var(--font-new-1)] ${i < scenarios.length - 1 ? "border-b border-[#aaa4b8]/15" : ""}`}>
                        {r.scenario}
                      </td>
                      <td className={`px-5 py-3 ${i < scenarios.length - 1 ? "border-b border-[#aaa4b8]/15" : ""}`}>
                        <Badge status={r.status} label={r.label} />
                      </td>
                      <td className={`px-5 py-3 text-[#6b6080] text-[13px] leading-relaxed font-[var(--font-new-1)] ${i < scenarios.length - 1 ? "border-b border-[#aaa4b8]/15" : ""}`}>
                        {r.notes}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </AnimatedSection>
        <Divider />

        {/* ══ S05 — Timeline ══ */}
        <AnimatedSection delay={210}>
          <section className="mb-10" id="s5">
            <SH num={5} title="Cancellation Policy" />
            <p className="text-[14px] text-[#6b6080] leading-[1.85] mb-5 font-[var(--font-new-1)]">
              The refund you receive depends on when you cancel relative to your session:
            </p>
            <div className="border-l-2 border-[#aaa4b8]/30 pl-5 space-y-5">
              {[
                { l: "48+ hours before session",   b: "Token refunded minus 2–3% gateway fee. Contact us via email or WhatsApp." },
                { l: "24–48 hours before session", b: "Assessed case by case. No guarantee of refund; we may offer reschedule credit." },
                { l: "Less than 24 hours before",  b: "No refund. Preparation is complete. Reschedule may be available." },
                { l: "After reading is delivered", b: "No refund. Service has been fully rendered." },
              ].map((x, i) => (
                <div key={i} className="relative">
                  {/* Timeline dot — same style as OrderDetailEnglish stepper */}
                  <div className="absolute -left-[25px] top-[5px] w-2 h-2 rounded-full bg-[var(--color-black)] border-2 border-[#f2eafa] ring-2 ring-[var(--color-black)]" />
                  <p className="text-[11.5px] font-bold text-[var(--new-purple-color)] uppercase tracking-widest mb-1 font-[var(--font-new-1)]">
                    {x.l}
                  </p>
                  <p className="text-[13.5px] text-[#6b6080] leading-relaxed font-[var(--font-new-1)]">{x.b}</p>
                </div>
              ))}
            </div>
          </section>
        </AnimatedSection>
        <Divider />

        {/* ══ S06 ══ */}
        <AnimatedSection delay={220}>
          <section className="mb-10" id="s6">
            <SH num={6} title="Rescheduling a Session" />
            <PList items={[
              "Requests made 24+ hours before your session are typically accommodated without penalty.",
              "Requests within 24 hours are handled case by case and cannot be guaranteed.",
              "Each booking gets one free reschedule. Further requests may require a rebooking fee.",
              "Rescheduling is not available after your reading has been delivered.",
            ]} />
            <Callout>Please reach out as early as possible via WhatsApp or email.</Callout>
          </section>
        </AnimatedSection>
        <Divider />

        {/* ══ S07 — Steps ══ */}
        <AnimatedSection delay={230}>
          <section className="mb-10" id="s7">
            <SH num={7} title="How to Request a Refund" />
            <div className="space-y-5 mt-1">
              {[
                { t: "Contact us within 7 days",    b: "Requests made after 7 days may not be processed." },
                { t: "Provide booking details",      b: "Include your name, email, Razorpay payment reference ID, and reason." },
                { t: "We review and respond",        b: "Acknowledged within 2 business days; decision within 5 business days." },
                { t: "Refund processed if approved", b: "Initiated immediately; reflects in your account within 3–7 business days." },
              ].map((x, i) => (
                <div key={i} className="flex gap-4">
                  {/* Step number — matches EditProfilePanel step style */}
                  <div className="w-7 h-7 rounded-full bg-[#f2eafa] border border-[var(--color-black)]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[12px] font-bold text-[var(--color-black)] font-[var(--font-new-1)]">{i + 1}</span>
                  </div>
                  <div>
                    <p className="text-[13.5px] font-semibold text-[#21124c] mb-1 font-[var(--font-new-1)]">{x.t}</p>
                    <p className="text-[13.5px] text-[#6b6080] leading-relaxed font-[var(--font-new-1)]">{x.b}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </AnimatedSection>
        <Divider />

        {/* ══ S08 — Processing time mini-cards ══ */}
        <AnimatedSection delay={240}>
          <section className="mb-10" id="s8">
            <SH num={8} title="Refund Processing Time" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
              {[
                { m: "UPI",              t: "1–3 days" },
                { m: "Debit / Credit",   t: "5–7 days" },
                { m: "Net Banking",      t: "3–5 days" },
                { m: "Wallets",          t: "1–3 days" },
              ].map((x, i) => (
                <div key={i} className="bg-white border border-[#aaa4b8]/30 rounded-xl px-4 py-4 text-center shadow-xs">
                  <p className="text-[10.5px] font-bold text-[#aaa4b8] tracking-widest uppercase mb-2 font-[var(--font-new-1)]">
                    {x.m}
                  </p>
                  <p
                    className="text-[18px] font-medium text-[var(--color-black)]"
                    style={{ fontFamily: "var(--font-new-2)" }}
                  >
                    {x.t}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-[14px] text-[#6b6080] leading-[1.85] font-[var(--font-new-1)]">
              These timelines are set by Razorpay and your bank. If your refund hasn't appeared after 10 business days, contact us and we'll follow up.
            </p>
            <Callout>Refunds are always returned to the original payment method only.</Callout>
          </section>
        </AnimatedSection>
        <Divider />

        {/* ══ S09 ══ */}
        <AnimatedSection delay={250}>
          <section className="mb-10" id="s9">
            <SH num={9} title="Payment Disputes" />
            <p className="text-[14px] text-[#6b6080] leading-[1.85] mb-3 font-[var(--font-new-1)]">
              Please contact us before raising a chargeback. Most issues are resolved quickly and directly.
            </p>
            <PList items={[
              "We will respond to any chargeback with full evidence of service delivery and policy.",
              "Unjustified chargebacks may result in future bookings being declined.",
              "We cooperate fully with Razorpay and the relevant financial institution.",
            ]} />
            <Callout>Our goal is always a fair resolution. Please reach out to us first.</Callout>
          </section>
        </AnimatedSection>
        <Divider />

        {/* ══ S10 ══ */}
        <AnimatedSection delay={260}>
          <section className="mb-10" id="s10">
            <SH num={10} title="Changes to This Policy" />
            <p className="text-[14px] text-[#6b6080] leading-[1.85] font-[var(--font-new-1)]">
              We may update this policy at any time. Changes take effect immediately upon posting. For bookings made before an update, the policy at time of booking applies.
            </p>
          </section>
        </AnimatedSection>
        <Divider />

        {/* ══ S11 — Contact ══ */}
        <AnimatedSection delay={270}>
          <section className="mb-10" id="s11">
            <SH num={11} title="Contact Us" />
            <p className="text-[14px] text-[#6b6080] leading-[1.85] mb-5 font-[var(--font-new-1)]">
              For refund requests, cancellations, or questions, reach out directly. We respond to all refund messages within 2 business days.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { lbl: "✉ Email",   val: "support@vedraha.com", note: "Best for refund requests — include your payment reference ID" },
                { lbl: "💬 WhatsApp", val: "+91 XXXXX XXXXX",    note: "Best for quick queries and rescheduling" },
              ].map((c, i) => (
                <div key={i} className="bg-white border border-[#aaa4b8]/30 rounded-xl px-5 py-5 shadow-xs">
                  <p className="text-[10.5px] font-bold text-[#aaa4b8] tracking-widest uppercase mb-2.5 font-[var(--font-new-1)]">
                    {c.lbl}
                  </p>
                  <p className="text-[14px] font-semibold text-[#21124c] mb-1.5 font-[var(--font-new-1)]">{c.val}</p>
                  <p className="text-[12.5px] text-[#6b6080] leading-relaxed font-[var(--font-new-1)]">{c.note}</p>
                </div>
              ))}
            </div>
          </section>
        </AnimatedSection>

        {/* ══ FOOTER — mirrors MyOrdersEnglish border-b / justify-between pattern ══ */}
        <AnimatedSection delay={300}>
          <footer className="border-t border-[#aaa4b8]/30 pt-7 mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 flex-wrap">
            <div>
              <p
                className="text-[14px] font-medium text-[#21124c]"
                style={{ fontFamily: "var(--font-new-2)" }}
              >
                Vedraha
              </p>
              <p className="text-[12px] text-[#aaa4b8] mt-0.5 font-[var(--font-new-1)]">
                Numerology &amp; Manifestation
              </p>
            </div>
            <div className="flex gap-5 flex-wrap">
              {["Main Site", "VSL Page", "Thank You", "Privacy Policy"].map((l) => (
                <a
                  key={l}
                  href="#"
                  className="text-[13px] text-[#aaa4b8] hover:text-[var(--new-purple-color)] transition-colors duration-150 font-[var(--font-new-1)]"
                >
                  {l}
                </a>
              ))}
            </div>
          </footer>
        </AnimatedSection>

      </div>
    </div>
  );
}