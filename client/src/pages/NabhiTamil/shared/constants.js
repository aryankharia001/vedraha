// ─── Product ────────────────────────────────────────────────────────────────
export const PRODUCT = {
  id:         "nabhi-amrit",
  name:       "நாபி அமிர்த்",
  tagline:    "ஆயுர்வேத நாபி எண்ணெய்",
  image:
    "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=ChatGPT%20Image%20Apr%2017%2C%202026%2C%2003_39_36%20PM%201.png&version_id=null",
  fontFamily: "'Noto Sans Tamil', sans-serif",
};

export const CART_STORAGE_KEY = "exclusiveCart";

// ─── Variants ────────────────────────────────────────────────────────────────
export const variants = [
  { id: 1, label: "1 பாட்டில் வாங்கு",   price: "₹899",   priceNum: 899,  mrp: 999, badge: null,               externalVariantId: 477155136897430592 },
  { id: 2, label: "2 பாட்டில்கள் வாங்கு", price: "₹1,499", priceNum: 1499,           badge: "₹500 சேமிக்கவும்",  externalVariantId: 477155162130363456 },
  { id: 3, label: "3 பாட்டில்கள் வாங்கு", price: "₹1,999", priceNum: 1999,           badge: "₹1000 சேமிக்கவும்", externalVariantId: 477155176089007168 },
];

// ─── Reviews ─────────────────────────────────────────────────────────────────
export const allReviews = [
  { id: 1, name: "மீனல் ஷா",        rating: 5, body: "பயன்படுத்துவதும் மசாஜ் செய்வதும் மிகவும் எளிதானது. ஒரு வாரத்திலேயே மாற்றம் தெரிந்தது.",                                                        date: "02/07/2026", image: "/NabhiReviewImg/abhi.jpg", likes: 3 },
  { id: 2, name: "ஹரீஷ் அய்யர்",    rating: 5, body: "இதன் வாசனை மிகவும் லேசாகவும் அமைதியாகவும் இருக்கிறது, அறவே அதிகமாக இல்லை.",                                                                   date: "01/19/2026", image: null,                     likes: 2 },
  { id: 3, name: "ஆயிஷா நூர்",      rating: 4, body: "என் ஆரோக்கிய வழக்கத்திற்கு சிறந்த கூடுதல். சருமம் மிகவும் மிருதுவாக உணர்கிறது.",                                                               date: "03/02/2026", image: null,                     likes: 4 },
  { id: 8, name: "வைஷ்ணவி ஜோஷி",   rating: 5, body: "முதலில் அதிகம் எதிர்பார்க்கவில்லை, ஆனால் 10-12 நாட்களில் சருமம் தெளிவாக உணர ஆரம்பித்தது மற்றும் ஆற்றலும் மேம்பட்டது.",                      date: "04/10/2026", image: "",                       likes: 4 },
  { id: 4, name: "நிதின் பன்சல்",   rating: 5, body: "செரிமானத்திற்கு மிகவும் நன்றாக செயல்படும் சிறந்த பாரம்பரிய ஆயுர்வேத தீர்வு.",                                                                 date: "12/28/2025", image: null,                     likes: 1 },
  { id: 5, name: "இம்ரான் கான்",    rating: 5, body: "இது என் தினசரி வழக்கத்தின் ஒரு பகுதியாகிவிட்டது, சருமம் மிருதுவாக உணர்கிறது மற்றும் சிறிது பளபளப்பும் தெரிகிறது.",                            date: "02/14/2026", image: null,                     likes: 5 },
  { id: 7, name: "சமர் தாஸ்",       rating: 4, body: "மிகவும் எளிமையான வழக்கம், வெறும் 2 சொட்டுகள் போட்டால் போதும், படிப்படியாக மாற்றம் தெரிய ஆரம்பித்துள்ளது.",                                    date: "04/01/2026", image: "/NabhiReviewImg/b1.jpg",  likes: 1 },
  { id: 6, name: "பிரியா சர்மா",    rating: 5, body: "கடந்த 2 வாரங்களாக நாபி அமிர்த் எண்ணெய் பயன்படுத்துகிறேன். உடல் உண்மையிலேயே மிகவும் இலகுவாக உணர்கிறது மற்றும் சருமமும் சிறிது தெளிவாகிறது.",  date: "03/21/2026", image: "/NabhiReviewImg/g2.jpg",  likes: 2 },
  { id: 9, name: "சுஹானி பானர்ஜி",  rating: 5, body: "காலையும் மாலையும் நாபியில் தடவுகிறேன்; இது என் எளிய வழக்கத்தின் ஒரு பகுதியாகிவிட்டது.",                                                        date: "04/15/2026", image: "/NabhiReviewImg/g1.jpg",  likes: 1 },
];

