import React from "react";
import { Link } from "react-router-dom"; // Using React Router Link for smooth SPA navigation
import paymentImg from "./assets/allpayment.png";

// Updated with route destinations for each individual link and authentic brand hover colors
const footerLinks = [
  { 
    heading: "Company", 
    links: [
      { name: "About Us", href: "/products/nabhi-about-en" },
      { name: "Contact Us", href: "/products/nabhi-contact-en" },
    ] 
  },
  {
    heading: "Customer Services",
    links: [
      { name: "My Orders", href: "/my-orders-en" },
      { name: "Track Your Order", href: "/my-orders-en" },
      { name: "FAQ", href: "/faq" }
    ],
  },
  {
    heading: "Our Information",
    links: [
      { name: "Privacy Policy", href: "/privacy-policy" },
      { name: "User Terms & Conditions", href: "/refund-policy" },
    ],
  },
];

const contactInfo = {
  heading: "Contact Info",
  phone: "+0123-456-789",
  email: "example@gmail.com",
  address: "8502 Preston Rd. Inglewood, Maine 98380",
};

const socialLinks = [
  {
    label: "Facebook",
    href: "https://facebook.com/vedraha",
    hoverBg: "#1877F2", // Official Facebook Blue
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        style={{ width: "14px", height: "14px" }}
      >
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
  },
  {
    label: "X (Twitter)",
    href: "https://x.com/vedraha",
    hoverBg: "#000000",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        style={{ width: "14px", height: "14px" }}
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Pinterest",
    href: "https://pinterest.com/vedraha",
    hoverBg: "#E60023",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        style={{ width: "14px", height: "14px" }}
      >
        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com/vedraha",
    hoverBg: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        style={{ width: "14px", height: "14px" }}
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="17.5" cy="6.5" r="1" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com/vedraha",
    hoverBg: "#FF0000",
    // We pass a function rendering the dynamic inner play button color state
    icon: (isHovered) => (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        style={{ width: "14px", height: "14px" }}
      >
        <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z" />
        {/* On hover, the inner arrow cuts out cleanly into the brand red color */}
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill={isHovered ? "#FF0000" : "var(--color-black)"} />
      </svg>
    ),
  },
];

// ─── LOGO ─────────────────────────────────────────────────────────────────────
const Logo = () => (
  <Link
    to="/"
    className="nh-logo"
    style={{ display: "flex", alignItems: "center", textDecoration: "none" }}
  >
    <img
      src="https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=nabhiLogo.webp&version_id=null"
      alt="Vedraha Nabhi Amrit"
      style={{
        width: "55px",
        height: "auto",
      }}
    />
  </Link>
);

// ─── SOCIAL BUTTON ────────────────────────────────────────────────────────────
const SocialBtn = ({ label, href, icon, hoverBg }) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "32px",
        height: "32px",
        borderRadius: "var(--radius-pill)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: hovered ? `1px solid transparent` : "1px solid var(--color-placeholder)",
        color: hovered ? "#FFFFFF" : "var(--color-muted)",
        background: hovered ? hoverBg : "transparent",
        transition: "var(--transition-base)",
        transform: hovered ? "scale(1.1)" : "scale(1)",
        textDecoration: "none",
        flexShrink: 0,
      }}
    >
      {/* If icon is a function, evaluate it with the hover state, otherwise parse directly */}
      {typeof icon === "function" ? icon(hovered) : icon}
    </a>
  );
};

// ─── FOOTER LINK ──────────────────────────────────────────────────────────────
const FooterLink = ({ label, href }) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <li>
      <Link
        to={href}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          color: hovered ? "var(--color-gold)" : "var(--color-muted)",
          fontSize: "0.875rem",
          fontFamily: "var(--font-body)",
          transition: "var(--transition-fast)",
          textDecoration: "none",
        }}
      >
        {label}
      </Link>
    </li>
  );
};

// ─── MAIN FOOTER ──────────────────────────────────────────────────────────────
export default function Footer() {
  return (
    <footer
      style={{
        width: "100%",
        backgroundColor: "var(--new-bg-white-color)",
        fontFamily: "var(--font-body)",
        padding: "0 1.5rem 1.5rem",
      }}
    >
      <div
        style={{
          maxWidth: "1240px",
          margin: "0 auto",
          backgroundColor: "var(--color-black)",
          borderRadius: "var(--radius-2xl)",
          border: "1px solid var(--color-placeholder)",
          overflow: "hidden",
        }}
      >
        <div
          className="gap-[2rem] md:gap-[2.5rem]"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(155px, 1fr))",
            padding: "2.5rem 2.5rem",
            position: "relative",
          }}
        >
          {/* Brand/Logo Section */}
          <div
            className="translate-y-[-18px]"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              minWidth: "180px",
              maxWidth: "240px",
            }}
          >
            <Logo />
            <p style={{ color: 'var(--color-muted)', fontSize: '0.8125rem', lineHeight: '1.7', fontFamily: 'var(--font-body)' }}>
              Experience holistic healing with Vedraha. Our traditional Ayurvedic Nabhi oils target the body's center center to restore balance, vitality, and deep wellness naturally.
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                flexWrap: "wrap",
                marginTop: "4px",
              }}
            >
              {socialLinks.map((s) => (
                <SocialBtn key={s.label} {...s} />
              ))}
            </div>
          </div>

          {/* Dynamic Link Columns */}
          {footerLinks.map((col) => (
            <div
              key={col.heading}
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <h4
                style={{
                  color: "var(--color-white)",
                  fontSize: "0.9375rem",
                  fontWeight: "700",
                  fontFamily: "var(--font-body)",
                  margin: 0,
                }}
              >
                {col.heading}
              </h4>
              <ul
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                }}
              >
                {col.links.map((link) => (
                  <FooterLink key={link.name} label={link.name} href={link.href} />
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Section */}
          <div
            className="mb-20 lg:mb-0"
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <h4
              style={{
                color: "var(--color-white)",
                fontSize: "0.9375rem",
                fontWeight: "700",
                fontFamily: "var(--font-body)",
                margin: 0,
              }}
            >
              {contactInfo.heading}
            </h4>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <p style={{ color: "var(--color-muted)", fontSize: "0.8125rem", lineHeight: "1.6", margin: 0, fontFamily: "var(--font-body)" }}>
                <a href={`tel:${contactInfo.phone}`} style={{ color: "inherit", textDecoration: "none" }}>{contactInfo.phone}</a>
              </p>
              <p style={{ color: "var(--color-muted)", fontSize: "0.8125rem", lineHeight: "1.6", margin: 0, fontFamily: "var(--font-body)" }}>
                <a href={`mailto:${contactInfo.email}`} style={{ color: "inherit", textDecoration: "none" }}>{contactInfo.email}</a>
              </p>
              <p style={{ color: "var(--color-muted)", fontSize: "0.8125rem", lineHeight: "1.6", margin: 0, fontFamily: "var(--font-body)" }}>
                {contactInfo.address}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "left",
            justifyContent: "start",
            gap: "16px",
            padding: "1.125rem 2.5rem",
          }}
        >
          <p
            style={{
              color: "var(--color-muted)",
              fontSize: "0.8125rem",
              margin: 0,
              fontFamily: "var(--font-body)",
              flexShrink: 0,
            }}
          >
            Copyright © 2026{" "}
            <Link
              to="/"
              style={{
                color: "var(--color-gold)",
                fontWeight: "600",
                textDecoration: "none",
                transition: "var(--transition-fast)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--color-primary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--color-gold)";
              }}
            >
              Vedraha
            </Link>
            . All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}