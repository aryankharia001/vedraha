import React from "react";
import { GiNightSleep, GiMeditation, GiHerbsBundle, GiHealing } from "react-icons/gi";
import { FaLeaf, FaShieldAlt } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { TbTruckDelivery, TbRefresh } from "react-icons/tb";

const product = {
  id:             "sleep-relief-nabhi-oil",
  name:           "స్లీప్ రిలీఫ్ నాభి నూనె",
  tagline:        "లోతైన & విశ్రాంతికరమైన నిద్ర కోసం",
  image:          "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=sleep1.webp&version_id=null",
  subtitle:       "ఒత్తిడి తగ్గిస్తుంది & నిద్ర నాణ్యతను మెరుగుపరుస్తుంది",
  h1:             "స్లీప్ రిలీఫ్ నాభి నూనె – ఒత్తిడి తగ్గించండి & లోతైన నిద్ర పొందండి",
  reviewSummary:  "4.73 · 742 ధృవీకరించిన సమీక్షలు",
  paymentImage:   null,
  logoImage:      "/NabhiLogo/nabhiLogo.png",
  brandName:      "హోమ్ విత్ కేర్ · వేద సంజీవని",
  contactEmail:   "akravipvtltd@gmail.com",
  whatsappNumber: "919717143189",
  whatsappMessage:"Hi, I'm interested in Sleep Relief Oil",
  fbPixelId:      "1622075442328928",
  cartStorageKey: "exclusiveCart",
  themeColor:     "#2e5b33",
};

const variants = [
  { id: 1, label: "1 బాటిల్ కొనండి",              price: "₹599",   priceNum: 599,  badge: null,              externalVariantId: 477155614444106816 },
  { id: 2, label: "2 బాటిళ్లు కొనండి – ₹150 తగ్గింపు", price: "₹1,049", priceNum: 1049, badge: "₹150 ఆదా చేయండి", externalVariantId: 477155630281798720 },
];

const images = [
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=sleep1.webp&version_id=null",
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=sleep2.webp&version_id=null",
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=sleep3.webp&version_id=null",
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=sleep4.webp&version_id=null",
];

const upiIcons = [
  { src: "https://img.icons8.com/?size=100&id=am4ltuIYDpQ5&format=png&color=000000", alt: "GPay",    zIndex: 10 },
  { src: "https://img.icons8.com/?size=100&id=OYtBxIlJwMGA&format=png&color=000000", alt: "PhonePe", zIndex: 20 },
  { src: "https://img.icons8.com/?size=100&id=68067&format=png&color=000000",        alt: "Paytm",   zIndex: 30 },
];

const marqueeItems = [
  { text: "ఉచిత షిప్పింగ్" },
  { text: "15,000+ సంతోషమైన కస్టమర్లు" },
  { text: "డెలివరీపై నగదు (COD)" },
  { text: "ఒత్తిడి నివారణ" },
  { text: "లోతైన నిద్ర" },
];

const trustTags = [
  { icon: <TbTruckDelivery size={15} />, label: "ఉచిత షిప్పింగ్" },
  { icon: <FaShieldAlt size={13} />,     label: "COD అందుబాటులో" },
  { icon: <TbRefresh size={15} />,       label: "సులభ రిటర్న్" },
  { icon: <FaLeaf size={13} />,          label: "100% సహజ" },
];

const accordionData = [
  {
    title: "ఈ నూనెను ఎందుకు ఎంచుకోవాలి",
    content:
      "ఈ ప్రత్యేక నాభి నూనె మానసిక శాంతి మరియు లోతైన, విశ్రాంతికరమైన నిద్ర కోసం రూపొందించబడింది.\n\nముఖ్య ప్రయోజనాలు:\n• నిద్రపోవడంలో వేగంగా సహాయపడుతుంది\n• ఒత్తిడి మరియు ఆందోళనను తగ్గిస్తుంది\n• మనసును శాంతింపచేస్తుంది\n• మొత్తం నిద్ర నాణ్యతను మెరుగుపరుస్తుంది",
  },
  {
    title: "ఎలా ఉపయోగించాలి",
    content:
      "రాత్రి నిద్రపోయే ముందు నాభిలో 2-3 చుక్కలు వేసి మెల్లగా మసాజ్ చేయండి.\n\nఅత్యుత్తమ ఫలితాల కోసం రోజువారీ ఉపయోగించండి.",
  },
  {
    title: "ముఖ్యమైన గమనిక",
    content:
      "బాహ్య ఉపయోగానికి మాత్రమే.\n\nకళ్ల నుండి దూరంగా ఉంచండి.\n\nఇది మందు కాదు.",
  },
];

