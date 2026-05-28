/**
 * PriceWithTimer.jsx  — sharedEnglish/PriceWithTimer.jsx
 */

import React from "react";
import { useCountdown24h } from "./useCountdown";

export default function PriceWithTimer({ currentVariant, selectedPrice, themeColor }) {
  const { m, s } = useCountdown24h();
  const mrp = currentVariant?.mrp;
  const discountPct = mrp ? Math.round(((mrp - selectedPrice) / mrp) * 100) : 0;

  return (
    <div className="my-2 mb-[18px]">
      <div className="flex items-center gap-3 flex-wrap">
        <span
          className="text-[36px] font-black text-[#B89454]"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          ₹{selectedPrice.toLocaleString("en-IN")}
        </span>
        {mrp && (
          <span
            className="text-lg text-gray-400 line-through font-medium"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            ₹{mrp.toLocaleString("en-IN")}
          </span>
        )}
      </div>
    </div>
  );
}