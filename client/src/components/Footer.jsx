import React from 'react';
import paymentImg from "./assets/allpayment.png";

const footerLinks = [
  { heading: 'Company', links: ['About Us', 'Blogs', 'Contact Us', 'Career'] },
  { heading: 'Customer Services', links: ['My Account', 'Track Your Order', 'Return', 'FAQ'] },
  { heading: 'Our Information', links: ['Privacy', 'User Terms & Condition', 'Return Policy'] },
];

const contactInfo = {
  heading: 'Contact Info',
  phone: '+0123-456-789',
  email: 'example@gmail.com',
  address: '8502 Preston Rd. Inglewood, Maine 98380',
};

const socialLinks = [
  {
    label: 'Facebook', href: '#',
    icon: <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '14px', height: '14px' }}><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>,
  },
  {
    label: 'X (Twitter)', href: '#',
    icon: <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '14px', height: '14px' }}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>,
  },
  {
    label: 'Pinterest', href: '#',
    icon: <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '14px', height: '14px' }}><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" /></svg>,
  },
  {
    label: 'Instagram', href: '#',
    icon: <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '14px', height: '14px' }}><rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="17.5" cy="6.5" r="1" /></svg>,
  },
  {
    label: 'YouTube', href: '#',
    icon: <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '14px', height: '14px' }}><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z" /><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" /></svg>,
  },
];

// ─── RESPONSIVE STYLES ────────────────────────────────────────────────────────
const styles = `
  .footer-root {
    background-color: var(--color-off-white);
    font-family: var(--font-body);
    padding: 0 1.5rem 1.5rem;
  }

  .footer-card {
    max-width: 1240px;
    margin: 0 auto;
    background-color: var(--color-white);
    border-radius: var(--radius-2xl);
    border: 1px solid var(--color-placeholder);
    box-shadow: var(--shadow-card);
    overflow: hidden;
  }

  /* ── Grid: desktop default — 5 columns (brand + 3 links + contact) ── */
  .footer-grid {
    display: grid;
    grid-template-columns: 1.4fr 1fr 1.2fr 1fr 1.1fr;
    gap: 2.5rem;
    padding: 2.5rem;
    align-items: start;
  }

  /* ── lg tablet (≤1024px): 3 cols, contact wraps below ── */
  @media (max-width: 1024px) {
    .footer-grid {
      grid-template-columns: 1fr 1fr 1fr;
      gap: 2rem;
    }
    /* brand spans full width on its own row */
    .footer-brand {
      grid-column: 1 / -1;
      max-width: 100%;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: flex-start;
      gap: 1.5rem;
    }
    .footer-brand-text {
      flex: 1 1 200px;
    }
    .footer-brand-social {
      flex: 1 1 180px;
      justify-content: flex-start;
    }
    .footer-contact {
      grid-column: 1 / -1;
      flex-direction: row;
      flex-wrap: wrap;
      gap: 1.5rem;
      align-items: flex-end;
    }
    .footer-contact-details {
      flex: 1 1 200px;
    }
    .footer-payment-wrap {
      flex: 1 1 auto;
      justify-content: flex-end;
    }
  }

  /* ── md (≤768px): 2 cols ── */
  @media (max-width: 768px) {
    .footer-root {
      padding: 0 1rem 1rem;
    }
    .footer-grid {
      grid-template-columns: 1fr 1fr;
      gap: 1.75rem;
      padding: 2rem;
    }
    .footer-brand {
      grid-column: 1 / -1;
      flex-direction: column;
    }
    .footer-brand-text {
      flex: unset;
    }
    .footer-contact {
      grid-column: 1 / -1;
      flex-direction: column;
      gap: 1rem;
    }
    .footer-payment-wrap {
      justify-content: flex-start;
    }
    .footer-bottom {
      padding: 1rem 2rem;
    }
    .footer-divider {
      margin: 0 2rem;
    }
  }

  /* ── sm (≤480px): single column ── */
  @media (max-width: 480px) {
    .footer-root {
      padding: 0 0.75rem 0.75rem;
    }
    .footer-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
      padding: 1.5rem;
    }
    .footer-brand {
      grid-column: unset;
    }
    .footer-contact {
      grid-column: unset;
    }
    .footer-payment-wrap {
      justify-content: flex-start;
    }
    .footer-bottom {
      padding: 1rem 1.5rem;
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
    }
    .footer-divider {
      margin: 0 1.5rem;
    }
  }
`;

