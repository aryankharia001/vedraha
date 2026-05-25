import React from "react";
import { GiHerbsBundle, GiMeditation, GiDroplets, GiHealing } from "react-icons/gi";
import { FaLeaf, FaShieldAlt } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { TbTruckDelivery, TbRefresh } from "react-icons/tb";

// ─── Product metadata ─────────────────────────────────────────────────────────
const product = {
  id:             "eye-care-nabhi-oil",
  name:           "ఐ కేర్ నాభి నూనె",
  tagline:        "పురాతన ఆయుర్వేద సూత్రం",
  image:          "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=eyecare1.webp&version_id=null",
  subtitle:       "పురాతన ఆయుర్వేద సూత్రం",
  h1:             "ఐ కేర్ నాభి నూనె – దృష్టి మద్దతు & కంటి అలసట నివారణ",
  reviewSummary:  "4.58 · 327 ధృవీకరించిన సమీక్షలు",
  paymentImage:   null,
  logoImage:      "/NabhiLogo/nabhiLogo.png",
  brandName:      "హోమ్ విత్ కేర్ · వేద సంజీవని",
  contactEmail:   "akravipvtltd@gmail.com",
  whatsappNumber: "919717143189",
  whatsappMessage:"Hi, I'm interested in Eye Care Nabhi Oil",
  fbPixelId:      "1622075442328928",
  cartStorageKey: "exclusiveCart",
  themeColor:     "#2d5a27",
};

// ─── Variants ─────────────────────────────────────────────────────────────────
const variants = [
  { id: 1, label: "1 బాటిల్ కొనండి",              price: "₹599",   priceNum: 599,  mrp: 799,  badge: null,              externalVariantId: 477155696316920896 },
  { id: 2, label: "2 బాటిళ్లు కొనండి – ₹100 తగ్గింపు", price: "₹1,099", priceNum: 1099, mrp: 1598, badge: "₹100 ఆదా చేయండి", externalVariantId: 477155708396516416 },
];

// ─── Gallery images ───────────────────────────────────────────────────────────
const images = [
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=eyecare2.webp&version_id=null",
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=eyecare1.webp&version_id=null",
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=eyecare3.webp&version_id=null",
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=eyecare1.webp&version_id=null",
];

const upiIcons = [
  { src: "https://img.icons8.com/?size=100&id=am4ltuIYDpQ5&format=png&color=000000", alt: "GPay",    zIndex: 10 },
  { src: "https://img.icons8.com/?size=100&id=OYtBxIlJwMGA&format=png&color=000000", alt: "PhonePe", zIndex: 20 },
  { src: "https://img.icons8.com/?size=100&id=68067&format=png&color=000000",        alt: "Paytm",   zIndex: 30 },
];

const marqueeItems = [
  { text: "ఉచిత షిప్పింగ్" },
  { text: "5,000+ సంతోషమైన కస్టమర్లు" },
  { text: "డెలివరీపై నగదు (COD)" },
  { text: "100% ఆయుర్వేదిక్" },
  { text: "ప్రతి ఆర్డర్‌లో నాణ్యత తనిఖీ" },
];

const trustTags = [
  { icon: <TbTruckDelivery size={15} />, label: "ఉచిత షిప్పింగ్" },
  { icon: <FaShieldAlt size={13} />,     label: "COD అందుబాటులో" },
  { icon: <TbRefresh size={15} />,       label: "సులభ రిటర్న్" },
  { icon: <FaLeaf size={13} />,          label: "100% సహజ" },
];

const accordionData = [
  {
    title: "ఐ కేర్ నాభి నూనెను ఎందుకు ఎంచుకోవాలి",
    content:
      "పురాతన ఆయుర్వేద నాభి చికిత్సలో వేరూడిన, ఈ నూనె లోపల నుండి కళ్లకు పోషణ అందిస్తుంది.\n\nముఖ్య ప్రయోజనాలు:\n• కంటి తేమను నిర్వహిస్తుంది\n• డిజిటల్ కంటి అలసటను తగ్గిస్తుంది\n• ఎరుపు మరియు అలసటను నివారిస్తుంది\n• సహజ దృష్టి మద్దతు",
  },
  {
    title: "ఎలా ఉపయోగించాలి",
    content:
      "రాత్రి నిద్రపోయే ముందు నాభిలో 2-3 చుక్కలు వేసి మెల్లగా మసాజ్ చేయండి.\n\nఉదయం శుభ్రం చేయండి.\n\nక్రమం తప్పకుండా ఉపయోగించడం వల్ల అత్యుత్తమ ఫలితాలు వస్తాయి.",
  },
  {
    title: "ముఖ్యమైన గమనిక",
    content:
      "ముందుగా పాచ్ టెస్ట్ చేయండి.\n\nమంట కలిగితే ఉపయోగం ఆపండి.\n\nఇది వైద్య చికిత్సకు ప్రత్యామ్నాయం కాదు.",
  },
];

