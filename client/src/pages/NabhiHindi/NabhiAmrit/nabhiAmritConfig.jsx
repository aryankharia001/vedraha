import React from "react";
import { GiHerbsBundle, GiMeditation, GiDroplets, GiHealing } from "react-icons/gi";
import { FaLeaf, FaShieldAlt, FaHandSparkles } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { TbTruckDelivery, TbRefresh } from "react-icons/tb";

// ─── Product metadata ─────────────────────────────────────────────────────────
const product = {
  id:             "nabhi-amrit",
  name:           "नाभि अमृत",
  tagline:        "आयुर्वेदिक नाभि तेल",
  image:          "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=ChatGPT%20Image%20Apr%2017%2C%202026%2C%2003_39_36%20PM%201.png&version_id=null",
  subtitle:       "प्राचीन आयुर्वेदिक फॉर्मूला",
  h1:             "नाभि अमृत - पाचन और डिटॉक्स के लिए नाभि तेल",
  reviewSummary:  "4.62 · 189 सत्यापित समीक्षाएं",
  paymentImage:   "/NabhiImg/allpayment.png",
  logoImage:      "/NabhiLogo/nabhiLogo.png",
  brandName:      "होम विद केयर · वेद संजीवनी",
  contactEmail:   "akravipvtltd@gmail.com",
  whatsappNumber: "919717143189",
  whatsappMessage:"Hi, I'm interested in Nabhi Amrit",
  fbPixelId:      "1622075442328928",
  cartStorageKey: "exclusiveCart",
  themeColor:     "#2e5b33",
};

// ─── Variants ─────────────────────────────────────────────────────────────────
const variants = [
  { id: 1, label: "1 बोतल खरीदें", price: "₹499",   priceNum: 499,  mrp: 999, badge: null,          externalVariantId: 477155136897430592 },
  { id: 2, label: "2 बोतल खरीदें", price: "₹699", priceNum: 699,           badge: "₹300 बचाएं",   externalVariantId: 477155162130363456 },
  { id: 3, label: "3 बोतल खरीदें", price: "₹999", priceNum: 999,           badge: "₹500 बचाएं",  externalVariantId: 477155176089007168 },
];



const reviewPhotos = [
  "/NabhiReviewImg/photo1.webp",
  "/NabhiReviewImg/photo2.webp",
  "/NabhiReviewImg/photo3.webp",
  "/NabhiReviewImg/photo4.webp",
  "/NabhiReviewImg/photo5.webp",
];

// ─── Gallery images ───────────────────────────────────────────────────────────
const images = [
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=3e_V1.jpg&version_id=null",
  { type: "video", src: "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=nabhi.mp4&version_id=null", poster: "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=Screenshot%202026-04-30%20at%205.44.14%E2%80%AFPM-optimized.webp&version_id=null" },
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=1q_V1.jpg&version_id=null",
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=2d_V1.jpg&version_id=null",
  "/NabhiImg/amrit1.png",
  "/NabhiImg/amrit4.png",
  "/NabhiImg/amrit5.png",
];

// ─── UPI icons ────────────────────────────────────────────────────────────────
const upiIcons = [
  { src: "https://img.icons8.com/?size=100&id=am4ltuIYDpQ5&format=png&color=000000", alt: "GPay",    zIndex: 10 },
  { src: "https://img.icons8.com/?size=100&id=OYtBxIlJwMGA&format=png&color=000000", alt: "PhonePe", zIndex: 20 },
  { src: "https://img.icons8.com/?size=100&id=68067&format=png&color=000000",        alt: "Paytm",   zIndex: 30 },
];

// ─── Marquee ──────────────────────────────────────────────────────────────────
const marqueeItems = [
  { text: "मुफ्त शिपिंग" },
  { text: "10,000+ खुश ग्राहक" },
  { text: "कैश ऑन डिलीवरी (COD)" },
  { text: "100% आयुर्वेदिक" },
  { text: "हर ऑर्डर की गुणवत्ता जांची जाती है" },
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
    title: "नाभि अमृत क्यों?",
    content:
      "प्राचीन आयुर्वेदिक नाभि चिकित्सा में निहित, यह एक विशेष रूप से तैयार हर्बल तेल है।\n\nअजवाइन, हींग, अदरक, तुलसी और मलकांगनी जैसी शक्तिशाली जड़ी-बूटियों से युक्त।\n\nपरिणाम: हल्का शरीर, साफ त्वचा और संतुलित समग्र वेलनेस।",
  },
  {
    title: "कैसे उपयोग करें",
    content:
      "रात को सोने से पहले 2-3 बूंदें नाभि में डालें।\n\nदक्षिणावर्त गोलाकार गति में मालिश करें।\n\nसुबह उठकर नाभि साफ कर लें।",
  },
  {
    title: "विशेष ध्यान दें",
    content:
      "उपयोग से पहले 20 मिनट का पैच टेस्ट करें।\n\nजलन होने पर डॉक्टर से परामर्श लें।\n\nगर्भावस्था या स्तनपान के दौरान उपयोग न करें।",
  },
];

