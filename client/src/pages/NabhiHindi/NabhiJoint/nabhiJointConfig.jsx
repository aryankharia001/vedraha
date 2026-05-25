import React from "react";
import { GiHerbsBundle, GiMeditation, GiDroplets, GiHealing, GiKneeBandage } from "react-icons/gi";
import { FaLeaf, FaShieldAlt } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { TbTruckDelivery, TbRefresh } from "react-icons/tb";

// ─── Product metadata ─────────────────────────────────────────────────────────
const product = {
  id:             "joint-pain-nabhi-oil",
  name:           "जॉइंट पेन रेमेडी नाभि तेल",
  tagline:        "आयुर्वेदिक नाभि चिकित्सा",
  image:          "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=Gemini_Generated_Image_jejzeajejzeajejz.png.webp&version_id=null",
  subtitle:       "आयुर्वेदिक नाभि चिकित्सा",
  h1:             "जॉइंट पेन रेमेडी नाभि तेल – घुटने और कमर दर्द से राहत",
  reviewSummary:  "4.46 · 287 सत्यापित समीक्षाएँ",
  paymentImage:   null,
  logoImage:      "/NabhiLogo/nabhiLogo.png",
  brandName:      "होम विद केयर · वेद संजीवनी",
  contactEmail:   "akravipvtltd@gmail.com",
  whatsappNumber: "919717143189",
  whatsappMessage:"Hi, I'm interested in Joint Pain Nabhi Oil",
  fbPixelId:      "1622075442328928",
  cartStorageKey: "exclusiveCart",
  themeColor:     "#2e5b33",
};

// ─── Variants ─────────────────────────────────────────────────────────────────
const variants = [
  { id: 1, label: "1 बोतल खरीदें",                 price: "₹549", priceNum: 549, mrp: 699,  badge: null,          externalVariantId: 477155402648532032 },
  { id: 2, label: "2 बोतल खरीदें – ₹100 की छूट",  price: "₹899", priceNum: 899, mrp: 1198, badge: "₹299 बचाएँ",  externalVariantId: 477155416070304832 },
];

