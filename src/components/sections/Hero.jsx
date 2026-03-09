import { memo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Terminal } from 'lucide-react';
import Button from '../ui/Button';
import { fadeUpVariants, VIEWPORT } from '../../hooks/useScrollReveal';

// ─── Static data — outside component so never recreated on re-render ──────────
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

function tokenize(line) {
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
}

const tokenizedLines = codeLines.map(line => ({ ...line, tokens: tokenize(line.text) }));

const lineVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (delay) => ({ opacity: 1, x: 0, transition: { duration: 0.35, delay: 1.0 + delay } }),
};
const codeCardVariants = {
    hidden: { opacity: 0, filter: 'blur(10px)', x: 30 },
    visible: { opacity: 1, filter: 'blur(0px)', x: 0, transition: { duration: 1.2, delay: 0.6, ease: 'easeOut' } },
};

function Hero() {
    return (
        <section id="hero" className="relative min-h-screen w-full flex items-center justify-center pt-28 pb-40 md:py-32 lg:py-0 bg-transparent">

            <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mt-8 md:mt-0">

                {/* Left Text Content */}
                <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                    {/* Glow layers */}
                    <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] opacity-50 mix-blend-screen pointer-events-none promote" />
                    <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[120px] opacity-40 mix-blend-screen pointer-events-none promote" />

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: EASE_SPRING }}
                        layout={false}
                        className="mb-6 inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full glass-card text-xs md:text-sm font-medium border border-white/10 text-white/80 backdrop-blur-xl bg-white/[0.03]"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                        </span>
                        Available for Opportunities
                    </motion.div>

                    {/* Heading — responsive from 320px up */}
                    <h1 className="text-[2.2rem] xs:text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] xl:text-[6rem] font-bold tracking-tighter mb-5 lg:mb-8 text-white leading-[1.05] flex flex-col gap-1 sm:gap-2">
                        <div className="overflow-hidden pb-2">
                            <motion.div
                                initial={{ y: "100%", opacity: 0 }}
                                animate={{ y: "0%", opacity: 1 }}
                                transition={{ duration: 0.9, delay: 0.2, ease: EASE_SPRING }}
                                layout={false}
                                className="gpu"
                            >
                                Hi, I'm Karthik Raja
                            </motion.div>
                        </div>
                        <div className="overflow-hidden pb-4">
                            <motion.div
                                initial={{ y: "100%", opacity: 0 }}
                                animate={{ y: "0%", opacity: 1 }}
                                transition={{ duration: 0.9, delay: 0.35, ease: EASE_SPRING }}
                                layout={false}
                                className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-500 drop-shadow-md pb-2 gpu"
                            >
                                Java Developer.
                            </motion.div>
                        </div>
                    </h1>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                        layout={false}
                        className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium tracking-tight text-white/80 mb-5 bg-white/[0.02] border border-white/5 px-4 sm:px-6 py-2 sm:py-2.5 rounded-2xl backdrop-blur-xl w-fit mx-auto lg:mx-0 shadow-lg gpu"
                    >
                        Engineering • UI/UX • Architecture
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                        layout={false}
                        className="max-w-xl text-sm sm:text-base md:text-lg text-white/60 mb-10 font-light leading-relaxed tracking-wide drop-shadow-sm px-1 sm:px-0"
                    >
                        I build seamless digital experiences by combining robust backend systems with cinematic frontend interfaces.
                    </motion.p>


                </div>

                {/* Right Code Visual — hidden on small phones, visible sm+ */}
                <motion.div
                    variants={codeCardVariants}
                    initial="hidden"
                    animate="visible"
                    layout={false}
                    className="relative w-full max-w-lg mx-auto lg:mx-0 lg:ml-auto group gpu hidden sm:block"
                >
                    <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-[2rem] blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-700 promote" />

                    <div className="glass-card rounded-[1.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative bg-[#0A0A0A]/80 border border-white/10 backdrop-blur-2xl aspect-[4/3] flex flex-col group-hover:border-white/20 transition-colors duration-500">
                        {/* Editor Header */}
                        <div className="h-10 sm:h-12 bg-white/5 border-b border-white/5 flex items-center px-4 sm:px-5 gap-2 w-full">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/90 shadow-inner" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/90 shadow-inner" />
                                <div className="w-3 h-3 rounded-full bg-green-500/90 shadow-inner" />
                            </div>
                            <div className="mx-auto flex items-center gap-2 text-white/40 text-xs font-mono font-medium tracking-widest uppercase bg-white/5 px-3 sm:px-4 py-1.5 rounded-md">
                                <Terminal size={12} /> karthik.java
                            </div>
                        </div>

                        {/* Editor Body */}
                        <div className="p-3 sm:p-4 font-mono text-[0.65rem] sm:text-xs leading-relaxed overflow-hidden text-left flex-1 bg-transparent">
                            {tokenizedLines.map((line, i) => (
                                <motion.div
                                    key={i}
                                    custom={line.delay}
                                    variants={lineVariants}
                                    initial="hidden"
                                    animate="visible"
                                    layout={false}
                                    className="whitespace-pre flex"
                                >
                                    <span style={{ color: 'rgba(255,255,255,0.18)' }} className="w-5 select-none mr-2 sm:mr-3 text-right inline-block text-[10px] pt-0.5 shrink-0">{i + 1}</span>
                                    <span>
                                        {line.tokens.map((tok, j) => (
                                            <span key={j} style={{ color: tok.color }}>{tok.text}</span>
                                        ))}
                                    </span>
                                </motion.div>
                            ))}
                            <motion.div
                                animate={{ opacity: [1, 0] }}
                                transition={{ duration: 0.8, repeat: Infinity }}
                                layout={false}
                                className="w-2 h-4 bg-white/60 inline-block mt-2 ml-10 shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                            />
                        </div>
                    </div>
                </motion.div>

            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 1 }}
                layout={false}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
            >
                <span className="text-xs uppercase tracking-widest text-white/40 font-semibold bg-black/50 px-3 py-1 rounded-full backdrop-blur-md border border-white/5">Scroll</span>
                <div className="w-px h-10 sm:h-12 bg-gradient-to-b from-white/40 to-transparent" />
            </motion.div>
        </section>
    );
}

export default memo(Hero);
