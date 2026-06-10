import React, { useState, useEffect, useRef, useCallback } from "react";
import SectionHeader from "./SectionHeader";

const testimonialsData = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Verified Kharidaar",
    title: "Sleeplessness Aur Insomnia Ka Best Ayurvedic Ilaj!",
    rating: 5,
    avatar:
      "https://img.magnific.com/free-photo/indian-man-smiling-mockup-psd-cheerful-expression-closeup-portra_53876-143269.jpg?semt=ais_hybrid&w=740&q=80",
    text: "Nabhi-Sleep oil use karne ke baad se mujhe sachi mein bohot gehri aur sukoon ki neend aane lagi hai. Pehle stress aur anxiety ki wajah se raat bhar karwatein badalti rehti thi. Nabhi par sirf thodi si boondein lagane se dimaag ekdum calm ho jata hai!",
  },
  {
    id: 2,
    name: "Ananya Iyer",
    role: "Khush Grahak",
    title: "Sirf 2 Hafte Mein Bloating Aur Indigestion Se Rahat!",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1534339480783-6816b68be29c?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aW5kaWFuJTIwZmFjZXxlbnwwfHwwfHx8MA%3D%3D",
    text: "Nabhi Amrit oil ne mere gut health ko bilkul badal diya hai. Khaana khane ke baad jo pet me bhari-pan aur gas hoti thi, woh ab puri tarah gayab ho chuki hai. Yeh traditional Ayurvedic nabhi therapy sach me jadd se kaam karti hai.",
  },
  {
    id: 3,
    name: "Deepika Nair",
    role: "Regular User",
    title: "Joint Pain Aur Stiffness Ke Liye Sabse Effective!",
    rating: 5,
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnan-77r3i_euBCnMLg-4hZb3AzDIciB1VDw&s",
    text: "Mummy ke ghutno me dard rehta tha aur chalne me stiffness hoti thi. Nabhi Joint care oil jab se unhone lagana shuru kiya hai, unhe mobility me bohot improvement mila hai. Natural hai, safe hai aur bina kisi side effect ke asar dikhata hai.",
  },
  {
    id: 4,
    name: "Kavitha Menon",
    role: "Ayurveda Premi",
    title: "Screen-Time Se Hone Wali Eye Strain Bilkul Khatam!",
    rating: 5,
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK6icTXOAlDbgO4uSi8SGVRM1FNBPRutnboQ&s",
    text: "Lene se pehle mujhe ajeeb laga ki nabhi me oil dalne se aakhon ko kya fayda hoga, par Nabhi Eye oil ke results dekh kar main hairan hoon! Laptop par 9 ghante kaam karne ke baad bhi ab aakhon me jalan ya dryness nahi hoti.",
  },
  {
    id: 5,
    name: "Sunita Rao",
    role: "Niyamit Grahak",
    title: "Complete Kit Meri Family Ki Daily Routine Ka Hissa!",
    rating: 5,
    avatar:
      "https://st2.depositphotos.com/23255830/46761/i/450/depositphotos_467614314-stock-photo-young-asian-indian-boy-looking.jpg",
    text: "Maine Complete Wellness Bundle mangwaya tha. Mere pati Shilajit oil use karte hain energy ke liye, main sleep formula, aur mummy joints ke liye. Ek hi kit se puri family ki overall health improve ho gayi hai. Sachi me total health harmony!",
  },
];

