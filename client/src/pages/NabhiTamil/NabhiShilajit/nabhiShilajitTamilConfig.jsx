import React from "react";
import { GiHerbsBundle, GiMeditation, GiDroplets, GiHealing } from "react-icons/gi";
import { FaLeaf, FaShieldAlt } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { TbTruckDelivery, TbRefresh } from "react-icons/tb";

const product = {
  id: "shilajit-energy-resin", name: "சிலாஜித் ஆற்றல் ரெசின்",
  tagline: "இயற்கையான ஆற்றல் & சகிப்புத்திறன் மேம்படுத்தி",
  image: "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=shilajitcare3.webp&version_id=null",
  subtitle: "இமாலயத்திலிருந்து சேகரிக்கப்பட்ட தூய சிலாஜித்",
  h1: "தூய சிலாஜித் ரெசின் – வலிமை, சகிப்புத்திறன் & ஆற்றலுக்காக",
  reviewSummary: "4.71 · 589 சரிபார்க்கப்பட்ட மதிப்புரைகள்",
  paymentImage: null, logoImage: "/NabhiLogo/nabhiLogo.png",
  brandName: "ஹோம் வித் கேர் · வேத சஞ்சீவனி",
  contactEmail: "akravipvtltd@gmail.com", whatsappNumber: "919717143189",
  whatsappMessage: "Hi, I'm interested in Shilajit Resin",
  fbPixelId: "1622075442328928", cartStorageKey: "exclusiveCart", themeColor: "#3b2f2f",
};

const variants = [
  { id: 1, label: "1 ஜார் வாங்கு",              price: "₹669",   priceNum: 669,  badge: null,              externalVariantId: 477247394800564160 },
  { id: 2, label: "2 ஜார்கள் வாங்கு – ₹300 தள்ளுபடி", price: "₹1,099", priceNum: 1099, badge: "₹300 சேமிக்கவும்", externalVariantId: 477247412248868800 },
];

const images = [
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=shilajitcare3.webp&version_id=null",
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=shilajitcare1.webp&version_id=null",
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=shilajitcare2.webp&version_id=null",
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=shilajitcare4.webp&version_id=null",
];

const upiIcons = [
  { src: "https://img.icons8.com/?size=100&id=am4ltuIYDpQ5&format=png&color=000000", alt: "GPay", zIndex: 10 },
  { src: "https://img.icons8.com/?size=100&id=OYtBxIlJwMGA&format=png&color=000000", alt: "PhonePe", zIndex: 20 },
  { src: "https://img.icons8.com/?size=100&id=68067&format=png&color=000000", alt: "Paytm", zIndex: 30 },
];

const marqueeItems = [
  { text: "இலவச டெலிவரி" }, { text: "20,000+ மகிழ்ச்சியான வாடிக்கையாளர்கள்" },
  { text: "டெலிவரியில் பணம் செலுத்துங்கள் (COD)" }, { text: "100% தூய சிலாஜித்" },
  { text: "இமாலயத்திலிருந்து சேகரிக்கப்பட்டது" },
];

const trustTags = [
  { icon: <TbTruckDelivery size={15} />, label: "இலவச டெலிவரி" },
  { icon: <FaShieldAlt size={13} />, label: "COD கிடைக்கும்" },
  { icon: <TbRefresh size={15} />, label: "எளிய திரும்பப்பெறல்" },
  { icon: <FaLeaf size={13} />, label: "100% இயற்கை" },
];

const accordionData = [
  {
    title: "சிலாஜித்தை ஏன் தேர்வு செய்ய வேண்டும்",
    content: "சிலாஜித் ஒரு பண்டைய ஆயுர்வேத ரசாயனம், இது உள்ளிருந்து உடலை வலிமைப்படுத்துகிறது.\n\nமுக்கிய நன்மைகள்:\n• ஆற்றல் மற்றும் சகிப்புத்திறனை அதிகரிக்கிறது\n• நோய் எதிர்ப்பு சக்தியை வலிமைப்படுத்துகிறது\n• பலவீனம் மற்றும் சோர்வை எதிர்த்துப் போராடுகிறது\n• ஆண்களின் உயிர்சக்திக்கு ஆதரவளிக்கிறது",
  },
  {
    title: "எவ்வாறு பயன்படுத்துவது",
    content: "பட்டாணி அளவு வெதுவெதுப்பான பால் அல்லது தண்ணீரில் கலந்து குடியுங்கள்.\n\nதினமும் 1-2 முறை பயன்படுத்துங்கள்.",
  },
  {
    title: "முக்கியமான குறிப்பு",
    content: "அதிக அளவில் எடுக்க வேண்டாம்.\n\nகர்ப்பிணி பெண்கள் பயன்படுத்துவதற்கு முன் மருத்துவரை அணுகவும்.\n\nஇது மருந்து அல்ல.",
  },
];

const howToUseImages = images;
const benefitsCarouselImages = images;

