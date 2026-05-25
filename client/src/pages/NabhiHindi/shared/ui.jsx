// components/nabhi/ui/StarRating.jsx
import { FaStar } from "react-icons/fa";
import React from "react";

export function StarRating({ rating, size = 14 }) {
  return (
    <span className="inline-flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <FaStar key={s} size={size} color={s <= rating ? "#c8a84b" : "#e0e0e0"} />
      ))}
    </span>
  );
}

// components/nabhi/ui/Accordion.jsx
import { useState } from "react";
import { BsChevronDown } from "react-icons/bs";

export function Accordion({ title, content }) {
  const [open, setOpen] = useState(title === "नाभि अमृत क्यों?");
  return (
    <div className="border-t border-gray-200">
      <button
        onClick={() => setOpen(!open)}
        className="w-full bg-transparent border-0 py-4 flex justify-between items-center cursor-pointer font-bold text-base text-gray-900 text-left gap-2"
        style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
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

// components/nabhi/ui/FormField.jsx
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

// components/nabhi/ui/UpiStack.jsx
export function UpiStack({ icons, size = "md" }) {
  const dim = size === "sm" ? { outer: "w-5 h-5", inner: "w-3.5 h-3.5", gap: -6 } : { outer: "w-6 h-6", inner: "w-4 h-4", gap: -8 };
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
