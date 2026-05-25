import React from "react";
import { GiHerbsBundle, GiMeditation, GiDroplets, GiHealing, GiKneeBandage } from "react-icons/gi";
import { FaLeaf, FaShieldAlt } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { TbTruckDelivery, TbRefresh } from "react-icons/tb";

const product = {
  id:             "joint-pain-nabhi-oil",
  name:           "జాయింట్ పెయిన్ రెమెడీ నాభి నూనె",
  tagline:        "ఆయుర్వేద నాభి చికిత్స",
  image:          "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=Gemini_Generated_Image_jejzeajejzeajejz.png.webp&version_id=null",
  subtitle:       "ఆయుర్వేద నాభి చికిత్స",
  h1:             "జాయింట్ పెయిన్ రెమెడీ నాభి నూనె – మోకాలు & వెన్నునొప్పి నివారణ",
  reviewSummary:  "4.46 · 287 ధృవీకరించిన సమీక్షలు",
  paymentImage:   null,
  logoImage:      "/NabhiLogo/nabhiLogo.png",
  brandName:      "హోమ్ విత్ కేర్ · వేద సంజీవని",
  contactEmail:   "akravipvtltd@gmail.com",
  whatsappNumber: "919717143189",
  whatsappMessage:"Hi, I'm interested in Joint Pain Nabhi Oil",
  fbPixelId:      "1622075442328928",
  cartStorageKey: "exclusiveCart",
  themeColor:     "#2d5a27",
};

const variants = [
  { id: 1, label: "1 బాటిల్ కొనండి",              price: "₹549",  priceNum: 549,  mrp: 699,  badge: null,              externalVariantId: 477155402648532032 },
  { id: 2, label: "2 బాటిళ్లు కొనండి – ₹100 తగ్గింపు", price: "₹899",  priceNum: 899,  mrp: 1198, badge: "₹299 ఆదా చేయండి", externalVariantId: 477155416070304832 },
];

const images = [
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=Gemini_Generated_Image_io9cidio9cidio9c-1.png.webp&version_id=null",
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=Gemini_Generated_Image_b1ri32b1ri32b1ri.png.webp&version_id=null",
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=Gemini_Generated_Image_jejzeajejzeajejz.png.webp&version_id=null",
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=Gemini_Generated_Image_3y48f93y48f93y48.png.webp&version_id=null",
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
    title: "జాయింట్ పెయిన్ రెమెడీ నాభి నూనెను ఎందుకు ఎంచుకోవాలి",
    content:
      "కఠినత్వాన్ని తగ్గించండి, నొప్పి నుండి నివారణ పొందండి మరియు మీ సహజ వశ్యతను పునరుద్ధరించండి — పూర్తిగా సహజంగా.\n\nముఖ్య ప్రయోజనాలు:\n• కీళ్ల నొప్పి మరియు కఠినత్వాన్ని నివారిస్తుంది\n• వాపు మరియు మంటను తగ్గిస్తుంది\n• వశ్యత మరియు చలనాన్ని మెరుగుపరుస్తుంది\n• ఎముకలు మరియు కీళ్ల ఆరోగ్యానికి మద్దతు ఇస్తుంది",
  },
  {
    title: "ఎలా ఉపయోగించాలి",
    content:
      "రాత్రి నిద్రపోయే ముందు నాభిలో 2-3 చుక్కలు వేయండి.\n\n1-2 నిమిషాలు సవ్యదిశలో వృత్తాకారంగా మెల్లగా మసాజ్ చేయండి.\n\nఅత్యుత్తమ ఫలితాల కోసం ప్రతి రాత్రి ఉపయోగించండి.",
  },
  {
    title: "ముఖ్యమైన గమనిక",
    content:
      "బాహ్య ఉపయోగానికి మాత్రమే.\n\nమొదటి ఉపయోగానికి ముందు 20 నిమిషాల పాచ్ టెస్ట్ చేయండి.\n\nగర్భం మరియు స్తన్యపానం సమయంలో ఉపయోగించవద్దు.",
  },
];

const howToUseImages = [
  { url: "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=Gemini_Generated_Image_io9cidio9cidio9c-1.png.webp&version_id=null" },
  { url: "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=Gemini_Generated_Image_b1ri32b1ri32b1ri.png.webp&version_id=null" },
  { url: "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=Gemini_Generated_Image_3y48f93y48f93y48.png.webp&version_id=null" },
  { url: "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=Gemini_Generated_Image_jejzeajejzeajejz.png.webp&version_id=null" },
];