const bloatSection = {
  title: "உங்கள் இயற்கையான ஆற்றல் மூலம்",
  body1: "சோர்வு, பலவீனம் மற்றும் குறைந்த சகிப்புத்திறன் இன்றைய வேகமான வாழ்க்கையில் பெருகிவருகின்றன.",
  body2: "சிலாஜித் உள்ளிருந்து உடலை வலிமைப்படுத்தி நிலையான இயற்கையான ஆற்றலை வழங்குகிறது.",
  imageSrc: images[1],
};

const balanceSection = {
  title: "இமாலயத்தின் சக்தி",
  body1: "சிலாஜித் நூற்றாண்டுகளாக இமாலய பாறைகளிலிருந்து கசியும் இயற்கையான பொருள்.",
  body2: "இது உடலை புதுப்பிக்கவும், உயிர்சக்தியை மீட்டெடுக்கவும் மற்றும் நீண்டகால ஆரோக்கியத்திற்கு ஆதரவளிக்கவும் உதவுகிறது.",
  imageSrc: images[0],
};

const heroBannerSection = {
  title: "சிலாஜித் ஆற்றல் சடங்கு",
  body: "இயற்கையான ஆயுர்வேத முறையில் உங்கள் ஆற்றல் மற்றும் சகிப்புத்திறனை அதிகரியுங்கள் — தூய்மையான, சக்திவாய்ந்த மற்றும் காலத்தால் சோதிக்கப்பட்டது.",
  stats: [
    { num: "20,000+", label: "மகிழ்ச்சியான வாடிக்கையாளர்கள்" },
    { num: "4.71",    label: "சராசரி மதிப்பீடு" },
    { num: "589",     label: "மதிப்புரைகள்" },
    { num: "100%",    label: "தூய்மையான" },
  ],
};

const ritualSection = {
  title: "சிலாஜித் எவ்வாறு செயல்படுகிறது",
  subtitle: "இயற்கையான தாதுக்கள் மற்றும் ஃபுல்விக் அமிலத்தால் செறிவூட்டப்பட்டது",
  items: [
    { icon: <GiHerbsBundle size={22} color="#3b2f2f" />, title: "தாதுக்களால் நிரம்பியது",  desc: "85+ அத்தியாவசிய தடய தாதுக்கள் கொண்டுள்ளது" },
    { icon: <GiMeditation  size={22} color="#3b2f2f" />, title: "ஆற்றலை அதிகரிக்கிறது",   desc: "சகிப்புத்திறன் மற்றும் வலிமையை இயற்கையாக அதிகரிக்கிறது" },
    { icon: <GiDroplets    size={22} color="#3b2f2f" />, title: "விரைவான உறிஞ்சுதல்",    desc: "உடலில் விரைவாக உறிஞ்சப்பட்டு பயன்படுத்தப்படுகிறது" },
    { icon: <GiHealing     size={22} color="#3b2f2f" />, title: "மீட்சி ஆதரவு",          desc: "சோர்வு மற்றும் பலவீனத்தை குறைக்கிறது" },
  ],
};

const whyUsSection = {
  title: "எங்கள் சிலாஜித்தை ஏன் தேர்வு செய்ய வேண்டும்?",
  subtitle: "நீங்கள் நம்பக்கூடிய தூய்மையான மற்றும் சான்றளிக்கப்பட்ட தரம்",
  items: [
    { icon: <FaLeaf     size={26} color="#3b2f2f" />, title: "100% தூய்மையான",   desc: "கலப்படம் இல்லை, நிரப்பிகள் இல்லை" },
    { icon: <HiSparkles size={26} color="#3b2f2f" />, title: "ஆற்றல் மேம்படுத்தி", desc: "நாள் முழுவதும் ஆற்றல் நிலைகளை பராமரிக்கிறது" },
    { icon: <FaLeaf     size={26} color="#3b2f2f" />, title: "பயன்படுத்த எளிதானது", desc: "பால் அல்லது தண்ணீரில் கலந்து குடியுங்கள்" },
  ],
};

const reviews = {
  items: [
    { id: 1, name: "அமித் சிங்",  rating: 5, body: "என் ஆற்றல் நிலைகள் மிகவும் உயர்ந்துள்ளன. நாள் முழுவதும் மிகவும் சுறுசுறுப்பாக உணர்கிறேன்.", date: "02/20/2026" },
    { id: 2, name: "விகாஸ் யாதவ்", rating: 5, body: "சகிப்புத்திறன் கணிசமாக மேம்பட்டுள்ளது. சிறந்த தயாரிப்பு, மிகவும் பரிந்துரைக்கிறேன்.", date: "01/30/2026" },
  ],
};

export const nabhiShilajitTamilConfig = {
  product, variants, images, upiIcons, marqueeItems, trustTags, accordionData,
  howToUseImages, benefitsCarouselImages, bloatSection, balanceSection,
  heroBannerSection, ritualSection, whyUsSection, reviews,
};