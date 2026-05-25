import React from "react";
import { GiHerbsBundle, GiMeditation, GiDroplets, GiHealing } from "react-icons/gi";
import { FaLeaf, FaShieldAlt } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { TbTruckDelivery, TbRefresh } from "react-icons/tb";

// ─── Product metadata ─────────────────────────────────────────────────────────
const product = {
  id:             "eye-care-nabhi-oil",
  name:           "Eye Care Nabhi Oil",
  tagline:        "Ancient Ayurvedic Formula",
  image:          "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=eyecare1.webp&version_id=null",
  subtitle:       "Ancient Ayurvedic Formula",
  h1:             "Eye Care Nabhi Oil – Vision Support & Eye Strain Relief",
  reviewSummary:  "4.58 · 327 Verified Reviews",
  paymentImage:   null,
  logoImage:      "/NabhiLogo/nabhiLogo.png",
  brandName:      "Home With Care · Ved Sanjeevani",
  contactEmail:   "akravipvtltd@gmail.com",
  whatsappNumber: "919717143189",
  whatsappMessage:"Hi, I'm interested in Eye Care Nabhi Oil",
  fbPixelId:      "1622075442328928",
  cartStorageKey: "exclusiveCart",
  themeColor:     "#2d5a27",
};

// ─── Variants ─────────────────────────────────────────────────────────────────
const variants = [
  { id: 1, label: "Buy 1 Bottle",                   price: "₹599",   priceNum: 599,  mrp: 799,  badge: null,          externalVariantId: 477155696316920896 },
  { id: 2, label: "Buy 2 Bottles – ₹100 Off",       price: "₹1,099", priceNum: 1099, mrp: 1598, badge: "Save ₹100",   externalVariantId: 477155708396516416 },
];

// ─── Gallery images ───────────────────────────────────────────────────────────
const images = [
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=eyecare2.webp&version_id=null",
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=eyecare1.webp&version_id=null",
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=eyecare3.webp&version_id=null",
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=eyecare1.webp&version_id=null",
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
  { text: "5,000+ Happy Customers" },
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

// ─── Accordion ────────────────────────────────────────────────────────────────
const accordionData = [
  {
    title: "Why Choose Eye Care Nabhi Oil",
    content:
      "Rooted in ancient Ayurvedic navel therapy, this oil nourishes the eyes from within.\n\nKey Benefits:\n• Maintains eye moisture\n• Reduces digital eye strain\n• Relieves redness and fatigue\n• Natural vision support",
  },
  {
    title: "How to Use",
    content:
      "Apply 2–3 drops into the navel before sleeping at night and massage gently.\n\nClean in the morning.\n\nRegular use gives the best results.",
  },
  {
    title: "Important Notice",
    content:
      "Do a patch test first.\n\nStop use if irritation occurs.\n\nThis is not a substitute for medical treatment.",
  },
];

// ─── How to Use ───────────────────────────────────────────────────────────────
const howToUseImages = images;

// ─── Benefits carousel ────────────────────────────────────────────────────────
const benefitsCarouselImages = images;

// ─── Feature Section ──────────────────────────────────────────────────────────
const bloatSection = {
  title:    "Eye Care for the Digital Age",
  body1:    "Extended screen time can cause eye strain, dryness, and irritation.",
  body2:    "Eye Care Nabhi Oil works overnight and leaves you feeling refreshed in the morning.",
  imageSrc: images[2],
};

const reviewPhotos = [
  
];
// ─── Balance Section ──────────────────────────────────────────────────────────
const balanceSection = {
  title:    "Vision Power Flows from the Navel",
  body1:    "In Ayurveda, the navel is connected to the body's sensory network.",
  body2:    "Herbs applied through the navel channel their effect all the way to the eyes.",
  imageSrc: images[0],
};

// ─── Hero Banner ──────────────────────────────────────────────────────────────
const heroBannerSection = {
  title: "The Eye Care Navel Ritual",
  body:  "Ayurvedic herbs reach the eyes through the navel, delivering deep relief from within.",
  stats: [
    { num: "5,000+", label: "Happy Customers" },
    { num: "4.58",   label: "Average Rating" },
    { num: "327",    label: "Reviews" },
    { num: "100%",   label: "Ayurvedic" },
  ],
};

// ─── Ritual Section ───────────────────────────────────────────────────────────
const ritualSection = {
  title:    "How Navel Eye Therapy Works",
  subtitle: "The navel is the body's energy center, connected to the eyes",
  items: [
    { icon: <GiHerbsBundle size={22} color="#2d5a27" />, title: "Herbal Blend",         desc: "A powerful formula made from Triphala, Rose, and Fennel" },
    { icon: <GiMeditation  size={22} color="#2d5a27" />, title: "Energy Center",         desc: "The navel is the body's primary energy hub" },
    { icon: <GiDroplets    size={22} color="#2d5a27" />, title: "Fast Absorption",       desc: "The oil is absorbed quickly into the body" },
    { icon: <GiHealing     size={22} color="#2d5a27" />, title: "Eye Relief",            desc: "Reduces fatigue and dryness" },
  ],
};

// ─── Why Us ───────────────────────────────────────────────────────────────────
const whyUsSection = {
  title:    "Why Choose Eye Care Nabhi Oil?",
  subtitle: "For natural eye care",
  items: [
    { icon: <FaLeaf     size={26} color="#2d5a27" />, title: "Ayurvedic Formula",   desc: "100% natural ingredients" },
    { icon: <HiSparkles size={26} color="#2d5a27" />, title: "Eye Strain Relief",   desc: "Reduces screen fatigue" },
    { icon: <FaLeaf     size={26} color="#2d5a27" />, title: "Nighttime Use",       desc: "Easy daily routine" },
  ],
};

// ─── Reviews ──────────────────────────────────────────────────────────────────
const reviews = {
  items: [
    { id: 1, name: "Ritu Sharma",  rating: 5, body: "My eyes feel so much more relaxed.", date: "02/10/2026" },
    { id: 2, name: "Arjun Mehta", rating: 5, body: "A very good product, highly recommend.", date: "01/22/2026" },
  ],
};

// ─── Final export ─────────────────────────────────────────────────────────────
export const nabhiEyeEngConfig = {
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