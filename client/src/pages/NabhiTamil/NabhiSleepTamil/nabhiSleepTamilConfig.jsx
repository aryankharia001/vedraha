import React from "react";
import { GiNightSleep, GiMeditation, GiHerbsBundle, GiHealing } from "react-icons/gi";
import { FaLeaf, FaShieldAlt } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { TbTruckDelivery, TbRefresh } from "react-icons/tb";

const product = {
  id: "sleep-relief-nabhi-oil", name: "தூக்க நிவாரண நாபி எண்ணெய்",
  tagline: "ஆழமான & அமைதியான தூக்கத்திற்காக",
  image: "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=sleep1.webp&version_id=null",
  subtitle: "மன அழுத்தத்தை குறைக்கிறது & தூக்க தரத்தை மேம்படுத்துகிறது",
  h1: "தூக்க நிவாரண நாபி எண்ணெய் – மன அழுத்தத்தை குறைத்து ஆழமான தூக்கம் பெறுங்கள்",
  reviewSummary: "4.73 · 742 சரிபார்க்கப்பட்ட மதிப்புரைகள்",
  paymentImage: null, logoImage: "/NabhiLogo/nabhiLogo.png",
  brandName: "ஹோம் வித் கேர் · வேத சஞ்சீவனி",
  contactEmail: "akravipvtltd@gmail.com", whatsappNumber: "919717143189",
  whatsappMessage: "Hi, I'm interested in Sleep Relief Oil",
  fbPixelId: "1622075442328928", cartStorageKey: "exclusiveCart", themeColor: "#2e5b33",
};

const variants = [
  { id: 1, label: "1 பாட்டில் வாங்கு",              price: "₹599",   priceNum: 599,  badge: null,              externalVariantId: 477155614444106816 },
  { id: 2, label: "2 பாட்டில்கள் வாங்கு – ₹150 தள்ளுபடி", price: "₹1,049", priceNum: 1049, badge: "₹150 சேமிக்கவும்", externalVariantId: 477155630281798720 },
];

const images = [
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=sleep1.webp&version_id=null",
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=sleep2.webp&version_id=null",
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=sleep3.webp&version_id=null",
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=sleep4.webp&version_id=null",
];

const upiIcons = [
  { src: "https://img.icons8.com/?size=100&id=am4ltuIYDpQ5&format=png&color=000000", alt: "GPay", zIndex: 10 },
  { src: "https://img.icons8.com/?size=100&id=OYtBxIlJwMGA&format=png&color=000000", alt: "PhonePe", zIndex: 20 },
  { src: "https://img.icons8.com/?size=100&id=68067&format=png&color=000000", alt: "Paytm", zIndex: 30 },
];

const marqueeItems = [
  { text: "இலவச டெலிவரி" }, { text: "15,000+ மகிழ்ச்சியான வாடிக்கையாளர்கள்" },
  { text: "டெலிவரியில் பணம் செலுத்துங்கள் (COD)" }, { text: "மன அழுத்த நிவாரணம்" },
  { text: "ஆழமான தூக்கம்" },
];

const trustTags = [
  { icon: <TbTruckDelivery size={15} />, label: "இலவச டெலிவரி" },
  { icon: <FaShieldAlt size={13} />, label: "COD கிடைக்கும்" },
  { icon: <TbRefresh size={15} />, label: "எளிய திரும்பப்பெறல்" },
  { icon: <FaLeaf size={13} />, label: "100% இயற்கை" },
];

const accordionData = [
  {
    title: "இந்த எண்ணெயை ஏன் தேர்வு செய்ய வேண்டும்",
    content: "இந்த சிறப்பு நாபி எண்ணெய் மன அமைதி மற்றும் ஆழமான, அமைதியான தூக்கத்திற்காக உருவாக்கப்பட்டுள்ளது.\n\nமுக்கிய நன்மைகள்:\n• விரைவாக தூங்க உதவுகிறது\n• மன அழுத்தம் மற்றும் கவலையை குறைக்கிறது\n• மனதை அமைதிப்படுத்துகிறது\n• ஒட்டுமொத்த தூக்க தரத்தை மேம்படுத்துகிறது",
  },
  {
    title: "எவ்வாறு பயன்படுத்துவது",
    content: "இரவில் தூங்குவதற்கு முன் நாபியில் 2-3 சொட்டுகள் போட்டு மெதுவாக மசாஜ் செய்யுங்கள்.\n\nசிறந்த முடிவுகளுக்கு தினமும் பயன்படுத்துங்கள்.",
  },
  {
    title: "முக்கியமான குறிப்பு",
    content: "வெளிப்புற பயன்பாட்டிற்கு மட்டுமே.\n\nகண்களிலிருந்து விலக்கி வைக்கவும்.\n\nஇது மருந்து அல்ல.",
  },
];

