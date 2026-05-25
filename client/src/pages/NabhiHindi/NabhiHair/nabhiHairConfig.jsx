import React from "react";
import { GiHerbsBundle, GiMeditation, GiDroplets, GiHealing } from "react-icons/gi";
import { FaLeaf, FaShieldAlt } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { TbTruckDelivery, TbRefresh } from "react-icons/tb";

// ─── Product metadata ─────────────────────────────────────────────────────────
const product = {
  id:             "hair-care-nabhi-oil",
  name:           "हेयर केयर नाभि तेल – ",
  tagline:        "प्राचीन आयुर्वेदिक फॉर्मूला",
  image:          "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=haircare1.webp&version_id=null",
  subtitle:       "प्राचीन आयुर्वेदिक फॉर्मूला",
  h1:             "हेयर केयर नाभि तेल – जड़ों से पोषण, बाल बनें मजबूत और घने",
  reviewSummary:  "4.58 · 327 सत्यापित समीक्षाएँ",
  paymentImage:   null,
  logoImage:      "/NabhiLogo/nabhiLogo.png",
  brandName:      "होम विद केयर · वेद संजीवनी",
  contactEmail:   "akravipvtltd@gmail.com",
  whatsappNumber: "919717143189",
  whatsappMessage:"Hi, I'm interested in Eye Care Nabhi Oil",
  fbPixelId:      "1622075442328928",
  cartStorageKey: "exclusiveCart",
  themeColor:     "#2e5b33",
};

// ─── Variants ─────────────────────────────────────────────────────────────────
const variants = [
  { id: 1, label: "1 बोतल खरीदें",             price: "₹499", priceNum: 499, mrp: 699,  badge: null,         externalVariantId: 477155790806201408 },
  { id: 2, label: "2 बोतल खरीदें – ₹100 छूट", price: "₹899", priceNum: 899, mrp: 1198, badge: "₹100 बचाएँ", externalVariantId: 477155804764845120 },
];

// ─── Gallery images ───────────────────────────────────────────────────────────
const images = [
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=haircare1.webp&version_id=null",
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=Haircare2.webp&version_id=null",
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=Haircare3.webp&version_id=null",
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=Haircare4.webp&version_id=null",
  // "https://www.homewithcare.in/cdn/shop/files/EyeCareNabhiOil_4.webp?v=1759519715",
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
  { text: "मुफ़्त शिपिंग" },
  { text: "5,000+ खुश ग्राहक" },
  { text: "कैश ऑन डिलीवरी (COD)" },
  { text: "100% आयुर्वेदिक" },
  { text: "हर ऑर्डर गुणवत्ता जाँच" },
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
    title: "आई केयर नाभि तेल क्यों चुनें",
    content:
      "प्राचीन आयुर्वेदिक नाभि चिकित्सा में जड़ा हुआ, यह तेल आँखों को भीतर से पोषण देता है।\n\nमुख्य लाभ:\n• आँखों की नमी बनाए रखे\n• डिजिटल आई स्ट्रेन कम करे\n• लालिमा और थकान में राहत\n• प्राकृतिक दृष्टि समर्थन",
  },
  {
    title: "उपयोग कैसे करें",
    content:
      "रात को सोने से पहले 2–3 बूँदें नाभि में डालें और हल्की मालिश करें।\n\nसुबह साफ करें।\n\nनियमित उपयोग सर्वोत्तम परिणाम देता है।",
  },
  {
    title: "विशेष सूचना",
    content:
      "पहले पैच टेस्ट करें।\n\nजलन होने पर उपयोग बंद करें।\n\nयह चिकित्सा उपचार का विकल्प नहीं है।",
  },
];

// ─── How to Use ───────────────────────────────────────────────────────────────
const howToUseImages = images;

// ─── Benefits carousel ────────────────────────────────────────────────────────
const benefitsCarouselImages = images;

// ─── Feature Section ──────────────────────────────────────────────────────────
const bloatSection = {
  title:    "डिजिटल युग की आँखों की देखभाल",
  body1:    "लंबे समय तक स्क्रीन देखने से आँखों में तनाव, सूखापन और जलन हो सकती है।",
  body2:    "आई केयर नाभि तेल रात में काम करता है और सुबह तरोताज़गी देता है।",
  imageSrc: images[2],
};

// ─── Balance Section ──────────────────────────────────────────────────────────
const balanceSection = {
  title:    "नाभि से बहती है दृष्टि की शक्ति",
  body1:    "आयुर्वेद में नाभि शरीर के संवेदी नेटवर्क से जुड़ी है।",
  body2:    "नाभि के माध्यम से जड़ी-बूटियाँ आँखों तक प्रभाव पहुँचाती हैं।",
  imageSrc: images[0],
};

// ─── Hero Banner ──────────────────────────────────────────────────────────────
const heroBannerSection = {
  title: "आई केयर नाभि अनुष्ठान",
  body:  "नाभि के माध्यम से आयुर्वेदिक जड़ी-बूटियाँ आँखों तक पहुँचती हैं और भीतर से राहत देती हैं।",
  stats: [
    { num: "5,000+", label: "खुश ग्राहक" },
    { num: "4.58",   label: "औसत रेटिंग" },
    { num: "327",    label: "समीक्षाएँ" },
    { num: "100%",   label: "आयुर्वेदिक" },
  ],
};

// ─── Ritual Section ───────────────────────────────────────────────────────────
const ritualSection = {
  title:    "नाभि नेत्र चिकित्सा कैसे काम करती है",
  subtitle: "नाभि शरीर का ऊर्जा केंद्र है जो आँखों से जुड़ा है",
  items: [
    { icon: <GiHerbsBundle size={22} color="#2d5a27" />, title: "हर्बल मिश्रण", desc: "त्रिफला, गुलाब और सौंफ से बना शक्तिशाली फॉर्मूला" },
    { icon: <GiMeditation size={22} color="#2d5a27" />, title: "ऊर्जा केंद्र", desc: "नाभि शरीर का प्रमुख केंद्र है" },
    { icon: <GiDroplets size={22} color="#2d5a27" />, title: "तेज़ अवशोषण", desc: "तेल तेजी से शरीर में अवशोषित होता है" },
    { icon: <GiHealing size={22} color="#2d5a27" />, title: "आँखों को आराम", desc: "थकान और सूखापन कम करता है" },
  ],
};

// ─── Why Us ───────────────────────────────────────────────────────────────────
const whyUsSection = {
  title: "आई केयर नाभि तेल क्यों चुनें?",
  subtitle: "प्राकृतिक नेत्र देखभाल के लिए",
  items: [
    { icon: <FaLeaf size={26} color="#2d5a27" />, title: "आयुर्वेदिक फॉर्मूला", desc: "100% प्राकृतिक" },
    { icon: <HiSparkles size={26} color="#2d5a27" />, title: "आई स्ट्रेन से राहत", desc: "स्क्रीन थकान कम करे" },
    { icon: <FaLeaf size={26} color="#2d5a27" />, title: "रात्रि उपयोग", desc: "आसान दिनचर्या" },
  ],
};

// ─── Reviews ──────────────────────────────────────────────────────────────────
const reviews = {
  items: [
    { id: 1, name: "रितु शर्मा", rating: 5, body: "आँखों को आराम मिला", date: "02/10/2026" },
    { id: 2, name: "अर्जुन मेहता", rating: 5, body: "बहुत अच्छा उत्पाद", date: "01/22/2026" },
  ],
};

// ─── Final export ─────────────────────────────────────────────────────────────
export const nabhiHairConfig = {
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