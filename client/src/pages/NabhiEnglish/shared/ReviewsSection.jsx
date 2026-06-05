// ─────────────────────────────────────────────────────────────────────────────
// ReviewsSection.jsx  –  Unified reviews section
//
// Props (all optional):
//   productId    – scopes backend reviews (required for live data)
//   reviewPhotos – array of image URLs for the photos strip
//   themeColor   – brand accent color (defaults to var(--new-purple-color))
// ─────────────────────────────────────────────────────────────────────────────

import React, { useEffect, useMemo, useState, useCallback } from "react";
import axios from "axios";
import { MdVerified } from "react-icons/md";
import { FaStar, FaRegStar } from "react-icons/fa";
import { StarRating } from "./ui";
import { allReviews, photoReviewers } from "./constants";
import { PRODUCT } from "./constants";
import { backendurl } from "../../../App";

const PAGE_SIZE = 5;
const SORT_OPTIONS = [
  { key: "recent",  label: "Most recent"    },
  { key: "highest", label: "Highest rating" },
  { key: "lowest",  label: "Lowest rating"  },
];

// ─── Tiny helpers ─────────────────────────────────────────────────────────────
const getInitials = (name = "") =>
  name.split(" ").filter(Boolean).map((w) => w[0]).join("").slice(0, 2).toUpperCase() || "?";

const formatDate = (iso) => {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
};

const AVATAR_COLORS = [
  { from: "#bfdbfe", to: "#93c5fd" },
  { from: "#ddd6fe", to: "#c4b5fd" },
  { from: "#fde68a", to: "#fbbf24" },
  { from: "#bbf7d0", to: "#6ee7b7" },
  { from: "#fecaca", to: "#fca5a5" },
];

const Spinner = ({ color = "var(--new-purple-color)" }) => (
  <div className="flex items-center justify-center py-10">
    <span
      className="w-7 h-7 border-2 border-gray-200 rounded-full animate-spin"
      style={{ borderTopColor: color }}
    />
  </div>
);

// ─── StarDisplay ──────────────────────────────────────────────────────────────
function StarDisplay({ rating = 0, size = 12, color = "var(--new-purple-color)" }) {
  return (
    <div className="inline-flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <FaStar key={i} size={size} color={i <= Math.round(rating) ? color : "#e5e7eb"} />
      ))}
    </div>
  );
}

// ─── StarBar (histogram row) ───────────────────────────────────────────────────
function StarBar({ star, count, total, color = "var(--new-purple-color)" }) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div className="flex items-center gap-2 mb-2">
      <span className="text-xs text-gray-500 w-3 text-right">{star}</span>
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((s) =>
          s <= star
            ? <FaStar key={s} size={9} color={color} />
            : <FaRegStar key={s} size={9} color="#d1d5db" />
        )}
      </div>
      <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
      <span className="text-xs text-gray-400 w-8 text-right">{pct}%</span>
    </div>
  );
}

// ─── Interactive star input (form) ────────────────────────────────────────────
function StarInput({ value, onChange, size = 28, color = "var(--new-purple-color)" }) {
  const [hover, setHover] = useState(0);
  const display = hover || value;
  return (
    <div className="inline-flex items-center gap-1.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          onMouseEnter={() => setHover(i)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onChange(i)}
          className="bg-transparent border-0 p-0 cursor-pointer transition-transform hover:scale-110"
          aria-label={`Rate ${i} star${i > 1 ? "s" : ""}`}
        >
          <FaStar size={size} color={i <= display ? color : "#e5e7eb"} />
        </button>
      ))}
    </div>
  );
}

