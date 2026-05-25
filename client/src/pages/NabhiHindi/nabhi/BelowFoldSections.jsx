import React, { useState } from "react";
import { GiHerbsBundle, GiMeditation, GiDroplets, GiHealing } from "react-icons/gi";
import { FaLeaf, FaShieldAlt, FaHandSparkles } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { UpiStack } from "./ui";
import { CarousalItems, CarousalItems3, upiIcons } from "./constants";

const benefits = [
  { icon: <GiDroplets size={28} color="#2d5a27" />, title: "गहरी नाभि चिकित्सा", desc: "नाभि पर लगाने के लिए विशेष रूप से बनाया गया, जो प्राचीन पेचोटी विधि से शरीर के भीतर गहरा अवशोषण सुनिश्चित करता है।" },
  { icon: <FaLeaf size={26} color="#2d5a27" />, title: "100% आयुर्वेदिक", desc: "समय-परीक्षित आयुर्वेदिक जड़ी-बूटियों और तेलों से बना, रसायनों, पैराबेन और मिनरल ऑयल से मुक्त।" },
  { icon: <HiSparkles size={26} color="#2d5a27" />, title: "सर्वांगीण वेलनेस", desc: "एक ही तेल जो पाचन, जोड़ों की सुविधा, हार्मोनल संतुलन और समग्र जीवन शक्ति को सहयोग देता है।" },
  { icon: <FaHandSparkles size={26} color="#2d5a27" />, title: "सरल और सुरक्षित दिनचर्या", desc: "सोते समय बस 2-3 बूंदें — कोई मालिश नहीं, कोई झंझट नहीं।" },
];

const ritualsData = [
  { icon: <GiHerbsBundle size={22} color="#2d5a27" />, title: "पारंपरिक हर्बल अर्क", desc: "धीमी आयुर्वेदिक अर्क प्रक्रिया से तैयार।" },
  { icon: <GiMeditation size={22} color="#2d5a27" />, title: "मणिपुर चक्र संतुलन", desc: "नाभि मणिपुर चक्र का केंद्र है — शरीर की जीवन शक्ति और आंतरिक संतुलन का ऊर्जा केंद्र।" },
  { icon: <GiDroplets size={22} color="#2d5a27" />, title: "गहरी नाभि अवशोषण", desc: "नाभि क्षेत्र में कई तंत्रिका अंत होते हैं।" },
  { icon: <GiHealing size={22} color="#2d5a27" />, title: "आंतरिक संतुलन बहाल करता है", desc: "प्राकृतिक डिटॉक्सीफिकेशन में सहयोग करता है, सूजन कम करता है।" },
];

function BuyNowBtn({ onClick }) {
  return (
    <button onClick={onClick} className="p-0 border-0 rounded-2xl cursor-pointer bg-transparent outline-none" style={{ WebkitTapHighlightColor: "transparent" }}>
      <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl px-4 py-3.5 flex items-center justify-center gap-2">
          <UpiStack icons={upiIcons} />
          <span className="text-base font-extrabold text-white">अभी खरीदें</span>
        </div>
      </div>
    </button>
  );
}

export function HowToUseSection({ isMobile }) {
  const [index, setIndex] = useState(0);
  const prev = () => setIndex((p) => (p - 1 + CarousalItems.length) % CarousalItems.length);
  const next = () => setIndex((p) => (p + 1) % CarousalItems.length);

  return (
    <div className="w-full py-10 px-5 bg-white">
      <h2 className="text-center text-3xl font-bold mb-5 leading-tight tracking-tight" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
        इसका उपयोग कैसे करना है
      </h2>
      {isMobile ? (
        <div className="relative w-full">
          <div className="overflow-hidden rounded-2xl">
            <div className="flex transition-transform duration-400" style={{ transform: `translateX(-${index * 100}%)` }}>
              {CarousalItems.map((item, i) => <img key={i} src={item.url} alt="" className="w-full flex-shrink-0 object-cover" loading="lazy" />)}
            </div>
          </div>
          <button onClick={prev} className="absolute top-1/2 left-2.5 -translate-y-1/2 bg-black text-white border-0 rounded-full w-8 h-8 cursor-pointer text-lg">‹</button>
          <button onClick={next} className="absolute top-1/2 right-2.5 -translate-y-1/2 bg-black text-white border-0 rounded-full w-8 h-8 cursor-pointer text-lg">›</button>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-5">
          {CarousalItems.map((item, i) => <div key={i} className="rounded-2xl overflow-hidden"><img src={item.url} alt="" className="w-full h-full object-cover" loading="lazy" /></div>)}
        </div>
      )}
    </div>
  );
}

