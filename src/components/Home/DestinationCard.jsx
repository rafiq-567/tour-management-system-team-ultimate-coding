import React from "react";

const Newsletter = () => {
  return (
    <section className="py-16 bg-sky-100 dark:bg-sky-900">
      <div className="container mx-auto px-4 text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-white mb-4">
          Stay Updated on Exclusive Deals
        </h2>

        {/* Subtitle */}
        <p className="text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Subscribe to our newsletter and never miss special offers and latest tour updates.
        </p>

        {/* Input + Button */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-xl mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300 font-semibold shadow-md">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
