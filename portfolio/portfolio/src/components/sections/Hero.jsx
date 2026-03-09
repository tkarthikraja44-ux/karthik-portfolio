import { memo, useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Terminal } from 'lucide-react';

// ─── Constants ───
const codeLines = [
    { text: "class KarthikRaja {", delay: 0 },
    { text: '  String role = "Software Developer";', delay: 0.5 },
    { text: '  String passion = "Java Enthusiast";', delay: 1.0 },
    { text: '  String superpower = "Problem Solver";', delay: 1.5 },
    { text: "  ", delay: 1.8 },
    { text: "  List<String> coreSkills = Arrays.asList(", delay: 2.0 },
    { text: '    "Java", "C", "Data Structures",', delay: 2.3 },
    { text: '    "Web Development", "Problem Solving"', delay: 2.6 },
    { text: "  );", delay: 2.9 },
    { text: "  ", delay: 3.1 },
    { text: "  public void execute() {", delay: 3.3 },
    { text: '    System.out.println("Engineering the invisible.");', delay: 3.6 },
    { text: "  }", delay: 3.9 },
    { text: "}", delay: 4.2 }
];

const EASE_SPRING = [0.16, 1, 0.3, 1];

// ─── Sub-components ───

const TypingLine = ({ text, delay, index }) => {
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        let timeout;
        const startTimeout = setTimeout(() => {
            let i = 0;
            const type = () => {
                if (i <= text.length) {
                    setDisplayedText(text.slice(0, i));
                    i++;
                    timeout = setTimeout(type, 20 + Math.random() * 30);
                }
            };
            type();
        }, (delay + 1.5) * 1000);

        return () => {
            clearTimeout(startTimeout);
            clearTimeout(timeout);
        };
    }, [text, delay]);

    const tokenize = (line) => {
        const KEYWORDS = /\b(class|public|void|List|String|Arrays)\b/g;
        const STRINGS = /"[^"]*"/g;
        const IDENTIFIERS = /\b(KarthikRaja|execute|System)\b/g;

        const spans = [];
        let m;
        KEYWORDS.lastIndex = 0;
        while ((m = KEYWORDS.exec(line)) !== null) spans.push({ start: m.index, end: m.index + m[0].length, color: '#93c5fd', text: m[0] });
        STRINGS.lastIndex = 0;
        while ((m = STRINGS.exec(line)) !== null) spans.push({ start: m.index, end: m.index + m[0].length, color: '#86efac', text: m[0] });
        IDENTIFIERS.lastIndex = 0;
        while ((m = IDENTIFIERS.exec(line)) !== null) {
            if (!spans.some(s => s.start <= m.index && m.index < s.end)) {
                spans.push({ start: m.index, end: m.index + m[0].length, color: '#fef08a', text: m[0] });
            }
        }
        spans.sort((a, b) => a.start - b.start);

        const result = [];
        let cursor = 0;
        for (const span of spans) {
            if (span.start > cursor) result.push({ text: line.slice(cursor, span.start), color: 'rgba(255,255,255,0.6)' });
            result.push({ text: span.text, color: span.color });
            cursor = span.end;
        }
        if (cursor < line.length) result.push({ text: line.slice(cursor), color: 'rgba(255,255,255,0.6)' });
        return result.length ? result : [{ text: line, color: 'rgba(255,255,255,0.6)' }];
    };

    const tokens = tokenize(displayedText);

    return (
        <div className="whitespace-pre flex min-h-[1.5em]">
            <span className="w-5 text-white/20 mr-3 text-right text-[10px] pt-0.5 shrink-0 select-none">{index + 1}</span>
            <span>
                {tokens.map((tok, j) => (
                    <span key={j} style={{ color: tok.color }}>{tok.text}</span>
                ))}
                {(displayedText.length === text.length && displayedText.trim() !== "" && index === codeLines.length - 1) && (
                    <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                        className="inline-block w-1.5 h-3.5 bg-blue-400 ml-0.5 align-middle shadow-[0_0_8px_rgba(96,165,250,0.5)]"
                    />
                )}
                {displayedText.length < text.length && (
                    <span className="inline-block w-1.5 h-3.5 bg-white/40 ml-0.5 align-middle" />
                )}
            </span>
        </div>
    );
};

