// src/components/NabhiHeader.jsx  (updated)
// ─────────────────────────────────────────────────────────────────────────────
// Changes:
//  • Logo anchor vertically centered (align-items: center on flex container)
//  • Nav font sizes bumped for readability
//  • Catalog nav item has a smooth animated dropdown for product pages
//  • Chevron rotates 180° on open / closes on outside click
//  • All other logic unchanged
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect, useRef } from "react";
import { Search, User, ShoppingBag, X, Menu, CheckCircle, Eye, EyeOff, Package, LogOut, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { backendurl } from "../App";

// ── Product sub-pages shown in the Catalog dropdown ──────────────────────────
const CATALOG_LINKS = [
  { label: "All Products",    path: "/products" },
  { label: "Nabhi Oils",      path: "/products/nabhi-oils" },
  { label: "Wellness Kits",   path: "/products/wellness-kits" },
  { label: "Herbal Blends",   path: "/products/herbal-blends" },
  { label: "Gift Sets",       path: "/products/gift-sets" },
];

export default function NabhiHeader({ onCartOpen, cartCount = 0 }) {
  const [modalOpen, setModalOpen]       = useState(false);
  const [mode, setMode]                 = useState("login");
  const [menuOpen, setMenuOpen]         = useState(false);
  const [userDropOpen, setUserDropOpen] = useState(false);
  const [catalogOpen, setCatalogOpen]   = useState(false);   // ← new

  const [email, setEmail]               = useState("");
  const [password, setPassword]         = useState("");
  const [showPass, setShowPass]         = useState(false);
  const [name, setName]                 = useState("");
  const [confirmPass, setConfirmPass]   = useState("");
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [notify, setNotify]             = useState(false);

  const [error, setError]               = useState("");
  const [submitting, setSubmitting]     = useState(false);
  const [submitted, setSubmitted]       = useState(false);

  const [loggedInUser, setLoggedInUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("akravi_user")) || null; }
    catch { return null; }
  });

  const navigate      = useNavigate();
  const userDropRef   = useRef(null);
  const catalogRef    = useRef(null);

  // ── Lock scroll when modal / drawer open ──────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = modalOpen || menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [modalOpen, menuOpen]);

  // ── Reset auth form on open ───────────────────────────────────────────────
  useEffect(() => {
    if (modalOpen) {
      setEmail(""); setPassword(""); setName(""); setConfirmPass("");
      setError(""); setSubmitting(false); setSubmitted(false);
      setShowPass(false); setShowConfirmPass(false); setNotify(false);
    }
  }, [modalOpen, mode]);

  // ── Close dropdowns on outside click ─────────────────────────────────────
  useEffect(() => {
    const handler = (e) => {
      if (userDropRef.current  && !userDropRef.current.contains(e.target))  setUserDropOpen(false);
      if (catalogRef.current   && !catalogRef.current.contains(e.target))   setCatalogOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const openModal      = (m = "login") => { setMode(m); setModalOpen(true); };
  const validateEmail  = (v) => /^\S+@\S+\.\S+$/.test(v);

  // ── Auth handlers ─────────────────────────────────────────────────────────
  const handleLogin = async () => {
    if (!email.trim())          return setError("Email is required");
    if (!validateEmail(email))  return setError("Enter a valid email address");
    if (!password)              return setError("Password is required");
    setError(""); setSubmitting(true);
    try {
      const res  = await fetch(`${backendurl}/api/auth/login`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: email.trim(), password }) });
      const data = await res.json();
      if (!data.success) return setError(data.message || "Login failed");
      localStorage.setItem("akravi_token", data.token);
      localStorage.setItem("akravi_user", JSON.stringify(data.user));
      setLoggedInUser(data.user); setSubmitted(true);
    } catch { setError("Network error. Please try again."); }
    finally   { setSubmitting(false); }
  };

  const handleSignup = async () => {
    if (!email.trim())                  return setError("Email is required");
    if (!validateEmail(email))          return setError("Enter a valid email address");
    if (!password)                      return setError("Password is required");
    if (password.length < 6)            return setError("Password must be at least 6 characters");
    if (password !== confirmPass)       return setError("Passwords do not match");
    setError(""); setSubmitting(true);
    try {
      const res  = await fetch(`${backendurl}/api/auth/signup`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: email.trim(), password, name: name.trim(), notifyOffers: notify }) });
      const data = await res.json();
      if (!data.success) return setError(data.message || "Signup failed");
      localStorage.setItem("akravi_token", data.token);
      localStorage.setItem("akravi_user", JSON.stringify(data.user));
      setLoggedInUser(data.user); setSubmitted(true);
    } catch { setError("Network error. Please try again."); }
    finally   { setSubmitting(false); }
  };

  const handleLogout = () => {
    localStorage.removeItem("akravi_token");
    localStorage.removeItem("akravi_user");
    setLoggedInUser(null); setUserDropOpen(false);
    navigate("/");
  };

  const handleMyOrders  = () => { setUserDropOpen(false); navigate("/my-orders-en"); };
  const handleCartClick = () => onCartOpen?.();

  const navLinks = [
    { label: "Home",    path: "/" },
    { label: "Contact", path: "/products/nabhi-contact-en" },
    { label: "About",   path: "/products/nabhi-about-en" },
  ];

  const displayName = loggedInUser?.name || loggedInUser?.email?.split("@")[0] || "Account";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; }

        /* ── Pill wrapper ───────────────────────────────────────────────── */
        .nh-wrap {
          position: fixed; inset: 0; z-index: 500;
          background: transparent; padding: 12px 20px;
          font-family: 'DM Sans', sans-serif; pointer-events: none;
        }
        .nh-inner {
          pointer-events: all;
          max-width: 890px; margin: 0 auto;
          height: 62px;
          display: flex; align-items: center; justify-content: space-between; gap: 16px;
          padding: 0 12px;
          background: rgba(255,255,255,0.3);
          backdrop-filter: blur(18px) saturate(160%);
          -webkit-backdrop-filter: blur(18px) saturate(160%);
          border-radius: 9999px;
          border: 1px solid rgba(24,75,36,0.18);
          box-shadow: 0 4px 24px rgba(24,75,36,0.10), 0 1px 4px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.55);
        }

        /* ── Logo ───────────────────────────────────────────────────────── */
        .nh-logo {
          display: flex;
          align-items: center;   /* ← vertical center fix */
          gap: 8px;
          text-decoration: none;
          flex-shrink: 0;
          padding: 0 4px;
          line-height: 1;        /* ← prevent line-height bloat */
        }
        .nh-logo img {
          display: block;        /* ← remove inline img baseline gap */
          width: 44px; height: auto;
        }
        .nh-logo-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px; font-weight: 700;
          color: #1a3d1e; letter-spacing: 0.02em;
          line-height: 1;
        }

        /* ── Desktop nav ─────────────────────────────────────────────────── */
        .nh-nav { display: flex; align-items: center; gap: 4px; }

        .nh-nav-link {
          font-size: 13px; font-weight: 600; letter-spacing: 0.07em;
          text-transform: capitalize; color: #2a4a1f; text-decoration: none;
          padding: 7px 12px; border-radius: 9999px;
          transition: background 0.18s, color 0.18s;
          white-space: nowrap;
        }
        .nh-nav-link:hover { background: rgba(45,90,39,0.10); color: #184b24; }

        /* ── Catalog dropdown trigger ────────────────────────────────────── */
        .nh-catalog-wrap { position: relative; }

        .nh-catalog-btn {
          display: flex; align-items: center; gap: 4px;
          font-size: 13px; font-weight: 600; letter-spacing: 0.07em;
          text-transform: capitalize; color: #2a4a1f;
          padding: 7px 12px; border-radius: 9999px;
          border: none; background: none; cursor: pointer;
          transition: background 0.18s, color 0.18s;
          white-space: nowrap;
        }
        .nh-catalog-btn:hover { background: rgba(45,90,39,0.10); color: #184b24; }
        .nh-catalog-btn.open  { background: rgba(45,90,39,0.10); color: #184b24; }

        .nh-catalog-chevron {
          transition: transform 0.25s cubic-bezier(0.4,0,0.2,1);
          display: flex; align-items: center;
          transform-origin: center;
        }
        .nh-catalog-chevron.open { transform: rotate(180deg); }

        /* ── Catalog dropdown panel ──────────────────────────────────────── */
        .nh-catalog-drop {
          position: absolute; top: calc(100% + 10px); left: 50%;
          transform: translateX(-50%) translateY(-6px);
          min-width: 200px;
          background: rgba(255,255,255,0.96);
          border-radius: 16px;
          border: 1px solid rgba(24,75,36,0.12);
          box-shadow: 0 12px 40px rgba(24,75,36,0.14), 0 2px 8px rgba(0,0,0,0.06);
          overflow: hidden; z-index: 700;
          opacity: 0; pointer-events: none;
          transition: opacity 0.22s ease, transform 0.22s cubic-bezier(0.4,0,0.2,1);
          backdrop-filter: blur(12px);
        }
        .nh-catalog-drop.open {
          opacity: 1; pointer-events: all;
          transform: translateX(-50%) translateY(0);
        }

        .nh-catalog-drop-item {
          display: block; padding: 11px 18px;
          font-size: 13px; font-weight: 500; color: #2a4a1f;
          text-decoration: none; cursor: pointer;
          transition: background 0.15s, color 0.15s;
          border-bottom: 1px solid rgba(24,75,36,0.06);
        }
        .nh-catalog-drop-item:last-child { border-bottom: none; }
        .nh-catalog-drop-item:first-child {
          font-weight: 700; color: #184b24;
          background: rgba(45,90,39,0.04);
        }
        .nh-catalog-drop-item:hover {
          background: rgba(45,90,39,0.08); color: #184b24;
        }

        /* ── Actions ─────────────────────────────────────────────────────── */
        .nh-actions { display: flex; align-items: center; gap: 6px; flex-shrink: 0; }

        .nh-icon-btn {
          position: relative; width: 38px; height: 38px; border-radius: 50%;
          border: 1.5px solid rgba(24,75,36,0.18); background: rgba(255,255,255,0.7);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: #2a4a1f;
          transition: background 0.18s, border-color 0.18s;
        }
        .nh-icon-btn:hover { background: rgba(45,90,39,0.12); border-color: rgba(24,75,36,0.35); }

        .nh-cart-badge {
          position: absolute; top: -4px; right: -4px;
          min-width: 18px; height: 18px; border-radius: 9999px;
          background: #2d5a27; color: #fff;
          font-size: 10px; font-weight: 700;
          display: flex; align-items: center; justify-content: center;
          padding: 0 4px; border: 2px solid #fff;
        }

        .nh-cta-btn {
          height: 36px; padding: 0 20px; border-radius: 9999px;
          background: linear-gradient(135deg, #2d5a27 0%, #3d7a35 100%);
          color: #fff; font-size: 13px; font-weight: 700; letter-spacing: 0.05em;
          text-decoration: none; display: flex; align-items: center;
          border: none; cursor: pointer; transition: opacity 0.18s, transform 0.18s;
          box-shadow: 0 2px 10px rgba(45,90,39,0.28); white-space: nowrap;
        }
        .nh-cta-btn:hover { opacity: 0.9; transform: translateY(-1px); }

        .nh-hamburger {
          display: none; width: 38px; height: 38px; border-radius: 50%;
          border: 1.5px solid rgba(24,75,36,0.18); background: rgba(255,255,255,0.7);
          align-items: center; justify-content: center; cursor: pointer; color: #2a4a1f;
        }

        @media (max-width: 768px) {
          .nh-nav { display: none; }
          .nh-catalog-wrap { display: none; }
          .nh-cta-btn { display: none; }
          .nh-hamburger { display: flex; }
        }

        /* ── Overlays / drawers / modals ─────────────────────────────────── */
        .nh-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.35);
          z-index: 1000; backdrop-filter: blur(2px);
        }

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
        .nh-mob-catalog-sub {
          padding: 6px 0 6px 12px;
          border-bottom: 1px solid rgba(24,75,36,0.05);
        }
        .nh-mob-catalog-sub a {
          display: block; padding: 8px 4px;
          font-size: 13px; font-weight: 500; color: #3a5a2e; text-decoration: none;
        }

        /* ── Auth modal — popup overlay ──────────────────────────────────── */
        .nh-modal-overlay {
          position: fixed;
          top: 0; left: 0;
          width: 100vw; height: 100vh;
          z-index: 9999;
          background: rgba(0, 0, 0, 0.82);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: nhFadeIn 0.2s ease forwards;
        }
        @keyframes nhFadeIn { from { opacity: 0; } to { opacity: 1; } }

        .nh-modal {
          position: relative;
          display: flex; align-items: stretch;
          width: 100%; max-width: 800px;
          max-height: calc(100vh - 40px);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06);
          animation: nhSlideUp 0.3s cubic-bezier(0.34,1.15,0.64,1) forwards;
        }
        @keyframes nhSlideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* Left image panel */
        .nh-modal-left {
          flex: 1;
          position: relative; overflow: hidden;
          min-height: 480px;
          display: flex; flex-direction: column;
        }
        .nh-modal-left-img {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover; object-position: center;
          display: block;
        }
        /* Light green tinted scrim */
        .nh-modal-left::before {
          content: '';
          position: absolute; inset: 0; z-index: 1;
          background: linear-gradient(
            175deg,
            rgba(56, 124, 62, 0.52) 0%,
            rgba(30, 80, 36, 0.28) 45%,
            rgba(10, 40, 14, 0.70) 100%
          );
          pointer-events: none;
        }
        @media (max-width: 640px) { .nh-modal-left { display: none; } }

        /* Top text block */
        .nh-modal-left-top {
          position: relative; z-index: 2;
          padding: 36px 36px 0;
        }
        .nh-modal-left-brand {
          display: flex; align-items: center; gap: 9px;
          margin-bottom: 20px;
        }
        .nh-modal-left-brand-dot {
          width: 26px; height: 26px; border-radius: 50%;
          border: 1.5px solid rgba(255,255,255,0.55);
          display: flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,0.12);
        }
        .nh-modal-left-brand-dot svg { width: 13px; height: 13px; }
        .nh-modal-left-brand-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 15px; font-weight: 700; color: rgba(255,255,255,0.9);
          letter-spacing: 0.1em; text-transform: uppercase;
        }
        .nh-modal-left-tagline {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px; font-weight: 700; color: #fff;
          line-height: 1.2; letter-spacing: -0.01em;
          text-shadow: 0 2px 12px rgba(0,0,0,0.3);
        }
        .nh-modal-left-tagline em { font-style: italic; color: #b6f0b0; }

        /* Bottom text block — anchored at bottom */
        .nh-modal-left-content {
          position: relative; z-index: 2;
          margin-top: auto;
          padding: 0 36px 36px;
        }
        .nh-modal-left-title {
          font-size: 11px; font-weight: 700; color: rgba(255,255,255,0.7);
          letter-spacing: 0.14em; text-transform: uppercase;
          margin-bottom: 5px;
        }
        .nh-modal-left-sub {
          font-size: 12.5px; color: rgba(255,255,255,0.55);
          line-height: 1.6; max-width: 270px;
        }

        /* Right white form panel */
        .nh-modal-right {
          width: 380px; flex-shrink: 0;
          background: #fff;
          padding: 40px 36px 36px;
          overflow-y: auto;
          max-height: calc(100vh - 40px);
          display: flex; flex-direction: column;
          position: relative;
        }
        @media (max-width: 640px) { .nh-modal-right { width: 100%; padding: 32px 24px; } }
        /* Thin scrollbar on right panel */
        .nh-modal-right::-webkit-scrollbar { width: 4px; }
        .nh-modal-right::-webkit-scrollbar-track { background: transparent; }
        .nh-modal-right::-webkit-scrollbar-thumb { background: rgba(45,90,39,0.25); border-radius: 9999px; }
        .nh-modal-right::-webkit-scrollbar-thumb:hover { background: rgba(45,90,39,0.45); }

        .nh-modal-close {
          position: absolute; top: 16px; right: 16px;
          width: 30px; height: 30px; border-radius: 50%;
          border: 1.5px solid #e8e8e8; background: #fafafa;
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          color: #999; transition: background 0.15s, border-color 0.15s;
        }
        .nh-modal-close:hover { background: #f0f0f0; border-color: #ccc; }

        .nh-modal-right-logo {
          display: flex; align-items: center; gap: 8px;
          margin-bottom: 24px;
        }
        .nh-modal-right-logo-mark {
          width: 30px; height: 30px; border-radius: 50%;
          border: 1.5px solid rgba(24,75,36,0.25);
          display: flex; align-items: center; justify-content: center;
        }
        .nh-modal-right-logo-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 17px; font-weight: 700; color: #1a3d1e; letter-spacing: 0.04em;
        }

        .nh-modal-right-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 26px; font-weight: 700; color: #0f1f11;
          margin-bottom: 6px; line-height: 1.2;
        }
        .nh-modal-right-sub {
          font-size: 13px; color: #888; margin-bottom: 26px; line-height: 1.5;
        }

        .nh-tabs {
          display: flex; gap: 0; margin-bottom: 22px;
          border-bottom: 1.5px solid #efefef;
        }
        .nh-tab {
          flex: 1; padding: 9px 0; background: none; border: none;
          font-size: 12px; font-weight: 700; letter-spacing: 0.1em;
          color: #bbb; cursor: pointer;
          border-bottom: 2px solid transparent; margin-bottom: -1.5px;
          transition: color .18s, border-color .18s; font-family: 'DM Sans', sans-serif;
        }
        .nh-tab.active { color: #184b24; border-bottom-color: #184b24; }

        .nh-field { margin-bottom: 16px; }
        .nh-label {
          display: block; font-size: 12px; font-weight: 600;
          color: #444; margin-bottom: 7px;
        }
        .nh-input {
          width: 100%; padding: 11px 14px;
          border: 1.5px solid #e8e8e8; border-radius: 10px;
          font-size: 14px; font-family: 'DM Sans', sans-serif;
          color: #1a1a1a; outline: none; background: #fff;
          transition: border-color .18s, box-shadow .18s;
        }
        .nh-input:focus { border-color: #2d5a27; box-shadow: 0 0 0 3px rgba(45,90,39,0.10); }
        .nh-input.error { border-color: #e53e3e; }
        .nh-input-wrap { position: relative; }
        .nh-input-pass { padding-right: 42px; }
        .nh-pass-toggle {
          position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
          background: none; border: none; cursor: pointer; color: #bbb; display: flex;
        }

        .nh-notify-row {
          display: flex; align-items: center; gap: 10px;
          font-size: 13px; color: #666; cursor: pointer; margin-bottom: 16px;
          user-select: none;
        }

        .nh-error {
          background: #fff5f5; color: #c53030;
          border: 1px solid #fed7d7; border-radius: 8px;
          padding: 9px 13px; font-size: 13px; margin-bottom: 14px;
        }

        .nh-submit-btn {
          width: 100%; padding: 13px;
          background: #184b24; color: #fff;
          border: none; border-radius: 10px;
          font-size: 14px; font-weight: 700;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;
          margin-bottom: 14px;
          transition: background 0.18s, transform 0.15s;
          letter-spacing: 0.03em;
        }
        .nh-submit-btn:hover { background: #1f6030; }
        .nh-submit-btn:active { transform: scale(0.99); }
        .nh-submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .nh-submit-arrow { font-size: 16px; transition: transform 0.15s; }
        .nh-submit-btn:hover .nh-submit-arrow { transform: translateX(3px); }

        .nh-divider {
          display: flex; align-items: center; gap: 12px;
          font-size: 12px; color: #ccc; margin-bottom: 14px;
        }
        .nh-divider::before, .nh-divider::after {
          content: ''; flex: 1; height: 1px; background: #efefef;
        }

        .nh-switch-row {
          font-size: 12px; color: #999; text-align: center;
        }
        .nh-switch-row button {
          background: none; border: none; color: #184b24;
          font-size: 12px; font-weight: 700; cursor: pointer;
          font-family: 'DM Sans', sans-serif; padding: 0;
        }

        .nh-spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff; border-radius: 50%;
          animation: nhSpin 0.7s linear infinite;
        }
        @keyframes nhSpin { to { transform: rotate(360deg); } }

        .nh-terms { font-size: 11px; color: #bbb; text-align: center; line-height: 1.5; margin-top: 10px; }
        .nh-terms a { color: #2d5a27; text-decoration: underline; }

        .nh-success-wrap {
          display: flex; flex-direction: column; align-items: center;
          justify-content: center; flex: 1; text-align: center; padding: 32px 0;
        }
        .nh-success-icon {
          width: 60px; height: 60px;
          background: linear-gradient(135deg, #e8f5e2, #d0edcb);
          border-radius: 50%; display: flex; align-items: center; justify-content: center;
          margin-bottom: 18px;
        }
        .nh-success-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 26px; font-weight: 700; color: #1a3d1e; margin-bottom: 8px;
        }
        .nh-success-sub {
          font-size: 13px; color: #6a8a62; line-height: 1.6; margin-bottom: 26px;
        }
        .nh-success-close-btn {
          padding: 12px 32px; background: #184b24; color: #fff;
          border: none; border-radius: 10px; font-size: 14px; font-weight: 700;
          cursor: pointer; font-family: 'DM Sans', sans-serif;
          transition: background 0.18s;
        }
        .nh-success-close-btn:hover { background: #1f6030; }

        /* ── User dropdown ───────────────────────────────────────────────── */
        .nh-user-wrap     { position:relative; }
        .nh-user-btn      { display:flex; align-items:center; gap:6px; height:36px; padding:0 12px 0 8px; border-radius:9999px; border:1.5px solid rgba(24,75,36,0.22); background:rgba(255,255,255,0.7); cursor:pointer; font-size:13px; font-weight:600; color:#2a4a1f; }
        .nh-user-avatar   { width:24px; height:24px; border-radius:50%; background:#2d5a27; color:#fff; font-size:10px; font-weight:700; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
        .nh-dropdown      { position:absolute; top:calc(100% + 8px); right:0; background:#fff; border-radius:14px; box-shadow:0 8px 32px rgba(0,0,0,0.12); border:1px solid rgba(24,75,36,0.10); min-width:180px; overflow:hidden; z-index:600; }
        .nh-dropdown-item { display:flex; align-items:center; gap:10px; padding:12px 16px; font-size:13px; font-weight:500; color:#333; cursor:pointer; transition:background .15s; }
        .nh-dropdown-item:hover { background:#f0f7ee; }
        .nh-dropdown-item.danger { color:#c53030; }
        .nh-dropdown-item.danger:hover { background:#fff5f5; }
        .nh-dropdown-divider { height:1px; background:#f0f0f0; margin:4px 0; }
      `}</style>

      {/* ── PILL NAV ── */}
      <div className="nh-wrap" style={{ height: "fit-content" }}>
        <div className="nh-inner">

          {/* Logo — flex row, vertically centered */}
          <a
            className="nh-logo"
            href="/"
            onClick={(e) => { e.preventDefault(); navigate("/"); }}
          >
            <img
              src="https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=nabhiLogo.webp&version_id=null"
              alt="Nabhi Amrit"
            />
            <span className="nh-logo-name">Vedraha</span>
          </a>

          {/* Desktop nav links */}
          <nav className="nh-nav">
            {navLinks.map((l) => (
              <a
                key={l.label}
                className="nh-nav-link"
                href={l.path}
                onClick={(e) => { e.preventDefault(); navigate(l.path); }}
              >
                {l.label}
              </a>
            ))}

            {/* ── Catalog with dropdown ── */}
            <div className="nh-catalog-wrap" ref={catalogRef}>
              <button
                className={`nh-catalog-btn${catalogOpen ? " open" : ""}`}
                onClick={() => setCatalogOpen((p) => !p)}
                aria-haspopup="true"
                aria-expanded={catalogOpen}
              >
                Catalog
                <span className={`nh-catalog-chevron${catalogOpen ? " open" : ""}`}>
                  <ChevronDown size={13} strokeWidth={2.5} />
                </span>
              </button>

              <div className={`nh-catalog-drop${catalogOpen ? " open" : ""}`} role="menu">
                {CATALOG_LINKS.map((item) => (
                  <a
                    key={item.label}
                    className="nh-catalog-drop-item"
                    href={item.path}
                    role="menuitem"
                    onClick={(e) => {
                      e.preventDefault();
                      setCatalogOpen(false);
                      navigate(item.path);
                    }}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </nav>

          {/* Actions */}
          <div className="nh-actions">
            {/* Cart */}
            <button className="nh-icon-btn" onClick={handleCartClick} aria-label="Open cart">
              <ShoppingBag size={17} strokeWidth={1.8} />
              {cartCount > 0 && <span className="nh-cart-badge">{cartCount}</span>}
            </button>

            {/* User / Auth */}
            {loggedInUser ? (
              <div className="nh-user-wrap" ref={userDropRef}>
                <button className="nh-user-btn" onClick={() => setUserDropOpen((p) => !p)}>
                  <div className="nh-user-avatar">{displayName[0]?.toUpperCase()}</div>
                  <span style={{ maxWidth: 80, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {displayName}
                  </span>
                  <ChevronDown size={12} style={{ opacity: 0.6 }} />
                </button>
                {userDropOpen && (
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
              <div className="nh-user-wrap" ref={userDropRef}>
                <button className="nh-icon-btn" onClick={() => setUserDropOpen((p) => !p)} aria-label="Account">
                  <User size={17} strokeWidth={1.8} />
                </button>
                {userDropOpen && (
                  <div className="nh-dropdown">
                    <div className="nh-dropdown-item" onClick={() => { setUserDropOpen(false); navigate("/my-orders-en"); }}>
                      <Package size={14} /> My Orders
                    </div>
                    <div className="nh-dropdown-divider" />
                    <div className="nh-dropdown-item" onClick={() => { setUserDropOpen(false); openModal("login"); }}>
                      <User size={14} /> Login / Sign Up
                    </div>
                  </div>
                )}
              </div>
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

      {/* Overlay */}
      {(modalOpen || menuOpen) && (
        <div className="nh-overlay" onClick={() => { setModalOpen(false); setMenuOpen(false); }} />
      )}

      {/* ── AUTH MODAL (popup overlay) ── */}
      {modalOpen && (
        <div className="nh-modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setModalOpen(false); }}>
          <div className="nh-modal">

            {/* ── Left: image panel ── */}
            <div className="nh-modal-left">
              {/* Background image */}
              <img
                className="nh-modal-left-img"
                src="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&q=80"
                alt="Ayurvedic wellness"
              />

              {/* Top: brand + headline over image */}
              <div className="nh-modal-left-top">
                <div className="nh-modal-left-brand">
                  <div className="nh-modal-left-brand-dot">
                    <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="7" cy="7" r="5.5" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2"/>
                      <path d="M7 4C7 4 4.5 6.5 4.5 8.5C4.5 9.88 5.62 11 7 11C8.38 11 9.5 9.88 9.5 8.5C9.5 6.5 7 4 7 4Z" fill="rgba(180,255,170,0.9)"/>
                    </svg>
                  </div>
                  <span className="nh-modal-left-brand-name">Vedraha</span>
                </div>
                <div className="nh-modal-left-tagline">
                  {mode === "login"
                    ? <><em>Reconnect</em> with<br />Ancient Wellness.</>
                    : <>Begin Your<br /><em>Wellness</em> Journey.</>}
                </div>
              </div>

              {/* Bottom: caption anchored to bottom */}
              <div className="nh-modal-left-content">
                <div className="nh-modal-left-title">Pure · Natural · Ayurvedic</div>
                <div className="nh-modal-left-sub">
                  {mode === "login"
                    ? "Access your orders, track shipments, and unlock member-only Ayurvedic offers."
                    : "Join Vedraha for faster checkout, exclusive formulations, and personalised care."}
                </div>
              </div>
            </div>

            {/* ── Right: clean white form ── */}
            <div className="nh-modal-right">
              <button className="nh-modal-close" onClick={() => setModalOpen(false)}><X size={12} /></button>

              {submitted ? (
                <div className="nh-success-wrap">
                  <div className="nh-success-icon">
                    <CheckCircle size={26} color="#184b24" strokeWidth={1.8} />
                  </div>
                  <div className="nh-success-title">
                    {mode === "login" ? "Welcome back!" : "You're in!"}
                  </div>
                  <div className="nh-success-sub">
                    {mode === "login"
                      ? `Good to see you again, ${loggedInUser?.name || loggedInUser?.email?.split("@")[0]}.`
                      : `Welcome to Vedraha${notify ? ". We'll keep you updated on offers." : "."}`}
                  </div>
                  <button className="nh-success-close-btn" onClick={() => setModalOpen(false)}>
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <>
                  {/* Logo mark on right panel */}
                  <div className="nh-modal-right-logo">
                    <div className="nh-modal-right-logo-mark">
                      <svg width="16" height="16" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="7" cy="7" r="5.5" stroke="#2d5a27" strokeWidth="1.2"/>
                        <path d="M7 4C7 4 4.5 6.5 4.5 8.5C4.5 9.88 5.62 11 7 11C8.38 11 9.5 9.88 9.5 8.5C9.5 6.5 7 4 7 4Z" fill="#2d5a27"/>
                      </svg>
                    </div>
                    <span className="nh-modal-right-logo-name">Vedraha</span>
                  </div>

                  <div className="nh-modal-right-title">
                    {mode === "login" ? "Log in to your account" : "Create your account"}
                  </div>
                  <div className="nh-modal-right-sub">
                    {mode === "login"
                      ? "Welcome back. Fill in your details to get back in."
                      : "Join us — it takes less than a minute."}
                  </div>

                  {/* Tabs */}
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
                        placeholder={mode === "signup" ? "Min. 6 characters" : "············"}
                        value={password}
                        onChange={(e) => { setPassword(e.target.value); setError(""); }}
                        onKeyDown={(e) => e.key === "Enter" && (mode === "login" ? handleLogin() : handleSignup())}
                        autoComplete={mode === "login" ? "current-password" : "new-password"}
                      />
                      <button className="nh-pass-toggle" type="button" onClick={() => setShowPass(p => !p)}>
                        {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
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
                          {showConfirmPass ? <EyeOff size={14} /> : <Eye size={14} />}
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
                    {submitting ? <><span className="nh-spinner" /> Please wait…</> : <>{mode === "login" ? "Log In" : "Create Account"} <span className="nh-submit-arrow">→</span></>}
                  </button>

                  <div className="nh-switch-row">
                    {mode === "login"
                      ? <>Don't have an account? <button onClick={() => { setMode("signup"); setError(""); }}>Create One</button></>
                      : <>Already have an account? <button onClick={() => { setMode("login"); setError(""); }}>Log In</button></>}
                  </div>

                  <div className="nh-terms" style={{ marginTop: 14 }}>
                    By continuing you accept our <a href="#">Privacy Policy and T&Cs.</a>
                  </div>
                </>
              )}
            </div>

          </div>
        </div>
      )}

      {/* ── MOBILE DRAWER ── */}
      {menuOpen && (
        <div className="nh-mob-drawer">
          <div className="nh-mob-head">
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 700, color: "#1a3d1e" }}>Vedraha</span>
            <button
              style={{ width: 34, height: 34, borderRadius: "50%", border: "1.5px solid rgba(24,75,36,0.20)", background: "rgba(255,255,255,0.7)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#444" }}
              onClick={() => setMenuOpen(false)}
            >
              <X size={14} />
            </button>
          </div>

          {/* Catalog with sub-links in mobile */}
          <div className="nh-mob-link" style={{ flexDirection: "column", alignItems: "flex-start", gap: 0 }}>
            <span style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
              CATALOG <span style={{ color: "#94a3b8", fontSize: 18 }}>›</span>
            </span>
            <div className="nh-mob-catalog-sub">
              {CATALOG_LINKS.map((item) => (
                <a
                  key={item.label}
                  href={item.path}
                  onClick={(e) => { e.preventDefault(); navigate(item.path); setMenuOpen(false); }}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {navLinks.map((l) => (
            <div key={l.label} className="nh-mob-link" onClick={() => { navigate(l.path); setMenuOpen(false); }}>
              <span>{l.label.toUpperCase()}</span>
              <span style={{ color: "#94a3b8", fontSize: 18 }}>›</span>
            </div>
          ))}

          {/* My Orders — always visible regardless of login state */}
          <div className="nh-mob-link" onClick={() => { navigate("/my-orders-en"); setMenuOpen(false); }}>
            <span>MY ORDERS</span><span style={{ color: "#94a3b8", fontSize: 18 }}>›</span>
          </div>
          {loggedInUser ? (
            <div className="nh-mob-link" style={{ color: "#c0392b" }} onClick={handleLogout}>
              <span>LOGOUT</span><span style={{ color: "#94a3b8", fontSize: 18 }}>›</span>
            </div>
          ) : (
            <div className="nh-mob-link" onClick={() => { openModal("login"); setMenuOpen(false); }}>
              <span>LOGIN / SIGN UP</span><span style={{ color: "#94a3b8", fontSize: 18 }}>›</span>
            </div>
          )}
        </div>
      )}
    </>
  );
}