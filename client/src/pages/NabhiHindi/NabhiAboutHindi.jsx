import React from "react";
import { FaLeaf, FaShieldAlt, FaHeart, FaAward } from "react-icons/fa";
import { GiHerbsBundle, GiMeditation } from "react-icons/gi";
import { HiSparkles } from "react-icons/hi";
import NabhiHeaderHindi from "../../components/NabhiHeaderHindi";

// ─── Brand data ───────────────────────────────────────────────────────────────
const brand = {
  name:       "होम विद केयर · वेद संजीवनी",
  logoImage:  "/NabhiLogo/nabhiLogo.png",
  email:      "akravipvtltd@gmail.com",
  themeColor: "#2d5a27",
};

const stats = [
  { num: "30,000+", label: "खुश ग्राहक" },
  { num: "6",       label: "आयुर्वेदिक उत्पाद" },
  { num: "4.6+",    label: "औसत रेटिंग" },
  { num: "100%",    label: "प्राकृतिक सामग्री" },
];

const values = [
  {
    icon: <FaLeaf size={28} color="#2d5a27" />,
    title: "प्रकृति में जड़ा हुआ",
    desc:  "हमारे हर उत्पाद में 100% प्राकृतिक, रसायन-मुक्त आयुर्वेदिक सामग्री का उपयोग होता है जो भारत के विश्वसनीय किसानों से प्राप्त की जाती है।",
  },
  {
    icon: <GiHerbsBundle size={28} color="#2d5a27" />,
    title: "प्राचीन ज्ञान",
    desc:  "हमारे फॉर्मूले सदियों पुराने आयुर्वेदिक ग्रंथों और नाभि चिकित्सा से प्रेरित हैं — एक परंपरा जो समय की कसौटी पर खरी उतरी है।",
  },
  {
    icon: <FaShieldAlt size={28} color="#2d5a27" />,
    title: "भरोसेमंद गुणवत्ता",
    desc:  "हर बैच को भेजने से पहले गुणवत्ता जांच होती है। हम शुद्धता से कभी समझौता नहीं करते — न पैराबेन, न मिनरल ऑयल, न कोई मिलावट।",
  },
  {
    icon: <FaHeart size={28} color="#2d5a27" />,
    title: "देखभाल से बना",
    desc:  "हम एक परिवार द्वारा संचालित वेलनेस ब्रांड हैं। हर उत्पाद उसी देखभाल से बनाया जाता है जो हम अपने परिवार के लिए चाहते हैं।",
  },
  {
    icon: <GiMeditation size={28} color="#2d5a27" />,
    title: "समग्र वेलनेस",
    desc:  "हमारा मानना है कि असली स्वास्थ्य अंदर से आता है। हमारे नाभि तेल शरीर की प्राकृतिक प्रणालियों के साथ मिलकर काम करते हैं।",
  },
  {
    icon: <HiSparkles size={28} color="#2d5a27" />,
    title: "सुलभ आयुर्वेद",
    desc:  "हम आयुर्वेदिक स्व-देखभाल को सरल, किफायती और अनुसरण करने में आसान बनाते हैं — सोने से पहले बस कुछ बूंदें काफी हैं।",
  },
];

