// src/components/NabhiHeader.jsx  (updated)
// ─────────────────────────────────────────────────────────────────────────────
// Changes from original:
//  • Accepts onCartOpen + cartCount as props (passed from App.jsx via context)
//  • Cart icon badge now reflects global cartCount
//  • No other logic changed
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect, useRef } from "react";
import { Search, User, ShoppingBag, X, Menu, CheckCircle, Eye, EyeOff, Package, LogOut, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { backendurl } from "../App";

export default function NabhiHeader({ onCartOpen, cartCount = 0 }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState("login");
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [name, setName] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [notify, setNotify] = useState(false);

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [submitted, setSubmitted] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("akravi_user")) || null; }
    catch { return null; }
  });

  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = modalOpen || menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [modalOpen, menuOpen]);

  useEffect(() => {
    if (modalOpen) {
      setEmail(""); setPassword(""); setName(""); setConfirmPass("");
      setError(""); setSubmitting(false); setSubmitted(false);
      setShowPass(false); setShowConfirmPass(false); setNotify(false);
    }
  }, [modalOpen, mode]);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const openModal = (m = "login") => { setMode(m); setModalOpen(true); };
  const validateEmail = (v) => /^\S+@\S+\.\S+$/.test(v);

  const handleLogin = async () => {
    if (!email.trim()) return setError("Email is required");
    if (!validateEmail(email)) return setError("Enter a valid email address");
    if (!password) return setError("Password is required");
    setError(""); setSubmitting(true);
    try {
      const res = await fetch(`${backendurl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });
      const data = await res.json();
      if (!data.success) return setError(data.message || "Login failed");
      localStorage.setItem("akravi_token", data.token);
      localStorage.setItem("akravi_user", JSON.stringify(data.user));
      setLoggedInUser(data.user);
      setSubmitted(true);
    } catch {
      setError("Network error. Please try again.");
    } finally { setSubmitting(false); }
  };

  const handleSignup = async () => {
    if (!email.trim()) return setError("Email is required");
    if (!validateEmail(email)) return setError("Enter a valid email address");
    if (!password) return setError("Password is required");
    if (password.length < 6) return setError("Password must be at least 6 characters");
    if (password !== confirmPass) return setError("Passwords do not match");
    setError(""); setSubmitting(true);
    try {
      const res = await fetch(`${backendurl}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password, name: name.trim(), notifyOffers: notify }),
      });
      const data = await res.json();
      if (!data.success) return setError(data.message || "Signup failed");
      localStorage.setItem("akravi_token", data.token);
      localStorage.setItem("akravi_user", JSON.stringify(data.user));
      setLoggedInUser(data.user);
      setSubmitted(true);
    } catch {
      setError("Network error. Please try again.");
    } finally { setSubmitting(false); }
  };

  const handleLogout = () => {
    localStorage.removeItem("akravi_token");
    localStorage.removeItem("akravi_user");
    setLoggedInUser(null);
    setDropdownOpen(false);
    navigate("/products");
  };

  const handleMyOrders = () => { setDropdownOpen(false); navigate("/my-orders-en"); };

  // ── Cart icon click — calls the global openCart from App.jsx ──
  const handleCartClick = () => onCartOpen?.();

  const navLinks = [
    { label: "CATALOG",    path: "/products" },
    { label: "CONTACT US", path: "/products/nabhi-contact-en" },
    { label: "ABOUT US",   path: "/products/nabhi-about-en" },
  ];

  const displayName = loggedInUser?.name || loggedInUser?.email?.split("@")[0] || "Account";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; }

        .nh-wrap {
          position: fixed;
          inset: 0;
          z-index: 500;
          background: transparent;
          padding: 12px 20px;
          font-family: 'DM Sans', sans-serif;
          pointer-events: none;
        }

        .nh-inner {
          pointer-events: all;
          max-width: 1200px;
          margin: 0 auto;
          height: 62px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 0 10px 0 10px;
          background: rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(18px) saturate(160%);
          -webkit-backdrop-filter: blur(18px) saturate(160%);
          border-radius: 9999px;
          border: 1px solid rgba(24, 75, 36, 0.18);
          box-shadow:
            0 4px 24px rgba(24, 75, 36, 0.10),
            0 1px 4px rgba(0,0,0,0.06),
            inset 0 1px 0 rgba(255,255,255,0.55);
        }

        .nh-logo {
          display: flex; align-items: center; gap: 8px;
          text-decoration: none; flex-shrink: 0; padding: 0 4px;
        }
        .nh-logo-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px; font-weight: 700; color: #1a3d1e; letter-spacing: 0.02em;
        }
        .nh-logo-sub {
          font-size: 9px; font-weight: 500; color: #4a7a42;
          letter-spacing: 0.12em; text-transform: uppercase; margin-top: 1px;
        }

        .nh-nav { display: flex; align-items: center; gap: 6px; }
        .nh-nav-link {
          font-size: 11px; font-weight: 600; letter-spacing: 0.09em;
          text-transform: uppercase; color: #2a4a1f; text-decoration: none;
          padding: 6px 10px; border-radius: 9999px; transition: background 0.18s, color 0.18s;
        }
        .nh-nav-link:hover { background: rgba(45,90,39,0.10); color: #184b24; }

        .nh-actions { display: flex; align-items: center; gap: 6px; flex-shrink: 0; }
        .nh-icon-btn {
          position: relative; width: 38px; height: 38px; border-radius: 50%;
          border: 1.5px solid rgba(24,75,36,0.18); background: rgba(255,255,255,0.7);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: #2a4a1f; transition: background 0.18s, border-color 0.18s;
        }
        .nh-icon-btn:hover { background: rgba(45,90,39,0.12); border-color: rgba(24,75,36,0.35); }

        /* Cart badge */
        .nh-cart-badge {
          position: absolute; top: -4px; right: -4px;
          min-width: 18px; height: 18px; border-radius: 9999px;
          background: #2d5a27; color: #fff;
          font-size: 10px; font-weight: 700;
          display: flex; align-items: center; justify-content: center;
          padding: 0 4px; border: 2px solid #fff;
        }

        .nh-cta-btn {
          height: 36px; padding: 0 18px; border-radius: 9999px;
          background: linear-gradient(135deg, #2d5a27 0%, #3d7a35 100%);
          color: #fff; font-size: 12px; font-weight: 700; letter-spacing: 0.06em;
          text-decoration: none; display: flex; align-items: center;
          border: none; cursor: pointer; transition: opacity 0.18s, transform 0.18s;
          box-shadow: 0 2px 10px rgba(45,90,39,0.28);
        }
        .nh-cta-btn:hover { opacity: 0.9; transform: translateY(-1px); }

        .nh-hamburger {
          display: none; width: 38px; height: 38px; border-radius: 50%;
          border: 1.5px solid rgba(24,75,36,0.18); background: rgba(255,255,255,0.7);
          align-items: center; justify-content: center; cursor: pointer; color: #2a4a1f;
        }

        @media (max-width: 768px) {
          .nh-nav { display: none; }
          .nh-cta-btn { display: none; }
          .nh-hamburger { display: flex; }
        }

        .nh-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.35);
          z-index: 1000; backdrop-filter: blur(2px);
        }

        /* ── Mobile drawer ── */
        .nh-mob-drawer {
          position: fixed; top: 0; left: 0; right: 0;
          background: rgba(255,255,255,0.97); z-index: 1100;
          padding: 20px 22px 28px; border-radius: 0 0 24px 24px;
          box-shadow: 0 8px 32px rgba(24,75,36,0.12);
          backdrop-filter: blur(16px);
        }
        .nh-mob-head {
          display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;
        }
        .nh-mob-link {
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 0; font-size: 13px; font-weight: 600;
          letter-spacing: 0.08em; text-transform: uppercase; color: #1a3d1e;
          border-bottom: 1px solid rgba(24,75,36,0.08); cursor: pointer;
        }

        /* ── Auth modal ── */
        .nh-modal {
          position: fixed; inset: 0; z-index: 2000;
          display: flex; align-items: stretch;
          background: #fff;
        }
        .nh-modal-left {
          flex: 1; background: linear-gradient(160deg,#e8f4e4 0%,#c9e6c0 100%);
          padding: 56px 44px; display: flex; flex-direction: column; justify-content: center;
        }
        @media (max-width: 640px) { .nh-modal-left { display: none; } }
        .nh-modal-left-title { font-family:'Cormorant Garamond',serif; font-size:32px; font-weight:700; color:#1a3d1e; line-height:1.2; margin-bottom:12px; }
        .nh-modal-left-sub   { font-size:14px; color:#4a7a42; line-height:1.6; margin-bottom:36px; max-width:340px; }
        .nh-benefit-cards    { display:flex; flex-direction:column; gap:14px; }
        .nh-benefit-card     { display:flex; align-items:flex-start; gap:14px; background:rgba(255,255,255,0.55); border-radius:14px; padding:16px 18px; }
        .nh-bc-icon          { font-size:22px; flex-shrink:0; }
        .nh-bc-title         { font-size:13px; font-weight:700; color:#1a3d1e; margin-bottom:2px; }
        .nh-bc-desc          { font-size:12px; color:#5a7a52; }

        .nh-modal-right   { width:440px; flex-shrink:0; padding:48px 40px; overflow-y:auto; display:flex; flex-direction:column; }
        @media (max-width:640px) { .nh-modal-right { width:100%; padding:32px 24px; } }
        .nh-modal-close   { position:absolute; top:20px; right:20px; width:32px; height:32px; border-radius:50%; border:1.5px solid #e0e0e0; background:#fff; cursor:pointer; display:flex; align-items:center; justify-content:center; color:#666; }
        .nh-tabs          { display:flex; gap:0; margin-bottom:28px; border-bottom:2px solid #e8e8e8; }
        .nh-tab           { flex:1; padding:10px; background:none; border:none; font-size:12px; font-weight:700; letter-spacing:0.1em; color:#999; cursor:pointer; border-bottom:2px solid transparent; margin-bottom:-2px; transition:color .18s, border-color .18s; }
        .nh-tab.active    { color:#184b24; border-bottom-color:#184b24; }
        .nh-field         { margin-bottom:18px; }
        .nh-label         { display:block; font-size:11px; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; color:#555; margin-bottom:7px; }
        .nh-input         { width:100%; padding:11px 14px; border:1.5px solid #e0e0e0; border-radius:10px; font-size:14px; font-family:'DM Sans',sans-serif; color:#1a1a1a; outline:none; transition:border-color .18s, box-shadow .18s; }
        .nh-input.error   { border-color:#e53e3e; }
        .nh-input-wrap    { position:relative; }
        .nh-input-pass    { padding-right:42px; }
        .nh-pass-toggle   { position:absolute; right:12px; top:50%; transform:translateY(-50%); background:none; border:none; cursor:pointer; color:#999; display:flex; }
        .nh-notify-row    { display:flex; align-items:center; gap:10px; font-size:13px; color:#555; cursor:pointer; margin-bottom:18px; }
        .nh-error         { background:#fff5f5; color:#c53030; border:1px solid #fed7d7; border-radius:8px; padding:10px 14px; font-size:13px; margin-bottom:16px; }
        .nh-submit-btn    { width:100%; padding:13px; background:#184b24; color:#fff; border:none; border-radius:10px; font-size:14px; font-weight:700; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px; margin-bottom:14px; transition:opacity .18s; }
        .nh-submit-btn:hover { opacity:0.9; }
        .nh-submit-btn:disabled { opacity:0.6; cursor:not-allowed; }
        .nh-spinner       { width:16px; height:16px; border:2px solid rgba(255,255,255,0.3); border-top-color:#fff; border-radius:50%; animation:nhSpin 0.7s linear infinite; }
        @keyframes nhSpin { to { transform:rotate(360deg); } }
        .nh-terms         { font-size:11px; color:#aaa; text-align:center; line-height:1.5; }
        .nh-terms a       { color:#184b24; text-decoration:underline; }
        .nh-success-wrap  { display:flex; flex-direction:column; align-items:center; justify-content:center; flex:1; text-align:center; padding:40px 0; }
        .nh-success-icon  { width:64px; height:64px; background:#e8f5e2; border-radius:50%; display:flex; align-items:center; justify-content:center; margin-bottom:20px; }
        .nh-success-title { font-family:'Cormorant Garamond',serif; font-size:26px; font-weight:700; color:#1a3d1e; margin-bottom:8px; }
        .nh-success-sub   { font-size:14px; color:#5a7a52; line-height:1.6; margin-bottom:28px; }
        .nh-success-close-btn { padding:12px 32px; background:#184b24; color:#fff; border:none; border-radius:10px; font-size:14px; font-weight:700; cursor:pointer; }

        /* ── User dropdown ── */
        .nh-user-wrap     { position:relative; }
        .nh-user-btn      { display:flex; align-items:center; gap:6px; height:36px; padding:0 12px 0 8px; border-radius:9999px; border:1.5px solid rgba(24,75,36,0.22); background:rgba(255,255,255,0.7); cursor:pointer; font-size:12px; font-weight:600; color:#2a4a1f; }
        .nh-user-avatar   { width:24px; height:24px; border-radius:50%; background:#2d5a27; color:#fff; font-size:10px; font-weight:700; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
        .nh-dropdown      { position:absolute; top:calc(100% + 8px); right:0; background:#fff; border-radius:14px; box-shadow:0 8px 32px rgba(0,0,0,0.12); border:1px solid rgba(24,75,36,0.10); min-width:180px; overflow:hidden; z-index:600; }
        .nh-dropdown-item { display:flex; align-items:center; gap:10px; padding:12px 16px; font-size:13px; font-weight:500; color:#333; cursor:pointer; transition:background .15s; }
        .nh-dropdown-item:hover { background:#f0f7ee; }
        .nh-dropdown-item.danger { color:#c53030; }
        .nh-dropdown-item.danger:hover { background:#fff5f5; }
        .nh-dropdown-divider { height:1px; background:#f0f0f0; margin:4px 0; }

        /* ── Banner ── */
        .nh-banner {
          position: fixed; top: 86px; left: 0; right: 0;
          background: linear-gradient(90deg, #1a3d1e 0%, #2d5a27 100%);
          color: #fff; font-size: 12px; font-weight: 600; letter-spacing: 0.05em;
          text-align: center; padding: 8px 20px; z-index: 499;
          display: flex; align-items: center; justify-content: center; gap: 12px;
        }
        .nh-banner-cta {
          background: rgba(255,255,255,0.2); border-radius: 9999px;
          padding: 3px 12px; font-size: 11px; font-weight: 700;
          text-decoration: none; color: #fff;
        }
      `}</style>

      {/* ── PILL NAV ── */}
      <div className="nh-wrap" style={{ height: "fit-content" }}>
        <div className="nh-inner">
          {/* Logo */}
          <a className="nh-logo" href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, overflow: "hidden", background: "#2d5a27", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img
                src="https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=nabhiLogo.webp&version_id=null"
                alt="Nabhi Oil Logo"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>
            <div>
              <div className="nh-logo-name">Akravi</div>
              <div className="nh-logo-sub">Ayurvedic</div>
            </div>
          </a>

          {/* Desktop nav links */}
          <nav className="nh-nav">
            {navLinks.map((l) => (
              <a key={l.label} className="nh-nav-link" href={l.path} onClick={(e) => { e.preventDefault(); navigate(l.path); }}>
                {l.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="nh-actions">
            {/* Cart button — opens global drawer */}
            <button className="nh-icon-btn" onClick={handleCartClick} aria-label="Open cart">
              <ShoppingBag size={17} strokeWidth={1.8} />
              {cartCount > 0 && (
                <span className="nh-cart-badge">{cartCount}</span>
              )}
            </button>

            {/* User / Auth */}
            {loggedInUser ? (
              <div className="nh-user-wrap" ref={dropdownRef}>
                <button className="nh-user-btn" onClick={() => setDropdownOpen((p) => !p)}>
                  <div className="nh-user-avatar">{displayName[0]?.toUpperCase()}</div>
                  <span style={{ maxWidth: 80, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{displayName}</span>
                  <ChevronDown size={12} style={{ opacity: 0.6 }} />
                </button>
                {dropdownOpen && (
                  <div className="nh-dropdown">
                    <div className="nh-dropdown-item" onClick={handleMyOrders}>
                      <Package size={14} /> My Orders
                    </div>
                    <div className="nh-dropdown-divider" />
                    <div className="nh-dropdown-item danger" onClick={handleLogout}>
                      <LogOut size={14} /> Logout
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button className="nh-icon-btn" onClick={() => openModal("login")} aria-label="Account">
                <User size={17} strokeWidth={1.8} />
              </button>
            )}

            {/* Desktop CTA */}
            <a
              href="#"
              className="nh-cta-btn"
              onClick={(e) => { e.preventDefault(); navigate("/products"); }}
            >
              Shop Now
            </a>

            {/* Mobile hamburger */}
            <button className="nh-hamburger" onClick={() => setMenuOpen(true)} aria-label="Menu">
              <Menu size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Announcement banner */}
      {/* <div className="nh-banner">
        <span>🌿 Free shipping on all orders · COD available</span>
        <a href="/products" className="nh-banner-cta">Shop Now</a>
      </div> */}

      {/* Overlay */}
      {(modalOpen || menuOpen) && (
        <div className="nh-overlay" onClick={() => { setModalOpen(false); setMenuOpen(false); }} />
      )}

      {/* ── AUTH MODAL ── */}
      {modalOpen && (
        <div className="nh-modal">
          <div className="nh-modal-left">
            <div className="nh-modal-left-title">
              {mode === "login" ? "Welcome back to Akravi." : "Join Akravi today."}
            </div>
            <div className="nh-modal-left-sub">
              {mode === "login"
                ? "Log in to access your orders, saved items, and exclusive offers."
                : "Create your account to unlock member-only deals and a faster checkout."}
            </div>
            <div className="nh-benefit-cards">
              {[
                { icon: "⭐", title: "Customer-first", desc: "Putting you in the center of every decision" },
                { icon: "🔒", title: "Secure & Private", desc: "Your data is always protected" },
                { icon: "🎁", title: "Exclusive Offers", desc: "Member-only deals and early access" },
              ].map((b) => (
                <div key={b.title} className="nh-benefit-card">
                  <div className="nh-bc-icon">{b.icon}</div>
                  <div>
                    <div className="nh-bc-title">{b.title}</div>
                    <div className="nh-bc-desc">{b.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="nh-modal-right" style={{ position: "relative" }}>
            <button className="nh-modal-close" onClick={() => setModalOpen(false)}><X size={13} /></button>

            {submitted ? (
              <div className="nh-success-wrap">
                <div className="nh-success-icon">
                  <CheckCircle size={28} color="#184b24" strokeWidth={1.8} />
                </div>
                <div className="nh-success-title">
                  {mode === "login" ? "Welcome back!" : "You're in!"}
                </div>
                <div className="nh-success-sub">
                  {mode === "login"
                    ? `Good to see you again, ${loggedInUser?.name || loggedInUser?.email?.split("@")[0]}.`
                    : `Welcome to Akravi${notify ? ". We'll keep you posted on the best offers." : "."}`}
                </div>
                <button className="nh-success-close-btn" onClick={() => setModalOpen(false)}>
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="nh-tabs">
                  <button className={`nh-tab${mode === "login" ? " active" : ""}`} onClick={() => { setMode("login"); setError(""); }}>LOGIN</button>
                  <button className={`nh-tab${mode === "signup" ? " active" : ""}`} onClick={() => { setMode("signup"); setError(""); }}>SIGN UP</button>
                </div>

                {mode === "signup" && (
                  <div className="nh-field">
                    <label className="nh-label">Name (optional)</label>
                    <input className="nh-input" type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
                  </div>
                )}

                <div className="nh-field">
                  <label className="nh-label">Email</label>
                  <input className={`nh-input${error && !email ? " error" : ""}`} type="email" placeholder="you@example.com" value={email} onChange={(e) => { setEmail(e.target.value); setError(""); }} autoComplete="email" />
                </div>

                <div className="nh-field">
                  <label className="nh-label">Password</label>
                  <div className="nh-input-wrap">
                    <input
                      className={`nh-input nh-input-pass${error && !password ? " error" : ""}`}
                      type={showPass ? "text" : "password"}
                      placeholder={mode === "signup" ? "Min. 6 characters" : "Your password"}
                      value={password}
                      onChange={(e) => { setPassword(e.target.value); setError(""); }}
                      onKeyDown={(e) => e.key === "Enter" && (mode === "login" ? handleLogin() : handleSignup())}
                      autoComplete={mode === "login" ? "current-password" : "new-password"}
                    />
                    <button className="nh-pass-toggle" type="button" onClick={() => setShowPass(p => !p)}>
                      {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                {mode === "signup" && (
                  <div className="nh-field">
                    <label className="nh-label">Confirm Password</label>
                    <div className="nh-input-wrap">
                      <input
                        className={`nh-input nh-input-pass${error && confirmPass !== password ? " error" : ""}`}
                        type={showConfirmPass ? "text" : "password"}
                        placeholder="Repeat password"
                        value={confirmPass}
                        onChange={(e) => { setConfirmPass(e.target.value); setError(""); }}
                        onKeyDown={(e) => e.key === "Enter" && handleSignup()}
                        autoComplete="new-password"
                      />
                      <button className="nh-pass-toggle" type="button" onClick={() => setShowConfirmPass(p => !p)}>
                        {showConfirmPass ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </div>
                )}

                {mode === "signup" && (
                  <label className="nh-notify-row">
                    <input type="checkbox" checked={notify} onChange={() => setNotify(p => !p)} />
                    <span>Notify me with offers &amp; updates</span>
                  </label>
                )}

                {error && <div className="nh-error">⚠ {error}</div>}

                <button className="nh-submit-btn" onClick={mode === "login" ? handleLogin : handleSignup} disabled={submitting}>
                  {submitting && <span className="nh-spinner" />}
                  {submitting ? "Please wait…" : mode === "login" ? "Log In" : "Create Account"}
                </button>

                <div className="nh-terms">
                  By continuing you accept our <a href="#">Privacy Policy and T&Cs.</a>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── MOBILE DRAWER ── */}
      {menuOpen && (
        <div className="nh-mob-drawer">
          <div className="nh-mob-head">
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, fontWeight: 700, color: "#1a3d1e" }}>Akravi</span>
            <button
              style={{ width: 34, height: 34, borderRadius: "50%", border: "1.5px solid rgba(24,75,36,0.20)", background: "rgba(255,255,255,0.7)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#444" }}
              onClick={() => setMenuOpen(false)}
            >
              <X size={14} />
            </button>
          </div>
          {navLinks.map((l) => (
            <div key={l.label} className="nh-mob-link" onClick={() => { navigate(l.path); setMenuOpen(false); }}>
              <span>{l.label}</span>
              <span style={{ color: "#94a3b8", fontSize: 18 }}>›</span>
            </div>
          ))}
          {loggedInUser ? (
            <>
              <div className="nh-mob-link" onClick={() => { navigate("/my-orders-en"); setMenuOpen(false); }}>
                <span>MY ORDERS</span>
                <span style={{ color: "#94a3b8", fontSize: 18 }}>›</span>
              </div>
              <div className="nh-mob-link" style={{ color: "#c0392b" }} onClick={handleLogout}>
                <span>LOGOUT</span>
                <span style={{ color: "#94a3b8", fontSize: 18 }}>›</span>
              </div>
            </>
          ) : (
            <div className="nh-mob-link" onClick={() => { openModal("login"); setMenuOpen(false); }}>
              <span>LOGIN / SIGN UP</span>
              <span style={{ color: "#94a3b8", fontSize: 18 }}>›</span>
            </div>
          )}
        </div>
      )}
    </>
  );
}