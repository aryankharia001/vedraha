import React from "react";
import { GiHerbsBundle, GiMeditation, GiDroplets, GiHealing, GiKneeBandage } from "react-icons/gi";
import { FaLeaf, FaShieldAlt } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { TbTruckDelivery, TbRefresh } from "react-icons/tb";

const product = {
  id: "joint-pain-nabhi-oil", name: "கீல்வாத நிவாரண நாபி எண்ணெய்",
  tagline: "ஆயுர்வேத நாபி சிகிச்சை",
  image: "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=Gemini_Generated_Image_jejzeajejzeajejz.png.webp&version_id=null",
  subtitle: "ஆயுர்வேத நாபி சிகிச்சை",
  h1: "கீல்வாத நிவாரண நாபி எண்ணெய் – முழங்கால் & முதுகு வலி நிவாரணம்",
  reviewSummary: "4.46 · 287 சரிபார்க்கப்பட்ட மதிப்புரைகள்",
  paymentImage: null, logoImage: "/NabhiLogo/nabhiLogo.png",
  brandName: "ஹோம் வித் கேர் · வேத சஞ்சீவனி",
  contactEmail: "akravipvtltd@gmail.com", whatsappNumber: "919717143189",
  whatsappMessage: "Hi, I'm interested in Joint Pain Nabhi Oil",
  fbPixelId: "1622075442328928", cartStorageKey: "exclusiveCart", themeColor: "#2d5a27",
};

const variants = [
  { id: 1, label: "1 பாட்டில் வாங்கு",              price: "₹549",  priceNum: 549,  mrp: 699,  badge: null,              externalVariantId: 477155402648532032 },
  { id: 2, label: "2 பாட்டில்கள் வாங்கு – ₹100 தள்ளுபடி", price: "₹899",  priceNum: 899,  mrp: 1198, badge: "₹299 சேமிக்கவும்", externalVariantId: 477155416070304832 },
];

const images = [
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=Gemini_Generated_Image_io9cidio9cidio9c-1.png.webp&version_id=null",
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=Gemini_Generated_Image_b1ri32b1ri32b1ri.png.webp&version_id=null",
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=Gemini_Generated_Image_jejzeajejzeajejz.png.webp&version_id=null",
  "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=Gemini_Generated_Image_3y48f93y48f93y48.png.webp&version_id=null",
];

const upiIcons = [
  { src: "https://img.icons8.com/?size=100&id=am4ltuIYDpQ5&format=png&color=000000", alt: "GPay", zIndex: 10 },
  { src: "https://img.icons8.com/?size=100&id=OYtBxIlJwMGA&format=png&color=000000", alt: "PhonePe", zIndex: 20 },
  { src: "https://img.icons8.com/?size=100&id=68067&format=png&color=000000", alt: "Paytm", zIndex: 30 },
];

const marqueeItems = [
  { text: "இலவச டெலிவரி" }, { text: "5,000+ மகிழ்ச்சியான வாடிக்கையாளர்கள்" },
  { text: "டெலிவரியில் பணம் செலுத்துங்கள் (COD)" }, { text: "100% ஆயுர்வேதம்" },
  { text: "ஒவ்வொரு ஆர்டரிலும் தரம் சரிபார்க்கப்படுகிறது" },
];

const trustTags = [
  { icon: <TbTruckDelivery size={15} />, label: "இலவச டெலிவரி" },
  { icon: <FaShieldAlt size={13} />, label: "COD கிடைக்கும்" },
  { icon: <TbRefresh size={15} />, label: "எளிய திரும்பப்பெறல்" },
  { icon: <FaLeaf size={13} />, label: "100% இயற்கை" },
];

