import React from "react";
import { GiHerbsBundle, GiMeditation, GiDroplets, GiHealing } from "react-icons/gi";
import { FaLeaf, FaShieldAlt, FaHandSparkles } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { TbTruckDelivery, TbRefresh } from "react-icons/tb";

// ─── Product metadata ─────────────────────────────────────────────────────────
const product = {
  id:             "nabhi-amrit",
  name:           "Nabhi Amrit",
  tagline:        "Ayurvedic Navel Oil",
  image:          "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=amriteng3.webp&version_id=null",
  subtitle:       "Ancient Ayurvedic Formula",
  h1:             "Nabhi Amrit - Navel Oil for Digestion and Detox",
  reviewSummary:  "4.62 · 189 Verified Reviews",
  paymentImage:   "/NabhiImg/allpayment.png",
  logoImage:      "/NabhiLogo/nabhiLogo.png",
  brandName:      "Home With Care · Ved Sanjeevani",
  contactEmail:   "akravipvtltd@gmail.com",
  whatsappNumber: "919717143189",
  whatsappMessage:"Hi, I'm interested in Nabhi Amrit",
  fbPixelId:      "1622075442328928",
  cartStorageKey: "exclusiveCart",
  themeColor:     "#2d5a27",
};

// ─── Variants ─────────────────────────────────────────────────────────────────
const variants = [
  { id: 1, label: "Buy 1 Bottle", price: "₹499",   priceNum: 499,  mrp: 599, badge: null,           externalVariantId: 477155136897430592 },
  { id: 2, label: "Buy 2 Bottles", price: "₹699", priceNum: 699,    mrp:999,       badge: "Save ₹300",    externalVariantId: 477155162130363456 },
  { id: 3, label: "Buy 3 Bottles", price: "₹999", priceNum: 999,     mrp:1499,      badge: "Save ₹500",   externalVariantId: 477155176089007168 },
];

// ─── Gallery images ───────────────────────────────────────────────────────────
const images = [
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=3e_V1.jpg&version_id=null",
  { type: "video", src: "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=nabhi.mp4&version_id=null", poster: "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=Screenshot%202026-04-30%20at%205.44.14%E2%80%AFPM-optimized.webp&version_id=null" },
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=1q_V1.jpg&version_id=null",
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=2d_V1.jpg&version_id=null",
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=amriteng2.webp&version_id=null",
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=amriteng4.webp&version_id=null",
  // "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=amriteng1.webp&version_id=null",
];

// ─── UPI icons ────────────────────────────────────────────────────────────────
const upiIcons = [
  { src: "https://img.icons8.com/?size=100&id=am4ltuIYDpQ5&format=png&color=000000", alt: "GPay",    zIndex: 10 },
  { src: "https://img.icons8.com/?size=100&id=OYtBxIlJwMGA&format=png&color=000000", alt: "PhonePe", zIndex: 20 },
  { src: "https://img.icons8.com/?size=100&id=68067&format=png&color=000000",        alt: "Paytm",   zIndex: 30 },
];

const reviewPhotos = [
  "/NabhiReviewImg/photo1.webp",
  "/NabhiReviewImg/photo2.webp",
  "/NabhiReviewImg/photo3.webp",
  "/NabhiReviewImg/photo4.webp",
  "/NabhiReviewImg/photo5.webp",
];

// ─── Marquee ──────────────────────────────────────────────────────────────────
const marqueeItems = [
  { text: "Free Shipping" },
  { text: "10,000+ Happy Customers" },
  { text: "Cash on Delivery (COD)" },
  { text: "100% Ayurvedic" },
  { text: "Quality Checked on Every Order" },
];

// ─── Trust tags ───────────────────────────────────────────────────────────────
const trustTags = [
  { icon: <TbTruckDelivery size={15} />, label: "Free Shipping" },
  { icon: <FaShieldAlt size={13} />,     label: "COD Available" },
  { icon: <TbRefresh size={15} />,       label: "Easy Returns" },
  { icon: <FaLeaf size={13} />,          label: "100% Natural" },
];

