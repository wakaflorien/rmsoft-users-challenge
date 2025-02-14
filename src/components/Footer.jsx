import { useTheme } from '@/app/contexts/ThemeProvider';
import React from 'react'

export default function Footer() {
    const { theme, toggleTheme } = useTheme();
    return (
        <footer className={`row-start-3 flex gap-6 flex-wrap items-center justify-center`}>
            <p className={`text-black ${theme === "dark" && "!text-white "}`}>&copy; Florien 2025</p>
        </footer>
    )
}
