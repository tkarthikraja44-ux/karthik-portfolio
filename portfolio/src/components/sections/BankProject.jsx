import { memo, useRef, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Github, Terminal } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Static data — outside component so arrays are never re-created ──────────
const features = [
    "Deposit, withdraw, and balance management",
    "Object-Oriented MVC architecture",
    "Console based interface in Java"
];
const techStack = ["Java", "Object-Oriented Programming", "Data Structures", "Console UI"];

// Terminal lines are static — defined once at module scope
const terminalLines = [
    { text: "Initializing Bank Management System...", color: "text-white/40" },
    { text: "Connecting to local dataset... [OK]", color: "text-emerald-400" },
    { text: "" },
    { text: "BANK MANAGEMENT SYSTEM", color: "text-white/70", header: true },
    { text: "1. Deposit Money", color: "text-white/50" },
    { text: "2. Withdraw Money", color: "text-white/50" },
    { text: "3. Check Balance", color: "text-white/50" },
    { text: "4. Account Statement", color: "text-white/50" },
    { text: "5. Exit", color: "text-white/50" },
    { text: "" },
    { text: "$ Enter choice: 1", color: "text-cyan-400" },
    { text: "" },
    { text: "Enter Deposit Amount: ₹5,000", color: "text-white/40" },
    { text: "✓ Deposit Successful!", color: "text-green-400" },
    { text: "Updated Balance: ₹12,000", color: "text-green-300" }
];

// ─── TerminalLine — memo prevents re-renders ─────────────────────────────────
const TerminalLine = memo(function TerminalLine({ text, color = "text-green-400/80", delay, prompt }) {
    return (
        <motion.p
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay }}
            layout={false}
            className={`flex items-start gap-2 text-xs ${color}`}
        >
            {prompt && <span className="text-white/30">$</span>}
            {text}
        </motion.p>
    );
});

// ─── BankTerminal — memo prevents re-renders ─────────────────────────────────
const BankTerminal = memo(function BankTerminal() {
    return (
        <div className="relative w-full h-full bg-[#050510] rounded-xl md:rounded-2xl overflow-hidden flex flex-col font-mono">
            {/* Subtle grid background — static, promote to GPU */}
            <div className="absolute inset-0 opacity-[0.05] promote">
                <div className="w-full h-full bg-[linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] bg-[size:40px_40px]" />
            </div>

            {/* header */}
            <div className="h-10 bg-[#0f0f1a] border-b border-white/5 flex items-center px-4 gap-3 relative z-10">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="mx-auto flex items-center gap-2 text-white/30 text-[11px]">
                    <Terminal size={12} />
                    java Main — BankManagementSystem
                </div>
            </div>

            {/* terminal text */}
            <div className="relative z-10 flex-1 p-6 flex flex-col gap-1 text-[12px]">
                {terminalLines.map((line, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 4 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.15 }}
                        layout={false}
                        className={`${line.color || ''} ${line.header ? "font-semibold mt-2 mb-1 tracking-wider" : ""}`}
                    >
                        {line.text}
                    </motion.div>
                ))}

                {/* blinking cursor */}
                <motion.div
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    layout={false}
                    className="flex items-center gap-2 mt-2"
                >
                    <span className="text-white/30">$</span>
                    <span className="w-2 h-4 bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
                </motion.div>
            </div>
        </div>
    );
});

// ─── BankProject — memo + GSAP context for clean animation lifecycle ──────────
function BankProject() {
    const sectionRef = useRef(null);
    const previewRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Header reveal
            gsap.from(".project-header > *", {
                y: 60,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    once: true,
                }
            });

            // Preview zoom
            gsap.from(previewRef.current, {
                scale: 1.1,
                opacity: 0,
                duration: 1.4,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: previewRef.current,
                    start: "top 80%",
                    once: true,
                }
            });

            // Features
            gsap.from(".feature-item", {
                y: 40,
                opacity: 0,
                stagger: 0.15,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".project-features",
                    start: "top 85%",
                    once: true,
                }
            });

            // Tech tags
            gsap.from(".tech-tag", {
                y: 20,
                opacity: 0,
                stagger: 0.1,
                duration: 0.6,
                scrollTrigger: {
                    trigger: ".project-tech",
                    start: "top 85%",
                    once: true,
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="project-bank"
            className="relative min-h-screen flex items-center justify-center py-32 overflow-hidden"
        >
            {/* Apple style glow — promote to GPU layer */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-500/10 blur-[160px] rounded-full promote" />

            <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
                {/* HEADER */}
                <div className="project-header text-center max-w-3xl mb-16 gpu">
                    <span className="text-xs tracking-widest uppercase text-purple-400/70 border border-purple-400/20 px-4 py-1 rounded-full">
                        PROJECT 03
                    </span>
                    <h2 className="text-5xl md:text-6xl font-bold mt-4">
                        Bank Management{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400">
                            System
                        </span>
                    </h2>
                    <p className="text-white/50 mt-6 text-lg">
                        A Java console banking system implementing MVC architecture and transaction management.
                    </p>
                </div>

                {/* PREVIEW */}
                <motion.div
                    ref={previewRef}
                    whileHover={{ rotateX: 6, rotateY: -6, scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    layout={false}
                    className="project-preview w-full max-w-5xl aspect-[21/9] mb-20 gpu"
                >
                    <div className="relative w-full h-full rounded-2xl border border-white/10 bg-[#060610] shadow-[0_40px_100px_rgba(168,85,247,0.25)] overflow-hidden">
                        <BankTerminal />
                    </div>
                </motion.div>

                {/* BOTTOM SECTION */}
                <div className="grid md:grid-cols-2 gap-16 max-w-5xl w-full">
                    {/* FEATURES */}
                    <div className="project-features">
                        <h4 className="text-xl mb-6 border-b border-white/10 pb-3">Key Capabilities</h4>
                        {features.map((f, i) => (
                            <div key={i} className="feature-item flex gap-4 mb-6">
                                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                                    <CheckCircle2 size={18} className="text-purple-400" />
                                </div>
                                <p className="text-white/70">{f}</p>
                            </div>
                        ))}
                    </div>

                    {/* TECH STACK */}
                    <div>
                        <div className="project-tech">
                            <h4 className="text-xl mb-6 border-b border-white/10 pb-3">Technologies</h4>
                            <div className="flex flex-wrap gap-2">
                                {techStack.map(t => (
                                    <span
                                        key={t}
                                        className="tech-tag px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 text-sm text-white/70"
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="mt-10">
                            <a
                                href="https://github.com/tkarthikraja44/Bank-Management-System"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 rounded-full hover:bg-purple-500 transition gpu"
                            >
                                <Github size={16} />
                                View Source Code
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default memo(BankProject);