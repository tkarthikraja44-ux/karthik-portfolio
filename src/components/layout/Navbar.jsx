import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Github, Linkedin, Mail } from "lucide-react";

export default function Navbar() {

    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navLinks = [
        { name: "About", href: "#about" },
        { name: "Skills", href: "#skills" },
        { name: "Projects", href: "#projects" },
        { name: "Experience", href: "#experience" },
        { name: "Contact", href: "#contact" },
    ];

    const handleNavClick = (e, href) => {
        e.preventDefault();

        const target = document.querySelector(href);
        if (!target) return;

        const navbarHeight = 120;

        window.scrollTo({
            top: target.offsetTop - navbarHeight,
            behavior: "smooth",
        });

        setMobileMenuOpen(false);
    };

    useEffect(() => {

        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);

    }, []);

    return (

        <header
            className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ${scrolled
                    ? "top-4 md:top-6 py-3 px-5 md:px-8 w-[calc(100%-2rem)] md:w-auto bg-[#0a0a0f]/80 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] rounded-2xl md:rounded-full"
                    : "top-0 py-6 px-6 lg:px-8 w-full bg-transparent"
                }`}
        >

            <div
                className={`mx-auto flex justify-between items-center ${scrolled ? "w-full gap-8 md:gap-16" : "max-w-7xl w-full"
                    }`}
            >

                {/* LOGO */}

                <motion.a
                    href="#"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xl font-bold tracking-tighter"
                >
                    Karthik<span className="text-white/50">Raja</span>
                </motion.a>


                {/* DESKTOP NAV */}

                <nav className="hidden md:flex gap-8 items-center">

                    {navLinks.map((link, i) => (

                        <motion.a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => handleNavClick(e, link.href)}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="relative group text-sm font-medium text-white/70 hover:text-white transition-colors py-2"
                        >

                            {link.name}

                            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-white/80 to-white/20 transition-all duration-300 group-hover:w-full"></span>

                        </motion.a>

                    ))}


                    {/* SOCIAL ICONS */}

                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className={`flex items-center gap-3 border-l pl-6 ${scrolled ? "border-white/10" : "border-white/20"
                            }`}
                    >

                        {/* GitHub */}

                        <a
                            href="https://github.com/tkarthikraja44-ux"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative p-2 rounded-xl transition-all duration-300 hover:bg-white/10"
                        >

                            <Github
                                size={18}
                                className="text-white/70 group-hover:text-white transition-colors"
                            />

                            <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 bg-gradient-to-r from-green-400/20 to-emerald-400/20 blur-lg transition-opacity"></span>

                        </a>


                        {/* LinkedIn */}

                        <a
                            href="https://www.linkedin.com/in/karthik-raja-thavamani/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative p-2 rounded-xl transition-all duration-300 hover:bg-white/10"
                        >

                            <Linkedin
                                size={18}
                                className="text-white/70 group-hover:text-blue-400 transition-colors"
                            />

                            <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 blur-lg transition-opacity"></span>

                        </a>

                    </motion.div>

                </nav>


                {/* MOBILE BUTTON */}

                <div className="md:hidden">

                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="text-white/80 hover:text-white"
                    >

                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}

                    </button>

                </div>

            </div>


            {/* MOBILE MENU */}

            <AnimatePresence>

                {mobileMenuOpen && (

                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "100vh" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden fixed inset-0 top-[60px] bg-black/95 backdrop-blur-2xl px-6 py-8 flex flex-col"
                    >

                        {navLinks.map((link, i) => (

                            <motion.a
                                key={link.name}
                                href={link.href}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: i * 0.1 }}
                                onClick={(e) => handleNavClick(e, link.href)}
                                className="text-2xl font-semibold py-4 border-b border-white/10 text-white/80 hover:text-white"
                            >
                                {link.name}
                            </motion.a>

                        ))}


                        {/* MOBILE SOCIAL */}

                        <div className="mt-auto flex gap-6 pb-20 justify-center">

                            <a
                                href="https://github.com/tkarthikraja44-ux"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 glass-card rounded-full text-white/80"
                            >
                                <Github size={24} />
                            </a>

                            <a
                                href="https://www.linkedin.com/in/karthik-raja-thavamani/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 glass-card rounded-full text-white/80"
                            >
                                <Linkedin size={24} />
                            </a>

                            <a
                                href="mailto:tkarthikraja44@gmail.com"
                                className="p-3 glass-card rounded-full text-white/80"
                            >
                                <Mail size={24} />
                            </a>

                        </div>

                    </motion.div>

                )}

            </AnimatePresence>

        </header>

    );

}