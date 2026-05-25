import React from "react";
import { GiHerbsBundle, GiMeditation, GiDroplets, GiHealing } from "react-icons/gi";
import { FaLeaf, FaShieldAlt } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { TbTruckDelivery, TbRefresh } from "react-icons/tb";

// ─── Product metadata ─────────────────────────────────────────────────────────
const product = {
  id:             "shilajit-energy-resin",
  name:           "शिलाजीत शक्ति रेजिन",
  tagline:        "प्राकृतिक ऊर्जा और स्टैमिना बूस्टर",
  image:          "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=shilajitcare3.webp&version_id=null",
  subtitle:       "हिमालय से प्राप्त शुद्ध शिलाजीत",
  h1:             "शुद्ध शिलाजीत रेजिन – ताकत, स्टैमिना और ऊर्जा बढ़ाने के लिए",
  reviewSummary:  "4.71 · 589 सत्यापित समीक्षाएँ",
  paymentImage:   null,
  logoImage:      "/NabhiLogo/nabhiLogo.png",
  brandName:      "होम विद केयर · वेद संजीवनी",
  contactEmail:   "akravipvtltd@gmail.com",
  whatsappNumber: "919717143189",
  whatsappMessage:"Hi, I'm interested in Shilajit Resin",
  // fbPixelId:      "378912345678123",
  fbPixelId:      "1622075442328928",
  cartStorageKey: "exclusiveCart",
  themeColor:     "#2e5b33",
};


const reviewPhotos = [
  
];

// ─── Variants ─────────────────────────────────────────────────────────────────
const variants = [
  { id: 1, label: "1 डिब्बा खरीदें",             price: "₹669",  priceNum: 669, badge: null,          externalVariantId: 477247394800564160 },
  { id: 2, label: "2 डिब्बे खरीदें – ₹300 छूट", price: "₹1099", priceNum: 1099, badge: "₹300 बचाएँ", externalVariantId: 477247412248868800 },
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

// ─── Marquee ──────────────────────────────────────────────────────────────────
const marqueeItems = [
  { text: "मुफ़्त शिपिंग" },
  { text: "20,000+ खुश ग्राहक" },
  { text: "कैश ऑन डिलीवरी (COD)" },
  { text: "100% शुद्ध शिलाजीत" },
  { text: "हिमालय से प्राप्त" },
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
    title: "शिलाजीत क्यों चुनें",
    content:
      "शिलाजीत एक प्राचीन आयुर्वेदिक रसायन है जो शरीर को अंदर से मजबूत बनाता है।\n\nमुख्य लाभ:\n• ऊर्जा और स्टैमिना बढ़ाए\n• इम्यूनिटी मजबूत करे\n• कमजोरी दूर करे\n• पुरुष शक्ति को सपोर्ट करे",
  },
  {
    title: "उपयोग कैसे करें",
    content:
      "मटर के दाने जितनी मात्रा गुनगुने दूध या पानी में मिलाकर लें।\n\nदिन में 1–2 बार उपयोग करें।",
  },
  {
    title: "विशेष सूचना",
    content:
      "अधिक मात्रा में सेवन न करें।\n\nगर्भवती महिलाएं डॉक्टर से सलाह लें।\n\nयह दवा नहीं है।",
  },
];

// ─── How to Use ───────────────────────────────────────────────────────────────
const howToUseImages = images;

// ─── Benefits carousel ────────────────────────────────────────────────────────
const benefitsCarouselImages = images;

// ─── Feature Section ──────────────────────────────────────────────────────────
const bloatSection = {
  title:    "प्राकृतिक ऊर्जा का स्रोत",
  body1:    "थकान, कमजोरी और कम स्टैमिना आजकल आम समस्या है।",
  body2:    "शिलाजीत शरीर को अंदर से ताकत देता है और ऊर्जा बढ़ाता है।",
  imageSrc: images[1],
};

// ─── Balance Section ──────────────────────────────────────────────────────────
const balanceSection = {
  title:    "हिमालय की शक्ति",
  body1:    "शिलाजीत हिमालय की चट्टानों से निकलने वाला प्राकृतिक पदार्थ है।",
  body2:    "यह शरीर को पुनर्जीवित करने में मदद करता है।",
  imageSrc: images[0],
};

// ─── Hero Banner ──────────────────────────────────────────────────────────────
const heroBannerSection = {
  title: "शिलाजीत ऊर्जा अनुष्ठान",
  body:  "प्राकृतिक तरीके से ऊर्जा और स्टैमिना बढ़ाएँ।",
  stats: [
    { num: "20,000+", label: "खुश ग्राहक" },
    { num: "4.71",    label: "औसत रेटिंग" },
    { num: "589",     label: "समीक्षाएँ" },
    { num: "100%",    label: "शुद्ध" },
  ],
};

// ─── Ritual Section ───────────────────────────────────────────────────────────
const ritualSection = {
  title:    "शिलाजीत कैसे काम करता है",
  subtitle: "प्राकृतिक मिनरल्स और फुल्विक एसिड से भरपूर",
  items: [
    { icon: <GiHerbsBundle size={22} color="#3b2f2f" />, title: "मिनरल्स से भरपूर", desc: "85+ आवश्यक खनिज" },
    { icon: <GiMeditation size={22} color="#3b2f2f" />, title: "ऊर्जा बढ़ाए", desc: "स्टैमिना और ताकत बढ़ाता है" },
    { icon: <GiDroplets size={22} color="#3b2f2f" />, title: "अवशोषण", desc: "शरीर में तेजी से अवशोषित" },
    { icon: <GiHealing size={22} color="#3b2f2f" />, title: "रिकवरी", desc: "थकान और कमजोरी कम करे" },
  ],
};

// ─── Why Us ───────────────────────────────────────────────────────────────────
const whyUsSection = {
  title: "हमारा शिलाजीत क्यों चुनें?",
  subtitle: "शुद्ध और प्रमाणित गुणवत्ता",
  items: [
    { icon: <FaLeaf size={26} color="#3b2f2f" />, title: "100% शुद्ध", desc: "कोई मिलावट नहीं" },
    { icon: <HiSparkles size={26} color="#3b2f2f" />, title: "ऊर्जा बूस्टर", desc: "दिनभर ऊर्जा बनाए रखे" },
    { icon: <FaLeaf size={26} color="#3b2f2f" />, title: "आसान उपयोग", desc: "दूध या पानी के साथ लें" },
  ],
};

// ─── Reviews ──────────────────────────────────────────────────────────────────
const reviews = {
  items: [
    { id: 1, name: "अमित सिंह", rating: 5, body: "एनर्जी बहुत बढ़ी", date: "02/20/2026" },
    { id: 2, name: "विकास यादव", rating: 5, body: "स्टैमिना बेहतर हुआ", date: "01/30/2026" },
  ],
};

// ─── Final export ─────────────────────────────────────────────────────────────
export const nabhiShilajitConfig = {
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