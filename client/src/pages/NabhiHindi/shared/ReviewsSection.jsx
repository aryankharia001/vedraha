import { useState } from "react";
import { MdVerified } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { StarRating } from "./ui";
import { allReviews, photoReviewers } from "./constants";
import { PRODUCT } from "./constants";
import React from "react";

function ReviewPhotosSection({reviewPhotos}) {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [showAllGrid, setShowAllGrid] = useState(false);

  const closeLightbox = () => setLightboxIndex(null);
  const closeGrid = () => setShowAllGrid(false);

  return (
    <>
      <div className="flex items-center justify-between mb-3.5">
        <span className="text-base font-bold text-gray-900">Reviews with images</span>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 mb-7 scrollbar-none">
        {reviewPhotos.map((src, i) => {
          const isLast = i === reviewPhotos.length - 1;
          return ( 
            <div
              key={i}
              onClick={() => (isLast ? setShowAllGrid(true) : setLightboxIndex(i))}
              className="relative flex-shrink-0 w-[90px] h-[90px] rounded-xl overflow-hidden cursor-pointer border border-gray-200"
            >
              <img src={src} alt={`review ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
              {isLast && (
                <div className="absolute inset-0 bg-black/55 flex items-center justify-center">
                  <span className="text-white font-bold text-base" style={{ fontFamily: "'DM Sans', sans-serif" }}>+7</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div onClick={closeLightbox} className="fixed inset-0 bg-black/70 z-[9999] flex items-center justify-center p-4">
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl overflow-hidden flex flex-row flex-wrap max-w-[860px] w-full shadow-2xl"
            style={{ maxHeight: "90vh" }}
          >
            <div className="flex-1 min-w-0 bg-black flex items-center justify-center overflow-hidden" style={{ maxHeight: "90vh" }}>
              <img src={reviewPhotos[lightboxIndex]} alt="review" className="w-full h-full object-cover block" />
            </div>
            <div className="w-[280px] bg-white p-5 overflow-y-auto relative border-l border-gray-200" style={{ maxHeight: "90vh" }}>
              <button
                onClick={closeLightbox}
                className="absolute top-3 right-3 w-7 h-7 rounded-full border-0 bg-gray-100 cursor-pointer text-base text-gray-600 flex items-center justify-center"
              >×</button>
              <div className="flex gap-2.5 items-center mb-4 pb-3.5 border-b border-gray-200 pr-8">
                <img src={PRODUCT.image} alt={PRODUCT.name} className="w-10 h-10 rounded-lg object-cover border border-gray-200 flex-shrink-0" />
                <div className="font-bold text-xs text-gray-900 leading-tight">नाभि अमृत – आयुर्वेदिक नाभि तेल</div>
              </div>
              {(() => {
                const reviewer = photoReviewers[lightboxIndex] ?? photoReviewers[0];
                return (
                  <>
                    <div className="flex items-center gap-2.5 mb-2.5">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#2d5a27] to-[#4a8c40] flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-white">{reviewer.initials}</span>
                      </div>
                      <span className="font-bold text-sm text-gray-900">{reviewer.name}</span>
                    </div>
                    <div className="text-sm text-gray-700 leading-relaxed mb-3">{reviewer.body}</div>
                    <StarRating rating={reviewer.rating} size={14} />
                    <div className="mt-2.5 flex items-center gap-1.5 mb-5">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" /><path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" /></svg>
                      <span className="text-xs text-gray-400">{reviewer.likes}</span>
                    </div>
                  </>
                );
              })()}
              <button
                onClick={() => { closeLightbox(); setShowAllGrid(true); }}
                className="w-full py-2.5 bg-gray-100 border border-gray-200 rounded-xl cursor-pointer text-sm font-semibold text-gray-900"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >← View all images</button>
            </div>
          </div>
        </div>
      )}

      {/* Grid modal */}
      {showAllGrid && (
        <div onClick={closeGrid} className="fixed inset-0 bg-black/82 z-[9999] overflow-y-auto">
          <div onClick={(e) => e.stopPropagation()} className="bg-white max-w-[1160px] mx-auto min-h-screen px-6 py-5 pb-12 relative">
            <div className="flex items-center gap-3 mb-5 pb-3.5 border-b border-gray-200">
              <button onClick={closeGrid} className="flex items-center gap-1.5 bg-transparent border-0 cursor-pointer text-sm font-semibold text-gray-900" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                ← View all images
              </button>
              <button onClick={closeGrid} className="ml-auto w-8 h-8 rounded-full border-0 bg-gray-100 cursor-pointer flex items-center justify-center text-lg text-gray-600">×</button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {reviewPhotos.map((src, i) => (
                <div key={i} onClick={() => { closeGrid(); setLightboxIndex(i); }} className="cursor-pointer rounded-xl overflow-hidden bg-gray-100">
                  <img src={src} alt={`review ${i + 1}`} className="w-full aspect-square object-cover block" loading="lazy" />
                  <div className="p-3">
                    <StarRating rating={photoReviewers[i]?.rating ?? 5} size={12} />
                    <div className="text-sm text-gray-500 mt-1.5 leading-relaxed">{photoReviewers[i]?.body ?? "उपयोग करना बहुत आसान है।"}</div>
                    <div className="text-xs text-gray-300 mt-1">— {photoReviewers[i]?.name ?? ""}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ─── ReviewListSection ────────────────────────────────────────────────────────
function ReviewListSection() {
  const [starFilter, setStarFilter] = useState(0);
  const [sortBy, setSortBy] = useState("recent");
  const [starDropOpen, setStarDropOpen] = useState(false);
  const [sortDropOpen, setSortDropOpen] = useState(false);
  const [likedIds, setLikedIds] = useState([]);

  const parseDate = (d) => {
    const [m, day, y] = d.split("/");
    return new Date(`${y}-${m}-${day}`);
  };

  const filtered = allReviews
    .filter((r) => starFilter === 0 || r.rating === starFilter)
    .sort((a, b) => (sortBy === "highest" ? b.rating - a.rating : parseDate(b.date) - parseDate(a.date)));

  const toggleLike = (id) => setLikedIds((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  return (
    <div>
      <div className="flex gap-2.5 mb-6 relative flex-wrap">
        {/* Star filter */}
        <div className="relative">
          <button
            onClick={() => { setStarDropOpen((o) => !o); setSortDropOpen(false); }}
            className="flex items-center gap-1.5 px-3.5 py-2 border border-gray-200 rounded-full bg-white cursor-pointer text-sm font-semibold text-gray-900"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><line x1="2" y1="5" x2="14" y2="5" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" /><line x1="4" y1="9" x2="12" y2="9" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" /><line x1="6" y1="13" x2="10" y2="13" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" /></svg>
            {starFilter === 0 ? "Rating" : `${starFilter} ★`}
          </button>
          {starDropOpen && (
            <div className="absolute top-[calc(100%+6px)] left-0 bg-white border border-gray-200 rounded-xl shadow-xl z-50 min-w-[140px] overflow-hidden">
              {[0, 5, 4, 3, 2, 1].map((s) => (
                <button
                  key={s}
                  onClick={() => { setStarFilter(s); setStarDropOpen(false); }}
                  className={`w-full px-4 py-2.5 border-0 text-left cursor-pointer text-sm flex items-center gap-1.5 ${starFilter === s ? "bg-[#c8a84b] text-white font-bold" : "bg-white text-gray-900"}`}
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {s === 0 ? "All stars" : <><FaStar size={12} color={starFilter === s ? "#fff" : "#c8a84b"} /> {s} ★</>}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Sort filter */}
        <div className="relative">
          <button
            onClick={() => { setSortDropOpen((o) => !o); setStarDropOpen(false); }}
            className="flex items-center gap-1.5 px-3.5 py-2 border border-gray-200 rounded-full bg-white cursor-pointer text-sm font-semibold text-gray-900"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M2 4h12M4 8h8M6 12h4" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" /></svg>
            {sortBy === "recent" ? "Most recent" : "Highest rating"}
          </button>
          {sortDropOpen && (
            <div className="absolute top-[calc(100%+6px)] left-0 bg-white border border-gray-200 rounded-xl shadow-xl z-50 min-w-[160px] overflow-hidden">
              {[{ key: "recent", label: "Most recent" }, { key: "highest", label: "Highest rating" }].map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => { setSortBy(opt.key); setSortDropOpen(false); }}
                  className={`w-full px-4 py-2.5 border-0 text-left cursor-pointer text-sm ${sortBy === opt.key ? "bg-[#c8a84b] text-white font-bold" : "bg-white text-gray-900"}`}
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div>
        {filtered.length === 0 && (
          <div className="text-center text-gray-300 py-10 text-sm">इस रेटिंग की कोई समीक्षा नहीं</div>
        )}
        {filtered.map((r) => {
          const liked = likedIds.includes(r.id);
          const likeCount = r.likes + (liked ? 1 : 0);
          const initials = r.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
          return (
            <div key={r.id} className="py-5 border-t border-gray-200">
              <div className="flex gap-3.5 items-start">
                <div className="flex-shrink-0">
                  {r.image ? (
                    <img src={r.image} alt={r.name} className="w-11 h-11 rounded-full object-cover border-2 border-gray-200" loading="lazy" />
                  ) : (
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#2d5a27] to-[#4a8c40] flex items-center justify-center">
                      <span className="text-sm font-bold text-white">{initials}</span>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1 gap-2">
                    <div>
                      <span className="font-bold text-sm text-gray-900">{r.name}</span>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <StarRating rating={r.rating} size={12} />
                        <MdVerified size={14} color="#2d5a27" title="सत्यापित खरीदारी" />
                      </div>
                    </div>
                    <span className="text-xs text-gray-300 flex-shrink-0">{r.date}</span>
                  </div>
                  <div className="text-sm text-gray-500 leading-relaxed">{r.body}</div>
                  <button
                    onClick={() => toggleLike(r.id)}
                    className={`mt-2.5 inline-flex items-center gap-1.5 bg-transparent border border-gray-200 rounded-full px-3 py-1 cursor-pointer text-xs transition-all duration-200 ${liked ? "text-[#2d5a27] font-bold" : "text-gray-400"}`}
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill={liked ? "#2d5a27" : "none"} stroke={liked ? "#2d5a27" : "#888"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" /><path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" /></svg>
                    {likeCount}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function ReviewsSection({reviewPhotos}) {
  return (
    <div id="reviews" className="bg-white">
      <div className="max-w-[1100px] mx-auto px-5">
        <div className="py-13 pb-8">
          <h2 className="text-center text-3xl font-bold mb-6 tracking-tight leading-tight" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
            ग्राहक समीक्षाएं
          </h2>

          {/* Rating Summary */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 flex items-center gap-7 mb-7 flex-wrap">
            <div className="text-center min-w-[100px]">
              <div className="text-5xl font-bold text-[#2d5a27] leading-none" style={{ fontFamily: "'DM Sans', sans-serif" }}>4.62</div>
              <StarRating rating={5} size={18} />
              <div className="text-xs text-gray-300 mt-1.5">ग्राहकों की राय पर आधारित</div>
            </div>
            <div className="flex-1 min-w-[180px]">
              {[5, 4, 3, 2, 1].map((star) => {
                const counts = { 5: 117, 4: 72, 3: 0, 2: 0, 1: 0 };
                const pct = Math.round((counts[star] / 189) * 100);
                return (
                  <div key={star} className="flex items-center gap-2.5 mb-1.5">
                    <span className="text-xs text-gray-500 min-w-[16px]">{star}</span>
                    <FaStar size={11} color="#c8a84b" />
                    <div className="flex-1 bg-gray-100 rounded h-1.5 overflow-hidden">
                      <div className="h-full bg-[#c8a84b] rounded" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-xs text-gray-300 min-w-[28px]">{counts[star]}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ✅ Show only if photos exist */}
          {reviewPhotos && reviewPhotos.length > 0 && (
            <ReviewPhotosSection reviewPhotos={reviewPhotos} />
          )}
          <ReviewListSection />
        </div>
      </div>
    </div>
  );
}
