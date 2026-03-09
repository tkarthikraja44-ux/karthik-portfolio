import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Folder, Terminal, Briefcase, Github, Linkedin, Mail } from "lucide-react";
import { getLenis } from "../../utils/smoothScroll";

const commands = [
    { id: "projects", title: "Go to Projects", icon: <Folder size={18} />, type: "scroll" },
    { id: "skills", title: "Go to Skills", icon: <Terminal size={18} />, type: "scroll" },
    { id: "experience", title: "Go to Experience", icon: <Briefcase size={18} />, type: "scroll" },
    { id: "github", title: "Open GitHub", icon: <Github size={18} />, type: "link", url: "https://github.com/tkarthikraja44" },
    { id: "linkedin", title: "Open LinkedIn", icon: <Linkedin size={18} />, type: "link", url: "https://linkedin.com/in/karthik-raja-thavanan" },
    { id: "contact", title: "Contact Me", icon: <Mail size={18} />, type: "scroll" }
];

export default function CommandPalette() {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const inputRef = useRef(null);

    /* Keyboard Shortcuts */
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                setIsOpen((prev) => !prev);
            }

            if (e.key === "Escape") {
                setIsOpen(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    /* Lock Body Scroll */
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            setTimeout(() => inputRef.current?.focus(), 100);
        } else {
            document.body.style.overflow = "";
            setSearch("");
        }
    }, [isOpen]);

    /* Filter commands */
    const filteredCommands = commands.filter((cmd) =>
        cmd.title.toLowerCase().includes(search.toLowerCase())
    );

    /* Handle Command Click */
    const handleSelect = (cmd) => {
        if (cmd.type === "scroll") {
            setIsOpen(false);

            const lenis = getLenis();

            if (lenis) {
                lenis.scrollTo(`#${cmd.id}`, {
                    duration: 1.5,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                });
            } else {
                document.getElementById(cmd.id)?.scrollIntoView({ behavior: "smooth" });
            }
        }

        if (cmd.type === "link") {
            window.open(cmd.url, "_blank", "noreferrer");
            setIsOpen(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-[99999] bg-black/70 backdrop-blur-sm flex items-start justify-center pt-[15vh] px-4"
                    onClick={() => setIsOpen(false)}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="w-full max-w-xl bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Search Input */}
                        <div className="flex items-center px-4 py-4 border-b border-white/10 gap-3">
                            <Search size={20} className="text-white/40" />

                            <input
                                ref={inputRef}
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search commands..."
                                className="flex-1 bg-transparent border-none outline-none text-white text-lg placeholder-white/30"
                            />

                            <span className="text-xs font-mono px-2 py-1 rounded bg-white/10 text-white/50 border border-white/5">
                                ESC
                            </span>
                        </div>

                        {/* Command List */}
                        <div className="max-h-80 overflow-y-auto p-2 scrollbar-hide">
                            {filteredCommands.length === 0 ? (
                                <div className="p-8 text-center text-white/40 text-sm">
                                    No commands found for "{search}"
                                </div>
                            ) : (
                                <div className="flex flex-col gap-1">
                                    <div className="text-xs font-semibold tracking-wider uppercase text-white/30 px-3 py-2">
                                        Developer Navigation
                                    </div>

                                    {filteredCommands.map((cmd) => (
                                        <button
                                            key={cmd.id}
                                            onClick={() => handleSelect(cmd)}
                                            className="w-full flex items-center gap-4 px-4 py-3 text-left rounded-xl hover:bg-white/10 transition-colors text-white/80 hover:text-white group"
                                        >
                                            <div className="p-2 rounded-lg bg-white/5 border border-white/5 group-hover:bg-white/10 text-white/60 group-hover:text-white transition-colors">
                                                {cmd.icon}
                                            </div>

                                            <span className="font-medium">{cmd.title}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}