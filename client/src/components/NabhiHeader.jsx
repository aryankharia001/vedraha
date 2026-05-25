import React, { useState, useEffect, useRef } from "react";
import { Search, User, ShoppingBag, X, Menu, CheckCircle, Eye, EyeOff, Package, LogOut, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { backendurl } from "../App";

// ── NabhiHeader ───────────────────────────────────────────────────────────────
export default function NabhiHeader({ onCartOpen, cartCount = 0 }) {
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
    } finally {
      setSubmitting(false);
    }
  };

  // ── SIGNUP ─────────────────────────────────────────────────────────────────
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
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("akravi_token");
    localStorage.removeItem("akravi_user");
    setLoggedInUser(null);
    setDropdownOpen(false);
    navigate("/exclusive-products");
  };

  const handleMyOrders = () => {
    setDropdownOpen(false);
    navigate("/my-orders-en");
  };

  const handleCartClick = () => onCartOpen?.();

  const navLinks = [
    { label: "CATALOG", path: "/exclusive-products" },
    { label: "CONTACT US", path: "/products/nabhi-eng-contact" },
    { label: "ABOUT US", path: "/products/nabhi-eng-aboutus" },
  ];

  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };

  const displayName = loggedInUser?.name || loggedInUser?.email?.split("@")[0] || "Account";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; }

        .nh-wrap {
          position: sticky; top: 0; z-index: 500;
          background: #f7f5f0; border-bottom: 1px solid #e6e2d8;
          font-family: 'DM Sans', sans-serif;
        }
        .nh-inner {
          max-width: 1240px; margin: 0 auto;
          padding: 0 32px; height: 68px;
          display: flex; align-items: center; justify-content: space-between; gap: 24px;
        }
        .nh-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; flex-shrink: 0; }
        .nh-logo-name { font-family: 'Cormorant Garamond', serif; font-size: 20px; font-weight: 700; color: #1a1a1a; line-height: 1.2; }
        .nh-nav { display: flex; align-items: center; gap: 2px; }
        .nh-nav a { font-size: 13px; font-weight: 700; color: #1a1a1a; text-decoration: none; letter-spacing: 0.08em; padding: 8px 14px; border-radius: 6px; transition: background 0.15s; }
        .nh-nav a:hover { background: rgba(0,0,0,0.05); }
        @media (max-width: 860px) { .nh-nav { display: none; } }
        .nh-icons { display: flex; align-items: center; gap: 4px; }
        .nh-ibtn { width: 38px; height: 38px; border-radius: 50%; background: none; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #1a1a1a; position: relative; transition: background 0.15s; }
        .nh-ibtn:hover { background: rgba(0,0,0,0.06); }
        .nh-badge { position: absolute; top: 1px; right: 1px; width: 18px; height: 18px; border-radius: 50%; background: #1a1a1a; color: #fff; font-size: 10px; font-weight: 700; display: flex; align-items: center; justify-content: center; border: 2px solid #f7f5f0; }
        .nh-hamburger { display: none !important; }
        @media (max-width: 860px) { .nh-hamburger { display: flex !important; } }

        /* ── User Account Button ── */
        .nh-user-btn {
          display: flex; align-items: center; gap: 6px;
          padding: 6px 12px; height: 38px;
          border-radius: 20px; background: none; border: 1.5px solid transparent;
          cursor: pointer; color: #1a1a1a; transition: all 0.15s;
          font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 600;
        }
        .nh-user-btn:hover, .nh-user-btn.open {
          background: rgba(0,0,0,0.05);
          border-color: #e0ddd5;
        }
        .nh-user-name { max-width: 80px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        @media (max-width: 480px) { .nh-user-name { display: none; } }

        /* ── Dropdown ── */
        .nh-dropdown {
          position: absolute; top: calc(100% + 8px); right: 0;
          background: #fff; border: 1px solid #e6e2d8; border-radius: 14px;
          box-shadow: 0 12px 40px rgba(0,0,0,0.14); min-width: 200px;
          z-index: 600; overflow: hidden;
          animation: nhDropIn 0.18s cubic-bezier(0.16,1,0.3,1);
        }
        @keyframes nhDropIn { from { opacity: 0; transform: translateY(-8px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
        .nh-drop-header {
          padding: 14px 16px 10px;
          border-bottom: 1px solid #f0ede6;
        }
        .nh-drop-email { font-size: 12px; color: #888; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .nh-drop-name { font-size: 14px; font-weight: 700; color: #1a1a1a; margin-bottom: 2px; }
        .nh-drop-item {
          display: flex; align-items: center; gap: 10px;
          padding: 12px 16px; font-size: 13.5px; font-weight: 500; color: #1a1a1a;
          cursor: pointer; transition: background 0.12s; background: none; border: none;
          width: 100%; text-align: left; font-family: 'DM Sans', sans-serif;
        }
        .nh-drop-item:hover { background: #f7f5f0; }
        .nh-drop-item.danger { color: #c0392b; }
        .nh-drop-item.danger:hover { background: #fdf2f2; }
        .nh-drop-divider { border: none; border-top: 1px solid #f0ede6; margin: 0; }

        /* Overlay */
        .nh-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.52); z-index: 600; animation: nhFadeIn 0.2s ease; }
        @keyframes nhFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes nhScaleIn { from { opacity: 0; transform: translate(-50%, -50%) scale(0.95); } to { opacity: 1; transform: translate(-50%, -50%) scale(1); } }

        /* Modal */
        .nh-modal {
          position: fixed; top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 760px; max-width: 96vw;
          background: #fff; border-radius: 20px;
          z-index: 700; display: flex;
          animation: nhScaleIn 0.25s cubic-bezier(0.16,1,0.3,1);
          overflow: hidden;
          box-shadow: 0 24px 80px rgba(0,0,0,0.22);
        }

        /* Left panel */
        .nh-modal-left {
          flex: 1; padding: 40px 32px;
          background: #f7f5f0;
          display: flex; flex-direction: column; justify-content: center;
        }
        .nh-modal-left-title { font-family: 'Cormorant Garamond', serif; font-size: 26px; font-weight: 700; color: #1a1a1a; line-height: 1.3; margin-bottom: 10px; }
        .nh-modal-left-sub { font-size: 13px; color: #777; line-height: 1.7; margin-bottom: 28px; }
        .nh-benefit-cards { display: flex; flex-direction: column; gap: 12px; }
        .nh-benefit-card { padding: 14px 16px; background: #fff; border-radius: 12px; border: 1px solid #e8e4da; display: flex; align-items: flex-start; gap: 12px; }
        .nh-bc-icon { font-size: 20px; flex-shrink: 0; margin-top: 1px; }
        .nh-bc-title { font-size: 13px; font-weight: 700; color: #1a1a1a; margin-bottom: 2px; }
        .nh-bc-desc { font-size: 11px; color: #888; line-height: 1.4; }

        /* Right panel */
        .nh-modal-right {
          width: 320px; padding: 36px 28px;
          border-left: 1px solid #f0ede6;
          display: flex; flex-direction: column; justify-content: center;
          position: relative;
        }
        .nh-modal-close { position: absolute; top: 14px; right: 14px; width: 32px; height: 32px; border-radius: 50%; border: 1.5px solid #d6d2c8; background: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #555; transition: background 0.15s; }
        .nh-modal-close:hover { background: #f5f3ef; }

        /* Mode tabs */
        .nh-tabs { display: flex; gap: 0; margin-bottom: 24px; border-bottom: 1.5px solid #eee; }
        .nh-tab { flex: 1; padding: 8px 0; font-size: 13px; font-weight: 700; color: #aaa; letter-spacing: 0.06em; background: none; border: none; cursor: pointer; border-bottom: 2px solid transparent; margin-bottom: -1.5px; transition: color 0.15s, border-color 0.15s; font-family: 'DM Sans', sans-serif; }
        .nh-tab.active { color: #1a1a1a; border-bottom-color: #1a1a1a; }

        /* Form fields */
        .nh-field { margin-bottom: 14px; }
        .nh-label { display: block; font-size: 11px; font-weight: 600; color: #666; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 6px; }
        .nh-input-wrap { position: relative; }
        .nh-input {
          width: 100%; padding: 10px 14px; font-size: 13.5px; font-family: 'DM Sans', sans-serif;
          border: 1.5px solid #e0ddd5; border-radius: 10px; background: #faf9f7; color: #1a1a1a;
          outline: none; transition: border-color 0.15s, box-shadow 0.15s;
        }
        .nh-input:focus { border-color: #1a1a1a; box-shadow: 0 0 0 3px rgba(26,26,26,0.06); background: #fff; }
        .nh-input.error { border-color: #c0392b; }
        .nh-input-pass { padding-right: 40px; }
        .nh-pass-toggle { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: #999; padding: 0; display: flex; }
        .nh-pass-toggle:hover { color: #555; }

        .nh-error { font-size: 12px; color: #c0392b; margin-bottom: 12px; display: flex; align-items: center; gap: 5px; }

        .nh-notify-row { display: flex; align-items: center; gap: 8px; font-size: 12.5px; color: #666; cursor: pointer; margin-bottom: 16px; }
        .nh-notify-row input { accent-color: #1a1a1a; width: 14px; height: 14px; flex-shrink: 0; }

        .nh-submit-btn {
          width: 100%; padding: 12px; background: #1a1a1a; color: #fff;
          border: none; border-radius: 30px; font-size: 14px; font-weight: 700;
          cursor: pointer; font-family: 'DM Sans', sans-serif;
          transition: background 0.2s; display: flex; align-items: center; justify-content: center; gap: 8px;
          margin-bottom: 16px;
        }
        .nh-submit-btn:hover:not(:disabled) { background: #333; }
        .nh-submit-btn:disabled { opacity: 0.65; cursor: not-allowed; }

        .nh-switch-mode { font-size: 12.5px; color: #888; text-align: center; }
        .nh-switch-mode button { background: none; border: none; color: #1a1a1a; font-weight: 700; cursor: pointer; font-size: 12.5px; font-family: 'DM Sans', sans-serif; text-decoration: underline; }

        .nh-terms { font-size: 11px; color: #999; text-align: center; line-height: 1.6; margin-top: 10px; }
        .nh-terms a { color: #555; text-decoration: underline; }

        /* Success */
        .nh-success-wrap { display: flex; flex-direction: column; align-items: center; text-align: center; padding: 8px 0; }
        .nh-success-icon { width: 56px; height: 56px; background: #f0f7ee; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 14px; }
        .nh-success-title { font-size: 17px; font-weight: 700; color: #1a1a1a; margin-bottom: 8px; font-family: 'Cormorant Garamond', serif; }
        .nh-success-sub { font-size: 13px; color: #666; line-height: 1.7; margin-bottom: 18px; }
        .nh-success-close-btn { padding: 11px 28px; background: #1a1a1a; color: #fff; border: none; border-radius: 30px; font-size: 14px; font-weight: 600; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: background 0.2s; }
        .nh-success-close-btn:hover { background: #333; }

        @keyframes nhSpin { to { transform: rotate(360deg); } }
        .nh-spinner { width: 16px; height: 16px; border: 2px solid rgba(255,255,255,0.4); border-top-color: #fff; border-radius: 50%; animation: nhSpin 0.6s linear infinite; flex-shrink: 0; }

        @media (max-width: 600px) {
          .nh-modal { flex-direction: column; }
          .nh-modal-left { display: none; }
          .nh-modal-right { width: 100%; border-left: none; padding: 32px 24px; }
        }

        /* Mobile menu */
        .nh-mob-drawer { position: fixed; top: 0; left: 0; width: 280px; max-width: 85vw; height: 100%; background: #fff; z-index: 700; display: flex; flex-direction: column; animation: nhSlideIn 0.28s cubic-bezier(0.16,1,0.3,1); box-shadow: 8px 0 40px rgba(0,0,0,0.12); }
        @keyframes nhSlideIn { from { transform: translateX(-100%); } to { transform: translateX(0); } }
        .nh-mob-head { padding: 18px 20px; border-bottom: 1px solid #eeebe4; display: flex; align-items: center; justify-content: space-between; }
        .nh-mob-link { display: flex; align-items: center; justify-content: space-between; padding: 15px 20px; font-size: 13px; font-weight: 700; color: #1a1a1a; letter-spacing: 0.08em; border-bottom: 1px solid #f5f3ef; cursor: pointer; transition: background 0.15s; }
        .nh-mob-link:hover { background: #f5f3ef; }
      `}</style>

      {/* ── HEADER ── */}
      <div className="nh-wrap">
        <div className="nh-inner">
          <a href="/" className="nh-logo" >
            <div className="nh-logo-name">
  <img src="https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=nabhiLogo.webp&version_id=null" alt="Nabhi Amrit" style={{ width: "80px", height: "auto" }} />
</div>
          </a>

          <nav className="nh-nav">
            {navLinks.map((l) => (
              <a key={l.label} href="#" onClick={(e) => { e.preventDefault(); navigate(l.path); }}>
                {l.label}
              </a>
            ))}
          </nav>

          <div className="nh-icons">
  {/* ── User icon / dropdown ── */}
  <div ref={dropdownRef} style={{ position: "relative" }}>
    <button
      className={`${
        loggedInUser ? "nh-user-btn" : "nh-ibtn"
      }${dropdownOpen ? " open" : ""}`}
      onClick={() => setDropdownOpen((p) => !p)}
      title={loggedInUser ? loggedInUser.email : "Login / Sign up"}
      aria-label="Account"
    >
      <User size={loggedInUser ? 17 : 19} strokeWidth={1.8} />

      {loggedInUser && (
        <span className="nh-user-name">{displayName}</span>
      )}

      {loggedInUser && (
        <ChevronDown
          size={13}
          strokeWidth={2.5}
          style={{
            transform: dropdownOpen
              ? "rotate(180deg)"
              : "rotate(0)",
            transition: "transform 0.18s",
          }}
        />
      )}
    </button>

    {dropdownOpen && (
      <div className="nh-dropdown">

        {/* Logged in user info */}
        {loggedInUser && (
          <div className="nh-drop-header">
            <div className="nh-drop-name">
              {loggedInUser.name || displayName}
            </div>

            <div className="nh-drop-email">
              {loggedInUser.email}
            </div>
          </div>
        )}

        {/* My Orders in BOTH cases */}
        <button
          className="nh-drop-item"
          onClick={() => {
            setDropdownOpen(false);

            handleMyOrders();
            // if (loggedInUser) {
            // } else {
            //   openModal("login");
            // }
          }}
        >
          <Package size={15} color="#555" />
          My Orders
        </button>

        <hr className="nh-drop-divider" />

        {/* Login if logged out */}
        {!loggedInUser ? (
          <button
            className="nh-drop-item"
            onClick={() => {
              openModal("login");
              setDropdownOpen(false);
            }}
          >
            <User size={15} />
            Login / Sign Up
          </button>
        ) : (
          /* Logout if logged in */
          <button
            className="nh-drop-item danger"
            onClick={() => {
              handleLogout();
              setDropdownOpen(false);
            }}
          >
            <LogOut size={15} />
            Logout
          </button>
        )}
      </div>
    )}
  </div>

  <button
    className="nh-ibtn"
    aria-label="Cart"
    onClick={handleCartClick}
  >
    <ShoppingBag size={19} strokeWidth={1.8} />
    {cartCount > 0 && (
      <span className="nh-badge">{cartCount}</span>
    )}
  </button>

  <button
    className="nh-ibtn nh-hamburger"
    onClick={() => setMenuOpen(true)}
  >
    <Menu size={20} />
  </button>
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
          {/* Left panel */}
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

          {/* Right panel */}
          <div className="nh-modal-right">
            <button className="nh-modal-close" onClick={() => setModalOpen(false)}><X size={13} /></button>

            {submitted ? (
              <div className="nh-success-wrap">
                <div className="nh-success-icon">
                  <CheckCircle size={28} color="#2d5a27" strokeWidth={1.8} />
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
                {/* Tabs */}
                <div className="nh-tabs">
                  <button className={`nh-tab${mode === "login" ? " active" : ""}`} onClick={() => { setMode("login"); setError(""); }}>
                    LOGIN
                  </button>
                  <button className={`nh-tab${mode === "signup" ? " active" : ""}`} onClick={() => { setMode("signup"); setError(""); }}>
                    SIGN UP
                  </button>
                </div>

                {/* Signup-only: name */}
                {mode === "signup" && (
                  <div className="nh-field">
                    <label className="nh-label">Name (optional)</label>
                    <input
                      className="nh-input"
                      type="text"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoComplete="name"
                    />
                  </div>
                )}

                {/* Email */}
                <div className="nh-field">
                  <label className="nh-label">Email</label>
                  <input
                    className={`nh-input${error && !email ? " error" : ""}`}
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(""); }}
                    autoComplete="email"
                  />
                </div>

                {/* Password */}
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

                {/* Signup-only: confirm password */}
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

                {/* Signup-only: notify */}
                {mode === "signup" && (
                  <label className="nh-notify-row">
                    <input type="checkbox" checked={notify} onChange={() => setNotify(p => !p)} />
                    <span>Notify me with offers &amp; updates</span>
                  </label>
                )}

                {/* Error */}
                {error && <div className="nh-error">⚠ {error}</div>}

                {/* Submit */}
                <button
                  className="nh-submit-btn"
                  onClick={mode === "login" ? handleLogin : handleSignup}
                  disabled={submitting}
                >
                  {submitting && <span className="nh-spinner" />}
                  {submitting ? "Please wait…" : mode === "login" ? "Log In" : "Create Account"}
                </button>

                <div className="nh-terms">
                  By continuing you accept our{" "}
                  <a href="#">Privacy Policy and T&Cs.</a>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── MOBILE MENU ── */}
      {menuOpen && (
        <div className="nh-mob-drawer">
          <div className="nh-mob-head">
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, fontWeight: 700 }}>Akravi</span>
            <button
              style={{ width: 36, height: 36, borderRadius: "50%", border: "1.5px solid #e0ddd5", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#444" }}
              onClick={() => setMenuOpen(false)}
            >
              <X size={15} />
            </button>
          </div>
          {navLinks.map((l) => (
            <div key={l.label} className="nh-mob-link" onClick={() => { navigate(l.path); setMenuOpen(false); }}>
              <span>{l.label}</span>
              <span style={{ color: "#ccc", fontSize: 18 }}>›</span>
            </div>
          ))}
          {loggedInUser ? (
            <>
              <div className="nh-mob-link" onClick={() => { navigate("/my-orders-en"); setMenuOpen(false); }}>
                <span>MY ORDERS</span>
                <span style={{ color: "#ccc", fontSize: 18 }}>›</span>
              </div>
              <div className="nh-mob-link" style={{ color: "#c0392b" }} onClick={handleLogout}>
                <span>LOGOUT</span>
                <span style={{ color: "#ccc", fontSize: 18 }}>›</span>
              </div>
            </>
          ) : (
            <div className="nh-mob-link" onClick={() => { openModal("login"); setMenuOpen(false); }}>
              <span>LOGIN / SIGN UP</span>
              <span style={{ color: "#ccc", fontSize: 18 }}>›</span>
            </div>
          )}
        </div>
      )}
    </>
  );
}