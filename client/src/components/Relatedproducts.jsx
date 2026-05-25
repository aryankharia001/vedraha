import React from "react";
import { Link } from "react-router-dom";

// Individual Product Card
const ProductCard = ({ image, title, price, originalPrice, badge, url }) => {
  return (
    <Link to={url} className="bg-white rounded-none shadow-md p-4 hover:shadow-xl transition duration-300 w-full">
      <div className="relative">
        {badge && (
          <span className="absolute top-2 right-2 bg-gray-100 text-sm px-2 py-1 rounded-full">
            {badge}
          </span>
        )}
        <div className="w-full aspect-square overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      <h3 className="text-base font-medium mt-4 line-clamp-2">
        {title}
      </h3>

      <div className="mt-2 flex items-center gap-2">
        <span className="text-lg font-semibold">₹{price}</span>
        {originalPrice && (
          <span className="text-sm text-gray-400 line-through">
            ₹{originalPrice}
          </span>
        )}
      </div>
    </Link>
  );
};

// Main Related Products Component
const RelatedProducts = ({ products }) => {
  return (
    <div className="px-4 py-8 cursor-pointer">
      <h2 className="text-2xl font-semibold mb-6">You may also like</h2>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;