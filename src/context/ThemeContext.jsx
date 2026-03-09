import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    // Themes: 'dark', 'midnight', 'neon', 'minimal'
    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('theme-dark', 'theme-midnight', 'theme-neon', 'theme-minimal');
        root.classList.add(`theme-${theme}`);

        // Store preference
        localStorage.setItem('portfolio-theme', theme);
    }, [theme]);

    useEffect(() => {
        const savedTheme = localStorage.getItem('portfolio-theme');
        if (savedTheme) {
            setTheme(savedTheme);
        }
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);
