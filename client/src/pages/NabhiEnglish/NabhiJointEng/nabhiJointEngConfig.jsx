import React from "react";
import { GiHerbsBundle, GiMeditation, GiDroplets, GiHealing, GiKneeBandage } from "react-icons/gi";
import { FaLeaf, FaShieldAlt } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { TbTruckDelivery, TbRefresh } from "react-icons/tb";

// ─── Product metadata ─────────────────────────────────────────────────────────
const product = {
  id:             "joint-pain-nabhi-oil",
  name:           "Joint Pain Remedy Nabhi Oil",
  tagline:        "Ayurvedic Navel Therapy",
  image:          "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=Gemini_Generated_Image_jejzeajejzeajejz.png.webp&version_id=null",
  subtitle:       "Ayurvedic Navel Therapy",
  h1:             "Joint Pain Remedy Nabhi Oil – Relief for Knee & Back Pain",
  reviewSummary:  "4.46 · 287 Verified Reviews",
  paymentImage:   null,
  logoImage:      "/NabhiLogo/nabhiLogo.png",
  brandName:      "Home With Care · Ved Sanjeevani",
  contactEmail:   "akravipvtltd@gmail.com",
  whatsappNumber: "919717143189",
  whatsappMessage:"Hi, I'm interested in Joint Pain Nabhi Oil",
  fbPixelId:      "1622075442328928",
  cartStorageKey: "exclusiveCart",
  themeColor:     "#2d5a27",
};

// ─── Variants ─────────────────────────────────────────────────────────────────
const variants = [
  { id: 1, label: "Buy 1 Bottle",                   price: "₹549",  priceNum: 549,  mrp: 699,  badge: null,          externalVariantId: 477155402648532032 },
  { id: 2, label: "Buy 2 Bottles – ₹100 Off",       price: "₹899",  priceNum: 899,  mrp: 1198, badge: "Save ₹299",   externalVariantId: 477155416070304832 },
];

// ─── Gallery images ───────────────────────────────────────────────────────────
const images = [
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=Gemini_Generated_Image_3y48f93y48f93y48.png.webp&version_id=null",
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=Gemini_Generated_Image_b1ri32b1ri32b1ri.png.webp&version_id=null",
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=Gemini_Generated_Image_jejzeajejzeajejz.png.webp&version_id=null",
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=Gemini_Generated_Image_io9cidio9cidio9c-1.png.webp&version_id=null",
];

// ─── UPI icons ────────────────────────────────────────────────────────────────
const upiIcons = [
  { src: "https://img.icons8.com/?size=100&id=am4ltuIYDpQ5&format=png&color=000000", alt: "GPay",    zIndex: 10 },
  { src: "https://img.icons8.com/?size=100&id=OYtBxIlJwMGA&format=png&color=000000", alt: "PhonePe", zIndex: 20 },
  { src: "https://img.icons8.com/?size=100&id=68067&format=png&color=000000",        alt: "Paytm",   zIndex: 30 },
];

// ─── Marquee ──────────────────────────────────────────────────────────────────
const marqueeItems = [
  { text: "Free Shipping" },
  { text: "5,000+ Happy Customers" },
  { text: "Cash on Delivery (COD)" },
  { text: "100% Ayurvedic" },
  { text: "Quality Checked on Every Order" },
];

// ─── Trust tags ───────────────────────────────────────────────────────────────
const trustTags = [
  { icon: <TbTruckDelivery size={15} />, label: "Free Shipping" },
  { icon: <FaShieldAlt size={13} />,     label: "COD Available" },
  { icon: <TbRefresh size={15} />,       label: "Easy Returns" },
  { icon: <FaLeaf size={13} />,          label: "100% Natural" },
];