export default function TestimonialCarousel() {
  const [activeIndex, setActiveIndex] = useState(2);
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayIndex, setDisplayIndex] = useState(2);
  const intervalRef = useRef(null);

  const goTo = useCallback(
    (index) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setTimeout(() => {
        setDisplayIndex(index);
        setActiveIndex(index);
        setIsAnimating(false);
      }, 300);
    },
    [isAnimating],
  );

  const handlePrev = useCallback(() => {
    const next =
      activeIndex === 0 ? testimonialsData.length - 1 : activeIndex - 1;
    goTo(next);
  }, [activeIndex, goTo]);

  const handleNext = useCallback(() => {
    const next =
      activeIndex === testimonialsData.length - 1 ? 0 : activeIndex + 1;
    goTo(next);
  }, [activeIndex, goTo]);

  // Auto-slide every 4 seconds
  const resetInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => {
        const next = prev === testimonialsData.length - 1 ? 0 : prev + 1;
        setIsAnimating(true);
        setTimeout(() => {
          setDisplayIndex(next);
          setIsAnimating(false);
        }, 300);
        return next;
      });
    }, 4000);
  }, []);

  useEffect(() => {
    resetInterval();
    return () => clearInterval(intervalRef.current);
  }, [resetInterval]);

  const handleAvatarClick = (index) => {
    resetInterval();
    goTo(index);
  };

  const handleNavClick = (fn) => {
    resetInterval();
    fn();
  };

  const currentTestimonial = testimonialsData[displayIndex];

  return (
    <section
      className="w-full bg-[var(--new-bg-white-color]"
      
    >
      <div className="relative w-full max-w-[1240px] mx-auto px-4 sm:px-6 py-10 md:py-10 flex flex-col items-center select-none overflow-hidden"
      // style={{ backgroundColor: "var(--new-bg-white-color, #fafafa)" }}
      >
        {/* Header */}
      <SectionHeader
                subtitle="Testimonials"
                heading="What Our"
                headingHighlight="Customers Say"
              />

      {/* Progress bar */}
      <div className="w-full max-w-xs mt-6 h-0.5 rounded-full overflow-hidden">
        <div
          key={activeIndex}
          className="h-full bg-gradient-to-r from-[#184b24] to-[#C08A3E] rounded-full"
          style={{
            animation: "progress 4s linear forwards",
          }}
        />
      </div>
      <style>{`
        @keyframes progress {
          from { width: 0% }
          to { width: 100% }
        }
      `}</style>

      {/* Avatar Row */}
      <div className="flex items-center justify-center gap-2 sm:gap-4 md:gap-6 my-8 md:my-12 h-24 md:h-28 w-full max-w-lg md:max-w-xl mx-auto px-2">
        {testimonialsData.map((item, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={item.id}
              onClick={() => handleAvatarClick(idx)}
              className="relative focus:outline-none transition-all duration-500 ease-in-out block"
              style={{
                transform: isActive ? "scale(1.15)" : "scale(0.85)",
                zIndex: isActive ? 10 : 1,
              }}
            >
              <div className="relative rounded-full p-0.5 md:p-1 transition-all duration-500">
                {isActive && (
                  <span className="absolute inset-0 rounded-full border-2 border-dashed border-[#C08A3E] animate-[spin_30s_linear_infinite]" />
                )}
                <img
                  src={item.avatar}
                  alt={item.name}
                  className={`w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full object-cover transition-all duration-500 shadow-sm ${
                    isActive
                      ? "blur-0 opacity-100 ring-4 ring-white ring-offset-0 shadow-md"
                      : "blur-[1.5px] sm:blur-[3px] opacity-40 hover:opacity-70 hover:blur-none"
                  }`}
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Content Card */}
      <div
        className="relative w-full text-center max-w-sm sm:max-w-xl md:max-w-3xl px-4 sm:px-6 md:px-16 min-h-[220px] md:min-h-[200px] flex flex-col justify-between"
        style={{
          opacity: isAnimating ? 0 : 1,
          transform: isAnimating ? "translateY(8px)" : "translateY(0)",
          transition: "opacity 0.3s ease, transform 0.3s ease",
        }}
      >
        <div>
          <h3 className="text-lg md:text-2xl font-bold text-[#111827] mb-3 md:mb-4 tracking-tight">
            {currentTestimonial.title}
          </h3>
          <p className="text-[#202124] text-xs sm:text-sm md:text-base leading-relaxed mb-4 md:mb-6 max-w-2xl mx-auto font-normal">
            "{currentTestimonial.text}"
          </p>
        </div>

        <div>
          {/* Stars */}
          <div className="flex justify-center items-center gap-1 mb-3">
            {[...Array(currentTestimonial.rating)].map((_, i) => (
              <svg
                key={i}
                className="w-4 h-4 md:w-5 md:h-5"
                fill="#F59E0B"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-xs md:text-sm font-bold ml-1.5 text-[#111827]">
              {currentTestimonial.rating.toFixed(1)}
            </span>
          </div>

          {/* Identity */}
          <div>
            <h4 className="font-bold text-sm md:text-base text-[#111827]">
              {currentTestimonial.name}
            </h4>
            <p className="text-[10px] md:text-xs uppercase tracking-wider font-semibold text-[#6B7280] mt-0.5">
              {currentTestimonial.role}
            </p>
          </div>
        </div>
      </div>

      {/* Nav Buttons */}
      <div className="flex items-center justify-center gap-4 mt-8 lg:mt-0 w-full lg:w-auto">
        <button
          onClick={() => handleNavClick(handlePrev)}
          className="relative lg:absolute lg:left-4 xl:left-12 lg:top-1/2 lg:-translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-200 shadow-md hover:scale-105 hover:brightness-105 active:scale-95 z-20"
          style={{ backgroundColor: "var(--color-black)", color: "#ffffff" }}
          aria-label="Previous Testimonial"
        >
          <svg
            className="w-4 h-4 md:w-5 md:h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={() => handleNavClick(handleNext)}
          className="relative lg:absolute lg:right-4 xl:right-12 lg:top-1/2 lg:-translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-200 shadow-md hover:scale-105 hover:brightness-105 active:scale-95 z-20"
          style={{
            backgroundColor: "var(--new-color-primary, #184b24)",
            color: "#ffffff",
          }}
          aria-label="Next Testimonial"
        >
          <svg
            className="w-4 h-4 md:w-5 md:h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
      </div>
    </section>
  );
}