const accordionData = [
  {
    title: "கீல்வாத நிவாரண நாபி எண்ணெயை ஏன் தேர்வு செய்ய வேண்டும்",
    content: "விறைப்பை தளர்த்துங்கள், வலியிலிருந்து நிவாரணம் பெறுங்கள் மற்றும் இயற்கையான நெகிழ்வுத்தன்மையை மீட்டெடுங்கள் — முற்றிலும் இயற்கையாக.\n\nமுக்கிய நன்மைகள்:\n• மூட்டு வலி மற்றும் விறைப்பை நிவர்த்தி செய்கிறது\n• வீக்கம் மற்றும் எரிச்சலை குறைக்கிறது\n• நெகிழ்வுத்தன்மை மற்றும் இயக்கத்தை மேம்படுத்துகிறது\n• எலும்பு மற்றும் மூட்டு ஆரோக்கியத்திற்கு ஆதரவளிக்கிறது",
  },
  {
    title: "எவ்வாறு பயன்படுத்துவது",
    content: "இரவில் தூங்குவதற்கு முன் நாபியில் 2-3 சொட்டுகள் போடுங்கள்.\n\n1-2 நிமிடங்கள் வலஞ்சுழி வட்ட இயக்கத்தில் மெதுவாக மசாஜ் செய்யுங்கள்.\n\nசிறந்த முடிவுகளுக்கு ஒவ்வொரு இரவும் பயன்படுத்துங்கள்.",
  },
  {
    title: "முக்கியமான குறிப்பு",
    content: "வெளிப்புற பயன்பாட்டிற்கு மட்டுமே.\n\nமுதல் பயன்பாட்டிற்கு முன் 20 நிமிட பேட்ச் டெஸ்ட் செய்யுங்கள்.\n\nகர்ப்ப காலம் மற்றும் தாய்ப்பால் கொடுக்கும் காலத்தில் பயன்படுத்த வேண்டாம்.",
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
  title: "வலி இல்லாத காலைகள்",
  body1: "முழங்கால்கள், இடுப்பு மற்றும் கீழ் முதுகில் காலை விறைப்பு 40 வயதுக்கு மேற்பட்டவர்களுக்கு மிகவும் பொதுவான பிரச்சினை. கீல்வாத நிவாரண நாபி எண்ணெய் இரவில் செயல்படுகிறது — படுக்கை நேரத்திற்கு முன் போடுங்கள்.",
  body2: "தொடர்ந்து பயன்படுத்தினால், பல வாடிக்கையாளர்கள் கணிசமாக குறைவான விறைப்புடன் எழுவதாக தெரிவிக்கின்றனர்.",
  imageSrc: "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=Gemini_Generated_Image_jejzeajejzeajejz.png.webp&version_id=null",
};

export const reviewPhotos = [
  "/NabhiLogo/nabhiLogo.png",
  "/NabhiReviewImg/photo2.webp",
  "/NabhiReviewImg/photo3.webp",
  "/NabhiReviewImg/photo4.webp",
  "/NabhiReviewImg/photo5.webp",
];

const balanceSection = {
  title: "நாபியிலிருந்து குணப்படுத்தும் சக்தி பாய்கிறது",
  body1: "ஆயுர்வேதத்தில், <strong>நாபி</strong> உடலின் முதன்மை ஆற்றல் மையம், மூட்டு ஆரோக்கியம், வீக்க நிலைகள் மற்றும் ஒட்டுமொத்த உயிர்சக்தியை பாதிக்கும் ஆயிரக்கணக்கான நுண்மையான சேனல்களுடன் இணைக்கப்பட்டுள்ளது.",
  body2: "இந்த சிறப்பு ஆயுர்வேத எண்ணெயால் நாபிக்கு ஊட்டமளிப்பதன் மூலம், உள் சமநிலையை மீட்டெடுக்க உதவுகிறீர்கள்.",
  videoSrc: false,
  imageSrc: "https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=Gemini_Generated_Image_3y48f93y48f93y48.png.webp&version_id=null",
};

const heroBannerSection = {
  title: "பண்டைய நாபி வலி நிவாரண சடங்கு",
  body: "மூட்டு வலி, விறைப்பு மற்றும் வீக்கம் பெரும்பாலும் மோசமான இரத்த ஓட்டம் மற்றும் உள் வீக்கத்திலிருந்து உருவாகின்றன.",
  stats: [
    { num: "5,000+", label: "மகிழ்ச்சியான வாடிக்கையாளர்கள்" },
    { num: "4.46",   label: "சராசரி மதிப்பீடு" },
    { num: "287",    label: "சரிபார்க்கப்பட்ட மதிப்புரைகள்" },
    { num: "100%",   label: "ஆயுர்வேதம்" },
  ],
};

const ritualSection = {
  title: "நாபி சிகிச்சை மூட்டு வலியை எவ்வாறு நீக்குகிறது",
  subtitle: "பண்டைய ஆயுர்வேத ஞானத்தில் வேரூன்றிய — நாபி மையம் ஆயிரக்கணக்கான ஆற்றல் சேனல்கள் வழியாக ஒவ்வொரு மூட்டு மற்றும் உறுப்புடன் இணைக்கப்பட்டுள்ளது.",
  items: [
    { icon: <GiHerbsBundle size={22} color="#2d5a27" />, title: "சக்திவாய்ந்த மூலிகை கலவை",    desc: "ஓமம், பெருங்காயம், இஞ்சி மற்றும் பிற ஆயுர்வேத மூலிகைகளால் நிரம்பியுள்ளது." },
    { icon: <GiMeditation  size={22} color="#2d5a27" />, title: "நாபி ஆற்றல் மையம்",           desc: "நாபி ஆயிரக்கணக்கான நரம்புகளுடன் இணைக்கப்பட்ட உடலின் முதன்மை ஆற்றல் மையம்." },
    { icon: <GiDroplets    size={22} color="#2d5a27" />, title: "ஆழமான டிரான்ஸ்டர்மல் உறிஞ்சுதல்", desc: "நாபி பகுதி நரம்பு முனைகள் மற்றும் நுண்ணிய இரத்த நாளங்களால் நிரம்பியுள்ளது." },
    { icon: <GiHealing     size={22} color="#2d5a27" />, title: "மூட்டு சமநிலையை மீட்டெடுக்கிறது", desc: "வீக்கத்தை இயற்கையாக குறைக்க உதவுகிறது மற்றும் தொடர் இரவு பயன்பாட்டுடன் சிறந்த நெகிழ்வுத்தன்மையை மேம்படுத்துகிறது." },
  ],
};

const whyUsSection = {
  title: "கீல்வாத நிவாரணியை ஏன் தேர்வு செய்ய வேண்டும்?",
  subtitle: "இயற்கையான மூட்டு வசதிக்காக இந்தியா முழுவதும் ஆயிரக்கணக்கானோரால் நம்பப்படுகிறது.",
  items: [
    { icon: <GiKneeBandage size={28} color="#2d5a27" />, title: "மூட்டு வலி & விறைப்பு நிவாரணம்", desc: "நாபியின் ஆற்றல் சேனல்கள் வழியாக மூட்டு அசௌகரியத்தின் மூலத்தை அடைகிறது." },
    { icon: <FaLeaf        size={26} color="#2d5a27" />, title: "100% ஆயுர்வேத மூலிகைகள்",       desc: "ஓமம், பெருங்காயம், இஞ்சி மற்றும் பிற காலத்தால் சோதிக்கப்பட்ட மூலிகைகளால் தயாரிக்கப்பட்டது." },
    { icon: <HiSparkles    size={26} color="#2d5a27" />, title: "வீக்கம் குறைப்பு",              desc: "சுகமளிக்கும் மூலிகை கலவை மூட்டுகளைச் சுற்றியுள்ள வீக்கத்தை குறைக்க உதவுகிறது." },
    { icon: <FaLeaf        size={26} color="#2d5a27" />, title: "எளிய இரவு சடங்கு",             desc: "படுக்கை நேரத்திற்கு முன் வெறும் 2-3 சொட்டுகள் — தொந்தரவு இல்லை." },
  ],
};

const greenMarqueeItems = [
  { icon: <FaLeaf size={13} />, text: "மூட்டு வலியை குறைக்கவும்" },
  { icon: <FaLeaf size={13} />, text: "விறைப்பிற்கு விடைபெறுங்கள்" },
  { icon: <FaLeaf size={13} />, text: "நெகிழ்வுத்தன்மையை மீட்டெடுங்கள்" },
  { icon: <FaLeaf size={13} />, text: "சுதந்திரமாக நடங்கள்" },
];

const reviews = {
  items: [
    { id: 1, name: "ரமேஷ் குப்தா",    rating: 5, body: "3 வாரங்களாக பயன்படுத்துகிறேன். காலை முழங்கால் விறைப்பு கணிசமாக குறைந்தது.", date: "03/12/2026", image: null, likes: 4 },
    { id: 2, name: "சுனிதா வர்மா",    rating: 5, body: "பல ஆண்டுகளாக முதுகு வலியால் அவதிப்பட்டேன். இந்த எண்ணெய் போடுவதால் தெளிவான நிவாரணம் கிடைத்தது.", date: "02/28/2026", image: null, likes: 6 },
    { id: 3, name: "பாத்திமா அன்சாரி", rating: 5, body: "என் அம்மாவுக்கு மூட்டுவலி உள்ளது. அவர் தடவியதால் விரல்களில் வீக்கம் குறைந்தது என்று கூறுகிறார்.", date: "01/30/2026", image: null, likes: 7 },
  ],
  photos: [], photoReviewers: [],
};

export const nabhiJointTamilConfig = {
  product, variants, images, upiIcons, marqueeItems, trustTags, accordionData,
  howToUseImages, benefitsCarouselImages, bloatSection, balanceSection,
  reviewPhotos, heroBannerSection, ritualSection, whyUsSection, greenMarqueeItems, reviews,
};