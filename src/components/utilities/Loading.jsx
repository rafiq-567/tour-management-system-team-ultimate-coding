import React, { useState, useEffect } from 'react';
import { Plane } from 'lucide-react';

// --- Custom Styles for Animations (Keyframes) ---
// Since we are in a single React file, we use a constant for the necessary CSS
const styles = `
    /* Keyframe for the plane flying across the screen (left to right) */
    @keyframes fly-plane {
        0% { transform: translateX(-150%) rotate(-10deg); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateX(150%) rotate(-10deg); opacity: 0; }
    }

    /* Keyframe for the simple pulse effect */
    @keyframes pulse-dot {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.5); opacity: 0.5; }
    }

    /* Animation utility classes */
    .animate-fly-plane {
        animation: fly-plane 3s ease-in-out infinite;
    }
    .animate-pulse-dot-1 {
        animation: pulse-dot 1s ease-in-out infinite;
    }
    .animate-pulse-dot-2 {
        animation: pulse-dot 1s ease-in-out infinite 0.2s; /* Delayed start */
    }
    .animate-pulse-dot-3 {
        animation: pulse-dot 1s ease-in-out infinite 0.4s; /* Further delayed start */
    }
`;

// --- Dynamic Messages ---
const MESSAGES = [
    "Loading Tour Data and Maps...",
    "Checking Flight Schedules...",
    "Optimizing Route Planning...",
    "Gathering Customer Details...",
    "Almost Ready to Launch!",
];


const Loading = () => {
    const [messageIndex, setMessageIndex] = useState(0);

    // Effect to cycle through loading messages every 1.5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex((prevIndex) => (prevIndex + 1) % MESSAGES.length);
        }, 1500);

        // Cleanup function
        return () => clearInterval(interval);
    }, []);


    return (
        <>
            {/* Inject Custom CSS for Keyframes */}
            <style dangerouslySetInnerHTML={{ __html: styles }} />

            {/* Main Full-Screen Loading Overlay */}
            <div className="fixed inset-0 bg-gray-50 flex items-center justify-center p-4 z-50 font-inter">
                
                {/* Loading Card Container */}
                <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-2xl max-w-lg w-full text-center border-t-8 border-indigo-600">
                    
                    {/* Animated Flying Plane Section */}
                    <div className="relative h-12 mb-8 overflow-hidden">
                        <Plane
                            className="text-indigo-600 absolute top-1/2 left-0 transform -translate-y-1/2 -rotate-45 animate-fly-plane"
                            size={48}
                        />
                    </div>

                    {/* System Title and Loading Message */}
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-2">
                        Tour Management System
                    </h1>
                    <p className="text-lg text-indigo-600 font-semibold mb-8">
                        Preparing Your Journey...
                    </p>

                    {/* Dynamic Loading Text and Progress Indicator */}
                    <div className="flex items-center justify-center space-x-2 min-h-[24px]">
                        <p className="text-gray-600 font-medium transition-opacity duration-300">
                            {MESSAGES[messageIndex]}
                        </p>
                        {/* Simple Pulsing Dot Indicator */}
                        <div className="space-x-1 flex pt-2">
                            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse-dot-1"></div>
                            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse-dot-2"></div>
                            <div className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse-dot-3"></div>
                        </div>
                    </div>

                    {/* Quote or Tagline */}
                    <p className="text-sm text-gray-400 mt-6 italic">
                        "Adventure Awaits, Just a Moment Longer."
                    </p>
                </div>
            </div>
        </>
    );
};

export default Loading;
