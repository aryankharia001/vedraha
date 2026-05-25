import React from "react";
import { GiHerbsBundle, GiMeditation, GiDroplets, GiHealing } from "react-icons/gi";
import { FaLeaf, FaShieldAlt } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { TbTruckDelivery, TbRefresh } from "react-icons/tb";

// ─── Product metadata ─────────────────────────────────────────────────────────
const product = {
  id:             "menstrual-pain-nabhi-oil",
  name:           "मासिक दर्द राहत नाभि तेल",
  tagline:        "अपने मासिक चक्र को प्राकृतिक रूप से आरामदायक बनाएं",
  image:          "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=menstrual1.webp&version_id=null",
  subtitle:       "महिलाओं के लिए विशेष आयुर्वेदिक फॉर्मूला",
  h1:             "मासिक दर्द राहत नाभि तेल – पीरियड दर्द से प्राकृतिक राहत",
  reviewSummary:  "4.63 · 350+ सत्यापित समीक्षाएँ",
  paymentImage:   null,
  logoImage:      "/NabhiLogo/nabhiLogo.png",
  brandName:      "होम विद केयर · वेद संजीवनी",
  contactEmail:   "akravipvtltd@gmail.com",
  whatsappNumber: "919717143189",
  whatsappMessage:"Hi, I'm interested in Menstrual Pain Relief Nabhi Oil",
  // fbPixelId:      "567891234567890",
  fbPixelId:      "1622075442328928",
  cartStorageKey: "exclusiveCart",
  themeColor:     "#2e5b33",
};

const reviewPhotos = [
  
];

// ─── Variants ─────────────────────────────────────────────────────────────────
const variants = [
  { id: 1, label: "1 बोतल खरीदें",               price: "₹599",  priceNum: 599,  mrp: 699,  badge: null,          externalVariantId: 477247968715569088 },
  { id: 2, label: "2 बोतल खरीदें – ₹100 छूट",  price: "₹1,099", priceNum: 1099, mrp: 1398, badge: "₹100 बचाएँ", externalVariantId: 477247976768632768 },
];

// ─── Gallery images ───────────────────────────────────────────────────────────
const images = [
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=menstrual1.webp&version_id=null",
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=menstrual2.webp&version_id=null",
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=menstrual3.webp&version_id=null",
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=menstrual4.webp&version_id=null",
  // "https://www.homewithcare.in/cdn/shop/files/2.webp",
  // "https://www.homewithcare.in/cdn/shop/files/3.webp",
];

// ─── UPI icons ────────────────────────────────────────────────────────────────
const upiIcons = [
  { src: "https://img.icons8.com/?size=100&id=am4ltuIYDpQ5&format=png&color=000000", alt: "GPay", zIndex: 10 },
  { src: "https://img.icons8.com/?size=100&id=OYtBxIlJwMGA&format=png&color=000000", alt: "PhonePe", zIndex: 20 },
  { src: "https://img.icons8.com/?size=100&id=68067&format=png&color=000000", alt: "Paytm", zIndex: 30 },
];

// ─── Marquee ──────────────────────────────────────────────────────────────────
const marqueeItems = [
  { text: "मुफ़्त शिपिंग" },
  { text: "कैश ऑन डिलीवरी उपलब्ध" },
  { text: "हर ऑर्डर गुणवत्ता जाँच" },
  { text: "पूरी ट्रैकिंग सुविधा" },
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
    title: "यह नाभि तेल क्यों चुनें",
    content:
      "महिलाओं के लिए विशेष आयुर्वेदिक समाधान।\n\nमुख्य लाभ:\n• मासिक दर्द (क्रैम्प्स) कम करे\n• हार्मोन संतुलन में मदद\n• फुलापन और असुविधा कम करे\n• पीरियड्स को आरामदायक बनाए",
  },
  {
    title: "उपयोग कैसे करें",
    content:
      "पीरियड के दौरान नाभि में 2–3 बूँदें डालें।\n\n1 मिनट हल्की मालिश करें।\n\nरोज़ाना उपयोग करें।",
  },
  {
    title: "महत्वपूर्ण जानकारी",
    content:
      "केवल बाहरी उपयोग के लिए।\n\nपहले पैच टेस्ट करें।\n\nगंभीर समस्या होने पर डॉक्टर से सलाह लें।",
  },
];

