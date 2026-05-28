import React from "react";
import { GiHerbsBundle, GiMeditation, GiDroplets, GiHealing } from "react-icons/gi";
import { FaLeaf, FaShieldAlt } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { TbTruckDelivery, TbRefresh } from "react-icons/tb";

// ─── Product metadata ─────────────────────────────────────────────────────────
const product = {
  id:             "hair-care-nabhi-oil",
  name:           "Hair Care Nabhi Oil",
  tagline:        "Ancient Ayurvedic Formula",
  image:          "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=haircare1.webp&version_id=null",
  subtitle:       "Ancient Ayurvedic Formula",
  h1:             "Hair Care Nabhi Oil – Nourish Hair from Within",
  reviewSummary:  "4.58 · 327 Verified Reviews",
  paymentImage:   null,
  logoImage:      "/NabhiLogo/nabhiLogo.png",
  brandName:      "Home With Care · Ved Sanjeevani",
  contactEmail:   "akravipvtltd@gmail.com",
  whatsappNumber: "919717143189",
  whatsappMessage:"Hi, I'm interested in Hair Care Nabhi Oil",
  fbPixelId:      "1622075442328928",
  cartStorageKey: "exclusiveCart",
  themeColor:     "#2d5a27",
};

// ─── Variants ─────────────────────────────────────────────────────────────────
const variants = [
  { id: 1, label: "Buy 1 Bottle",                 price: "₹499",  priceNum: 499,  mrp: 599,  badge: null,          externalVariantId: 477155790806201408 },
  { id: 2, label: "Buy 2 Bottles – ₹300 Off",     price: "₹899",  priceNum: 899,  mrp: 1199, badge: "Save ₹300",   externalVariantId: 477155804764845120 },
];


const reviewPhotos = [
  
];

// ─── Gallery images ───────────────────────────────────────────────────────────
const images = [
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=haircare1.webp&version_id=null",
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=Haircare2.webp&version_id=null",
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=Haircare3.webp&version_id=null",
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=Haircare4.webp&version_id=null",
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
    title: "Why Choose Hair Care Nabhi Oil",
    content:
      "Rooted in ancient Ayurvedic navel therapy, this oil nourishes hair from within.\n\nKey Benefits:\n• Reduces hair fall\n• Promotes hair growth\n• Nourishes scalp and roots\n• Natural shine and strength",
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
  title:    "Strong Hair Starts from Within",
  body1:    "Hair fall, weak roots and dull hair are often signs of poor internal nourishment.",
  body2:    "Hair Care Nabhi Oil works overnight, delivering herbs deep into your system while you rest.",
  imageSrc: images[2],
};

// ─── Balance Section ──────────────────────────────────────────────────────────
const balanceSection = {
  title:    "Hair Strength Flows from the Navel",
  body1:    "In Ayurveda, the navel is connected to the body's sensory and nutritive network.",
  body2:    "Herbs applied through the navel channel their nourishing effect all the way to hair roots.",
  imageSrc: images[0],
};

// ─── Hero Banner ──────────────────────────────────────────────────────────────
const heroBannerSection = {
  title: "The Hair Care Navel Ritual",
  body:  "Ayurvedic herbs reach the hair roots through the navel, delivering deep nourishment from within.",
  stats: [
    { num: "5,000+", label: "Happy Customers" },
    { num: "4.58",   label: "Average Rating" },
    { num: "327",    label: "Reviews" },
    { num: "100%",   label: "Ayurvedic" },
  ],
};

// ─── Ritual Section ───────────────────────────────────────────────────────────
const ritualSection = {
  title:    "How Navel Hair Therapy Works",
  subtitle: "The navel is the body's energy center, connected to hair roots and scalp health",
  items: [
    { icon: <GiHerbsBundle size={22} color="#2d5a27" />, title: "Herbal Blend",         desc: "A powerful formula made from Bhringraj, Amla, and Hibiscus" },
    { icon: <GiMeditation  size={22} color="#2d5a27" />, title: "Energy Center",         desc: "The navel is the body's primary energy hub" },
    { icon: <GiDroplets    size={22} color="#2d5a27" />, title: "Fast Absorption",       desc: "The oil is absorbed quickly into the body" },
    { icon: <GiHealing     size={22} color="#2d5a27" />, title: "Hair Nourishment",      desc: "Reduces hair fall and promotes healthy growth" },
  ],
};

// ─── Why Us ───────────────────────────────────────────────────────────────────
const whyUsSection = {
  title:    "Why Choose Hair Care Nabhi Oil?",
  subtitle: "For natural hair care from within",
  items: [
    { icon: <FaLeaf     size={26} color="#2d5a27" />, title: "Ayurvedic Formula",   desc: "100% natural ingredients, no chemicals" },
    { icon: <HiSparkles size={26} color="#2d5a27" />, title: "Reduces Hair Fall",   desc: "Strengthens roots from inside out" },
    { icon: <FaLeaf     size={26} color="#2d5a27" />, title: "Nighttime Use",       desc: "Simple 2-drop routine before bed" },
  ],
};

// ─── Reviews ──────────────────────────────────────────────────────────────────
const reviews = {
  items: [
    { id: 1, name: "Ritu Sharma",  rating: 5, body: "My hair fall reduced noticeably within 3 weeks.", date: "02/10/2026" },
    { id: 2, name: "Arjun Mehta", rating: 5, body: "Very good product, hair feels stronger and shinier.", date: "01/22/2026" },
  ],
};

// ─── Final export ─────────────────────────────────────────────────────────────
export const nabhiHairEngConfig = {
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