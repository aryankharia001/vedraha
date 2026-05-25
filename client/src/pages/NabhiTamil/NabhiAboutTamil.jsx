import React from "react";
import { FaLeaf, FaShieldAlt, FaHeart, FaAward } from "react-icons/fa";
import { GiHerbsBundle, GiMeditation } from "react-icons/gi";
import { HiSparkles } from "react-icons/hi";
import NabhiHeader from "../../components/NabhiHeader";
import NabhiHeaderHindi from "../../components/NabhiHeaderHindi";
import NabhiHeaderTamil from "../../components/NabhiHeaderTamil";

// ─── Brand data ───────────────────────────────────────────────────────────────
const brand = {
  name:      "Home With Care · Ved Sanjeevani",
  logoImage: "/NabhiLogo/nabhiLogo.png",
  email:     "akravipvtltd@gmail.com",
  phone:     "+91 97171 43189",
  themeColor: "#2d5a27",
};

const stats = [
  { num: "30,000+", label: "மகிழ்ச்சியான வாடிக்கையாளர்கள்" },
  { num: "6",       label: "ஆயுர்வேத தயாரிப்புகள்" },
  { num: "4.6+",    label: "சராசரி மதிப்பீடு" },
  { num: "100%",    label: "இயற்கை பொருட்கள்" },
];

const values = [
  {
    icon: <FaLeaf size={28} color="#2d5a27" />,
    title: "இயற்கையில் வேரூன்றியது",
    desc:  "நாங்கள் தயாரிக்கும் ஒவ்வொரு தயாரிப்பும் இந்தியா முழுவதும் நம்பகமான விவசாயிகளிடமிருந்து பெறப்பட்ட 100% இயற்கையான, ரசாயனமற்ற ஆயுர்வேத பொருட்களை மட்டுமே பயன்படுத்துகிறது.",
  },
  {
    icon: <GiHerbsBundle size={28} color="#2d5a27" />,
    title: "பண்டைய ஞானம்",
    desc:  "நூற்றாண்டுகள் பழமையான ஆயுர்வேத நூல்கள் மற்றும் நாபி சிகிச்சை (Nabhi Chikitsa) முறையிலிருந்து நமது சூத்திரங்கள் உருவாக்கப்பட்டுள்ளன — காலத்தால் நிரூபிக்கப்பட்ட ஒரு பழக்கம்.",
  },
  {
    icon: <FaShieldAlt size={28} color="#2d5a27" />,
    title: "நம்பகமான தரம்",
    desc:  "ஒவ்வொரு தொகுப்பும் அனுப்பப்படுவதற்கு முன்பு தர சோதனை செய்யப்படுகிறது. தூய்மையில் நாங்கள் எந்தவிதமான சமரசமும் செய்வதில்லை — பாரபென்கள் இல்லை, கனிம எண்ணெய்கள் இல்லை, நிரப்பிகள் இல்லை.",
  },
  {
    icon: <FaHeart size={28} color="#2d5a27" />,
    title: "அன்புடன் தயாரிக்கப்பட்டது",
    desc:  "நாங்கள் ஒரு குடும்பமாக நடத்தப்படும் ஆரோக்கிய பிராண்ட். ஒவ்வொரு தயாரிப்பும் நமது சொந்த குடும்பத்தின் ஆரோக்கியத்திற்காக விரும்பும் அதே அக்கறையுடன் உருவாக்கப்படுகிறது.",
  },
  {
    icon: <GiMeditation size={28} color="#2d5a27" />,
    title: "முழுமையான நல்வாழ்வு",
    desc:  "உண்மையான ஆரோக்கியம் உள்ளிருந்து வருகிறது என்று நாங்கள் நம்புகிறோம். நமது நாபி எண்ணெய்கள் உடலின் சொந்த அமைப்புகளுடன் மெதுவாக செயல்படுகின்றன — எதிராக அல்ல.",
  },
  {
    icon: <HiSparkles size={28} color="#2d5a27" />,
    title: "அணுகக்கூடிய ஆயுர்வேதம்",
    desc:  "ஆயுர்வேத சுய-பரிபாலனத்தை எளிமையாகவும், மலிவாகவும், பின்பற்றவும் எளிதாகவும் செய்கிறோம் — தூங்குவதற்கு முன் சில சொட்டுகள் மட்டுமே போதும்.",
  },
];