// ─── Accordion ────────────────────────────────────────────────────────────────
const accordionData = [
  {
    title: "Why Choose Joint Pain Remedy Nabhi Oil",
    content:
      "Ease stiffness, find relief from pain, and restore your natural flexibility — completely naturally.\n\nKey Benefits:\n• Relieves joint pain and stiffness\n• Reduces inflammation and irritation\n• Improves flexibility and mobility\n• Supports bone and joint health",
  },
  {
    title: "How to Use",
    content:
      "Apply 2–3 drops into the navel before sleeping at night.\n\nMassage gently in a slow clockwise circular motion for 1–2 minutes.\n\nUse every night for best results.",
  },
  {
    title: "Important Notice",
    content:
      "For external use only.\n\nDo a 20-minute patch test before first use.\n\nDo not use during pregnancy or breastfeeding.",
  },
];

// ─── How to Use carousel ──────────────────────────────────────────────────────
const howToUseImages = [
  { url: "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=Gemini_Generated_Image_io9cidio9cidio9c-1.png.webp&version_id=null" },
  { url: "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=Gemini_Generated_Image_b1ri32b1ri32b1ri.png.webp&version_id=null" },
  { url: "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=Gemini_Generated_Image_3y48f93y48f93y48.png.webp&version_id=null" },
  { url: "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=Gemini_Generated_Image_jejzeajejzeajejz.png.webp&version_id=null" },
];

// ─── Benefits carousel ────────────────────────────────────────────────────────
const benefitsCarouselImages = [
  { url: "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=Gemini_Generated_Image_jejzeajejzeajejz.png.webp&version_id=null" },
  { url: "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=Gemini_Generated_Image_io9cidio9cidio9c-1.png.webp&version_id=null" },
  { url: "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=Gemini_Generated_Image_b1ri32b1ri32b1ri.png.webp&version_id=null" },
  { url: "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=Gemini_Generated_Image_3y48f93y48f93y48.png.webp&version_id=null" },
];

// ─── Feature Section ──────────────────────────────────────────────────────────
const bloatSection = {
  title:    "Pain-Free Mornings",
  body1:    "Morning stiffness in knees, hips, and the lower back is one of the most common complaints for people over 40. Joint Pain Remedy Nabhi Oil works overnight — apply before bed so the herbs absorb deeply during rest.",
  body2:    "With regular use, many customers report waking up with significantly less stiffness.",
  imageSrc: "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=Gemini_Generated_Image_jejzeajejzeajejz.png.webp&version_id=null",
};

const reviewPhotos = [
  
];

// ─── Balance Section ──────────────────────────────────────────────────────────
const balanceSection = {
  title:    "Healing Power Flows from the Navel",
  body1:    "In Ayurveda, the <strong>navel</strong> is the body's primary energy center, connected to thousands of subtle channels that influence joint health, inflammation levels, and overall vitality.",
  body2:    "By nourishing the navel with this specially formulated Ayurvedic oil, you help restore internal balance.",
  videoSrc: false,
  imageSrc: "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=Gemini_Generated_Image_3y48f93y48f93y48.png.webp&version_id=null",
};

// ─── Hero Banner ──────────────────────────────────────────────────────────────
const heroBannerSection = {
  title: "The Ancient Navel Pain Relief Ritual",
  body:  "Joint pain, stiffness, and inflammation often stem from poor circulation and internal inflammation. Joint Pain Remedy Nabhi Oil is applied directly to the navel, where it absorbs through thousands of nerve channels.",
  stats: [
    { num: "5,000+", label: "Happy Customers" },
    { num: "4.46",   label: "Average Rating" },
    { num: "287",    label: "Verified Reviews" },
    { num: "100%",   label: "Ayurvedic" },
  ],
};

