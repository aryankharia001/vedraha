// ─── Product ────────────────────────────────────────────────────────────────
export const PRODUCT = {
  id: "nabhi-amrit",
  name: "नाभि अमृत",
  tagline: "आयुर्वेदिक नाभि तेल",
  image:
    "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=ChatGPT%20Image%20Apr%2017%2C%202026%2C%2003_39_36%20PM%201.png&version_id=null",
};

export const CART_STORAGE_KEY = "exclusiveCart";

// ─── Variants ────────────────────────────────────────────────────────────────
export const variants = [
  { id: 1, label: "1 बोतल खरीदें", price: "₹899", priceNum: 899, mrp: 999, badge: null, externalVariantId: 477155136897430592 },
  { id: 2, label: "2 बोतल खरीदें", price: "₹1,499", priceNum: 1499, badge: "₹500 बचाएं", externalVariantId: 477155162130363456 },
  { id: 3, label: "3 बोतल खरीदें", price: "₹1,999", priceNum: 1999, badge: "₹1000 बचाएं", externalVariantId: 477155176089007168 },
];

// ─── Reviews ─────────────────────────────────────────────────────────────────
export const allReviews = [
  { id: 1, name: "मीनल शाह", rating: 5, body: "उपयोग करना और मालिश करना बहुत आसान है। एक हफ्ते में फर्क महसूस हुआ।", date: "02/07/2026", image: "/NabhiReviewImg/abhi.jpg", likes: 3 },
  { id: 2, name: "हरीश अय्यर", rating: 5, body: "इसकी खुशबू बहुत ही हल्की और सुकून देने वाली है ज्यादा तेज भी नही है", date: "01/19/2026", image: null, likes: 2 },
  { id: 3, name: "आयशा नूर", rating: 4, body: "मेरी वेलनेस दिनचर्या में अच्छा जुड़ाव। त्वचा अधिक मुलायम लगती है।", date: "03/02/2026", image: null, likes: 4 },
  { id: 8, name: "वैष्णवी जोशी", rating: 5, body: "शुरू में ज्यादा उम्मीद नहीं थी, लेकिन 10-12 दिन में ही स्किन साफ लगने लगी और एनर्जी भी बेहतर है।", date: "04/10/2026", image: "", likes: 4 },
  { id: 4, name: "नितिन बंसल", rating: 5, body: "पाचन के लिए बेहतरीन काम करने वाला पारंपरिक आयुर्वेदिक उपाय।", date: "12/28/2025", image: null, likes: 1 },
  { id: 5, name: "इमरान खान", rating: 5, body: "ये मेरे डेली रुटीन में शामिल हो गया है स्किन सॉफ्ट लगती है और हल्का सा ग्लो भी दिख रहा है।", date: "02/14/2026", image: null, likes: 5 },
  { id: 7, name: "समर दास", rating: 4, body: "बहुत सिंपल रूटीन है बस 2 बूंद लगानी होती है धीरे-धीरे फर्क दिखने लगा है", date: "04/01/2026", image: "/NabhiReviewImg/b1.jpg", likes: 1 },
  { id: 6, name: "प्रिया शर्मा", rating: 5, body: "मैं पिछले 2 हफ्तों से नाभि अमृत तेल यूज़ कर रही हूँ सच में बॉडी काफी हल्की लगती है और स्किन भी थोड़ी क्लियर दिख रही है", date: "03/21/2026", image: "/NabhiReviewImg/g2.jpg", likes: 2 },
  { id: 9, name: "सुहानी बनर्जी", rating: 5, body: "सुबह-शाम नाभि पर लगाती हूँ; अब यह मेरी आसान दिनचर्या बन गई है।", date: "04/15/2026", image: "/NabhiReviewImg/g1.jpg", likes: 1 },
];

export const reviewPhotos = [
  "/NabhiReviewImg/photo1.webp",
  "/NabhiReviewImg/photo2.webp",
  "/NabhiReviewImg/photo3.webp",
  "/NabhiReviewImg/photo4.webp",
  "/NabhiReviewImg/photo5.webp",
];

export const photoReviewers = [
  { name: "मीनल शाह", initials: "मी", rating: 5, body: "बहुत अच्छी पैकिंग की है", likes: 4, date: "02/07/2026" },
  { name: "प्रिया शर्मा", initials: "प्र", rating: 5, body: "बहुत अच्छा और प्रभावी", likes: 2, date: "03/21/2026" },
  { name: "वैष्णवी जोशी", initials: "वै", rating: 5, body: "शुरू में ज्यादा उम्मीद नहीं थी, लेकिन 10-12 दिन में स्किन साफ लगने लगी और एनर्जी भी बेहतर है।", likes: 4, date: "04/10/2026" },
  { name: "सुहानी बनर्जी", initials: "सु", rating: 5, body: "10 दिन में स्किन साफ, एनर्जी बेहतर", likes: 1, date: "04/15/2026" },
  { name: "समर दास", initials: "स", rating: 4, body: "बहुत सिंपल रूटीन है  बस 2 बूंद लगानी होती है और धीरे-धीरे फर्क दिखने लगा है।", likes: 1, date: "04/01/2026" },
];

