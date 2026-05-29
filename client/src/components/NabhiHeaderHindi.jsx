import React, { useState, useEffect, useRef } from "react";
import { Search, User, ShoppingBag, X, Menu, CheckCircle, Eye, EyeOff, Package, LogOut, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { backendurl } from "../App";

// ── NabhiHeaderHindi ───────────────────────────────────────────────────────────────
export default function NabhiHeaderHindi({ onCartOpen, cartCount = 0 }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState("login");
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // shared fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  // signup-only
  const [name, setName] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [notify, setNotify] = useState(false);

  // UI state
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("akravi_user")) || null; }
    catch { return null; }
  });

  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // body scroll lock
  useEffect(() => {
    document.body.style.overflow = modalOpen || menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [modalOpen, menuOpen]);

  // reset on open
  useEffect(() => {
    if (modalOpen) {
      setEmail(""); setPassword(""); setName(""); setConfirmPass("");
      setError(""); setSubmitting(false); setSubmitted(false);
      setShowPass(false); setShowConfirmPass(false); setNotify(false);
    }
  }, [modalOpen, mode]);

  // Close dropdown when clicking outside
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

  // ── LOGIN ──────────────────────────────────────────────────────────────────
  const handleLogin = async () => {
    if (!email.trim()) return setError("ईमेल आवश्यक है");
    if (!validateEmail(email)) return setError("कृपया सही ईमेल पता दर्ज करें");
    if (!password) return setError("पासवर्ड आवश्यक है");
    setError(""); setSubmitting(true);
    try {
      const res = await fetch(`${backendurl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });
      const data = await res.json();
      if (!data.success) return setError(data.message || "लॉगिन विफल रहा");
      localStorage.setItem("akravi_token", data.token);
      localStorage.setItem("akravi_user", JSON.stringify(data.user));
      setLoggedInUser(data.user);
      setSubmitted(true);
    } catch {
      setError("नेटवर्क त्रुटि। कृपया पुनः प्रयास करें।");
    } finally { setSubmitting(false); }
  };

  // ── SIGNUP ─────────────────────────────────────────────────────────────────
  const handleSignup = async () => {
    if (!email.trim()) return setError("ईमेल आवश्यक है");
    if (!validateEmail(email)) return setError("कृपया सही ईमेल पता दर्ज करें");
    if (!password) return setError("पासवर्ड आवश्यक है");
    if (password.length < 6) return setError("पासवर्ड कम से कम 6 अक्षर का होना चाहिए");
    if (password !== confirmPass) return setError("पासवर्ड मेल नहीं खाते");
    setError(""); setSubmitting(true);
    try {
      const res = await fetch(`${backendurl}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password, name: name.trim(), notifyOffers: notify }),
      });
      const data = await res.json();
      if (!data.success) return setError(data.message || "पंजीकरण विफल रहा");
      localStorage.setItem("akravi_token", data.token);
      localStorage.setItem("akravi_user", JSON.stringify(data.user));
      setLoggedInUser(data.user);
      setSubmitted(true);
    } catch {
      setError("नेटवर्क त्रुटि। कृपया पुनः प्रयास करें।");
    } finally { setSubmitting(false); }
  };

  const handleLogout = () => {
    localStorage.removeItem("akravi_token");
    localStorage.removeItem("akravi_user");
    setLoggedInUser(null);
    setDropdownOpen(false);
    navigate("/exclusive-products-hn");
  };

  const handleMyOrders = () => {
    setDropdownOpen(false);
    navigate("/my-orders");
  };

  const handleCartClick = () => onCartOpen?.();

  const navLinks = [
    { label: "उत्पाद सूची",   path: "/exclusive-products-hn" },
    { label: "संपर्क करें",   path: "/products/nabhi-contact" },
    { label: "हमारे बारे में", path: "/products/nabhi-aboutus" },
  ];

  const displayName = loggedInUser?.name || loggedInUser?.email?.split("@")[0] || "खाता";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tiro+Devanagari+Hindi:ital@0;1&family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; }

        /* ══════════════════════════════════════════
           FLOATING PILL NAVBAR
        ══════════════════════════════════════════ */
        .nhh-wrap {
          position: fixed;
          inset: 0;
          z-index: 500;
          background: transparent;
          padding: 12px 20px;
          font-family: 'DM Sans', 'Tiro Devanagari Hindi', sans-serif;
          pointer-events: none;
        }

        /* The actual pill container */
        .nhh-inner {
          pointer-events: all;
          max-width: 1200px;
          margin: 0 auto;
          height: 62px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 0 10px 0 10px;

          /* Glassmorphism */
          background: rgba(232, 242, 235, 0.72);
          backdrop-filter: blur(18px) saturate(160%);
          -webkit-backdrop-filter: blur(18px) saturate(160%);

          /* Pill shape */
          border-radius: 9999px;

          /* Glassy border with green tint */
          border: 1px solid rgba(24, 75, 36, 0.18);

          /* Layered shadow */
          box-shadow:
            0 4px 24px rgba(24, 75, 36, 0.10),
            0 1px 4px rgba(0,0,0,0.06),
            inset 0 1px 0 rgba(255,255,255,0.55);
        }

        /* ── Logo ── */
        .nhh-logo {
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          flex-shrink: 0;
          padding: 0 4px;
        }
        .nhh-logo-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px;
          font-weight: 700;
          color: #1a1a1a;
          line-height: 1.2;
        }

        /* ── Nav links ── */
        .nhh-nav {
          display: flex;
          align-items: center;
          gap: 2px;
          flex: 1;
          justify-content: center;
        }
        .nhh-nav a {
          font-size: 12px;
          font-weight: 700;
          color: #1a3d1e;
          text-decoration: none;
          letter-spacing: 0.04em;
          padding: 7px 13px;
          border-radius: 9999px;
          transition: background 0.18s, color 0.18s;
          white-space: nowrap;
          font-family: 'Tiro Devanagari Hindi', serif;
        }
        .nhh-nav a:hover {
          background: rgba(24, 75, 36, 0.10);
          color: #184b24;
        }
        @media (max-width: 860px) { .nhh-nav { display: none; } }

        /* ── Icon strip ── */
        .nhh-icons {
          display: flex;
          align-items: center;
          gap: 4px;
          flex-shrink: 0;
        }

        /* Plain icon button */
        .nhh-ibtn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1a3d1e;
          position: relative;
          transition: background 0.15s;
        }
        .nhh-ibtn:hover { background: rgba(24,75,36,0.10); }

        /* Cart badge */
        .nhh-badge {
          position: absolute;
          top: 1px; right: 1px;
          width: 17px; height: 17px;
          border-radius: 50%;
          background: #184b24;
          color: #fff;
          font-size: 9px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid rgba(232,242,235,0.9);
        }

        /* Hamburger — mobile only */
        .nhh-hamburger { display: none !important; }
        @media (max-width: 860px) { .nhh-hamburger { display: flex !important; } }

        /* ── User pill button ── */
        .nhh-user-btn {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 5px 12px 5px 8px;
          height: 36px;
          border-radius: 9999px;
          background: rgba(24,75,36,0.08);
          border: 1px solid rgba(24,75,36,0.18);
          cursor: pointer;
          color: #1a3d1e;
          transition: all 0.15s;
          font-family: 'DM Sans', 'Tiro Devanagari Hindi', sans-serif;
          font-size: 12px;
          font-weight: 600;
        }
        .nhh-user-btn:hover, .nhh-user-btn.open {
          background: rgba(24,75,36,0.15);
          border-color: rgba(24,75,36,0.30);
        }
        .nhh-user-name {
          max-width: 72px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        @media (max-width: 480px) { .nhh-user-name { display: none; } }

        /* ── "अभी खरीदें" CTA pill — rightmost ── */
        .nhh-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 0 18px;
          height: 40px;
          border-radius: 9999px;
          background: #184b24;
          color: #ffffff;
          font-family: 'Tiro Devanagari Hindi', 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.02em;
          white-space: nowrap;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(24,75,36,0.32);
          transition: background 0.18s, box-shadow 0.18s, transform 0.15s;
          text-decoration: none;
          flex-shrink: 0;
        }
        .nhh-cta-btn:hover {
          background: #0f3119;
          box-shadow: 0 6px 20px rgba(24,75,36,0.40);
          transform: translateY(-1px);
        }
        @media (max-width: 480px) { .nhh-cta-btn { display: none; } }

        /* ── Dropdown ── */
        .nhh-dropdown {
          position: absolute;
          top: calc(100% + 10px);
          right: 0;
          background: rgba(245,250,246,0.90);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(24,75,36,0.14);
          border-radius: 16px;
          box-shadow: 0 16px 48px rgba(0,0,0,0.14), 0 4px 12px rgba(24,75,36,0.08);
          min-width: 200px;
          z-index: 600;
          overflow: hidden;
          animation: nhhDropIn 0.18s cubic-bezier(0.16,1,0.3,1);
        }
        @keyframes nhhDropIn {
          from { opacity: 0; transform: translateY(-8px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .nhh-drop-header { padding: 14px 16px 10px; border-bottom: 1px solid rgba(24,75,36,0.10); }
        .nhh-drop-email  { font-size: 12px; color: #6b7280; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .nhh-drop-name   { font-size: 14px; font-weight: 700; color: #111827; margin-bottom: 2px; font-family: 'Tiro Devanagari Hindi', serif; }
        .nhh-drop-item {
          display: flex; align-items: center; gap: 10px;
          padding: 11px 16px;
          font-size: 13px; font-weight: 500; color: #1a3d1e;
          cursor: pointer; transition: background 0.12s;
          background: none; border: none; width: 100%; text-align: left;
          font-family: 'Tiro Devanagari Hindi', 'DM Sans', sans-serif;
        }
        .nhh-drop-item:hover { background: rgba(24,75,36,0.07); }
        .nhh-drop-item.danger { color: #c0392b; }
        .nhh-drop-item.danger:hover { background: rgba(192,57,43,0.06); }
        .nhh-drop-divider { border: none; border-top: 1px solid rgba(24,75,36,0.09); margin: 0; }

        /* ── Overlay / Modal ── */
        .nhh-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.50);
          z-index: 600;
          animation: nhhFadeIn 0.2s ease;
          backdrop-filter: blur(2px);
        }
        @keyframes nhhFadeIn  { from { opacity: 0; } to { opacity: 1; } }
        @keyframes nhhScaleIn { from { opacity: 0; transform: translate(-50%,-50%) scale(0.95); } to { opacity: 1; transform: translate(-50%,-50%) scale(1); } }

        .nhh-modal {
          position: fixed; top: 50%; left: 50%;
          transform: translate(-50%,-50%);
          width: 760px; max-width: 96vw;
          background: #fff; border-radius: 20px;
          z-index: 700; display: flex;
          animation: nhhScaleIn 0.25s cubic-bezier(0.16,1,0.3,1);
          overflow: hidden;
          box-shadow: 0 24px 80px rgba(0,0,0,0.22);
        }

        /* Left panel */
        .nhh-modal-left {
          flex: 1; padding: 40px 32px;
          background: #f0f7f2;
          display: flex; flex-direction: column; justify-content: center;
        }
        .nhh-modal-left-title {
          font-family: 'Tiro Devanagari Hindi', serif;
          font-size: 24px; font-weight: 700; color: #1a1a1a; line-height: 1.4;
          margin-bottom: 10px;
        }
        .nhh-modal-left-sub {
          font-size: 13px; color: #6b7280; line-height: 1.8; margin-bottom: 28px;
          font-family: 'Tiro Devanagari Hindi', serif;
        }
        .nhh-benefit-cards { display: flex; flex-direction: column; gap: 12px; }
        .nhh-benefit-card {
          padding: 14px 16px; background: #fff; border-radius: 12px;
          border: 1px solid #d1e7d8; display: flex; align-items: flex-start; gap: 12px;
        }
        .nhh-bc-icon { font-size: 20px; flex-shrink: 0; margin-top: 1px; }
        .nhh-bc-title {
          font-size: 13px; font-weight: 700; color: #1a1a1a; margin-bottom: 2px;
          font-family: 'Tiro Devanagari Hindi', serif;
        }
        .nhh-bc-desc {
          font-size: 11px; color: #6b7280; line-height: 1.4;
          font-family: 'Tiro Devanagari Hindi', serif;
        }

        /* Right panel */
        .nhh-modal-right {
          width: 320px; padding: 36px 28px;
          border-left: 1px solid #e8f0ea;
          display: flex; flex-direction: column; justify-content: center;
          position: relative;
        }
        .nhh-modal-close {
          position: absolute; top: 14px; right: 14px;
          width: 32px; height: 32px; border-radius: 50%;
          border: 1.5px solid #d1e7d8; background: #fff;
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          color: #555; transition: background 0.15s;
        }
        .nhh-modal-close:hover { background: #f0f7f2; }

        /* Mode tabs */
        .nhh-tabs { display: flex; gap: 0; margin-bottom: 24px; border-bottom: 1.5px solid #e5e7eb; }
        .nhh-tab {
          flex: 1; padding: 8px 0;
          font-size: 13px; font-weight: 700; color: #9ca3af;
          letter-spacing: 0.02em; background: none; border: none; cursor: pointer;
          border-bottom: 2px solid transparent; margin-bottom: -1.5px;
          transition: color 0.15s, border-color 0.15s;
          font-family: 'Tiro Devanagari Hindi', 'DM Sans', sans-serif;
        }
        .nhh-tab.active { color: #184b24; border-bottom-color: #184b24; }

        /* Form fields */
        .nhh-field { margin-bottom: 14px; }
        .nhh-label {
          display: block; font-size: 11px; font-weight: 600; color: #6b7280;
          letter-spacing: 0.04em; margin-bottom: 6px;
          font-family: 'Tiro Devanagari Hindi', 'DM Sans', sans-serif;
        }
        .nhh-input-wrap { position: relative; }
        .nhh-input {
          width: 100%; padding: 10px 14px; font-size: 13.5px;
          font-family: 'DM Sans', sans-serif;
          border: 1.5px solid #d1e7d8; border-radius: 10px;
          background: #f8fbf9; color: #1a1a1a;
          outline: none; transition: border-color 0.15s, box-shadow 0.15s;
        }
        .nhh-input:focus { border-color: #184b24; box-shadow: 0 0 0 3px rgba(24,75,36,0.10); background: #fff; }
        .nhh-input.error { border-color: #c0392b; }
        .nhh-input-pass { padding-right: 40px; }
        .nhh-pass-toggle {
          position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
          background: none; border: none; cursor: pointer; color: #9ca3af; padding: 0; display: flex;
        }
        .nhh-pass-toggle:hover { color: #555; }

        .nhh-error {
          font-size: 12px; color: #c0392b; margin-bottom: 12px;
          display: flex; align-items: center; gap: 5px;
          font-family: 'Tiro Devanagari Hindi', serif;
        }

        .nhh-notify-row {
          display: flex; align-items: center; gap: 8px;
          font-size: 12.5px; color: #6b7280; cursor: pointer; margin-bottom: 16px;
          font-family: 'Tiro Devanagari Hindi', serif;
        }
        .nhh-notify-row input { accent-color: #184b24; width: 14px; height: 14px; flex-shrink: 0; }

        .nhh-submit-btn {
          width: 100%; padding: 12px; background: #184b24; color: #fff;
          border: none; border-radius: 30px; font-size: 14px; font-weight: 700;
          cursor: pointer;
          font-family: 'Tiro Devanagari Hindi', 'DM Sans', sans-serif;
          transition: background 0.2s;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          margin-bottom: 16px;
          box-shadow: 0 4px 14px rgba(24,75,36,0.25);
        }
        .nhh-submit-btn:hover:not(:disabled) { background: #0f3119; }
        .nhh-submit-btn:disabled { opacity: 0.65; cursor: not-allowed; }

        .nhh-terms {
          font-size: 11px; color: #9ca3af; text-align: center; line-height: 1.6; margin-top: 10px;
          font-family: 'Tiro Devanagari Hindi', serif;
        }
        .nhh-terms a { color: #555; text-decoration: underline; }

        /* Success */
        .nhh-success-wrap { display: flex; flex-direction: column; align-items: center; text-align: center; padding: 8px 0; }
        .nhh-success-icon {
          width: 56px; height: 56px; background: #e8f5e9; border-radius: 50%;
          display: flex; align-items: center; justify-content: center; margin-bottom: 14px;
        }
        .nhh-success-title {
          font-size: 17px; font-weight: 700; color: #1a1a1a; margin-bottom: 8px;
          font-family: 'Tiro Devanagari Hindi', serif;
        }
        .nhh-success-sub {
          font-size: 13px; color: #6b7280; line-height: 1.8; margin-bottom: 18px;
          font-family: 'Tiro Devanagari Hindi', serif;
        }
        .nhh-success-close-btn {
          padding: 11px 28px; background: #184b24; color: #fff;
          border: none; border-radius: 30px; font-size: 14px; font-weight: 600;
          cursor: pointer;
          font-family: 'Tiro Devanagari Hindi', 'DM Sans', sans-serif;
          transition: background 0.2s;
        }
        .nhh-success-close-btn:hover { background: #0f3119; }

        @keyframes nhhSpin { to { transform: rotate(360deg); } }
        .nhh-spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,0.4); border-top-color: #fff;
          border-radius: 50%; animation: nhhSpin 0.6s linear infinite; flex-shrink: 0;
        }

        @media (max-width: 600px) {
          .nhh-modal { flex-direction: column; }
          .nhh-modal-left { display: none; }
          .nhh-modal-right { width: 100%; border-left: none; padding: 32px 24px; }
        }

        /* ── Mobile drawer ── */
        .nhh-mob-drawer {
          position: fixed; top: 0; left: 0;
          width: 280px; max-width: 85vw; height: 100%;
          background: rgba(240,247,242,0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          z-index: 700;
          display: flex; flex-direction: column;
          animation: nhhSlideIn 0.28s cubic-bezier(0.16,1,0.3,1);
          box-shadow: 8px 0 40px rgba(0,0,0,0.12);
          border-right: 1px solid rgba(24,75,36,0.12);
        }
        @keyframes nhhSlideIn { from { transform: translateX(-100%); } to { transform: translateX(0); } }
        .nhh-mob-head {
          padding: 18px 20px;
          border-bottom: 1px solid rgba(24,75,36,0.10);
          display: flex; align-items: center; justify-content: space-between;
        }
        .nhh-mob-link {
          display: flex; align-items: center; justify-content: space-between;
          padding: 15px 20px;
          font-size: 13px; font-weight: 700; color: #1a3d1e;
          letter-spacing: 0.04em;
          border-bottom: 1px solid rgba(24,75,36,0.07);
          cursor: pointer; transition: background 0.15s;
          font-family: 'Tiro Devanagari Hindi', serif;
        }
        .nhh-mob-link:hover { background: rgba(24,75,36,0.06); }
      `}</style>

      {/* ══════════════════════════════════════════
          FLOATING PILL HEADER
      ══════════════════════════════════════════ */}
      <div className="nhh-wrap">
        <div className="nhh-inner">

          {/* Logo */}
          <a href="/" className="nhh-logo">
            <div className="nhh-logo-name">
              <img
                src="https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=nabhiLogo.webp&version_id=null"
                alt="Nabhi Amrit"
                style={{ width: "65px", height: "auto" }}
              />
            </div>
          </a>

          {/* Nav */}
          <nav className="nhh-nav">
            {navLinks.map((l) => (
              <a key={l.label} href="#" onClick={(e) => { e.preventDefault(); navigate(l.path); }}>
                {l.label}
              </a>
            ))}
          </nav>

          {/* Icons + CTA */}
          <div className="nhh-icons">

            {/* User / dropdown */}
            <div ref={dropdownRef} style={{ position: "relative" }}>
              <button
                className={`${loggedInUser ? "nhh-user-btn" : "nhh-ibtn"}${dropdownOpen ? " open" : ""}`}
                onClick={() => {
                  if (loggedInUser) { setDropdownOpen(p => !p); }
                  else { openModal("login"); }
                }}
                title={loggedInUser ? loggedInUser.email : "लॉगिन / साइन अप"}
                aria-label="अकाउंट"
              >
                <User size={loggedInUser ? 16 : 18} strokeWidth={1.8} />
                {loggedInUser && <span className="nhh-user-name">{displayName}</span>}
                {loggedInUser && (
                  <ChevronDown
                    size={12}
                    strokeWidth={2.5}
                    style={{ transform: dropdownOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.18s" }}
                  />
                )}
              </button>

              {dropdownOpen && (
                <div className="nhh-dropdown">
                  {loggedInUser && (
                    <div className="nhh-drop-header">
                      <div className="nhh-drop-name">{loggedInUser.name || displayName}</div>
                      <div className="nhh-drop-email">{loggedInUser.email}</div>
                    </div>
                  )}
                  <button className="nhh-drop-item" onClick={() => { setDropdownOpen(false); handleMyOrders(); }}>
                    <Package size={15} color="#2a7048" /> मेरे ऑर्डर
                  </button>
                  <hr className="nhh-drop-divider" />
                  {!loggedInUser ? (
                    <button className="nhh-drop-item" onClick={() => { openModal("login"); setDropdownOpen(false); }}>
                      <User size={15} /> लॉगिन / साइन अप
                    </button>
                  ) : (
                    <button className="nhh-drop-item danger" onClick={() => { handleLogout(); setDropdownOpen(false); }}>
                      <LogOut size={15} /> लॉगआउट
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Cart */}
            <button className="nhh-ibtn" aria-label="कार्ट" onClick={handleCartClick}>
              <ShoppingBag size={18} strokeWidth={1.8} />
              {cartCount > 0 && <span className="nhh-badge">{cartCount}</span>}
            </button>

            {/* Hamburger — mobile */}
            <button className="nhh-ibtn nhh-hamburger" onClick={() => setMenuOpen(true)}>
              <Menu size={19} />
            </button>

            {/* CTA pill */}
            <a
              href="#"
              className="nhh-cta-btn"
              onClick={(e) => { e.preventDefault(); navigate("/exclusive-products-hn"); }}
            >
              अभी खरीदें
            </a>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {(modalOpen || menuOpen) && (
        <div className="nhh-overlay" onClick={() => { setModalOpen(false); setMenuOpen(false); }} />
      )}

      {/* ── AUTH MODAL ── */}
      {modalOpen && (
        <div className="nhh-modal">
          {/* Left panel */}
          <div className="nhh-modal-left">
            <div className="nhh-modal-left-title">
              {mode === "login" ? "Akravi में आपका स्वागत है।" : "आज ही Akravi से जुड़ें।"}
            </div>
            <div className="nhh-modal-left-sub">
              {mode === "login"
                ? "अपने ऑर्डर, सहेजे गए आइटम और विशेष ऑफ़र देखने के लिए लॉगिन करें।"
                : "सदस्य-विशेष डील और तेज़ चेकआउट के लिए अपना खाता बनाएं।"}
            </div>
            <div className="nhh-benefit-cards">
              {[
                { icon: "⭐", title: "ग्राहक प्रथम",    desc: "हर निर्णय में आपको केंद्र में रखते हैं" },
                { icon: "🔒", title: "सुरक्षित और निजी", desc: "आपका डेटा हमेशा सुरक्षित रहता है" },
                { icon: "🎁", title: "विशेष ऑफ़र",      desc: "सदस्य-विशेष डील और अर्ली एक्सेस" },
              ].map((b) => (
                <div key={b.title} className="nhh-benefit-card">
                  <div className="nhh-bc-icon">{b.icon}</div>
                  <div>
                    <div className="nhh-bc-title">{b.title}</div>
                    <div className="nhh-bc-desc">{b.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right panel */}
          <div className="nhh-modal-right">
            <button className="nhh-modal-close" onClick={() => setModalOpen(false)}><X size={13} /></button>

            {submitted ? (
              <div className="nhh-success-wrap">
                <div className="nhh-success-icon">
                  <CheckCircle size={28} color="#184b24" strokeWidth={1.8} />
                </div>
                <div className="nhh-success-title">
                  {mode === "login" ? "वापस आने पर स्वागत है!" : "आप जुड़ गए!"}
                </div>
                <div className="nhh-success-sub">
                  {mode === "login"
                    ? `आपसे मिलकर खुशी हुई, ${loggedInUser?.name || loggedInUser?.email?.split("@")[0]}।`
                    : `Akravi में आपका स्वागत है${notify ? "। हम आपको बेहतरीन ऑफ़र की जानकारी देते रहेंगे।" : "।"}`}
                </div>
                <button className="nhh-success-close-btn" onClick={() => setModalOpen(false)}>
                  खरीदारी जारी रखें
                </button>
              </div>
            ) : (
              <>
                {/* Tabs */}
                <div className="nhh-tabs">
                  <button className={`nhh-tab${mode === "login" ? " active" : ""}`} onClick={() => { setMode("login"); setError(""); }}>
                    लॉगिन
                  </button>
                  <button className={`nhh-tab${mode === "signup" ? " active" : ""}`} onClick={() => { setMode("signup"); setError(""); }}>
                    साइन अप
                  </button>
                </div>

                {/* Signup-only: name */}
                {mode === "signup" && (
                  <div className="nhh-field">
                    <label className="nhh-label">नाम (वैकल्पिक)</label>
                    <input
                      className="nhh-input"
                      type="text"
                      placeholder="आपका नाम"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoComplete="name"
                    />
                  </div>
                )}

                {/* Email */}
                <div className="nhh-field">
                  <label className="nhh-label">ईमेल</label>
                  <input
                    className={`nhh-input${error && !email ? " error" : ""}`}
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(""); }}
                    autoComplete="email"
                  />
                </div>

                {/* Password */}
                <div className="nhh-field">
                  <label className="nhh-label">पासवर्ड</label>
                  <div className="nhh-input-wrap">
                    <input
                      className={`nhh-input nhh-input-pass${error && !password ? " error" : ""}`}
                      type={showPass ? "text" : "password"}
                      placeholder={mode === "signup" ? "कम से कम 6 अक्षर" : "आपका पासवर्ड"}
                      value={password}
                      onChange={(e) => { setPassword(e.target.value); setError(""); }}
                      onKeyDown={(e) => e.key === "Enter" && (mode === "login" ? handleLogin() : handleSignup())}
                      autoComplete={mode === "login" ? "current-password" : "new-password"}
                    />
                    <button className="nhh-pass-toggle" type="button" onClick={() => setShowPass(p => !p)}>
                      {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                {/* Signup-only: confirm password */}
                {mode === "signup" && (
                  <div className="nhh-field">
                    <label className="nhh-label">पासवर्ड पुनः दर्ज करें</label>
                    <div className="nhh-input-wrap">
                      <input
                        className={`nhh-input nhh-input-pass${error && confirmPass !== password ? " error" : ""}`}
                        type={showConfirmPass ? "text" : "password"}
                        placeholder="पासवर्ड दोहराएं"
                        value={confirmPass}
                        onChange={(e) => { setConfirmPass(e.target.value); setError(""); }}
                        onKeyDown={(e) => e.key === "Enter" && handleSignup()}
                        autoComplete="new-password"
                      />
                      <button className="nhh-pass-toggle" type="button" onClick={() => setShowConfirmPass(p => !p)}>
                        {showConfirmPass ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </div>
                )}

                {/* Signup-only: notify */}
                {mode === "signup" && (
                  <label className="nhh-notify-row">
                    <input type="checkbox" checked={notify} onChange={() => setNotify(p => !p)} />
                    <span>ऑफ़र और अपडेट की सूचना दें</span>
                  </label>
                )}

                {/* Error */}
                {error && <div className="nhh-error">⚠ {error}</div>}

                {/* Submit */}
                <button
                  className="nhh-submit-btn"
                  onClick={mode === "login" ? handleLogin : handleSignup}
                  disabled={submitting}
                >
                  {submitting && <span className="nhh-spinner" />}
                  {submitting
                    ? "कृपया प्रतीक्षा करें…"
                    : mode === "login" ? "लॉग इन करें" : "खाता बनाएं"}
                </button>

                <div className="nhh-terms">
                  जारी रखने पर आप हमारी{" "}
                  <a href="#">गोपनीयता नीति और शर्तों</a> को स्वीकार करते हैं।
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── MOBILE DRAWER ── */}
      {menuOpen && (
        <div className="nhh-mob-drawer">
          <div className="nhh-mob-head">
            <div>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, fontWeight: 700, color: "#1a3d1e" }}>Akravi</span>
              <span style={{ fontFamily: "'Tiro Devanagari Hindi', serif", fontSize: 11, color: "#6b7280", marginLeft: 6 }}>आकृवि</span>
            </div>
            <button
              style={{
                width: 34, height: 34, borderRadius: "50%",
                border: "1.5px solid rgba(24,75,36,0.20)",
                background: "rgba(255,255,255,0.7)",
                cursor: "pointer", display: "flex", alignItems: "center",
                justifyContent: "center", color: "#444"
              }}
              onClick={() => setMenuOpen(false)}
            >
              <X size={14} />
            </button>
          </div>
          {navLinks.map((l) => (
            <div key={l.label} className="nhh-mob-link" onClick={() => { navigate(l.path); setMenuOpen(false); }}>
              <span>{l.label}</span>
              <span style={{ color: "#94a3b8", fontSize: 18 }}>›</span>
            </div>
          ))}
          {loggedInUser ? (
            <>
              <div className="nhh-mob-link" onClick={() => { navigate("/my-orders"); setMenuOpen(false); }}>
                <span>मेरे ऑर्डर</span>
                <span style={{ color: "#94a3b8", fontSize: 18 }}>›</span>
              </div>
              <div className="nhh-mob-link" style={{ color: "#c0392b" }} onClick={handleLogout}>
                <span>लॉग आउट</span>
                <span style={{ color: "#94a3b8", fontSize: 18 }}>›</span>
              </div>
            </>
          ) : (
            <div className="nhh-mob-link" onClick={() => { openModal("login"); setMenuOpen(false); }}>
              <span>लॉगिन / साइन अप</span>
              <span style={{ color: "#94a3b8", fontSize: 18 }}>›</span>
            </div>
          )}
        </div>
      )}
    </>
  );
}