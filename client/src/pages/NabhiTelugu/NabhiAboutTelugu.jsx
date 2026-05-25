import React from "react";
import { FaLeaf, FaShieldAlt, FaHeart, FaAward } from "react-icons/fa";
import { GiHerbsBundle, GiMeditation } from "react-icons/gi";
import { HiSparkles } from "react-icons/hi";
import NabhiHeader from "../../components/NabhiHeader";
import NabhiHeaderTelugu from "../../components/NabhiHeaderTelugu";

// ─── Brand data ───────────────────────────────────────────────────────────────
const brand = {
  name:       "Home With Care · Ved Sanjeevani",
  logoImage:  "/NabhiLogo/nabhiLogo.png",
  email:      "akravipvtltd@gmail.com",
  phone:      "+91 97171 43189",
  themeColor: "#2d5a27",
};

const stats = [
  { num: "30,000+", label: "సంతోషకరమైన కస్టమర్లు" },
  { num: "6",       label: "ఆయుర్వేదిక్ ఉత్పత్తులు" },
  { num: "4.6+",    label: "సగటు రేటింగ్" },
  { num: "100%",    label: "సహజ పదార్థాలు" },
];

const values = [
  {
    icon:  <FaLeaf size={28} color="#2d5a27" />,
    title: "ప్రకృతిలో వేళ్ళూని",
    desc:  "మేము తయారుచేసే ప్రతి ఉత్పత్తి భారతదేశంలోని విశ్వసనీయ రైతుల నుండి సేకరించిన 100% సహజ, రసాయన రహిత ఆయుర్వేదిక్ పదార్థాలను మాత్రమే ఉపయోగిస్తుంది.",
  },
  {
    icon:  <GiHerbsBundle size={28} color="#2d5a27" />,
    title: "శతాబ్దాల జ్ఞానం",
    desc:  "మా సూత్రీకరణలు శతాబ్దాల పాత ఆయుర్వేదిక్ గ్రంథాలు మరియు నాభి చికిత్స ఆధారంగా రూపొందించబడ్డాయి — కాలపరీక్షలో నిలిచిన అభ్యాసం.",
  },
  {
    icon:  <FaShieldAlt size={28} color="#2d5a27" />,
    title: "నమ్మకమైన నాణ్యత",
    desc:  "ప్రతి బ్యాచ్ పంపిణీకి ముందు నాణ్యత తనిఖీ చేయబడుతుంది. పారాబెన్‌లు, మినరల్ ఆయిల్స్, ఫిల్లర్స్ లేవు — స్వచ్ఛతలో ఎప్పుడూ రాజీపడము.",
  },
  {
    icon:  <FaHeart size={28} color="#2d5a27" />,
    title: "శ్రద్ధతో తయారుచేయబడింది",
    desc:  "మేము ఒక కుటుంబ ఆరోగ్య బ్రాండ్. మా స్వంత కుటుంబ ఆరోగ్యానికి కోరుకునే అదే శ్రద్ధతో ప్రతి ఉత్పత్తి తయారుచేయబడుతుంది.",
  },
  {
    icon:  <GiMeditation size={28} color="#2d5a27" />,
    title: "సమగ్ర ఆరోగ్యం",
    desc:  "నిజమైన ఆరోగ్యం లోపల నుండి వస్తుందని మేము నమ్ముతాము. మా నాభి నూనెలు శరీరం యొక్క స్వంత వ్యవస్థలతో సున్నితంగా పనిచేస్తాయి.",
  },
  {
    icon:  <HiSparkles size={28} color="#2d5a27" />,
    title: "అందుబాటులో ఆయుర్వేదం",
    desc:  "ఆయుర్వేదిక్ స్వయం సంరక్షణను సరళంగా, సాధ్యమైన ధరలో మరియు అనుసరించడానికి సులభంగా చేస్తాము — నిద్రకు ముందు కొన్ని చుక్కలు మాత్రమే సరిపోతాయి.",
  },
];

