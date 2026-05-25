// utils/trackingCookies.js
// ─────────────────────────────────────────────────────────────────────────────
// Call initTrackingCookies() once on app mount (e.g. in main App.jsx).
// It reads URL params and persists them as cookies so any page can read them.
// ─────────────────────────────────────────────────────────────────────────────

const COOKIE_EXPIRY_DAYS = 7;

// Params we want to capture from the URL and persist
const TRACKED_PARAMS = [
  "fbclid",
  "click_id",   // ← affiliate/traflead click ID; also used as fbc
  "subid",      // ← affiliate sub ID
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "gclid",
];

// ─── Low-level helpers ────────────────────────────────────────────────────────

function setCookie(name, value, days = COOKIE_EXPIRY_DAYS) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires};path=/;SameSite=Lax`;
}

function getCookie(name) {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

// ─── Init — call once on app mount ───────────────────────────────────────────

export function initTrackingCookies() {
  const params = new URLSearchParams(window.location.search);

  TRACKED_PARAMS.forEach((key) => {
    const value = params.get(key);
    // Only set if present in URL — don't overwrite existing cookie with null
    if (value) {
      setCookie(key, value);

      // Build _fbc from fbclid (Meta standard)
      if (key === "fbclid") {
        const fbc = `fb.1.${Date.now()}.${value}`;
        setCookie("_fbc", fbc);
      }

      // Also build _fbc from click_id (your affiliate click ID acts as fbc)
      if (key === "click_id") {
        const fbc = `fb.1.${Date.now()}.${value}`;
        setCookie("_fbc", fbc); // same cookie — whoever is present wins
      }
    }
  });
}

// ─── Read all tracking cookies for an API call ───────────────────────────────

export function getTrackingData() {
  return {
    fbp: getCookie("_fbp"),           // set by Meta Pixel JS — read-only
    fbc: getCookie("_fbc"),           // built from fbclid or click_id
    fbclid: getCookie("fbclid"),      // raw fbclid
    click_id: getCookie("click_id"),  // raw affiliate click ID
    subid: getCookie("subid"),        // affiliate sub ID
    user_agent: navigator.userAgent,
    utm_source: getCookie("utm_source"),
    utm_medium: getCookie("utm_medium"),
    utm_campaign: getCookie("utm_campaign"),
    utm_content: getCookie("utm_content"),
    utm_term: getCookie("utm_term"),
    gclid: getCookie("gclid"),
  };
}