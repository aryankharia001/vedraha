import React from "react";
import { GiHerbsBundle, GiMeditation, GiDroplets, GiHealing } from "react-icons/gi";
import { FaLeaf, FaShieldAlt } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { TbTruckDelivery, TbRefresh } from "react-icons/tb";

const product = {
  id:             "menstrual-pain-nabhi-oil",
  name:           "మాసిక నొప్పి నివారణ నాభి నూనె",
  tagline:        "మీ చక్రాన్ని సహజంగా సౌకర్యవంతంగా చేయండి",
  image:          "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=menstrual1.webp&version_id=null",
  subtitle:       "మహిళలకు ప్రత్యేక ఆయుర్వేద సూత్రం",
  h1:             "మాసిక నొప్పి నివారణ నాభి నూనె – సహజ పిరియడ్ నొప్పి నివారణ",
  reviewSummary:  "4.63 · 350+ ధృవీకరించిన సమీక్షలు",
  paymentImage:   null,
  logoImage:      "/NabhiLogo/nabhiLogo.png",
  brandName:      "హోమ్ విత్ కేర్ · వేద సంజీవని",
  contactEmail:   "akravipvtltd@gmail.com",
  whatsappNumber: "919717143189",
  whatsappMessage:"Hi, I'm interested in Menstrual Pain Relief Nabhi Oil",
  fbPixelId:      "1622075442328928",
  cartStorageKey: "exclusiveCart",
  themeColor:     "#8e3b5b",
};

const variants = [
  { id: 1, label: "1 బాటిల్ కొనండి",              price: "₹599",   priceNum: 599,  mrp: 699,  badge: null,              externalVariantId: 477247968715569088 },
  { id: 2, label: "2 బాటిళ్లు కొనండి – ₹100 తగ్గింపు", price: "₹1,099", priceNum: 1099, mrp: 1398, badge: "₹100 ఆదా చేయండి", externalVariantId: 477247976768632768 },
];

const images = [
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=menstrual1.webp&version_id=null",
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=menstrual2.webp&version_id=null",
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=menstrual3.webp&version_id=null",
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=menstrual4.webp&version_id=null",
];

const upiIcons = [
  { src: "https://img.icons8.com/?size=100&id=am4ltuIYDpQ5&format=png&color=000000", alt: "GPay",    zIndex: 10 },
  { src: "https://img.icons8.com/?size=100&id=OYtBxIlJwMGA&format=png&color=000000", alt: "PhonePe", zIndex: 20 },
  { src: "https://img.icons8.com/?size=100&id=68067&format=png&color=000000",        alt: "Paytm",   zIndex: 30 },
];

const marqueeItems = [
  { text: "ఉచిత షిప్పింగ్" },
  { text: "డెలివరీపై నగదు అందుబాటులో" },
  { text: "ప్రతి ఆర్డర్‌లో నాణ్యత తనిఖీ" },
  { text: "పూర్తి ఆర్డర్ ట్రాకింగ్" },
];

const trustTags = [
  { icon: <TbTruckDelivery size={15} />, label: "ఉచిత షిప్పింగ్" },
  { icon: <FaShieldAlt size={13} />,     label: "COD అందుబాటులో" },
  { icon: <TbRefresh size={15} />,       label: "సులభ రిటర్న్" },
  { icon: <FaLeaf size={13} />,          label: "100% సహజ" },
];

const accordionData = [
  {
    title: "ఈ నాభి నూనెను ఎందుకు ఎంచుకోవాలి",
    content:
      "మహిళలకు ప్రత్యేకంగా రూపొందించిన ఆయుర్వేద పరిష్కారం.\n\nముఖ్య ప్రయోజనాలు:\n• మాసిక తిమ్మిర్లను తగ్గిస్తుంది\n• హార్మోన్ సమతుల్యతకు మద్దతు ఇస్తుంది\n• ఉబ్బరం మరియు అసౌకర్యాన్ని తగ్గిస్తుంది\n• పిరియడ్‌లను మరింత సౌకర్యంగా చేస్తుంది",
  },
  {
    title: "ఎలా ఉపయోగించాలి",
    content:
      "పిరియడ్ సమయంలో నాభిలో 2-3 చుక్కలు వేయండి.\n\n1 నిమిషం మెల్లగా మసాజ్ చేయండి.\n\nఅత్యుత్తమ ఫలితాల కోసం రోజువారీ ఉపయోగించండి.",
  },
  {
    title: "ముఖ్యమైన సమాచారం",
    content:
      "బాహ్య ఉపయోగానికి మాత్రమే.\n\nముందుగా పాచ్ టెస్ట్ చేయండి.\n\nతీవ్రమైన సమస్య ఉంటే వైద్యుని సంప్రదించండి.",
  },
];

const howToUseImages = images;
const benefitsCarouselImages = images;