const products = [
  { name: "నాభి అమృత్",                         desc: "జీర్ణక్రియ & డిటాక్స్ నాభి నూనె — మా బెస్ట్‌సెల్లర్" },
  { name: "ఐ కేర్ నాభి ఆయిల్",                  desc: "దృష్టి సహాయం & డిజిటల్ కంటి అలసట నివారణ" },
  { name: "హెయిర్ కేర్ నాభి ఆయిల్",             desc: "లోపల నుండి జుట్టుకు పోషణ, జుట్టు రాలడం తగ్గించండి" },
  { name: "జాయింట్ పెయిన్ రెమెడీ నాభి ఆయిల్",  desc: "మోకాలు, వీపు & కీళ్ళ నొప్పి నివారణ" },
  { name: "మెన్‌స్ట్రువల్ పెయిన్ రిలీఫ్ నాభి ఆయిల్", desc: "మహిళలకు సహజ ఋతుక్రమ సౌకర్యం" },
  { name: "శిలాజిత్ ఎనర్జీ రెసిన్",              desc: "శక్తి & సహనం కోసం స్వచ్ఛమైన హిమాలయన్ శిలాజిత్" },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function NabhiAboutTelugu() {
  return (
    <div className="font-sans text-gray-900 bg-white min-h-screen">
      <NabhiHeaderTelugu />
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
          <p className="text-sm font-semibold tracking-widest text-[#4a9a3f] uppercase mb-3">మా కథ</p>
          <h1 className="text-4xl md:text-5xl font-black mb-5 leading-tight">
            శతాబ్దాల జ్ఞానం.<br />
            <span style={{ color: "#4a9a3f" }}>ఆధునిక ఆరోగ్యం.</span>
          </h1>
          <p className="text-gray-400 text-base leading-relaxed max-w-[580px] mx-auto">
            మేము <strong className="text-white">Home With Care · Ved Sanjeevani</strong> — నాభి చికిత్స యొక్క
            ప్రాచీన కళను ప్రతి భారతీయ ఇంట్లోకి తీసుకురావడానికి అంకితమైన ఒక ఆయుర్వేదిక్ ఆరోగ్య బ్రాండ్.
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
        <h2 className="text-3xl font-bold mb-5 tracking-tight">మా లక్ష్యం</h2>
        <p className="text-gray-500 text-base leading-relaxed">
          లక్షలాది మంది ప్రజలు జీర్ణ సమస్యలు, కంటి అలసట, కీళ్ళ నొప్పి, హార్మోన్ అసమతుల్యత మరియు
          తక్కువ శక్తితో బాధపడుతున్నారు — ప్రాచీన ఆయుర్వేదిక్ పరిష్కారాలు ఇప్పటికే ఉన్నాయని
          తెలియకుండా. ఈ పరిష్కారాలను అందుబాటులో, ఉపయోగించడానికి సులభంగా మరియు విశ్వసనీయంగా
          చేయడమే మా లక్ష్యం. మేము నాభి నుండి — శరీరం యొక్క మూల శక్తి కేంద్రం నుండి — ప్రారంభిస్తాము.
        </p>
      </div>

      {/* Values */}
      <div className="bg-[#f5f4ef] py-16 px-5">
        <div className="max-w-[1100px] mx-auto">
          <h2 className="text-center text-3xl font-bold mb-2 tracking-tight">మేము దేని కోసం నిలబడతాము</h2>
          <p className="text-center text-gray-400 text-sm mb-10">మేము తయారుచేసే ప్రతి ఉత్పత్తి వెనుక ఉన్న సూత్రాలు</p>
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
        <h2 className="text-center text-3xl font-bold mb-2 tracking-tight">మా ఉత్పత్తుల శ్రేణి</h2>
        <p className="text-center text-gray-400 text-sm mb-10">రోజువారీ ఆరోగ్యం కోసం జాగ్రత్తగా రూపొందించిన ఆరు ఆయుర్వేదిక్ పరిష్కారాలు</p>
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
          <h2 className="text-3xl font-bold mb-5">మీకు మా వాగ్దానం</h2>
          <p className="text-gray-400 text-base leading-relaxed mb-8">
            మా సౌకర్యం నుండి బయలుదేరే ప్రతి ఉత్పత్తి నాణ్యత తనిఖీ చేయబడింది, స్వచ్ఛమైన సహజ పదార్థాలతో
            తయారుచేయబడింది మరియు శ్రద్ధతో ప్యాక్ చేయబడింది. మీరు ఎప్పుడైనా అసంతృప్తిగా ఉంటే, మా బృందం
            సహాయానికి అందుబాటులో ఉంటుంది. మేము స్వయంగా ఉపయోగించే కారణంగా, తయారుచేసే ప్రతి దానికి మేము
            బాధ్యత వహిస్తాము.
          </p>
          <a
            href="mailto:akravipvtltd@gmail.com"
            className="inline-block bg-[#2d5a27] text-white px-8 py-3.5 rounded-full font-bold text-sm no-underline hover:bg-[#3a7a32] transition-colors"
          >
            మాతో సంప్రదించండి →
          </a>
        </div>
      </div>
    </div>
  );
}