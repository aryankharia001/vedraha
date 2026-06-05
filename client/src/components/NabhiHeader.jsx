// src/components/NabhiHeader.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Changes from v1:
//  • Google OAuth sign-in added (mirrors v2 implementation)
//  • User details (name, email, picture) saved to DB via POST /api/auth/google
//  • Google GSI script loaded lazily; renderButton() used to avoid popup suppression
//  • Tailwind utility classes used throughout for layout / spacing / typography
//  • All original glassmorphism styles preserved via the <style> block
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Search,
  User,
  ShoppingBag,
  X,
  Menu,
  CheckCircle,
  Eye,
  EyeOff,
  Package,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { backendurl } from "../App";
import { useCart } from "../components/CartContext";
import loginImg from "../../public/best-seller/best-seller.png"

// ── Product sub-pages shown in the Catalog dropdown ──────────────────────────
export const CATALOG_LINKS = [
  { label: "All Products", path: "/products" },
  { label: "Deep Sleep Oil", path: "/products/nabhi-sleep-en" },
  { label: "Digestive Care Oil", path: "/products/nabhi-amrit-en" },
  { label: "Joint Relief Oil", path: "/products/nabhi-joint-en" },
  { label: "Vision & Eyecare Oil", path: "/products/nabhi-eye-en" },
  { label: "Hair Care Oil", path: "/products/nabhi-hair-en" },
  { label: "Nabhi Shilajit", path: "/products/nabhi-shilajit-en" },
  // { label: "Menstrual Care Oil", path: "/products/nabhi-menstrual-en" },
];