// ─── Static content ───────────────────────────────────────────────────────────
export const accordionData = [
  {
    title: "नाभि अमृत क्यों?",
    content:
      "प्राचीन आयुर्वेदिक नाभि चिकित्सा में निहित, धारा एक विशेष रूप से तैयार हर्बल तेल है जो नाभि केंद्र के माध्यम से शरीर को पोषण देने के लिए बनाया गया है।\n\nअजवाइन, हींग, अदरक, तुलसी और मलकांगनी जैसी शक्तिशाली जड़ी-बूटियों से युक्त यह तेल प्राकृतिक डिटॉक्सीफिकेशन को सहयोग देता है।\n\nपरिणाम: हल्का शरीर, साफ त्वचा और संतुलित समग्र वेलनेस।",
  },
  {
    title: "कैसे उपयोग करें",
    content:
      "रात को सोने से पहले नाभि अमृत तेल की 2-3 बूंदें अपनी नाभि में डालें।\n\nबेहतर परिणामों के लिए इसे दक्षिणावर्त गोलाकार गति में मालिश करके अवशोषित होने दें।\n\nसुबह उठकर अपनी नाभि को साफ कर लें।",
  },
  {
    title: "विशेष ध्यान दें",
    content:
      "उपयोग से पहले 20 मिनट का पैच टेस्ट करें।\n\nजलन होने पर अपने डॉक्टर से परामर्श लें।\n\nगर्भावस्था या स्तनपान के दौरान उपयोग न करें।",
  },
];

export const trustTags = [
  { label: "मुफ्त शिपिंग" },
  { label: "COD उपलब्ध" },
  { label: "आसान वापसी" },
  { label: "100% प्राकृतिक" },
];

export const marqueeItems = [
  { text: "मुफ्त शिपिंग" },
  { text: "10,000+ खुश ग्राहक" },
  { text: "कैश ऑन डिलीवरी (COD)" },
  { text: "100% आयुर्वेदिक" },
  { text: "हर ऑर्डर की गुणवत्ता जांची जाती है" },
];

export const CarousalItems = [
  { url: "/NabhiImg/step1.png" },
  { url: "/NabhiImg/step2.png" },
  { url: "/NabhiImg/step3.png" },
  { url: "/NabhiImg/step4.png" },
];

export const CarousalItems2 = [
  { url: "https://nabhitelam.com/cdn/shop/files/14.webp?v=1773385971&width=1600" },
  { url: "https://nabhitelam.com/cdn/shop/files/13.webp?v=1773386002&width=1600" },
  { url: "https://nabhitelam.com/cdn/shop/files/12.webp?v=1773386017&width=1600" },
  { url: "https://nabhitelam.com/cdn/shop/files/15.webp?v=1773386044&width=1600" },
  { url: "https://nabhitelam.com/cdn/shop/files/16.webp?v=1773386068&width=1600" },
];

export const CarousalItems3 = [
  { url: "/NabhiImg/hing.png" },
  { url: "/NabhiImg/adrak.png" },
  { url: "/NabhiImg/ajwain.png" },
  { url: "/NabhiImg/trifla.png" },
];

export const images = [
  "/NabhiImg/amrit1.png",
  { type: "video", src: "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=nabhi.mp4&version_id=null", poster: "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=Screenshot%202026-04-30%20at%205.44.14%E2%80%AFPM-optimized.webp&version_id=null" },
  "/NabhiImg/amrit3.png",
  "/NabhiImg/amrit4.png",
  "/NabhiImg/amrit5.png",
];

export const upiIcons = [
  { src: "https://img.icons8.com/?size=100&id=am4ltuIYDpQ5&format=png&color=000000", alt: "GPay", zIndex: 10 },
  { src: "https://img.icons8.com/?size=100&id=OYtBxIlJwMGA&format=png&color=000000", alt: "PhonePe", zIndex: 20 },
  { src: "https://img.icons8.com/?size=100&id=68067&format=png&color=000000", alt: "Paytm", zIndex: 30 },
];

export const generateOrderId = () => {
  const timePart = Date.now() % 10000;
  const randPart = Math.floor(Math.random() * 90) + 10;
  return String(timePart * 100 + randPart).padStart(6, "0");
};

export const loadCartFromStorage = () => {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveCartToStorage = (items) => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch {}
};
