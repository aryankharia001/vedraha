import React from "react";
import { GiHerbsBundle, GiMeditation, GiDroplets, GiHealing } from "react-icons/gi";
import { FaLeaf, FaShieldAlt, FaHandSparkles } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { TbTruckDelivery, TbRefresh } from "react-icons/tb";

// ─── Product metadata ─────────────────────────────────────────────────────────
const product = {
  id:             "nabhi-amrit",
  name:           "నాభి అమృత్",
  tagline:        "ఆయుర్వేద నాభి నూనె",
  image:          "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=ChatGPT%20Image%20Apr%2017%2C%202026%2C%2003_39_36%20PM%201.png&version_id=null",
  subtitle:       "పురాతన ఆయుర్వేద సూత్రం",
  h1:             "నాభి అమృత్ - జీర్ణక్రియ మరియు డిటాక్స్ కోసం నాభి నూనె",
  reviewSummary:  "4.62 · 189 ధృవీకరించిన సమీక్షలు",
  paymentImage:   "/NabhiImg/allpayment.png",
  logoImage:      "/NabhiLogo/nabhiLogo.png",
  brandName:      "హోమ్ విత్ కేర్ · వేద సంజీవని",
  contactEmail:   "akravipvtltd@gmail.com",
  whatsappNumber: "919717143189",
  whatsappMessage:"Hi, I'm interested in Nabhi Amrit",
  fbPixelId:      "1622075442328928",
  cartStorageKey: "exclusiveCart",
  themeColor:     "#2d5a27",
};

// ─── Variants ─────────────────────────────────────────────────────────────────
const variants = [
  { id: 1, label: "1 బాటిల్ కొనండి",  price: "₹499",   priceNum: 499,  mrp: 999, badge: null,              externalVariantId: 477155136897430592 },
  { id: 2, label: "2 బాటిళ్లు కొనండి", price: "₹699", priceNum: 699,           badge: "₹300 ఆదా చేయండి",  externalVariantId: 477155162130363456 },
  { id: 3, label: "3 బాటిళ్లు కొనండి", price: "₹999", priceNum: 999,           badge: "₹500 ఆదా చేయండి", externalVariantId: 477155176089007168 },
];

// ─── Gallery images ───────────────────────────────────────────────────────────
const images = [
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=amriteng3.webp&version_id=null",
  { type: "video", src: "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=nabhi.mp4&version_id=null", poster: "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=Screenshot%202026-04-30%20at%205.44.14%E2%80%AFPM-optimized.webp&version_id=null" },
  "/NabhiImg/amrit3.png",
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
  { text: "ఉచిత షిప్పింగ్" },
  { text: "10,000+ సంతోషమైన కస్టమర్లు" },
  { text: "డెలివరీపై నగదు (COD)" },
  { text: "100% ఆయుర్వేదిక్" },
  { text: "ప్రతి ఆర్డర్‌లో నాణ్యత తనిఖీ" },
];

// ─── Trust tags ───────────────────────────────────────────────────────────────
const trustTags = [
  { icon: <TbTruckDelivery size={15} />, label: "ఉచిత షిప్పింగ్" },
  { icon: <FaShieldAlt size={13} />,     label: "COD అందుబాటులో" },
  { icon: <TbRefresh size={15} />,       label: "సులభ రిటర్న్" },
  { icon: <FaLeaf size={13} />,          label: "100% సహజ" },
];

// ─── Accordion ────────────────────────────────────────────────────────────────
const accordionData = [
  {
    title: "నాభి అమృత్ ఎందుకు?",
    content:
      "పురాతన ఆయుర్వేద నాభి చికిత్సలో వేరూడిన, ఇది ప్రత్యేకంగా రూపొందించిన మూలికా నూనె.\n\nఅజ్వాయిన్, హింగు, అల్లం, తులసి మరియు మల్కాంగుని వంటి శక్తివంతమైన మూలికలతో సమృద్ధంగా ఉంటుంది.\n\nఫలితం: తేలికైన శరీరం, స్వచ్ఛమైన చర్మం మరియు సమతుల్య సమగ్ర ఆరోగ్యం.",
  },
  {
    title: "ఎలా ఉపయోగించాలి",
    content:
      "రాత్రి నిద్రపోయే ముందు నాభిలో 2-3 చుక్కలు వేయండి.\n\nసవ్యదిశలో వృత్తాకారంగా మసాజ్ చేయండి.\n\nమర్నాడు ఉదయం నాభిని శుభ్రం చేయండి.",
  },
  {
    title: "ముఖ్యమైన జాగ్రత్తలు",
    content:
      "ఉపయోగించే ముందు 20 నిమిషాల పాచ్ టెస్ట్ చేయండి.\n\nచర్మంపై మంట కలిగితే వైద్యుని సంప్రదించండి.\n\nగర్భం మరియు స్తన్యపానం సమయంలో ఉపయోగించవద్దు.",
  },
];

