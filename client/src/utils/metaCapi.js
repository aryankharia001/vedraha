// ─── utils/metaCapi.js ────────────────────────────────────────────────────────

const PIXEL_ID     = "2025318038197449";
const ACCESS_TOKEN = "EAARpWmAjBnEBRbhJOO8gMO7OJGJKIvXHFMAmqZA0OWbz0K5mo2qhlBkAx5Y2ubnUyOAHPQhD2N7dETfj2bIYRsWoeEFqwRZB8FUeHx1pyXbqRXhK1jCAZCT53Ic1vaiFtbFZBKqwo4ODYPnU6Qds8H9A4we5pWDEoFUbEqeW7KINXZA1Kvcxe7TuwEzmciwZDZD";
const TEST_CODE    = "TEST96014";

// ─── fbp ─────────────────────────────────────────────────────────────────────
const getFbp = () => {
  const COOKIE_NAME = "_fbp";
  const match = document.cookie.match(new RegExp("(^| )" + COOKIE_NAME + "=([^;]+)"));
  if (match) {
    const val = match[2];
    if (/^fb\.\d+\.\d+\.\d+$/.test(val)) return val;
  }
  const fbp = `fb.1.${Date.now()}.${Math.floor(Math.random() * 1e10)}`;
  const expires = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${COOKIE_NAME}=${fbp}; expires=${expires}; path=/; SameSite=Lax`;
  return fbp;
};

// ─── fbc ─────────────────────────────────────────────────────────────────────
const getFbc = () => {
  const COOKIE_NAME = "_fbc";
  const expires = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toUTCString();

  const fbclid = new URLSearchParams(window.location.search).get("fbclid");
  if (fbclid) {
    const fbc = `fb.1.${Date.now()}.${fbclid}`;
    document.cookie = `${COOKIE_NAME}=${fbc}; expires=${expires}; path=/; SameSite=Lax`;
    return fbc;
  }

  const match = document.cookie.match(new RegExp("(^| )" + COOKIE_NAME + "=([^;]+)"));
  if (match) {
    const val = match[2];
    if (/^fb\.\d+\.\d+\..+$/.test(val)) return val;
  }

  return null;
};

// ─── Deduplicate by fbclid ───────────────────────────────────────────────────
// Stores { fbclid, eventId } in sessionStorage per event+product.
// Same fbclid on refresh → returns fired: true with the original eventId.
// New fbclid (new ad click) → fires fresh.
// No fbclid (organic) → stored as "organic", fires once per session.
const checkDedup = (eventName, dedupeKey) => {
  const currentFbclid =
    new URLSearchParams(window.location.search).get("fbclid") ?? "organic";
  const storageKey = `meta_fired_${eventName}_${dedupeKey}`;
  const stored = sessionStorage.getItem(storageKey);

  if (stored) {
    const parsed = JSON.parse(stored);
    if (parsed.fbclid === currentFbclid) {
      return { fired: true, eventId: parsed.eventId };
    }
  }

  // New fbclid or first visit — generate stable eventId and persist
  const eventId = `${eventName}_${dedupeKey}_${Date.now()}_${Math.random()
    .toString(36)
    .slice(2, 9)}`;
  sessionStorage.setItem(storageKey, JSON.stringify({ fbclid: currentFbclid, eventId }));
  return { fired: false, eventId };
};

// ─── Core sender ─────────────────────────────────────────────────────────────
const sendMetaEvent = async (eventName, customData = {}, dedupeKey = null) => {
  let eventId;

  if (dedupeKey) {
    const { fired, eventId: storedEventId } = checkDedup(eventName, dedupeKey);
    if (fired) return;
    eventId = storedEventId;
  } else {
    // No dedup (AddToCart, InitiateCheckout) — always fire with fresh eventId
    eventId = `${eventName}_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
  }

  const fbp = getFbp();
  const fbc = getFbc();

  const payload = {
    data: [
      {
        event_name:       eventName,
        event_id:         eventId,
        event_time:       Math.floor(Date.now() / 1000),
        event_source_url: window.location.href,
        action_source:    "website",
        user_data: {
          fbp,
          ...(fbc && { fbc }),
          client_user_agent: navigator.userAgent,
        },
        custom_data: customData,
      },
    ],
    test_event_code: TEST_CODE,
  };

  try {
    const res = await fetch(
      `https://graph.facebook.com/v19.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
      {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(payload),
      }
    );
    const json = await res.json();
    if (!res.ok) console.error("Meta CAPI rejected:", json);
  } catch (err) {
    console.error("Meta CAPI network error:", err);
  }
};

// ─── Named event helpers ──────────────────────────────────────────────────────

// Deduped per fbclid per product per session
export const trackViewContent = (productId, productName, price) =>
  sendMetaEvent(
    "ViewContent",
    {
      content_ids:  [String(productId)],
      content_name: productName,
      content_type: "product",
      currency:     "INR",
      value:        price,
    },
    String(productId)
  );

// Always fires — every add to cart is a real action
export const trackAddToCart = (productId, productName, price, quantity) =>
  sendMetaEvent("AddToCart", {
    content_ids:  [String(productId)],
    content_name: productName,
    content_type: "product",
    currency:     "INR",
    value:        price * quantity,
    num_items:    quantity,
  });

// Always fires — every checkout attempt is a real action
export const trackInitiateCheckout = (totalValue, numItems) =>
  sendMetaEvent("InitiateCheckout", {
    currency:  "INR",
    value:     totalValue,
    num_items: numItems,
  });


  export const trackPageView = () =>
  sendMetaEvent("PageView", {}, "pageview");