// ─── How to Use carousel ──────────────────────────────────────────────────────
const howToUseImages = [
  { url: "/NabhiImg/step1.png" },
  { url: "/NabhiImg/step2.png" },
  { url: "/NabhiImg/step3.png" },
  { url: "/NabhiImg/step4.png" },
];

// ─── Benefits / ingredient carousel ──────────────────────────────────────────
const benefitsCarouselImages = [
  { url: "/NabhiImg/hing.png" },
  { url: "/NabhiImg/adrak.png" },
  { url: "/NabhiImg/ajwain.png" },
  { url: "/NabhiImg/trifla.png" },
];

// ─── Below-fold section data ──────────────────────────────────────────────────
const bloatSection = {
  title:    "सूजन-मुक्त पेट",
  body1:    "शरीर की प्राकृतिक पाचन संतुलन को सहयोग देकर असुविधाजनक सूजन को कम करने में मदद करता है।",
  body2:    "नियमित उपयोग से आपका पेट दिनभर हल्का, सपाट और अधिक आरामदायक महसूस हो सकता है।",
  videoSrc: "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=nabhi.mp4&version_id=null",
};

const balanceSection = {
  title:    "नाभि से बहता है संतुलन",
  body1:    "आयुर्वेद में, <strong>नाभि</strong> को शरीर के आंतरिक संतुलन और ऊर्जा प्रवाह का केंद्र माना जाता है।",
  body2:    "नाभि अमृत से नाभि को पोषण देकर, आप शरीर की प्राकृतिक सामंजस्य को सहयोग देते हैं।",
  videoSrc: "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=amrit.mp4&version_id=null",
};

const heroBannerSection = {
  title: "नाभि अमृत का अनुष्ठान",
  body:  "सूजन, त्वचा पर दाने, धीमा चयापचय और जोड़ों की तकलीफ जैसी कई समस्याएं तब शुरू होती हैं जब शरीर का आंतरिक संतुलन बिगड़ जाता है।",
  stats: [
    { num: "10,000+", label: "खुश ग्राहक" },
    { num: "4.62",    label: "औसत रेटिंग" },
    { num: "189",     label: "सत्यापित समीक्षाएं" },
    { num: "100%",    label: "आयुर्वेदिक" },
  ],
};

const ritualSection = {
  title:    "नाभि चिकित्सा कैसे काम करती है",
  subtitle: "प्राचीन आयुर्वेदिक ज्ञान में निहित, नाभि हजारों ऊर्जा चैनलों को जोड़ने वाला शरीर का केंद्र है।",
  items: [
    { icon: <GiHerbsBundle size={22} color="#2d5a27" />, title: "पारंपरिक हर्बल अर्क",        desc: "धीमी आयुर्वेदिक अर्क प्रक्रिया से तैयार।" },
    { icon: <GiMeditation  size={22} color="#2d5a27" />, title: "मणिपुर चक्र संतुलन",         desc: "नाभि मणिपुर चक्र का केंद्र है — शरीर की जीवन शक्ति और आंतरिक संतुलन का ऊर्जा केंद्र।" },
    { icon: <GiDroplets    size={22} color="#2d5a27" />, title: "गहरी नाभि अवशोषण",           desc: "नाभि क्षेत्र में कई तंत्रिका अंत होते हैं।" },
    { icon: <GiHealing     size={22} color="#2d5a27" />, title: "आंतरिक संतुलन बहाल करता है", desc: "प्राकृतिक डिटॉक्सीफिकेशन में सहयोग करता है, सूजन कम करता है।" },
  ],
};

const whyUsSection = {
  title:    "हमें क्यों चुनें?",
  subtitle: "भारत भर में 10,000 से अधिक ग्राहकों का भरोसा, प्रकृति की बेहतरीन सामग्रियों से तैयार।",
  items: [
    { icon: <GiDroplets     size={28} color="#2d5a27" />, title: "गहरी नाभि चिकित्सा",        desc: "नाभि पर लगाने के लिए विशेष रूप से बनाया गया, प्राचीन पेचोटी विधि से गहरा अवशोषण।" },
    { icon: <FaLeaf         size={26} color="#2d5a27" />, title: "100% आयुर्वेदिक",           desc: "समय-परीक्षित आयुर्वेदिक जड़ी-बूटियों से बना, रसायनों और पैराबेन से मुक्त।" },
    { icon: <HiSparkles     size={26} color="#2d5a27" />, title: "सर्वांगीण वेलनेस",           desc: "पाचन, जोड़ों, हार्मोनल संतुलन और समग्र जीवन शक्ति को सहयोग।" },
    { icon: <FaHandSparkles size={26} color="#2d5a27" />, title: "सरल और सुरक्षित दिनचर्या",  desc: "सोते समय बस 2-3 बूंदें — कोई मालिश नहीं, कोई झंझट नहीं।" },
  ],
};