// ─── Accordion (FAQ) ──────────────────────────────────────────────────────────
const accordionData = [
  {
    title: "Why Nabhi Amrit?",
    content:
      "Rooted in ancient Ayurvedic navel therapy, this is a specially formulated herbal oil.\n\nEnriched with powerful herbs like Ajwain, Asafoetida, Ginger, Tulsi, and Malkangni.\n\nResult: A lighter body, clearer skin, and balanced overall wellness.",
  },
  {
    title: "How to Use",
    content:
      "Apply 2-3 drops to the navel before sleeping at night.\n\nMassage in a clockwise circular motion.\n\nClean the navel in the morning after waking up.",
  },
  {
    title: "Important Precautions",
    content:
      "Do a 20-minute patch test before use.\n\nConsult a doctor if irritation occurs.\n\nDo not use during pregnancy or breastfeeding.",
  },
];

// ─── How to Use carousel ──────────────────────────────────────────────────────
const howToUseImages = [
  { url: "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=step1.webp&version_id=null" },
  { url: "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=step2.webp&version_id=null" },
  { url: "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=step3.webp&version_id=null" },
  { url: "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=step4.webp&version_id=null" },
];

// ─── Benefits / ingredient carousel ──────────────────────────────────────────
const benefitsCarouselImages = [
  { url: "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=hing.webp&version_id=null" },
  { url: "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=adrak.webp&version_id=null" },
  { url: "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=triphala.webp&version_id=null" },
  { url: "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=ajwain.webp&version_id=null" },
];

// ─── Below-fold section data ──────────────────────────────────────────────────
const bloatSection = {
  title:    "Bloat-Free Belly",
  body1:    "Helps reduce uncomfortable bloating by supporting the body's natural digestive balance.",
  body2:    "With regular use, your stomach can feel lighter, flatter, and more comfortable throughout the day.",
  videoSrc: "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=nabhi.mp4&version_id=null",
};

const balanceSection = {
  title:    "Balance Flows from the Navel",
  body1:    "In Ayurveda, the <strong>navel</strong> is considered the center of the body's inner balance and energy flow.",
  body2:    "By nourishing the navel with Nabhi Amrit, you support the body's natural harmony.",
  videoSrc: "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=amrit.mp4&version_id=null",
};

const heroBannerSection = {
  title: "The Nabhi Amrit Ritual",
  body:  "Many issues like bloating, skin breakouts, slow metabolism, and joint discomfort begin when the body's internal balance is disrupted.",
  stats: [
    { num: "10,000+", label: "Happy Customers" },
    { num: "4.62",    label: "Average Rating" },
    { num: "189",     label: "Verified Reviews" },
    { num: "100%",    label: "Ayurvedic" },
  ],
};

const ritualSection = {
  title:    "How Navel Therapy Works",
  subtitle: "Rooted in ancient Ayurvedic wisdom, the navel is the body's center connecting thousands of energy channels.",
  items: [
    { icon: <GiHerbsBundle size={22} color="#2d5a27" />, title: "Traditional Herbal Extracts",       desc: "Prepared through a slow Ayurvedic extraction process." },
    { icon: <GiMeditation  size={22} color="#2d5a27" />, title: "Manipura Chakra Balancing",         desc: "The navel is the center of the Manipura Chakra — the energy hub of the body's vitality and inner balance." },
    { icon: <GiDroplets    size={22} color="#2d5a27" />, title: "Deep Navel Absorption",             desc: "The navel area contains many nerve endings." },
    { icon: <GiHealing     size={22} color="#2d5a27" />, title: "Restores Internal Balance",         desc: "Supports natural detoxification and helps reduce bloating." },
  ],
};

const whyUsSection = {
  title:    "Why Choose Us?",
  subtitle: "Trusted by over 10,000 customers across India, crafted from nature's finest ingredients.",
  items: [
    { icon: <GiDroplets     size={28} color="#2d5a27" />, title: "Deep Navel Therapy",               desc: "Specially made for navel application, with deep absorption through the ancient Pechoti method." },
    { icon: <FaLeaf         size={26} color="#2d5a27" />, title: "100% Ayurvedic",                   desc: "Made with time-tested Ayurvedic herbs, free from chemicals and parabens." },
    { icon: <HiSparkles     size={26} color="#2d5a27" />, title: "Holistic Wellness",                desc: "Supports digestion, joints, hormonal balance, and overall vitality." },
    { icon: <FaHandSparkles size={26} color="#2d5a27" />, title: "Simple & Safe Routine",            desc: "Just 2-3 drops at bedtime — no massage, no hassle." },
  ],
};

