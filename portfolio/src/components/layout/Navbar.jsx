import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Github, Linkedin, Mail } from "lucide-react";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const lastScrollY = useRef(0);

    const navLinks = [
        { name: "About", href: "#about", id: "about" },
        { name: "Skills", href: "#skills", id: "skills" },
        { name: "Projects", href: "#projects", id: "projects" },
        { name: "Experience", href: "#experience", id: "experience" },
        { name: "Contact", href: "#contact", id: "contact" },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        const observerOptions = {
            root: null,
            rootMargin: '-10% 0px -80% 0px', // Adjusted for more precise triggering
            threshold: 0
        };

        const sectionsToSpy = [
            'hero', 'about', 'skills',
            'project-assessment', 'project-peernotes', 'project-banksystem',
            'experience', 'education', 'achievements', 'github', 'contact'
        ];

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    if (id.startsWith('project-')) {
                        setActiveSection('projects');
                    } else if (id === 'github' || id === 'achievements' || id === 'education') {
                        setActiveSection('experience');
                    } else {
                        setActiveSection(id);
                    }
                }
            });
        }, observerOptions);

        sectionsToSpy.forEach(id => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", handleScroll);
            observer.disconnect();
        };
    }, []);

    const handleNavClick = (e, href) => {
        e.preventDefault();
        setMobileMenuOpen(false); // Immediate close

        const target = document.querySelector(href);
        if (!target) return;

        const navbarHeight = 80;
        window.scrollTo({
            top: target.offsetTop - navbarHeight,
            behavior: "smooth",
        });
    };

    return (
        <header
            className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl py-3 px-5 md:px-6 bg-[#0a0a0f]/80 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] rounded-2xl md:rounded-full transition-all duration-700 ease-[0.16,1,0.3,1]"
        >
            <div className="flex justify-between items-center w-full">

                {/* Logo */}
                <a
                    href="#hero"
                    onClick={(e) => handleNavClick(e, '#hero')}
                    className="flex items-center tracking-tight z-50"
                >
                    <span className="text-xl font-bold text-white">Karthik</span>
                    <span className="text-xl font-bold text-white/50">Raja</span>
                </a>

                {/* Desktop Nav */}
                <nav className="hidden md:flex gap-1 items-center">
                    {navLinks.map((link, i) => (
                        <motion.a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => handleNavClick(e, link.href)}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className={`relative px-4 py-2 text-sm font-medium transition-all duration-500 rounded-full ${activeSection === link.id
                                ? "text-white bg-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                                : "text-white/50 hover:text-white hover:bg-white/5"
                                }`}
                        >
                            {link.name}
                            {activeSection === link.id && (
                                <motion.div
                                    layoutId="nav-active"
                                    className="absolute inset-0 bg-white/10 rounded-full -z-10"
                                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                />
                            )}
                        </motion.a>
                    ))}

                    <div className="w-px h-4 bg-white/10 mx-4" />

                    <div className="flex items-center gap-2">
                        <a href="https://github.com/tkarthikraja44-ux" target="_blank" rel="noopener noreferrer" className="p-2 text-white/50 hover:text-white transition-colors">
                            <Github size={18} />
                        </a>
                        <a href="https://www.linkedin.com/in/karthik-raja-thavamani/" target="_blank" rel="noopener noreferrer" className="p-2 text-white/50 hover:text-white transition-colors">
                            <Linkedin size={18} />
                        </a>
                        <a href="mailto:tkarthikraja44@gmail.com" className="p-2 text-white/50 hover:text-white transition-colors">
                            <Mail size={18} />
                        </a>
                    </div>
                </nav>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden flex items-center z-50">
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="text-white/80 hover:text-white p-2"
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="md:hidden absolute top-full left-0 right-0 mt-2 p-4 bg-black/90 backdrop-blur-2xl border border-white/10 rounded-2xl flex flex-col gap-4 shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
                    >
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => handleNavClick(e, link.href)}
                                className="text-lg font-medium text-white/70 hover:text-white px-4 py-2 border-b border-white/5 last:border-0"
                            >
                                {link.name}
                            </a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}