const greenMarqueeItems = [
  { icon: <GiDroplets     size={13} />, text: "पेट की सफाई" },
  { icon: <GiMeditation   size={13} />, text: "हल्का पेट" },
  { icon: <HiSparkles     size={13} />, text: "साफ त्वचा" },
  { icon: <FaHandSparkles size={13} />, text: "संतुलित वेलनेस" },
];

// ─── Reviews ──────────────────────────────────────────────────────────────────
const reviews = {
  items: [
    { id: 1, name: "मीनल शाह",      rating: 5, body: "उपयोग करना बहुत आसान है। एक हफ्ते में फर्क महसूस हुआ।",                              date: "02/07/2026", image: "/NabhiReviewImg/abhi.jpg", likes: 3 },
    { id: 2, name: "हरीश अय्यर",    rating: 5, body: "इसकी खुशबू बहुत ही हल्की और सुकून देने वाली है।",                                    date: "01/19/2026", image: null,                     likes: 2 },
    { id: 3, name: "आयशा नूर",      rating: 4, body: "मेरी वेलनेस दिनचर्या में अच्छा जुड़ाव। त्वचा अधिक मुलायम लगती है।",                  date: "03/02/2026", image: null,                     likes: 4 },
    { id: 8, name: "वैष्णवी जोशी",  rating: 5, body: "10-12 दिन में ही स्किन साफ लगने लगी और एनर्जी भी बेहतर है।",                         date: "04/10/2026", image: "",                       likes: 4 },
    { id: 4, name: "नितिन बंसल",    rating: 5, body: "पाचन के लिए बेहतरीन काम करने वाला पारंपरिक आयुर्वेदिक उपाय।",                        date: "12/28/2025", image: null,                     likes: 1 },
    { id: 5, name: "इमरान खान",     rating: 5, body: "ये मेरे डेली रुटीन में शामिल हो गया है, स्किन सॉफ्ट लगती है।",                        date: "02/14/2026", image: null,                     likes: 5 },
    { id: 7, name: "समर दास",       rating: 4, body: "बहुत सिंपल रूटीन है बस 2 बूंद लगानी होती है।",                                        date: "04/01/2026", image: "/NabhiReviewImg/b1.jpg",  likes: 1 },
    { id: 6, name: "प्रिया शर्मा",  rating: 5, body: "सच में बॉडी काफी हल्की लगती है और स्किन भी थोड़ी क्लियर दिख रही है।",                date: "03/21/2026", image: "/NabhiReviewImg/g2.jpg",  likes: 2 },
    { id: 9, name: "सुहानी बनर्जी", rating: 5, body: "सुबह-शाम नाभि पर लगाती हूँ; अब यह मेरी आसान दिनचर्या बन गई है।",                    date: "04/15/2026", image: "/NabhiReviewImg/g1.jpg",  likes: 1 },
  ],
  photos: [
    "/NabhiReviewImg/photo1.webp",
    "/NabhiReviewImg/photo2.webp",
    "/NabhiReviewImg/photo3.webp",
    "/NabhiReviewImg/photo4.webp",
    "/NabhiReviewImg/photo5.webp",
  ],
  photoReviewers: [
    { name: "मीनल शाह",      initials: "मी",  rating: 5, body: "बहुत अच्छी पैकिंग की है",                                                    likes: 4, date: "02/07/2026" },
    { name: "प्रिया शर्मा",  initials: "प्र", rating: 5, body: "बहुत अच्छा और प्रभावी",                                                      likes: 2, date: "03/21/2026" },
    { name: "वैष्णवी जोशी",  initials: "वै",  rating: 5, body: "10-12 दिन में स्किन साफ लगने लगी और एनर्जी भी बेहतर है।",                   likes: 4, date: "04/10/2026" },
    { name: "सुहानी बनर्जी", initials: "सु",  rating: 5, body: "10 दिन में स्किन साफ, एनर्जी बेहतर",                                         likes: 1, date: "04/15/2026" },
    { name: "समर दास",       initials: "स",   rating: 4, body: "बहुत सिंपल रूटीन है बस 2 बूंद लगानी होती है।",                               likes: 1, date: "04/01/2026" },
  ],
};

// ─── Final config export ──────────────────────────────────────────────────────
export const nabhiAmritConfig = {
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
  reviewPhotos,
};