const bloatSection = {
  title: "மன அழுத்தம் & தூக்கமின்மையிலிருந்து நிவாரணம்",
  body1: "தூக்கமின்மை மற்றும் மன அழுத்தம் நவீன வாழ்க்கையில் மிகவும் பொதுவானதாகிவிட்டன.",
  body2: "இந்த நாபி எண்ணெய் உடல் மற்றும் மனம் இரண்டையும் அமைதிப்படுத்தி, ஒவ்வொரு இரவும் நன்றாக தூங்க உதவுகிறது.",
  imageSrc: images[1],
};

const balanceSection = {
  title: "இயற்கையான அமைதியை அனுபவியுங்கள்",
  body1: "ஆயுர்வேதத்தின்படி, நாபி உடலின் முக்கியமான ஆற்றல் மையம்.",
  body2: "இந்த எண்ணெய் நாபி வழியாக செயல்பட்டு உங்கள் முழு அமைப்பிற்கும் ஆழமான ஓய்வை தருகிறது.",
  imageSrc: images[0],
};

const heroBannerSection = {
  title: "ஆழமான தூக்க சடங்கு",
  body: "ஒவ்வொரு இரவும் அமைதியான மற்றும் ஓய்வான தூக்கத்தை அனுபவியுங்கள்.",
  stats: [
    { num: "15,000+", label: "மகிழ்ச்சியான வாடிக்கையாளர்கள்" },
    { num: "4.73",    label: "சராசரி மதிப்பீடு" },
    { num: "742",     label: "மதிப்புரைகள்" },
    { num: "100%",    label: "இயற்கை" },
  ],
};

const ritualSection = {
  title: "இது எவ்வாறு செயல்படுகிறது",
  subtitle: "ஆயுர்வேத மூலிகைகளால் செறிவூட்டப்பட்டது",
  items: [
    { icon: <GiHerbsBundle size={22} color="#2c3e50" />, title: "மூலிகை பொருட்கள்",     desc: "தூய இயற்கை தத்துவங்களிலிருந்து தயாரிக்கப்பட்டது" },
    { icon: <GiMeditation  size={22} color="#2c3e50" />, title: "மன அமைதி",             desc: "மனதை அமைதிப்படுத்தி தணிக்கிறது" },
    { icon: <GiNightSleep  size={22} color="#2c3e50" />, title: "ஆழமான தூக்கம்",        desc: "ஆழமான தூக்கத்தை அடைய உதவுகிறது" },
    { icon: <GiHealing     size={22} color="#2c3e50" />, title: "ஓய்வு & மீட்சி",       desc: "மன அழுத்தம் மற்றும் சோர்வை குறைக்கிறது" },
  ],
};

const whyUsSection = {
  title: "எங்கள் தூக்க எண்ணெயை ஏன் தேர்வு செய்ய வேண்டும்?",
  subtitle: "தினசரி பயன்பாட்டிற்கு இயற்கையான மற்றும் பாதுகாப்பானது",
  items: [
    { icon: <FaLeaf     size={26} color="#2c3e50" />, title: "100% இயற்கை",          desc: "ரசாயனங்கள் இல்லை, செயற்கை சேர்க்கைகள் இல்லை" },
    { icon: <HiSparkles size={26} color="#2c3e50" />, title: "சிறந்த தூக்கம்",        desc: "தூக்க தரத்தை கணிசமாக மேம்படுத்துகிறது" },
    { icon: <FaLeaf     size={26} color="#2c3e50" />, title: "பயன்படுத்த எளிதானது",  desc: "படுக்கை நேரத்திற்கு முன் இரவில் மட்டும் தடவுங்கள்" },
  ],
};

const reviews = {
  items: [
    { id: 1, name: "ராகுல் சர்மா",  rating: 5, body: "என் தூக்கம் மிகவும் மேம்பட்டுள்ளது. விரைவாக தூங்கி புத்துணர்ச்சியுடன் எழுகிறேன்.", date: "03/10/2026" },
    { id: 2, name: "நேஹா வர்மா",    rating: 5, body: "மன அழுத்தம் கணிசமாக குறைந்துள்ளது மற்றும் காலையில் மிகவும் ஓய்வாக உணர்கிறேன்.", date: "02/25/2026" },
  ],
};

export const nabhiSleepTamilConfig = {
  product, variants, images, upiIcons, marqueeItems, trustTags, accordionData,
  howToUseImages: images, benefitsCarouselImages: images,
  bloatSection, balanceSection, heroBannerSection, ritualSection, whyUsSection, reviews,
};