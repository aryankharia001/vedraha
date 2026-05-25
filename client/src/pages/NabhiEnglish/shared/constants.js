// ─── Product ────────────────────────────────────────────────────────────────
export const PRODUCT = {
  id: "nabhi-amrit",
  name: "Nabhi Amrit",
  tagline: "Ayurvedic Navel Oil",
  image:
    "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=ChatGPT%20Image%20Apr%2017%2C%202026%2C%2003_39_36%20PM%201.png&version_id=null",
};

export const CART_STORAGE_KEY = "exclusiveCart";

// ─── Variants ────────────────────────────────────────────────────────────────
export const variants = [
  { id: 1, label: "Buy 1 Bottle", price: "₹899", priceNum: 899, mrp: 999, badge: null, externalVariantId: 477155136897430592 },
  { id: 2, label: "Buy 2 Bottles", price: "₹1,499", priceNum: 1499, badge: "Save ₹500", externalVariantId: 477155162130363456 },
  { id: 3, label: "Buy 3 Bottles", price: "₹1,999", priceNum: 1999, badge: "Save ₹1000", externalVariantId: 477155176089007168 },
];

// ─── Reviews ─────────────────────────────────────────────────────────────────
export const allReviews = [
  { id: 1, name: "Menal Shah", rating: 5, body: "Very easy to use and massage. Noticed a difference within a week.", date: "02/07/2026", image: "/NabhiReviewImg/abhi.jpg", likes: 3 },
  { id: 2, name: "Harish Iyer", rating: 5, body: "Its fragrance is very mild and soothing, not too strong at all.", date: "01/19/2026", image: null, likes: 2 },
  { id: 3, name: "Ayesha Noor", rating: 4, body: "A great addition to my wellness routine. Skin feels much softer.", date: "03/02/2026", image: null, likes: 4 },
  { id: 8, name: "Vaishnavi Joshi", rating: 5, body: "Didn't expect much at first, but skin started feeling clearer in 10-12 days and energy is better too.", date: "04/10/2026", image: "", likes: 4 },
  { id: 4, name: "Nitin Bansal", rating: 5, body: "A great traditional Ayurvedic remedy that works really well for digestion.", date: "12/28/2025", image: null, likes: 1 },
  { id: 5, name: "Imran Khan", rating: 5, body: "It has become part of my daily routine, skin feels soft and there's a slight glow too.", date: "02/14/2026", image: null, likes: 5 },
  { id: 7, name: "Samar Das", rating: 4, body: "Very simple routine, just apply 2 drops and I've started noticing a gradual difference.", date: "04/01/2026", image: "/NabhiReviewImg/b1.jpg", likes: 1 },
  { id: 6, name: "Priya Sharma", rating: 5, body: "I've been using Nabhi Amrit oil for the past 2 weeks. Body truly feels much lighter and skin is looking a bit clearer too.", date: "03/21/2026", image: "/NabhiReviewImg/g2.jpg", likes: 2 },
  { id: 9, name: "Suhani Banerjee", rating: 5, body: "I apply it on the navel morning and evening; it has become an easy part of my routine.", date: "04/15/2026", image: "/NabhiReviewImg/g1.jpg", likes: 1 },
];

export const reviewPhotos = [
  "/NabhiReviewImg/photo1.webp",
  "/NabhiReviewImg/photo2.webp",
  "/NabhiReviewImg/photo3.webp",
  "/NabhiReviewImg/photo4.webp",
  "/NabhiReviewImg/photo5.webp",
];

export const photoReviewers = [
  { name: "Menal Shah", initials: "MS", rating: 5, body: "Very nice packaging", likes: 4, date: "02/07/2026" },
  { name: "Priya Sharma", initials: "PS", rating: 5, body: "Very good and effective", likes: 2, date: "03/21/2026" },
  { name: "Vaishnavi Joshi", initials: "VJ", rating: 5, body: "Didn't expect much at first, but skin started feeling clearer in 10-12 days and energy is better too.", likes: 4, date: "04/10/2026" },
  { name: "Suhani Banerjee", initials: "SB", rating: 5, body: "Clear skin in 10 days, energy improved.", likes: 1, date: "04/15/2026" },
  { name: "Samar Das", initials: "SD", rating: 4, body: "Very simple routine, just apply 2 drops and the difference starts showing gradually.", likes: 1, date: "04/01/2026" },
];

