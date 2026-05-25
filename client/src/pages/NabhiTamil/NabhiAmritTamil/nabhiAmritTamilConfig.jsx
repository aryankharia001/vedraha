import React from "react";
import { GiHerbsBundle, GiMeditation, GiDroplets, GiHealing } from "react-icons/gi";
import { FaLeaf, FaShieldAlt, FaHandSparkles } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { TbTruckDelivery, TbRefresh } from "react-icons/tb";

const product = {
  id:             "nabhi-amrit",
  name:           "நாபி அமிர்த்",
  tagline:        "ஆயுர்வேத நாபி எண்ணெய்",
  image:          "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=ChatGPT%20Image%20Apr%2017%2C%202026%2C%2003_39_36%20PM%201.png&version_id=null",
  subtitle:       "பண்டைய ஆயுர்வேத சூத்திரம்",
  h1:             "நாபி அமிர்த் - செரிமானம் மற்றும் டிடாக்ஸிற்கான நாபி எண்ணெய்",
  reviewSummary:  "4.62 · 189 சரிபார்க்கப்பட்ட மதிப்புரைகள்",
  paymentImage:   "/NabhiImg/allpayment.png",
  logoImage:      "/NabhiLogo/nabhiLogo.png",
  brandName:      "ஹோம் வித் கேர் · வேத சஞ்சீவனி",
  contactEmail:   "akravipvtltd@gmail.com",
  whatsappNumber: "919717143189",
  whatsappMessage:"Hi, I'm interested in Nabhi Amrit",
  fbPixelId:      "1622075442328928",
  cartStorageKey: "exclusiveCart",
  themeColor:     "#2d5a27",
};

const variants = [
  // { id: 1, label: "1 பாட்டில் வாங்கு",  price: "₹499",   priceNum: 499,  mrp: 999, badge: null,               externalVariantId: 477155136897430592 },
  { id: 1, label: "1 பாட்டில் வாங்கு",  price: "₹499",   priceNum: 499,  mrp: 999, badge: null,               externalVariantId: 477250531148925056 },
  { id: 2, label: "2 பாட்டில்கள் வாங்கு", price: "₹699", priceNum: 699,           badge: "₹300 சேமிக்கவும்",  externalVariantId: 477155162130363456 },
  { id: 3, label: "3 பாட்டில்கள் வாங்கு", price: "₹999", priceNum: 999,           badge: "₹500 சேமிக்கவும்", externalVariantId: 477155176089007168 },
];

const images = [
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=amriteng3.webp&version_id=null",
  { type: "video", src: "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=nabhi.mp4&version_id=null", poster: "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=Screenshot%202026-04-30%20at%205.44.14%E2%80%AFPM-optimized.webp&version_id=null" },
  "/NabhiImg/amrit3.png",
  "/NabhiImg/amrit4.png",
  "/NabhiImg/amrit5.png",
];

const upiIcons = [
  { src: "https://img.icons8.com/?size=100&id=am4ltuIYDpQ5&format=png&color=000000", alt: "GPay",    zIndex: 10 },
  { src: "https://img.icons8.com/?size=100&id=OYtBxIlJwMGA&format=png&color=000000", alt: "PhonePe", zIndex: 20 },
  { src: "https://img.icons8.com/?size=100&id=68067&format=png&color=000000",        alt: "Paytm",   zIndex: 30 },
];

const marqueeItems = [
  { text: "இலவச டெலிவரி" },
  { text: "10,000+ மகிழ்ச்சியான வாடிக்கையாளர்கள்" },
  { text: "டெலிவரியில் பணம் செலுத்துங்கள் (COD)" },
  { text: "100% ஆயுர்வேதம்" },
  { text: "ஒவ்வொரு ஆர்டரிலும் தரம் சரிபார்க்கப்படுகிறது" },
];

const trustTags = [
  { icon: <TbTruckDelivery size={15} />, label: "இலவச டெலிவரி" },
  { icon: <FaShieldAlt size={13} />,     label: "COD கிடைக்கும்" },
  { icon: <TbRefresh size={15} />,       label: "எளிய திரும்பப்பெறல்" },
  { icon: <FaLeaf size={13} />,          label: "100% இயற்கை" },
];