const benefitsCarouselImages = [
  { url: "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=Gemini_Generated_Image_jejzeajejzeajejz.png.webp&version_id=null" },
  { url: "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=Gemini_Generated_Image_io9cidio9cidio9c-1.png.webp&version_id=null" },
  { url: "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=Gemini_Generated_Image_b1ri32b1ri32b1ri.png.webp&version_id=null" },
  { url: "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=Gemini_Generated_Image_3y48f93y48f93y48.png.webp&version_id=null" },
];


const bloatSection = {
  title:    "నొప్పి లేని ఉదయాలు",
  body1:    "మోకాళ్లు, తుంటులు మరియు నడుం నొప్పులో ఉదయం కఠినత్వం 40 సంవత్సరాలకు పైగా ఉన్న వ్యక్తులలో అత్యంత సాధారణ సమస్య. జాయింట్ పెయిన్ రెమెడీ నాభి నూనె రాత్రిపూట పనిచేస్తుంది — నిద్రపోయే ముందు వేయండి.",
  body2:    "క్రమం తప్పకుండా ఉపయోగిస్తే, చాలా మంది కస్టమర్లు గణనీయంగా తక్కువ కఠినత్వంతో మేల్కొంటారని చెబుతున్నారు.",
  imageSrc: "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=Gemini_Generated_Image_jejzeajejzeajejz.png.webp&version_id=null",
};

const reviewPhotos = [

];

const balanceSection = {
  title:    "నాభి నుండి నయం శక్తి ప్రవహిస్తుంది",
  body1:    "ఆయుర్వేదంలో, <strong>నాభి</strong> శరీరం యొక్క ప్రాథమిక శక్తి కేంద్రం, కీళ్ల ఆరోగ్యాన్ని, వాపు స్థాయిలను మరియు మొత్తం జీవశక్తిని ప్రభావితం చేసే వేలాది సూక్ష్మ ఛానెల్‌లతో అనుసంధానించబడి ఉంటుంది.",
  body2:    "ఈ ప్రత్యేకంగా రూపొందించిన ఆయుర్వేద నూనెతో నాభికి పోషణ అందించడం ద్వారా, మీరు అంతరంగిక సమతుల్యతను పునరుద్ధరించడంలో సహాయపడతారు.",
  videoSrc: false,
  imageSrc: "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=Gemini_Generated_Image_3y48f93y48f93y48.png.webp&version_id=null",
};

const heroBannerSection = {
  title: "పురాతన నాభి నొప్పి నివారణ ఆచారం",
  body:  "కీళ్ల నొప్పి, కఠినత్వం మరియు వాపు తరచుగా పేద రక్త ప్రసరణ మరియు అంతరంగిక వాపు నుండి వస్తాయి. జాయింట్ పెయిన్ రెమెడీ నాభి నూనె నేరుగా నాభిపై వేయబడుతుంది.",
  stats: [
    { num: "5,000+", label: "సంతోషమైన కస్టమర్లు" },
    { num: "4.46",   label: "సగటు రేటింగ్" },
    { num: "287",    label: "ధృవీకరించిన సమీక్షలు" },
    { num: "100%",   label: "ఆయుర్వేదిక్" },
  ],
};

const ritualSection = {
  title:    "నాభి చికిత్స కీళ్ల నొప్పిని ఎలా నివారిస్తుంది",
  subtitle: "పురాతన ఆయుర్వేద జ్ఞానంలో వేరూడిన — నాభి కేంద్రం వేలాది శక్తి ఛానెల్‌ల ద్వారా ప్రతి కీలు మరియు అవయవంతో అనుసంధానించబడి ఉంటుంది.",
  items: [
    { icon: <GiHerbsBundle size={22} color="#2d5a27" />, title: "శక్తివంతమైన మూలిక మిశ్రమం",    desc: "అజ్వాయిన్, హింగు, అల్లం మరియు ఇతర ఆయుర్వేద మూలికలతో నిండి ఉంటుంది." },
    { icon: <GiMeditation  size={22} color="#2d5a27" />, title: "నాభి శక్తి కేంద్రం",           desc: "నాభి శరీరం యొక్క ప్రాథమిక శక్తి కేంద్రం, వేలాది నాడులతో అనుసంధానించబడి ఉంటుంది." },
    { icon: <GiDroplets    size={22} color="#2d5a27" />, title: "లోతైన ట్రాన్స్‌డర్మల్ శోషణ",   desc: "నాభి ప్రాంతం నాడీ చివరలు మరియు సూక్ష్మ రక్తనాళాలతో సమృద్ధంగా ఉంటుంది." },
    { icon: <GiHealing     size={22} color="#2d5a27" />, title: "కీళ్ల సమతుల్యత పునరుద్ధరణ",   desc: "వాపును సహజంగా తగ్గించడంలో సహాయపడుతుంది మరియు క్రమం తప్పకుండా ఉపయోగించడం వల్ల మెరుగైన వశ్యత కలుగుతుంది." },
  ],
};

