import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function Footer() {
    const [visible, setVisible] = useState(false);
    const lastScrollY = useRef(0);
    const ticking = useRef(false);

    useEffect(() => {
        const handleScroll = () => {
            if (!ticking.current) {
                window.requestAnimationFrame(() => {
                    const currentY = window.scrollY;
                    // Visible only on the first screen (Hero section)
                    // Hide immediately past 100 and remain hidden for the rest of the page scroll area
                    setVisible(currentY < 100);

                    lastScrollY.current = currentY;
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
        <motion.footer
            aria-hidden={!visible}
            className="fixed bottom-0 left-0 w-full z-50 px-4 sm:px-6 pb-6 pt-4 pointer-events-none"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: visible ? "0%" : "100%", opacity: visible ? 1 : 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ willChange: "transform, opacity" }}
        >
            <div className="pointer-events-auto max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 rounded-2xl bg-[#0a0a0f]/80 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
                <p className="text-xs sm:text-sm text-white/40 text-center sm:text-left">
                    © {new Date().getFullYear()} Karthik Raja T. Crafted with React &amp; Framer Motion.
                </p>
                <div className="flex gap-5 text-xs sm:text-sm text-white/40">
                    <a href="#about" className="hover:text-white transition-colors duration-200 min-h-[44px] flex items-center">About</a>
                    <a href="#projects" className="hover:text-white transition-colors duration-200 min-h-[44px] flex items-center">Projects</a>
                    <a href="#contact" className="hover:text-white transition-colors duration-200 min-h-[44px] flex items-center">Contact</a>
                </div>
            </div>
        </motion.footer>
    );
}