const accordionData = [
  {
    title: "நாபி அமிர்த் ஏன்?",
    content:
      "பண்டைய ஆயுர்வேத நாபி சிகிச்சையில் வேரூன்றிய, இது சிறப்பாக உருவாக்கப்பட்ட மூலிகை எண்ணெய்.\n\nஓமம், பெருங்காயம், இஞ்சி, துளசி மற்றும் மல்காங்கனி போன்ற சக்திவாய்ந்த மூலிகைகளால் செறிவூட்டப்பட்டுள்ளது.\n\nபலன்: இலகுவான உடல், தெளிவான சருமம் மற்றும் சமநிலையான ஒட்டுமொத்த ஆரோக்கியம்.",
  },
  {
    title: "எவ்வாறு பயன்படுத்துவது",
    content:
      "இரவில் தூங்குவதற்கு முன் நாபியில் 2-3 சொட்டுகள் போடுங்கள்.\n\nவலஞ்சுழி வட்ட இயக்கத்தில் மசாஜ் செய்யுங்கள்.\n\nமறுநாள் காலையில் எழுந்ததும் நாபியை சுத்தம் செய்யுங்கள்.",
  },
  {
    title: "முக்கியமான முன்னெச்சரிக்கைகள்",
    content:
      "பயன்படுத்துவதற்கு முன் 20 நிமிட பேட்ச் டெஸ்ட் செய்யுங்கள்.\n\nஏதேனும் எரிச்சல் ஏற்பட்டால் மருத்துவரை அணுகவும்.\n\nகர்ப்ப காலம் மற்றும் தாய்ப்பால் கொடுக்கும் காலத்தில் பயன்படுத்த வேண்டாம்.",
  },
];

const howToUseImages = [
  { url: "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=step1tamil.webp&version_id=null" },
  { url: "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=step2tamil.webp&version_id=null" },
  { url: "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=step3tamil.webp&version_id=null" },
  { url: "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=step4tamil.webp&version_id=null" },
];

const benefitsCarouselImages = [
  { url: "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=hindtamil.webp&version_id=null" },
  { url: "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=triphalatamil.webp&version_id=null" },
  { url: "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=amlatamil.webp&version_id=null" },
  { url: "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=adraktamil.webp&version_id=null" },
];

const bloatSection = {
  title:    "வீக்கமற்ற வயிறு",
  body1:    "உடலின் இயற்கையான செரிமான சமநிலைக்கு ஆதரவளிப்பதன் மூலம் அசௌகரியமான வீக்கத்தை குறைக்க உதவுகிறது.",
  body2:    "தொடர்ந்து பயன்படுத்தினால், உங்கள் வயிறு நாள் முழுவதும் இலகுவாகவும் சீராகவும் மிகவும் வசதியாகவும் உணரலாம்.",
  videoSrc: "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=nabhi.mp4&version_id=null",
};

const balanceSection = {
  title:    "நாபியிலிருந்து சமநிலை பாய்கிறது",
  body1:    "ஆயுர்வேதத்தில், <strong>நாபி</strong> உடலின் உள் சமநிலை மற்றும் ஆற்றல் ஓட்டத்தின் மையமாக கருதப்படுகிறது.",
  body2:    "நாபி அமிர்த்தால் நாபிக்கு ஊட்டமளிப்பதன் மூலம், உடலின் இயற்கையான இசைவுக்கு ஆதரவளிக்கிறீர்கள்.",
  videoSrc: "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=amrit.mp4&version_id=null",
};

const heroBannerSection = {
  title: "நாபி அமிர்த் சடங்கு",
  body:  "வீக்கம், சரும முகப்பரு, மெதுவான வளர்சிதை மாற்றம் மற்றும் மூட்டு அசௌகரியம் போன்ற பல சிக்கல்கள் உடலின் உள் சமநிலை சீர்கெடும்போது தொடங்குகின்றன.",
  stats: [
    { num: "10,000+", label: "மகிழ்ச்சியான வாடிக்கையாளர்கள்" },
    { num: "4.62",    label: "சராசரி மதிப்பீடு" },
    { num: "189",     label: "சரிபார்க்கப்பட்ட மதிப்புரைகள்" },
    { num: "100%",    label: "ஆயுர்வேதம்" },
  ],
};

const ritualSection = {
  title:    "நாபி சிகிச்சை எவ்வாறு செயல்படுகிறது",
  subtitle: "பண்டைய ஆயுர்வேத ஞானத்தில் வேரூன்றிய, நாபி ஆயிரக்கணக்கான ஆற்றல் சேனல்களை இணைக்கும் உடலின் மையம்.",
  items: [
    { icon: <GiHerbsBundle size={22} color="#2d5a27" />, title: "பாரம்பரிய மூலிகை சாறுகள்",    desc: "மெதுவான ஆயுர்வேத பிரித்தெடுத்தல் செயல்முறை மூலம் தயாரிக்கப்படுகிறது." },
    { icon: <GiMeditation  size={22} color="#2d5a27" />, title: "மணிபூர சக்கர சமநிலை",         desc: "நாபி மணிபூர சக்கரத்தின் மையம் — உடலின் உயிர்சக்தி மற்றும் உள் சமநிலையின் ஆற்றல் மையம்." },
    { icon: <GiDroplets    size={22} color="#2d5a27" />, title: "ஆழமான நாபி உறிஞ்சுதல்",       desc: "நாபி பகுதியில் பல நரம்பு முனைகள் உள்ளன." },
    { icon: <GiHealing     size={22} color="#2d5a27" />, title: "உள் சமநிலையை மீட்டெடுக்கிறது", desc: "இயற்கையான நச்சு நீக்கத்திற்கு ஆதரவளிக்கிறது மற்றும் வீக்கத்தை குறைக்க உதவுகிறது." },
  ],
};