const products = [
  { name: "नाभि अमृत",                        desc: "पाचन और डिटॉक्स नाभि तेल — हमारा बेस्टसेलर" },
  { name: "आई केयर नाभि तेल",                 desc: "दृष्टि सहायक और डिजिटल आई स्ट्रेन से राहत" },
  { name: "हेयर केयर नाभि तेल",               desc: "बालों को अंदर से पोषण दें, बाल झड़ना कम करें" },
  { name: "जॉइंट पेन रेमेडी नाभि तेल",       desc: "घुटने, कमर और जोड़ों के दर्द से राहत" },
  { name: "मासिक दर्द राहत नाभि तेल",         desc: "महिलाओं के लिए प्राकृतिक पीरियड आराम" },
  { name: "शिलाजीत शक्ति रेजिन",             desc: "शक्ति और स्टैमिना के लिए शुद्ध हिमालयी शिलाजीत" },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function NabhiAboutHindi() {
  return (
    <div className="font-sans text-gray-900 bg-white min-h-screen">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@300;400;500;600;700&display=swap');
        body { font-family: 'Noto Sans Devanagari', sans-serif; }
        * { box-sizing: border-box; }
      `}</style>

      <NabhiHeaderHindi />

      {/* Hero */}
      <div className="bg-[#0a1a0f] text-white py-20 px-5 text-center">
        <div className="max-w-[760px] mx-auto">
          <div className="flex justify-center mb-5">
            <img src={brand.logoImage} alt={brand.name} className="w-16 h-16 object-contain rounded-2xl border-2 border-[#2d5a27]" />
          </div>
          <p className="text-sm font-semibold tracking-widest text-[#4a9a3f] uppercase mb-3">हमारी कहानी</p>
          <h1 className="text-4xl md:text-5xl font-black mb-5 leading-tight">
            प्राचीन ज्ञान।<br />
            <span style={{ color: "#4a9a3f" }}>आधुनिक वेलनेस।</span>
          </h1>
          <p className="text-gray-400 text-base leading-relaxed max-w-[580px] mx-auto">
            हम <strong className="text-white">होम विद केयर · वेद संजीवनी</strong> हैं — एक आयुर्वेदिक वेलनेस ब्रांड
            जो नाभि चिकित्सा की प्राचीन कला को हर भारतीय घर तक पहुँचाने के लिए समर्पित है।
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-[#f0f7ee] py-12 px-5">
        <div className="max-w-[1100px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-4xl font-black text-[#2d5a27]">{s.num}</div>
              <div className="text-sm text-gray-500 mt-1 font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Our Mission */}
      <div className="max-w-[860px] mx-auto px-5 py-16 text-center">
        <FaAward size={36} color="#2d5a27" className="mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-5 tracking-tight">हमारा मिशन</h2>
        <p className="text-gray-500 text-base leading-relaxed">
          लाखों लोग पाचन संबंधी परेशानी, आँखों का तनाव, जोड़ों का दर्द, हार्मोनल असंतुलन
          और कम ऊर्जा से पीड़ित हैं — अक्सर यह जाने बिना कि प्राचीन आयुर्वेदिक समाधान पहले से मौजूद हैं।
          हमारा मिशन इन समाधानों को सुलभ, आसान और भरोसेमंद बनाना है। हम नाभि से शुरू करते हैं —
          शरीर के मूल ऊर्जा केंद्र से — और वहाँ से आगे बढ़ते हैं।
        </p>
      </div>

      {/* Values */}
      <div className="bg-[#f5f4ef] py-16 px-5">
        <div className="max-w-[1100px] mx-auto">
          <h2 className="text-center text-3xl font-bold mb-2 tracking-tight">हम किसके लिए खड़े हैं</h2>
          <p className="text-center text-gray-400 text-sm mb-10">हमारे हर उत्पाद के पीछे के सिद्धांत</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {values.map((v) => (
              <div key={v.title} className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-md transition-shadow">
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
        <h2 className="text-center text-3xl font-bold mb-2 tracking-tight">हमारी उत्पाद श्रृंखला</h2>
        <p className="text-center text-gray-400 text-sm mb-10">रोज़मर्रा की वेलनेस के लिए छह सावधानीपूर्वक तैयार आयुर्वेदिक समाधान</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {products.map((p, i) => (
            <div key={p.name} className="flex items-start gap-4 bg-[#f0f7ee] rounded-2xl p-5 border border-[#d4e8d0]">
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
          <h2 className="text-3xl font-bold mb-5">आपसे हमारा वादा</h2>
          <p className="text-gray-400 text-base leading-relaxed mb-8">
            हमारी सुविधा से निकलने वाले हर उत्पाद की गुणवत्ता जांच की गई है, शुद्ध प्राकृतिक सामग्री से बना है
            और देखभाल के साथ पैक किया गया है। अगर आप कभी असंतुष्ट हों, तो हमारी टीम मदद के लिए मौजूद है।
            हम अपनी हर चीज़ के पीछे खड़े हैं — क्योंकि हम खुद भी इसका इस्तेमाल करते हैं।
          </p>
          <a
            href={`mailto:${brand.email}`}
            className="inline-block bg-[#2d5a27] text-white px-8 py-3.5 rounded-full font-bold text-sm no-underline hover:bg-[#3a7a32] transition-colors"
          >
            संपर्क करें →
          </a>
        </div>
      </div>
    </div>
  );
}