const products = [
  { name: "நாபி அம்ரித்",                        desc: "செரிமானம் & நச்சுநீக்கம் நாபி எண்ணெய் — நமது சிறந்த விற்பனையாகும் தயாரிப்பு" },
  { name: "கண் பராமரிப்பு நாபி எண்ணெய்",        desc: "பார்வை ஆதரவு & டிஜிட்டல் கண் சோர்வு நிவாரணம்" },
  { name: "தலைமுடி பராமரிப்பு நாபி எண்ணெய்",    desc: "உள்ளிருந்து முடியை ஊட்டமளிக்கவும், முடி உதிர்வை குறைக்கவும்" },
  { name: "மூட்டு வலி நிவாரண நாபி எண்ணெய்",     desc: "முழங்கால், முதுகு & மூட்டு வலி நிவாரணம்" },
  { name: "மாதவிடாய் வலி நிவாரண நாபி எண்ணெய்",  desc: "பெண்களுக்கு இயற்கையான மாதவிடாய் ஆறுதல்" },
  { name: "ஷிலாஜித் எனர்ஜி ரெசின்",              desc: "வலிமை & சகிப்புத்திறனுக்கான தூய இமாலயன் ஷிலாஜித்" },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function NabhiAboutTamil() {
  return (
    <div className="font-sans text-gray-900 bg-white min-h-screen">
      <NabhiHeaderTamil />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800;900&display=swap');
        body { font-family: 'DM Sans', sans-serif; }
        * { box-sizing: border-box; }
        .fade-in { animation: fadeIn 0.6s ease; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {/* Hero */}
      <div className="bg-[#0a1a0f] text-white py-20 px-5 text-center">
        <div className="max-w-[760px] mx-auto fade-in">
          <div className="flex justify-center mb-5">
            <img
              src={brand.logoImage}
              alt={brand.name}
              className="w-16 h-16 object-contain rounded-2xl border-2 border-[#2d5a27]"
            />
          </div>
          <p className="text-sm font-semibold tracking-widest text-[#4a9a3f] uppercase mb-3">
            நமது கதை
          </p>
          <h1 className="text-4xl md:text-5xl font-black mb-5 leading-tight">
            பண்டைய ஞானம்.<br />
            <span style={{ color: "#4a9a3f" }}>நவீன நல்வாழ்வு.</span>
          </h1>
          <p className="text-gray-400 text-base leading-relaxed max-w-[580px] mx-auto">
            நாங்கள் <strong className="text-white">Home With Care · Ved Sanjeevani</strong> — நாபி சிகிச்சையின் பண்டைய கலையை
            இந்திய வீடுகளில் கொண்டு செல்வதற்கு அர்ப்பணிக்கப்பட்ட ஒரு ஆயுர்வேத நல்வாழ்வு பிராண்ட்.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-[#f0f7ee] py-12 px-5">
        <div className="max-w-[1100px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <div
                className="text-4xl font-black text-[#2d5a27]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {s.num}
              </div>
              <div className="text-sm text-gray-500 mt-1 font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Our Mission */}
      <div className="max-w-[860px] mx-auto px-5 py-16 text-center">
        <FaAward size={36} color="#2d5a27" className="mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-5 tracking-tight">நமது நோக்கம்</h2>
        <p className="text-gray-500 text-base leading-relaxed">
          மில்லியன் கணக்கான மக்கள் செரிமான அசௌகரியம், கண் சோர்வு, மூட்டு வலி, ஹார்மோன் ஏற்றத்தாழ்வு
          மற்றும் குறைந்த ஆற்றலால் அவதிப்படுகிறார்கள் — பண்டைய ஆயுர்வேத தீர்வுகள் ஏற்கனவே
          இருக்கின்றன என்பதை பலர் உணர்வதில்லை. இந்த தீர்வுகளை அணுகக்கூடியதாகவும், பயன்படுத்த
          எளிதாகவும், நம்பகமாகவும் செய்வதே நமது நோக்கம். நாங்கள் நாபியிலிருந்து தொடங்குகிறோம் —
          உடலின் மூல ஆற்றல் மையம் — அங்கிருந்து வெளியே விரிகிறோம்.
        </p>
      </div>

      {/* Values */}
      <div className="bg-[#f5f4ef] py-16 px-5">
        <div className="max-w-[1100px] mx-auto">
          <h2 className="text-center text-3xl font-bold mb-2 tracking-tight">நாங்கள் எதற்காக நிற்கிறோம்</h2>
          <p className="text-center text-gray-400 text-sm mb-10">நாங்கள் தயாரிக்கும் ஒவ்வொரு தயாரிப்பின் பின்னும் உள்ள கொள்கைகள்</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {values.map((v) => (
              <div
                key={v.title}
                className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="mb-3">{v.icon}</div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Products */}
      <div className="max-w-[1100px] mx-auto px-5 py-16">
        <h2 className="text-center text-3xl font-bold mb-2 tracking-tight">நமது தயாரிப்பு வரிசை</h2>
        <p className="text-center text-gray-400 text-sm mb-10">
          அன்றாட நல்வாழ்வுக்காக கவனமாக உருவாக்கப்பட்ட ஆறு ஆயுர்வேத தீர்வுகள்
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {products.map((p, i) => (
            <div
              key={p.name}
              className="flex items-start gap-4 bg-[#f0f7ee] rounded-2xl p-5 border border-[#d4e8d0]"
            >
              <div className="w-10 h-10 rounded-full bg-[#2d5a27] flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">{i + 1}</span>
              </div>
              <div>
                <div className="font-bold text-gray-900 text-base">{p.name}</div>
                <div className="text-gray-500 text-sm mt-0.5">{p.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Brand Promise */}
      <div className="bg-[#0a1a0f] text-white py-16 px-5 text-center">
        <div className="max-w-[680px] mx-auto">
          <h2 className="text-3xl font-bold mb-5">உங்களுக்கு நமது வாக்குறுதி</h2>
          <p className="text-gray-400 text-base leading-relaxed mb-8">
            நமது வசதியிலிருந்து வெளியேறும் ஒவ்வொரு தயாரிப்பும் தர சோதனை செய்யப்பட்டு,
            தூய இயற்கை பொருட்களிலிருந்து தயாரிக்கப்பட்டு, அக்கறையுடன் பேக் செய்யப்படுகிறது.
            நீங்கள் எப்போதாவது திருப்தியற்றிருந்தால், நமது குழு உதவ இங்கே இருக்கிறது.
            நாங்கள் தயாரிக்கும் அனைத்தின் பின்னும் நிற்கிறோம் — ஏனெனில் நாங்களே அதை பயன்படுத்துகிறோம்.
          </p>
          <a
            href="mailto:akravipvtltd@gmail.com"
            className="inline-block bg-[#2d5a27] text-white px-8 py-3.5 rounded-full font-bold text-sm no-underline hover:bg-[#3a7a32] transition-colors"
          >
            தொடர்பு கொள்ளுங்கள் →
          </a>
        </div>
      </div>
    </div>
  );
}