// ─── Static content ───────────────────────────────────────────────────────────
export const accordionData = [
  {
    title: "Why Nabhi Amrit?",
    content:
      "Rooted in ancient Ayurvedic navel therapy, Nabhi Amrit is a specially formulated herbal oil designed to nourish the body through the navel center.\n\nEnriched with powerful herbs like Ajwain, Asafoetida, Ginger, Tulsi, and Malkangni, it supports natural detoxification.\n\nResult: A lighter body, clearer skin, and balanced overall wellness.",
  },
  {
    title: "How to Use",
    content:
      "Apply 2-3 drops of Nabhi Amrit oil to your navel before sleeping at night.\n\nFor better results, massage in a clockwise circular motion and allow it to absorb.\n\nClean your navel in the morning after waking up.",
  },
  {
    title: "Important Precautions",
    content:
      "Do a 20-minute patch test before use.\n\nConsult your doctor if any irritation occurs.\n\nDo not use during pregnancy or breastfeeding.",
  },
];

export const trustTags = [
  { label: "Free Shipping" },
  { label: "COD Available" },
  { label: "Easy Returns" },
  { label: "100% Natural" },
];

export const marqueeItems = [
  { text: "Free Shipping" },
  { text: "10,000+ Happy Customers" },
  { text: "Cash on Delivery (COD)" },
  { text: "100% Ayurvedic" },
  { text: "Quality Checked on Every Order" },
];

export const CarousalItems = [
  { url: "/NabhiImg/step1.png" },
  { url: "/NabhiImg/step2.png" },
  { url: "/NabhiImg/step3.png" },
  { url: "/NabhiImg/step4.png" },
];

export const CarousalItems2 = [
  { url: "https://nabhitelam.com/cdn/shop/files/14.webp?v=1773385971&width=1600" },
  { url: "https://nabhitelam.com/cdn/shop/files/13.webp?v=1773386002&width=1600" },
  { url: "https://nabhitelam.com/cdn/shop/files/12.webp?v=1773386017&width=1600" },
  { url: "https://nabhitelam.com/cdn/shop/files/15.webp?v=1773386044&width=1600" },
  { url: "https://nabhitelam.com/cdn/shop/files/16.webp?v=1773386068&width=1600" },
];

export const CarousalItems3 = [
  { url: "/NabhiImg/hing.png" },
  { url: "/NabhiImg/adrak.png" },
  { url: "/NabhiImg/ajwain.png" },
  { url: "/NabhiImg/trifla.png" },
];

export const images = [
  "/NabhiImg/amrit1.png",
  { type: "video", src: "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=nabhi.mp4&version_id=null", poster: "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=Screenshot%202026-04-30%20at%205.44.14%E2%80%AFPM-optimized.webp&version_id=null" },
  "/NabhiImg/amrit3.png",
  "/NabhiImg/amrit4.png",
  "/NabhiImg/amrit5.png",
];

export const upiIcons = [
  { src: "https://img.icons8.com/?size=100&id=am4ltuIYDpQ5&format=png&color=000000", alt: "GPay", zIndex: 10 },
  { src: "https://img.icons8.com/?size=100&id=OYtBxIlJwMGA&format=png&color=000000", alt: "PhonePe", zIndex: 20 },
  { src: "https://img.icons8.com/?size=100&id=68067&format=png&color=000000", alt: "Paytm", zIndex: 30 },
];

export const generateOrderId = () => {
  const timePart = Date.now() % 10000;
  const randPart = Math.floor(Math.random() * 90) + 10;
  return String(timePart * 100 + randPart).padStart(6, "0");
};

export const loadCartFromStorage = () => {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveCartToStorage = (items) => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch {}
};