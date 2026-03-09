import { memo, useRef, useLayoutEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2, Shield, BarChart2, ExternalLink } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// ─── Static data — outside component so arrays are never re-created ──────────
const scoreData = [
    { label: "90–100%", score: 18, color: "bg-green-500" },
    { label: "75–89%", score: 42, color: "bg-indigo-500" },
    { label: "60–74%", score: 68, color: "bg-amber-500" },
    { label: "Below 60", score: 24, color: "bg-red-500/80" },
];

const statsData = [
    { label: "Active Students", value: "142", change: "+12%" },
    { label: "Exams Today", value: "8", change: "Live" },
    { label: "Avg Score", value: "74%", change: "↑3%" },
];

const navItems = ["Exams", "Results", "Analytics", "Profile"];
const sidebarItems = ["Students", "Exams", "Analytics", "Settings"];

const features = [
    "Secure proctored exam environment",
    "Real-time analytics dashboard",
    "Role-based access (Admin / Teacher / Student)",
];
const techStack = ["React", "Supabase", "Tailwind", "Chart.js", "PostgreSQL"];

// ─── ScoreBar — memo prevents re-renders when parent state changes ────────────
const ScoreBar = memo(function ScoreBar({ label, score, color }) {
    return (
        <div className="flex items-center gap-3 text-[10px]">
            <span className="text-white/40 w-16 shrink-0 font-mono">{label}</span>
            <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                {/* width animation — uses transform internally so GPU composited */}
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: score + "%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    layout={false}
                    className={`h-full rounded-full ${color}`}
                />
            </div>
            <span className="text-white/50 w-6 text-right font-mono">{score}</span>
        </div>
    );
});

