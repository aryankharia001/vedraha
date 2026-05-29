import React, { useState, useEffect, useRef, useCallback } from 'react';

const testimonialsData = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Khush Grahak",
    title: "Maine Apni Skin Ke Liye Sabse Acha Cheez Use Ki!",
    rating: 5,
    avatar: "https://img.magnific.com/free-photo/indian-man-smiling-mockup-psd-cheerful-expression-closeup-portra_53876-143269.jpg?semt=ais_hybrid&w=740&q=80",
    text: "Yeh product use karne ke baad meri skin ekdum chamakne lagi. Pehle bahut problems thi — dryness, dullness — sab kuch theek ho gaya. Main bilkul satisfied hoon aur apni saari saheli ko recommend kar rahi hoon!"
  },
  {
    id: 2,
    name: "Ananya Iyer",
    role: "Verified Kharidaar",
    title: "Sirf 2 Hafte Mein Zabardast Farq!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1534339480783-6816b68be29c?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aW5kaWFuJTIwZmFjZXxlbnwwfHwwfHx8MA%3D%3D",
    text: "Sach mein agar koi natural aur effective solution chahiye toh yeh products try karein. Meri skin ab kaafi soft aur nourished lagti hai. Price bhi bahut reasonable hai quality ke hisaab se. Bahut khushi hui!"
  },
  {
    id: 3,
    name: "Deepika Nair",
    role: "Skincare Premi",
    title: "Meri Skin Itni Bright Kabhi Nahi Thi!",
    rating: 5,
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnan-77r3i_euBCnMLg-4hZb3AzDIciB1VDw&s",
    text: "Ayurvedic ingredients ka combination really kaam karta hai. Mujhe darr tha ki koi reaction hoga — lekin ekdum safe aur soothing raha. Roz raat lagati hoon aur subah skin bilkul fresh dikhti hai. Thank you!"
  },
  {
    id: 4,
    name: "Kavitha Menon",
    role: "Niyamit Grahak",
    title: "Gentle Formula Jo Actually Kaam Karta Hai",
    rating: 5,
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK6icTXOAlDbgO4uSi8SGVRM1FNBPRutnboQ&s",
    text: "Meri sensitive skin ke liye yeh bilkul perfect hai. Koi irritation nahi, koi chemicals ka feel nahi — bas pure goodness. Nabhi therapy concept ne mujhe pehle ajeeb laga, par results dekh ke main convert ho gayi hoon!"
  },
  {
    id: 5,
    name: "Sunita Rao",
    role: "Roz Use Kaarne Wali",
    title: "Meri Daily Routine Ka Ek Zaroori Hissa!",
    rating: 5,
    avatar: "https://st2.depositphotos.com/23255830/46761/i/450/depositphotos_467614314-stock-photo-young-asian-indian-boy-looking.jpg",
    text: "Packaging se leke product quality tak — sab kuch top-notch hai. Delivery bhi bahut fast thi. Ek baar use kiya toh repeat order karna hi tha. Mere pati bhi pooch rahe hain ki meri skin itni achhi kyun lag rahi hai!"
  }
];

export default function TestimonialCarousel() {
  const [activeIndex, setActiveIndex] = useState(2);
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayIndex, setDisplayIndex] = useState(2);
  const intervalRef = useRef(null);

  const goTo = useCallback((index) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setDisplayIndex(index);
      setActiveIndex(index);
      setIsAnimating(false);
    }, 300);
  }, [isAnimating]);

  const handlePrev = useCallback(() => {
    const next = activeIndex === 0 ? testimonialsData.length - 1 : activeIndex - 1;
    goTo(next);
  }, [activeIndex, goTo]);

  const handleNext = useCallback(() => {
    const next = activeIndex === testimonialsData.length - 1 ? 0 : activeIndex + 1;
    goTo(next);
  }, [activeIndex, goTo]);

  // Auto-slide every 4 seconds
  const resetInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveIndex(prev => {
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
      className="relative w-full max-w-[1240px] mx-auto px-4 sm:px-6 py-10 md:py-10 flex flex-col items-center select-none overflow-hidden"
      style={{ backgroundColor: 'var(--color-white, #ffffff)' }}
    >
      {/* Header */}
      <div className="flex flex-col items-center mb-2 md:mb-4 text-center">
        <span className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--color-primary-tint, #2a7048)' }}>
          Testimonials
        </span>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
          <span style={{ color: 'var(--color-heading, #111827)' }}>What Our </span>
          <span className="bg-gradient-to-r from-[#C08A3E] to-[#d4a55a] bg-clip-text text-transparent">
            Customers Say
          </span>
        </h2>
        <div className="mt-4 mx-auto w-20 h-1 bg-gradient-to-r from-[#184b24] to-[#C08A3E] rounded-full" />
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-xs mt-6 h-0.5 bg-slate-100 rounded-full overflow-hidden">
        <div
          key={activeIndex}
          className="h-full bg-gradient-to-r from-[#184b24] to-[#C08A3E] rounded-full"
          style={{
            animation: 'progress 4s linear forwards',
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
                transform: isActive ? 'scale(1.15)' : 'scale(0.85)',
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
                      ? 'blur-0 opacity-100 ring-4 ring-white ring-offset-0 shadow-md'
                      : 'blur-[1.5px] sm:blur-[3px] opacity-40 hover:opacity-70 hover:blur-none'
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
          transform: isAnimating ? 'translateY(8px)' : 'translateY(0)',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
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
              <svg key={i} className="w-4 h-4 md:w-5 md:h-5" fill="#F59E0B" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-xs md:text-sm font-bold ml-1.5 text-[#111827]">
              {currentTestimonial.rating.toFixed(1)}
            </span>
          </div>

          {/* Identity */}
          <div>
            <h4 className="font-bold text-sm md:text-base text-[#111827]">{currentTestimonial.name}</h4>
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
          style={{ backgroundColor: '#C08A3E', color: '#ffffff' }}
          aria-label="Previous Testimonial"
        >
          <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={() => handleNavClick(handleNext)}
          className="relative lg:absolute lg:right-4 xl:right-12 lg:top-1/2 lg:-translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-200 shadow-md hover:scale-105 hover:brightness-105 active:scale-95 z-20"
          style={{ backgroundColor: 'var(--color-primary, #184b24)', color: '#ffffff' }}
          aria-label="Next Testimonial"
        >
          <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}