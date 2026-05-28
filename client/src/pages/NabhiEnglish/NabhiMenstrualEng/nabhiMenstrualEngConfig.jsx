import React from "react";
import { GiHerbsBundle, GiMeditation, GiDroplets, GiHealing } from "react-icons/gi";
import { FaLeaf, FaShieldAlt } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { TbTruckDelivery, TbRefresh } from "react-icons/tb";

// ─── Product metadata ─────────────────────────────────────────────────────────
const product = {
  id:             "menstrual-pain-nabhi-oil",
  name:           "Menstrual Pain Relief Nabhi Oil",
  tagline:        "Make Your Cycle Naturally Comfortable",
  image:          "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=menstrual1.webp&version_id=null",
  subtitle:       "Special Ayurvedic Formula for Women",
  h1:             "Menstrual Pain Relief Nabhi Oil – Natural Period Pain Relief",
  reviewSummary:  "4.63 · 350+ Verified Reviews",
  paymentImage:   null,
  logoImage:      "/NabhiLogo/nabhiLogo.png",
  brandName:      "Home With Care · Ved Sanjeevani",
  contactEmail:   "akravipvtltd@gmail.com",
  whatsappNumber: "919717143189",
  whatsappMessage:"Hi, I'm interested in Menstrual Pain Relief Nabhi Oil",
  fbPixelId:      "1622075442328928",
  cartStorageKey: "exclusiveCart",
  themeColor:     "#8e3b5b",
};

// ─── Variants ─────────────────────────────────────────────────────────────────
const variants = [
  { id: 1, label: "Buy 1 Bottle",               price: "₹599",   priceNum: 599,  mrp: 699,  badge: null,          externalVariantId: 477247968715569088 },
  { id: 2, label: "Buy 2 Bottles – ₹300 Off",   price: "₹1,099", priceNum: 1099, mrp: 1398, badge: "Save ₹300",   externalVariantId: 477247976768632768 },
];

// ─── Gallery images ───────────────────────────────────────────────────────────
const images = [
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=menstrual1.webp&version_id=null",
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=menstrual2.webp&version_id=null",
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=menstrual3.webp&version_id=null",
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=menstrual4.webp&version_id=null",
];

const reviewPhotos = [
  
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
  { text: "Cash on Delivery Available" },
  { text: "Quality Checked on Every Order" },
  { text: "Full Order Tracking" },
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
    title: "Why Choose This Nabhi Oil",
    content:
      "A specially formulated Ayurvedic solution for women.\n\nKey Benefits:\n• Reduces menstrual cramps\n• Supports hormonal balance\n• Reduces bloating and discomfort\n• Makes periods more comfortable",
  },
  {
    title: "How to Use",
    content:
      "Apply 2–3 drops into the navel during your period.\n\nMassage gently for 1 minute.\n\nUse daily for best results.",
  },
  {
    title: "Important Information",
    content:
      "For external use only.\n\nDo a patch test first.\n\nConsult a doctor if you have a serious condition.",
  },
];

// ─── How to Use ───────────────────────────────────────────────────────────────
const howToUseImages = images;

// ─── Benefits carousel ────────────────────────────────────────────────────────
const benefitsCarouselImages = images;

// ─── Feature Section ──────────────────────────────────────────────────────────
const bloatSection = {
  title:    "Natural Relief from Period Pain",
  body1:    "Cramps, bloating, and pain can significantly affect daily life during your cycle.",
  body2:    "This oil delivers relief from within through navel therapy — naturally and gently.",
  imageSrc: images[1],
};

// ─── Balance Section ──────────────────────────────────────────────────────────
const balanceSection = {
  title:    "Navel Therapy & Hormonal Balance",
  body1:    "The navel is connected to 72,000+ nerves that influence reproductive health.",
  body2:    "Oil absorption through the navel helps support hormonal balance and eases discomfort.",
  imageSrc: images[0],
};

// ─── Hero Banner ──────────────────────────────────────────────────────────────
const heroBannerSection = {
  title: "Ancient Navel Therapy for Period Relief",
  body:  "Reduce pain the Ayurvedic way and maintain balance throughout your cycle.",
  stats: [
    { num: "10,000+", label: "Happy Customers" },
    { num: "4.63",    label: "Average Rating" },
    { num: "350+",    label: "Reviews" },
    { num: "100%",    label: "Ayurvedic" },
  ],
};

// ─── Ritual Section ───────────────────────────────────────────────────────────
const ritualSection = {
  title:    "How Navel Therapy Works",
  subtitle: "Rooted in Ayurvedic wisdom",
  items: [
    { icon: <GiHerbsBundle size={22} color="#8e3b5b" />, title: "Herbal Blend",         desc: "A special formula crafted for women's wellness" },
    { icon: <GiMeditation  size={22} color="#8e3b5b" />, title: "Energy Center",         desc: "The navel is the body's main energy hub" },
    { icon: <GiDroplets    size={22} color="#8e3b5b" />, title: "Absorption",            desc: "Oil enters the body through the nerve network" },
    { icon: <GiHealing     size={22} color="#8e3b5b" />, title: "Relief",                desc: "Reduces pain and discomfort naturally" },
  ],
};

// ─── Why Us ───────────────────────────────────────────────────────────────────
const whyUsSection = {
  title:    "Why Choose Our Product?",
  subtitle: "Trusted Ayurvedic care for women",
  items: [
    { icon: <FaLeaf     size={26} color="#8e3b5b" />, title: "100% Natural",        desc: "No chemicals, no artificial additives" },
    { icon: <HiSparkles size={26} color="#8e3b5b" />, title: "Hormonal Support",    desc: "Promotes natural balance during your cycle" },
    { icon: <FaLeaf     size={26} color="#8e3b5b" />, title: "Easy to Use",         desc: "Just 2–3 drops at night" },
  ],
};

// ─── Reviews ──────────────────────────────────────────────────────────────────
const reviews = {
  items: [
    { id: 1, name: "Priyanka Sharma", rating: 5, body: "Got significant relief from pain. My periods feel much more manageable now.", date: "02/18/2026" },
    { id: 2, name: "Anushka Verma",   rating: 5, body: "Periods have become easier. I feel less bloated and the cramps are milder.", date: "01/29/2026" },
  ],
};

// ─── Final export ─────────────────────────────────────────────────────────────
export const nabhiMenstrualEngConfig = {
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
};