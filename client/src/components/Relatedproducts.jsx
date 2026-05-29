import React from "react";
import { Link } from "react-router-dom";
import { TbTruckDelivery } from "react-icons/tb";
import { FaMoneyBillWave } from "react-icons/fa";
import { IoHeadset } from "react-icons/io5";

// Individual Product Card
const ProductCard = ({ image, title, price, originalPrice, discount, badge, rating, url }) => {
  return (
    <Link to={url} className="group bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 w-full block overflow-hidden">
      <div className="flex flex-col">
        {/* Product Image Area */}
        <div className="relative bg-gray-50">
          {/* Discount Badge - Top Left */}
          {discount && (
            <span className="absolute top-2 left-2 bg-green-800 text-white text-xs px-2 py-0.5 rounded-sm z-10 font-semibold uppercase tracking-wide">
              {discount}
            </span>
          )}

          {/* Action Icons - Top Right, stacked vertically (visible on hover) */}
          <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition duration-300 z-10">
            <button className="bg-white p-1.5 rounded-full hover:bg-gray-100 hover:scale-110 transition-all duration-200 shadow-sm" title="Add to Wishlist">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            <button className="bg-white p-1.5 rounded-full hover:bg-gray-100 hover:scale-110 transition-all duration-200 shadow-sm" title="Compare">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            </button>
            <button className="bg-white p-1.5 rounded-full hover:bg-gray-100 hover:scale-110 transition-all duration-200 shadow-sm" title="Add to Cart">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </button>
          </div>

          {/* Product Image - Rounded */}
          <div className="w-full aspect-square overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-contain p-3 rounded-2xl"
            />
          </div>
        </div>

        {/* Product Info - Below Image */}
        <div className="p-3 bg-white">
          {/* Category */}
          {badge && (
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1 font-normal" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {badge}
            </p>
          )}

          {/* Rating */}
          {rating && (
            <div className="flex items-center gap-1 mb-1">
              <svg className="w-4 h-4 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm font-medium text-gray-800" style={{ fontFamily: "'DM Sans', sans-serif" }}>{rating}</span>
            </div>
          )}

          {/* Product Name */}
          <h3 className="text-sm font-medium line-clamp-2 mb-2 leading-tight text-gray-900" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {title}
          </h3>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-gray-900" style={{ fontFamily: "'DM Sans', sans-serif" }}>₹{price}</span>
            {originalPrice && (
              <span className="text-sm text-gray-400 line-through font-normal" style={{ fontFamily: "'DM Sans', sans-serif" }}>₹{originalPrice}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

// Main Related Products Component
const RelatedProducts = ({ products }) => {
  return (
    <div className="px-4 py-8 cursor-pointer">
      <h2 className="text-2xl font-medium mb-6 text-gray-900" style={{ fontFamily: "'DM Sans', sans-serif" }}>You may also like</h2>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
        {products.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>

      {/* Three Icons Below Product Grid */}
<div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10 lg:gap-16 mt-6 pt-6 border-t border-gray-200">

  {/* Free Shipping */}
  <div className="flex items-center gap-3 w-full sm:w-auto">
    <svg className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 flex-shrink-0" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="44" height="44" rx="8" fill="#f5f0e0"/>
      <path d="M10 17L22 13L34 17V29L22 33L10 29Z" fill="#e8e0c0" stroke="#4a5e1a" strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M10 17L22 21L34 17" stroke="#4a5e1a" strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M22 21V33" stroke="#4a5e1a" strokeWidth="1.8"/>
      <path d="M16 14.5L28 18.5" stroke="#4a5e1a" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
    <div>
      <p className="text-sm sm:text-base lg:text-lg font-bold text-gray-900" style={{ fontFamily: "'DM Sans', sans-serif" }}>Free Shipping</p>
      <p className="text-xs sm:text-sm text-gray-500" style={{ fontFamily: "'DM Sans', sans-serif" }}>Free shipping for order above $50</p>
    </div>
  </div>

  {/* Divider — horizontal on mobile, vertical on desktop */}
  <div className="w-full h-px sm:w-px sm:h-10 bg-gray-200 flex-shrink-0" />

  {/* Flexible Payment */}
  <div className="flex items-center gap-3 w-full sm:w-auto">
    <svg className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 flex-shrink-0" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="44" height="44" rx="8" fill="#f5f0e0"/>
      <rect x="8" y="14" width="28" height="20" rx="4" fill="#e8e0c0" stroke="#4a5e1a" strokeWidth="1.8"/>
      <path d="M8 20H36" stroke="#4a5e1a" strokeWidth="1.8"/>
      <circle cx="29" cy="27" r="2.5" fill="#4a5e1a"/>
      <path d="M24 14V11C24 10 25 9 26 9H30C31 9 32 10 32 11V14" stroke="#4a5e1a" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
    <div>
      <p className="text-sm sm:text-base lg:text-lg font-bold text-gray-900" style={{ fontFamily: "'DM Sans', sans-serif" }}>Flexible Payment</p>
      <p className="text-xs sm:text-sm text-gray-500" style={{ fontFamily: "'DM Sans', sans-serif" }}>Multiple secure payment options</p>
    </div>
  </div>

  {/* Divider */}
  <div className="w-full h-px sm:w-px sm:h-10 bg-gray-200 flex-shrink-0" />

  {/* 24×7 Support */}
  <div className="flex items-center gap-3 w-full sm:w-auto">
    <svg className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 flex-shrink-0" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="44" height="44" rx="8" fill="#f5f0e0"/>
      <path d="M12 24C12 17.373 16.925 12 22 12C27.075 12 32 17.373 32 24" stroke="#4a5e1a" strokeWidth="1.8" strokeLinecap="round"/>
      <rect x="9" y="23" width="6" height="9" rx="2" fill="#e8e0c0" stroke="#4a5e1a" strokeWidth="1.8"/>
      <rect x="29" y="23" width="6" height="9" rx="2" fill="#e8e0c0" stroke="#4a5e1a" strokeWidth="1.8"/>
      <path d="M35 30C35 33.5 33 35 30 35H26" stroke="#4a5e1a" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
    <div>
      <p className="text-sm sm:text-base lg:text-lg font-bold text-gray-900" style={{ fontFamily: "'DM Sans', sans-serif" }}>24×7 Support</p>
      <p className="text-xs sm:text-sm text-gray-500" style={{ fontFamily: "'DM Sans', sans-serif" }}>We support online all days.</p>
    </div>
  </div>

</div>
    </div>
  );
};

export default RelatedProducts;