// ─── LOGO ─────────────────────────────────────────────────────────────────────
const Logo = () => (
  <a href="/" className="nh-logo" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
    <img
      src="https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=nabhiLogo.webp&version_id=null"
      alt="Nabhi Amrit"
      style={{ width: '55px', height: 'auto' }}
    />
    <span style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--color-heading)', fontFamily: 'var(--font-display)', letterSpacing: '-0.01em', marginLeft: '8px' }}>
      Vedraha<span style={{ color: 'var(--color-gold)' }}>.</span>
    </span>
  </a>
);

// ─── SOCIAL BUTTON ────────────────────────────────────────────────────────────
const SocialBtn = ({ label, href, icon }) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <a
      href={href}
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '32px', height: '32px',
        borderRadius: 'var(--radius-pill)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: `1px solid ${hovered ? 'var(--color-primary)' : 'var(--color-placeholder)'}`,
        color: hovered ? 'var(--color-primary)' : 'var(--color-muted)',
        backgroundColor: hovered ? 'var(--color-primary-light)' : 'transparent',
        transition: 'var(--transition-base)',
        transform: hovered ? 'scale(1.1)' : 'scale(1)',
        textDecoration: 'none',
        flexShrink: 0,
      }}
    >
      {icon}
    </a>
  );
};

// ─── FOOTER LINK ──────────────────────────────────────────────────────────────
const FooterLink = ({ label }) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <li>
      <a
        href="#"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          color: hovered ? 'var(--color-gold)' : 'var(--color-muted)',
          fontSize: '0.875rem',
          fontFamily: 'var(--font-body)',
          transition: 'var(--transition-fast)',
          textDecoration: 'none',
        }}
      >
        {label}
      </a>
    </li>
  );
};

// ─── COLUMN HEADING ───────────────────────────────────────────────────────────
const ColHeading = ({ children }) => (
  <h4 style={{
    color: 'var(--color-heading)',
    fontSize: '0.9375rem',
    fontWeight: '700',
    fontFamily: 'var(--font-body)',
    margin: '0 0 1rem 0',
  }}>
    {children}
  </h4>
);

// ─── MAIN FOOTER ──────────────────────────────────────────────────────────────
export default function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--color-off-white)', fontFamily: 'var(--font-body)', padding: '0 1.5rem 1.5rem' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto', backgroundColor: 'var(--color-white)', borderRadius: 'var(--radius-2xl)', border: '1px solid var(--color-placeholder)', boxShadow: 'var(--shadow-card)', overflow: 'hidden' }}>
        <div className='gap-[2rem] md:gap-[2.5rem]' style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(155px, 1fr))', padding: '2.5rem 2.5rem', position: 'relative' }}>
          <div className='translate-y-[-18px]' style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: '180px', maxWidth: '240px' }}>
            <Logo />
            <p style={{ color: 'var(--color-muted)', fontSize: '0.8125rem', lineHeight: '1.7', fontFamily: 'var(--font-body)' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginTop: '4px' }}>
              {socialLinks.map(s => <SocialBtn key={s.label} {...s} />)}
            </div>
          </div>
          {footerLinks.map(col => (
            <div key={col.heading} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h4 style={{ color: 'var(--color-heading)', fontSize: '0.9375rem', fontWeight: '700', fontFamily: 'var(--font-body)', margin: 0 }}>{col.heading}</h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', listStyle: 'none', margin: 0, padding: 0 }}>
                {col.links.map(link => <FooterLink key={link} label={link} />)}
              </ul>
            </div>
          ))}
          <div className='mb-20 lg:mb-0' style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h4 style={{ color: 'var(--color-heading)', fontSize: '0.9375rem', fontWeight: '700', fontFamily: 'var(--font-body)', margin: 0 }}>{contactInfo.heading}</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[contactInfo.phone, contactInfo.email, contactInfo.address].map((item, i) => (
                <p key={i} style={{ color: 'var(--color-muted)', fontSize: '0.8125rem', lineHeight: '1.6', margin: 0, fontFamily: 'var(--font-body)' }}>{item}</p>
              ))}
            </div>
          </div>
          <div className='absolute left-0 lg:right-0 bottom-0' style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <img src={paymentImg} alt="Accepted payment methods" style={{ height: '110px', width: 'auto', objectFit: 'contain', objectPosition: 'right center', display: 'block' }} />
          </div>
        </div>
        <div style={{ borderTop: '1px solid var(--color-placeholder)', margin: '0 2.5rem' }} />
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '16px', padding: '1.125rem 2.5rem' }}>
          <p style={{ color: 'var(--color-muted)', fontSize: '0.8125rem', margin: 0, fontFamily: 'var(--font-body)', flexShrink: 0 }}>
            Copyright © 2026 <a href="#" style={{ color: 'var(--color-gold)', fontWeight: '600', textDecoration: 'none', transition: 'var(--transition-fast)' }} onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-primary)'; }} onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-gold)'; }}>Vedraha</a>. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}