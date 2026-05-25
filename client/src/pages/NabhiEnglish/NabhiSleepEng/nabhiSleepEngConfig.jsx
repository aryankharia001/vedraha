import React from "react";
import { GiNightSleep, GiMeditation, GiHerbsBundle, GiHealing } from "react-icons/gi";
import { FaLeaf, FaShieldAlt } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { TbTruckDelivery, TbRefresh } from "react-icons/tb";

// ─── Product metadata ─────────────────────────────────────────────────────────
const product = {
  id:             "sleep-relief-nabhi-oil",
  name:           "Sleep Relief Nabhi Oil",
  tagline:        "For Deep & Restful Sleep",
  image:          "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=sleep1.webp&version_id=null",
  subtitle:       "Reduces Stress & Improves Sleep Quality",
  h1:             "Sleep Relief Nabhi Oil – Reduce Stress & Enjoy Deep Sleep",
  reviewSummary:  "4.73 · 742 Verified Reviews",
  paymentImage:   null,
  logoImage:      "/NabhiLogo/nabhiLogo.png",
  brandName:      "Home With Care · Ved Sanjeevani",
  contactEmail:   "akravipvtltd@gmail.com",
  whatsappNumber: "919717143189",
  whatsappMessage:"Hi, I'm interested in Sleep Relief Oil",
  fbPixelId:      "1622075442328928",
  cartStorageKey: "exclusiveCart",
  themeColor:     "#2e5b33",
};

// ─── Variants ─────────────────────────────────────────────────────────────────
const variants = [
  { id: 1, label: "Buy 1 Bottle",                   price: "₹599",  priceNum: 599,  badge: null,          externalVariantId: 477155614444106816 },
  { id: 2, label: "Buy 2 Bottles – ₹150 Off",       price: "₹1,049", priceNum: 1049, badge: "Save ₹150",  externalVariantId: 477155630281798720 },
];

// ─── Gallery images ───────────────────────────────────────────────────────────
const images = [
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=sleep1.webp&version_id=null",
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=sleep2.webp&version_id=null",
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=sleep3.webp&version_id=null",
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=sleep4.webp&version_id=null",
];

// ─── UPI icons ────────────────────────────────────────────────────────────────
const upiIcons = [
  { src: "https://img.icons8.com/?size=100&id=am4ltuIYDpQ5&format=png&color=000000", alt: "GPay",    zIndex: 10 },
  { src: "https://img.icons8.com/?size=100&id=OYtBxIlJwMGA&format=png&color=000000", alt: "PhonePe", zIndex: 20 },
  { src: "https://img.icons8.com/?size=100&id=68067&format=png&color=000000",        alt: "Paytm",   zIndex: 30 },
];

// ─── Marquee ──────────────────────────────────────────────────────────────────
const marqueeItems = [
  { text: "Free Shipping" },
  { text: "15,000+ Happy Customers" },
  { text: "Cash on Delivery (COD)" },
  { text: "Stress Relief" },
  { text: "Deep Sleep" },
];

// ─── Trust tags ───────────────────────────────────────────────────────────────
const trustTags = [
  { icon: <TbTruckDelivery size={15} />, label: "Free Shipping" },
  { icon: <FaShieldAlt size={13} />,     label: "COD Available" },
  { icon: <TbRefresh size={15} />,       label: "Easy Returns" },
  { icon: <FaLeaf size={13} />,          label: "100% Natural" },
];

const reviewPhotos = [
  
];

// ─── Accordion ────────────────────────────────────────────────────────────────
const accordionData = [
  {
    title: "Why Choose This Oil",
    content:
      "This special navel oil is crafted for mental calm and deep, restful sleep.\n\nKey Benefits:\n• Helps you fall asleep faster\n• Reduces stress and anxiety\n• Calms and quiets the mind\n• Improves overall sleep quality",
  },
  {
    title: "How to Use",
    content:
      "Apply 2–3 drops into the navel before sleeping at night and massage gently.\n\nUse daily for best results.",
  },
  {
    title: "Important Notice",
    content:
      "For external use only.\n\nKeep away from eyes.\n\nThis is not a medicine.",
  },
];

// ─── Sections ─────────────────────────────────────────────────────────────────
const bloatSection = {
  title:    "Relief from Stress & Insomnia",
  body1:    "Lack of sleep and stress have become increasingly common in modern life.",
  body2:    "This navel oil calms both body and mind, helping you sleep better every night.",
  imageSrc: images[1],
};

const balanceSection = {
  title:    "Experience Natural Calm",
  body1:    "According to Ayurveda, the navel is a vital energy center of the body.",
  body2:    "This oil works through the navel to bring deep relaxation to your entire system.",
  imageSrc: images[0],
};

const heroBannerSection = {
  title: "The Deep Sleep Ritual",
  body:  "Experience peaceful and restful sleep every single night.",
  stats: [
    { num: "15,000+", label: "Happy Customers" },
    { num: "4.73",    label: "Average Rating" },
    { num: "742",     label: "Reviews" },
    { num: "100%",    label: "Natural" },
  ],
};

const ritualSection = {
  title:    "How It Works",
  subtitle: "Enriched with Ayurvedic herbs",
  items: [
    { icon: <GiHerbsBundle size={22} color="#2c3e50" />, title: "Herbal Ingredients",  desc: "Made from pure natural elements" },
    { icon: <GiMeditation  size={22} color="#2c3e50" />, title: "Mental Calm",         desc: "Quiets and soothes the mind" },
    { icon: <GiNightSleep  size={22} color="#2c3e50" />, title: "Deep Sleep",          desc: "Helps you achieve deeper sleep" },
    { icon: <GiHealing     size={22} color="#2c3e50" />, title: "Rest & Recovery",     desc: "Reduces stress and fatigue" },
  ],
};

const whyUsSection = {
  title:    "Why Choose Our Sleep Oil?",
  subtitle: "Natural and safe for everyday use",
  items: [
    { icon: <FaLeaf     size={26} color="#2c3e50" />, title: "100% Natural",      desc: "No chemicals, no artificial additives" },
    { icon: <HiSparkles size={26} color="#2c3e50" />, title: "Better Sleep",      desc: "Improves sleep quality noticeably" },
    { icon: <FaLeaf     size={26} color="#2c3e50" />, title: "Easy to Use",       desc: "Simply apply at night before bed" },
  ],
};

// ─── Reviews ──────────────────────────────────────────────────────────────────
const reviews = {
  items: [
    { id: 1, name: "Rahul Sharma", rating: 5, body: "My sleep has improved so much. Fall asleep faster and wake up refreshed.", date: "03/10/2026" },
    { id: 2, name: "Neha Verma",   rating: 5, body: "Stress has reduced noticeably and I feel much more rested in the morning.", date: "02/25/2026" },
  ],
};

// ─── Final export ─────────────────────────────────────────────────────────────
export const nabhiSleepEngConfig = {
  product,
  variants,
  images,
  upiIcons,
  marqueeItems,
  trustTags,
  accordionData,
  howToUseImages:         images,
  benefitsCarouselImages: images,
  bloatSection,
  balanceSection,
  heroBannerSection,
  ritualSection,
  whyUsSection,
  reviews,
  reviewPhotos
};