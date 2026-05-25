// ─── Product ────────────────────────────────────────────────────────────────
export const PRODUCT = {
  id: "nabhi-amrit",
  name: "నాభి అమృత్",
  tagline: "ఆయుర్వేదిక్ నాభి నూనె",
  image:
    "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=ChatGPT%20Image%20Apr%2017%2C%202026%2C%2003_39_36%20PM%201.png&version_id=null",
};

export const CART_STORAGE_KEY = "exclusiveCart";

// ─── Variants ────────────────────────────────────────────────────────────────
export const variants = [
  { id: 1, label: "1 బాటిల్ కొనండి", price: "₹899", priceNum: 899, mrp: 999, badge: null, externalVariantId: 477155136897430592 },
  { id: 2, label: "2 బాటిళ్లు కొనండి", price: "₹1,499", priceNum: 1499, badge: "₹500 ఆదా చేయండి", externalVariantId: 477155162130363456 },
  { id: 3, label: "3 బాటిళ్లు కొనండి", price: "₹1,999", priceNum: 1999, badge: "₹1000 ఆదా చేయండి", externalVariantId: 477155176089007168 },
];

// ─── Reviews ─────────────────────────────────────────────────────────────────
export const allReviews = [
  { id: 1, name: "మేనల్ షా", rating: 5, body: "వాడటం మరియు మసాజ్ చేయడం చాలా సులభం. వారం రోజుల్లోనే తేడా కనిపించింది.", date: "02/07/2026", image: "/NabhiReviewImg/abhi.jpg", likes: 3 },
  { id: 2, name: "హరీష్ అయ్యర్", rating: 5, body: "దీని సువాసన చాలా తేలికగా మరియు హాయిగా ఉంటుంది, అస్సలు బలంగా లేదు.", date: "01/19/2026", image: null, likes: 2 },
  { id: 3, name: "ఆయేషా నూర్", rating: 4, body: "నా వెల్నెస్ రొటీన్‌కు చాలా మంచి చేర్పు. చర్మం చాలా మెత్తగా అనిపిస్తోంది.", date: "03/02/2026", image: null, likes: 4 },
  { id: 8, name: "వైష్ణవి జోషి", rating: 5, body: "మొదట్లో ఏమీ అనుకోలేదు, కానీ 10-12 రోజుల్లో చర్మం స్పష్టంగా కనిపించడం మొదలైంది మరియు శక్తి కూడా మెరుగైంది.", date: "04/10/2026", image: "", likes: 4 },
  { id: 4, name: "నితిన్ బన్సల్", rating: 5, body: "జీర్ణక్రియకు నిజంగా చాలా బాగా పని చేసే గొప్ప సాంప్రదాయ ఆయుర్వేద ఔషధం.", date: "12/28/2025", image: null, likes: 1 },
  { id: 5, name: "ఇమ్రాన్ ఖాన్", rating: 5, body: "ఇది నా రోజువారీ దినచర్యలో భాగమైంది, చర్మం మృదువుగా అనిపిస్తోంది మరియు కొంచెం మెరుపు కూడా వస్తోంది.", date: "02/14/2026", image: null, likes: 5 },
  { id: 7, name: "సమర్ దాస్", rating: 4, body: "చాలా సులభమైన దినచర్య, కేవలం 2 చుక్కలు వేసుకుంటే క్రమంగా తేడా కనిపించడం మొదలైంది.", date: "04/01/2026", image: "/NabhiReviewImg/b1.jpg", likes: 1 },
  { id: 6, name: "ప్రియా శర్మ", rating: 5, body: "గత 2 వారాలుగా నాభి అమృత్ నూనె వాడుతున్నాను. శరీరం నిజంగా చాలా తేలికగా అనిపిస్తోంది మరియు చర్మం కూడా కొంచెం స్పష్టంగా కనిపిస్తోంది.", date: "03/21/2026", image: "/NabhiReviewImg/g2.jpg", likes: 2 },
  { id: 9, name: "సుహాని బెనర్జీ", rating: 5, body: "పొద్దున మరియు సాయంత్రం నాభిపై రాసుకుంటున్నాను; ఇది నా దినచర్యలో సులభమైన భాగమైంది.", date: "04/15/2026", image: "/NabhiReviewImg/g1.jpg", likes: 1 },
];

