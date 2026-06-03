import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  CheckCircle,
  ChevronDown,
  Eye,
  EyeOff,
  LogOut,
  Menu,
  Package,
  Search,
  ShoppingBag,
  User,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { backendurl } from "../App";
import { useCart } from "../components/CartContext";
import logo from "../../public/Logo.webp";

const CATALOG_LINKS = [
  { label: "All Products", path: "/products" },
  { label: "Nabhi Oils", path: "/products/nabhi-oils" },
  { label: "Wellness Kits", path: "/products/wellness-kits" },
  { label: "Herbal Blends", path: "/products/herbal-blends" },
  { label: "Gift Sets", path: "/products/gift-sets" },
];

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Shop", path: "/products" },
  { label: "About Us", path: "/products/nabhi-about-en" },
  { label: "Our Ingredients", path: "/products/nabhi-ingredients-en" },
  { label: "Blogs", path: "/blogs" },
  { label: "Contact", path: "/products/nabhi-contact-en" },
];

const marqueeItems = [
  {
    text: "100% Ayurvedic",
    icon: (
      <svg
        className="w-3.5 h-3.5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3v18M3 12h18M12 3a9 9 0 110 18 9 9 0 010-18z"
        />
      </svg>
    ),
  },
  {
    text: "Made with Authentic Herbs",
    icon: (
      <svg
        className="w-3.5 h-3.5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.7 3.9C13 4.2 7.9 7.1 5.5 12.8c.9-.5 1.9-.8 3.1-.9 2.7-.2 5.1.7 7.4 2.1-2.5.2-4.9.7-7.2 1.8-1.8.9-3.2 2.2-4.2 3.9 3.9-.7 7.3-2.1 10-4.1 3.6-2.7 5.7-6.6 6.1-11.7Z"
        />
      </svg>
    ),
  },
  {
    text: "No Mineral Oil / No Chemicals",
    icon: (
      <svg
        className="w-3.5 h-3.5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
        />
      </svg>
    ),
  },
  {
    text: "Cruelty Free",
    icon: (
      <svg
        className="w-3.5 h-3.5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    ),
  },
  {
    text: "Free Shipping on Orders ₹999+",
    icon: (
      <svg
        className="w-3.5 h-3.5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
        />
      </svg>
    ),
  },
];
const marqueeLoop = [...marqueeItems, ...marqueeItems, ...marqueeItems];

export default function NabhiHeader({ onCartOpen }) {
  const { cartTotalQty: cartCount } = useCart();
  const navigate = useNavigate();
  const userDropRef = useRef(null);
  const catalogRef = useRef(null);
  const googleBtnRef = useRef(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState("login");
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuClosing, setMenuClosing] = useState(false);
  const [mobileCatalogOpen, setMobileCatalogOpen] = useState(true);
  const [userDropOpen, setUserDropOpen] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
  const [googleReady, setGoogleReady] = useState(false);
  const [googleSubmitting, setGoogleSubmitting] = useState(false);
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  const [loggedInUser, setLoggedInUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("akravi_user")) || null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = modalOpen || menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalOpen, menuOpen]);

  useEffect(() => {
    if (!modalOpen) return;
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
  }, [modalOpen, mode]);

  const handleGoogleCredentialResponse = useCallback(async (response) => {
    if (!response?.credential) {
      setError("Google sign-in was cancelled");
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

  useEffect(() => {
    if (!googleClientId) return;

    let cancelled = false;
    const init = () => {
      if (cancelled) return;
      if (!window.google?.accounts?.id) return;
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

  useEffect(() => {
    const handler = (e) => {
      if (userDropRef.current && !userDropRef.current.contains(e.target)) {
        setUserDropOpen(false);
      }
      if (catalogRef.current && !catalogRef.current.contains(e.target)) {
        setCatalogOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const openModal = (m = "login") => {
    setMode(m);
    setModalOpen(true);
  };

  const openMobileMenu = () => {
    setUserDropOpen(false);
    setCatalogOpen(false);
    setMenuClosing(false);
    setMenuOpen(true);
  };

  const closeMobileMenu = () => {
    setMenuClosing(true);
    window.setTimeout(() => {
      setMenuOpen(false);
      setMenuClosing(false);
    }, 240);
  };

  const navigateAndCloseMenu = (path) => {
    navigate(path);
    closeMobileMenu();
  };

  const validateEmail = (v) => /^\S+@\S+\.\S+$/.test(v);

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
    if (menuOpen) closeMobileMenu();
    navigate("/");
  };

  // Render Google's hosted button into the ref div whenever the modal is open
  // and GSI is ready. renderButton() is immune to browser popup suppression.
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
      width: googleBtnRef.current.offsetWidth || 340,
    });
  }, [modalOpen, googleReady, googleClientId, mode]);

  const handleMyOrders = () => {
    setUserDropOpen(false);
    navigate("/my-orders-en");
  };

  const displayName =
    loggedInUser?.name || loggedInUser?.email?.split("@")[0] || "Account";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@400;500;600;700;800&display=swap');

        * { box-sizing: border-box; }

        .beauty-marquee-track { animation: marquee 20s linear infinite; }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-33.333%); }
        }

        .nh-marquee-bar {
          position: fixed;
          inset: 0 0 auto;
          width: 100%;
          z-index: 501;
          transition: opacity 240ms ease, transform 240ms ease;
        }
        .scrolled-marquee-hidden {
          opacity: 0;
          pointer-events: none;
          transform: translateY(-100%);
        }

        .nh-wrap {
          position: fixed;
          top: 36px;
          left: 0;
          right: 0;
          width: 100%;
          z-index: 500;
          padding: 0;
          font-family: var(--font-new-1);
          background: transparent;
          border-bottom: 1px solid transparent;
          transition: background 240ms ease, border-color 240ms ease, box-shadow 240ms ease, top 240ms ease, backdrop-filter 240ms ease;
        }

        .nh-wrap.scrolled {
          top: 0;
          background: var(--new-header-bg);
          border-bottom-color: rgba(93, 39, 170, 0.15);
          box-shadow: 0 4px 24px rgba(33, 18, 76, 0.10);
          backdrop-filter: blur(18px) saturate(160%);
          -webkit-backdrop-filter: blur(18px) saturate(160%);
        }

        .nh-inner {
          pointer-events: all;
          width: 100%;
          max-width: 1240px;
          height: 78px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 230px minmax(0, 1fr) auto;
          align-items: center;
          gap: 26px;
          padding: 0 52px;
          background: transparent;
          border: 0;
          border-radius: 0;
          box-shadow: none;
          transition: height 240ms ease, padding 240ms ease, gap 240ms ease;
        }

        .nh-wrap.scrolled .nh-inner {
          height: 66px;
        }

        .nh-logo {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          width: fit-content;
          min-width: 0;
          line-height: 1;
          text-decoration: none;
        }

        .nh-logo img {
          display: block;
          height: 45px;
          max-height: 70px;
          object-fit: contain;
          transition: height 240ms ease;
        }

        .nh-wrap.scrolled .nh-logo img { height: 40px; }
        .nh-logo-name { display: none; }

        .nh-nav {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 34px;
          min-width: 0;
        }

        .nh-nav-link,
        .nh-catalog-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 8px 0;
          border: 0;
          background: transparent;
          color: var(--new-heading-text, #21124c);
          font-family: var(--font-new-1);
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0;
          line-height: 1;
          text-decoration: none;
          text-transform: uppercase;
          white-space: nowrap;
          cursor: pointer;
          transition: color 180ms ease, opacity 180ms ease;
        }

        .nh-nav-link::after,
        .nh-catalog-btn::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 3px;
          border-radius: 999px;
          background: var(--color-black, #df8804);
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 180ms ease;
        }

        .nh-nav-link:hover,
        .nh-catalog-btn:hover,
        .nh-catalog-btn.open {
          color: var(--new-purple-color, #5d27aa);
        }

        .nh-nav-link:hover::after,
        .nh-catalog-btn:hover::after,
        .nh-catalog-btn.open::after {
          transform: scaleX(1);
        }

        .nh-catalog-wrap { position: relative; }
        .nh-catalog-chevron {
          display: flex;
          align-items: center;
          color: currentColor;
          transition: transform 220ms ease;
        }
        .nh-catalog-chevron.open { transform: rotate(180deg); }

        .nh-catalog-drop {
          position: absolute;
          top: calc(100% + 14px);
          left: 50%;
          z-index: 700;
          min-width: 210px;
          overflow: hidden;
          border: 1px solid rgba(238, 234, 246, 0.95);
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.96);
          box-shadow: 0 16px 34px rgba(33, 18, 76, 0.14);
          opacity: 0;
          pointer-events: none;
          transform: translateX(-50%) translateY(-8px);
          transition: opacity 200ms ease, transform 200ms ease;
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
        }
        .nh-catalog-drop.open {
          opacity: 1;
          pointer-events: all;
          transform: translateX(-50%) translateY(0);
        }

        .nh-catalog-drop-item {
          display: block;
          padding: 12px 18px;
          color: var(--new-heading-text, #21124c);
          font-size: 13px;
          font-weight: 700;
          text-decoration: none;
          transition: background 160ms ease, color 160ms ease;
        }
        .nh-catalog-drop-item:hover {
          background: #fbf8ff;
          color: var(--new-purple-color, #5d27aa);
        }

        .nh-actions {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 18px;
          flex-shrink: 0;
        }

        .nh-icon-btn,
        .nh-hamburger {
          position: relative;
          width: 30px;
          height: 30px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          border: 0;
          border-radius: 50%;
          background: transparent;
          color: var(--new-heading-text, #21124c);
          cursor: pointer;
          transition: color 180ms ease, transform 180ms ease;
        }
        .nh-icon-btn:hover,
        .nh-hamburger:hover {
          color: var(--new-purple-color, #5d27aa);
          transform: translateY(-1px);
        }

        .nh-cart-badge {
          position: absolute;
          top: -6px;
          right: -7px;
          min-width: 17px;
          height: 17px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 4px;
          border-radius: 999px;
          background: var(--new-accent-color, #df8804);
          color: #fff;
          font-size: 10px;
          font-weight: 800;
          line-height: 1;
          box-shadow: 0 3px 8px rgba(223, 136, 4, 0.28);
        }

        .nh-user-wrap { position: relative; }
        .nh-user-btn {
          display: flex;
          align-items: center;
          gap: 7px;
          height: 34px;
          max-width: 148px;
          padding: 0 10px 0 5px;
          border: 1px solid rgba(238, 234, 246, 0.95);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.72);
          color: var(--new-heading-text, #21124c);
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 800;
          transition: color 180ms ease, border-color 180ms ease, background 180ms ease;
        }
        .nh-user-btn:hover {
          color: var(--new-purple-color, #5d27aa);
          border-color: rgba(93, 39, 170, 0.24);
          background: #fff;
        }
        .nh-user-avatar {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: var(--new-primary-color, #35105f);
          color: #fff;
          font-size: 10px;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .nh-dropdown {
          position: absolute;
          top: calc(100% + 12px);
          right: 0;
          z-index: 700;
          min-width: 190px;
          overflow: hidden;
          border: 1px solid rgba(238, 234, 246, 0.95);
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.96);
          box-shadow: 0 16px 34px rgba(33, 18, 76, 0.14);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
        }
        .nh-dropdown-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 16px;
          color: var(--new-heading-text, #21124c);
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition: background 160ms ease, color 160ms ease;
        }
        .nh-dropdown-item:hover {
          background: #fbf8ff;
          color: var(--new-purple-color, #5d27aa);
        }
        .nh-dropdown-item.danger { color: #c53030; }
        .nh-dropdown-divider {
          height: 1px;
          background: rgba(238, 234, 246, 0.95);
        }

        .nh-hamburger { display: none; }

        .nh-overlay,
        .nh-menu-overlay {
          position: fixed;
          inset: 0;
          background: rgba(33, 18, 76, 0.36);
          backdrop-filter: blur(3px);
          -webkit-backdrop-filter: blur(3px);
        }
        .nh-overlay { z-index: 1000; }
        .nh-menu-overlay {
          z-index: 1090;
          opacity: 1;
          transition: opacity 240ms ease;
        }
        .nh-menu-overlay.closing { opacity: 0; }

        .nh-mob-drawer {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          z-index: 1100;
          width: min(390px, 88vw);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.98);
          box-shadow: -24px 0 60px rgba(33, 18, 76, 0.18);
          transform: translateX(100%);
          transition: transform 240ms ease;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }
        .nh-mob-drawer.open { transform: translateX(0); }
        .nh-mob-drawer.closing { transform: translateX(100%); }

        .nh-mob-head {
          min-height: 78px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 20px;
          border-bottom: 1px solid rgba(238, 234, 246, 1);
        }
        .nh-mob-brand img {
          width: 132px;
          height: auto;
          display: block;
        }
        .nh-mob-close {
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(238, 234, 246, 1);
          border-radius: 50%;
          background: #fff;
          color: var(--new-heading-text, #21124c);
          cursor: pointer;
        }
        .nh-mob-body {
          flex: 1;
          overflow-y: auto;
          padding: 8px 20px 20px;
        }
        .nh-mob-link,
        .nh-mob-catalog-trigger {
          width: 100%;
          min-height: 52px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0;
          border: 0;
          border-bottom: 1px solid rgba(238, 234, 246, 1);
          background: transparent;
          color: var(--new-heading-text, #21124c);
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.04em;
          text-align: left;
          text-transform: uppercase;
          cursor: pointer;
        }
        .nh-mob-link:hover,
        .nh-mob-catalog-trigger:hover {
          color: var(--new-purple-color, #5d27aa);
        }
        .nh-mob-catalog-chevron {
          transition: transform 200ms ease;
        }
        .nh-mob-catalog-chevron.open {
          transform: rotate(180deg);
        }
        .nh-mob-catalog-sub {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 220ms ease;
        }
        .nh-mob-catalog-sub.open { grid-template-rows: 1fr; }
        .nh-mob-catalog-sub-inner {
          overflow: hidden;
          padding-left: 14px;
        }
        .nh-mob-catalog-sub a {
          display: block;
          padding: 10px 0;
          color: var(--new-para-text, #262239);
          font-size: 13px;
          font-weight: 600;
          text-decoration: none;
        }
        .nh-mob-footer {
          padding: 16px 20px 22px;
          border-top: 1px solid rgba(238, 234, 246, 1);
        }
        .nh-mob-account-btn {
          width: 100%;
          min-height: 46px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border: 0;
          border-radius: 10px;
          background: var(--new-primary-color, #35105f);
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 800;
          text-transform: uppercase;
          cursor: pointer;
        }

        .nh-modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: rgba(33, 18, 76, 0.78);
        }
        .nh-modal {
          position: relative;
          display: flex;
          align-items: stretch;
          width: 100%;
          max-width: 800px;
          max-height: calc(100vh - 40px);
          overflow: hidden;
          border-radius: 20px;
          box-shadow: 0 40px 100px rgba(33, 18, 76, 0.42);
        }
        .nh-modal-left {
          flex: 1;
          position: relative;
          min-height: 480px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .nh-modal-left-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .nh-modal-left::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 1;
          background: linear-gradient(175deg, rgba(93, 39, 170, 0.45), rgba(33, 18, 76, 0.78));
        }
        .nh-modal-left-top,
        .nh-modal-left-content {
          position: relative;
          z-index: 2;
          padding: 36px;
        }
        .nh-modal-left-content { margin-top: auto; }
        .nh-modal-left-brand {
          display: flex;
          align-items: center;
          gap: 9px;
          margin-bottom: 22px;
        }
        .nh-modal-left-brand-logo { width: 34px; height: auto; }
        .nh-modal-left-brand-name {
          font-family: 'Cormorant Garamond', serif;
          color: #fff;
          font-size: 20px;
          font-weight: 700;
        }
        .nh-modal-left-tagline {
          font-family: 'Cormorant Garamond', serif;
          color: #fff;
          font-size: 30px;
          font-weight: 700;
          line-height: 1.15;
        }
        .nh-modal-left-tagline em {
          color: #f1dfff;
          font-style: italic;
        }
        .nh-modal-left-title {
          margin-bottom: 6px;
          color: rgba(255, 255, 255, 0.78);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }
        .nh-modal-left-sub {
          max-width: 280px;
          color: rgba(255, 255, 255, 0.68);
          font-size: 13px;
          line-height: 1.6;
        }
        .nh-modal-right {
          position: relative;
          width: 380px;
          flex-shrink: 0;
          max-height: calc(100vh - 40px);
          overflow-y: auto;
          padding: 40px 36px 36px;
          background: #fff;
        }
        .nh-modal-close {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 30px;
          height: 30px;
          border: 1px solid rgba(238, 234, 246, 1);
          border-radius: 50%;
          background: #fff;
          color: var(--new-neutral-color, #aaa4b8);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .nh-modal-right-logo {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 24px;
        }
        .nh-modal-right-logo img { width: 38px; height: auto; }
        .nh-modal-right-logo-name,
        .nh-modal-right-title,
        .nh-success-title {
          font-family: 'Cormorant Garamond', serif;
          color: var(--new-heading-text, #21124c);
          font-weight: 700;
        }
        .nh-modal-right-logo-name { font-size: 21px; }
        .nh-modal-right-title,
        .nh-success-title {
          margin-bottom: 6px;
          font-size: 27px;
          line-height: 1.2;
        }
        .nh-modal-right-sub,
        .nh-switch-row,
        .nh-terms {
          color: var(--new-neutral-color, #aaa4b8);
          font-size: 13px;
          line-height: 1.5;
        }
        .nh-tabs {
          display: flex;
          margin: 22px 0;
          border-bottom: 1px solid rgba(238, 234, 246, 1);
        }
        .nh-tab {
          flex: 1;
          padding: 10px 0;
          border: 0;
          border-bottom: 2px solid transparent;
          background: transparent;
          color: var(--new-neutral-color, #aaa4b8);
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.08em;
          cursor: pointer;
        }
        .nh-tab.active {
          color: var(--new-primary-color, #35105f);
          border-bottom-color: var(--new-primary-color, #35105f);
        }
        .nh-field { margin-bottom: 16px; }
        .nh-label {
          display: block;
          margin-bottom: 7px;
          color: var(--new-para-text, #262239);
          font-size: 12px;
          font-weight: 700;
        }
        .nh-input {
          width: 100%;
          padding: 11px 14px;
          border: 1.5px solid rgba(238, 234, 246, 1);
          border-radius: 10px;
          background: #fff;
          color: var(--new-heading-text, #21124c);
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          outline: none;
        }
        .nh-input:focus {
          border-color: var(--new-purple-color, #5d27aa);
          box-shadow: 0 0 0 3px rgba(93, 39, 170, 0.1);
        }
        .nh-input.error { border-color: #e53e3e; }
        .nh-input-wrap { position: relative; }
        .nh-input-pass { padding-right: 42px; }
        .nh-pass-toggle {
          position: absolute;
          top: 50%;
          right: 12px;
          display: flex;
          border: 0;
          background: transparent;
          color: var(--new-neutral-color, #aaa4b8);
          cursor: pointer;
          transform: translateY(-50%);
        }
        .nh-notify-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 16px;
          color: var(--new-para-text, #262239);
          font-size: 13px;
          cursor: pointer;
        }
        .nh-error {
          margin-bottom: 14px;
          padding: 9px 13px;
          border: 1px solid #fed7d7;
          border-radius: 8px;
          background: #fff5f5;
          color: #c53030;
          font-size: 13px;
        }
        .nh-submit-btn,
        .nh-success-close-btn {
          border: 0;
          border-radius: 10px;
          background: var(--new-primary-color, #35105f);
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-weight: 800;
          cursor: pointer;
          transition: background 180ms ease, transform 160ms ease;
        }
        .nh-submit-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-bottom: 14px;
          padding: 13px;
          font-size: 14px;
        }
        .nh-submit-btn:hover,
        .nh-success-close-btn:hover {
          background: var(--new-purple-color, #5d27aa);
        }
        .nh-submit-btn:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }
        .nh-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.32);
          border-top-color: #fff;
          border-radius: 50%;
          animation: nhSpin 0.7s linear infinite;
        }
        @keyframes nhSpin { to { transform: rotate(360deg); } }
        .nh-success-wrap {
          min-height: 360px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }
        .nh-success-icon {
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 18px;
          border-radius: 50%;
          background: #fbf8ff;
        }
        .nh-success-sub {
          margin-bottom: 26px;
          color: var(--new-para-text, #262239);
          font-size: 13px;
          line-height: 1.6;
        }
        .nh-success-close-btn {
          padding: 12px 32px;
          font-size: 14px;
        }
        .nh-terms {
          margin-top: 14px;
          text-align: center;
          font-size: 11px;
        }
        .nh-terms a,
        .nh-switch-row button {
          color: var(--new-purple-color, #5d27aa);
          font-weight: 800;
        }
        .nh-switch-row {
          text-align: center;
          font-size: 12px;
        }
        .nh-switch-row button {
          padding: 0;
          border: 0;
          background: transparent;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
        }

        .nh-google-btn-wrap {
          width: 100%;
          margin-bottom: 14px;
          min-height: 44px;
          display: flex;
          justify-content: center;
        }
        .nh-google-btn-placeholder {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 12px 14px;
          border: 1.5px solid rgba(238, 234, 246, 1);
          border-radius: 10px;
          background: #fff;
          color: var(--new-neutral-color, #aaa4b8);
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 600;
        }
        .nh-google-icon { flex-shrink: 0; }
        .nh-spinner-dark {
          border-color: rgba(33, 18, 76, 0.2);
          border-top-color: var(--new-primary-color, #35105f);
        }
        .nh-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 6px 0 16px;
          color: var(--new-neutral-color, #aaa4b8);
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .nh-divider::before,
        .nh-divider::after {
          content: "";
          flex: 1;
          height: 1px;
          background: rgba(238, 234, 246, 1);
        }

        @media (max-width: 1100px) {
          .nh-inner,
          .nh-wrap.scrolled .nh-inner {
            grid-template-columns: 185px minmax(0, 1fr) auto;
            gap: 18px;
            padding: 0 24px;
          }
          .nh-nav { gap: 20px; }
          .nh-nav-link,
          .nh-catalog-btn { font-size: 12px; }
        }

        @media (max-width: 860px) {
          .nh-wrap,
          .nh-wrap.scrolled {
            padding: 0;
          }

          .nh-inner,
          .nh-wrap.scrolled .nh-inner {
            height: 66px;
            grid-template-columns: auto auto;
            gap: 14px;
            padding: 0 18px;
          }

          .nh-logo img,
          .nh-wrap.scrolled .nh-logo img {
            height: 44px;
            max-height: 44px;
          }

          .nh-nav,
          .nh-catalog-wrap {
            display: none;
          }

          .nh-actions {
            gap: 12px;
          }

          .nh-hamburger {
            display: inline-flex;
          }
        }

        @media (max-width: 640px) {
          .nh-inner,
          .nh-wrap.scrolled .nh-inner {
            height: 60px;
            padding: 0 14px;
          }

          .nh-logo img,
          .nh-wrap.scrolled .nh-logo img {
            height: 40px;
            max-height: 40px;
          }

          .nh-actions {
            gap: 8px;
          }

          .nh-icon-btn,
          .nh-hamburger {
            width: 32px;
            height: 32px;
          }

          .nh-actions .nh-icon-btn:first-child {
            display: none;
          }

          .nh-user-btn {
            max-width: 112px;
          }

          .nh-modal-left {
            display: none;
          }

          .nh-modal-right {
            width: 100%;
            padding: 34px 24px;
          }
        }
      `}</style>

      <div
        className={`nh-marquee-bar${scrolled ? " scrolled-marquee-hidden" : ""}`}
      >
        <div
          style={{ background: "var(--new-primary-color)" }}
          className="relative overflow-hidden py-2.5 text-white"
        >
          <div className="beauty-marquee-track relative z-10 flex w-max items-center">
            {marqueeLoop.map((item, index) => (
              <div
                key={`${item.text}-${index}`}
                className="flex min-w-max items-center"
              >
                {/* Item Content Wrapper */}
                <div
                  className="flex items-center gap-2 text-xs font-medium tracking-wide"
                  style={{ color: "rgba(255,255,255,0.95)" }}
                >
                  {/* Dynamic Gold/Amber accents on the icons to mimic image style */}
                  <span
                    style={{ color: "#d9a05b" }}
                    className="flex items-center shrink-0"
                  >
                    {item.icon}
                  </span>
                  <span>{item.text}</span>
                </div>

                {/* Vertical Separator Pipeline Pipe instead of Bullet Dot */}
                <span
                  className="mx-6 text-[10px]"
                  style={{ color: "rgba(255,255,255,0.25)" }}
                >
                  |
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`nh-wrap${scrolled ? " scrolled" : ""}`}>
        <div className="nh-inner">
          <a
            className="nh-logo"
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
          >
            <img src={logo} alt="Nabhi Amrit" />
            <span className="nh-logo-name">Vedraha</span>
          </a>

          <nav className="nh-nav">
            <a
              className="nh-nav-link"
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
              }}
            >
              Home
            </a>

            <div className="nh-catalog-wrap" ref={catalogRef}>
              <button
                className={`nh-catalog-btn${catalogOpen ? " open" : ""}`}
                onClick={() => setCatalogOpen((p) => !p)}
                aria-haspopup="true"
                aria-expanded={catalogOpen}
              >
                Shop
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

            {navLinks.slice(2).map((l) => (
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
          </nav>

          <div className="nh-actions">
            <button
              className="nh-icon-btn"
              onClick={() => navigate("/products")}
              aria-label="Search"
            >
              <Search size={23} strokeWidth={2} />
            </button>

            {loggedInUser ? (
              <div className="nh-user-wrap" ref={userDropRef}>
                <button
                  className="nh-user-btn"
                  onClick={() => setUserDropOpen((p) => !p)}
                >
                  <div className="nh-user-avatar">
                    {displayName[0]?.toUpperCase()}
                  </div>
                  <span
                    style={{
                      maxWidth: 80,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {displayName}
                  </span>
                  <ChevronDown size={12} />
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
                  <User size={23} strokeWidth={2} />
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

            <button
              className="nh-icon-btn"
              onClick={() => onCartOpen?.()}
              aria-label="Open cart"
            >
              <ShoppingBag size={23} strokeWidth={2} />
              {cartCount > 0 && (
                <span className="nh-cart-badge">{cartCount}</span>
              )}
            </button>

            <button
              className="nh-hamburger"
              onClick={openMobileMenu}
              aria-label="Menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </div>

      {modalOpen && (
        <div className="nh-overlay" onClick={() => setModalOpen(false)} />
      )}

      {menuOpen && (
        <>
          <div
            className={`nh-menu-overlay${menuClosing ? " closing" : ""}`}
            onClick={closeMobileMenu}
          />
          <aside
            className={`nh-mob-drawer open${menuClosing ? " closing" : ""}`}
            aria-label="Mobile navigation"
          >
            <div className="nh-mob-head">
              <a
                className="nh-mob-brand"
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  navigateAndCloseMenu("/");
                }}
              >
                <img src={logo} alt="Nabhi Amrit" />
              </a>
              <button
                className="nh-mob-close"
                onClick={closeMobileMenu}
                aria-label="Close menu"
              >
                <X size={15} />
              </button>
            </div>

            <div className="nh-mob-body">
              <button
                className="nh-mob-link"
                onClick={() => navigateAndCloseMenu("/")}
              >
                <span>Home</span>
                <span>›</span>
              </button>

              <button
                className="nh-mob-catalog-trigger"
                onClick={() => setMobileCatalogOpen((p) => !p)}
                aria-expanded={mobileCatalogOpen}
              >
                <span>Shop</span>
                <ChevronDown
                  className={`nh-mob-catalog-chevron${mobileCatalogOpen ? " open" : ""}`}
                  size={16}
                />
              </button>
              <div
                className={`nh-mob-catalog-sub${mobileCatalogOpen ? " open" : ""}`}
              >
                <div className="nh-mob-catalog-sub-inner">
                  {CATALOG_LINKS.map((item) => (
                    <a
                      key={item.label}
                      href={item.path}
                      onClick={(e) => {
                        e.preventDefault();
                        navigateAndCloseMenu(item.path);
                      }}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>

              {navLinks.slice(2).map((l) => (
                <button
                  key={l.label}
                  className="nh-mob-link"
                  onClick={() => navigateAndCloseMenu(l.path)}
                >
                  <span>{l.label}</span>
                  <span>›</span>
                </button>
              ))}

              <button
                className="nh-mob-link"
                onClick={() => navigateAndCloseMenu("/my-orders-en")}
              >
                <span>My Orders</span>
                <span>›</span>
              </button>
            </div>

            <div className="nh-mob-footer">
              {loggedInUser ? (
                <button
                  className="nh-mob-account-btn"
                  style={{ background: "#c53030" }}
                  onClick={handleLogout}
                >
                  <LogOut size={16} /> Logout
                </button>
              ) : (
                <button
                  className="nh-mob-account-btn"
                  onClick={() => {
                    closeMobileMenu();
                    window.setTimeout(() => openModal("login"), 240);
                  }}
                >
                  <User size={16} /> Login / Sign Up
                </button>
              )}
            </div>
          </aside>
        </>
      )}

      {modalOpen && (
        <div
          className="nh-modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) setModalOpen(false);
          }}
        >
          <div className="nh-modal">
            <div className="nh-modal-left">
              <img
                className="nh-modal-left-img"
                src="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&q=80"
                alt="Ayurvedic wellness"
              />
              <div className="nh-modal-left-top">
                <div className="nh-modal-left-brand">
                  <img
                    className="nh-modal-left-brand-logo"
                    src={logo}
                    alt="Nabhi Amrit"
                  />
                  <span className="nh-modal-left-brand-name">Vedraha</span>
                </div>
                <div className="nh-modal-left-tagline">
                  {mode === "login" ? (
                    <>
                      <em>Reconnect</em> with
                      <br />
                      Ancient Wellness.
                    </>
                  ) : (
                    <>
                      Begin Your
                      <br />
                      <em>Wellness</em> Journey.
                    </>
                  )}
                </div>
              </div>
              <div className="nh-modal-left-content">
                <div className="nh-modal-left-title">
                  Pure · Natural · Ayurvedic
                </div>
                <div className="nh-modal-left-sub">
                  {mode === "login"
                    ? "Access your orders, track shipments, and unlock member-only Ayurvedic offers."
                    : "Join Vedraha for faster checkout, exclusive formulations, and personalised care."}
                </div>
              </div>
            </div>

            <div className="nh-modal-right">
              <button
                className="nh-modal-close"
                onClick={() => setModalOpen(false)}
                aria-label="Close"
              >
                <X size={12} />
              </button>

              {submitted ? (
                <div className="nh-success-wrap">
                  <div className="nh-success-icon">
                    <CheckCircle
                      size={26}
                      color="var(--new-primary-color, #35105f)"
                      strokeWidth={1.8}
                    />
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
                  <div className="nh-modal-right-logo">
                    <img src={logo} alt="Nabhi Amrit" />
                    <span className="nh-modal-right-logo-name">Vedraha</span>
                  </div>

                  <div className="nh-modal-right-title">
                    {mode === "login"
                      ? "Log in to your account"
                      : "Create your account"}
                  </div>
                  <div className="nh-modal-right-sub">
                    {mode === "login"
                      ? "Welcome back. Fill in your details to get back in."
                      : "Join us. It takes less than a minute."}
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

                  <div className="nh-google-btn-wrap">
                    {(!googleReady || !googleClientId) && (
                      <div className="nh-google-btn-placeholder">
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
                        <span>
                          {!googleClientId
                            ? "Google sign-in not configured"
                            : "Loading Google…"}
                        </span>
                      </div>
                    )}
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

                  <div className="nh-divider">
                    <span>or</span>
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
                          mode === "signup" ? "Min. 6 characters" : "Password"
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

                  {error && <div className="nh-error">{error}</div>}

                  <button
                    className="nh-submit-btn"
                    onClick={mode === "login" ? handleLogin : handleSignup}
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <span className="nh-spinner" /> Please wait
                      </>
                    ) : (
                      <>{mode === "login" ? "Log In" : "Create Account"}</>
                    )}
                  </button>

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

                  <div className="nh-terms">
                    By continuing you accept our{" "}
                    <a href="#">Privacy Policy and T&Cs.</a>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