const WordReveal = ({ children, delay = 0 }) => {
    const words = children.split(" ");
    return (
        <span className="inline-block overflow-hidden">
            {words.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden mr-[0.2em] last:mr-0 pb-[0.1em]">
                    <motion.span
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: "0%", opacity: 1 }}
                        transition={{
                            duration: 0.8,
                            delay: delay + i * 0.1,
                            ease: [0.16, 1, 0.3, 1]
                        }}
                        className="inline-block"
                    >
                        {word}
                    </motion.span>
                </span>
            ))}
        </span>
    );
};

function Hero() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const xSpring = useSpring(mouseX, { stiffness: 150, damping: 20 });
    const ySpring = useSpring(mouseY, { stiffness: 150, damping: 20 });

    const rotateX = useTransform(ySpring, [-300, 300], [10, -10]);
    const rotateY = useTransform(xSpring, [-300, 300], [-10, 10]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            mouseX.set(clientX - innerWidth / 2);
            mouseY.set(clientY - innerHeight / 2);
        };

        if (window.innerWidth > 768) {
            window.addEventListener('mousemove', handleMouseMove);
        }
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <section id="hero" className="relative min-h-screen w-full flex items-center justify-center pt-24 pb-32 md:py-32 lg:py-0 bg-transparent overflow-hidden">

            {/* Background Parallax Elements */}
            <motion.div
                style={{ x: useTransform(xSpring, [-500, 500], [50, -50]), y: useTransform(ySpring, [-500, 500], [50, -50]) }}
                animate={{
                    y: [0, -20, 0],
                    transition: { duration: 10, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"
            />
            <motion.div
                style={{ x: useTransform(xSpring, [-500, 500], [-30, 30]), y: useTransform(ySpring, [-500, 500], [-30, 30]) }}
                animate={{
                    y: [0, 20, 0],
                    transition: { duration: 8, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"
            />

            <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mt-8 md:mt-0">

                <div className="flex flex-col items-center lg:items-start text-center lg:text-left">


                    <h1 className="text-[2.2rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter mb-8 text-white leading-[1.05] flex flex-col">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            Hi, I'm
                        </motion.span>
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        >
                            Karthik Raja.
                        </motion.span>
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
                        >
                            Java Developer.
                        </motion.span>
                    </h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
                        className="max-w-xl text-lg md:text-xl text-white/40 mb-12 font-light leading-relaxed tracking-tight"
                    >
                        I build scalable applications and solve complex problems using Java and modern web technologies.
                    </motion.p>
                </div>

                {/* Right Code Visual */}
                <motion.div
                    style={{
                        rotateX,
                        rotateY,
                        perspective: 1000,
                        transformStyle: "preserve-3d"
                    }}
                    initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
                    whileHover={{ scale: 1.02 }}
                    className="relative w-full max-w-lg mx-auto lg:mx-0 lg:ml-auto group cursor-default"
                >
                    <div className="absolute -inset-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-[3rem] blur-3xl opacity-30 group-hover:opacity-60 transition-opacity duration-1000" />

                    <div className="glass-card rounded-[2.5rem] overflow-hidden shadow-2xl relative bg-[#0A0A0A]/90 border border-white/10 backdrop-blur-3xl aspect-[4/3] flex flex-col transition-all duration-700 group-hover:border-white/20">
                        {/* Editor Header */}
                        <div className="h-10 bg-white/5 border-b border-white/5 flex items-center px-6 gap-3 shrink-0">
                            <div className="flex gap-2">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                                <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                            </div>
                            <div className="mx-auto flex items-center gap-2 text-white/20 text-[10px] font-mono tracking-[0.2em] uppercase">
                                <Terminal size={12} /> karthik.java
                            </div>
                        </div>

                        {/* Editor Body with Typing Animation */}
                        <div className="p-6 md:p-8 font-mono text-[10px] md:text-xs leading-relaxed overflow-hidden text-left flex-1 bg-transparent flex flex-col justify-center">
                            {codeLines.map((line, i) => (
                                <TypingLine key={i} text={line.text} delay={line.delay} index={i} />
                            ))}
                        </div>
                    </div>
                </motion.div>

            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3, duration: 1 }}
                className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex flex-col items-center gap-2"
                >
                    <span className="text-[10px] font-bold tracking-[0.3em] text-white/30 uppercase">Scroll ↓</span>
                    <div className="w-px h-12 bg-gradient-to-b from-blue-500 to-transparent opacity-50" />
                </motion.div>
            </motion.div>
        </section>
    );
}

export default memo(Hero);