const howToUseImages = images;
const benefitsCarouselImages = images;

const bloatSection = {
  title:    "డిజిటల్ యుగంలో కంటి సంరక్షణ",
  body1:    "ఎక్కువ సేపు స్క్రీన్ చూడడం వల్ల కంటి అలసట, పొడికతనం మరియు మంట కలుగుతాయి.",
  body2:    "ఐ కేర్ నాభి నూనె రాత్రిపూట పనిచేస్తుంది మరియు ఉదయం తాజాగా అనిపింపచేస్తుంది.",
  imageSrc: images[2],
};

const balanceSection = {
  title:    "నాభి నుండి దృష్టి శక్తి ప్రవహిస్తుంది",
  body1:    "ఆయుర్వేదంలో, నాభి శరీరం యొక్క ఇంద్రియ నెట్‌వర్క్‌తో అనుసంధానించబడి ఉంటుంది.",
  body2:    "నాభి ద్వారా వేసిన మూలికలు తమ ప్రభావాన్ని కళ్ల వరకు చేరవేస్తాయి.",
  imageSrc: images[0],
};

const heroBannerSection = {
  title: "ఐ కేర్ నాభి ఆచారం",
  body:  "ఆయుర్వేద మూలికలు నాభి ద్వారా కళ్లను చేరుకుంటాయి, లోపల నుండి లోతైన నివారణ అందిస్తాయి.",
  stats: [
    { num: "5,000+", label: "సంతోషమైన కస్టమర్లు" },
    { num: "4.58",   label: "సగటు రేటింగ్" },
    { num: "327",    label: "సమీక్షలు" },
    { num: "100%",   label: "ఆయుర్వేదిక్" },
  ],
};

const ritualSection = {
  title:    "నాభి కంటి చికిత్స ఎలా పనిచేస్తుంది",
  subtitle: "నాభి శరీరం యొక్క శక్తి కేంద్రం, కళ్లతో అనుసంధానించబడి ఉంటుంది",
  items: [
    { icon: <GiHerbsBundle size={22} color="#2d5a27" />, title: "మూలిక మిశ్రమం",    desc: "త్రిఫల, గులాబీ మరియు వేపుడు విత్తనాలతో తయారు చేసిన శక్తివంతమైన సూత్రం" },
    { icon: <GiMeditation  size={22} color="#2d5a27" />, title: "శక్తి కేంద్రం",    desc: "నాభి శరీరం యొక్క ప్రాథమిక శక్తి కేంద్రం" },
    { icon: <GiDroplets    size={22} color="#2d5a27" />, title: "వేగవంతమైన శోషణ",  desc: "నూనె శరీరంలో వేగంగా శోషించబడుతుంది" },
    { icon: <GiHealing     size={22} color="#2d5a27" />, title: "కంటి నివారణ",      desc: "అలసట మరియు పొడికతనాన్ని తగ్గిస్తుంది" },
  ],
};

const reviewPhotos = [
  
];

const whyUsSection = {
  title:    "ఐ కేర్ నాభి నూనెను ఎందుకు ఎంచుకోవాలి?",
  subtitle: "సహజ కంటి సంరక్షణ కోసం",
  items: [
    { icon: <FaLeaf     size={26} color="#2d5a27" />, title: "ఆయుర్వేద సూత్రం",   desc: "100% సహజ పదార్థాలు" },
    { icon: <HiSparkles size={26} color="#2d5a27" />, title: "కంటి అలసట నివారణ", desc: "స్క్రీన్ అలసటను తగ్గిస్తుంది" },
    { icon: <FaLeaf     size={26} color="#2d5a27" />, title: "రాత్రిపూట ఉపయోగం", desc: "సులభమైన రోజువారీ దినచర్య" },
  ],
};

const reviews = {
  items: [
    { id: 1, name: "రితు శర్మ",  rating: 5, body: "నా కళ్లు చాలా ఎక్కువ విశ్రాంతిగా అనిపిస్తున్నాయి.", date: "02/10/2026" },
    { id: 2, name: "అర్జున్ మెహతా", rating: 5, body: "చాలా మంచి ఉత్పత్తి, గట్టిగా సిఫారసు చేస్తున్నాను.", date: "01/22/2026" },
  ],
};

export const nabhiEyeTeluguConfig = {
  product, variants, images, upiIcons, marqueeItems, trustTags, accordionData,
  howToUseImages, benefitsCarouselImages, bloatSection, balanceSection,
  heroBannerSection, ritualSection, whyUsSection, reviews,reviewPhotos
};