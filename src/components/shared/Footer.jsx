"use client";

import React, { useState, useEffect } from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Sparkles,
  Bus,
  CreditCard,
  Globe,
  Star,
} from "lucide-react";
import LinkLogo from "../userClick/LinkLogo";
import BackToTopButton from "../utilities/BackToTopButton";

const Footer = () => {
  const [travelTip, setTravelTip] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const quickLinks = [
    "Home",
    "Destinations",
    "Packages",
    "About Us",
    "Contact",
  ];
  const socialLinks = [
    { name: "Facebook", icon: <Facebook size={24} /> },
    { name: "Twitter", icon: <Twitter size={24} /> },
    { name: "Instagram", icon: <Instagram size={24} /> },
    { name: "LinkedIn", icon: <Linkedin size={24} /> },
  ];

  const benefits = [
    { icon: <Bus size={32} />, text: "Comfortable Travel" },
    { icon: <CreditCard size={32} />, text: "Secure Payments" },
    { icon: <Globe size={32} />, text: "Global Network" },
    { icon: <Star size={32} />, text: "5-Star Reviews" },
  ];

  // Example AI-powered travel tip (placeholder logic)
  const generateTravelTip = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setTravelTip(
        "Always keep a digital copy of your passport and important documents."
      );
      setIsLoading(false);
    }, 1500);
  };

  return (
  <>
    <footer className="bg-gray-900 text-gray-300 py-12 font-sans">
      <div className="container mx-auto px-4">
        <LinkLogo></LinkLogo>
        {/* Footer Main */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* About */}

          <div>
            <h3 className="text-xl font-bold text-white mb-4">About Us</h3>
            <p className="text-sm leading-relaxed">
              Tour Management System is your premier partner in exploring the
              world. We offer personalized travel solutions, thrilling
              adventures, and seamless experiences to create memories that last
              a lifetime.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm hover:text-blue-500 transition-colors duration-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href="#"
                  aria-label={`Visit our ${social.name} page`}
                  className="text-gray-400 hover:text-blue-500 transition-colors duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <div className="mt-6">
              <h3 className="text-xl font-bold text-white mb-2">Contact</h3>
              <p className="text-sm">Email: contact@tourmate.com</p>
              <p className="text-sm">Phone: +8801743637814</p>
            </div>
          </div>

          {/* Travel Tip */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Travel Tip</h3>
            {isLoading ? (
              <p className="text-blue-400">Loading tip...</p>
            ) : travelTip ? (
              <p className="text-sm leading-relaxed">{travelTip}</p>
            ) : (
              <p className="text-sm leading-relaxed">
                Click below to get a travel tip.
              </p>
            )}
            <button
              onClick={generateTravelTip}
              disabled={isLoading}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold flex items-center space-x-2 hover:bg-blue-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Sparkles size={18} />
              <span>{isLoading ? "Generating..." : "Generate a Tip"}</span>
            </button>
          </div>
        </div>

        {/* CopyRight */}
        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-sm text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} Tour Management System. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </footer>

    <BackToTopButton />

  </>
  );
};

export default Footer;