// ─── AssessmentDashboard — memo prevents re-renders ───────────────────────────
const AssessmentDashboard = memo(function AssessmentDashboard() {
    return (
        <div className="w-full h-full bg-[#08080f] rounded-xl overflow-hidden flex flex-col text-[11px] font-mono">
            {/* NAV BAR */}
            <div className="h-9 bg-[#0f0f1a] border-b border-white/5 flex items-center px-4 gap-6">
                <div className="flex gap-2 items-center">
                    <Shield size={12} className="text-indigo-400" />
                    <span className="text-white/70 font-semibold text-[11px]">AssessHub</span>
                </div>

                <div className="hidden sm:flex gap-6 text-white/30">
                    {navItems.map((n) => (
                        <span
                            key={n}
                            className={n === "Analytics" ? "text-white/80 border-b border-indigo-500 pb-0.5" : ""}
                        >
                            {n}
                        </span>
                    ))}
                </div>

                <div className="ml-auto flex items-center gap-2 bg-indigo-500/20 border border-indigo-500/30 px-3 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-indigo-300">Exam Active</span>
                </div>
            </div>

            {/* CONTENT */}
            <div className="flex flex-1 overflow-hidden">
                {/* SIDEBAR */}
                <div className="w-28 hidden sm:flex flex-col gap-1 p-3 bg-[#0d0d1a] border-r border-white/5">
                    {sidebarItems.map((label) => (
                        <div
                            key={label}
                            className={`px-2 py-2 rounded-lg text-[10px] ${label === "Exams" ? "bg-indigo-500/20 text-indigo-300" : "text-white/30"}`}
                        >
                            {label}
                        </div>
                    ))}
                </div>

                {/* MAIN */}
                <div className="flex-1 p-4 flex flex-col gap-3">
                    {/* STATS */}
                    <div className="grid grid-cols-3 gap-2">
                        {statsData.map((s) => (
                            <div key={s.label} className="bg-white/[0.03] border border-white/5 rounded-xl p-3">
                                <p className="text-white/30 text-[9px]">{s.label}</p>
                                <p className="text-white font-bold text-xl">{s.value}</p>
                                <p className="text-indigo-400 text-[9px]">{s.change}</p>
                            </div>
                        ))}
                    </div>

                    {/* CHART */}
                    <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4 flex-1">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-white/60 text-[10px] font-semibold uppercase tracking-wider">Score Distribution</span>
                            <BarChart2 size={12} className="text-indigo-400" />
                        </div>
                        <div className="space-y-2">
                            {scoreData.map((s) => (
                                <ScoreBar key={s.label} label={s.label} score={s.score} color={s.color} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

// ─── AssessmentProject — memo + GSAP context for clean animation lifecycle ────
function AssessmentProject() {
    const sectionRef = useRef(null);

    useLayoutEffect(() => {
        // gsap.context() scopes all GSAP selectors to sectionRef,
        // and ctx.revert() is called on unmount to kill all animations/ScrollTriggers
        const ctx = gsap.context(() => {
            gsap.from(".project-header > *", {
                y: 50,
                opacity: 0,
                stagger: 0.2,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    once: true,
                },
            });

            gsap.from(".project-preview", {
                scale: 1.1,
                opacity: 0,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                    once: true,
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="project-assessment"
            className="relative w-full min-h-screen flex items-center justify-center pt-40 pb-32"
        >
            <div className="max-w-7xl mx-auto px-6 w-full flex flex-col items-center">
                {/* HEADER */}
                <div className="project-header text-center mb-16 max-w-3xl gpu">
                    <span className="text-xs text-indigo-400 tracking-widest">PROJECT 01</span>
                    <h2 className="text-5xl md:text-6xl font-bold text-white mt-3">
                        Online Assessment{" "}
                        <span className="text-indigo-400">Portal.</span>
                    </h2>
                    <p className="text-white/50 mt-4">
                        Secure online exam system with real-time monitoring and analytics.
                    </p>
                </div>

                {/* PREVIEW */}
                <motion.div
                    whileHover={{ scale: 1.02, rotateX: 4, rotateY: -4 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    layout={false}
                    className="project-preview relative w-full max-w-5xl rounded-[32px] gpu"
                >
                    {/* Glow — static, promote to GPU layer */}
                    <div className="absolute -inset-32 bg-indigo-500/10 blur-[140px] pointer-events-none promote" />

                    <div className="relative rounded-[32px] border border-white/10 bg-[#08080f] shadow-[0_80px_160px_rgba(0,0,0,0.7)] overflow-hidden">
                        {/* Browser Bar */}
                        <div className="h-10 flex items-center px-4 gap-3 bg-[#0f0f1a] border-b border-white/5">
                            <div className="flex gap-2">
                                <span className="w-3 h-3 rounded-full bg-red-500" />
                                <span className="w-3 h-3 rounded-full bg-yellow-500" />
                                <span className="w-3 h-3 rounded-full bg-green-500" />
                            </div>
                            <div className="mx-auto text-[11px] text-white/40 bg-white/5 px-3 py-1 rounded-md font-mono">
                                assesshub.app
                            </div>
                        </div>

                        {/* Dashboard */}
                        <div className="h-[620px] overflow-hidden">
                            <AssessmentDashboard />
                        </div>
                    </div>
                </motion.div>

                {/* FEATURES */}
                <div className="mt-16 grid md:grid-cols-2 gap-12 max-w-5xl w-full">
                    <div className="space-y-6">
                        <h4 className="text-xl text-white">Key Capabilities</h4>
                        {features.map((f, i) => (
                            <div key={i} className="flex gap-4 items-start">
                                <CheckCircle2 className="text-indigo-400" size={18} />
                                <p className="text-white/70">{f}</p>
                            </div>
                        ))}
                    </div>

                    <div>
                        <h4 className="text-xl text-white mb-4">Technologies</h4>
                        <div className="flex flex-wrap gap-3">
                            {techStack.map((t) => (
                                <span key={t} className="px-4 py-2 bg-white/[0.05] border border-white/10 rounded-full text-white/60">
                                    {t}
                                </span>
                            ))}
                        </div>

                        <a
                            href="https://github.com/tkarthikraja44"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-full text-white"
                        >
                            <ExternalLink size={16} />
                            View Source Code
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default memo(AssessmentProject);