// ─── Gallery images ───────────────────────────────────────────────────────────
const images = [
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=Gemini_Generated_Image_io9cidio9cidio9c-1.png.webp&version_id=null",
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=Gemini_Generated_Image_b1ri32b1ri32b1ri.png.webp&version_id=null",
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=Gemini_Generated_Image_jejzeajejzeajejz.png.webp&version_id=null",
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=Gemini_Generated_Image_3y48f93y48f93y48.png.webp&version_id=null",
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

// ─── Accordion (FAQ) ──────────────────────────────────────────────────────────
const accordionData = [
  {
    title: "जॉइंट पेन रेमेडी नाभि तेल क्यों चुनें",
    content:
      "अकड़न को दूर करें, दर्द से राहत पाएँ और अपनी प्राकृतिक लचीलापन वापस पाएँ—पूरी तरह प्राकृतिक तरीके से।\n\nमुख्य लाभ:\n• जोड़ों के दर्द और अकड़न से राहत\n• सूजन और जलन कम करे\n• लचीलापन और गतिशीलता सुधारे\n• हड्डी और जोड़ों के स्वास्थ्य को सहारा दे",
  },
  {
    title: "उपयोग कैसे करें",
    content:
      "रात को सोने से पहले 2–3 बूँदें नाभि में डालें।\n\n1–2 मिनट तक गोलाकार दक्षिणावर्त दिशा में धीरे-धीरे मालिश करें।\n\nसर्वोत्तम परिणामों के लिए हर रात नियमित रूप से उपयोग करें।",
  },
  {
    title: "विशेष सूचना",
    content:
      "केवल बाहरी उपयोग के लिए।\n\nपहले उपयोग से पहले 20 मिनट के लिए पैच टेस्ट करें।\n\nगर्भावस्था या स्तनपान के दौरान उपयोग न करें।",
  },
];

// ─── How to Use carousel ──────────────────────────────────────────────────────
// Joint product uses product images as the how-to carousel
const howToUseImages = [
  { url: "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=Gemini_Generated_Image_io9cidio9cidio9c-1.png.webp&version_id=null" },
  { url: "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=Gemini_Generated_Image_b1ri32b1ri32b1ri.png.webp&version_id=null" },
  { url: "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=Gemini_Generated_Image_3y48f93y48f93y48.png.webp&version_id=null" },
  { url: "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=Gemini_Generated_Image_jejzeajejzeajejz.png.webp&version_id=null" },
];

// ─── Benefits carousel ────────────────────────────────────────────────────────
const benefitsCarouselImages = [
  { url: "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=Gemini_Generated_Image_jejzeajejzeajejz.png.webp&version_id=null" },
  { url: "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=Gemini_Generated_Image_io9cidio9cidio9c-1.png.webp&version_id=null" },
  { url: "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=Gemini_Generated_Image_b1ri32b1ri32b1ri.png.webp&version_id=null" },
  { url: "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=Gemini_Generated_Image_3y48f93y48f93y48.png.webp&version_id=null" },
];

// ─── Bloat / Feature section ──────────────────────────────────────────────────
const bloatSection = {
  title:    "दर्दमुक्त सुबह",
  body1:    "घुटनों, कूल्हों और कमर में सुबह की अकड़न 40 से अधिक उम्र के लोगों की सबसे आम शिकायत है। जॉइंट पेन रेमेडी नाभि तेल रात में काम करता है—सोने से पहले लगाएँ ताकि जड़ी-बूटियाँ आराम के दौरान गहराई तक अवशोषित हों।",
  body2:    "नियमित उपयोग के साथ, कई ग्राहक बताते हैं कि वे काफी कम अकड़न के साथ उठते हैं।",
  imageSrc: "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=Gemini_Generated_Image_jejzeajejzeajejz.png.webp&version_id=null",
};



// ─── Balance / second feature section ────────────────────────────────────────
const balanceSection = {
  title:    "नाभि से बहती है उपचार की शक्ति",
  body1:    "आयुर्वेद में, <strong>नाभि</strong> शरीर का प्रमुख ऊर्जा केंद्र है, जो जोड़ों के स्वास्थ्य, सूजन के स्तर और समग्र जीवनशक्ति को प्रभावित करने वाले हज़ारों सूक्ष्म चैनलों से जुड़ा है।",
  body2:    "इस विशेष रूप से तैयार आयुर्वेदिक तेल से नाभि का पोषण करके, आप आंतरिक संतुलन बहाल करने में मदद करते हैं।",
  videoSrc: false,
  imageSrc: "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=Gemini_Generated_Image_3y48f93y48f93y48.png.webp&version_id=null",
};

// ─── Hero banner ──────────────────────────────────────────────────────────────
const heroBannerSection = {
  title: "प्राचीन नाभि दर्द निवारण अनुष्ठान",
  body:  "जोड़ों का दर्द, अकड़न और सूजन अक्सर खराब रक्त संचार और आंतरिक सूजन के कारण होती है। जॉइंट पेन रेमेडी नाभि तेल सीधे नाभि पर लगाया जाता है, जहाँ यह हज़ारों तंत्रिका चैनलों के ज़रिए अवशोषित होता है।",
  stats: [
    { num: "5,000+", label: "खुश ग्राहक" },
    { num: "4.46",   label: "औसत रेटिंग" },
    { num: "287",    label: "सत्यापित समीक्षाएँ" },
    { num: "100%",   label: "आयुर्वेदिक" },
  ],
};

const reviewPhotos = [
  
];

// ─── Ritual / How it works ────────────────────────────────────────────────────
const ritualSection = {
  title:    "नाभि चिकित्सा जोड़ों के दर्द को कैसे दूर करती है",
  subtitle: "प्राचीन आयुर्वेदिक ज्ञान में जड़ा हुआ—नाभि केंद्र हज़ारों ऊर्जा चैनलों के ज़रिए हर जोड़ और अंग से जुड़ा है।",
  items: [
    { icon: <GiHerbsBundle size={22} color="#2d5a27" />, title: "शक्तिशाली हर्बल मिश्रण",       desc: "अजवाइन, हींग, अदरक और अन्य आयुर्वेदिक जड़ी-बूटियों से युक्त—जोड़ों के स्वास्थ्य के लिए पूर्ण चिकित्सीय शक्ति निकालने हेतु धीमी आंच पर तैयार।" },
    { icon: <GiMeditation  size={22} color="#2d5a27" />, title: "नाभि ऊर्जा केंद्र",             desc: "नाभि शरीर का प्रमुख ऊर्जा केंद्र है जो हज़ारों नसों से जुड़ा है। नाभि चिकित्सा इस शक्तिशाली केंद्र के ज़रिए हर्बल लाभ पहुँचाती है।" },
    { icon: <GiDroplets    size={22} color="#2d5a27" />, title: "गहरा ट्रांसडर्मल अवशोषण",      desc: "नाभि क्षेत्र तंत्रिका अंत और सूक्ष्म रक्त वाहिकाओं से भरपूर है। यहाँ लगाए गए तेल तेज़ी से अवशोषित होते हैं।" },
    { icon: <GiHealing     size={22} color="#2d5a27" />, title: "जोड़ों का संतुलन बहाल करे",    desc: "सूजन को प्राकृतिक रूप से कम करने में सहायता करता है और नियमित रात्रि उपयोग से बेहतर लचीलापन बढ़ावा देता है।" },
  ],
};

// ─── Why Us ───────────────────────────────────────────────────────────────────
const whyUsSection = {
  title:    "जॉइंट पेन रेमेडी क्यों चुनें?",
  subtitle: "प्राकृतिक जोड़ों के आराम के लिए भारत भर में हज़ारों लोगों का विश्वास।",
  items: [
    { icon: <GiKneeBandage size={28} color="#2d5a27" />, title: "जोड़ों के दर्द और अकड़न से राहत", desc: "नाभि के ऊर्जा चैनलों के ज़रिए जोड़ों की परेशानी की जड़ तक पहुँचता है—घुटनों, कमर और कूल्हों की अकड़न को प्राकृतिक तरीके से दूर करता है।" },
    { icon: <FaLeaf        size={26} color="#2d5a27" />, title: "100% आयुर्वेदिक जड़ी-बूटियाँ",   desc: "अजवाइन, हींग, अदरक और अन्य समय-परीक्षित जड़ी-बूटियों से बना—रसायनों, पैराबेन और खनिज तेलों से मुक्त।" },
    { icon: <HiSparkles    size={26} color="#2d5a27" />, title: "सूजन को कम करे",                  desc: "सुखदायक हर्बल मिश्रण जोड़ों के आसपास की सूजन और जलन को शांत करने में मदद करता है।" },
    { icon: <FaLeaf        size={26} color="#2d5a27" />, title: "सरल रात्रि अनुष्ठान",             desc: "सोने से पहले नाभि में बस 2–3 बूँदें—कोई झंझट नहीं। एक आसान आयुर्वेदिक दिनचर्या जो आराम करते समय काम करती है।" },
  ],
};

// ─── Green marquee ────────────────────────────────────────────────────────────
const greenMarqueeItems = [
  { icon: <FaLeaf size={13} />, text: "जोड़ों का दर्द दूर करें" },
  { icon: <FaLeaf size={13} />, text: "अकड़न से मुक्ति पाएँ" },
  { icon: <FaLeaf size={13} />, text: "लचीलापन वापस पाएँ" },
  { icon: <FaLeaf size={13} />, text: "फिर से स्वतंत्र रूप से चलें" },
];

// ─── Reviews ──────────────────────────────────────────────────────────────────
const reviews = {
  items: [
    { id: 1, name: "रमेश गुप्ता",    rating: 5, body: "3 हफ्तों से उपयोग कर रहा हूँ। सुबह घुटनों की अकड़न में काफी कमी आई है।",                              date: "03/12/2026", image: null, likes: 4 },
    { id: 2, name: "सुनीता वर्मा",   rating: 5, body: "मैं वर्षों से कमर दर्द से परेशान थी। नाभि पर यह तेल लगाने से मुझे स्पष्ट आराम मिला है।",             date: "02/28/2026", image: null, likes: 6 },
    { id: 3, name: "अरुण मिश्रा",    rating: 4, body: "हर्बल फॉर्मूलेशन असली लगता है। 2 हफ्तों के उपयोग के बाद जोड़ ज़्यादा लचीले महसूस होते हैं।",         date: "03/18/2026", image: null, likes: 3 },
    { id: 4, name: "फातिमा अंसारी",  rating: 5, body: "मेरी माँ को गठिया है। उन्होंने यह लगाया और कहती हैं कि उंगलियों की सूजन कम हुई है।",                  date: "01/30/2026", image: null, likes: 7 },
    { id: 5, name: "दीपक शर्मा",     rating: 5, body: "सोने से पहले बस कुछ बूँदें। सुबह जोड़ों की अकड़न के बिना हल्का महसूस होता है।",                       date: "02/15/2026", image: null, likes: 5 },
    { id: 6, name: "प्रीति नायर",    rating: 4, body: "जड़ी-बूटियों की असली महक। लगाने के बाद गर्माहट महसूस होती है।",                                       date: "03/05/2026", image: null, likes: 2 },
  ],
  photos: [],
  photoReviewers: [],
};

// ─── Final config export ──────────────────────────────────────────────────────
export const nabhiJointConfig = {
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
  greenMarqueeItems,
  reviews,
  reviewPhotos
};