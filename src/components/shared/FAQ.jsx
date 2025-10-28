"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle, MessageSquare } from "lucide-react";

const faqData = [
  {
    question: "How do I book a tour on your website?",
    answer:
      "Booking a tour is easy! Simply navigate to the 'Tours' section, select your desired tour, choose your dates and number of people, and proceed to checkout. You will receive a confirmation email once your booking is complete.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept a wide range of payment methods, including credit cards (Visa, Mastercard, Amex), debit cards, and popular mobile payment options. All transactions are securely processed.",
  },
  {
    question: "Can I cancel or change my booking?",
    answer:
      "Yes, you can. Cancellation and modification policies vary by tour. Please check the specific tour's details for more information. For changes, you can contact our customer support team for assistance.",
  },
  {
    question: "Are there any discounts for group bookings?",
    answer:
      "We offer special discounts for large groups. Please contact our sales team with your group size and tour of interest to get a customized quote.",
  },
  {
    question: "What is your refund policy?",
    answer:
      "Our refund policy depends on the tour's cancellation policy. If you cancel within the eligible period, a full refund will be processed to your original payment method within 7-10 business days.",
  },
  {
    question: "Is travel insurance included in the tour price?",
    answer:
      "Travel insurance is not included in the standard tour price. We highly recommend purchasing travel insurance to protect yourself against unforeseen events like cancellations, delays, or medical emergencies.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-base-100 dark:bg-gray-900 p-8 sm:p-12 lg:p-20 font-sans">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold dark:text-gray-100 mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-lg dark:text-gray-400 max-w-2xl mx-auto">
          Find quick answers to the most common questions about our services, bookings, and policies.
        </p>
      </div>
      <div className="max-w-4xl mx-auto space-y-4">
        {faqData.map((item, index) => (
          <div
            key={index}
            className="bg-base-300 dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 transform hover:scale-[1.01]"
          >
            <button
              className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
              onClick={() => toggleAnswer(index)}
            >
              <div className="flex items-center gap-3">
                <HelpCircle className="h-6 w-6 text-blue-500" />
                <span className="font-semibold text-lg dark:text-gray-100">
                  {item.question}
                </span>
              </div>
              <span>
                {openIndex === index ? (
                  <ChevronUp className="h-6 w-6 text-blue-500 transition-transform duration-300" />
                ) : (
                  <ChevronDown className="h-6 w-6 text-gray-500 transition-transform duration-300" />
                )}
              </span>
            </button>
            <div
              className={`grid transition-all duration-500 ease-in-out ${
                openIndex === index
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden px-6 pb-6 flex items-start gap-3 dark:text-gray-400">
                <MessageSquare className="h-5 w-5 text-green-500 mt-1" />
                <span>{item.answer}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
