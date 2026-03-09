import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Footer() {
    const [visible, setVisible] = useState(true);
    const ticking = useRef(false);

    useEffect(() => {
        const handleScroll = () => {
            if (!ticking.current) {
                window.requestAnimationFrame(() => {
                    const currentY = window.scrollY;
                    // Visible only on the first screen (Hero section), typically < 100px or so.
                    // Let's use 150px as the threshold before it hides.
                    setVisible(currentY < 150);
                    ticking.current = false;
                });
                ticking.current = true;
            }
        };

        // Initial check
        handleScroll();

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <AnimatePresence>
            {visible && (
                <motion.footer
                    initial={{ y: "150%", opacity: 0, scale: 0.9 }}
                    animate={{ y: "0%", opacity: 1, scale: 1 }}
                    exit={{ y: "150%", opacity: 0, scale: 0.9, transition: { duration: 0.3, ease: "easeIn" } }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-2xl px-2 sm:px-0 pointer-events-none"
                    style={{ willChange: "transform, opacity" }}
                >
                    <div className="pointer-events-auto flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-6 px-6 sm:px-8 py-3 sm:py-4 rounded-[2rem] bg-black/40 backdrop-blur-2xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] transition-shadow duration-500 overflow-hidden relative group">
                        {/* Subtle inner glow */}
                        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                        <p className="text-[11px] sm:text-xs text-white/50 text-center sm:text-left font-medium tracking-wide">
                            © 2026 Karthik Raja · Crafted with React &amp; Framer Motion
                        </p>
                        <div className="flex gap-4 sm:gap-6 text-[11px] sm:text-sm font-medium">
                            <a href="#about" className="text-white/40 hover:text-white hover:scale-105 transition-all duration-300">About</a>
                            <a href="#projects" className="text-white/40 hover:text-white hover:scale-105 transition-all duration-300">Projects</a>
                            <a href="#contact" className="text-white/40 hover:text-white hover:scale-105 transition-all duration-300">Contact</a>
                        </div>
                    </div>
                </motion.footer>
            )}
        </AnimatePresence>
    );
}
