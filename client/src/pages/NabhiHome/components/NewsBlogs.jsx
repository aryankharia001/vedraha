import React from 'react';
import SectionHeader from './SectionHeader';

// Mock data based on the design
const blogPosts = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=600", // Clean Ayurvedic/Oil dropper style image
    category: "Nabhi Chikitsa",
    author: "Vedraha Wellness",
    date: "22 January 2025",
    title: "The Ancient Science of Nabhi Therapy: Healing from Your Core",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&q=80&w=600", // Herbs, spices, or traditional formulation look
    category: "Daily Rituals",
    author: "Vedraha Wellness",
    date: "21 January 2025",
    title: "How Belly Button Oiling Revitalizes Your Skin and Digestion Daily",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600", // Peaceful wellness/yoga/holistic therapy setting
    category: "Deep Wellness",
    author: "Vedraha Wellness",
    date: "20 January 2025",
    title: "Balancing Your Doshas: Why Nabhi Oils Are the Missing Link",
  }
];

export default function NewsBlogs() {
  return (
    <section 
      className="py-12 md:py-16"
      style={{ 
        backgroundColor: "var(--new-bg-white-color)", 
        fontFamily: "var(--font-new-1)" 
      }}
    >
      <div 
        className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8"
        style={{ 
          backgroundColor: "var(--new-bg-white-color)", 
          fontFamily: "var(--font-new-1)"
        }}
      >
        
        <SectionHeader
          subtitle="News & Blogs"
          heading="Our Latest"
          headingHighlight="News & Blogs"
        />

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8 md:mt-10">
          {blogPosts.map((post, index) => (
            <article 
              key={post.id} 
              className={`group flex-col rounded-2xl overflow-hidden transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_25px_rgba(0,0,0,0.08)] 
                ${index === 2 ? 'hidden md:flex' : 'flex'}`}
              style={{ backgroundColor: "var(--color-white, #ffffff)" }}
            >
              
              {/* Image Box - Fully flush with the card edges */}
              <div className="relative aspect-[16/10] w-full overflow-hidden isolation-auto">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Category Badge tucked in bottom-left */}
                <span 
                  className="absolute bottom-0 left-0 text-white text-xs font-medium px-4 py-1.5 rounded-tr-xl z-10"
                  style={{ backgroundColor: "var(--new-primary-color)" }}
                >
                  {post.category}
                </span>
              </div>

              {/* Text Content Area - Padding applied inside here */}
              <div className="p-5 flex flex-col flex-1">
                {/* Meta details */}
                <div 
                  className="flex items-center gap-2 text-xs mb-2.5 font-medium"
                  style={{ color: "var(--new-para-text)" }}
                >
                  <span>{post.author}</span>
                  <span 
                    className="w-1.5 h-1.5 rounded-full inline-block"
                    style={{ backgroundColor: "var(--new-accent-color)" }}
                  ></span>
                  <span>{post.date}</span>
                </div>

                {/* Title */}
                <h3 
                  className="text-lg font-bold leading-snug mb-4 line-clamp-2 group-hover:opacity-85 transition-opacity"
                  style={{ color: "var(--color-black)" }}
                >
                  {post.title}
                </h3>

                {/* Read More Link */}
                <a 
                  href={`#blog-${post.id}`}
                  className="text-sm font-bold underline underline-offset-4 mt-auto w-fit transition-opacity hover:opacity-80"
                  style={{ color: "var(--new-purple-color)" }}
                >
                  Read More
                </a>
              </div>
              
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}