const bloatSection = {
  title:    "ఒత్తిడి & అనిద్ర నుండి నివారణ",
  body1:    "నిద్ర లేమి మరియు ఒత్తిడి ఆధునిక జీవితంలో చాలా సాధారణంగా మారాయి.",
  body2:    "ఈ నాభి నూనె శరీరం మరియు మనసు రెండింటినీ శాంతింపచేస్తుంది, ప్రతి రాత్రి మీకు మెరుగ్గా నిద్రపోవడంలో సహాయపడుతుంది.",
  imageSrc: images[1],
};

const balanceSection = {
  title:    "సహజ శాంతిని అనుభవించండి",
  body1:    "ఆయుర్వేద ప్రకారం, నాభి శరీరం యొక్క ముఖ్యమైన శక్తి కేంద్రం.",
  body2:    "ఈ నూనె నాభి ద్వారా పనిచేసి మీ మొత్తం వ్యవస్థకు లోతైన విశ్రాంతిని తీసుకువస్తుంది.",
  imageSrc: images[0],
};

const heroBannerSection = {
  title: "లోతైన నిద్ర ఆచారం",
  body:  "ప్రతి రాత్రి శాంతియుతమైన మరియు విశ్రాంతికరమైన నిద్రను అనుభవించండి.",
  stats: [
    { num: "15,000+", label: "సంతోషమైన కస్టమర్లు" },
    { num: "4.73",    label: "సగటు రేటింగ్" },
    { num: "742",     label: "సమీక్షలు" },
    { num: "100%",    label: "సహజ" },
  ],
};

const reviewPhotos = [
  
];

const ritualSection = {
  title:    "ఇది ఎలా పనిచేస్తుంది",
  subtitle: "ఆయుర్వేద మూలికలతో సమృద్ధం",
  items: [
    { icon: <GiHerbsBundle size={22} color="#2c3e50" />, title: "మూలిక పదార్థాలు",    desc: "స్వచ్ఛమైన సహజ తత్వాల నుండి తయారు చేయబడింది" },
    { icon: <GiMeditation  size={22} color="#2c3e50" />, title: "మానసిక శాంతి",       desc: "మనసును శాంతింపచేస్తుంది మరియు ప్రశాంతపరుస్తుంది" },
    { icon: <GiNightSleep  size={22} color="#2c3e50" />, title: "లోతైన నిద్ర",         desc: "లోతైన నిద్రను సాధించడంలో సహాయపడుతుంది" },
    { icon: <GiHealing     size={22} color="#2c3e50" />, title: "విశ్రాంతి & రికవరీ", desc: "ఒత్తిడి మరియు అలసటను తగ్గిస్తుంది" },
  ],
};

const whyUsSection = {
  title:    "మా స్లీప్ ఆయిల్‌ను ఎందుకు ఎంచుకోవాలి?",
  subtitle: "రోజువారీ ఉపయోగానికి సహజ మరియు సురక్షిత",
  items: [
    { icon: <FaLeaf     size={26} color="#2c3e50" />, title: "100% సహజ",          desc: "రసాయనాలు లేవు, కృత్రిమ సంకలితాలు లేవు" },
    { icon: <HiSparkles size={26} color="#2c3e50" />, title: "మెరుగైన నిద్ర",     desc: "నిద్ర నాణ్యతను గమనీయంగా మెరుగుపరుస్తుంది" },
    { icon: <FaLeaf     size={26} color="#2c3e50" />, title: "ఉపయోగించడం సులభం", desc: "నిద్రపోయే ముందు కేవలం రాత్రి వేయండి" },
  ],
};

const reviews = {
  items: [
    { id: 1, name: "రాహుల్ శర్మ",  rating: 5, body: "నా నిద్ర చాలా మెరుగుపడింది. వేగంగా నిద్రపోతున్నాను మరియు తాజాగా మేల్కొంటున్నాను.", date: "03/10/2026" },
    { id: 2, name: "నేహా వర్మ",    rating: 5, body: "ఒత్తిడి గమనీయంగా తగ్గింది మరియు ఉదయం చాలా విశ్రాంతిగా అనిపిస్తోంది.", date: "02/25/2026" },
  ],
};

export const nabhiSleepTeluguConfig = {
  product, variants, images, upiIcons, marqueeItems, trustTags, accordionData,
  howToUseImages:         images,
  benefitsCarouselImages: images,
  bloatSection, balanceSection, heroBannerSection, ritualSection,
  whyUsSection, reviews, reviewPhotos
};