import React from "react";
import { GiHerbsBundle, GiMeditation, GiDroplets, GiHealing } from "react-icons/gi";
import { FaLeaf, FaShieldAlt } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { TbTruckDelivery, TbRefresh } from "react-icons/tb";

// ─── Product metadata ─────────────────────────────────────────────────────────
const product = {
  id:             "eye-care-nabhi-oil",
  name:           "आई केयर नाभि ऑयल",
  tagline:        "प्राचीन आयुर्वेदिक फॉर्मूला",
  image:          "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=eyecare1.webp&version_id=null",
  subtitle:       "प्राचीन आयुर्वेदिक फॉर्मूला",
  h1:             "आई केयर नाभि ऑयल – दृष्टि सहायता और आँखों की थकान से राहत",
  reviewSummary:  "4.58 · 327 सत्यापित समीक्षाएं",
  paymentImage:   null,
  logoImage:      "/NabhiLogo/nabhiLogo.png",
  brandName:      "Home With Care · वेद संजीवनी",
  contactEmail:   "akravipvtltd@gmail.com",
  whatsappNumber: "919717143189",
  whatsappMessage:"नमस्ते, मुझे आई केयर नाभि ऑयल में रुचि है",
  fbPixelId:      "1622075442328928",
  cartStorageKey: "exclusiveCart",
  themeColor:     "#2e5b33",
};

// ─── Variants ─────────────────────────────────────────────────────────────────
const variants = [
  { id: 1, label: "1 बोतल खरीदें",                      price: "₹599",   priceNum: 599,  mrp: 799,  badge: null,            externalVariantId: 477155696316920896 },
  { id: 2, label: "2 बोतलें खरीदें – ₹100 की छूट",      price: "₹1,099", priceNum: 1099, mrp: 1598, badge: "₹100 बचाएं",    externalVariantId: 477155708396516416 },
];

// ─── Gallery images ───────────────────────────────────────────────────────────
const images = [
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=haircarehn1.webp&version_id=null",
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=haircarehn2.webp&version_id=null",
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=haircarehn3.webp&version_id=null",
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=haircarehn4.webp&version_id=null",
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
  { text: "मुफ्त डिलीवरी" },
  { text: "5,000+ खुश ग्राहक" },
  { text: "कैश ऑन डिलीवरी (COD)" },
  { text: "100% आयुर्वेदिक" },
  { text: "हर ऑर्डर पर गुणवत्ता जाँच" },
];

// ─── Trust tags ───────────────────────────────────────────────────────────────
const trustTags = [
  { icon: <TbTruckDelivery size={15} />, label: "मुफ्त डिलीवरी" },
  { icon: <FaShieldAlt size={13} />,     label: "COD उपलब्ध" },
  { icon: <TbRefresh size={15} />,       label: "आसान वापसी" },
  { icon: <FaLeaf size={13} />,          label: "100% प्राकृतिक" },
];

// ─── Accordion ────────────────────────────────────────────────────────────────
const accordionData = [
  {
    title: "आई केयर नाभि ऑयल क्यों चुनें",
    content:
      "प्राचीन आयुर्वेदिक नाभि चिकित्सा पर आधारित, यह तेल अंदर से आँखों को पोषण देता है।\n\nमुख्य लाभ:\n• आँखों की नमी बनाए रखता है\n• डिजिटल आई स्ट्रेन कम करता है\n• लालिमा और थकान से राहत देता है\n• प्राकृतिक दृष्टि सहायता",
  },
  {
    title: "उपयोग का तरीका",
    content:
      "रात को सोने से पहले नाभि में 2–3 बूंदें डालें और हल्के से मालिश करें।\n\nसुबह साफ कर लें।\n\nnनियमित उपयोग से सर्वोत्तम परिणाम मिलते हैं।",
  },
  {
    title: "महत्वपूर्ण सूचना",
    content:
      "पहले पैच टेस्ट करें।\n\nजलन होने पर उपयोग बंद कर दें।\n\nयह चिकित्सा उपचार का विकल्प नहीं है।",
  },
];

// ─── How to Use ───────────────────────────────────────────────────────────────
const howToUseImages = images;

