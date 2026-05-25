import React from "react";
import { GiNightSleep, GiMeditation, GiHerbsBundle, GiHealing } from "react-icons/gi";
import { FaLeaf, FaShieldAlt } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { TbTruckDelivery, TbRefresh } from "react-icons/tb";

// ─── Product metadata ─────────────────────────────────────────────────────────
const product = {
  id:             "sleep-relief-nabhi-oil",
  name:           "नींद आराम नाभि तेल",
  tagline:        "गहरी और सुकून भरी नींद के लिए",
  image:          "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=sleep1.webp&version_id=null",
  subtitle:       "तनाव कम करे और नींद बेहतर बनाए",
  h1:             "स्लीप रिलीफ नाभि ऑयल – तनाव कम करें और गहरी नींद पाएं",
  reviewSummary:  "4.73 · 742 सत्यापित समीक्षाएँ",
  paymentImage:   null,
  logoImage:      "/NabhiLogo/nabhiLogo.png",
  brandName:      "होम विद केयर · वेद संजीवनी",
  contactEmail:   "akravipvtltd@gmail.com",
  whatsappNumber: "919717143189",
  whatsappMessage:"Hi, I'm interested in Sleep Relief Oil",
  fbPixelId:      "1622075442328928",
  cartStorageKey: "exclusiveCart",
  themeColor:     "#2e5b33",
};

const reviewPhotos = [
  
];

// ─── Variants ─────────────────────────────────────────────────────────────────
const variants = [
  { id: 1, label: "1 बोतल खरीदें",             price: "₹599",  priceNum: 599, badge: null,          externalVariantId: 477155614444106816 },
  { id: 2, label: "2 बोतलें खरीदें – ₹150 छूट", price: "₹1049", priceNum: 1049, badge: "₹150 बचाएँ", externalVariantId: 477155630281798720 },
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
  { text: "मुफ़्त शिपिंग" },
  { text: "15,000+ खुश ग्राहक" },
  { text: "कैश ऑन डिलीवरी (COD)" },
  { text: "तनाव से राहत" },
  { text: "गहरी नींद" },
];

// ─── Trust tags ───────────────────────────────────────────────────────────────
const trustTags = [
  { icon: <TbTruckDelivery size={15} />, label: "मुफ्त शिपिंग" },
  { icon: <FaShieldAlt size={13} />,     label: "COD उपलब्ध" },
  { icon: <TbRefresh size={15} />,       label: "आसान वापसी" },
  { icon: <FaLeaf size={13} />,          label: "100% प्राकृतिक" },
];

// ─── Accordion ────────────────────────────────────────────────────────────────
const accordionData = [
  {
    title: "यह तेल क्यों चुनें",
    content:
      "यह विशेष नाभि तेल मानसिक शांति और गहरी नींद के लिए बनाया गया है।\n\nमुख्य लाभ:\n• जल्दी नींद आने में मदद\n• तनाव और चिंता कम करे\n• दिमाग को शांत करे\n• नींद की गुणवत्ता सुधारे",
  },
  {
    title: "उपयोग कैसे करें",
    content:
      "रात को सोने से पहले 2–3 बूंद नाभि में डालें और हल्के से मालिश करें।\n\nरोजाना उपयोग करें।",
  },
  {
    title: "विशेष सूचना",
    content:
      "केवल बाहरी उपयोग के लिए।\n\nआंखों से दूर रखें।\n\nयह दवा नहीं है।",
  },
];

// ─── Sections ─────────────────────────────────────────────────────────────────
const bloatSection = {
  title:    "तनाव और अनिद्रा से राहत",
  body1:    "नींद की कमी और तनाव आजकल आम समस्या है।",
  body2:    "यह नाभि तेल शरीर और मन को शांत करके नींद बेहतर करता है।",
  imageSrc: images[1],
};

const balanceSection = {
  title:    "प्राकृतिक शांति का अनुभव",
  body1:    "आयुर्वेद के अनुसार नाभि शरीर का महत्वपूर्ण केंद्र है।",
  body2:    "इस तेल से नाभि के माध्यम से पूरे शरीर को आराम मिलता है।",
  imageSrc: images[0],
};

const heroBannerSection = {
  title: "गहरी नींद का अनुष्ठान",
  body:  "हर रात सुकून और आरामदायक नींद पाएं",
  stats: [
    { num: "15,000+", label: "खुश ग्राहक" },
    { num: "4.73",    label: "औसत रेटिंग" },
    { num: "742",     label: "समीक्षाएँ" },
    { num: "100%",    label: "प्राकृतिक" },
  ],
};

const ritualSection = {
  title:    "यह कैसे काम करता है",
  subtitle: "आयुर्वेदिक जड़ी-बूटियों से भरपूर",
  items: [
    { icon: <GiHerbsBundle size={22} color="#2c3e50" />, title: "जड़ी-बूटियाँ", desc: "प्राकृतिक तत्वों से बना" },
    { icon: <GiMeditation size={22} color="#2c3e50" />, title: "शांति", desc: "मन को शांत करे" },
    { icon: <GiNightSleep size={22} color="#2c3e50" />, title: "नींद", desc: "गहरी नींद में मदद" },
    { icon: <GiHealing size={22} color="#2c3e50" />, title: "आराम", desc: "तनाव और थकान कम करे" },
  ],
};

const whyUsSection = {
  title: "हमारा स्लीप ऑयल क्यों चुनें?",
  subtitle: "प्राकृतिक और सुरक्षित",
  items: [
    { icon: <FaLeaf size={26} color="#2c3e50" />, title: "100% प्राकृतिक", desc: "कोई केमिकल नहीं" },
    { icon: <HiSparkles size={26} color="#2c3e50" />, title: "बेहतर नींद", desc: "नींद की गुणवत्ता बढ़ाए" },
    { icon: <FaLeaf size={26} color="#2c3e50" />, title: "आसान उपयोग", desc: "रात में लगाएं" },
  ],
};

// ─── Reviews ──────────────────────────────────────────────────────────────────
const reviews = {
  items: [
    { id: 1, name: "राहुल शर्मा", rating: 5, body: "नींद बहुत अच्छी आने लगी", date: "03/10/2026" },
    { id: 2, name: "नेहा वर्मा", rating: 5, body: "तनाव कम हुआ और आराम मिला", date: "02/25/2026" },
  ],
};

// ─── Final export ─────────────────────────────────────────────────────────────
export const nabhiSleepConfig = {
  product,
  variants,
  images,
  upiIcons,
  marqueeItems,
  trustTags,
  accordionData,
  howToUseImages: images,
  benefitsCarouselImages: images,
  bloatSection,
  balanceSection,
  heroBannerSection,
  ritualSection,
  whyUsSection,
  reviews,
  reviewPhotos
};