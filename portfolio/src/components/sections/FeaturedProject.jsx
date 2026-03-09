import { memo, useRef, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2, Download, ExternalLink, FileText } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ─── Static data — outside component, never re-created per render ─────────────
const features = [
    'Upload and share study notes effortlessly',
    'Organized by subject and academic year',
    'Download content with one seamless click',
];
const techStack = ['React', 'JavaScript', 'HTML/CSS', 'Node.js Backend'];

const sidebarItems = [
    { icon: '🏠', label: 'Dashboard', active: false },
    { icon: '📤', label: 'Upload Notes', active: false },
    { icon: '📚', label: 'Subjects', active: true },
    { icon: '🔗', label: 'Shared Notes', active: false },
    { icon: '⚙️', label: 'Settings', active: false },
];
const statsItems = [
    { label: 'Notes Shared', val: '248', color: 'text-blue-400' },
    { label: 'Students', val: '1.2k', color: 'text-green-400' },
    { label: 'Downloads', val: '4.8k', color: 'text-purple-400' },
];
const noteCards = [
    { title: "Data Structures – Complete Notes", subject: "CS301", date: "Mar 5, 2026", downloads: "142", delay: 0.1 },
    { title: "Java Programming – Unit 2", subject: "CS204", date: "Feb 28, 2026", downloads: "98", delay: 0.2 },
    { title: "Operating Systems – Module 4", subject: "CS302", date: "Feb 20, 2026", downloads: "67", delay: 0.3 },
];

// ─── NoteCard — memo prevents re-render when parent animates ─────────────────
const NoteCard = memo(function NoteCard({ title, subject, date, downloads, delay }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            layout={false}
            className="flex items-center gap-3 p-3 bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 rounded-xl cursor-default transition-colors group gpu"
        >
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                <FileText size={16} className="text-blue-400" />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-white/80 text-[11px] font-semibold truncate">{title}</p>
                <p className="text-white/30 text-[9px] mt-0.5">{subject} · {date}</p>
            </div>
            <div className="flex items-center gap-1.5 bg-blue-500/10 rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                <Download size={10} className="text-blue-400" />
                <span className="text-blue-300 text-[9px]">{downloads}</span>
            </div>
        </motion.div>
    );
});