const greenMarqueeItems = [
  { icon: <GiDroplets     size={13} />, text: "Gut Cleanse" },
  { icon: <GiMeditation   size={13} />, text: "Lighter Stomach" },
  { icon: <HiSparkles     size={13} />, text: "Clear Skin" },
  { icon: <FaHandSparkles size={13} />, text: "Balanced Wellness" },
];

// ─── Reviews ──────────────────────────────────────────────────────────────────
const reviews = {
  items: [
    { id: 1, name: "Menal Shah",       rating: 5, body: "Very easy to use. Noticed a difference within a week.",                                    date: "02/07/2026", image: "/NabhiReviewImg/abhi.jpg", likes: 3 },
    { id: 2, name: "Harish Iyer",      rating: 5, body: "Its fragrance is very mild and soothing.",                                                  date: "01/19/2026", image: null,                     likes: 2 },
    { id: 3, name: "Ayesha Noor",      rating: 4, body: "A good addition to my wellness routine. Skin feels softer.",                                date: "03/02/2026", image: null,                     likes: 4 },
    { id: 8, name: "Vaishnavi Joshi",  rating: 5, body: "Skin started feeling clearer in 10-12 days and energy is better too.",                      date: "04/10/2026", image: "",                       likes: 4 },
    { id: 4, name: "Nitin Bansal",     rating: 5, body: "A great traditional Ayurvedic remedy that works well for digestion.",                       date: "12/28/2025", image: null,                     likes: 1 },
    { id: 5, name: "Imran Khan",       rating: 5, body: "It has become part of my daily routine, skin feels soft.",                                  date: "02/14/2026", image: null,                     likes: 5 },
    { id: 7, name: "Samar Das",        rating: 4, body: "Very simple routine, just apply 2 drops.",                                                  date: "04/01/2026", image: "/NabhiReviewImg/b1.jpg",  likes: 1 },
    { id: 6, name: "Priya Sharma",     rating: 5, body: "Body truly feels much lighter and skin is looking a bit clearer too.",                      date: "03/21/2026", image: "/NabhiReviewImg/g2.jpg",  likes: 2 },
    { id: 9, name: "Suhani Banerjee",  rating: 5, body: "I apply it on the navel morning and evening; it has become an easy part of my routine.",    date: "04/15/2026", image: "/NabhiReviewImg/g1.jpg",  likes: 1 },
  ],
  photos: [
    "/NabhiReviewImg/photo1.webp",
    "/NabhiReviewImg/photo2.webp",
    "/NabhiReviewImg/photo3.webp",
    "/NabhiReviewImg/photo4.webp",
    "/NabhiReviewImg/photo5.webp",
  ],
  photoReviewers: [
    { name: "Menal Shah",      initials: "MS", rating: 5, body: "Very nice packaging",                                                               likes: 4, date: "02/07/2026" },
    { name: "Priya Sharma",    initials: "PS", rating: 5, body: "Very good and effective",                                                           likes: 2, date: "03/21/2026" },
    { name: "Vaishnavi Joshi", initials: "VJ", rating: 5, body: "Skin started feeling clearer in 10-12 days and energy is better too.",              likes: 4, date: "04/10/2026" },
    { name: "Suhani Banerjee", initials: "SB", rating: 5, body: "Clear skin in 10 days, energy improved",                                           likes: 1, date: "04/15/2026" },
    { name: "Samar Das",       initials: "SD", rating: 4, body: "Very simple routine, just apply 2 drops.",                                          likes: 1, date: "04/01/2026" },
  ],
};

// ─── Final config export ──────────────────────────────────────────────────────
export const nabhiAmritEngConfig = {
  product,
  variants,
  images,
  upiIcons,
  marqueeItems,
  trustTags,
  accordionData,
  howToUseImages,
  benefitsCarouselImages,
  bloatSection,
  balanceSection,
  heroBannerSection,
  ritualSection,
  whyUsSection,
  greenMarqueeItems,
  reviews,
  reviewPhotos,
};