// ─── Ritual Section ───────────────────────────────────────────────────────────
const ritualSection = {
  title:    "How Navel Therapy Relieves Joint Pain",
  subtitle: "Rooted in ancient Ayurvedic wisdom — the navel center is connected to every joint and organ through thousands of energy channels.",
  items: [
    { icon: <GiHerbsBundle size={22} color="#2d5a27" />, title: "Powerful Herbal Blend",       desc: "Infused with Ajwain, Asafoetida, Ginger, and other Ayurvedic herbs — slow-cooked to extract full therapeutic potency for joint health." },
    { icon: <GiMeditation  size={22} color="#2d5a27" />, title: "Navel Energy Center",          desc: "The navel is the body's primary energy hub connected to thousands of nerves. Navel therapy delivers herbal benefits through this powerful center." },
    { icon: <GiDroplets    size={22} color="#2d5a27" />, title: "Deep Transdermal Absorption",  desc: "The navel area is rich in nerve endings and micro blood vessels. Oils applied here are absorbed rapidly into the body." },
    { icon: <GiHealing     size={22} color="#2d5a27" />, title: "Restores Joint Balance",       desc: "Helps naturally reduce inflammation and promotes better flexibility with regular nightly use." },
  ],
};

// ─── Why Us ───────────────────────────────────────────────────────────────────
const whyUsSection = {
  title:    "Why Choose Joint Pain Remedy?",
  subtitle: "Trusted by thousands across India for natural joint comfort.",
  items: [
    { icon: <GiKneeBandage size={28} color="#2d5a27" />, title: "Joint Pain & Stiffness Relief",    desc: "Reaches the root of joint discomfort through the navel's energy channels — naturally eases stiffness in knees, back, and hips." },
    { icon: <FaLeaf        size={26} color="#2d5a27" />, title: "100% Ayurvedic Herbs",             desc: "Made with Ajwain, Asafoetida, Ginger, and other time-tested herbs — free from chemicals, parabens, and mineral oils." },
    { icon: <HiSparkles    size={26} color="#2d5a27" />, title: "Reduces Inflammation",             desc: "Soothing herbal blend helps calm inflammation and irritation around joints." },
    { icon: <FaLeaf        size={26} color="#2d5a27" />, title: "Simple Nightly Ritual",            desc: "Just 2–3 drops into the navel before bed — no hassle. An easy Ayurvedic routine that works while you rest." },
  ],
};

// ─── Green marquee ────────────────────────────────────────────────────────────
const greenMarqueeItems = [
  { icon: <FaLeaf size={13} />, text: "Ease Joint Pain" },
  { icon: <FaLeaf size={13} />, text: "Say Goodbye to Stiffness" },
  { icon: <FaLeaf size={13} />, text: "Regain Flexibility" },
  { icon: <FaLeaf size={13} />, text: "Move Freely Again" },
];

// ─── Reviews ──────────────────────────────────────────────────────────────────
const reviews = {
  items: [
    { id: 1, name: "Ramesh Gupta",   rating: 5, body: "Been using it for 3 weeks. Morning knee stiffness has reduced significantly.",                                    date: "03/12/2026", image: null, likes: 4 },
    { id: 2, name: "Sunita Verma",   rating: 5, body: "I suffered from back pain for years. Applying this oil on the navel has given me clear relief.",                  date: "02/28/2026", image: null, likes: 6 },
    { id: 3, name: "Arun Mishra",    rating: 4, body: "The herbal formulation feels genuine. Joints feel more flexible after 2 weeks of use.",                          date: "03/18/2026", image: null, likes: 3 },
    { id: 4, name: "Fatima Ansari",  rating: 5, body: "My mother has arthritis. She applied this and says the swelling in her fingers has reduced.",                     date: "01/30/2026", image: null, likes: 7 },
    { id: 5, name: "Deepak Sharma",  rating: 5, body: "Just a few drops before bed. Wake up feeling lighter, without joint stiffness.",                                  date: "02/15/2026", image: null, likes: 5 },
    { id: 6, name: "Preeti Nair",    rating: 4, body: "Genuine herbal scent. Feel warmth after applying — very comforting.",                                             date: "03/05/2026", image: null, likes: 2 },
  ],
  photos: [],
  photoReviewers: [],
};

// ─── Final config export ──────────────────────────────────────────────────────
export const nabhiJointEngConfig = {
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
  reviewPhotos,
  heroBannerSection,
  ritualSection,
  whyUsSection,
  greenMarqueeItems,
  reviews,
};