import { useEffect } from "react";
import { Minus, Plus, Trash2, ShoppingBag, X } from "lucide-react";
import { UpiStack } from "./ui";
import { upiIcons } from "./constants";
import React from "react";

export default function CartDrawer({ isOpen, onClose, cartItems, onUpdateQty, onRemoveItem, onBuyNow }) {
  const totalQty = cartItems.reduce((s, i) => s + i.quantity, 0);
  const totalAmt = cartItems.reduce((s, i) => s + i.variantPriceNum * i.quantity, 0);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/50 z-[8000] animate-[cartFadeIn_0.2s_ease]"
        />
      )}
      <div
        className="fixed top-0 right-0 w-[420px] max-w-[95vw] h-full bg-white z-[8001] flex flex-col shadow-2xl"
        style={{
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* Header */}
        <div className="px-6 pt-5 pb-4 flex items-center gap-2.5 border-b border-gray-100 flex-shrink-0">
          <ShoppingBag size={20} color="#1a1a1a" strokeWidth={1.8} />
          <h3 className="text-xl font-bold text-gray-900 m-0" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            మీ కార్ట్
          </h3>
          {totalQty > 0 && (
            <span className="w-6 h-6 rounded-full bg-[#2d5a27] text-white text-xs font-bold flex items-center justify-center">
              {totalQty}
            </span>
          )}
          <button
            onClick={onClose}
            className="ml-auto w-9 h-9 rounded-full border border-gray-200 bg-white cursor-pointer flex items-center justify-center text-gray-600 flex-shrink-0"
          >
            <X size={15} />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 py-14 text-center">
            <div className="w-[72px] h-[72px] rounded-full bg-[#f0f7ee] flex items-center justify-center mb-5">
              <ShoppingBag size={32} color="#2d5a27" strokeWidth={1.5} />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-2.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              మీ కార్ట్ ఖాళీగా ఉంది
            </div>
            <div className="text-sm text-gray-400 leading-relaxed mb-7">
              ప్రారంభించడానికి ఒక ఉత్పత్తిని జోడించండి
            </div>
            <button
              onClick={onClose}
              className="px-8 py-3 bg-[#2d5a27] text-white border-0 rounded-full text-sm font-semibold cursor-pointer"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              షాపింగ్ కొనసాగించండి
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6">
              {cartItems.map((item) => (
                <div key={item.cartId} className="flex gap-3.5 py-4 border-b border-gray-100">
                  <div className="w-[72px] h-[72px] rounded-xl overflow-hidden flex-shrink-0 bg-gray-100 border border-gray-200">
                    <img src={item.productImage} alt={item.productName} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-gray-900 mb-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      {item.productName}
                    </div>
                    <div className="text-xs text-gray-400 mb-0.5">{item.productTagline}</div>
                    <div className="text-xs text-[#2d5a27] font-semibold mb-2">{item.variantLabel}</div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onUpdateQty(item.cartId, item.quantity - 1)}
                        className={`w-7 h-7 rounded-md border border-gray-200 bg-white cursor-pointer flex items-center justify-center ${item.quantity === 1 ? "text-gray-300" : "text-gray-900"}`}
                      >
                        <Minus size={11} />
                      </button>
                      <span className="text-sm font-bold min-w-[18px] text-center">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQty(item.cartId, item.quantity + 1)}
                        className="w-7 h-7 rounded-md border border-gray-200 bg-white cursor-pointer flex items-center justify-center text-[#2d5a27]"
                      >
                        <Plus size={11} />
                      </button>
                      <button
                        onClick={() => onRemoveItem(item.cartId)}
                        className="w-7 h-7 rounded-md border border-gray-200 bg-white cursor-pointer flex items-center justify-center text-gray-400 ml-1"
                      >
                        <Trash2 size={11} />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between flex-shrink-0">
                    <div className="text-base font-bold text-gray-900" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      ₹{(item.variantPriceNum * item.quantity).toLocaleString("en-IN")}
                    </div>
                    <div className="text-xs text-gray-300">
                      ఒక్క బాటిల్ ధర ₹{item.variantPriceNum.toLocaleString("en-IN")}
                    </div>
                  </div>
                </div>
              ))}
              <div className="pt-4 pb-1 flex justify-between items-center">
                <span className="text-base text-gray-700 font-semibold">మొత్తం</span>
                <span className="text-2xl font-extrabold text-[#2d5a27]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  ₹{totalAmt.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="text-xs text-gray-400 pb-4">
                ఉచిత డెలివరీ · ఆన్‌లైన్ లేదా క్యాష్ ఆన్ డెలివరీ
              </div>
            </div>

            <div className="px-6 pt-3 pb-7 border-t border-gray-100 flex-shrink-0">
              <button
                onClick={onBuyNow}
                className="w-full py-4 border-0 rounded-2xl cursor-pointer bg-gradient-to-br from-gray-900 to-black flex items-center justify-center gap-2.5 outline-none"
                style={{ WebkitTapHighlightColor: "transparent" }}
              >
                <UpiStack icons={upiIcons} />
                <span className="text-base font-extrabold text-white tracking-wide">
                  ఇప్పుడే కొనండి · ₹{totalAmt.toLocaleString("en-IN")}
                </span>
              </button>
              <p className="text-center text-xs text-gray-300 mt-2.5">
                UPI · కార్డ్ · నెట్ బ్యాంకింగ్ · COD — అన్ని ఎంపికలు తదుపరి దశలో
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
}