const whyUsSection = {
  title:    "எங்களை ஏன் தேர்வு செய்ய வேண்டும்?",
  subtitle: "இந்தியா முழுவதும் 10,000க்கும் அதிகமான வாடிக்கையாளர்களால் நம்பப்படுகிறது, இயற்கையின் சிறந்த பொருட்களிலிருந்து தயாரிக்கப்படுகிறது.",
  items: [
    { icon: <GiDroplets     size={28} color="#2d5a27" />, title: "ஆழமான நாபி சிகிச்சை",        desc: "நாபி தடவுவதற்காக சிறப்பாக தயாரிக்கப்பட்டது, பண்டைய பேக்கோட்டி முறை மூலம் ஆழமான உறிஞ்சுதலுடன்." },
    { icon: <FaLeaf         size={26} color="#2d5a27" />, title: "100% ஆயுர்வேதம்",            desc: "காலத்தால் சோதிக்கப்பட்ட ஆயுர்வேத மூலிகைகளால் தயாரிக்கப்பட்டது, ரசாயனங்கள் மற்றும் பாராபென்கள் இல்லாதது." },
    { icon: <HiSparkles     size={26} color="#2d5a27" />, title: "முழுமையான ஆரோக்கியம்",       desc: "செரிமானம், மூட்டுகள், ஹார்மோன் சமநிலை மற்றும் ஒட்டுமொத்த உயிர்சக்திக்கு ஆதரவளிக்கிறது." },
    { icon: <FaHandSparkles size={26} color="#2d5a27" />, title: "எளிய & பாதுகாப்பான வழக்கம்", desc: "படுக்கை நேரத்தில் வெறும் 2-3 சொட்டுகள் — மசாஜ் வேண்டாம், தொந்தரவு இல்லை." },
  ],
};

const greenMarqueeItems = [
  { icon: <GiDroplets     size={13} />, text: "குடல் சுத்திகரிப்பு" },
  { icon: <GiMeditation   size={13} />, text: "இலகுவான வயிறு" },
  { icon: <HiSparkles     size={13} />, text: "தெளிவான சருமம்" },
  { icon: <FaHandSparkles size={13} />, text: "சமநிலையான ஆரோக்கியம்" },
];

const reviews = {
  items: [
    { id: 1, name: "மீனல் ஷா",       rating: 5, body: "பயன்படுத்துவது மிகவும் எளிதானது. ஒரு வாரத்திலேயே மாற்றம் தெரிந்தது.",                           date: "02/07/2026", image: "/NabhiReviewImg/abhi.jpg", likes: 3 },
    { id: 2, name: "ஹரீஷ் அய்யர்",   rating: 5, body: "இதன் வாசனை மிகவும் லேசாகவும் அமைதியாகவும் இருக்கிறது.",                                           date: "01/19/2026", image: null,                     likes: 2 },
    { id: 3, name: "ஆயிஷா நூர்",     rating: 4, body: "என் ஆரோக்கிய வழக்கத்திற்கு நல்ல கூடுதல். சருமம் மிருதுவாக உணர்கிறது.",                           date: "03/02/2026", image: null,                     likes: 4 },
    { id: 4, name: "நிதின் பன்சல்",  rating: 5, body: "செரிமானத்திற்கு நன்றாக செயல்படும் சிறந்த பாரம்பரிய ஆயுர்வேத தீர்வு.",                             date: "12/28/2025", image: null,                     likes: 1 },
    { id: 5, name: "பிரியா சர்மா",   rating: 5, body: "உடல் உண்மையிலேயே மிகவும் இலகுவாக உணர்கிறது மற்றும் சருமமும் சிறிது தெளிவாகிறது.",               date: "03/21/2026", image: "/NabhiReviewImg/g2.jpg",  likes: 2 },
  ],
  photos: [
    "/NabhiReviewImg/photo1.webp",
    "/NabhiReviewImg/photo2.webp",
    "/NabhiReviewImg/photo3.webp",
    "/NabhiReviewImg/photo4.webp",
    "/NabhiReviewImg/photo5.webp",
  ],
  photoReviewers: [
    { name: "மீனல் ஷா",     initials: "மீ",  rating: 5, body: "மிகவும் அழகான பேக்கேஜிங்",       likes: 4, date: "02/07/2026" },
    { name: "பிரியா சர்மா", initials: "பி",  rating: 5, body: "மிகவும் நல்லது மற்றும் பயனுள்ளது", likes: 2, date: "03/21/2026" },
  ],
};

export const nabhiAmritTamilConfig = {
  product, variants, images, upiIcons, marqueeItems, trustTags, accordionData,
  howToUseImages, benefitsCarouselImages, bloatSection, balanceSection,
  heroBannerSection, ritualSection, whyUsSection, greenMarqueeItems, reviews,
};