export default function NabhiHeader({ onCartOpen }) {
  const { cartTotalQty: cartCount } = useCart();
  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState("login");
  const [menuOpen, setMenuOpen] = useState(false);
  const [userDropOpen, setUserDropOpen] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false);

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

  // ── Google Auth state ─────────────────────────────────────────────────────
  const [googleReady, setGoogleReady] = useState(false);
  const [googleSubmitting, setGoogleSubmitting] = useState(false);
  const googleBtnRef = useRef(null);
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  const [loggedInUser, setLoggedInUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("akravi_user")) || null;
    } catch {
      return null;
    }
  });

  const navigate = useNavigate();
  const userDropRef = useRef(null);
  const catalogRef = useRef(null);

  // ── Lock scroll when modal / drawer open ──────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = modalOpen || menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalOpen, menuOpen]);

  // ── Reset auth form on open ───────────────────────────────────────────────
  useEffect(() => {
    if (modalOpen) {
      setEmail("");
      setPassword("");
      setName("");
      setConfirmPass("");
      setError("");
      setSubmitting(false);
      setSubmitted(false);
      setShowPass(false);
      setShowConfirmPass(false);
      setNotify(false);
    }
  }, [modalOpen, mode]);

  // ── Close dropdowns on outside click ─────────────────────────────────────
  useEffect(() => {
    const handler = (e) => {
      if (userDropRef.current && !userDropRef.current.contains(e.target))
        setUserDropOpen(false);
      if (catalogRef.current && !catalogRef.current.contains(e.target))
        setCatalogOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ── Google credential callback ────────────────────────────────────────────
  const handleGoogleCredentialResponse = useCallback(async (response) => {
    if (!response?.credential) {
      setError("Google sign-in was cancelled.");
      return;
    }
    setError("");
    setGoogleSubmitting(true);
    try {
      const res = await fetch(`${backendurl}/api/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential: response.credential }),
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.message || "Google sign-in failed");
        return;
      }
      // Persist session
      localStorage.setItem("akravi_token", data.token);
      localStorage.setItem("akravi_user", JSON.stringify(data.user));
      setLoggedInUser(data.user);
      setSubmitted(true);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setGoogleSubmitting(false);
    }
  }, []);

  // ── Load Google GSI script once ───────────────────────────────────────────
  useEffect(() => {
    if (!googleClientId) return;
    let cancelled = false;

    const init = () => {
      if (cancelled || !window.google?.accounts?.id) return;
      window.google.accounts.id.initialize({
        client_id: googleClientId,
        callback: handleGoogleCredentialResponse,
        auto_select: false,
        cancel_on_tap_outside: true,
      });
      setGoogleReady(true);
    };

    if (window.google?.accounts?.id) {
      init();
      return () => {
        cancelled = true;
      };
    }

    const existing = document.querySelector('script[data-google-gsi="true"]');
    if (existing) {
      existing.addEventListener("load", init, { once: true });
      return () => {
        cancelled = true;
      };
    }

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.dataset.googleGsi = "true";
    script.onload = init;
    document.head.appendChild(script);

    return () => {
      cancelled = true;
    };
  }, [googleClientId, handleGoogleCredentialResponse]);

  // ── Render Google hosted button whenever modal opens ─────────────────────
  // renderButton() is immune to browser popup suppression.
  useEffect(() => {
    if (!modalOpen || !googleReady || !googleClientId || !googleBtnRef.current)
      return;
    googleBtnRef.current.innerHTML = "";
    window.google.accounts.id.renderButton(googleBtnRef.current, {
      type: "standard",
      theme: "outline",
      size: "large",
      text: mode === "signup" ? "signup_with" : "signin_with",
      shape: "rectangular",
      logo_alignment: "left",
      width: googleBtnRef.current.offsetWidth || 308,
    });
  }, [modalOpen, googleReady, googleClientId, mode]);

  const openModal = (m = "login") => {
    setMode(m);
    setModalOpen(true);
  };
  const validateEmail = (v) => /^\S+@\S+\.\S+$/.test(v);

  // ── Auth handlers ─────────────────────────────────────────────────────────
  const handleLogin = async () => {
    if (!email.trim()) return setError("Email is required");
    if (!validateEmail(email)) return setError("Enter a valid email address");
    if (!password) return setError("Password is required");
    setError("");
    setSubmitting(true);
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

  const handleSignup = async () => {
    if (!email.trim()) return setError("Email is required");
    if (!validateEmail(email)) return setError("Enter a valid email address");
    if (!password) return setError("Password is required");
    if (password.length < 6)
      return setError("Password must be at least 6 characters");
    if (password !== confirmPass) return setError("Passwords do not match");
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch(`${backendurl}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          password,
          name: name.trim(),
          notifyOffers: notify,
        }),
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
    setUserDropOpen(false);
    navigate("/");
  };

  const handleMyOrders = () => {
    setUserDropOpen(false);
    navigate("/my-orders-en");
  };
  const handleCartClick = () => onCartOpen?.();

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Contact", path: "/products/nabhi-contact-en" },
    { label: "About", path: "/products/nabhi-about-en" },
  ];

  const displayName =
    loggedInUser?.name || loggedInUser?.email?.split("@")[0] || "Account";

  return (
    <>
      <style>{`
        // @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; }

        /* ── Pill wrapper ───────────────────────────────────────────────── */
        .nh-wrap {
          position: fixed; inset: 0; z-index: 500;
          background: transparent; padding: 12px 20px;
          font-family: var(--font-new-1); 
          pointer-events: none;
        }
        .nh-inner {
          pointer-events: all;
          max-width: 1060px; margin: 0 auto;
          height: 62px;
          display: flex; align-items: center; justify-content: space-between; gap: 16px;
          padding: 0 12px;
          background: var(--color-black);
          backdrop-filter: blur(18px) saturate(160%);
          -webkit-backdrop-filter: blur(18px) saturate(160%);
          // border-radius: var(--radius-pill, 9999px);
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.15);
          // box-shadow: 0 4px 24px rgba(0, 0, 0, 0.25), 0 1px 4px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }

        /* ── Logo ───────────────────────────────────────────────────────── */
        .nh-logo {
          display: flex; align-items: center; gap: 8px;
          text-decoration: none; flex-shrink: 0;
          padding: 0 4px; line-height: 1;
        }
        .nh-logo img {
          display: block; width: 44px; height: auto;
          filter: brightness(0) invert(1);
        }
        .nh-logo-name {
  font-family: var(--font-new-1);
  font-size: 20px;
  font-weight: 400; /* changed from 500 */
  color: var(--color-white, #ffffff);
  letter-spacing: 0.02em; line-height: 1;
}

        /* ── Desktop nav ─────────────────────────────────────────────────── */
        .nh-nav { display: flex; align-items: center; gap: 4px; }
        .nh-nav-link {
          font-size: 13px; 
          font-weight: var(--nav-link-font-weight); 
          letter-spacing: 0.07em;
          text-transform: capitalize; color: var(--color-white, #ffffff);
          text-decoration: none; padding: 7px 12px; 
          // border-radius: var(--radius-pill, 9999px);
          border-radius: 10px;
          transition: background .18s, color .18s; white-space: nowrap;
        }
        .nh-nav-link:hover { background: var(--color-white, #ffffff); color: var(--color-body, #202124); }

        /* ── Catalog dropdown ────────────────────────────────────────────── */
        .nh-catalog-wrap { position: relative; }
        .nh-catalog-btn {
          display: flex; align-items: center; gap: 4px;
          font-size: 13px; font-weight: 500; letter-spacing: 0.07em;
          text-transform: capitalize; color: var(--color-white, #ffffff);
          padding: 7px 12px; border-radius: 10px;
          border: none; background: none; cursor: pointer;
          transition: background .18s, color .18s; white-space: nowrap;
        }
        .nh-catalog-btn:hover, .nh-catalog-btn.open { background: var(--color-white, #ffffff); color: #000; }
        .nh-catalog-chevron { transition: transform .25s cubic-bezier(0.4,0,0.2,1); display: flex; align-items: center; color: currentColor; }
        .nh-catalog-chevron.open { transform: rotate(180deg); }
        .nh-catalog-drop {
          position: absolute; top: calc(100% + 10px); left: 50%;
          transform: translateX(-50%) translateY(-6px); min-width: 200px;
          background: var(--color-white, #ffffff);
          border-radius: 10px;
          box-shadow: inset 0 2px 4px rgba(0,0,0,.06), 0 8px 24px rgba(0,0,0,.12), 0 2px 8px rgba(0,0,0,.08);
          overflow: hidden; z-index: 700; opacity: 0; pointer-events: none;
          transition: opacity .22s ease, transform .22s cubic-bezier(0.4,0,0.2,1);
          backdrop-filter: blur(12px);
        }
        .nh-catalog-drop.open { opacity: 1; pointer-events: all; transform: translateX(-50%) translateY(0); }
        .nh-catalog-drop-item {
          display: block; padding: 11px 18px; font-size: 13px; font-weight: 500;
          color: var(--color-body, #202124); text-decoration: none; cursor: pointer;
          transition: background .15s, color .15s; border-bottom: 1px solid rgba(0,0,0,.05);
        }
        .nh-catalog-drop-item:last-child { border-bottom: none; }
        .nh-catalog-drop-item:first-child { font-weight: 700; }
        .nh-catalog-drop-item:hover { background: black; color: #fff; }

        /* ── Actions ─────────────────────────────────────────────────────── */
        .nh-actions { display: flex; align-items: center; gap: 6px; flex-shrink: 0; }
        .nh-icon-btn {
          position: relative; width: 38px; height: 38px; border-radius: 50%;
          border: 1.5px solid rgba(255,255,255,.25); background: rgba(255,255,255,.1);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: #fff; transition: background .18s, border-color .18s, color .18s;
        }
        // .nh-icon-btn:hover { background: #fff; border-color: #fff; color: #000; }
        .nh-cart-badge {
          position: absolute; top: -4px; right: -4px; min-width: 18px; height: 18px;
          border-radius: 9999px; background: var(--new-purple-color, #5d27aa); color: #fff;
          font-size: 10px; font-weight: 700; display: flex; align-items: center;
          justify-content: center; padding: 0 4px; border: 2px solid rgba(0,0,0,.5);
        }
        .nh-cta-btn {
          height: 36px; padding: 0 20px; border-radius: 9999px;
          background: #fff; color: #202124; font-size: 13px; font-weight: 700;
          letter-spacing: .05em; text-decoration: none; display: flex; align-items: center;
          border: none; cursor: pointer; transition: opacity .18s, transform .18s, background .18s;
          box-shadow: 0 2px 10px rgba(192,138,62,.28); white-space: nowrap;
        }
        .nh-cta-btn:hover { opacity: .9; transform: translateY(-1px); background: #f7f7f5; }
        .nh-hamburger {
          display: none; width: 38px; height: 38px; border-radius: 50%;
          border: 1.5px solid rgba(255,255,255,.25); background: rgba(255,255,255,.1);
          align-items: center; justify-content: center; cursor: pointer; color: #fff;
          transition: background .18s, border-color .18s, color .18s;
        }
        .nh-hamburger:hover { background: #fff; border-color: #fff; color: #000; }
        @media (max-width: 768px) {
          .nh-nav { display: none; }
          .nh-catalog-wrap { display: none; }
          .nh-cta-btn { display: none; }
          .nh-hamburger { display: flex; }
        }

        /* ── Overlays ─────────────────────────────────────────────────────── */
        .nh-overlay { position: fixed; inset: 0; background: rgba(0,0,0,.35); z-index: 1000; backdrop-filter: blur(2px); }
        .nh-mob-drawer {
  position: fixed; top: 0; right: 0; bottom: 0; width: 80%; max-width: 320px;
  background: #ffffff; z-index: 1100;
  padding: 24px 22px 32px; border-radius: 20px 0 0 20px;
  box-shadow: -8px 0 40px rgba(0,0,0,.18);
  animation: nhDrawerIn .3s cubic-bezier(0.34,1.15,0.64,1) forwards;
}
@keyframes nhDrawerIn {
  from { transform: translateX(100%); opacity: 0; }
  to   { transform: translateX(0);    opacity: 1; }
}
        .nh-mob-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
        .nh-mob-link {
  display: flex; align-items: center; justify-content: space-between;
  padding: 14px 0; font-size: 13px; font-weight: 500;
  letter-spacing: .08em; text-transform: uppercase; color: #111;
  border-bottom: 1px solid rgba(0,0,0,.07); cursor: pointer;
  transition: color .15s;
}
.nh-mob-link:hover { color: #000; }
.nh-mob-catalog-sub { padding: 6px 0 6px 12px; border-bottom: 1px solid rgba(0,0,0,.05); }
.nh-mob-catalog-sub a { display: block; padding: 8px 4px; font-size: 13px; font-weight: 500; color: #333; text-decoration: none; transition: color .15s; }
.nh-mob-catalog-sub a:hover { color: #000; }

        /* ── Auth modal ──────────────────────────────────────────────────── */
        .nh-modal-overlay {
  position: fixed; inset: 0; z-index: 9999;
  background: rgba(0,0,10,.85); display: flex;
  align-items: center; justify-content: center; padding: 20px;
  animation: nhFadeIn .22s ease forwards;
  backdrop-filter: blur(6px);
}
        @keyframes nhFadeIn { from { opacity: 0; } to { opacity: 1; } }
        .nh-modal {
  position: relative; display: flex; align-items: stretch;
  width: 100%; max-width: 780px; max-height: calc(100vh - 40px);
  border-radius: 24px; overflow: hidden;
  box-shadow: 0 32px 80px rgba(0,0,0,.55), 0 0 0 1px rgba(255,255,255,.08);
  animation: nhSlideUp .35s cubic-bezier(0.34,1.15,0.64,1) forwards;
  background: #fff;
}
@keyframes nhSlideUp {
  from { opacity: 0; transform: translateY(28px) scale(.95); }
  to   { opacity: 1; transform: translateY(0)   scale(1);    }
}

        .nh-modal-left {
          flex: 1; position: relative; overflow: hidden; min-height: 480px;
          display: flex; flex-direction: column;
        }
        .nh-modal-left-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .nh-modal-left::before {
  content: ''; position: absolute; inset: 0; z-index: 1;
  background: linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.00) 100%);
}
        @media (max-width: 640px) { .nh-modal-left { display: none; } }

        .nh-modal-left-top { position: relative; z-index: 2; padding: 36px 36px 0; }
        .nh-modal-left-brand { display: flex; align-items: center; gap: 9px; margin-bottom: 20px; }
        .nh-modal-left-brand-logo { width: 32px; height: auto; display: block; }
        .nh-modal-left-brand-name { font-family: 'Cormorant Garamond', serif; font-size: 18px; font-weight: 700; color: rgba(255,255,255,.95); letter-spacing: .02em; }
        .nh-modal-left-tagline { font-family: var(--font-new-1); font-size: 26px; font-weight: 700; color: #fff; line-height: 1.25; letter-spacing: -.02em; text-shadow: 0 2px 16px rgba(0,0,0,.5); margin-bottom: 12px; }
.nh-modal-left-tagline em { font-style: normal; color: #fff; }
.nh-modal-left-desc { font-size: 13px; color: rgba(255,255,255,0.6); line-height: 1.6; }
        .nh-modal-left-content { position: relative; z-index: 2; margin-top: auto; padding: 0 36px 36px; }
        .nh-modal-left-title { font-size: 11px; font-weight: 700; color: rgba(255,255,255,.7); letter-spacing: .14em; text-transform: uppercase; margin-bottom: 5px; }
        .nh-modal-left-sub { font-size: 12.5px; color: rgba(255,255,255,.55); line-height: 1.6; max-width: 270px; }

        .nh-modal-right {
          width: 380px; flex-shrink: 0; background: #fff;
          padding: 40px 36px 36px; overflow-y: auto;
          max-height: calc(100vh - 40px); display: flex; flex-direction: column; position: relative;
        }
        @media (max-width: 640px) { .nh-modal-right { width: 100%; padding: 32px 24px; } }
        .nh-modal-right::-webkit-scrollbar { width: 4px; }
        .nh-modal-right::-webkit-scrollbar-thumb { background: rgba(45,90,39,.25); border-radius: 9999px; }

        .nh-modal-close {
          position: absolute; top: 16px; right: 16px; width: 30px; height: 30px;
          border-radius: 50%; border: 1.5px solid #e8e8e8; background: #fafafa;
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          color: #999; transition: background .15s, border-color .15s;
        }
        .nh-modal-close:hover { background: #f0f0f0; border-color: #ccc; }

        .nh-modal-right-logo { display: flex; align-items: center; justify-content: center; margin-bottom: 10px; }
.nh-modal-right-logo img { width: 56px; height: auto; }
        .nh-modal-right-title { font-family: var(--font-new-1); font-size: 22px; font-weight: 700; color: #111; margin-bottom: 6px; line-height: 1.2; text-align: center; }
.nh-modal-right-sub { font-size: 13px; color: #aaa; margin-bottom: 22px; line-height: 1.5; text-align: center; }

        .nh-tabs { display: flex; gap: 0; margin-bottom: 22px; border-bottom: 1.5px solid #efefef; }
        .nh-tab { flex: 1; padding: 9px 0; background: none; border: none; font-size: 12px; font-weight: 700; letter-spacing: .1em; color: #bbb; cursor: pointer; border-bottom: 2px solid transparent; margin-bottom: -1.5px; transition: color .18s, border-color .18s; font-family: 'DM Sans', sans-serif; }
        .nh-tab.active { color: var(--new-purple-color); border-bottom-color: var(--new-purple-color); }

        .nh-field { margin-bottom: 16px; }
        .nh-label { display: block; font-size: 12px; font-weight: 600; color: #444; margin-bottom: 7px; }
        .nh-input { width: 100%; padding: 11px 14px; border: 1.5px solid #e8e8e8; border-radius: 10px; font-size: 14px; font-family: 'DM Sans', sans-serif; color: #1a1a1a; outline: none; background: #fff; transition: border-color .18s, box-shadow .18s; }
        .nh-input:focus { border-color: var(--new-purple-color); box-shadow: 0 0 0 3px rgba(45,90,39,.10); }
        .nh-input.error { border-color: #e53e3e; }
        .nh-input-wrap { position: relative; }
        .nh-input-pass { padding-right: 42px; }
        .nh-pass-toggle { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: #bbb; display: flex; }

        .nh-notify-row { display: flex; align-items: center; gap: 10px; font-size: 13px; color: #666; cursor: pointer; margin-bottom: 16px; user-select: none; }

        .nh-error { background: #fff5f5; color: #c53030; border: 1px solid #fed7d7; border-radius: 8px; padding: 9px 13px; font-size: 13px; margin-bottom: 14px; }

        .nh-submit-btn {
          width: 100%; padding: 13px; background: var(--new-primary-color); color: #fff;
          border: none; border-radius: 10px; font-size: 14px; font-weight: 700;
          font-family: 'DM Sans', sans-serif; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          margin-bottom: 14px; transition: background .18s, transform .15s; letter-spacing: .03em;
        }
        .nh-submit-btn:hover { background: var(--new-purple-color); }
        .nh-submit-btn:active { transform: scale(.99); }
        .nh-submit-btn:disabled { opacity: .6; cursor: not-allowed; }

        /* ── Google button wrapper ─────────────────────────────────────── */
        .nh-google-btn-wrap {
          width: 100%; margin-bottom: 14px; min-height: 44px;
          display: flex; justify-content: center;
        }
        .nh-google-btn-placeholder {
          width: 100%; display: flex; align-items: center; justify-content: center; gap: 10px;
          padding: 11px 14px; border: 1.5px solid #e8e8e8; border-radius: 10px;
          background: #fff; color: #888; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500;
        }

        .nh-divider { display: flex; align-items: center; gap: 12px; font-size: 12px; color: #ccc; margin-bottom: 16px; }
        .nh-divider::before, .nh-divider::after { content: ''; flex: 1; height: 1px; background: #efefef; }

        .nh-switch-row { font-size: 12px; color: #999; text-align: center; }
        .nh-switch-row button { background: none; border: none; color: var(--new-purple-color); font-size: 12px; font-weight: 700; cursor: pointer; font-family: 'DM Sans', sans-serif; padding: 0; }

        .nh-spinner { width: 16px; height: 16px; border: 2px solid rgba(255,255,255,.3); border-top-color: #fff; border-radius: 50%; animation: nhSpin .7s linear infinite; }
        @keyframes nhSpin { to { transform: rotate(360deg); } }

        .nh-terms { font-size: 11px; color: #bbb; text-align: center; line-height: 1.5; margin-top: 10px; }
        .nh-terms a { color: var(--new-purple-color); text-decoration: underline; }

        .nh-success-wrap { display: flex; flex-direction: column; align-items: center; justify-content: center; flex: 1; text-align: center; padding: 32px 0; }
        .nh-success-icon { width: 60px; height: 60px; background: linear-gradient(135deg,#e8f5e2,#d0edcb); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 18px; }
        .nh-success-title { font-family: 'Cormorant Garamond', serif; font-size: 26px; font-weight: 700; color: #1a3d1e; margin-bottom: 8px; }
        .nh-success-sub { font-size: 13px; color: #6a8a62; line-height: 1.6; margin-bottom: 26px; }
        .nh-success-close-btn { padding: 12px 32px; background: var(--new-purple-color); color: #fff; border: none; border-radius: 10px; font-size: 14px; font-weight: 700; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: background .18s; }
        .nh-success-close-btn:hover { background: #1f6030; }

        /* ── User dropdown ───────────────────────────────────────────────── */
        .nh-user-wrap { position: relative; }
        .nh-user-btn { display: flex; align-items: center; gap: 6px; height: 36px; padding: 0 12px 0 8px; border-radius: 9999px; border: 1.5px solid rgba(255,255,255,.25); background: rgba(255,255,255,.1); cursor: pointer; font-size: 13px; font-weight: 600; color: #fff; transition: background .18s, border-color .18s, color .18s; }
        .nh-user-btn:hover { background: #fff; border-color: #fff; color: #000; }
        .nh-user-avatar { width: 24px; height: 24px; border-radius: 50%; background: var(--color-gold, #C08A3E); color: #fff; font-size: 10px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .nh-dropdown { position: absolute; top: calc(100% + 8px); right: 0; background: #fff; border-radius: 14px; box-shadow: inset 0 2px 4px rgba(0,0,0,.06), 0 8px 24px rgba(0,0,0,.12), 0 2px 8px rgba(0,0,0,.08); border: 1px solid rgba(0,0,0,.08); min-width: 180px; overflow: hidden; z-index: 600; }
        .nh-dropdown-item { display: flex; align-items: center; gap: 10px; padding: 12px 16px; font-size: 13px; font-weight: 500; color: #333; cursor: pointer; transition: background .15s, color .15s; }
        .nh-dropdown-item:hover { background: rgba(0,0,0,.6); color: #fff; }
        .nh-dropdown-item.danger { color: #c53030; }
        .nh-dropdown-item.danger:hover { background: rgba(0,0,0,.6); color: #fff; }
        .nh-dropdown-divider { height: 1px; background: rgba(0,0,0,.08); margin: 4px 0; }
      `}</style>

      {/* ── PILL NAV ── */}
      <div className="nh-wrap" style={{ height: "fit-content" }}>
        <div className="nh-inner">
          {/* Logo */}
          <a
            className="nh-logo font-light"
            style={{fontWeight:"300"}}
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
          >
            <img
              src="https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=nabhiLogo.webp&version_id=null"
              alt="Nabhi Amrit"
            />
            {/* <span className="nh-logo-name" style={{ fontWeight: "400" }}>
              Ved
              <span
                style={{
                  fontFamily: "'Times New Roman', serif",
                  fontSize: "22px",
                  fontWeight: "400",
                }}
              >
                Raha.
              </span>
            </span> */}
          </a>

          {/* Desktop nav links */}
          <nav className="nh-nav">
            {navLinks.map((l) => (
              <a
                key={l.label}
                className="nh-nav-link"
                href={l.path}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(l.path);
                }}
              >
                {l.label}
              </a>
            ))}

            {/* Catalog with dropdown */}
            <div className="nh-catalog-wrap" ref={catalogRef}>
              <button
                className={`nh-catalog-btn${catalogOpen ? " open" : ""}`}
                onClick={() => setCatalogOpen((p) => !p)}
                aria-haspopup="true"
                aria-expanded={catalogOpen}
              >
                Catalog
                <span
                  className={`nh-catalog-chevron${catalogOpen ? " open" : ""}`}
                >
                  <ChevronDown size={13} strokeWidth={2.5} />
                </span>
              </button>
              <div
                className={`nh-catalog-drop${catalogOpen ? " open" : ""}`}
                role="menu"
              >
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
            <button
              className="nh-icon-btn"
              onClick={handleCartClick}
              aria-label="Open cart"
            >
              <ShoppingBag size={17} strokeWidth={1.8} />
              {cartCount > 0 && (
                <span className="nh-cart-badge">{cartCount}</span>
              )}
            </button>

            {/* User / Auth */}
            {loggedInUser ? (
              <div className="nh-user-wrap" ref={userDropRef}>
                <button
                  className="nh-user-btn"
                  onClick={() => setUserDropOpen((p) => !p)}
                >
                  <div className="nh-user-avatar">
                    {displayName[0]?.toUpperCase()}
                  </div>
                  <span className="max-w-[80px] overflow-hidden text-ellipsis whitespace-nowrap">
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
                    <div
                      className="nh-dropdown-item danger"
                      onClick={handleLogout}
                    >
                      <LogOut size={14} /> Logout
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="nh-user-wrap" ref={userDropRef}>
                <button
                  className="nh-icon-btn"
                  onClick={() => setUserDropOpen((p) => !p)}
                  aria-label="Account"
                >
                  <User size={17} strokeWidth={1.8} />
                </button>
                {userDropOpen && (
                  <div className="nh-dropdown">
                    <div
                      className="nh-dropdown-item"
                      onClick={() => {
                        setUserDropOpen(false);
                        navigate("/my-orders-en");
                      }}
                    >
                      <Package size={14} /> My Orders
                    </div>
                    <div className="nh-dropdown-divider" />
                    <div
                      className="nh-dropdown-item"
                      onClick={() => {
                        setUserDropOpen(false);
                        openModal("login");
                      }}
                    >
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
              onClick={(e) => {
                e.preventDefault();
                navigate("/products");
              }}
            >
              Shop Now
            </a>

            {/* Mobile hamburger */}
            <button
              className="nh-hamburger"
              onClick={() => setMenuOpen(true)}
              aria-label="Menu"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {(modalOpen || menuOpen) && (
        <div
          className="nh-overlay"
          onClick={() => {
            setModalOpen(false);
            setMenuOpen(false);
          }}
        />
      )}

      {/* ── AUTH MODAL ── */}
      {modalOpen && (
        <div
          className="nh-modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) setModalOpen(false);
          }}
        >
          <div className="nh-modal">
            {/* Left image panel */}
            <div className="nh-modal-left ml-10 my-10 rounded-xl">
              <img
                className="nh-modal-left-img"
                src={loginImg}
                alt="Ayurvedic wellness"
              />
              <div className="nh-modal-left-top">
                <div className="nh-modal-left-tagline">
                  {mode === "login" ? (
                    <>
                      Simplify The Process.
                      <br />
                      Supercharge The Results.
                    </>
                  ) : (
                    <>
                      Begin Your
                      <br />
                      Wellness Journey.
                    </>
                  )}
                </div>
                <div className="nh-modal-left-desc">
                  {mode === "login"
                    ? "Focus On The Big Picture While We Automate The Daily Details."
                    : "Join us for exclusive wellness products and personalised care."}
                </div>
              </div>
            </div>

            {/* Right form panel */}
            <div className="nh-modal-right">
              <button
                className="nh-modal-close"
                onClick={() => setModalOpen(false)}
              >
                <X size={12} />
              </button>

              {submitted ? (
                <div className="nh-success-wrap">
                  <div className="nh-success-icon">
                    <CheckCircle size={26} color="var(--new-purple-color)" strokeWidth={1.8} />
                  </div>
                  <div className="nh-success-title">
                    {mode === "login" ? "Welcome back!" : "You're in!"}
                  </div>
                  <div className="nh-success-sub">
                    {mode === "login"
                      ? `Good to see you again, ${loggedInUser?.name || loggedInUser?.email?.split("@")[0]}.`
                      : `Welcome to Vedraha${notify ? ". We'll keep you updated on offers." : "."}`}
                  </div>
                  <button
                    className="nh-success-close-btn"
                    onClick={() => setModalOpen(false)}
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <>
                  <div
                    className="nh-modal-right-logo"
                    style={{ justifyContent: "center", marginBottom: 8 }}
                  >
                    <img
                      src="https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=nabhiLogo.webp&version_id=null"
                      alt="Nabhi Amrit"
                    />
                  </div>

                  <div className="nh-modal-right-title">
                    {mode === "login"
                      ? "Log in to your account"
                      : "Create your account"}
                  </div>
                  <div className="nh-modal-right-sub">
                    {mode === "login"
                      ? "Welcome back. Fill in your details to get back in."
                      : "Join us — it takes less than a minute."}
                  </div>

                  <div className="nh-tabs">
                    <button
                      className={`nh-tab${mode === "login" ? " active" : ""}`}
                      onClick={() => {
                        setMode("login");
                        setError("");
                      }}
                    >
                      LOGIN
                    </button>
                    <button
                      className={`nh-tab${mode === "signup" ? " active" : ""}`}
                      onClick={() => {
                        setMode("signup");
                        setError("");
                      }}
                    >
                      SIGN UP
                    </button>
                  </div>

                  

                 

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

                  <div className="nh-field">
                    <label className="nh-label">Email</label>
                    <input
                      className={`nh-input${error && !email ? " error" : ""}`}
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                      }}
                      autoComplete="email"
                    />
                  </div>

                  <div className="nh-field">
                    <label className="nh-label">Password</label>
                    <div className="nh-input-wrap">
                      <input
                        className={`nh-input nh-input-pass${error && !password ? " error" : ""}`}
                        type={showPass ? "text" : "password"}
                        placeholder={
                          mode === "signup"
                            ? "Min. 6 characters"
                            : "············"
                        }
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          setError("");
                        }}
                        onKeyDown={(e) =>
                          e.key === "Enter" &&
                          (mode === "login" ? handleLogin() : handleSignup())
                        }
                        autoComplete={
                          mode === "login" ? "current-password" : "new-password"
                        }
                      />
                      <button
                        className="nh-pass-toggle"
                        type="button"
                        onClick={() => setShowPass((p) => !p)}
                      >
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
                          onChange={(e) => {
                            setConfirmPass(e.target.value);
                            setError("");
                          }}
                          onKeyDown={(e) => e.key === "Enter" && handleSignup()}
                          autoComplete="new-password"
                        />
                        <button
                          className="nh-pass-toggle"
                          type="button"
                          onClick={() => setShowConfirmPass((p) => !p)}
                        >
                          {showConfirmPass ? (
                            <EyeOff size={14} />
                          ) : (
                            <Eye size={14} />
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {mode === "signup" && (
                    <label className="nh-notify-row">
                      <input
                        type="checkbox"
                        checked={notify}
                        onChange={() => setNotify((p) => !p)}
                      />
                      <span>Notify me with offers &amp; updates</span>
                    </label>
                  )}

                  {error && <div className="nh-error">⚠ {error}</div>}

                  <button
                    className="nh-submit-btn"
                    onClick={mode === "login" ? handleLogin : handleSignup}
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <span className="nh-spinner" /> Please wait…
                      </>
                    ) : (
                      <>
                        {mode === "login" ? "Log In" : "Create Account"}{" "}
                        <span
                          style={{ fontSize: 16, transition: "transform .15s" }}
                        >
                          →
                        </span>
                      </>
                    )}
                  </button>

                   <div className="nh-divider">
                    <span>or continue with email</span>
                  </div>



                  {/* ── Google Sign-In button ── */}
                  <div className="nh-google-btn-wrap">
                    {(!googleReady || !googleClientId) && (
                      <div className="nh-google-btn-placeholder">
                        {/* Google G icon */}
                        <svg
                          viewBox="0 0 24 24"
                          width="18"
                          height="18"
                          aria-hidden="true"
                        >
                          <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.25 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="#FBBC05"
                            d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.83z"
                          />
                          <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.83C6.71 7.31 9.14 5.38 12 5.38z"
                          />
                        </svg>
                        <span className="text-sm text-gray-400">
                          {!googleClientId
                            ? "Google sign-in not configured"
                            : "Loading Google…"}
                        </span>
                      </div>
                    )}
                    {/* GSI renders its own button here — don't hide the div or dimensions break */}
                    <div
                      ref={googleBtnRef}
                      style={{
                        width: "100%",
                        display:
                          googleReady && googleClientId ? "flex" : "none",
                        justifyContent: "center",
                      }}
                    />
                  </div>

                  {googleSubmitting && (
                    <div className="flex items-center justify-center gap-2 mb-3 text-sm text-gray-500">
                      <span
                        className="nh-spinner"
                        style={{
                          borderTopColor: "var(--new-purple-color)",
                          borderColor: "rgba(24,75,36,.2)",
                        }}
                      />
                      Signing in with Google…
                    </div>
                  )}




                  <div className="nh-switch-row">
                    {mode === "login" ? (
                      <>
                        Don't have an account?{" "}
                        <button
                          onClick={() => {
                            setMode("signup");
                            setError("");
                          }}
                        >
                          Create One
                        </button>
                      </>
                    ) : (
                      <>
                        Already have an account?{" "}
                        <button
                          onClick={() => {
                            setMode("login");
                            setError("");
                          }}
                        >
                          Log In
                        </button>
                      </>
                    )}
                  </div>

                  <div className="nh-terms" style={{ marginTop: 14 }}>
                    By continuing you accept our{" "}
                    <a href="#">Privacy Policy and T&Cs.</a>
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
            <span
  style={{
    fontFamily: "var(--font-new-2)",
    fontSize: 18,
    fontWeight: 700,
    color: "#111",
  }}
>
              Vedraha
            </span>
            <button
              className="flex items-center justify-center w-[34px] h-[34px] rounded-full border border-[rgba(24,75,36,0.20)] bg-white/70 cursor-pointer text-gray-600"
              onClick={() => setMenuOpen(false)}
            >
              <X size={14} />
            </button>
          </div>

          <div
            className="nh-mob-link"
            style={{
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 0,
            }}
          >
            <span className="w-full flex justify-between">
              CATALOG <span style={{ color: "#94a3b8", fontSize: 18 }}>›</span>
            </span>
            <div className="nh-mob-catalog-sub">
              {CATALOG_LINKS.map((item) => (
                <a
                  key={item.label}
                  href={item.path}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(item.path);
                    setMenuOpen(false);
                  }}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {navLinks.map((l) => (
            <div
              key={l.label}
              className="nh-mob-link"
              onClick={() => {
                navigate(l.path);
                setMenuOpen(false);
              }}
            >
              <span>{l.label.toUpperCase()}</span>
              <span style={{ color: "#94a3b8", fontSize: 18 }}>›</span>
            </div>
          ))}

          <div
            className="nh-mob-link"
            onClick={() => {
              navigate("/my-orders-en");
              setMenuOpen(false);
            }}
          >
            <span>MY ORDERS</span>
            <span style={{ color: "#94a3b8", fontSize: 18 }}>›</span>
          </div>

          {loggedInUser ? (
            <div
              className="nh-mob-link"
              style={{ color: "#c0392b" }}
              onClick={handleLogout}
            >
              <span>LOGOUT</span>
              <span style={{ color: "#94a3b8", fontSize: 18 }}>›</span>
            </div>
          ) : (
            <div
              className="nh-mob-link"
              onClick={() => {
                openModal("login");
                setMenuOpen(false);
              }}
            >
              <span>LOGIN / SIGN UP</span>
              <span style={{ color: "#94a3b8", fontSize: 18 }}>›</span>
            </div>
          )}
        </div>
      )}
    </>
  );
}
