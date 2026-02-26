import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const saved = localStorage.getItem("theme");
        // Default to dark for premium luxury feel if no preference is saved
        return saved ? saved === "dark" : true;
    });

    useEffect(() => {
        const root = window.document.documentElement;
        if (isDarkMode) {
            root.classList.add("dark");
            root.style.colorScheme = "dark";
            localStorage.setItem("theme", "dark");
        } else {
            root.classList.remove("dark");
            root.style.colorScheme = "light";
            localStorage.setItem("theme", "light");
        }
    }, [isDarkMode]);

    const toggleTheme = () => setIsDarkMode((prev) => !prev);

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};
