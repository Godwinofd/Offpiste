'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Mode = 'adventure' | 'relax';

interface ThemeContextType {
    mode: Mode;
    toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [mode, setMode] = useState<Mode>('adventure');

    const toggleMode = () => {
        setMode((prev) => (prev === 'adventure' ? 'relax' : 'adventure'));
    };

    useEffect(() => {
        // Update CSS variables or global classes based on mode
        const root = document.documentElement;
        if (mode === 'relax') {
            root.style.setProperty('--particle-speed', '0.5');
            root.style.setProperty('--animation-speed', '1.5');
            document.body.classList.add('mode-relax');
        } else {
            root.style.setProperty('--particle-speed', '1');
            root.style.setProperty('--animation-speed', '1');
            document.body.classList.remove('mode-relax');
        }
    }, [mode]);

    return (
        <ThemeContext.Provider value={{ mode, toggleMode }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
