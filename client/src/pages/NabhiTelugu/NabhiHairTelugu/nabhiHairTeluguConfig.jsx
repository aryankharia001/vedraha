import React from "react";
import { GiHerbsBundle, GiMeditation, GiDroplets, GiHealing } from "react-icons/gi";
import { FaLeaf, FaShieldAlt } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { TbTruckDelivery, TbRefresh } from "react-icons/tb";

const product = {
  id:             "hair-care-nabhi-oil",
  name:           "హేర్ కేర్ నాభి నూనె",
  tagline:        "పురాతన ఆయుర్వేద సూత్రం",
  image:          "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=haircare1.webp&version_id=null",
  subtitle:       "పురాతన ఆయుర్వేద సూత్రం",
  h1:             "హేర్ కేర్ నాభి నూనె – లోపల నుండి జుట్టుకు పోషణ",
  reviewSummary:  "4.58 · 327 ధృవీకరించిన సమీక్షలు",
  paymentImage:   null,
  logoImage:      "/NabhiLogo/nabhiLogo.png",
  brandName:      "హోమ్ విత్ కేర్ · వేద సంజీవని",
  contactEmail:   "akravipvtltd@gmail.com",
  whatsappNumber: "919717143189",
  whatsappMessage:"Hi, I'm interested in Hair Care Nabhi Oil",
  fbPixelId:      "1622075442328928",
  cartStorageKey: "exclusiveCart",
  themeColor:     "#2d5a27",
};

const variants = [
  { id: 1, label: "1 బాటిల్ కొనండి",              price: "₹499",  priceNum: 499,  mrp: 699,  badge: null,              externalVariantId: 477155790806201408 },
  { id: 2, label: "2 బాటిళ్లు కొనండి – ₹100 తగ్గింపు", price: "₹899",  priceNum: 899,  mrp: 1198, badge: "₹100 ఆదా చేయండి", externalVariantId: 477155804764845120 },
];