// ─── How to Use ───────────────────────────────────────────────────────────────
const howToUseImages = images;

// ─── Benefits carousel ────────────────────────────────────────────────────────
const benefitsCarouselImages = images;

// ─── Feature Section ──────────────────────────────────────────────────────────
const bloatSection = {
  title:    "पीरियड दर्द से प्राकृतिक राहत",
  body1:    "क्रैम्प्स, फुलापन और दर्द दैनिक जीवन को प्रभावित करते हैं।",
  body2:    "यह तेल नाभि थेरेपी के माध्यम से अंदर से राहत देता है।",
  imageSrc: images[1],
};

// ─── Balance Section ──────────────────────────────────────────────────────────
const balanceSection = {
  title:    "नाभि थेरेपी और हार्मोन संतुलन",
  body1:    "नाभि 72,000+ नसों से जुड़ी होती है जो प्रजनन स्वास्थ्य को प्रभावित करती हैं।",
  body2:    "तेल का अवशोषण हार्मोन संतुलन में मदद करता है।",
  imageSrc: images[0],
};

// ─── Hero Banner ──────────────────────────────────────────────────────────────
const heroBannerSection = {
  title: "प्राचीन नाभि थेरेपी से पीरियड राहत",
  body:  "आयुर्वेदिक तरीके से दर्द कम करें और संतुलन बनाए रखें।",
  stats: [
    { num: "10,000+", label: "खुश ग्राहक" },
    { num: "4.63",    label: "औसत रेटिंग" },
    { num: "350+",    label: "समीक्षाएँ" },
    { num: "100%",    label: "आयुर्वेदिक" },
  ],
};

// ─── Ritual Section ───────────────────────────────────────────────────────────
const ritualSection = {
  title:    "नाभि थेरेपी कैसे काम करती है",
  subtitle: "आयुर्वेद पर आधारित",
  items: [
    { icon: <GiHerbsBundle size={22} color="#8e3b5b" />, title: "हर्बल मिश्रण", desc: "महिलाओं के लिए विशेष फॉर्मूला" },
    { icon: <GiMeditation size={22} color="#8e3b5b" />, title: "ऊर्जा केंद्र", desc: "नाभि शरीर का मुख्य केंद्र है" },
    { icon: <GiDroplets size={22} color="#8e3b5b" />, title: "अवशोषण", desc: "तेल नसों के माध्यम से अंदर जाता है" },
    { icon: <GiHealing size={22} color="#8e3b5b" />, title: "राहत", desc: "दर्द और असुविधा कम करता है" },
  ],
};

// ─── Why Us ───────────────────────────────────────────────────────────────────
const whyUsSection = {
  title: "हमारा उत्पाद क्यों चुनें?",
  subtitle: "विश्वसनीय आयुर्वेदिक देखभाल",
  items: [
    { icon: <FaLeaf size={26} color="#8e3b5b" />, title: "100% प्राकृतिक", desc: "कोई केमिकल नहीं" },
    { icon: <HiSparkles size={26} color="#8e3b5b" />, title: "हार्मोन सपोर्ट", desc: "प्राकृतिक संतुलन" },
    { icon: <FaLeaf size={26} color="#8e3b5b" />, title: "आसान उपयोग", desc: "रात में 2–3 बूँद" },
  ],
};

// ─── Reviews ──────────────────────────────────────────────────────────────────
const reviews = {
  items: [
    { id: 1, name: "प्रियंका शर्मा", rating: 5, body: "दर्द में काफी राहत मिली", date: "02/18/2026" },
    { id: 2, name: "अनुष्का वर्मा", rating: 5, body: "पीरियड्स आसान हो गए", date: "01/29/2026" },
  ],
};

// ─── Final export ─────────────────────────────────────────────────────────────
export const nabhiMenstrualConfig = {
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