// ─── Write-a-Review Popup Modal ────────────────────────────────────────────────
function ReviewFormModal({ productId, themeColor, onSubmitted, onClose }) {
  const [visible,    setVisible]    = useState(false);
  const [name,       setName]       = useState("");
  const [rating,     setRating]     = useState(0);
  const [title,      setTitle]      = useState("");
  const [body,       setBody]       = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error,      setError]      = useState("");
  const [success,    setSuccess]    = useState(false);

  useEffect(() => {
    const t = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(t);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!name.trim()) { setError("Please enter your name."); return; }
    if (rating < 1)   { setError("Please select a star rating."); return; }
    try {
      setSubmitting(true);
      await axios.post(`${backendurl}/api/reviews`, {
        productId,
        name: name.trim(),
        rating,
        title: title.trim(),
        body: body.trim(),
      });
      setSuccess(true);
      onSubmitted?.();
      setTimeout(handleClose, 1600);
    } catch (err) {
      setError(err?.response?.data?.message || "Could not submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const focusStyle = { outline: "none", borderColor: themeColor };

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-4"
      style={{
        backgroundColor: `rgba(0,0,0,${visible ? 0.55 : 0})`,
        transition: "background-color 0.3s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden"
        style={{
          transform: visible ? "translateY(0) scale(1)" : "translateY(40px) scale(0.97)",
          opacity: visible ? 1 : 0,
          transition: "transform 0.32s cubic-bezier(0.34,1.56,0.64,1), opacity 0.28s ease",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-gray-100"
          style={{ borderTopWidth: 3, borderTopStyle: "solid", borderTopColor: themeColor }}
        >
          <div>
            <h3 className="text-base font-bold text-gray-900 m-0" style={{ fontFamily: "var(--font-new-1)", color: themeColor }}>
              Write a Review
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">Share your honest experience</p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-gray-100 border-0 cursor-pointer flex items-center justify-center text-gray-500 text-lg hover:bg-gray-200 transition-colors"
            aria-label="Close"
          >×</button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {success ? (
            <div className="flex flex-col items-center py-6 gap-3">
              <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl" style={{ background: "#fff7ed" }}>
                🎉
              </div>
              <div className="text-sm font-semibold text-gray-800">Thank you for your review!</div>
              <div className="text-xs text-gray-400">Your feedback helps others make better choices.</div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Your Name *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={80}
                    placeholder="e.g. Priya Sharma"
                    onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                    onBlur={(e) => { e.target.style.borderColor = ""; }}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm transition-colors"
                    style={{ outline: "none" }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Rating *</label>
                  <StarInput value={rating} onChange={setRating} size={24} color={themeColor} />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Review Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength={120}
                  placeholder="Sum up your experience"
                  onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                  onBlur={(e) => { e.target.style.borderColor = ""; }}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm transition-colors"
                  style={{ outline: "none" }}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Your Review</label>
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  maxLength={2000}
                  rows={4}
                  placeholder="What did you like or dislike? How did it work for you?"
                  onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                  onBlur={(e) => { e.target.style.borderColor = ""; }}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm transition-colors resize-y"
                  style={{ outline: "none" }}
                />
              </div>

              {error && (
                <div className="text-xs text-red-500 bg-red-50 rounded-lg px-3 py-2">{error}</div>
              )}

              <div className="flex items-center gap-2 pt-1">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white border-0 cursor-pointer disabled:opacity-60 transition-opacity hover:opacity-90"
                  style={{ background: themeColor, fontFamily: "var(--font-new-1)" }}
                >
                  {submitting ? "Submitting…" : "Submit Review"}
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-600 border border-gray-200 bg-white cursor-pointer hover:bg-gray-50 transition-colors"
                  style={{ fontFamily: "var(--font-new-1)" }}
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

// ─── ReviewPhotosSection ──────────────────────────────────────────────────────
function ReviewPhotosSection({ reviewPhotos, themeColor }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [showAllGrid,   setShowAllGrid]   = useState(false);

  const closeLightbox = () => setLightboxIndex(null);
  const closeGrid     = () => setShowAllGrid(false);

  return (
    <>
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold text-gray-700">Reviews with images</span>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none">
        {reviewPhotos.map((src, i) => {
          const isLast = i === reviewPhotos.length - 1;
          return (
            <div
              key={i}
              onClick={() => (isLast ? setShowAllGrid(true) : setLightboxIndex(i))}
              className="relative flex-shrink-0 w-[80px] h-[80px] rounded-xl overflow-hidden cursor-pointer border border-gray-100 shadow-sm"
            >
              <img src={src} alt={`review ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
              {isLast && (
                <div className="absolute inset-0 bg-black/55 flex items-center justify-center">
                  <span className="text-white font-bold text-sm" style={{ fontFamily: "var(--font-new-1)" }}>+7</span>
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
            <div className="w-[280px] bg-white p-5 overflow-y-auto relative border-l border-gray-100" style={{ maxHeight: "90vh" }}>
              <button onClick={closeLightbox} className="absolute top-3 right-3 w-7 h-7 rounded-full border-0 bg-gray-100 cursor-pointer text-base text-gray-500 flex items-center justify-center">×</button>
              <div className="flex gap-2.5 items-center mb-4 pb-3.5 border-b border-gray-100 pr-8">
                <img src={PRODUCT.image} alt={PRODUCT.name} className="w-10 h-10 rounded-lg object-cover border border-gray-100 flex-shrink-0" />
                <div className="font-bold text-xs text-gray-800 leading-tight">नाभि अमृत – आयुर्वेदिक नाभि तेल</div>
              </div>
              {(() => {
                const reviewer = photoReviewers[lightboxIndex] ?? photoReviewers[0];
                return (
                  <>
                    <div className="flex items-center gap-2.5 mb-2.5">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: themeColor }}>
                        <span className="text-sm font-bold text-white">{reviewer.initials}</span>
                      </div>
                      <span className="font-bold text-sm text-gray-800">{reviewer.name}</span>
                    </div>
                    <div className="text-sm text-gray-500 leading-relaxed mb-3">{reviewer.body}</div>
                    <StarRating rating={reviewer.rating} size={14} />
                    <div className="mt-2.5 flex items-center gap-1.5 mb-5">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" />
                        <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                      </svg>
                      <span className="text-xs text-gray-400">{reviewer.likes}</span>
                    </div>
                  </>
                );
              })()}
              <button
                onClick={() => { closeLightbox(); setShowAllGrid(true); }}
                className="w-full py-2.5 bg-gray-50 border border-gray-200 rounded-xl cursor-pointer text-sm font-semibold text-gray-700"
                style={{ fontFamily: "var(--font-new-1)" }}
              >← View all images</button>
            </div>
          </div>
        </div>
      )}

      {/* Grid modal */}
      {showAllGrid && (
        <div onClick={closeGrid} className="fixed inset-0 bg-black/80 z-[9999] overflow-y-auto">
          <div onClick={(e) => e.stopPropagation()} className="bg-white max-w-[1160px] mx-auto min-h-screen px-6 py-5 pb-12 relative">
            <div className="flex items-center gap-3 mb-5 pb-3.5 border-b border-gray-100">
              <button onClick={closeGrid} className="flex items-center gap-1.5 bg-transparent border-0 cursor-pointer text-sm font-semibold text-gray-800">← View all images</button>
              <button onClick={closeGrid} className="ml-auto w-8 h-8 rounded-full border-0 bg-gray-100 cursor-pointer flex items-center justify-center text-lg text-gray-500">×</button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {reviewPhotos.map((src, i) => (
                <div key={i} onClick={() => { closeGrid(); setLightboxIndex(i); }} className="cursor-pointer rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
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

// ─── Backend ReviewCard ────────────────────────────────────────────────────────
function BackendReviewCard({ review, themeColor }) {
  const color = AVATAR_COLORS[(review._id?.charCodeAt(0) ?? 0) % AVATAR_COLORS.length];
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-3 transition-shadow hover:shadow-md">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-gray-700"
            style={{ background: `linear-gradient(135deg, ${color.from}, ${color.to})` }}>
            {getInitials(review.name)}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-sm text-gray-900">{review.name}</span>
                {review.verified && <MdVerified size={13} color={themeColor} title="Verified" />}
              </div>
              <div className="text-xs text-gray-400 mt-0.5">{formatDate(review.createdAt)}</div>
            </div>
            <StarDisplay rating={review.rating} size={12} color={themeColor} />
          </div>
          {review.title && <div className="text-sm font-semibold text-gray-800 mt-1.5">{review.title}</div>}
          {review.body  && <p className="text-sm text-gray-500 leading-relaxed mt-1 whitespace-pre-line">{review.body}</p>}
          {Array.isArray(review.photos) && review.photos.length > 0 && (
            <div className="flex gap-2 mt-3 flex-wrap">
              {review.photos.map((src, i) => (
                <a key={i} href={src} target="_blank" rel="noopener noreferrer" className="block w-14 h-14 rounded-lg overflow-hidden border border-gray-100">
                  <img src={src} alt={`review photo ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Local ReviewCard ─────────────────────────────────────────────────────────
function LocalReviewCard({ r, liked, onToggleLike, themeColor }) {
  const likeCount = r.likes + (liked ? 1 : 0);
  const color = AVATAR_COLORS[r.id % AVATAR_COLORS.length];
  const inits = r.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-3 transition-shadow hover:shadow-md">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          {r.image ? (
            <img src={r.image} alt={r.name} className="w-10 h-10 rounded-full object-cover border border-gray-100" loading="lazy" />
          ) : (
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-gray-700"
              style={{ background: `linear-gradient(135deg, ${color.from}, ${color.to})` }}>
              {inits}
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-sm text-gray-900">{r.name}</span>
                <MdVerified size={13} color={themeColor} title="Verified Purchase" />
              </div>
              <div className="text-xs text-gray-400 mt-0.5">{r.date}</div>
            </div>
            <StarDisplay rating={r.rating} size={12} color={themeColor} />
          </div>
          <p className="text-sm text-gray-500 leading-relaxed mt-2">{r.body}</p>
          <button
            onClick={() => onToggleLike(r.id)}
            className="mt-3 inline-flex items-center gap-1.5 bg-transparent border border-gray-200 rounded-full px-3 py-1 cursor-pointer text-xs transition-all duration-200"
            style={liked ? { color: themeColor, borderColor: themeColor, fontWeight: 600 } : { color: "#9ca3af" }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24"
              fill={liked ? themeColor : "none"}
              stroke={liked ? themeColor : "#9ca3af"}
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" />
              <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
            </svg>
            {likeCount}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Pagination ────────────────────────────────────────────────────────────────
function Pagination({ page, totalPages, onChange, themeColor }) {
  if (totalPages <= 1) return null;
  const pages = useMemo(() => {
    const out = new Set([1, totalPages, page, page - 1, page + 1]);
    return [...out].filter((p) => p >= 1 && p <= totalPages).sort((a, b) => a - b);
  }, [page, totalPages]);

  return (
    <div className="flex items-center justify-center gap-1.5 mt-6 flex-wrap">
      <button type="button" onClick={() => onChange(page - 1)} disabled={page <= 1}
        className="px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-sm font-semibold text-gray-700 disabled:opacity-40 cursor-pointer">
        ‹ Prev
      </button>
      {pages.map((p, idx) => {
        const prev = pages[idx - 1];
        const gap  = prev !== undefined && p - prev > 1;
        return (
          <React.Fragment key={p}>
            {gap && <span className="px-1 text-gray-400 text-sm">…</span>}
            <button type="button" onClick={() => onChange(p)}
              className="min-w-[36px] h-9 rounded-lg border text-sm font-semibold cursor-pointer transition-colors"
              style={p === page
                ? { background: themeColor, color: "#fff", borderColor: themeColor }
                : { background: "#fff", color: "#374151", borderColor: "#e5e7eb" }}>
              {p}
            </button>
          </React.Fragment>
        );
      })}
      <button type="button" onClick={() => onChange(page + 1)} disabled={page >= totalPages}
        className="px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-sm font-semibold text-gray-700 disabled:opacity-40 cursor-pointer">
        Next ›
      </button>
    </div>
  );
}

// ─── RatingSummary ─────────────────────────────────────────────────────────────
function RatingSummary({ summary, summaryLoading, staticCounts, staticTotal, themeColor }) {
  const total  = summary?.total  ?? staticTotal;
  const avg    = summary?.avg    ?? (staticTotal > 0 ? 4.62 : 0);
  const counts = summary?.counts ?? staticCounts;

  if (summaryLoading) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-5">
        <Spinner color={themeColor} />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-5">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-4xl font-bold" style={{ fontFamily: "var(--font-new-1)", color: themeColor }}>
          {total > 0 ? avg.toFixed(1) : "—"}
        </span>
        <div>
          <StarDisplay rating={avg} size={15} color={themeColor} />
          <div className="text-xs text-gray-400 mt-0.5">
            {total > 0 ? `${total} review${total === 1 ? "" : "s"}` : "No reviews yet"}
          </div>
        </div>
      </div>
      <div>
        {[5, 4, 3, 2, 1].map((star) => (
          <StarBar key={star} star={star} count={counts[star] ?? 0} total={total} color={themeColor} />
        ))}
      </div>
    </div>
  );
}

// ─── Filter + Sort dropdowns ───────────────────────────────────────────────────
function FilterBar({ starFilter, setStarFilter, sortBy, setSortBy, themeColor, showLowSort = false }) {
  const [starDropOpen, setStarDropOpen] = useState(false);
  const [sortDropOpen, setSortDropOpen] = useState(false);

  const sortOptions = showLowSort
    ? SORT_OPTIONS
    : SORT_OPTIONS.filter((o) => o.key !== "lowest");

  return (
    <div className="flex gap-2 flex-wrap">
      {/* Star filter */}
      <div className="relative">
        <button
          onClick={() => { setStarDropOpen((o) => !o); setSortDropOpen(false); }}
          className="flex items-center gap-1.5 px-3.5 py-2 border border-gray-200 rounded-full bg-white cursor-pointer text-sm font-medium text-gray-700 shadow-sm transition-colors"
          style={{ fontFamily: "var(--font-new-1)" }}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = themeColor}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = ""}
        >
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
            <line x1="2" y1="5" x2="14" y2="5" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="4" y1="9" x2="12" y2="9" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="6" y1="13" x2="10" y2="13" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          {starFilter === 0 ? "Rating" : `${starFilter} ★`}
        </button>
        {starDropOpen && (
          <div className="absolute top-[calc(100%+6px)] left-0 bg-white border border-gray-100 rounded-xl shadow-xl z-50 min-w-[140px] overflow-hidden">
            {[0, 5, 4, 3, 2, 1].map((s) => (
              <button key={s}
                onClick={() => { setStarFilter(s); setStarDropOpen(false); }}
                className="w-full px-4 py-2.5 border-0 text-left cursor-pointer text-sm flex items-center gap-1.5 transition-colors"
                style={starFilter === s
                  ? { background: themeColor, color: "#fff", fontWeight: 700 }
                  : { background: "#fff", color: "#374151" }}
                onMouseEnter={(e) => { if (starFilter !== s) e.currentTarget.style.background = "#f9fafb"; }}
                onMouseLeave={(e) => { if (starFilter !== s) e.currentTarget.style.background = "#fff"; }}
              >
                {s === 0 ? "All stars" : <><FaStar size={11} color={starFilter === s ? "#fff" : themeColor} /> {s} ★</>}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Sort */}
      <div className="relative">
        <button
          onClick={() => { setSortDropOpen((o) => !o); setStarDropOpen(false); }}
          className="flex items-center gap-1.5 px-3.5 py-2 border border-gray-200 rounded-full bg-white cursor-pointer text-sm font-medium text-gray-700 shadow-sm transition-colors"
          style={{ fontFamily: "var(--font-new-1)" }}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = themeColor}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = ""}
        >
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
            <path d="M2 4h12M4 8h8M6 12h4" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          {sortOptions.find((o) => o.key === sortBy)?.label ?? "Sort"}
        </button>
        {sortDropOpen && (
          <div className="absolute top-[calc(100%+6px)] left-0 bg-white border border-gray-100 rounded-xl shadow-xl z-50 min-w-[180px] overflow-hidden">
            {sortOptions.map((opt) => (
              <button key={opt.key}
                onClick={() => { setSortBy(opt.key); setSortDropOpen(false); }}
                className="w-full px-4 py-2.5 border-0 text-left cursor-pointer text-sm transition-colors"
                style={sortBy === opt.key
                  ? { background: themeColor, color: "#fff", fontWeight: 700 }
                  : { background: "#fff", color: "#374151" }}
                onMouseEnter={(e) => { if (sortBy !== opt.key) e.currentTarget.style.background = "#f9fafb"; }}
                onMouseLeave={(e) => { if (sortBy !== opt.key) e.currentTarget.style.background = "#fff"; }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── LocalReviewListSection ────────────────────────────────────────────────────
function LocalReviewListSection({ themeColor, starFilter, setStarFilter, sortBy, setSortBy }) {
  const [likedIds, setLikedIds] = useState([]);

  const parseDate = (d) => {
    const [m, day, y] = d.split("/");
    return new Date(`${y}-${m}-${day}`);
  };

  const filtered = allReviews
    .filter((r) => starFilter === 0 || r.rating === starFilter)
    .sort((a, b) => (sortBy === "highest" ? b.rating - a.rating : parseDate(b.date) - parseDate(a.date)));

  const toggleLike = (id) =>
    setLikedIds((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  return (
    <div>
      {filtered.length === 0 && (
        <div className="text-center text-gray-300 py-10 text-sm">No reviews for this rating</div>
      )}
      {filtered.map((r) => (
        <LocalReviewCard key={r.id} r={r} liked={likedIds.includes(r.id)} onToggleLike={toggleLike} themeColor={themeColor} />
      ))}
    </div>
  );
}

// ─── BackendReviewListSection ──────────────────────────────────────────────────
function BackendReviewListSection({ productId, refreshKey, themeColor, starFilter, setStarFilter, sortBy, setSortBy }) {
  const [reviews,        setReviews]        = useState([]);
  const [pagination,     setPagination]     = useState({ page: 1, totalPages: 1, total: 0 });
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [page,           setPage]           = useState(1);

  const fetchReviews = useCallback(async (targetPage = 1) => {
    if (!productId) return;
    setReviewsLoading(true);
    try {
      const params = { productId, page: targetPage, limit: PAGE_SIZE, sort: sortBy };
      if (starFilter > 0) params.rating = starFilter;
      const res = await axios.get(`${backendurl}/api/reviews`, { params });
      if (res.data?.success) {
        setReviews(res.data.data || []);
        setPagination(res.data.pagination || { page: 1, totalPages: 1, total: 0 });
      }
    } catch (err) {
      console.error("reviews fetch error:", err);
    } finally {
      setReviewsLoading(false);
    }
  }, [productId, sortBy, starFilter]);

  useEffect(() => { fetchReviews(page); }, [fetchReviews, page, refreshKey]);
  useEffect(() => { setPage(1); }, [starFilter, sortBy, productId]);

  return (
    <div>
      {reviewsLoading ? (
        <Spinner color={themeColor} />
      ) : reviews.length === 0 ? (
        <div className="text-center text-gray-400 py-10 text-sm">
          {pagination.total === 0 ? "Be the first to review this product." : "No reviews for this filter."}
        </div>
      ) : (
        reviews.map((r) => <BackendReviewCard key={r._id} review={r} themeColor={themeColor} />)
      )}
      <Pagination
        page={pagination.page}
        totalPages={pagination.totalPages}
        themeColor={themeColor}
        onChange={(p) => {
          setPage(p);
          document.getElementById("reviews")?.scrollIntoView({ behavior: "smooth", block: "start" });
        }}
      />
    </div>
  );
}

// ─── Main export ───────────────────────────────────────────────────────────────
export default function ReviewsSection({
  productId: productIdProp,
  reviewPhotos,
  themeColor: themeColorProp,
}) {
  const themeColor = themeColorProp || "var(--new-purple-color)";
  const productId  = productIdProp || PRODUCT?._id || PRODUCT?.id || PRODUCT?.productId || null;

  const STATIC_COUNTS = { 5: 117, 4: 72, 3: 0, 2: 0, 1: 0 };
  const STATIC_TOTAL  = Object.values(STATIC_COUNTS).reduce((a, b) => a + b, 0);

  const [showForm,       setShowForm]       = useState(false);
  const [summary,        setSummary]        = useState(null);
  const [summaryLoading, setSummaryLoading] = useState(!!productId);
  const [refreshKey,     setRefreshKey]     = useState(0);

  // ── Shared filter state lifted here so FilterBar sits in the heading row ──
  const [starFilter, setStarFilter] = useState(0);
  const [sortBy,     setSortBy]     = useState("recent");

  useEffect(() => {
    if (!productId) return;
    let cancelled = false;
    setSummaryLoading(true);
    axios
      .get(`${backendurl}/api/reviews/summary`, { params: { productId } })
      .then((res) => { if (!cancelled && res.data?.success) setSummary(res.data.data); })
      .catch((err) => console.error("summary error:", err))
      .finally(() => { if (!cancelled) setSummaryLoading(false); });
    return () => { cancelled = true; };
  }, [productId]);

  const handleReviewSubmitted = () => {
    if (productId) {
      axios
        .get(`${backendurl}/api/reviews/summary`, { params: { productId } })
        .then((res) => { if (res.data?.success) setSummary(res.data.data); })
        .catch(() => {});
    }
    setRefreshKey((k) => k + 1);
  };

  return (
    <div id="reviews" className="bg-[var(--new-bg-white-color)] py-14">
      <div className="max-w-[1100px] mx-auto px-5">

        {/* ── Centered heading ── */}
        <h2
          className="text-[24px] font-semibold leading-tight sm:text-[28px] md:text-[34px] text-center mb-20 text-black"
          style={{ fontFamily: "var(--font-new-1)" }}
        >
          Customer{" "}
          <span
            className="font-medium text-[26px] sm:text-[30px] md:text-[36px] italic"
            style={{ fontFamily: "var(--font-new-2)", color: themeColor }}
          >
            Reviews
          </span>
        </h2>

        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* ── LEFT ── */}
          <div className="w-full lg:w-[300px] flex-shrink-0">
            <h3 className="text-lg font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-new-1)" }}>
              Average Rating
            </h3>

            <RatingSummary
              summary={summary}
              summaryLoading={summaryLoading}
              staticCounts={STATIC_COUNTS}
              staticTotal={STATIC_TOTAL}
              themeColor={themeColor}
            />

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="font-bold text-sm text-gray-900 mb-1.5" style={{ fontFamily: "var(--font-new-1)" }}>
                Write your Review
              </div>
              <p className="text-xs text-gray-400 leading-relaxed mb-4">
                Share your feedback and help create a better shopping experience for everyone.
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="w-full py-2.5 rounded-xl text-white text-sm font-semibold cursor-pointer border-0 transition-opacity hover:opacity-90"
                style={{ background: themeColor, fontFamily: "var(--font-new-1)" }}
              >
                Submit Reviews
              </button>
            </div>
          </div>

          {/* ── RIGHT ── */}
          <div className="flex-1 min-w-0">
            {/* Heading row: title + filter bar side by side */}
            <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
              <h3 className="text-lg font-bold text-gray-900 shrink-0" style={{ fontFamily: "var(--font-new-1)" }}>
                Customer Feedback
              </h3>
              <FilterBar
                starFilter={starFilter} setStarFilter={setStarFilter}
                sortBy={sortBy} setSortBy={setSortBy}
                themeColor={themeColor}
                showLowSort={!!productId}
              />
            </div>

            {productId ? (
              <BackendReviewListSection
                productId={productId}
                refreshKey={refreshKey}
                themeColor={themeColor}
                starFilter={starFilter}
                setStarFilter={setStarFilter}
                sortBy={sortBy}
                setSortBy={setSortBy}
              />
            ) : (
              <LocalReviewListSection
                themeColor={themeColor}
                starFilter={starFilter}
                setStarFilter={setStarFilter}
                sortBy={sortBy}
                setSortBy={setSortBy}
              />
            )}
          </div>
        </div>
      </div>

      {showForm && (
        <ReviewFormModal
          productId={productId}
          themeColor={themeColor}
          onSubmitted={handleReviewSubmitted}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}