export const reviewPhotos = [
  "/NabhiReviewImg/photo1.webp",
  "/NabhiReviewImg/photo2.webp",
  "/NabhiReviewImg/photo3.webp",
  "/NabhiReviewImg/photo4.webp",
  "/NabhiReviewImg/photo5.webp",
];

export const photoReviewers = [
  { name: "మేనల్ షా", initials: "MS", rating: 5, body: "చాలా మంచి ప్యాకేజింగ్", likes: 4, date: "02/07/2026" },
  { name: "ప్రియా శర్మ", initials: "PS", rating: 5, body: "చాలా మంచిది మరియు సమర్థవంతమైనది", likes: 2, date: "03/21/2026" },
  { name: "వైష్ణవి జోషి", initials: "VJ", rating: 5, body: "మొదట్లో ఏమీ అనుకోలేదు, కానీ 10-12 రోజుల్లో చర్మం స్పష్టంగా కనిపించడం మొదలైంది మరియు శక్తి కూడా మెరుగైంది.", likes: 4, date: "04/10/2026" },
  { name: "సుహాని బెనర్జీ", initials: "SB", rating: 5, body: "10 రోజుల్లో స్పష్టమైన చర్మం, శక్తి మెరుగైంది.", likes: 1, date: "04/15/2026" },
  { name: "సమర్ దాస్", initials: "SD", rating: 4, body: "చాలా సులభమైన దినచర్య, కేవలం 2 చుక్కలు వేసుకుంటే క్రమంగా తేడా కనిపించడం మొదలవుతుంది.", likes: 1, date: "04/01/2026" },
];

// ─── Static content ───────────────────────────────────────────────────────────
export const accordionData = [
  {
    title: "నాభి అమృత్ ఎందుకు?",
    content:
      "పురాతన ఆయుర్వేద నాభి చికిత్సలో వేళ్లూనుకున్న నాభి అమృత్, నాభి కేంద్రం ద్వారా శరీరాన్ని పోషించడానికి ప్రత్యేకంగా తయారు చేయబడిన హెర్బల్ నూనె.\n\nఅజ్వాయిన్, హింగ్, అల్లం, తులసి మరియు మల్కంగని వంటి శక్తివంతమైన మూలికలతో సమృద్ధిగా ఉండి, సహజ విషనిర్మూలనకు తోడ్పడుతుంది.\n\nఫలితం: తేలికైన శరీరం, స్పష్టమైన చర్మం మరియు సమతుల్య మొత్తం ఆరోగ్యం.",
  },
  {
    title: "ఎలా వాడాలి",
    content:
      "రాత్రి నిద్రపోయే ముందు మీ నాభిపై 2-3 చుక్కల నాభి అమృత్ నూనె వేయండి.\n\nమంచి ఫలితాల కోసం, సవ్యదిశలో వృత్తాకారంగా మసాజ్ చేసి శోషించుకోనివ్వండి.\n\nఉదయం లేచిన తర్వాత నాభిని శుభ్రం చేసుకోండి.",
  },
  {
    title: "ముఖ్యమైన జాగ్రత్తలు",
    content:
      "వాడటానికి ముందు 20 నిమిషాలు పాచ్ టెస్ట్ చేయండి.\n\nఏదైనా చికాకు కలిగితే మీ వైద్యుడిని సంప్రదించండి.\n\nగర్భధారణ లేదా తల్లిపాలు ఇచ్చే సమయంలో వాడకండి.",
  },
];

export const trustTags = [
  { label: "ఉచిత షిప్పింగ్" },
  { label: "COD అందుబాటులో ఉంది" },
  { label: "సులభమైన రిటర్న్స్" },
  { label: "100% సహజం" },
];

export const marqueeItems = [
  { text: "ఉచిత షిప్పింగ్" },
  { text: "10,000+ సంతోషకరమైన కస్టమర్లు" },
  { text: "క్యాష్ ఆన్ డెలివరీ (COD)" },
  { text: "100% ఆయుర్వేదిక్" },
  { text: "ప్రతి ఆర్డర్‌లో నాణ్యత తనిఖీ" },
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