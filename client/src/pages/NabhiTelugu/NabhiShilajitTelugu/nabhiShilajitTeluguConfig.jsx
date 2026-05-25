import React from "react";
import { GiHerbsBundle, GiMeditation, GiDroplets, GiHealing } from "react-icons/gi";
import { FaLeaf, FaShieldAlt } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { TbTruckDelivery, TbRefresh } from "react-icons/tb";

const product = {
  id:             "shilajit-energy-resin",
  name:           "శిలాజిత్ ఎనర్జీ రెసిన్",
  tagline:        "సహజ శక్తి & స్టామినా బూస్టర్",
  image:          "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=shilajitcare3.webp&version_id=null",
  subtitle:       "హిమాలయాల నుండి సేకరించిన స్వచ్ఛమైన శిలాజిత్",
  h1:             "స్వచ్ఛమైన శిలాజిత్ రెసిన్ – బలం, స్టామినా & శక్తి కోసం",
  reviewSummary:  "4.71 · 589 ధృవీకరించిన సమీక్షలు",
  paymentImage:   null,
  logoImage:      "/NabhiLogo/nabhiLogo.png",
  brandName:      "హోమ్ విత్ కేర్ · వేద సంజీవని",
  contactEmail:   "akravipvtltd@gmail.com",
  whatsappNumber: "919717143189",
  whatsappMessage:"Hi, I'm interested in Shilajit Resin",
  fbPixelId:      "1622075442328928",
  cartStorageKey: "exclusiveCart",
  themeColor:     "#3b2f2f",
};

const variants = [
  { id: 1, label: "1 జార్ కొనండి",              price: "₹669",   priceNum: 669,  badge: null,              externalVariantId: 477247394800564160 },
  { id: 2, label: "2 జార్‌లు కొనండి – ₹300 తగ్గింపు", price: "₹1,099", priceNum: 1099, badge: "₹300 ఆదా చేయండి", externalVariantId: 477247412248868800 },
];

const images = [
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=shilajitcare3.webp&version_id=null",
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=shilajitcare1.webp&version_id=null",
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=shilajitcare2.webp&version_id=null",
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=shilajitcare4.webp&version_id=null",
];

const upiIcons = [
  { src: "https://img.icons8.com/?size=100&id=am4ltuIYDpQ5&format=png&color=000000", alt: "GPay",    zIndex: 10 },
  { src: "https://img.icons8.com/?size=100&id=OYtBxIlJwMGA&format=png&color=000000", alt: "PhonePe", zIndex: 20 },
  { src: "https://img.icons8.com/?size=100&id=68067&format=png&color=000000",        alt: "Paytm",   zIndex: 30 },
];

const marqueeItems = [
  { text: "ఉచిత షిప్పింగ్" },
  { text: "20,000+ సంతోషమైన కస్టమర్లు" },
  { text: "డెలివరీపై నగదు (COD)" },
  { text: "100% స్వచ్ఛమైన శిలాజిత్" },
  { text: "హిమాలయాల నుండి సేకరించబడింది" },
];

const trustTags = [
  { icon: <TbTruckDelivery size={15} />, label: "ఉచిత షిప్పింగ్" },
  { icon: <FaShieldAlt size={13} />,     label: "COD అందుబాటులో" },
  { icon: <TbRefresh size={15} />,       label: "సులభ రిటర్న్" },
  { icon: <FaLeaf size={13} />,          label: "100% సహజ" },
];

const accordionData = [
  {
    title: "శిలాజిత్‌ను ఎందుకు ఎంచుకోవాలి",
    content:
      "శిలాజిత్ ఒక పురాతన ఆయుర్వేద రసాయనం, ఇది లోపల నుండి శరీరాన్ని బలపరుస్తుంది.\n\nముఖ్య ప్రయోజనాలు:\n• శక్తి మరియు స్టామినాను పెంచుతుంది\n• రోగనిరోధక శక్తిని బలపరుస్తుంది\n• బలహీనత మరియు అలసటను తగ్గిస్తుంది\n• పురుష జీవశక్తికి మద్దతు ఇస్తుంది",
  },
  {
    title: "ఎలా ఉపయోగించాలి",
    content:
      "వేడి పాలు లేదా నీటిలో బటానీ గింజ పరిమాణం కలపండి.\n\nరోజుకు 1-2 సార్లు తీసుకోండి.",
  },
  {
    title: "ముఖ్యమైన గమనిక",
    content:
      "అధిక పరిమాణంలో తీసుకోవద్దు.\n\nగర్భిణీ స్త్రీలు వైద్యుని సంప్రదించి ఉపయోగించాలి.\n\nఇది మందు కాదు.",
  },
];

const howToUseImages = images;
const benefitsCarouselImages = images;

