import { useState, useEffect, useRef, useCallback } from "react";
import { MdClose } from "react-icons/md";
import { FaBoxOpen, FaCheckCircle, FaShieldAlt, FaUser, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { FormField } from "./ui";
import { generateOrderId } from "./constants";
import React from "react";

export default function CodModal({ isOpen, onClose, selectedVariant, onSubmit, submitting, submitted }) {
  const [form, setForm] = useState({ fullName: "", phone: "", address: "", city: "", state: "", pincode: "" });
  const [errors, setErrors] = useState({});
  const orderIdRef = useRef(generateOrderId());

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "नाम आवश्यक है";
    if (!/^[6-9]\d{9}$/.test(form.phone)) e.phone = "वैध 10-अंक का मोबाइल नंबर दर्ज करें";
    if (!form.address.trim()) e.address = "पता आवश्यक है";
    if (!form.city.trim()) e.city = "शहर आवश्यक है";
    if (!form.state.trim()) e.state = "राज्य आवश्यक है";
    if (!/^\d{6}$/.test(form.pincode)) e.pincode = "वैध 6-अंक का पिनकोड दर्ज करें";
    return e;
  };

  const handleChangeRef = useRef(null);
  handleChangeRef.current = (field, val) => {
    setForm((f) => ({ ...f, [field]: val }));
    setErrors((e) => { const ne = { ...e }; delete ne[field]; return ne; });
  };
  const stableChange = useCallback((field, val) => handleChangeRef.current(field, val), []);

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    onSubmit({ ...form, orderId: orderIdRef.current, offer: selectedVariant?.label, price: selectedVariant?.priceNum });
  };

  useEffect(() => {
    if (isOpen) {
      orderIdRef.current = generateOrderId();
      setForm({ fullName: "", phone: "", address: "", city: "", state: "", pincode: "" });
      setErrors({});
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/65 z-[9999] flex items-end justify-center backdrop-blur-md"
      onClick={(e) => e.target === e.currentTarget && !submitting && onClose()}
    >
      <div className="bg-white rounded-t-3xl w-full max-w-xl max-h-[94vh] overflow-y-auto pb-8 shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-br from-[#2d5a27] to-[#1a3a15] rounded-t-3xl px-5 py-5 flex justify-between items-center z-10">
          <div>
            <div className="text-2xl font-bold text-white leading-tight" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
              कैश ऑन डिलीवरी ऑर्डर
            </div>
            <div className="text-xs text-white/70 mt-0.5">अपनी डिलीवरी जानकारी भरें</div>
          </div>
          <button
            onClick={onClose}
            disabled={submitting}
            className="bg-white/15 border-0 rounded-full w-9 h-9 flex items-center justify-center cursor-pointer text-white flex-shrink-0"
          >
            <MdClose size={18} />
          </button>
        </div>

        {/* Variant summary */}
        <div className="bg-[#f0f7ee] px-5 py-3 flex justify-between items-center border-b border-[#dce9d8]">
          <div className="flex items-center gap-2">
            <FaBoxOpen size={14} color="#2d5a27" />
            <span className="text-sm font-semibold text-[#2d5a27]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              नाभि अमृत · {selectedVariant?.label}
            </span>
          </div>
          <span className="text-base font-bold text-gray-900" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {selectedVariant?.price}
          </span>
        </div>

        {submitted ? (
          <div className="px-6 py-12 text-center">
            <div className="w-20 h-20 rounded-full bg-[#f0f7ee] flex items-center justify-center mx-auto mb-5">
              <FaCheckCircle size={40} color="#2d5a27" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-2.5" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
              ऑर्डर कन्फर्म हो गया!
            </div>
            <div className="text-gray-500 text-sm leading-relaxed mb-2">
              धन्यवाद, <strong>{form.fullName}</strong>! आपका ऑर्डर सफलतापूर्वक दर्ज हो गया है।
            </div>
            <div className="bg-[#f0f7ee] rounded-xl px-4 py-2.5 inline-block my-2 mb-6">
              <span className="text-base text-[#2d5a27] font-bold tracking-widest font-mono">#{orderIdRef.current}</span>
            </div>
            <div className="text-gray-400 text-sm">हमारी टीम डिलीवरी की पुष्टि के लिए आपको कॉल करेगी।</div>
          </div>
        ) : (
          <div className="px-5 pt-5">
            <FormField label="पूरा नाम" fieldKey="fullName" icon={<FaUser size={11} />} placeholder="अपना पूरा नाम दर्ज करें" value={form.fullName} error={errors.fullName} onChange={stableChange} />
            <FormField label="फोन नंबर" fieldKey="phone" icon={<FaPhone size={11} />} placeholder="10-अंक का मोबाइल नंबर" type="tel" maxLength={10} value={form.phone} error={errors.phone} onChange={stableChange} />
            <FormField label="पूरा पता" fieldKey="address" icon={<FaMapMarkerAlt size={11} />} placeholder="मकान नंबर, सड़क, इलाका" value={form.address} error={errors.address} onChange={stableChange} />
            <div className="grid grid-cols-2 gap-3">
              <FormField label="शहर" fieldKey="city" placeholder="आपका शहर" value={form.city} error={errors.city} onChange={stableChange} />
              <FormField label="राज्य" fieldKey="state" placeholder="आपका राज्य" value={form.state} error={errors.state} onChange={stableChange} />
            </div>
            <FormField label="पिन कोड" fieldKey="pincode" placeholder="6-अंक का पिन कोड" type="tel" maxLength={6} value={form.pincode} error={errors.pincode} onChange={stableChange} />

            <div className="bg-gray-50 rounded-xl px-3.5 py-2.5 mb-5 flex justify-between items-center">
              <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">ऑर्डर ID</span>
              <span className="text-sm text-gray-900 font-bold font-mono tracking-widest">#{orderIdRef.current}</span>
            </div>

            <button
              onClick={handleSubmit}
              disabled={submitting}
              className={`w-full border-0 rounded-2xl cursor-pointer outline-none bg-transparent ${submitting ? "opacity-70 cursor-not-allowed" : ""}`}
              style={{ WebkitTapHighlightColor: "transparent", padding: 0 }}
            >
              <div className="bg-gradient-to-br from-[#2d5a27] to-[#1a3a15] rounded-2xl">
                <div className="bg-gradient-to-br from-[#3a7a32] to-[#2d5a27] rounded-xl px-5 py-4 flex items-center justify-center gap-2.5">
                  {submitting ? (
                    <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full inline-block animate-spin" />
                  ) : (
                    <FaShieldAlt size={18} color="rgba(255,255,255,0.9)" />
                  )}
                  <span className="text-lg font-extrabold text-white tracking-wide">
                    {submitting ? "ऑर्डर हो रहा है…" : `COD ऑर्डर कन्फर्म करें · ${selectedVariant?.price}`}
                  </span>
                </div>
              </div>
            </button>
            <p className="text-center text-xs text-gray-400 mt-3 leading-relaxed">
              <FaShieldAlt size={10} color="#2d5a27" style={{ marginRight: 4, display: "inline" }} />
              आपकी जानकारी सुरक्षित है। ऑर्डर मिलने पर ही भुगतान करें।
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
