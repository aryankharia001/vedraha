import React from 'react';

const RefundPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 font-sans">
      
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Refund Policy</h1>
        <div className="w-24 h-1 bg-[var(--hover-button)] mx-auto rounded"></div>
      </header>
      
      <div className="bg-[var(--secondary-color-1)] shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">RETURNS? NO PROBLEM!</h2>
           
          <div className="prose max-w-none text-gray-700 mb-6">
            <p>
              We won't get upset if you want to return your order, promise! Just send it back to us, 
              unopened and in its original packaging within 30 days of you receiving it and we'll refund 
              or exchange it for you. Sorry, but once you've opened or used it, you can't return it.
            </p>
            
            <p className="mt-4">
              The easiest way to cancel Goods purchased from us is to send a written notice of cancellation 
              by e-mail to <a href="mailto:support@akravi.com" className="text-[var(--primary-color-1)] hover:underline">support@akravi.com</a>
            </p>
            
            <p className="mt-4">
              Please contact our customer service team on <a href="mailto:support@akravi.com" className="text-[var(--primary-color-1)] hover:underline">support@akravi.com</a> or 
              call us at <a href="tel:+919910182009" className="text-[var(--primary-color-1)] hover:underline">+919910182009</a> and we will get back to you with 
              the return instructions within 48 Business Hours.
            </p>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">REFUNDS</h2>
          
          <div className="prose max-w-none text-gray-700">
            <p>
              We will notify you once we've received and inspected your return, and let you know if the refund was 
              approved or not. If approved, you'll be automatically refunded on your original payment method. 
              Please remember it can take some time for your bank or credit card company to process and post the refund too.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          Last updated: April 28, 2025
        </p>
        
        <div className="mt-6">
          <a href="/" className="inline-block bg-[var(--hover-button)] hover:bg-[var(--hover-button)] text-white py-2 px-6 rounded-lg transition duration-200">
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;