const bloatSection = {
  title:    "పిరియడ్ నొప్పి నుండి సహజ నివారణ",
  body1:    "తిమ్మిర్లు, ఉబ్బరం మరియు నొప్పి మీ చక్రం సమయంలో రోజువారీ జీవితాన్ని గణనీయంగా ప్రభావితం చేయవచ్చు.",
  body2:    "ఈ నూనె నాభి చికిత్స ద్వారా లోపల నుండి నివారణ అందిస్తుంది — సహజంగా మరియు సున్నితంగా.",
  imageSrc: images[1],
};


const reviewPhotos = [
  
];

const balanceSection = {
  title:    "నాభి చికిత్స & హార్మోన్ సమతుల్యత",
  body1:    "నాభి పునరుత్పత్తి ఆరోగ్యాన్ని ప్రభావితం చేసే 72,000+ నాడులతో అనుసంధానించబడి ఉంటుంది.",
  body2:    "నాభి ద్వారా నూనె శోషణ హార్మోన్ సమతుల్యతకు మద్దతు ఇస్తుంది మరియు అసౌకర్యాన్ని తగ్గిస్తుంది.",
  imageSrc: images[0],
};

const heroBannerSection = {
  title: "పిరియడ్ నివారణ కోసం పురాతన నాభి చికిత్స",
  body:  "ఆయుర్వేద పద్ధతిలో నొప్పిని తగ్గించండి మరియు మీ చక్రం అంతటా సమతుల్యతను నిర్వహించండి.",
  stats: [
    { num: "10,000+", label: "సంతోషమైన కస్టమర్లు" },
    { num: "4.63",    label: "సగటు రేటింగ్" },
    { num: "350+",    label: "సమీక్షలు" },
    { num: "100%",    label: "ఆయుర్వేదిక్" },
  ],
};

const ritualSection = {
  title:    "నాభి చికిత్స ఎలా పనిచేస్తుంది",
  subtitle: "ఆయుర్వేద జ్ఞానంలో వేరూడిన",
  items: [
    { icon: <GiHerbsBundle size={22} color="#8e3b5b" />, title: "మూలిక మిశ్రమం",    desc: "మహిళల ఆరోగ్యం కోసం రూపొందించిన ప్రత్యేక సూత్రం" },
    { icon: <GiMeditation  size={22} color="#8e3b5b" />, title: "శక్తి కేంద్రం",    desc: "నాభి శరీరం యొక్క ప్రధాన శక్తి కేంద్రం" },
    { icon: <GiDroplets    size={22} color="#8e3b5b" />, title: "శోషణ",              desc: "నూనె నాడీ నెట్‌వర్క్ ద్వారా శరీరంలోకి ప్రవేశిస్తుంది" },
    { icon: <GiHealing     size={22} color="#8e3b5b" />, title: "నివారణ",            desc: "నొప్పి మరియు అసౌకర్యాన్ని సహజంగా తగ్గిస్తుంది" },
  ],
};

const whyUsSection = {
  title:    "మా ఉత్పత్తిని ఎందుకు ఎంచుకోవాలి?",
  subtitle: "మహిళలకు విశ్వసనీయ ఆయుర్వేద సంరక్షణ",
  items: [
    { icon: <FaLeaf     size={26} color="#8e3b5b" />, title: "100% సహజ",          desc: "రసాయనాలు లేవు, కృత్రిమ సంకలితాలు లేవు" },
    { icon: <HiSparkles size={26} color="#8e3b5b" />, title: "హార్మోన్ మద్దతు",  desc: "మీ చక్రం సమయంలో సహజ సమతుల్యతను ప్రోత్సహిస్తుంది" },
    { icon: <FaLeaf     size={26} color="#8e3b5b" />, title: "ఉపయోగించడం సులభం", desc: "రాత్రి కేవలం 2-3 చుక్కలు" },
  ],
};

const reviews = {
  items: [
    { id: 1, name: "ప్రియంక శర్మ",  rating: 5, body: "నొప్పి నుండి గణనీయమైన నివారణ కలిగింది. నా పిరియడ్‌లు చాలా నిర్వహణీయంగా అనిపిస్తున్నాయి.", date: "02/18/2026" },
    { id: 2, name: "అనుష్క వర్మ",   rating: 5, body: "పిరియడ్‌లు సులభమయ్యాయి. ఉబ్బరం తక్కువగా అనిపిస్తోంది మరియు తిమ్మిర్లు తేలికగా ఉన్నాయి.", date: "01/29/2026" },
  ],
};

export const nabhiMenstrualTeluguConfig = {
  product, variants, images, upiIcons, marqueeItems, trustTags, accordionData,
  howToUseImages, benefitsCarouselImages, bloatSection, balanceSection,
  heroBannerSection, ritualSection, whyUsSection, reviews, reviewPhotos
};