export function BloatFreeSection({ onBuyNow }) {
  return (
    <div className="bg-[#f5f4ef]">
      <div className="max-w-[1100px] mx-auto px-5">
        <div className="py-13 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4 leading-tight tracking-tight" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>सूजन-मुक्त पेट</h2>
            <p className="text-gray-500 text-base leading-loose mb-3.5">शरीर की प्राकृतिक पाचन संतुलन को सहयोग देकर असुविधाजनक सूजन को कम करने में मदद करता है।</p>
            <p className="text-gray-500 text-base leading-loose">नियमित उपयोग से आपका पेट दिनभर हल्का, सपाट और अधिक आरामदायक महसूस हो सकता है।</p>
            <div className="mt-5"><BuyNowBtn onClick={onBuyNow} /></div>
          </div>
          <div className="rounded-2xl overflow-hidden aspect-square border border-gray-200">
            <video
              src="https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=nabhi.mp4&version_id=null"
              autoPlay loop muted playsInline
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function OilBenefitsSection({ isMobile }) {
  const [index2, setIndex2] = useState(0);
  const prev2 = () => setIndex2((p) => (p - 1 + CarousalItems3.length) % CarousalItems3.length);
  const next2 = () => setIndex2((p) => (p + 1) % CarousalItems3.length);

  return (
    <div className="w-full mt-5 bg-white">
      <h2 className="text-center text-3xl font-bold mb-5 leading-tight tracking-tight" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
        एक तेल, अनेक फायदे
      </h2>
      {isMobile ? (
        <div className="relative w-full">
          <div className="overflow-hidden rounded-2xl">
            <div className="flex transition-transform duration-400" style={{ transform: `translateX(-${index2 * 100}%)` }}>
              {CarousalItems3.map((item, i) => <img key={i} src={item.url} alt="" className="w-full flex-shrink-0 object-cover" loading="lazy" />)}
            </div>
          </div>
          <button onClick={prev2} className="absolute top-1/2 left-2.5 -translate-y-1/2 bg-black text-white border-0 rounded-full w-8 h-8 cursor-pointer text-lg">‹</button>
          <button onClick={next2} className="absolute top-1/2 right-2.5 -translate-y-1/2 bg-black text-white border-0 rounded-full w-8 h-8 cursor-pointer text-lg">›</button>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-5">
          {CarousalItems3.map((item, i) => <div key={i} className="rounded-2xl overflow-hidden"><img src={item.url} alt="" className="w-full h-full object-cover" loading="lazy" /></div>)}
        </div>
      )}
    </div>
  );
}

export function BalanceVideoSection({ onBuyNow }) {
  const [muted, setMuted] = useState(true);
  const vRef = React.useRef(null);

  return (
    <div className="max-w-[1100px] mx-auto px-5">
      <div className="py-13 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="rounded-2xl overflow-hidden border border-gray-200 relative bg-[#f5f4ef]" style={{ aspectRatio: "16/20" }}>
          <video
            ref={vRef}
            src="https://console.minio.traffakpay.com/api/v1/buckets/akravi/objects/download?preview=true&prefix=amrit.mp4&version_id=null"
            autoPlay loop muted={muted} playsInline
            className="w-full h-auto block"
            style={{ objectFit: "fill" }}
          />
          <button
            onClick={() => setMuted((prev) => !prev)}
            className="absolute bottom-3 right-3 z-10 bg-black/55 border-0 rounded-full w-9 h-9 flex items-center justify-center cursor-pointer backdrop-blur-sm"
            aria-label={muted ? "Unmute" : "Mute"}
          >
            {muted ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" /></svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><path d="M15.54 8.46a5 5 0 0 1 0 7.07" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14" /></svg>
            )}
          </button>
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-4 leading-tight tracking-tight" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>नाभि से बहता है संतुलन</h2>
          <p className="text-gray-500 text-base leading-loose mb-3.5">आयुर्वेद में, <strong className="text-gray-900">नाभि</strong> को शरीर के आंतरिक संतुलन और ऊर्जा प्रवाह का केंद्र माना जाता है।</p>
          <p className="text-gray-500 text-base leading-loose">नाभि अमृत से नाभि को पोषण देकर, आप शरीर की प्राकृतिक सामंजस्य को सहयोग देते हैं।</p>
          <div className="mt-5"><BuyNowBtn onClick={onBuyNow} /></div>
        </div>
      </div>
    </div>
  );
}

export function HeroBannerSection() {
  return (
    <div className="bg-black text-white py-13 px-5 text-center">
      <div className="max-w-[1100px] mx-auto">
        <h2 className="text-4xl font-bold mb-3.5 tracking-tight" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>नाभि अमृत का अनुष्ठान</h2>
        <p className="text-base leading-loose max-w-[660px] mx-auto mb-8 opacity-90">
          सूजन, त्वचा पर दाने, धीमा चयापचय और जोड़ों की तकलीफ जैसी कई समस्याएं तब शुरू होती हैं जब शरीर का आंतरिक संतुलन बिगड़ जाता है।
        </p>
        <div className="flex gap-8 justify-center flex-wrap mt-8">
          {[{ num: "10,000+", label: "खुश ग्राहक" }, { num: "4.62", label: "औसत रेटिंग" }, { num: "189", label: "सत्यापित समीक्षाएं" }, { num: "100%", label: "आयुर्वेदिक" }].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold" style={{ fontFamily: "'DM Sans', sans-serif" }}>{stat.num}</div>
              <div className="text-sm opacity-75 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function RitualFeaturesSection() {
  return (
    <div id="ritual" className="bg-white">
      <div className="max-w-[1100px] mx-auto px-5">
        <div className="py-13">
          <h2 className="text-center text-3xl font-bold mb-2.5 tracking-tight leading-tight" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
            नाभि चिकित्सा कैसे काम करती है
          </h2>
          <p className="text-center text-gray-500 text-base max-w-[600px] mx-auto mb-9 leading-loose">
            प्राचीन आयुर्वेदिक ज्ञान में निहित, नाभि हजारों ऊर्जा चैनलों को जोड़ने वाला शरीर का केंद्र है।
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {ritualsData.map((r) => (
              <div key={r.title} className="benefit-card">
                <div className="mb-3">{r.icon}</div>
                <h3 className="text-lg font-bold text-[#2d5a27] m-0 mb-2" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>{r.title}</h3>
                <p className="text-gray-500 text-sm leading-loose m-0">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function WhyUsSection() {
  return (
    <div id="about" className="w-full bg-[#f5f4ef]">
      <div className="max-w-[1100px] mx-auto px-5">
        <div className="py-13">
          <h2 className="text-center text-3xl font-bold mb-2.5 tracking-tight leading-tight" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
            हमें क्यों चुनें?
          </h2>
          <p className="text-center text-gray-500 text-base max-w-[600px] mx-auto mb-9 leading-loose">
            भारत भर में 10,000 से अधिक ग्राहकों का भरोसा, प्रकृति की बेहतरीन सामग्रियों से तैयार।
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {benefits.map((b) => (
              <div key={b.title} className="benefit-card">
                <div className="benefit-icon">{b.icon}</div>
                <h3 className="text-lg font-bold m-0 mb-2" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>{b.title}</h3>
                <p className="text-gray-500 text-sm leading-loose m-0">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function GreenMarqueeSection() {
  return (
    <div className="bg-[#2d5a27] text-white py-4 overflow-hidden whitespace-nowrap text-sm font-bold tracking-widest">
      {[0, 1].map((k) => (
        <div key={k} className="inline-block" style={{ animation: "marquee 14s linear infinite" }}>
          {[
            { icon: <GiDroplets size={13} />, text: "पेट की सफाई" },
            { icon: <GiMeditation size={13} />, text: "हल्का पेट" },
            { icon: <HiSparkles size={13} />, text: "साफ त्वचा" },
            { icon: <FaHandSparkles size={13} />, text: "संतुलित वेलनेस" },
            { icon: <GiDroplets size={13} />, text: "पेट की सफाई" },
            { icon: <GiMeditation size={13} />, text: "हल्का पेट" },
            { icon: <HiSparkles size={13} />, text: "साफ त्वचा" },
            { icon: <FaHandSparkles size={13} />, text: "संतुलित वेलनेस" },
          ].map((item, i) => (
            <span key={i} className="mr-12 inline-flex items-center gap-2.5">
              {item.icon} {item.text}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
