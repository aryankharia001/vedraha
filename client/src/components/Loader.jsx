import React from 'react';

const Loader = ({ size = 'medium', color = 'blue', fullScreen = false }) => {
  // Size variations
  const sizeClass = {
    small: 'w-4 h-4 border-2',
    medium: 'w-8 h-8 border-3',
    large: 'w-12 h-12 border-4',
  }[size] || 'w-8 h-8 border-3';

  // Color variations
  const colorClass = {
    blue: 'border-blue-600',
    gray: 'border-gray-600',
    green: 'border-green-600',
    red: 'border-red-600',
  }[color] || 'border-blue-600';

  // Full screen wrapper
  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[var(--secondary-color-1)] bg-opacity-75 z-50">
        <div className={`${sizeClass} ${colorClass} rounded-full border-t-transparent animate-spin`}></div>
      </div>
    );
  }

  // Regular loader
  return (
    <div className="flex items-center justify-center py-3">
      <div className={`${sizeClass} ${colorClass} rounded-full border-t-transparent animate-spin`}></div>
    </div>
  );
};

export default Loader;