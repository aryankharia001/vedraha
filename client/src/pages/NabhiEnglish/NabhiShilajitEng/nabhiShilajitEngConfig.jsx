import React from "react";
import { GiHerbsBundle, GiMeditation, GiDroplets, GiHealing } from "react-icons/gi";
import { FaLeaf, FaShieldAlt } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { TbTruckDelivery, TbRefresh } from "react-icons/tb";

// ─── Product metadata ─────────────────────────────────────────────────────────
const product = {
  id:             "shilajit-energy-resin",
  name:           "Shilajit Energy Resin",
  tagline:        "Natural Energy & Stamina Booster",
  image:          "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=shilajitcare3.webp&version_id=null",
  subtitle:       "Pure Shilajit Sourced from the Himalayas",
  h1:             "Pure Shilajit Resin – For Strength, Stamina & Energy",
  reviewSummary:  "4.71 · 589 Verified Reviews",
  paymentImage:   null,
  logoImage:      "/NabhiLogo/nabhiLogo.png",
  brandName:      "Home With Care · Ved Sanjeevani",
  contactEmail:   "akravipvtltd@gmail.com",
  whatsappNumber: "919717143189",
  whatsappMessage:"Hi, I'm interested in Shilajit Resin",
  fbPixelId:      "1622075442328928",
  cartStorageKey: "exclusiveCart",
  themeColor:     "#3b2f2f",
};

// ─── Variants ─────────────────────────────────────────────────────────────────
const variants = [
  { id: 1, label: "Buy 1 Jar",                   price: "₹669",  priceNum: 669,  badge: null,          externalVariantId: 477247394800564160 },
  { id: 2, label: "Buy 2 Jars – ₹300 Off",       price: "₹1,099", priceNum: 1099, badge: "Save ₹300",  externalVariantId: 477247412248868800 },
];

// ─── Gallery images ───────────────────────────────────────────────────────────
const images = [
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=shilajitcare3.webp&version_id=null",
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=shilajitcare1.webp&version_id=null",
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=shilajitcare2.webp&version_id=null",
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=shilajitcare4.webp&version_id=null",
];

// ─── UPI icons ────────────────────────────────────────────────────────────────
const upiIcons = [
  { src: "https://img.icons8.com/?size=100&id=am4ltuIYDpQ5&format=png&color=000000", alt: "GPay",    zIndex: 10 },
  { src: "https://img.icons8.com/?size=100&id=OYtBxIlJwMGA&format=png&color=000000", alt: "PhonePe", zIndex: 20 },
  { src: "https://img.icons8.com/?size=100&id=68067&format=png&color=000000",        alt: "Paytm",   zIndex: 30 },
];


const reviewPhotos = [
  
];

// ─── Marquee ──────────────────────────────────────────────────────────────────
const marqueeItems = [
  { text: "Free Shipping" },
  { text: "20,000+ Happy Customers" },
  { text: "Cash on Delivery (COD)" },
  { text: "100% Pure Shilajit" },
  { text: "Sourced from the Himalayas" },
];

// ─── Trust tags ───────────────────────────────────────────────────────────────
const trustTags = [
  { icon: <TbTruckDelivery size={15} />, label: "Free Shipping" },
  { icon: <FaShieldAlt size={13} />,     label: "COD Available" },
  { icon: <TbRefresh size={15} />,       label: "Easy Returns" },
  { icon: <FaLeaf size={13} />,          label: "100% Natural" },
];

// ─── Accordion ────────────────────────────────────────────────────────────────
const accordionData = [
  {
    title: "Why Choose Shilajit",
    content:
      "Shilajit is an ancient Ayurvedic rasayana that strengthens the body from within.\n\nKey Benefits:\n• Boosts energy and stamina\n• Strengthens immunity\n• Combats weakness and fatigue\n• Supports male vitality",
  },
  {
    title: "How to Use",
    content:
      "Mix a pea-sized amount into warm milk or water.\n\nConsume 1–2 times per day.",
  },
  {
    title: "Important Notice",
    content:
      "Do not consume in excess.\n\nPregnant women should consult a doctor before use.\n\nThis is not a medicine.",
  },
];

// ─── How to Use ───────────────────────────────────────────────────────────────
const howToUseImages = images;

// ─── Benefits carousel ────────────────────────────────────────────────────────
const benefitsCarouselImages = images;

// ─── Feature Section ──────────────────────────────────────────────────────────
const bloatSection = {
  title:    "Your Natural Source of Energy",
  body1:    "Fatigue, weakness, and low stamina are increasingly common in today's fast-paced life.",
  body2:    "Shilajit strengthens the body from within and provides sustained natural energy.",
  imageSrc: images[1],
};

// ─── Balance Section ──────────────────────────────────────────────────────────
const balanceSection = {
  title:    "The Power of the Himalayas",
  body1:    "Shilajit is a natural substance that seeps from Himalayan rocks over centuries.",
  body2:    "It helps revitalise the body, restore vitality, and support long-term wellness.",
  imageSrc: images[0],
};

// ─── Hero Banner ──────────────────────────────────────────────────────────────
const heroBannerSection = {
  title: "The Shilajit Energy Ritual",
  body:  "Boost your energy and stamina the natural Ayurvedic way — pure, potent, and time-tested.",
  stats: [
    { num: "20,000+", label: "Happy Customers" },
    { num: "4.71",    label: "Average Rating" },
    { num: "589",     label: "Reviews" },
    { num: "100%",    label: "Pure" },
  ],
};

// ─── Ritual Section ───────────────────────────────────────────────────────────
const ritualSection = {
  title:    "How Shilajit Works",
  subtitle: "Rich in natural minerals and fulvic acid",
  items: [
    { icon: <GiHerbsBundle size={22} color="#3b2f2f" />, title: "Rich in Minerals",       desc: "Contains 85+ essential trace minerals" },
    { icon: <GiMeditation  size={22} color="#3b2f2f" />, title: "Boosts Energy",           desc: "Increases stamina and strength naturally" },
    { icon: <GiDroplets    size={22} color="#3b2f2f" />, title: "Fast Absorption",         desc: "Rapidly absorbed and utilised by the body" },
    { icon: <GiHealing     size={22} color="#3b2f2f" />, title: "Recovery Support",        desc: "Reduces fatigue and combats weakness" },
  ],
};

// ─── Why Us ───────────────────────────────────────────────────────────────────
const whyUsSection = {
  title:    "Why Choose Our Shilajit?",
  subtitle: "Pure and certified quality you can trust",
  items: [
    { icon: <FaLeaf     size={26} color="#3b2f2f" />, title: "100% Pure",            desc: "No adulterants, no fillers" },
    { icon: <HiSparkles size={26} color="#3b2f2f" />, title: "Energy Booster",       desc: "Sustains energy levels throughout the day" },
    { icon: <FaLeaf     size={26} color="#3b2f2f" />, title: "Easy to Use",          desc: "Simply mix with milk or water" },
  ],
};

// ─── Reviews ──────────────────────────────────────────────────────────────────
const reviews = {
  items: [
    { id: 1, name: "Amit Singh",   rating: 5, body: "My energy levels have shot up. Feel much more active throughout the day.", date: "02/20/2026" },
    { id: 2, name: "Vikas Yadav",  rating: 5, body: "Stamina has improved noticeably. Great product, highly recommended.", date: "01/30/2026" },
  ],
};

// ─── Final export ─────────────────────────────────────────────────────────────
export const nabhiShilajitEngConfig = {
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
  reviews,
  reviewPhotos
};