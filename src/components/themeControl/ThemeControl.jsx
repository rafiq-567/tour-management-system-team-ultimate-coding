"use client";
import { useEffect, useState } from 'react';
import { Sun, Moon } from "lucide-react";

const ThemeControl = () => {
    const [onToggleDarkMode , setOnToggleDarkMode] = useState("light");


    const handleToggle = () => {
        if (onToggleDarkMode === 'dark') {
            setOnToggleDarkMode("light");
        } else {
            setOnToggleDarkMode("dark");
        }
    }

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            setOnToggleDarkMode(savedTheme);
            document.querySelector("html").setAttribute("data-theme", savedTheme);
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("theme", onToggleDarkMode);
        const localTheme = localStorage.getItem("theme");
        document.querySelector("html").setAttribute("data-theme", localTheme);
    }, [onToggleDarkMode])

    return (
        <button
            onClick={handleToggle}
            className="p-2 rounded-full text-gray-800 dark:text-gray-100 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            aria-label="Toggle dark mode"
        >
            {onToggleDarkMode ==='light' ? <Sun size={24} /> : <Moon size={24} />}
        </button>
    );
};

export default ThemeControl;