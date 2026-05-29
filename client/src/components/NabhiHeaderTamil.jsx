import React, { useState, useEffect, useRef } from "react";
import { Search, User, ShoppingBag, X, Menu, CheckCircle, Eye, EyeOff, Package, LogOut, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { backendurl } from "../App";

export default function NabhiHeaderTamil({ onCartOpen, cartCount = 0 }) {
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
    if (!email.trim()) return setError("மின்னஞ்சல் தேவை");
    if (!validateEmail(email)) return setError("சரியான மின்னஞ்சல் முகவரியை உள்ளிடவும்");
    if (!password) return setError("கடவுச்சொல் தேவை");
    setError(""); setSubmitting(true);
    try {
      const res = await fetch(`${backendurl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });
      const data = await res.json();
      if (!data.success) return setError(data.message || "உள்நுழைவு தோல்வியடைந்தது");
      localStorage.setItem("akravi_token", data.token);
      localStorage.setItem("akravi_user", JSON.stringify(data.user));
      setLoggedInUser(data.user);
      setSubmitted(true);
    } catch {
      setError("நெட்வொர்க் பிழை. மீண்டும் முயற்சிக்கவும்.");
    } finally { setSubmitting(false); }
  };

  const handleSignup = async () => {
    if (!email.trim()) return setError("மின்னஞ்சல் தேவை");
    if (!validateEmail(email)) return setError("சரியான மின்னஞ்சல் முகவரியை உள்ளிடவும்");
    if (!password) return setError("கடவுச்சொல் தேவை");
    if (password.length < 6) return setError("கடவுச்சொல் குறைந்தது 6 எழுத்துகள் இருக்க வேண்டும்");
    if (password !== confirmPass) return setError("கடவுச்சொற்கள் பொருந்தவில்லை");
    setError(""); setSubmitting(true);
    try {
      const res = await fetch(`${backendurl}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password, name: name.trim(), notifyOffers: notify }),
      });
      const data = await res.json();
      if (!data.success) return setError(data.message || "பதிவு தோல்வியடைந்தது");
      localStorage.setItem("akravi_token", data.token);
      localStorage.setItem("akravi_user", JSON.stringify(data.user));
      setLoggedInUser(data.user);
      setSubmitted(true);
    } catch {
      setError("நெட்வொர்க் பிழை. மீண்டும் முயற்சிக்கவும்.");
    } finally { setSubmitting(false); }
  };

  const handleLogout = () => {
    localStorage.removeItem("akravi_token");
    localStorage.removeItem("akravi_user");
    setLoggedInUser(null);
    setDropdownOpen(false);
    navigate("/exclusive-products-tml");
  };

  const handleMyOrders = () => { setDropdownOpen(false); navigate("/my-orders-tml"); };
  const handleCartClick = () => onCartOpen?.();

  const navLinks = [
    { label: "தயாரிப்புகள்",          path: "/exclusive-products-tml" },
    { label: "தொடர்பு கொள்ளுங்கள்",   path: "/products/nabhi-tml-contact" },
    { label: "எங்களை பற்றி",           path: "/products/nabhi-tml-aboutus" },
  ];

  const displayName = loggedInUser?.name || loggedInUser?.email?.split("@")[0] || "கணக்கு";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; }

        /* ══════════════════════════════════════════
           FLOATING PILL NAVBAR
        ══════════════════════════════════════════ */
        .nh-wrap {
          position: fixed;
          inset:0;
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

          background: rgba(232, 242, 235, 0.72);
          backdrop-filter: blur(18px) saturate(160%);
          -webkit-backdrop-filter: blur(18px) saturate(160%);

          border-radius: 9999px;
          border: 1px solid rgba(24, 75, 36, 0.18);

          box-shadow:
            0 4px 24px rgba(24, 75, 36, 0.10),
            0 1px 4px rgba(0,0,0,0.06),
            inset 0 1px 0 rgba(255,255,255,0.55);
        }

        /* ── Logo ── */
        .nh-logo {
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          flex-shrink: 0;
          padding: 0 4px;
        }
        .nh-logo-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px;
          font-weight: 700;
          color: #1a1a1a;
          line-height: 1.2;
        }

        /* ── Nav links ── */
        .nh-nav {
          display: flex;
          align-items: center;
          gap: 2px;
          flex: 1;
          justify-content: center;
        }
        .nh-nav a {
          font-size: 12px;
          font-weight: 700;
          color: #1a3d1e;
          text-decoration: none;
          letter-spacing: 0.08em;
          padding: 7px 13px;
          border-radius: 9999px;
          transition: background 0.18s, color 0.18s;
          white-space: nowrap;
        }
        .nh-nav a:hover {
          background: rgba(24, 75, 36, 0.10);
          color: #184b24;
        }
        @media (max-width: 860px) { .nh-nav { display: none; } }

        /* ── Icon strip ── */
        .nh-icons {
          display: flex;
          align-items: center;
          gap: 4px;
          flex-shrink: 0;
        }

        .nh-ibtn {
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
        .nh-ibtn:hover { background: rgba(24,75,36,0.10); }

        /* Cart badge */
        .nh-badge {
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
        .nh-hamburger { display: none !important; }
        @media (max-width: 860px) { .nh-hamburger { display: flex !important; } }

        /* ── User pill button ── */
        .nh-user-btn {
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
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 600;
        }
        .nh-user-btn:hover, .nh-user-btn.open {
          background: rgba(24,75,36,0.15);
          border-color: rgba(24,75,36,0.30);
        }
        .nh-user-name {
          max-width: 72px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        @media (max-width: 480px) { .nh-user-name { display: none; } }

        /* ── "Shop Now" CTA pill ── */
        .nh-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 0 18px;
          height: 40px;
          border-radius: 9999px;
          background: #184b24;
          color: #ffffff;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.04em;
          white-space: nowrap;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(24,75,36,0.32);
          transition: background 0.18s, box-shadow 0.18s, transform 0.15s;
          text-decoration: none;
          flex-shrink: 0;
        }
        .nh-cta-btn:hover {
          background: #0f3119;
          box-shadow: 0 6px 20px rgba(24,75,36,0.40);
          transform: translateY(-1px);
        }
        @media (max-width: 480px) { .nh-cta-btn { display: none; } }

        /* ── Dropdown ── */
        .nh-dropdown {
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
          animation: nhDropIn 0.18s cubic-bezier(0.16,1,0.3,1);
        }
        @keyframes nhDropIn {
          from { opacity: 0; transform: translateY(-8px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .nh-drop-header { padding: 14px 16px 10px; border-bottom: 1px solid rgba(24,75,36,0.10); }
        .nh-drop-email  { font-size: 12px; color: #6b7280; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .nh-drop-name   { font-size: 14px; font-weight: 700; color: #111827; margin-bottom: 2px; }
        .nh-drop-item {
          display: flex; align-items: center; gap: 10px;
          padding: 11px 16px;
          font-size: 13px; font-weight: 500; color: #1a3d1e;
          cursor: pointer; transition: background 0.12s;
          background: none; border: none; width: 100%; text-align: left;
          font-family: 'DM Sans', sans-serif;
        }
        .nh-drop-item:hover { background: rgba(24,75,36,0.07); }
        .nh-drop-item.danger { color: #c0392b; }
        .nh-drop-item.danger:hover { background: rgba(192,57,43,0.06); }
        .nh-drop-divider { border: none; border-top: 1px solid rgba(24,75,36,0.09); margin: 0; }

        /* ── Overlay / Modal ── */
        .nh-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.50);
          z-index: 600;
          animation: nhFadeIn 0.2s ease;
          backdrop-filter: blur(2px);
        }
        @keyframes nhFadeIn  { from { opacity: 0; } to { opacity: 1; } }
        @keyframes nhScaleIn { from { opacity: 0; transform: translate(-50%,-50%) scale(0.95); } to { opacity: 1; transform: translate(-50%,-50%) scale(1); } }

        .nh-modal {
          position: fixed; top: 50%; left: 50%;
          transform: translate(-50%,-50%);
          width: 760px; max-width: 96vw;
          background: #fff; border-radius: 20px;
          z-index: 700; display: flex;
          animation: nhScaleIn 0.25s cubic-bezier(0.16,1,0.3,1);
          overflow: hidden;
          box-shadow: 0 24px 80px rgba(0,0,0,0.22);
        }
        .nh-modal-left {
          flex: 1; padding: 40px 32px;
          background: #f0f7f2;
          display: flex; flex-direction: column; justify-content: center;
        }
        .nh-modal-left-title { font-family: 'Cormorant Garamond', serif; font-size: 26px; font-weight: 700; color: #1a1a1a; line-height: 1.3; margin-bottom: 10px; }
        .nh-modal-left-sub   { font-size: 13px; color: #6b7280; line-height: 1.7; margin-bottom: 28px; }
        .nh-benefit-cards    { display: flex; flex-direction: column; gap: 12px; }
        .nh-benefit-card     { padding: 14px 16px; background: #fff; border-radius: 12px; border: 1px solid #d1e7d8; display: flex; align-items: flex-start; gap: 12px; }
        .nh-bc-icon  { font-size: 20px; flex-shrink: 0; margin-top: 1px; }
        .nh-bc-title { font-size: 13px; font-weight: 700; color: #1a1a1a; margin-bottom: 2px; }
        .nh-bc-desc  { font-size: 11px; color: #6b7280; line-height: 1.4; }
        .nh-modal-right {
          width: 320px; padding: 36px 28px;
          border-left: 1px solid #e8f0ea;
          display: flex; flex-direction: column; justify-content: center;
          position: relative;
        }
        .nh-modal-close {
          position: absolute; top: 14px; right: 14px;
          width: 32px; height: 32px; border-radius: 50%;
          border: 1.5px solid #d1e7d8; background: #fff;
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          color: #555; transition: background 0.15s;
        }
        .nh-modal-close:hover { background: #f0f7f2; }
        .nh-tabs { display: flex; gap: 0; margin-bottom: 24px; border-bottom: 1.5px solid #e5e7eb; }
        .nh-tab  {
          flex: 1; padding: 8px 0;
          font-size: 13px; font-weight: 700; color: #9ca3af;
          letter-spacing: 0.06em; background: none; border: none; cursor: pointer;
          border-bottom: 2px solid transparent; margin-bottom: -1.5px;
          transition: color 0.15s, border-color 0.15s;
          font-family: 'DM Sans', sans-serif;
        }
        .nh-tab.active { color: #184b24; border-bottom-color: #184b24; }
        .nh-field  { margin-bottom: 14px; }
        .nh-label  { display: block; font-size: 11px; font-weight: 600; color: #6b7280; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 6px; }
        .nh-input-wrap { position: relative; }
        .nh-input {
          width: 100%; padding: 10px 14px; font-size: 13.5px;
          font-family: 'DM Sans', sans-serif;
          border: 1.5px solid #d1e7d8; border-radius: 10px;
          background: #f8fbf9; color: #1a1a1a;
          outline: none; transition: border-color 0.15s, box-shadow 0.15s;
        }
        .nh-input:focus { border-color: #184b24; box-shadow: 0 0 0 3px rgba(24,75,36,0.10); background: #fff; }
        .nh-input.error { border-color: #c0392b; }
        .nh-input-pass  { padding-right: 40px; }
        .nh-pass-toggle { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: #9ca3af; padding: 0; display: flex; }
        .nh-pass-toggle:hover { color: #555; }
        .nh-error { font-size: 12px; color: #c0392b; margin-bottom: 12px; display: flex; align-items: center; gap: 5px; }
        .nh-notify-row { display: flex; align-items: center; gap: 8px; font-size: 12.5px; color: #6b7280; cursor: pointer; margin-bottom: 16px; }
        .nh-notify-row input { accent-color: #184b24; width: 14px; height: 14px; flex-shrink: 0; }
        .nh-submit-btn {
          width: 100%; padding: 12px; background: #184b24; color: #fff;
          border: none; border-radius: 30px; font-size: 14px; font-weight: 700;
          cursor: pointer; font-family: 'DM Sans', sans-serif;
          transition: background 0.2s;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          margin-bottom: 16px;
          box-shadow: 0 4px 14px rgba(24,75,36,0.25);
        }
        .nh-submit-btn:hover:not(:disabled) { background: #0f3119; }
        .nh-submit-btn:disabled { opacity: 0.65; cursor: not-allowed; }
        .nh-switch-mode { font-size: 12.5px; color: #6b7280; text-align: center; }
        .nh-switch-mode button { background: none; border: none; color: #184b24; font-weight: 700; cursor: pointer; font-size: 12.5px; font-family: 'DM Sans', sans-serif; text-decoration: underline; }
        .nh-terms { font-size: 11px; color: #9ca3af; text-align: center; line-height: 1.6; margin-top: 10px; }
        .nh-terms a { color: #555; text-decoration: underline; }
        .nh-success-wrap  { display: flex; flex-direction: column; align-items: center; text-align: center; padding: 8px 0; }
        .nh-success-icon  { width: 56px; height: 56px; background: #e8f5e9; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 14px; }
        .nh-success-title { font-size: 17px; font-weight: 700; color: #1a1a1a; margin-bottom: 8px; font-family: 'Cormorant Garamond', serif; }
        .nh-success-sub   { font-size: 13px; color: #6b7280; line-height: 1.7; margin-bottom: 18px; }
        .nh-success-close-btn { padding: 11px 28px; background: #184b24; color: #fff; border: none; border-radius: 30px; font-size: 14px; font-weight: 600; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: background 0.2s; }
        .nh-success-close-btn:hover { background: #0f3119; }
        @keyframes nhSpin { to { transform: rotate(360deg); } }
        .nh-spinner { width: 16px; height: 16px; border: 2px solid rgba(255,255,255,0.4); border-top-color: #fff; border-radius: 50%; animation: nhSpin 0.6s linear infinite; flex-shrink: 0; }
        @media (max-width: 600px) {
          .nh-modal { flex-direction: column; }
          .nh-modal-left { display: none; }
          .nh-modal-right { width: 100%; border-left: none; padding: 32px 24px; }
        }

        /* ── Mobile drawer ── */
        .nh-mob-drawer {
          position: fixed; top: 0; left: 0;
          width: 280px; max-width: 85vw; height: 100%;
          background: rgba(240,247,242,0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          z-index: 700;
          display: flex; flex-direction: column;
          animation: nhSlideIn 0.28s cubic-bezier(0.16,1,0.3,1);
          box-shadow: 8px 0 40px rgba(0,0,0,0.12);
          border-right: 1px solid rgba(24,75,36,0.12);
        }
        @keyframes nhSlideIn { from { transform: translateX(-100%); } to { transform: translateX(0); } }
        .nh-mob-head {
          padding: 18px 20px;
          border-bottom: 1px solid rgba(24,75,36,0.10);
          display: flex; align-items: center; justify-content: space-between;
        }
        .nh-mob-link {
          display: flex; align-items: center; justify-content: space-between;
          padding: 15px 20px;
          font-size: 13px; font-weight: 700; color: #1a3d1e;
          letter-spacing: 0.08em;
          border-bottom: 1px solid rgba(24,75,36,0.07);
          cursor: pointer; transition: background 0.15s;
        }
        .nh-mob-link:hover { background: rgba(24,75,36,0.06); }
      `}</style>

      {/* ══════════════════════════════════════════
          FLOATING PILL HEADER
      ══════════════════════════════════════════ */}
      <div className="nh-wrap">
        <div className="nh-inner">

          {/* Logo */}
          <a href="/" className="nh-logo">
            <div className="nh-logo-name">
              <img
                src="https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=nabhiLogo.webp&version_id=null"
                alt="நாபி அமிர்த்"
                style={{ width: "65px", height: "auto" }}
              />
            </div>
          </a>

          {/* Nav */}
          <nav className="nh-nav">
            {navLinks.map((l) => (
              <a key={l.label} href="#" onClick={(e) => { e.preventDefault(); navigate(l.path); }}>
                {l.label}
              </a>
            ))}
          </nav>

          {/* Icons + CTA */}
          <div className="nh-icons">

            {/* User / dropdown */}
            <div ref={dropdownRef} style={{ position: "relative" }}>
              <button
                className={`${loggedInUser ? "nh-user-btn" : "nh-ibtn"}${dropdownOpen ? " open" : ""}`}
                onClick={() => {
                  if (loggedInUser) { setDropdownOpen(p => !p); }
                  else { openModal("login"); }
                }}
                title={loggedInUser ? loggedInUser.email : "உள்நுழை / பதிவு செய்க"}
                aria-label="கணக்கு"
              >
                <User size={loggedInUser ? 16 : 18} strokeWidth={1.8} />
                {loggedInUser && <span className="nh-user-name">{displayName}</span>}
                {loggedInUser && (
                  <ChevronDown
                    size={12}
                    strokeWidth={2.5}
                    style={{ transform: dropdownOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.18s" }}
                  />
                )}
              </button>

              {dropdownOpen && (
                <div className="nh-dropdown">
                  {loggedInUser && (
                    <div className="nh-drop-header">
                      <div className="nh-drop-name">{loggedInUser.name || displayName}</div>
                      <div className="nh-drop-email">{loggedInUser.email}</div>
                    </div>
                  )}
                  <button className="nh-drop-item" onClick={() => { setDropdownOpen(false); handleMyOrders(); }}>
                    <Package size={15} color="#2a7048" /> என் ஆர்டர்கள்
                  </button>
                  <hr className="nh-drop-divider" />
                  {!loggedInUser ? (
                    <button className="nh-drop-item" onClick={() => { openModal("login"); setDropdownOpen(false); }}>
                      <User size={15} /> உள்நுழை / பதிவு செய்க
                    </button>
                  ) : (
                    <button className="nh-drop-item danger" onClick={() => { handleLogout(); setDropdownOpen(false); }}>
                      <LogOut size={15} /> வெளியேறு
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Cart */}
            <button className="nh-ibtn" aria-label="கார்ட்" onClick={handleCartClick}>
              <ShoppingBag size={18} strokeWidth={1.8} />
              {cartCount > 0 && <span className="nh-badge">{cartCount}</span>}
            </button>

            {/* Hamburger — mobile */}
            <button className="nh-ibtn nh-hamburger" onClick={() => setMenuOpen(true)}>
              <Menu size={19} />
            </button>

            {/* CTA pill */}
            <a
              href="#"
              className="nh-cta-btn"
              onClick={(e) => { e.preventDefault(); navigate("/exclusive-products-tml"); }}
            >
              இப்போது வாங்கவும்
            </a>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {(modalOpen || menuOpen) && (
        <div className="nh-overlay" onClick={() => { setModalOpen(false); setMenuOpen(false); }} />
      )}

      {/* ── AUTH MODAL ── */}
      {modalOpen && (
        <div className="nh-modal">
          <div className="nh-modal-left">
            <div className="nh-modal-left-title">
              {mode === "login" ? "அக்ரவிக்கு மீண்டும் வரவேற்கிறோம்." : "இன்றே அக்ரவியில் சேருங்கள்."}
            </div>
            <div className="nh-modal-left-sub">
              {mode === "login"
                ? "உங்கள் ஆர்டர்கள், சேமிக்கப்பட்ட பொருட்கள் மற்றும் சிறப்பு சலுகைகளை அணுக உள்நுழையவும்."
                : "உறுப்பினர் மட்டும் சலுகைகள் மற்றும் விரைவான செக்அவுட்டை திறக்க உங்கள் கணக்கை உருவாக்கவும்."}
            </div>
            <div className="nh-benefit-cards">
              {[
                { icon: "⭐", title: "வாடிக்கையாளர் முதல்",    desc: "ஒவ்வொரு முடிவிலும் உங்களை மையமாக வைக்கிறோம்" },
                { icon: "🔒", title: "பாதுகாப்பான & தனிப்பட்ட", desc: "உங்கள் தரவு எப்போதும் பாதுகாக்கப்படும்" },
                { icon: "🎁", title: "சிறப்பு சலுகைகள்",        desc: "உறுப்பினர் மட்டும் தள்ளுபடிகள் மற்றும் முன்கூட்டிய அணுகல்" },
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

          <div className="nh-modal-right">
            <button className="nh-modal-close" onClick={() => setModalOpen(false)}><X size={13} /></button>

            {submitted ? (
              <div className="nh-success-wrap">
                <div className="nh-success-icon">
                  <CheckCircle size={28} color="#184b24" strokeWidth={1.8} />
                </div>
                <div className="nh-success-title">
                  {mode === "login" ? "மீண்டும் வரவேற்கிறோம்!" : "நீங்கள் சேர்ந்துவிட்டீர்கள்!"}
                </div>
                <div className="nh-success-sub">
                  {mode === "login"
                    ? `மீண்டும் சந்திப்பதில் மகிழ்ச்சி, ${loggedInUser?.name || loggedInUser?.email?.split("@")[0]}.`
                    : `அக்ரவிக்கு வரவேற்கிறோம்${notify ? ". சிறந்த சலுகைகளை நாங்கள் தெரிவிப்போம்." : "."}`}
                </div>
                <button className="nh-success-close-btn" onClick={() => setModalOpen(false)}>
                  கொள்முதல் தொடரவும்
                </button>
              </div>
            ) : (
              <>
                <div className="nh-tabs">
                  <button className={`nh-tab${mode === "login" ? " active" : ""}`} onClick={() => { setMode("login"); setError(""); }}>உள்நுழைவு</button>
                  <button className={`nh-tab${mode === "signup" ? " active" : ""}`} onClick={() => { setMode("signup"); setError(""); }}>பதிவு செய்யவும்</button>
                </div>

                {mode === "signup" && (
                  <div className="nh-field">
                    <label className="nh-label">பெயர் (விருப்பமானது)</label>
                    <input className="nh-input" type="text" placeholder="உங்கள் பெயர்" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
                  </div>
                )}

                <div className="nh-field">
                  <label className="nh-label">மின்னஞ்சல்</label>
                  <input className={`nh-input${error && !email ? " error" : ""}`} type="email" placeholder="நீங்கள்@உதாரணம்.com" value={email} onChange={(e) => { setEmail(e.target.value); setError(""); }} autoComplete="email" />
                </div>

                <div className="nh-field">
                  <label className="nh-label">கடவுச்சொல்</label>
                  <div className="nh-input-wrap">
                    <input
                      className={`nh-input nh-input-pass${error && !password ? " error" : ""}`}
                      type={showPass ? "text" : "password"}
                      placeholder={mode === "signup" ? "குறைந்தது 6 எழுத்துகள்" : "உங்கள் கடவுச்சொல்"}
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
                    <label className="nh-label">கடவுச்சொல் உறுதிப்படுத்தல்</label>
                    <div className="nh-input-wrap">
                      <input
                        className={`nh-input nh-input-pass${error && confirmPass !== password ? " error" : ""}`}
                        type={showConfirmPass ? "text" : "password"}
                        placeholder="கடவுச்சொல்லை மீண்டும் உள்ளிடவும்"
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
                    <span>சலுகைகள் &amp; புதுப்பிப்புகளை அறிவிக்கவும்</span>
                  </label>
                )}

                {error && <div className="nh-error">⚠ {error}</div>}

                <button className="nh-submit-btn" onClick={mode === "login" ? handleLogin : handleSignup} disabled={submitting}>
                  {submitting && <span className="nh-spinner" />}
                  {submitting ? "காத்திருக்கவும்…" : mode === "login" ? "உள்நுழைய" : "கணக்கை உருவாக்கவும்"}
                </button>

                <div className="nh-terms">
                  தொடர்வதன் மூலம் நீங்கள் எங்கள் <a href="#">தனியுரிமைக் கொள்கை மற்றும் விதிமுறைகளை</a> ஏற்கிறீர்கள்.
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
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, fontWeight: 700, color: "#1a3d1e" }}>அக்ரவி</span>
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
              <div className="nh-mob-link" onClick={() => { navigate("/my-orders-tml"); setMenuOpen(false); }}>
                <span>என் ஆர்டர்கள்</span>
                <span style={{ color: "#94a3b8", fontSize: 18 }}>›</span>
              </div>
              <div className="nh-mob-link" style={{ color: "#c0392b" }} onClick={handleLogout}>
                <span>வெளியேறு</span>
                <span style={{ color: "#94a3b8", fontSize: 18 }}>›</span>
              </div>
            </>
          ) : (
            <div className="nh-mob-link" onClick={() => { openModal("login"); setMenuOpen(false); }}>
              <span>உள்நுழைவு / பதிவு செய்யவும்</span>
              <span style={{ color: "#94a3b8", fontSize: 18 }}>›</span>
            </div>
          )}
        </div>
      )}
    </>
  );
}