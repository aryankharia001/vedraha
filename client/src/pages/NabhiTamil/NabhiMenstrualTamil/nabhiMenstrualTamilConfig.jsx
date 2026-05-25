import React from "react";
import { GiHerbsBundle, GiMeditation, GiDroplets, GiHealing } from "react-icons/gi";
import { FaLeaf, FaShieldAlt } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { TbTruckDelivery, TbRefresh } from "react-icons/tb";

const product = {
  id: "menstrual-pain-nabhi-oil", name: "மாதவிடாய் வலி நிவாரண நாபி எண்ணெய்",
  tagline: "உங்கள் சுழற்சியை இயற்கையாக வசதியாக்குங்கள்",
  image: "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=menstrual1.webp&version_id=null",
  subtitle: "பெண்களுக்கான சிறப்பு ஆயுர்வேத சூத்திரம்",
  h1: "மாதவிடாய் வலி நிவாரண நாபி எண்ணெய் – இயற்கையான மாதவிடாய் வலி நிவாரணம்",
  reviewSummary: "4.63 · 350+ சரிபார்க்கப்பட்ட மதிப்புரைகள்",
  paymentImage: null, logoImage: "/NabhiLogo/nabhiLogo.png",
  brandName: "ஹோம் வித் கேர் · வேத சஞ்சீவனி",
  contactEmail: "akravipvtltd@gmail.com", whatsappNumber: "919717143189",
  whatsappMessage: "Hi, I'm interested in Menstrual Pain Relief Nabhi Oil",
  fbPixelId: "1622075442328928", cartStorageKey: "exclusiveCart", themeColor: "#8e3b5b",
};

const variants = [
  { id: 1, label: "1 பாட்டில் வாங்கு",              price: "₹599",   priceNum: 599,  mrp: 699,  badge: null,              externalVariantId: 477247968715569088 },
  { id: 2, label: "2 பாட்டில்கள் வாங்கு – ₹100 தள்ளுபடி", price: "₹1,099", priceNum: 1099, mrp: 1398, badge: "₹100 சேமிக்கவும்", externalVariantId: 477247976768632768 },
];

const images = [
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=menstrual1.webp&version_id=null",
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=menstrual2.webp&version_id=null",
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=menstrual3.webp&version_id=null",
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=menstrual4.webp&version_id=null",
];

const upiIcons = [
  { src: "https://img.icons8.com/?size=100&id=am4ltuIYDpQ5&format=png&color=000000", alt: "GPay", zIndex: 10 },
  { src: "https://img.icons8.com/?size=100&id=OYtBxIlJwMGA&format=png&color=000000", alt: "PhonePe", zIndex: 20 },
  { src: "https://img.icons8.com/?size=100&id=68067&format=png&color=000000", alt: "Paytm", zIndex: 30 },
];

const marqueeItems = [
  { text: "இலவச டெலிவரி" }, { text: "டெலிவரியில் பணம் கிடைக்கும்" },
  { text: "ஒவ்வொரு ஆர்டரிலும் தரம் சரிபார்க்கப்படுகிறது" }, { text: "முழு ஆர்டர் கண்காணிப்பு" },
];

const trustTags = [
  { icon: <TbTruckDelivery size={15} />, label: "இலவச டெலிவரி" },
  { icon: <FaShieldAlt size={13} />, label: "COD கிடைக்கும்" },
  { icon: <TbRefresh size={15} />, label: "எளிய திரும்பப்பெறல்" },
  { icon: <FaLeaf size={13} />, label: "100% இயற்கை" },
];

const accordionData = [
  {
    title: "இந்த நாபி எண்ணெயை ஏன் தேர்வு செய்ய வேண்டும்",
    content: "பெண்களுக்காக சிறப்பாக உருவாக்கப்பட்ட ஆயுர்வேத தீர்வு.\n\nமுக்கிய நன்மைகள்:\n• மாதவிடாய் வலியை குறைக்கிறது\n• ஹார்மோன் சமநிலைக்கு ஆதரவளிக்கிறது\n• வீக்கம் மற்றும் அசௌகரியத்தை குறைக்கிறது\n• மாதவிடாயை மிகவும் வசதியாக்குகிறது",
  },
  {
    title: "எவ்வாறு பயன்படுத்துவது",
    content: "மாதவிடாயின் போது நாபியில் 2-3 சொட்டுகள் போடுங்கள்.\n\n1 நிமிடம் மெதுவாக மசாஜ் செய்யுங்கள்.\n\nசிறந்த முடிவுகளுக்கு தினமும் பயன்படுத்துங்கள்.",
  },
  {
    title: "முக்கியமான தகவல்",
    content: "வெளிப்புற பயன்பாட்டிற்கு மட்டுமே.\n\nமுதலில் பேட்ச் டெஸ்ட் செய்யுங்கள்.\n\nகடுமையான பிரச்சினை இருந்தால் மருத்துவரை அணுகவும்.",
  },
];