const bloatSection = {
  title:    "మీ సహజ శక్తి వనరు",
  body1:    "అలసట, బలహీనత మరియు తక్కువ స్టామినా నేటి వేగవంతమైన జీవితంలో చాలా సాధారణంగా మారింది.",
  body2:    "శిలాజిత్ లోపల నుండి శరీరాన్ని బలపరుస్తుంది మరియు నిరంతర సహజ శక్తిని అందిస్తుంది.",
  imageSrc: images[1],
};


const reviewPhotos = [
  
];

const balanceSection = {
  title:    "హిమాలయాల శక్తి",
  body1:    "శిలాజిత్ శతాబ్దాల పాటు హిమాలయ శిలల నుండి జారే సహజ పదార్థం.",
  body2:    "ఇది శరీరాన్ని పునరుజ్జీవింపచేయడంలో, జీవశక్తిని పునరుద్ధరించడంలో మరియు దీర్ఘకాలిక ఆరోగ్యానికి మద్దతు ఇవ్వడంలో సహాయపడుతుంది.",
  imageSrc: images[0],
};

const heroBannerSection = {
  title: "శిలాజిత్ శక్తి ఆచారం",
  body:  "సహజ ఆయుర్వేద పద్ధతిలో మీ శక్తి మరియు స్టామినాను పెంచుకోండి — స్వచ్ఛమైన, శక్తివంతమైన మరియు సమయ-పరీక్షిత.",
  stats: [
    { num: "20,000+", label: "సంతోషమైన కస్టమర్లు" },
    { num: "4.71",    label: "సగటు రేటింగ్" },
    { num: "589",     label: "సమీక్షలు" },
    { num: "100%",    label: "స్వచ్ఛమైన" },
  ],
};

const ritualSection = {
  title:    "శిలాజిత్ ఎలా పనిచేస్తుంది",
  subtitle: "సహజ ఖనిజాలు మరియు ఫుల్విక్ ఆమ్లంతో సమృద్ధం",
  items: [
    { icon: <GiHerbsBundle size={22} color="#3b2f2f" />, title: "ఖనిజాలతో సమృద్ధం",    desc: "85+ అవసరమైన ట్రేస్ ఖనిజాలు కలిగి ఉంటుంది" },
    { icon: <GiMeditation  size={22} color="#3b2f2f" />, title: "శక్తిని పెంచుతుంది",  desc: "స్టామినా మరియు బలాన్ని సహజంగా పెంచుతుంది" },
    { icon: <GiDroplets    size={22} color="#3b2f2f" />, title: "వేగవంతమైన శోషణ",    desc: "శరీరంలో వేగంగా శోషించబడి ఉపయోగించబడుతుంది" },
    { icon: <GiHealing     size={22} color="#3b2f2f" />, title: "రికవరీ మద్దతు",       desc: "అలసట మరియు బలహీనతను తగ్గిస్తుంది" },
  ],
};

const whyUsSection = {
  title:    "మా శిలాజిత్‌ను ఎందుకు ఎంచుకోవాలి?",
  subtitle: "మీరు విశ్వసించగల స్వచ్ఛమైన మరియు ధృవీకరించిన నాణ్యత",
  items: [
    { icon: <FaLeaf     size={26} color="#3b2f2f" />, title: "100% స్వచ్ఛమైన",   desc: "మిలావటు లేదు, ఫిల్లర్‌లు లేవు" },
    { icon: <HiSparkles size={26} color="#3b2f2f" />, title: "శక్తి బూస్టర్",    desc: "రోజంతా శక్తి స్థాయిలను నిర్వహిస్తుంది" },
    { icon: <FaLeaf     size={26} color="#3b2f2f" />, title: "ఉపయోగించడం సులభం", desc: "పాలు లేదా నీటిలో కలపండి" },
  ],
};

const reviews = {
  items: [
    { id: 1, name: "అమిత్ సింగ్",   rating: 5, body: "నా శక్తి స్థాయిలు చాలా పెరిగాయి. రోజంతా చాలా చురుకుగా అనిపిస్తోంది.", date: "02/20/2026" },
    { id: 2, name: "వికాస్ యాదవ్",  rating: 5, body: "స్టామినా గమనీయంగా మెరుగుపడింది. చాలా మంచి ఉత్పత్తి, గట్టిగా సిఫారసు చేస్తున్నాను.", date: "01/30/2026" },
  ],
};

export const nabhiShilajitTeluguConfig = {
  product, variants, images, upiIcons, marqueeItems, trustTags, accordionData,
  howToUseImages, benefitsCarouselImages, bloatSection, balanceSection,
  heroBannerSection, ritualSection, whyUsSection, reviews, reviewPhotos
};