// ─── How to Use carousel ──────────────────────────────────────────────────────
const howToUseImages = [
  { url: "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=stepstelugu1.webp&version_id=null" },
  { url: "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=stepstelugu2.webp&version_id=null" },
  { url: "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=stepstelugu3.webp&version_id=null" },
  { url: "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=stepstelugu4.webp&version_id=null" },
];




const reviewPhotos = [
  "/NabhiReviewImg/photo1.webp",
  "/NabhiReviewImg/photo2.webp",
  "/NabhiReviewImg/photo3.webp",
  "/NabhiReviewImg/photo4.webp",
  "/NabhiReviewImg/photo5.webp",
];



// ─── Benefits carousel ────────────────────────────────────────────────────────
const benefitsCarouselImages = [
  { url: "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=triphalatelugu.webp&version_id=null" },
  { url: "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=hingtelugu.webp&version_id=null" },
  { url: "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=amlatelugu.webp&version_id=null" },
  { url: "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=adraktelugu.webp&version_id=null" },
];

// ─── Sections ─────────────────────────────────────────────────────────────────
const bloatSection = {
  title:    "ఉబ్బరం లేని పొట్ట",
  body1:    "శరీరం యొక్క సహజ జీర్ణ సమతుల్యతకు మద్దతు ఇవ్వడం ద్వారా అసౌకర్యమైన ఉబ్బరాన్ని తగ్గించడంలో సహాయపడుతుంది.",
  body2:    "క్రమం తప్పకుండా ఉపయోగిస్తే, మీ పొట్ట రోజంతా తేలిగ్గా, చదునుగా మరియు మరింత సౌకర్యంగా అనిపిస్తుంది.",
  videoSrc: "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=nabhi.mp4&version_id=null",
};

const balanceSection = {
  title:    "నాభి నుండి సమతుల్యత ప్రవహిస్తుంది",
  body1:    "ఆయుర్వేదంలో, <strong>నాభి</strong> శరీరం యొక్క అంతరంగిక సమతుల్యత మరియు శక్తి ప్రవాహానికి కేంద్రంగా పరిగణించబడుతుంది.",
  body2:    "నాభి అమృత్‌తో నాభికి పోషణ అందించడం ద్వారా, మీరు శరీరం యొక్క సహజ సామరస్యానికి మద్దతు ఇస్తారు.",
  videoSrc: "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=amrit.mp4&version_id=null",
};

const heroBannerSection = {
  title: "నాభి అమృత్ ఆచారం",
  body:  "ఉబ్బరం, చర్మపు మొటిమలు, నెమ్మదైన జీవక్రియ మరియు కీళ్ల అసౌకర్యం వంటి అనేక సమస్యలు శరీరం యొక్క అంతరంగిక సమతుల్యత దెబ్బతిన్నప్పుడు మొదలవుతాయి.",
  stats: [
    { num: "10,000+", label: "సంతోషమైన కస్టమర్లు" },
    { num: "4.62",    label: "సగటు రేటింగ్" },
    { num: "189",     label: "ధృవీకరించిన సమీక్షలు" },
    { num: "100%",    label: "ఆయుర్వేదిక్" },
  ],
};


const ritualSection = {
  title:    "నాభి చికిత్స ఎలా పనిచేస్తుంది",
  subtitle: "పురాతన ఆయుర్వేద జ్ఞానంలో వేరూడిన, నాభి వేలాది శక్తి ఛానెల్‌లను అనుసంధానించే శరీర కేంద్రం.",
  items: [
    { icon: <GiHerbsBundle size={22} color="#2d5a27" />, title: "సాంప్రదాయ మూలిక సారాలు",     desc: "నెమ్మదైన ఆయుర్వేద వెలికితీత ప్రక్రియ ద్వారా తయారు చేయబడింది." },
    { icon: <GiMeditation  size={22} color="#2d5a27" />, title: "మణిపుర చక్ర సమతుల్యత",       desc: "నాభి మణిపుర చక్రానికి కేంద్రం — శరీరం యొక్క జీవశక్తి మరియు అంతరంగిక సమతుల్యత యొక్క శక్తి కేంద్రం." },
    { icon: <GiDroplets    size={22} color="#2d5a27" />, title: "లోతైన నాభి శోషణ",            desc: "నాభి ప్రాంతంలో అనేక నాడీ చివరలు ఉంటాయి." },
    { icon: <GiHealing     size={22} color="#2d5a27" />, title: "అంతరంగిక సమతుల్యత పునరుద్ధరణ", desc: "సహజ విషహరణకు మద్దతు ఇస్తుంది మరియు ఉబ్బరాన్ని తగ్గించడంలో సహాయపడుతుంది." },
  ],
};