// ─── Benefits carousel ────────────────────────────────────────────────────────
const benefitsCarouselImages = images;

// ─── Feature Section ──────────────────────────────────────────────────────────
const bloatSection = {
  title:    "डिजिटल युग के लिए आँखों की देखभाल",
  body1:    "लंबे समय तक स्क्रीन देखने से आँखों में थकान, रूखापन और जलन हो सकती है।",
  body2:    "आई केयर नाभि ऑयल रात भर काम करता है और सुबह आँखें तरोताजा महसूस होती हैं।",
  imageSrc: images[2],
};

// ─── Balance Section ──────────────────────────────────────────────────────────
const balanceSection = {
  title:    "दृष्टि शक्ति नाभि से प्रवाहित होती है",
  body1:    "आयुर्वेद में नाभि शरीर के संवेदी तंत्र से जुड़ी होती है।",
  body2:    "नाभि के माध्यम से लगाई गई जड़ी-बूटियाँ अपना प्रभाव आँखों तक पहुँचाती हैं।",
  imageSrc: images[0],
};

// ─── Hero Banner ──────────────────────────────────────────────────────────────
const heroBannerSection = {
  title: "आँखों की देखभाल का नाभि अनुष्ठान",
  body:  "आयुर्वेदिक जड़ी-बूटियाँ नाभि के माध्यम से आँखों तक पहुँचती हैं और अंदर से गहरी राहत देती हैं।",
  stats: [
    { num: "5,000+", label: "खुश ग्राहक" },
    { num: "4.58",   label: "औसत रेटिंग" },
    { num: "327",    label: "समीक्षाएं" },
    { num: "100%",   label: "आयुर्वेदिक" },
  ],
};

// ─── Ritual Section ───────────────────────────────────────────────────────────
const ritualSection = {
  title:    "नाभि आँख चिकित्सा कैसे काम करती है",
  subtitle: "नाभि शरीर का ऊर्जा केंद्र है, जो आँखों से जुड़ा है",
  items: [
    { icon: <GiHerbsBundle size={22} color="#2d5a27" />, title: "जड़ी-बूटी मिश्रण",      desc: "त्रिफला, गुलाब और सौंफ से बना शक्तिशाली फॉर्मूला" },
    { icon: <GiMeditation  size={22} color="#2d5a27" />, title: "ऊर्जा केंद्र",           desc: "नाभि शरीर का प्रमुख ऊर्जा केंद्र है" },
    { icon: <GiDroplets    size={22} color="#2d5a27" />, title: "तेज अवशोषण",             desc: "तेल शरीर में जल्दी अवशोषित हो जाता है" },
    { icon: <GiHealing     size={22} color="#2d5a27" />, title: "आँखों को राहत",          desc: "थकान और रूखापन कम करता है" },
  ],
};

// ─── Why Us ───────────────────────────────────────────────────────────────────
const whyUsSection = {
  title:    "आई केयर नाभि ऑयल क्यों चुनें?",
  subtitle: "प्राकृतिक आँखों की देखभाल के लिए",
  items: [
    { icon: <FaLeaf     size={26} color="#2d5a27" />, title: "आयुर्वेदिक फॉर्मूला",   desc: "100% प्राकृतिक सामग्री" },
    { icon: <HiSparkles size={26} color="#2d5a27" />, title: "आई स्ट्रेन से राहत",    desc: "स्क्रीन की थकान कम करता है" },
    { icon: <FaLeaf     size={26} color="#2d5a27" />, title: "रात में उपयोग",          desc: "आसान दैनिक दिनचर्या" },
  ],
};

// ─── Reviews ──────────────────────────────────────────────────────────────────
const reviews = {
  items: [
    { id: 1, name: "रितु शर्मा",  rating: 5, body: "मेरी आँखें बहुत ज़्यादा तरोताजा महसूस होती हैं।", date: "02/10/2026" },
    { id: 2, name: "अर्जुन मेहता", rating: 5, body: "बहुत अच्छा उत्पाद है, पूरी तरह अनुशंसित।", date: "01/22/2026" },
  ],
};

// ─── Final export ─────────────────────────────────────────────────────────────
export const nabhiEyeConfig = {
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