export const reviewPhotos = [
  "/NabhiReviewImg/photo1.webp",
  "/NabhiReviewImg/photo2.webp",
  "/NabhiReviewImg/photo3.webp",
  "/NabhiReviewImg/photo4.webp",
  "/NabhiReviewImg/photo5.webp",
];

export const photoReviewers = [
  { name: "மீனல் ஷா",       initials: "மீ",  rating: 5, body: "மிகவும் அழகான பேக்கேஜிங்",                                                                                   likes: 4, date: "02/07/2026" },
  { name: "பிரியா சர்மா",   initials: "பி",  rating: 5, body: "மிகவும் நல்லது மற்றும் பயனுள்ளது",                                                                           likes: 2, date: "03/21/2026" },
  { name: "வைஷ்ணவி ஜோஷி",  initials: "வை",  rating: 5, body: "முதலில் அதிகம் எதிர்பார்க்கவில்லை, ஆனால் 10-12 நாட்களில் சருமம் தெளிவாகி ஆற்றலும் மேம்பட்டது.",           likes: 4, date: "04/10/2026" },
  { name: "சுஹானி பானர்ஜி", initials: "சு",  rating: 5, body: "10 நாட்களில் தெளிவான சருமம், ஆற்றல் மேம்பட்டது.",                                                          likes: 1, date: "04/15/2026" },
  { name: "சமர் தாஸ்",      initials: "ச",   rating: 4, body: "மிகவும் எளிமையான வழக்கம், வெறும் 2 சொட்டுகள் போட்டால் போதும், படிப்படியாக மாற்றம் தெரிய ஆரம்பிக்கும்.", likes: 1, date: "04/01/2026" },
];

// ─── Static content ───────────────────────────────────────────────────────────
export const accordionData = [
  {
    title: "நாபி அமிர்த் ஏன்?",
    content:
      "பண்டைய ஆயுர்வேத நாபி சிகிச்சையில் வேரூன்றிய நாபி அமிர்த், நாபி மையத்தின் மூலம் உடலுக்கு ஊட்டமளிக்க சிறப்பாக உருவாக்கப்பட்ட மூலிகை எண்ணெய்.\n\nஓமம், பெருங்காயம், இஞ்சி, துளசி மற்றும் மல்காங்கனி போன்ற சக்திவாய்ந்த மூலிகைகளால் செறிவூட்டப்பட்டு, இயற்கையான நச்சுகளை நீக்குவதற்கு ஆதரவு அளிக்கிறது.\n\nபலன்: இலகுவான உடல், தெளிவான சருமம் மற்றும் சமநிலையான ஒட்டுமொத்த ஆரோக்கியம்.",
  },
  {
    title: "எவ்வாறு பயன்படுத்துவது",
    content:
      "இரவில் தூங்குவதற்கு முன் நாபியில் நாபி அமிர்த் எண்ணெயின் 2-3 சொட்டுகள் போடுங்கள்.\n\nசிறந்த முடிவுகளுக்கு, வலஞ்சுழி வட்ட இயக்கத்தில் மசாஜ் செய்து உறிஞ்சிக்கொள்ள அனுமதிக்கவும்.\n\nமறுநாள் காலையில் எழுந்ததும் நாபியை சுத்தம் செய்யுங்கள்.",
  },
  {
    title: "முக்கியமான முன்னெச்சரிக்கைகள்",
    content:
      "பயன்படுத்துவதற்கு முன் 20 நிமிட பேட்ச் டெஸ்ட் செய்யுங்கள்.\n\nஏதேனும் எரிச்சல் ஏற்பட்டால் மருத்துவரை அணுகவும்.\n\nகர்ப்ப காலம் மற்றும் தாய்ப்பால் கொடுக்கும் காலத்தில் பயன்படுத்த வேண்டாம்.",
  },
];

// ─── trustTags — icons removed, labels only ───────────────────────────────────
export const trustTags = [
  { label: "இலவச டெலிவரி" },
  { label: "COD கிடைக்கும்" },
  { label: "எளிய திரும்பப்பெறல்" },
  { label: "100% இயற்கை" },
];

export const marqueeItems = [
  { text: "இலவச டெலிவரி" },
  { text: "10,000+ மகிழ்ச்சியான வாடிக்கையாளர்கள்" },
  { text: "டெலிவரியில் பணம் செலுத்துங்கள் (COD)" },
  { text: "100% ஆயுர்வேதம்" },
  { text: "ஒவ்வொரு ஆர்டரிலும் தரம் சரிபார்க்கப்படுகிறது" },
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
  { src: "https://img.icons8.com/?size=100&id=am4ltuIYDpQ5&format=png&color=000000", alt: "GPay",    zIndex: 10 },
  { src: "https://img.icons8.com/?size=100&id=OYtBxIlJwMGA&format=png&color=000000", alt: "PhonePe", zIndex: 20 },
  { src: "https://img.icons8.com/?size=100&id=68067&format=png&color=000000",        alt: "Paytm",   zIndex: 30 },
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