const whyUsSection = {
  title:    "మాకు ఎందుకు ఎంచుకోవాలి?",
  subtitle: "భారతదేశం అంతటా 10,000 కంటే ఎక్కువ కస్టమర్లు విశ్వసిస్తున్నారు, ప్రకృతి యొక్క అత్యుత్తమ పదార్థాలతో తయారు చేయబడింది.",
  items: [
    { icon: <GiDroplets     size={28} color="#2d5a27" />, title: "లోతైన నాభి చికిత్స",        desc: "నాభికి ప్రత్యేకంగా తయారు చేయబడింది, పురాతన పేకోటి పద్ధతి ద్వారా లోతైన శోషణతో." },
    { icon: <FaLeaf         size={26} color="#2d5a27" />, title: "100% ఆయుర్వేదిక్",          desc: "సమయ-పరీక్షిత ఆయుర్వేద మూలికలతో తయారు చేయబడింది, రసాయనాలు మరియు పారాబెన్‌లు లేవు." },
    { icon: <HiSparkles     size={26} color="#2d5a27" />, title: "సమగ్ర ఆరోగ్యం",             desc: "జీర్ణక్రియ, కీళ్లు, హార్మోన్ సమతుల్యత మరియు మొత్తం జీవశక్తికి మద్దతు ఇస్తుంది." },
    { icon: <FaHandSparkles size={26} color="#2d5a27" />, title: "సరళ & సురక్షిత దినచర్య",   desc: "నిద్రవేళలో కేవలం 2-3 చుక్కలు — మసాజ్ అవసరం లేదు, ఇబ్బంది లేదు." },
  ],
};

const greenMarqueeItems = [
  { icon: <GiDroplets     size={13} />, text: "పేగు శుద్ధి" },
  { icon: <GiMeditation   size={13} />, text: "తేలికైన పొట్ట" },
  { icon: <HiSparkles     size={13} />, text: "స్వచ్ఛమైన చర్మం" },
  { icon: <FaHandSparkles size={13} />, text: "సమతుల్య ఆరోగ్యం" },
];

// ─── Reviews ──────────────────────────────────────────────────────────────────
const reviews = {
  items: [
    { id: 1, name: "మీనల్ షా",       rating: 5, body: "ఉపయోగించడం చాలా సులభం. ఒక వారంలోనే తేడా అనిపించింది.",                           date: "02/07/2026", image: "/NabhiReviewImg/abhi.jpg", likes: 3 },
    { id: 2, name: "హరీష్ అయ్యర్",   rating: 5, body: "దీని సువాసన చాలా తేలికగా మరియు శాంతదాయకంగా ఉంటుంది.",                           date: "01/19/2026", image: null,                     likes: 2 },
    { id: 3, name: "ఆయేషా నూర్",     rating: 4, body: "నా ఆరోగ్య దినచర్యకు మంచి అదనం. చర్మం మరింత మెత్తగా అనిపిస్తోంది.",             date: "03/02/2026", image: null,                     likes: 4 },
    { id: 4, name: "నితిన్ బన్సల్",  rating: 5, body: "జీర్ణక్రియకు బాగా పనిచేసే సాంప్రదాయ ఆయుర్వేద నివారణ.",                          date: "12/28/2025", image: null,                     likes: 1 },
    { id: 5, name: "ప్రియ శర్మ",      rating: 5, body: "శరీరం నిజంగా చాలా తేలికగా అనిపిస్తోంది మరియు చర్మం కూడా కొంచెం స్వచ్ఛంగా కనిపిస్తోంది.", date: "03/21/2026", image: "/NabhiReviewImg/g2.jpg", likes: 2 },
  ],
  photos: [
    "/NabhiReviewImg/photo1.webp",
    "/NabhiReviewImg/photo2.webp",
    "/NabhiReviewImg/photo3.webp",
    "/NabhiReviewImg/photo4.webp",
    "/NabhiReviewImg/photo5.webp",
  ],
  photoReviewers: [
    { name: "మీనల్ షా",   initials: "మీ", rating: 5, body: "చాలా మంచి ప్యాకేజింగ్",                       likes: 4, date: "02/07/2026" },
    { name: "ప్రియ శర్మ", initials: "ప్రి", rating: 5, body: "చాలా మంచి మరియు ప్రభావవంతమైనది",             likes: 2, date: "03/21/2026" },
  ],
};

// ─── Final export ─────────────────────────────────────────────────────────────
export const nabhiAmritTeluguConfig = {
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