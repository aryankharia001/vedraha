import React from "react";
import { GiHerbsBundle, GiMeditation, GiDroplets, GiHealing } from "react-icons/gi";
import { FaLeaf, FaShieldAlt } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { TbTruckDelivery, TbRefresh } from "react-icons/tb";

const product = {
  id: "hair-care-nabhi-oil", name: "கூந்தல் பராமரிப்பு நாபி எண்ணெய்",
  tagline: "பண்டைய ஆயுர்வேத சூத்திரம்",
  image: "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=haircare1.webp&version_id=null",
  subtitle: "பண்டைய ஆயுர்வேத சூத்திரம்",
  h1: "கூந்தல் பராமரிப்பு நாபி எண்ணெய் – உள்ளிருந்து கூந்தலுக்கு ஊட்டமளிக்கவும்",
  reviewSummary: "4.58 · 327 சரிபார்க்கப்பட்ட மதிப்புரைகள்",
  paymentImage: null, logoImage: "/NabhiLogo/nabhiLogo.png",
  brandName: "ஹோம் வித் கேர் · வேத சஞ்சீவனி",
  contactEmail: "akravipvtltd@gmail.com", whatsappNumber: "919717143189",
  whatsappMessage: "Hi, I'm interested in Hair Care Nabhi Oil",
  fbPixelId: "1622075442328928", cartStorageKey: "exclusiveCart", themeColor: "#2d5a27",
};

const variants = [
  { id: 1, label: "1 பாட்டில் வாங்கு",              price: "₹499",  priceNum: 499,  mrp: 699,  badge: null,              externalVariantId: 477155790806201408 },
  { id: 2, label: "2 பாட்டில்கள் வாங்கு – ₹100 தள்ளுபடி", price: "₹899",  priceNum: 899,  mrp: 1198, badge: "₹100 சேமிக்கவும்", externalVariantId: 477155804764845120 },
];

const images = [
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=haircare1.webp&version_id=null",
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=Haircare2.webp&version_id=null",
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=Haircare3.webp&version_id=null",
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=Haircare4.webp&version_id=null",
];

const upiIcons = [
  { src: "https://img.icons8.com/?size=100&id=am4ltuIYDpQ5&format=png&color=000000", alt: "GPay", zIndex: 10 },
  { src: "https://img.icons8.com/?size=100&id=OYtBxIlJwMGA&format=png&color=000000", alt: "PhonePe", zIndex: 20 },
  { src: "https://img.icons8.com/?size=100&id=68067&format=png&color=000000", alt: "Paytm", zIndex: 30 },
];

const marqueeItems = [
  { text: "இலவச டெலிவரி" }, { text: "5,000+ மகிழ்ச்சியான வாடிக்கையாளர்கள்" },
  { text: "டெலிவரியில் பணம் செலுத்துங்கள் (COD)" }, { text: "100% ஆயுர்வேதம்" },
  { text: "ஒவ்வொரு ஆர்டரிலும் தரம் சரிபார்க்கப்படுகிறது" },
];

const trustTags = [
  { icon: <TbTruckDelivery size={15} />, label: "இலவச டெலிவரி" },
  { icon: <FaShieldAlt size={13} />, label: "COD கிடைக்கும்" },
  { icon: <TbRefresh size={15} />, label: "எளிய திரும்பப்பெறல்" },
  { icon: <FaLeaf size={13} />, label: "100% இயற்கை" },
];

const accordionData = [
  {
    title: "கூந்தல் பராமரிப்பு நாபி எண்ணெயை ஏன் தேர்வு செய்ய வேண்டும்",
    content: "பண்டைய ஆயுர்வேத நாபி சிகிச்சையில் வேரூன்றிய, இந்த எண்ணெய் உள்ளிருந்து கூந்தலுக்கு ஊட்டமளிக்கிறது.\n\nமுக்கிய நன்மைகள்:\n• கூந்தல் உதிர்வை குறைக்கிறது\n• கூந்தல் வளர்ச்சியை ஊக்குவிக்கிறது\n• தலைப்பகுதி மற்றும் வேர்களுக்கு ஊட்டமளிக்கிறது\n• இயற்கையான பளபளப்பு மற்றும் வலிமை",
  },
  {
    title: "எவ்வாறு பயன்படுத்துவது",
    content: "இரவில் தூங்குவதற்கு முன் நாபியில் 2-3 சொட்டுகள் போட்டு மெதுவாக மசாஜ் செய்யுங்கள்.\n\nகாலையில் சுத்தம் செய்யுங்கள்.\n\nதொடர்ந்து பயன்படுத்தினால் சிறந்த முடிவுகள் கிடைக்கும்.",
  },
  {
    title: "முக்கியமான குறிப்பு",
    content: "முதலில் பேட்ச் டெஸ்ட் செய்யுங்கள்.\n\nஎரிச்சல் ஏற்பட்டால் பயன்படுத்துவதை நிறுத்துங்கள்.\n\nஇது மருத்துவ சிகிச்சைக்கு மாற்று அல்ல.",
  },
];

const howToUseImages = images;
const benefitsCarouselImages = images;

