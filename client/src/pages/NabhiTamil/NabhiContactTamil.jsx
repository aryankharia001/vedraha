import React, { useState } from "react";
import { FaEnvelope, FaWhatsapp, FaClock, FaShieldAlt } from "react-icons/fa";
import { MdCheckCircle } from "react-icons/md";
import NabhiHeader from "../../components/NabhiHeader";
import { backendurl } from "../../App";
import NabhiHeaderTamil from "../../components/NabhiHeaderTamil";

// ─── Brand data ───────────────────────────────────────────────────────────────
const brand = {
  name:           "Home With Care · Ved Sanjeevani",
  logoImage:      "/NabhiLogo/nabhiLogo.png",
  email:          "akravipvtltd@gmail.com",
  phone:          "+91 97171 43189",
  whatsappNumber: "919717143189",
  themeColor:     "#2d5a27",
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function NabhiContactTamil() {
  const [form, setForm]               = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted]     = useState(false);
  const [loading, setLoading]         = useState(false);
  const [errors, setErrors]           = useState({});
  const [serverError, setServerError] = useState("");

  // ── Client-side validation ──────────────────────────────────────────────────
  const validate = () => {
    const e = {};
    if (!form.name.trim())
      e.name = "பெயர் தேவை";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      e.email = "சரியான மின்னஞ்சல் முகவரியை உள்ளிடுங்கள்";
    if (form.phone.trim() && !/^[0-9]{10}$/.test(form.phone.trim()))
      e.phone = "தொலைபேசி எண் சரியாக 10 இலக்கங்களாக இருக்க வேண்டும்";
    if (!form.message.trim())
      e.message = "உங்கள் செய்தியை உள்ளிடுங்கள்";
    return e;
  };

  const handleChange = (field, val) => {
    setForm((f) => ({ ...f, [field]: val }));
    setErrors((e) => { const n = { ...e }; delete n[field]; return n; });
    setServerError("");
  };

  // ── POST to /api/contact ────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    try {
      const res = await fetch(`${backendurl}/api/contact`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:    form.name.trim(),
          email:   form.email.trim(),
          phone:   form.phone.trim(),
          message: form.message.trim(),
          lang:    "ta",
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setServerError(data.message || "ஏதோ தவறு நடந்தது. மீண்டும் முயற்சிக்கவும்.");
        return;
      }

      setSubmitted(true);
    } catch {
      setServerError("நெட்வொர்க் பிழை. உங்கள் இணைப்பை சரிபார்த்து மீண்டும் முயற்சிக்கவும்.");
    } finally {
      setLoading(false);
    }
  };

  const whatsappHref = `https://api.whatsapp.com/send/?phone=${brand.whatsappNumber}&text=${encodeURIComponent("வணக்கம், என் ஆர்டர் பற்றி உதவி தேவை.")}&type=phone_number&app_absent=0`;

  return (
    <div className="font-sans text-gray-900 bg-white min-h-screen">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800;900&display=swap');
        body { font-family: 'DM Sans', sans-serif; }
        * { box-sizing: border-box; }
        input:focus, textarea:focus { outline: none; border-color: #2d5a27 !important; box-shadow: 0 0 0 3px rgba(45,90,39,0.12); }
      `}</style>

      <NabhiHeaderTamil />

      {/* ── Contact Cards ───────────────────────────────────────────────────── */}
      <div className="max-w-[1100px] mx-auto px-5 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">

          {/* WhatsApp */}
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="no-underline group">
            <div className="bg-[#f0f7ee] rounded-2xl p-6 border border-[#d4e8d0] text-center hover:shadow-md transition-shadow cursor-pointer h-full">
              <div className="w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center mx-auto mb-4">
                <FaWhatsapp size={26} color="#fff" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-1">WhatsApp</h3>
              <p className="text-gray-500 text-sm mb-3">விரைவான பதில் — இப்போதே நம்முடன் அரட்டையடிக்கவும்</p>
              <span className="text-[#2d5a27] font-bold text-sm">{brand.phone}</span>
            </div>
          </a>

          {/* Email */}
          <a href={`mailto:${brand.email}`} className="no-underline group">
            <div className="bg-[#f0f7ee] rounded-2xl p-6 border border-[#d4e8d0] text-center hover:shadow-md transition-shadow cursor-pointer h-full">
              <div className="w-14 h-14 rounded-full bg-[#2d5a27] flex items-center justify-center mx-auto mb-4">
                <FaEnvelope size={22} color="#fff" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-1">மின்னஞ்சல் அனுப்புங்கள்</h3>
              <p className="text-gray-500 text-sm mb-3">வேலை நாட்களில் 24 மணி நேரத்தில் பதில் அளிக்கிறோம்</p>
              <span className="text-[#2d5a27] font-bold text-sm">{brand.email}</span>
            </div>
          </a>

          {/* Support Hours */}
          <div className="bg-[#f0f7ee] rounded-2xl p-6 border border-[#d4e8d0] text-center h-full">
            <div className="w-14 h-14 rounded-full bg-[#2d5a27] flex items-center justify-center mx-auto mb-4">
              <FaClock size={22} color="#fff" />
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-1">ஆதரவு நேரம்</h3>
            <p className="text-gray-500 text-sm mb-3">நமது குழு இந்த நேரத்தில் கிடைக்கும்</p>
            <span className="text-[#2d5a27] font-bold text-sm">திங்கள் – சனி · காலை 10 மணி – மாலை 6 மணி IST</span>
          </div>
        </div>

        {/* ── Contact Form ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-2xl font-bold mb-1 tracking-tight">எங்களுக்கு செய்தி அனுப்புங்கள்</h2>
            <p className="text-gray-400 text-sm mb-6">
              படிவத்தை நிரப்புங்கள், 24 மணி நேரத்தில் உங்களுக்கு பதில் அளிப்போம்.
            </p>

            {submitted ? (
              /* Success state */
              <div className="bg-[#f0f7ee] rounded-2xl p-8 text-center border border-[#d4e8d0]">
                <MdCheckCircle size={48} color="#2d5a27" className="mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">செய்தி பெறப்பட்டது!</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  நன்றி, <strong>{form.name}</strong>! 24 மணி நேரத்தில்{" "}
                  <strong>{form.email}</strong> முகவரிக்கு பதில் அளிப்போம்.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>

                {/* Server error banner */}
                {serverError && (
                  <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
                    {serverError}
                  </div>
                )}

                {/* Full Name */}
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5 block">
                    முழு பெயர் *
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="உங்கள் முழு பெயர்"
                    disabled={loading}
                    className={`w-full px-4 py-3 rounded-xl text-base text-gray-900 bg-gray-50 border transition-colors ${
                      errors.name ? "border-red-400 bg-red-50" : "border-gray-200"
                    }`}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5 block">
                    மின்னஞ்சல் முகவரி *
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="you@example.com"
                    disabled={loading}
                    className={`w-full px-4 py-3 rounded-xl text-base text-gray-900 bg-gray-50 border transition-colors ${
                      errors.email ? "border-red-400 bg-red-50" : "border-gray-200"
                    }`}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                {/* Phone — optional */}
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5 block">
                    தொலைபேசி எண்{" "}
                    <span className="normal-case font-normal text-gray-400">(விருப்பமானது)</span>
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) =>
                      handleChange("phone", e.target.value.replace(/\D/g, ""))
                    }
                    placeholder="10 இலக்க மொபைல் எண்"
                    maxLength={10}
                    disabled={loading}
                    className={`w-full px-4 py-3 rounded-xl text-base text-gray-900 bg-gray-50 border transition-colors ${
                      errors.phone ? "border-red-400 bg-red-50" : "border-gray-200"
                    }`}
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>

                {/* Message */}
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5 block">
                    உங்கள் செய்தி *
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    placeholder="உங்கள் ஆர்டர், கேள்வி அல்லது கருத்து பற்றி கூறுங்கள்..."
                    rows={5}
                    maxLength={2000}
                    disabled={loading}
                    className={`w-full px-4 py-3 rounded-xl text-base text-gray-900 bg-gray-50 border transition-colors resize-none ${
                      errors.message ? "border-red-400 bg-red-50" : "border-gray-200"
                    }`}
                  />
                  <div className="flex justify-between mt-1">
                    {errors.message
                      ? <p className="text-red-500 text-xs">{errors.message}</p>
                      : <span />
                    }
                    <span className="text-xs text-gray-300 ml-auto">
                      {form.message.length}/2000
                    </span>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-4 text-white rounded-2xl font-bold text-base border-0 transition-colors flex items-center justify-center gap-2 ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#2d5a27] cursor-pointer hover:bg-[#3a7a32]"
                  }`}
                >
                  {loading && (
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full inline-block animate-spin" />
                  )}
                  {loading ? "அனுப்புகிறோம்…" : "செய்தி அனுப்புங்கள் →"}
                </button>

                <p className="text-xs text-gray-400 text-center flex items-center justify-center gap-1.5">
                  <FaShieldAlt size={10} color="#2d5a27" />
                  உங்கள் தகவல் பாதுகாப்பாக இருக்கும், பகிரப்படாது.
                </p>
              </form>
            )}
          </div>

          {/* Right column — reserved for future content */}
          <div />
        </div>
      </div>

      {/* ── WhatsApp CTA ────────────────────────────────────────────────────── */}
      <div className="bg-[#0a1a0f] py-12 px-5 text-center">
        <div className="max-w-[560px] mx-auto">
          <FaWhatsapp size={36} color="#25D366" className="mx-auto mb-4" />
          <h2 className="text-white text-2xl font-bold mb-3">நேரடியாக பேச விரும்புகிறீர்களா?</h2>
          <p className="text-gray-400 text-sm mb-6 leading-relaxed">
            விரைவான பதிலுக்கு, WhatsApp-ல் எங்களை தொடர்பு கொள்ளுங்கள். வேலை நேரத்தில் சில நிமிடங்களில்
            பதில் அளிப்போம்.
          </p>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-[#25D366] text-white px-8 py-3.5 rounded-full font-bold text-sm no-underline hover:bg-[#1ebc5a] transition-colors"
          >
            <FaWhatsapp size={18} />
            WhatsApp-ல் அரட்டையடிக்கவும்
          </a>
        </div>
      </div>
    </div>
  );
}