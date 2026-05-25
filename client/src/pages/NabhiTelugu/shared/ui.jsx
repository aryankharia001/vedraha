// ─── PriceWithTimer ───────────────────────────────────────────────────────────
import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { BsChevronDown } from "react-icons/bs";

export function useCountdown24h() {
  const getRemaining = () => {
    const now = new Date();
    const end = new Date(now);
    end.setHours(23, 59, 59, 999);
    const diff = end - now;
    return {
      h: String(Math.floor(diff / 3600000)).padStart(2, "0"),
      m: String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0"),
      s: String(Math.floor((diff % 60000) / 1000)).padStart(2, "0"),
    };
  };
  const [time, setTime] = useState(getRemaining());
  useEffect(() => {
    const id = setInterval(() => setTime(getRemaining()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export function PriceWithTimer({ currentVariant, selectedPrice }) {
  const { m, s } = useCountdown24h();
  const mrp = currentVariant?.mrp;
  const discountPct = mrp ? Math.round(((mrp - selectedPrice) / mrp) * 100) : 0;

  return (
    <div className="my-2 mb-[18px]">
      <div className="flex items-center gap-2 flex-wrap">
        <span
          className="text-[40px] font-black text-[#2d5a27]"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          ₹{selectedPrice.toLocaleString("en-IN")}
        </span>
        {mrp && (
          <>
            <span
              className="text-base text-gray-400 line-through font-medium"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              ₹{mrp.toLocaleString("en-IN")}
            </span>
            <span className="bg-[#e8f5e2] text-[#2d5a27] text-xs font-extrabold px-2.5 py-1 rounded-full">
              {discountPct}% OFF
            </span>
          </>
        )}
        <div
          className="inline-flex items-center gap-1 bg-red-600 border border-[#f5c87a] rounded-lg px-2 py-1"
          style={{ animation: "timerJiggle 0.6s ease 0.5s 3" }}
        >
          <span className="text-xs text-[#eeebe9] font-bold">⏰ Offer Ends In</span>
          {[m, s].map((unit, i) => (
            <React.Fragment key={i}>
              <span className="bg-[#181615] text-white font-extrabold text-xs rounded px-1.5 py-0.5 min-w-[22px] text-center inline-block font-mono">
                {unit}
              </span>
              {i < 1 && <span className="text-[#b45309] font-extrabold text-xs">:</span>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── StarRating ───────────────────────────────────────────────────────────────
export function StarRating({ rating, size = 14 }) {
  return (
    <span className="inline-flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <FaStar key={s} size={size} color={s <= rating ? "#c8a84b" : "#e0e0e0"} />
      ))}
    </span>
  );
}

// ─── Accordion ────────────────────────────────────────────────────────────────
export function Accordion({ title, content }) {
  const [open, setOpen] = useState(title === "Why Nabhi Amrit?");
  return (
    <div className="border-t border-gray-200">
      <button
        onClick={() => setOpen(!open)}
        className="w-full bg-transparent border-0 py-4 flex justify-between items-center cursor-pointer font-bold text-base text-gray-900 text-left gap-2"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <span>{title}</span>
        <BsChevronDown
          size={16}
          color="#4E6443"
          style={{
            transition: "transform 0.3s",
            transform: open ? "rotate(180deg)" : "none",
            flexShrink: 0,
          }}
        />
      </button>
      {open && (
        <div className="pb-4 text-gray-500 text-sm leading-loose whitespace-pre-line">
          {content}
        </div>
      )}
    </div>
  );
}

// ─── FormField ────────────────────────────────────────────────────────────────
export function FormField({ label, fieldKey, icon, placeholder, type, maxLength, value, error, onChange }) {
  return (
    <div className="mb-4">
      {label && (
        <label className="text-xs font-bold text-gray-500 tracking-widest uppercase mb-1.5 flex items-center gap-1.5">
          {icon} {label}
        </label>
      )}
      <input
        type={type || "text"}
        value={value}
        onChange={(e) => onChange(fieldKey, e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        autoComplete="off"
        className={`w-full px-3.5 py-3 rounded-xl text-base text-gray-900 outline-none box-border transition-colors duration-200 ${
          error
            ? "border-2 border-red-500 bg-red-50"
            : "border border-gray-200 bg-gray-50 focus:border-green-700 focus:bg-white focus:shadow-md"
        }`}
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      />
      {error && <div className="text-red-600 text-xs mt-1">{error}</div>}
    </div>
  );
}

// ─── UpiStack ─────────────────────────────────────────────────────────────────
export function UpiStack({ icons, size = "md" }) {
  const dim =
    size === "sm"
      ? { outer: "w-5 h-5", inner: "w-3.5 h-3.5", gap: -6 }
      : { outer: "w-6 h-6", inner: "w-4 h-4", gap: -8 };
  return (
    <div className="flex">
      {icons.map((icon, i) => (
        <div
          key={i}
          className={`${dim.outer} rounded-full bg-white border-2 border-white/50 flex items-center justify-center flex-shrink-0`}
          style={{ marginLeft: i === 0 ? 0 : dim.gap, position: "relative", zIndex: icon.zIndex }}
        >
          <img src={icon.src} alt={icon.alt} className={`${dim.inner} object-contain`} />
        </div>
      ))}
    </div>
  );
}