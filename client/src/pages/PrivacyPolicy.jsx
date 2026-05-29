const style = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:         #ffffff;
    --surface:    #f6f9f7;
    --border:     #d8e6de;
    --green:      #2d6a4f;
    --green-lt:   #e8f5ee;
    --gold:       #b8912a;
    --gold-lt:    #fdf6e3;
    --text:       #1a2e24;
    --muted:      #6b8076;
    --yes:        #1e7a45;
    --yes-bg:     #edf7f1;
    --no:         #c0392b;
    --no-bg:      #fdf0ee;
    --maybe:      #a07000;
    --maybe-bg:   #fdf6e3;
  }

  body { background: var(--bg); font-family: 'Inter', sans-serif; color: var(--text); }

  .page { max-width: 780px; margin: 0 auto; padding: 48px 24px 80px; }

  /* Header */
  .header { margin-bottom: 48px; padding-bottom: 24px; border-bottom: 2px solid var(--green); }
  .header-label {
    font-size: 11px; font-weight: 600; letter-spacing: 0.12em;
    text-transform: uppercase; color: var(--green); margin-bottom: 12px;
  }
  .header h1 { font-size: 28px; font-weight: 600; color: var(--text); margin-bottom: 8px; }
  .header-meta { font-size: 13px; color: var(--muted); }

  /* Summary cards */
  .cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; margin-bottom: 48px; }
  .card { background: var(--surface); border: 1px solid var(--border); border-radius: 6px; padding: 20px; }
  .card-title { font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: var(--green); margin-bottom: 6px; }
  .card-body { font-size: 13px; color: var(--muted); line-height: 1.6; }

  /* TOC */
  .toc { background: var(--surface); border: 1px solid var(--border); border-radius: 6px; padding: 24px; margin-bottom: 48px; }
  .toc-title { font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: var(--muted); margin-bottom: 16px; }
  .toc-list { list-style: none; columns: 2; gap: 0; }
  .toc-item { display: flex; align-items: baseline; gap: 8px; padding: 5px 0; cursor: pointer; }
  .toc-item:hover .toc-t { color: var(--green); }
  .toc-n { font-size: 11px; font-weight: 600; color: var(--border); min-width: 20px; }
  .toc-t { font-size: 13px; color: var(--text); }

  /* Sections */
  .sec { margin-bottom: 48px; scroll-margin-top: 24px; }
  .sec-head { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
  .sec-num { font-size: 11px; font-weight: 600; color: var(--bg); background: var(--green); border-radius: 4px; padding: 2px 8px; }
  .sec-title { font-size: 18px; font-weight: 600; color: var(--text); }

  .divider { border: none; border-top: 1px solid var(--border); margin: 40px 0; }

  /* Body */
  .body p { font-size: 15px; line-height: 1.8; color: var(--muted); margin-bottom: 14px; }
  .body strong { color: var(--text); font-weight: 500; }

  /* Callout */
  .callout { background: var(--green-lt); border-left: 3px solid var(--green); border-radius: 0 4px 4px 0; padding: 14px 18px; margin: 18px 0; font-size: 14px; color: var(--green); line-height: 1.7; }

  /* List */
  .plist { list-style: none; margin: 14px 0 18px; }
  .plist li { display: flex; gap: 10px; padding: 10px 0; border-bottom: 1px solid var(--border); font-size: 14px; color: var(--muted); line-height: 1.7; }
  .plist li:last-child { border-bottom: none; }
  .li-dot { color: var(--gold); font-size: 16px; line-height: 1.4; flex-shrink: 0; }

  /* Badges */
  .badge { display: inline-flex; align-items: center; gap: 4px; font-size: 11px; font-weight: 600; padding: 3px 8px; border-radius: 4px; white-space: nowrap; }
  .b-yes  { background: var(--yes-bg);   color: var(--yes); }
  .b-no   { background: var(--no-bg);    color: var(--no); }
  .b-part { background: var(--maybe-bg); color: var(--maybe); }

  /* Table */
  .tbl-wrap { overflow-x: auto; border: 1px solid var(--border); border-radius: 6px; margin: 16px 0; }
  .tbl { width: 100%; border-collapse: collapse; font-size: 14px; }
  .tbl th { background: var(--surface); font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: var(--muted); padding: 12px 16px; text-align: left; border-bottom: 1px solid var(--border); }
  .tbl td { padding: 12px 16px; border-bottom: 1px solid var(--border); vertical-align: top; color: var(--muted); line-height: 1.5; }
  .tbl tr:last-child td { border-bottom: none; }
  .tbl tbody tr:hover td { background: var(--surface); }
  .td-s { color: var(--text); font-weight: 500; }

  /* Timeline */
  .tl { border-left: 2px solid var(--border); padding-left: 20px; margin: 16px 0; }
  .tl-item { position: relative; margin-bottom: 20px; }
  .tl-item::before { content: ''; position: absolute; left: -26px; top: 5px; width: 8px; height: 8px; border-radius: 50%; background: var(--green); }
  .tl-label { font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: var(--green); margin-bottom: 4px; }
  .tl-body { font-size: 14px; color: var(--muted); line-height: 1.7; }

  /* Steps */
  .steps { margin: 16px 0; }
  .step { display: flex; gap: 16px; margin-bottom: 20px; }
  .step-n { font-size: 13px; font-weight: 700; color: var(--green); background: var(--green-lt); border-radius: 50%; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px; }
  .step-t { font-size: 14px; font-weight: 600; color: var(--text); margin-bottom: 4px; }
  .step-b { font-size: 14px; color: var(--muted); line-height: 1.7; }

  /* Processing */
  .proc-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px; margin: 16px 0; }
  .proc-card { background: var(--surface); border: 1px solid var(--border); border-radius: 6px; padding: 16px; text-align: center; }
  .pc-m { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: var(--muted); margin-bottom: 6px; }
  .pc-t { font-size: 18px; font-weight: 600; color: var(--green); }

  /* Contact */
  .contact-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px; margin: 16px 0; }
  .contact-card { background: var(--surface); border: 1px solid var(--border); border-radius: 6px; padding: 20px; }
  .cc-lbl { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: var(--muted); margin-bottom: 8px; }
  .cc-val { font-size: 15px; font-weight: 500; color: var(--text); margin-bottom: 6px; }
  .cc-note { font-size: 13px; color: var(--muted); line-height: 1.6; }

  /* Footer */
  .footer { border-top: 1px solid var(--border); padding-top: 32px; margin-top: 48px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; }
  .footer-brand { font-size: 14px; font-weight: 600; color: var(--text); }
  .footer-sub { font-size: 12px; color: var(--muted); }
  .footer-links { display: flex; gap: 20px; flex-wrap: wrap; }
  .footer-links a { font-size: 13px; color: var(--muted); text-decoration: none; }
  .footer-links a:hover { color: var(--green); }

  @media (max-width: 540px) {
    .toc-list { columns: 1; }
    .footer { flex-direction: column; align-items: flex-start; }
  }
