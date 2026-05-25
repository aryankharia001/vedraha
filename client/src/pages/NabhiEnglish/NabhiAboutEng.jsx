import React from "react";
import { FaLeaf, FaShieldAlt, FaHeart, FaAward } from "react-icons/fa";
import { GiHerbsBundle, GiMeditation } from "react-icons/gi";
import { HiSparkles } from "react-icons/hi";
import NabhiHeader from "../../components/NabhiHeader";
import NabhiHeaderHindi from "../../components/NabhiHeaderHindi";

// ─── Brand data ───────────────────────────────────────────────────────────────
const brand = {
  name:      "Home With Care · Ved Sanjeevani",
  logoImage: "/NabhiLogo/nabhiLogo.png",
  email:     "akravipvtltd@gmail.com",
  phone:     "+91 97171 43189",
  themeColor: "#2d5a27",
};

const stats = [
  { num: "30,000+", label: "Happy Customers" },
  { num: "6",       label: "Ayurvedic Products" },
  { num: "4.6+",    label: "Average Rating" },
  { num: "100%",    label: "Natural Ingredients" },
];

const values = [
  {
    icon: <FaLeaf size={28} color="#2d5a27" />,
    title: "Rooted in Nature",
    desc:  "Every product we make uses only 100% natural, chemical-free Ayurvedic ingredients sourced from trusted growers across India.",
  },
  {
    icon: <GiHerbsBundle size={28} color="#2d5a27" />,
    title: "Ancient Wisdom",
    desc:  "Our formulas are inspired by centuries-old Ayurvedic texts and navel therapy (Nabhi Chikitsa) — a practice that has stood the test of time.",
  },
  {
    icon: <FaShieldAlt size={28} color="#2d5a27" />,
    title: "Quality You Can Trust",
    desc:  "Every batch is quality-checked before dispatch. We never compromise on purity — no parabens, no mineral oils, no fillers.",
  },
  {
    icon: <FaHeart size={28} color="#2d5a27" />,
    title: "Made with Care",
    desc:  "We are a family-run wellness brand. Each product is crafted with the same care we'd want for our own family's health.",
  },
  {
    icon: <GiMeditation size={28} color="#2d5a27" />,
    title: "Holistic Wellness",
    desc:  "We believe true health comes from within. Our navel oils work gently with the body's own systems — not against them.",
  },
  {
    icon: <HiSparkles size={28} color="#2d5a27" />,
    title: "Accessible Ayurveda",
    desc:  "We make Ayurvedic self-care simple, affordable, and easy to follow — just a few drops before bed is all it takes.",
  },
];

const products = [
  { name: "Nabhi Amrit",                   desc: "Digestion & detox navel oil — our bestseller" },
  { name: "Eye Care Nabhi Oil",            desc: "Vision support & digital eye strain relief" },
  { name: "Hair Care Nabhi Oil",           desc: "Nourish hair from within, reduce hair fall" },
  { name: "Joint Pain Remedy Nabhi Oil",   desc: "Knee, back & joint pain relief" },
  { name: "Menstrual Pain Relief Nabhi Oil", desc: "Natural period comfort for women" },
  { name: "Shilajit Energy Resin",         desc: "Pure Himalayan Shilajit for strength & stamina" },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function NabhiAboutEng() {
  return (
    <div className="font-sans text-gray-900 bg-white min-h-screen">
        <NabhiHeader/>
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
            <img src={brand.logoImage} alt={brand.name} className="w-16 h-16 object-contain rounded-2xl border-2 border-[#2d5a27]" />
          </div>
          <p className="text-sm font-semibold tracking-widest text-[#4a9a3f] uppercase mb-3">Our Story</p>
          <h1 className="text-4xl md:text-5xl font-black mb-5 leading-tight">
            Ancient Wisdom.<br />
            <span style={{ color: "#4a9a3f" }}>Modern Wellness.</span>
          </h1>
          <p className="text-gray-400 text-base leading-relaxed max-w-[580px] mx-auto">
            We are <strong className="text-white">Home With Care · Ved Sanjeevani</strong> — an Ayurvedic wellness brand
            dedicated to bringing the ancient art of navel therapy into everyday Indian homes.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-[#f0f7ee] py-12 px-5">
        <div className="max-w-[1100px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-4xl font-black text-[#2d5a27]" style={{ fontFamily: "'DM Sans', sans-serif" }}>{s.num}</div>
              <div className="text-sm text-gray-500 mt-1 font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Our Mission */}
      <div className="max-w-[860px] mx-auto px-5 py-16 text-center">
        <FaAward size={36} color="#2d5a27" className="mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-5 tracking-tight">Our Mission</h2>
        <p className="text-gray-500 text-base leading-relaxed">
          Millions of people suffer from digestive discomfort, eye strain, joint pain, hormonal imbalance
          and low energy — often without realising that ancient Ayurvedic solutions already exist. Our mission
          is to make these solutions accessible, easy to use, and trusted. We start with the navel — the
          body's original energy center — and work outward from there.
        </p>
      </div>

      {/* Values */}
      <div className="bg-[#f5f4ef] py-16 px-5">
        <div className="max-w-[1100px] mx-auto">
          <h2 className="text-center text-3xl font-bold mb-2 tracking-tight">What We Stand For</h2>
          <p className="text-center text-gray-400 text-sm mb-10">The principles behind every product we make</p>
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
        <h2 className="text-center text-3xl font-bold mb-2 tracking-tight">Our Product Range</h2>
        <p className="text-center text-gray-400 text-sm mb-10">Six carefully crafted Ayurvedic solutions for everyday wellness</p>
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
          <h2 className="text-3xl font-bold mb-5">Our Promise to You</h2>
          <p className="text-gray-400 text-base leading-relaxed mb-8">
            Every product that leaves our facility has been quality-checked, made from pure natural ingredients,
            and packed with care. If you are ever unsatisfied, our team is here to help. We stand behind
            everything we make — because we use it ourselves.
          </p>
          <a
            href="mailto:akravipvtltd@gmail.com"
            className="inline-block bg-[#2d5a27] text-white px-8 py-3.5 rounded-full font-bold text-sm no-underline hover:bg-[#3a7a32] transition-colors"
          >
            Get in Touch →
          </a>
        </div>
      </div>
    </div>
  );
}