// ─── PeerNotesDashboard — memo prevents re-renders ───────────────────────────
const PeerNotesDashboard = memo(function PeerNotesDashboard() {
    return (
        <div className="w-full h-full bg-[#050510] rounded-xl md:rounded-2xl overflow-hidden flex flex-col text-[11px] font-mono select-none">
            {/* Mac chrome */}
            <div className="h-9 bg-[#0c0c1a] border-b border-white/5 flex items-center px-4 gap-3 shrink-0">
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="mx-auto bg-white/5 rounded-md px-3 py-1 text-white/25 text-[10px]">
                    peernotes.app
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <div className="w-32 hidden sm:flex flex-col gap-0.5 p-2 bg-[#080816] border-r border-white/5 shrink-0">
                    <div className="px-2 py-2 mb-1">
                        <p className="text-white/40 text-[9px] font-semibold tracking-widest uppercase">PeerNotes</p>
                    </div>
                    {sidebarItems.map(item => (
                        <div
                            key={item.label}
                            className={`flex items-center gap-2 px-2 py-2 rounded-lg text-[10px] cursor-default ${item.active ? 'bg-blue-500/20 text-blue-300' : 'text-white/30 hover:bg-white/5'}`}
                        >
                            <span>{item.icon}</span>
                            <span>{item.label}</span>
                        </div>
                    ))}
                </div>

                {/* Main area */}
                <div className="flex-1 p-3 sm:p-4 overflow-hidden flex flex-col gap-3">
                    {/* Search/header bar */}
                    <div className="flex items-center gap-2">
                        <div className="flex-1 bg-white/5 border border-white/5 rounded-lg px-3 py-2 text-white/20 text-[10px]">🔍 Search notes...</div>
                        <button className="bg-blue-500/20 border border-blue-500/30 text-blue-300 text-[10px] px-3 py-2 rounded-lg whitespace-nowrap">Upload Note</button>
                    </div>

                    <p className="text-white/30 text-[9px] uppercase tracking-widest font-semibold">Recent Notes</p>

                    {/* Note Cards */}
                    <div className="space-y-2 overflow-hidden">
                        {noteCards.map(card => (
                            <NoteCard key={card.title} {...card} />
                        ))}
                    </div>

                    {/* Stats row */}
                    <div className="grid grid-cols-3 gap-2 mt-auto">
                        {statsItems.map(s => (
                            <div key={s.label} className="bg-white/[0.03] border border-white/5 rounded-xl p-2 text-center">
                                <p className={`font-bold text-lg leading-none ${s.color}`}>{s.val}</p>
                                <p className="text-white/25 text-[8px] mt-1">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
});

// ─── FeaturedProject — memo + GSAP context for clean lifecycle ────────────────
function FeaturedProject() {
    const sectionRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    toggleActions: "play none none reverse",
                    once: true,
                }
            });

            // Set initial states
            gsap.set(".project-header > *", { y: 50, opacity: 0 });
            gsap.set(".project-preview", { scale: 1.05, opacity: 0 });
            gsap.set(".project-features .feature-item", { y: 30, opacity: 0 });
            gsap.set(".project-tech .tech-tag", { y: 20, opacity: 0 });
            gsap.set(".project-buttons > *", { y: 20, opacity: 0 });

            tl.to(".project-header > *", { y: 0, opacity: 1, duration: 0.9, stagger: 0.2, ease: "power3.out" })
                .to(".project-preview", { scale: 1, opacity: 1, duration: 1.4, ease: "power3.out" }, "-=0.2")
                .to(".project-features .feature-item", { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" }, "-=0.6")
                .to(".project-tech .tech-tag", { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: "power3.out" }, "-=0.4")
                .to(".project-buttons > *", { y: 0, opacity: 1, duration: 0.8, ease: "none" }, "-=0.2");
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="project-peernotes"
            className="relative w-full min-h-screen flex items-center justify-center z-10 pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden"
        >
            {/* Ambient Background Glow — static, promote to GPU layer */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-2xl max-h-2xl bg-blue-800/10 rounded-full blur-[140px] pointer-events-none hidden md:block promote" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full flex flex-col items-center">
                {/* Header */}
                <div className="project-header text-center mb-12 lg:mb-16 max-w-4xl mx-auto flex flex-col items-center gpu">
                    <span className="inline-block text-xs font-semibold tracking-widest uppercase text-blue-400/80 border border-blue-500/20 bg-blue-500/5 px-4 py-1.5 rounded-full mb-4 backdrop-blur-md">
                        PROJECT 02
                    </span>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-white leading-tight mb-5">
                        PeerNotes <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Platform.</span>
                    </h2>
                    <p className="text-base md:text-lg text-white/50 font-light max-w-2xl leading-relaxed">
                        A modern ecosystem for students to discover, share, and seamlessly access academic notes and resources.
                    </p>
                </div>

                {/* Preview */}
                <div className="project-preview w-full max-w-5xl rounded-[1.5rem] md:rounded-[2rem] shadow-[0_40px_100px_rgba(59,130,246,0.15)] aspect-[16/10] md:aspect-[21/9] mb-16 lg:mb-24 relative group gpu">
                    <div className="absolute -inset-px bg-gradient-to-br from-blue-500/20 to-cyan-500/10 rounded-[1.5rem] md:rounded-[2rem] blur-sm opacity-60 group-hover:opacity-100 transition-opacity duration-700 promote" />
                    <div className="relative h-full w-full glass-card rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border border-white/10 bg-[#050510]/95 transition-colors duration-500 group-hover:border-blue-500/30">
                        <div className="flex-1 overflow-hidden h-full">
                            <PeerNotesDashboard />
                        </div>
                    </div>
                </div>

                {/* Bottom section */}
                <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-start">
                    {/* Features */}
                    <div className="project-features space-y-6">
                        <h4 className="text-xl font-medium text-white tracking-tight feature-item mb-2 border-b border-white/5 pb-4">Key Capabilities</h4>
                        {features.map((f, i) => (
                            <div key={i} className="feature-item flex items-start gap-4">
                                <div className="w-10 h-10 shrink-0 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                                    <CheckCircle2 size={18} className="text-blue-400" />
                                </div>
                                <p className="text-white/70 text-base font-light leading-snug pt-2">{f}</p>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-12">
                        {/* Tech Stack */}
                        <div className="project-tech">
                            <h4 className="text-xl font-medium text-white tracking-tight tech-tag mb-6 border-b border-white/5 pb-4">Technologies</h4>
                            <div className="flex flex-wrap gap-2">
                                {techStack.map(t => (
                                    <span key={t} className="tech-tag px-4 py-2 bg-white/[0.03] border border-white/10 rounded-full text-sm font-medium text-white/60 hover:text-white transition-colors">{t}</span>
                                ))}
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="project-buttons flex flex-wrap gap-4">
                            <a
                                href="https://github.com/tkarthikraja44/Peernotes"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full text-sm font-medium transition-all duration-300 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] gpu hover:-translate-y-1"
                            >
                                <ExternalLink size={16} />
                                View Source Code
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default memo(FeaturedProject);