`;

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
  "Understanding Token Payments", "When You Are Eligible for a Refund", "When Refunds Are Not Issued",
  "Refund Scenarios at a Glance", "Cancellation Policy", "Rescheduling a Session",
  "How to Request a Refund", "Refund Processing Time", "Payment Disputes",
  "Changes to This Policy", "Contact Us",
];

const Badge = ({ status, label }) => {
  const cls = status === "yes" ? "badge b-yes" : status === "no" ? "badge b-no" : "badge b-part";
  const icon = status === "yes" ? "✓" : status === "no" ? "✗" : "~";
  return <span className={cls}>{icon} {label}</span>;
};

const SH = ({ num, title }) => (
  <div className="sec-head">
    <span className="sec-num">{num}</span>
    <h2 className="sec-title">{title}</h2>
  </div>
);

export default function PolicyPage() {
  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <style>{style}</style>
      <div className="page">

        {/* Header */}
        <header className="header">
          <div className="header-label">Vedraha · Legal</div>
          <h1>Refund &amp; Cancellation Policy</h1>
          <div className="header-meta">Effective: 1 January 2026 &nbsp;·&nbsp; Last Updated: 1 January 2026</div>
        </header>

        {/* Summary Cards */}
        <div className="cards">
          {[
            { title: "Service Unfulfilled",  body: "Full refund within 3–5 days if we can't deliver your session." },
            { title: "Cancellation by You",  body: "48+ hours before session may qualify for a refund." },
            { title: "Token Payments",       body: "Tokens are credited against the full session cost, not charged separately." },
          ].map((c, i) => (
            <div className="card" key={i}>
              <div className="card-title">{c.title}</div>
              <div className="card-body">{c.body}</div>
            </div>
          ))}
        </div>

        {/* TOC */}
        <div className="toc">
          <div className="toc-title">Table of Contents</div>
          <ul className="toc-list">
            {toc.map((item, i) => (
              <li key={i} className="toc-item" onClick={() => scrollTo(`s${i + 1}`)}>
                <span className="toc-n">{String(i + 1).padStart(2, "0")}</span>
                <span className="toc-t">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* S01 */}
        <section className="sec" id="s1">
          <SH num={1} title="Understanding Token Payments" />
          <div className="body">
            <p>When you book a session, you pay a token amount to confirm your booking. Here is what you need to know:</p>
            <ul className="plist">
              {["The token is not a standalone charge — it is a deposit credited toward the total session cost.",
                "It reserves your slot and allows us to begin preparing your personalized blueprint.",
                "You will not be charged the token in addition to the session fee.",
                "Any remaining balance is collected before or at the time of your session."]
                .map((t, i) => <li key={i}><span className="li-dot">·</span><span>{t}</span></li>)}
            </ul>
            <div className="callout">Think of the token as a booking deposit — it confirms your place and ensures we dedicate time to your reading.</div>
          </div>
        </section>
        <hr className="divider" />

        {/* S02 */}
        <section className="sec" id="s2">
          <SH num={2} title="When You Are Eligible for a Refund" />
          <div className="body">
            <p>We issue refunds promptly in the following circumstances:</p>
            <ul className="plist">
              {[
                { t: "We cannot fulfil your session:", b: "You will receive a full refund. No questions asked." },
                { t: "Duplicate payment:", b: "The duplicate amount will be refunded in full." },
                { t: "Cancellation 48+ hours before session:", b: "Token refunded minus 2–3% Razorpay gateway fees." },
                { t: "Technical payment failure:", b: "If your payment failed but was debited, we will investigate and refund in full." },
              ].map((x, i) => <li key={i}><span className="li-dot">·</span><span><strong>{x.t}</strong> {x.b}</span></li>)}
            </ul>
            <p>Refunds are always returned to the original payment method.</p>
          </div>
        </section>
        <hr className="divider" />

        {/* S03 */}
        <section className="sec" id="s3">
          <SH num={3} title="When Refunds Are Not Issued" />
          <div className="body">
            <ul className="plist">
              {[
                { t: "After reading delivered:", b: "Once your blueprint has been shared, the payment is non-refundable." },
                { t: "After 1:1 session conducted:", b: "Once a consultation has taken place, in full or in part, no refund is issued." },
                { t: "Change of mind post-delivery:", b: "Disagreement with insights does not qualify for a refund." },
                { t: "Cancellation within 48 hours:", b: "Preparation time has already been committed." },
                { t: "No-show:", b: "If you miss your session without notice, the token is forfeited." },
                { t: "Partial use:", b: "If you disengage mid-session, no partial refund is issued." },
              ].map((x, i) => <li key={i}><span className="li-dot">·</span><span><strong>{x.t}</strong> {x.b}</span></li>)}
            </ul>
            <div className="callout">Please ensure you are ready and committed before booking.</div>
          </div>
        </section>
        <hr className="divider" />

        {/* S04 */}
        <section className="sec" id="s4">
          <SH num={4} title="Refund Scenarios at a Glance" />
          <div className="tbl-wrap">
            <table className="tbl">
              <thead>
                <tr><th>Scenario</th><th>Status</th><th>Notes</th></tr>
              </thead>
              <tbody>
                {scenarios.map((r, i) => (
                  <tr key={i}>
                    <td className="td-s">{r.scenario}</td>
                    <td><Badge status={r.status} label={r.label} /></td>
                    <td>{r.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <hr className="divider" />

        {/* S05 */}
        <section className="sec" id="s5">
          <SH num={5} title="Cancellation Policy" />
          <div className="body">
            <p>The refund you receive depends on when you cancel relative to your session:</p>
            <div className="tl">
              {[
                { l: "48+ hours before session",       b: "Token refunded minus 2–3% gateway fee. Contact us via email or WhatsApp." },
                { l: "24–48 hours before session",     b: "Assessed case by case. No guarantee of refund; we may offer reschedule credit." },
                { l: "Less than 24 hours before",      b: "No refund. Preparation is complete. Reschedule may be available." },
                { l: "After reading is delivered",     b: "No refund. Service has been fully rendered." },
              ].map((x, i) => (
                <div className="tl-item" key={i}>
                  <div className="tl-label">{x.l}</div>
                  <div className="tl-body">{x.b}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <hr className="divider" />

        {/* S06 */}
        <section className="sec" id="s6">
          <SH num={6} title="Rescheduling a Session" />
          <div className="body">
            <ul className="plist">
              {["Requests made 24+ hours before your session are typically accommodated without penalty.",
                "Requests within 24 hours are handled case by case and cannot be guaranteed.",
                "Each booking gets one free reschedule. Further requests may require a rebooking fee.",
                "Rescheduling is not available after your reading has been delivered."]
                .map((t, i) => <li key={i}><span className="li-dot">·</span><span>{t}</span></li>)}
            </ul>
            <div className="callout">Please reach out as early as possible via WhatsApp or email.</div>
          </div>
        </section>
        <hr className="divider" />

        {/* S07 */}
        <section className="sec" id="s7">
          <SH num={7} title="How to Request a Refund" />
          <div className="body">
            <div className="steps">
              {[
                { t: "Contact us within 7 days",        b: "Requests made after 7 days may not be processed." },
                { t: "Provide booking details",          b: "Include your name, email, Razorpay payment reference ID, and reason." },
                { t: "We review and respond",            b: "Acknowledged within 2 business days; decision within 5 business days." },
                { t: "Refund processed if approved",     b: "Initiated immediately; reflects in your account within 3–7 business days." },
              ].map((x, i) => (
                <div className="step" key={i}>
                  <div className="step-n">{i + 1}</div>
                  <div>
                    <div className="step-t">{x.t}</div>
                    <div className="step-b">{x.b}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <hr className="divider" />

        {/* S08 */}
        <section className="sec" id="s8">
          <SH num={8} title="Refund Processing Time" />
          <div className="body">
            <div className="proc-grid">
              {[
                { m: "UPI",              t: "1–3 days" },
                { m: "Debit / Credit",   t: "5–7 days" },
                { m: "Net Banking",      t: "3–5 days" },
                { m: "Wallets",          t: "1–3 days" },
              ].map((x, i) => (
                <div className="proc-card" key={i}>
                  <div className="pc-m">{x.m}</div>
                  <div className="pc-t">{x.t}</div>
                </div>
              ))}
            </div>
            <p>These timelines are set by Razorpay and your bank. If your refund hasn't appeared after 10 business days, contact us and we'll follow up.</p>
            <div className="callout">Refunds are always returned to the original payment method only.</div>
          </div>
        </section>
        <hr className="divider" />

        {/* S09 */}
        <section className="sec" id="s9">
          <SH num={9} title="Payment Disputes" />
          <div className="body">
            <p>Please contact us before raising a chargeback. Most issues are resolved quickly and directly.</p>
            <ul className="plist">
              {["We will respond to any chargeback with full evidence of service delivery and policy.",
                "Unjustified chargebacks may result in future bookings being declined.",
                "We cooperate fully with Razorpay and the relevant financial institution."]
                .map((t, i) => <li key={i}><span className="li-dot">·</span><span>{t}</span></li>)}
            </ul>
            <div className="callout">Our goal is always a fair resolution. Please reach out to us first.</div>
          </div>
        </section>
        <hr className="divider" />

        {/* S10 */}
        <section className="sec" id="s10">
          <SH num={10} title="Changes to This Policy" />
          <div className="body">
            <p>We may update this policy at any time. Changes take effect immediately upon posting. For bookings made before an update, the policy at time of booking applies.</p>
          </div>
        </section>
        <hr className="divider" />

        {/* S11 */}
        <section className="sec" id="s11">
          <SH num={11} title="Contact Us" />
          <div className="body">
            <p>For refund requests, cancellations, or questions, reach out directly. We respond to all refund messages within 2 business days.</p>
            <div className="contact-grid">
              <div className="contact-card">
                <div className="cc-lbl">✉ Email</div>
                <div className="cc-val">support@vedraha.com</div>
                <div className="cc-note">Best for refund requests — include your payment reference ID</div>
              </div>
              <div className="contact-card">
                <div className="cc-lbl">💬 WhatsApp</div>
                <div className="cc-val">+91 XXXXX XXXXX</div>
                <div className="cc-note">Best for quick queries and rescheduling</div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div>
            <div className="footer-brand">Vedraha</div>
            <div className="footer-sub">Numerology &amp; Manifestation</div>
          </div>
          <div className="footer-links">
            <a href="#">Main Site</a>
            <a href="#">VSL Page</a>
            <a href="#">Thank You</a>
            <a href="#">Privacy Policy</a>
          </div>
        </footer>

      </div>
    </>
  );
}