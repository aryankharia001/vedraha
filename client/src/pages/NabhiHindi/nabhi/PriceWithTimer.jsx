import React from "react";
import { useCountdown24h } from "./useCountdown";

export default function PriceWithTimer({ currentVariant, selectedPrice }) {
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
          <span className="text-xs text-[#eeebe9] font-bold">⏰ऑफर समाप्त होगा</span>
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