const bloatSection = {
  title: "வலிமையான கூந்தல் உள்ளிருந்து தொடங்குகிறது",
  body1: "கூந்தல் உதிர்வு, பலவீனமான வேர்கள் மற்றும் மந்தமான கூந்தல் பொதுவாக உள்ளிருந்து ஊட்டச்சத்து குறைபாட்டின் அறிகுறிகள்.",
  body2: "கூந்தல் பராமரிப்பு நாபி எண்ணெய் இரவில் செயல்பட்டு ஓய்வின் போது மூலிகைகளை உங்கள் அமைப்பில் ஆழமாக அனுப்புகிறது.",
  imageSrc: images[2],
};

const balanceSection = {
  title: "நாபியிலிருந்து கூந்தல் வலிமை பாய்கிறது",
  body1: "ஆயுர்வேதத்தில், நாபி உடலின் உணர்வு மற்றும் ஊட்டச்சத்து வலையமைப்புடன் இணைக்கப்பட்டுள்ளது.",
  body2: "நாபி வழியாக போடப்படும் மூலிகைகள் கூந்தல் வேர்கள் வரை தங்கள் ஊட்டச்சத்து விளைவை அனுப்புகின்றன.",
  imageSrc: images[0],
};

const heroBannerSection = {
  title: "கூந்தல் பராமரிப்பு நாபி சடங்கு",
  body: "ஆயுர்வேத மூலிகைகள் நாபி வழியாக கூந்தல் வேர்களை அடைந்து, உள்ளிருந்து ஆழமான ஊட்டமளிக்கின்றன.",
  stats: [
    { num: "5,000+", label: "மகிழ்ச்சியான வாடிக்கையாளர்கள்" },
    { num: "4.58",   label: "சராசரி மதிப்பீடு" },
    { num: "327",    label: "மதிப்புரைகள்" },
    { num: "100%",   label: "ஆயுர்வேதம்" },
  ],
};

const ritualSection = {
  title: "நாபி கூந்தல் சிகிச்சை எவ்வாறு செயல்படுகிறது",
  subtitle: "நாபி உடலின் ஆற்றல் மையம், கூந்தல் வேர்கள் மற்றும் தலைப்பகுதி ஆரோக்கியத்துடன் இணைக்கப்பட்டுள்ளது",
  items: [
    { icon: <GiHerbsBundle size={22} color="#2d5a27" />, title: "மூலிகை கலவை",         desc: "பிரிங்கராஜ், நெல்லிக்காய் மற்றும் செம்பருத்தியுடன் தயாரிக்கப்பட்ட சக்திவாய்ந்த சூத்திரம்" },
    { icon: <GiMeditation  size={22} color="#2d5a27" />, title: "ஆற்றல் மையம்",        desc: "நாபி உடலின் முதன்மை ஆற்றல் மையம்" },
    { icon: <GiDroplets    size={22} color="#2d5a27" />, title: "விரைவான உறிஞ்சுதல்", desc: "எண்ணெய் உடலில் விரைவாக உறிஞ்சப்படுகிறது" },
    { icon: <GiHealing     size={22} color="#2d5a27" />, title: "கூந்தல் ஊட்டம்",      desc: "கூந்தல் உதிர்வை குறைக்கிறது மற்றும் ஆரோக்கியமான வளர்ச்சியை ஊக்குவிக்கிறது" },
  ],
};

const whyUsSection = {
  title: "கூந்தல் பராமரிப்பு நாபி எண்ணெயை ஏன் தேர்வு செய்ய வேண்டும்?",
  subtitle: "உள்ளிருந்து இயற்கையான கூந்தல் பராமரிப்பிற்காக",
  items: [
    { icon: <FaLeaf     size={26} color="#2d5a27" />, title: "ஆயுர்வேத சூத்திரம்",  desc: "100% இயற்கை பொருட்கள், ரசாயனங்கள் இல்லை" },
    { icon: <HiSparkles size={26} color="#2d5a27" />, title: "கூந்தல் உதிர்வு குறைப்பு", desc: "உள்ளிருந்து வேர்களை வலிமைப்படுத்துகிறது" },
    { icon: <FaLeaf     size={26} color="#2d5a27" />, title: "இரவு பயன்பாடு",        desc: "படுக்கை நேரத்திற்கு முன் எளிய 2 சொட்டு வழக்கம்" },
  ],
};

const reviews = {
  items: [
    { id: 1, name: "ரிது சர்மா",     rating: 5, body: "3 வாரங்களில் என் கூந்தல் உதிர்வு கணிசமாக குறைந்தது.", date: "02/10/2026" },
    { id: 2, name: "அர்ஜுன் மேத்தா", rating: 5, body: "மிகவும் நல்ல தயாரிப்பு, கூந்தல் வலிமையாகவும் பளபளப்பாகவும் உணர்கிறது.", date: "01/22/2026" },
  ],
};

export const nabhiHairTamilConfig = {
  product, variants, images, upiIcons, marqueeItems, trustTags, accordionData,
  howToUseImages, benefitsCarouselImages, bloatSection, balanceSection,
  heroBannerSection, ritualSection, whyUsSection, reviews,
};