const howToUseImages = images;
const benefitsCarouselImages = images;

const bloatSection = {
  title: "மாதவிடாய் வலியிலிருந்து இயற்கையான நிவாரணம்",
  body1: "வலி, வீக்கம் மற்றும் வலி உங்கள் சுழற்சியின் போது தினசரி வாழ்க்கையை கணிசமாக பாதிக்கலாம்.",
  body2: "இந்த எண்ணெய் நாபி சிகிச்சை மூலம் உள்ளிருந்து நிவாரணம் அளிக்கிறது — இயற்கையாகவும் மென்மையாகவும்.",
  imageSrc: images[1],
};

const balanceSection = {
  title: "நாபி சிகிச்சை & ஹார்மோன் சமநிலை",
  body1: "நாபி இனப்பெருக்க ஆரோக்கியத்தை பாதிக்கும் 72,000+ நரம்புகளுடன் இணைக்கப்பட்டுள்ளது.",
  body2: "நாபி வழியாக எண்ணெய் உறிஞ்சுதல் ஹார்மோன் சமநிலைக்கு ஆதரவளிக்கிறது மற்றும் அசௌகரியத்தை குறைக்கிறது.",
  imageSrc: images[0],
};

const heroBannerSection = {
  title: "மாதவிடாய் நிவாரணத்திற்கான பண்டைய நாபி சிகிச்சை",
  body: "ஆயுர்வேத முறையில் வலியை குறைத்து உங்கள் சுழற்சி முழுவதும் சமநிலையை பராமரியுங்கள்.",
  stats: [
    { num: "10,000+", label: "மகிழ்ச்சியான வாடிக்கையாளர்கள்" },
    { num: "4.63",    label: "சராசரி மதிப்பீடு" },
    { num: "350+",    label: "மதிப்புரைகள்" },
    { num: "100%",    label: "ஆயுர்வேதம்" },
  ],
};

const ritualSection = {
  title: "நாபி சிகிச்சை எவ்வாறு செயல்படுகிறது",
  subtitle: "ஆயுர்வேத ஞானத்தில் வேரூன்றியது",
  items: [
    { icon: <GiHerbsBundle size={22} color="#8e3b5b" />, title: "மூலிகை கலவை",         desc: "பெண்களின் ஆரோக்கியத்திற்காக உருவாக்கப்பட்ட சிறப்பு சூத்திரம்" },
    { icon: <GiMeditation  size={22} color="#8e3b5b" />, title: "ஆற்றல் மையம்",        desc: "நாபி உடலின் முதன்மை ஆற்றல் மையம்" },
    { icon: <GiDroplets    size={22} color="#8e3b5b" />, title: "உறிஞ்சுதல்",          desc: "எண்ணெய் நரம்பு வலையமைப்பு வழியாக உடலில் நுழைகிறது" },
    { icon: <GiHealing     size={22} color="#8e3b5b" />, title: "நிவாரணம்",             desc: "வலி மற்றும் அசௌகரியத்தை இயற்கையாக குறைக்கிறது" },
  ],
};

const whyUsSection = {
  title: "எங்கள் தயாரிப்பை ஏன் தேர்வு செய்ய வேண்டும்?",
  subtitle: "பெண்களுக்கான நம்பகமான ஆயுர்வேத பராமரிப்பு",
  items: [
    { icon: <FaLeaf     size={26} color="#8e3b5b" />, title: "100% இயற்கை",        desc: "ரசாயனங்கள் இல்லை, செயற்கை சேர்க்கைகள் இல்லை" },
    { icon: <HiSparkles size={26} color="#8e3b5b" />, title: "ஹார்மோன் ஆதரவு",    desc: "உங்கள் சுழற்சியின் போது இயற்கையான சமநிலையை ஊக்குவிக்கிறது" },
    { icon: <FaLeaf     size={26} color="#8e3b5b" />, title: "பயன்படுத்த எளிதானது", desc: "இரவு வெறும் 2-3 சொட்டுகள்" },
  ],
};

const reviews = {
  items: [
    { id: 1, name: "பிரியங்கா சர்மா", rating: 5, body: "வலியிலிருந்து கணிசமான நிவாரணம் கிடைத்தது. என் மாதவிடாய்கள் மிகவும் நிர்வகிக்கக்கூடியதாக உணர்கின்றன.", date: "02/18/2026" },
    { id: 2, name: "அனுஷ்கா வர்மா",   rating: 5, body: "மாதவிடாய்கள் எளிதாகிவிட்டன. வீக்கம் குறைவாக உணர்கிறேன் மற்றும் வலியும் மிகவும் தணிந்துள்ளது.", date: "01/29/2026" },
  ],
};

export const nabhiMenstrualTamilConfig = {
  product, variants, images, upiIcons, marqueeItems, trustTags, accordionData,
  howToUseImages, benefitsCarouselImages, bloatSection, balanceSection,
  heroBannerSection, ritualSection, whyUsSection, reviews,
};