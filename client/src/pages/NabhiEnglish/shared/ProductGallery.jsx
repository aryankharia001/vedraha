/**
 * ProductGallery.jsx  — shared/ProductGallery.jsx
 *
 * Accepts `images` and `themeColor` as props instead of importing
 * from constants directly. Drop-in for every product page.
 *
 * Props:
 *   images      — same format as before: string | { type:"video", src, poster }
 *   themeColor  — hex color string, default "#2d5a27"
 */

import { useState, useEffect, useRef } from "react";
import { BsChevronDown } from "react-icons/bs";
import React from "react";

export default function ProductGallery({ images = [], themeColor = "#2d5a27", onPauseChange }) {
  const [activeImage, setActiveImage]     = useState(0);
  const [isCarouselPaused, setCarouselPaused] = useState(false);
  const intervalRef           = useRef(null);
  const videoRef              = useRef(null);
  const videoAdvancedRef      = useRef(false);

  const videoIndex = images.findIndex((img) => typeof img === "object" && img.type === "video");

  useEffect(() => {
    clearInterval(intervalRef.current);
    if (isCarouselPaused || activeImage === videoIndex) return;
    intervalRef.current = setInterval(() => {
      setActiveImage((p) => (p + 1) % images.length);
    }, 3000);
    return () => clearInterval(intervalRef.current);
  }, [isCarouselPaused, activeImage, images.length, videoIndex]);

  const handlePause = (v) => {
    setCarouselPaused(v);
    onPauseChange?.(v);
  };

  return (
    <div
      className="md:sticky md:top-20 md:self-start"
      onMouseEnter={() => handlePause(true)}
      onMouseLeave={() => handlePause(false)}
    >
      {/* Main viewer */}
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 relative aspect-square">
        {images.map((img, i) => {
          const isVideo = typeof img === "object" && img.type === "video";
          const mediaStyle = {
            position: "absolute",
            top: 0, left: 0, width: "100%", height: "100%",
            objectFit: "cover",
            transition: "transform 0.5s ease, opacity 0.5s ease",
            transform: i === activeImage ? "translateX(0%)" : i < activeImage ? "translateX(-100%)" : "translateX(100%)",
            opacity: i === activeImage ? 1 : 0,
            zIndex: i === activeImage ? 1 : 0,
            borderRadius: 16,
          };

          if (isVideo) {
            return (
              <video
                key={i}
                src={img.src}
                poster={img.poster}
                muted
                playsInline
                loop={false}
                style={mediaStyle}
                ref={(el) => {
                  videoRef.current = el;
                  if (el && i === activeImage) {
                    videoAdvancedRef.current = false;
                    el.currentTime = 0;
                    el.play().catch(() => {});
                  }
                }}
                onTimeUpdate={(e) => {
                  if (!videoAdvancedRef.current && e.target.currentTime >= 8) {
                    videoAdvancedRef.current = true;
                    e.target.pause();
                    setActiveImage((p) => (p + 1) % images.length);
                  }
                }}
              />
            );
          }

          return <img key={i} src={img} alt={`Product view ${i + 1}`} style={mediaStyle} />;
        })}

        {/* Nav arrows */}
        <button
          onClick={() => setActiveImage((p) => (p - 1 + images.length) % images.length)}
          className="absolute left-2.5 top-1/2 -translate-y-1/2 bg-white/85 border-0 rounded-full w-9 h-9 flex items-center justify-center cursor-pointer z-10"
        >
          <BsChevronDown size={16} color={themeColor} style={{ transform: "rotate(90deg)" }} />
        </button>
        <button
          onClick={() => setActiveImage((p) => (p + 1) % images.length)}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-white/85 border-0 rounded-full w-9 h-9 flex items-center justify-center cursor-pointer z-10"
        >
          <BsChevronDown size={16} color={themeColor} style={{ transform: "rotate(-90deg)" }} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {images.map((_, i) => (
            <div
              key={i}
              onClick={() => setActiveImage(i)}
              className="h-2 rounded-full cursor-pointer border border-white/50 transition-all duration-300"
              style={{ width: i === activeImage ? 20 : 8, background: i === activeImage ? themeColor : "rgba(255,255,255,0.7)" }}
            />
          ))}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 mt-2.5 overflow-x-auto pb-1 scrollbar-none">
        {images.map((img, i) => {
          const isVideo = typeof img === "object" && img.type === "video";
          const borderStyle = { border: activeImage === i ? `2.5px solid ${themeColor}` : "2px solid #ebe9e2" };
          return isVideo ? (
            <video
              key={i}
              src={img.src}
              poster={img.poster}
              muted
              className="flex-shrink-0 w-[62px] h-[62px] object-cover rounded-xl cursor-pointer"
              style={borderStyle}
              onClick={() => setActiveImage(i)}
            />
          ) : (
            <img
              key={i}
              src={img}
              alt={`Thumbnail ${i + 1}`}
              onClick={() => setActiveImage(i)}
              className="flex-shrink-0 w-[62px] h-[62px] object-cover rounded-xl cursor-pointer"
              style={borderStyle}
            />
          );
        })}
      </div>
    </div>
  );
}