const images = [
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=haircare1.webp&version_id=null",
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=Haircare2.webp&version_id=null",
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=Haircare3.webp&version_id=null",
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=Haircare4.webp&version_id=null",
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

const reviewPhotos = [
  
];

const accordionData = [
  {
    title: "హేర్ కేర్ నాభి నూనెను ఎందుకు ఎంచుకోవాలి",
    content:
      "పురాతన ఆయుర్వేద నాభి చికిత్సలో వేరూడిన, ఈ నూనె లోపల నుండి జుట్టుకు పోషణ అందిస్తుంది.\n\nముఖ్య ప్రయోజనాలు:\n• జుట్టు రాలడాన్ని తగ్గిస్తుంది\n• జుట్టు వృద్ధిని ప్రోత్సహిస్తుంది\n• తలచర్మం మరియు వేర్లకు పోషణ అందిస్తుంది\n• సహజ మెరుపు మరియు బలం",
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
  title:    "బలమైన జుట్టు లోపల నుండి మొదలవుతుంది",
  body1:    "జుట్టు రాలడం, బలహీనమైన వేర్లు మరియు నిస్తేజమైన జుట్టు తరచుగా అంతరంగిక పోషణ లోపానికి సంకేతాలు.",
  body2:    "హేర్ కేర్ నాభి నూనె రాత్రిపూట పనిచేస్తుంది, విశ్రాంతి సమయంలో మూలికలను మీ వ్యవస్థలోకి లోతుగా పంపిస్తుంది.",
  imageSrc: images[2],
};

const balanceSection = {
  title:    "నాభి నుండి జుట్టు బలం ప్రవహిస్తుంది",
  body1:    "ఆయుర్వేదంలో, నాభి శరీరం యొక్క ఇంద్రియ మరియు పోషక నెట్‌వర్క్‌తో అనుసంధానించబడి ఉంటుంది.",
  body2:    "నాభి ద్వారా వేసిన మూలికలు జుట్టు వేర్ల వరకు తమ పోషక ప్రభావాన్ని చేరవేస్తాయి.",
  imageSrc: images[0],
};

const heroBannerSection = {
  title: "హేర్ కేర్ నాభి ఆచారం",
  body:  "ఆయుర్వేద మూలికలు నాభి ద్వారా జుట్టు వేర్లను చేరుకుంటాయి, లోపల నుండి లోతైన పోషణ అందిస్తాయి.",
  stats: [
    { num: "5,000+", label: "సంతోషమైన కస్టమర్లు" },
    { num: "4.58",   label: "సగటు రేటింగ్" },
    { num: "327",    label: "సమీక్షలు" },
    { num: "100%",   label: "ఆయుర్వేదిక్" },
  ],
};

const ritualSection = {
  title:    "నాభి జుట్టు చికిత్స ఎలా పనిచేస్తుంది",
  subtitle: "నాభి శరీరం యొక్క శక్తి కేంద్రం, జుట్టు వేర్లు మరియు తలచర్మం ఆరోగ్యంతో అనుసంధానించబడి ఉంటుంది",
  items: [
    { icon: <GiHerbsBundle size={22} color="#2d5a27" />, title: "మూలిక మిశ్రమం",       desc: "భృంగరాజ్, ఆమ్లా మరియు జాజిపువ్వుతో తయారు చేసిన శక్తివంతమైన సూత్రం" },
    { icon: <GiMeditation  size={22} color="#2d5a27" />, title: "శక్తి కేంద్రం",       desc: "నాభి శరీరం యొక్క ప్రాథమిక శక్తి కేంద్రం" },
    { icon: <GiDroplets    size={22} color="#2d5a27" />, title: "వేగవంతమైన శోషణ",    desc: "నూనె శరీరంలో వేగంగా శోషించబడుతుంది" },
    { icon: <GiHealing     size={22} color="#2d5a27" />, title: "జుట్టు పోషణ",        desc: "జుట్టు రాలడాన్ని తగ్గిస్తుంది మరియు ఆరోగ్యకరమైన వృద్ధిని ప్రోత్సహిస్తుంది" },
  ],
};

const whyUsSection = {
  title:    "హేర్ కేర్ నాభి నూనెను ఎందుకు ఎంచుకోవాలి?",
  subtitle: "లోపల నుండి సహజ జుట్టు సంరక్షణ కోసం",
  items: [
    { icon: <FaLeaf     size={26} color="#2d5a27" />, title: "ఆయుర్వేద సూత్రం",  desc: "100% సహజ పదార్థాలు, రసాయనాలు లేవు" },
    { icon: <HiSparkles size={26} color="#2d5a27" />, title: "జుట్టు రాలడం తగ్గింపు", desc: "లోపల నుండి వేర్లను బలపరుస్తుంది" },
    { icon: <FaLeaf     size={26} color="#2d5a27" />, title: "రాత్రిపూట ఉపయోగం", desc: "నిద్రపోయే ముందు సులభమైన 2 చుక్కల దినచర్య" },
  ],
};

const reviews = {
  items: [
    { id: 1, name: "రితు శర్మ",    rating: 5, body: "3 వారాల్లోనే నా జుట్టు రాలడం గమనీయంగా తగ్గింది.", date: "02/10/2026" },
    { id: 2, name: "అర్జున్ మెహతా", rating: 5, body: "చాలా మంచి ఉత్పత్తి, జుట్టు బలంగా మరియు మెరిసే విధంగా అనిపిస్తోంది.", date: "01/22/2026" },
  ],
};

export const nabhiHairTeluguConfig = {
  product, variants, images, upiIcons, marqueeItems, trustTags, accordionData,
  howToUseImages, benefitsCarouselImages, bloatSection, balanceSection,
  heroBannerSection, ritualSection, whyUsSection, reviews, reviewPhotos
};