const whyUsSection = {
  title:    "జాయింట్ పెయిన్ రెమెడీని ఎందుకు ఎంచుకోవాలి?",
  subtitle: "సహజ కీళ్ల సౌకర్యం కోసం భారతదేశం అంతటా వేలాది మంది విశ్వసిస్తున్నారు.",
  items: [
    { icon: <GiKneeBandage size={28} color="#2d5a27" />, title: "కీళ్ల నొప్పి & కఠినత్వ నివారణ", desc: "నాభి యొక్క శక్తి ఛానెల్‌ల ద్వారా కీళ్ల అసౌకర్యం యొక్క మూలాన్ని చేరుకుంటుంది." },
    { icon: <FaLeaf        size={26} color="#2d5a27" />, title: "100% ఆయుర్వేద మూలికలు",      desc: "అజ్వాయిన్, హింగు, అల్లం మరియు ఇతర సమయ-పరీక్షిత మూలికలతో తయారు చేయబడింది." },
    { icon: <HiSparkles    size={26} color="#2d5a27" />, title: "వాపు తగ్గింపు",              desc: "శాంతికరమైన మూలిక మిశ్రమం కీళ్ల చుట్టూ వాపు మరియు మంటను తగ్గించడంలో సహాయపడుతుంది." },
    { icon: <FaLeaf        size={26} color="#2d5a27" />, title: "సరళ రాత్రి ఆచారం",           desc: "నిద్రపోయే ముందు నాభిలో కేవలం 2-3 చుక్కలు — ఇబ్బంది లేదు." },
  ],
};

const greenMarqueeItems = [
  { icon: <FaLeaf size={13} />, text: "కీళ్ల నొప్పిని తగ్గించండి" },
  { icon: <FaLeaf size={13} />, text: "కఠినత్వానికి వీడ్కోలు" },
  { icon: <FaLeaf size={13} />, text: "వశ్యతను తిరిగి పొందండి" },
  { icon: <FaLeaf size={13} />, text: "స్వేచ్ఛగా నడవండి" },
];

const reviews = {
  items: [
    { id: 1, name: "రమేష్ గుప్తా",   rating: 5, body: "3 వారాల నుండి ఉపయోగిస్తున్నాను. ఉదయం మోకాలు కఠినత్వం గణనీయంగా తగ్గింది.", date: "03/12/2026", image: null, likes: 4 },
    { id: 2, name: "సునీతా వర్మ",    rating: 5, body: "నేను సంవత్సరాల పాటు వెన్నునొప్పితో బాధపడ్డాను. ఈ నూనె వేయడం వల్ల స్పష్టమైన నివారణ కలిగింది.", date: "02/28/2026", image: null, likes: 6 },
    { id: 3, name: "ఫాతిమా అన్సారీ", rating: 5, body: "నా అమ్మకు ఆర్థరైటిస్ ఉంది. ఆమె దీన్ని వేసింది, వేళ్లలో వాపు తగ్గిందని చెప్పింది.", date: "01/30/2026", image: null, likes: 7 },
  ],
  photos: [],
  photoReviewers: [],
};

export const nabhiJointTeluguConfig = {
  product, variants, images, upiIcons, marqueeItems, trustTags, accordionData,
  howToUseImages, benefitsCarouselImages, bloatSection, balanceSection,
  reviewPhotos, heroBannerSection, ritualSection, whyUsSection,
  greenMarqueeItems, reviews
};