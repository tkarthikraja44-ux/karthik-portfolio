import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ExternalLink, Github, CheckCircle2, Shield, BarChart3, LayoutDashboard, AlertTriangle } from 'lucide-react';
import Button from '../ui/Button';

export default function Projects() {
    return (
        <section id="projects" className="py-32 md:py-48 relative w-full min-h-screen z-10 flex flex-col justify-center bg-transparent">
            {/* Background Gradient */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 lg:px-16 w-full">
                <div className="mb-32 text-center max-w-3xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-sm font-bold tracking-[0.3em] uppercase text-indigo-400 mb-6"
                    >
                        SELECTED WORK
                    </motion.h2>
                    <motion.h3
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="text-premium text-white"
                    >
                        Architecture at <span className="text-white/30">scale.</span>
                    </motion.h3>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="mt-8 text-xl text-white/50 font-light leading-relaxed"
                    >
                        A showcase of complex systems built with Java, React, and a focus on high-performance architecture.
                    </motion.p>
                </div>

                <div className="space-y-24 md:space-y-32">
                    {/* PROJECT 1: Bank Management System */}
                    <ProjectCard
                        id="project-banksystem"
                        title="Bank Management System"
                        category="Java Console App"
                        icon={<Shield size={24} className="text-purple-400" />}
                        description="A secure and efficient application built to handle core banking transactions via robust back-end logic, demonstrating deep understanding of Object-Oriented patterns."
                        features={['Deposit and withdrawal operations', 'Balance checking & verification', 'Model-View-Controller architecture']}
                        tags={['Java', 'OOP', 'Data Structures', 'Console UI']}
                        github="https://github.com/tkarthikraja44/Bank-Management-System"
                        accentColor="purple"
                    >
                        <motion.div
                            className="w-full max-w-sm aspect-[3/4] bg-black border border-white/10 rounded-2xl shadow-2xl relative z-10 flex flex-col overflow-hidden group-hover:scale-[1.05] group-hover:-translate-y-4 transition-all duration-700"
                        >
                            <div className="h-10 bg-[#1A1A1A] border-b border-white/10 flex items-center px-4">
                                <TerminalIcon />
                                <span className="text-white/40 text-xs font-mono ml-3 font-semibold tracking-wider">java Main</span>
                            </div>
                            <div className="p-6 font-mono text-xs md:text-sm text-green-400/80 flex flex-col gap-2">
                                <p className="text-white/50">{'>'} Initializing BankSystem...</p>
                                <p>{'>'} Connecting to local dataset [OK]</p>
                                <p className="text-white/50">{'>'} Awaiting user input:</p>
                                <div className="mt-4 space-y-2 text-white/70 pl-4 border-l-2 border-white/10">
                                    <p>1. Create Account</p>
                                    <p>2. Deposit Funds</p>
                                    <p>3. Withdraw Funds</p>
                                    <p>4. Check Balance</p>
                                </div>
                                <p className="mt-4 animate-pulse">_</p>
                            </div>
                        </motion.div>
                    </ProjectCard>

                    {/* PROJECT 2: Online Assessment Portal */}
                    <ProjectCard
                        id="project-assessment"
                        title="Online Assessment Portal"
                        category="Full-Stack Platform"
                        icon={<LayoutDashboard size={24} className="text-blue-400" />}
                        description="Built a comprehensive assessment platform with distinct dashboards for Admins, Teachers, and Students, featuring strict exam integrity and real-time analytics."
                        features={[
                            'Strict exam integrity triggers',
                            'Secure Supabase PostgreSQL backend',
                            'Interactive Chart.js analytics'
                        ]}
                        tags={['React', 'Supabase', 'Tailwind', 'Chart.js']}
                        github="#"
                        accentColor="blue"
                        reverse
                    >
                        <motion.div
                            className="w-full max-w-sm aspect-[4/3] bg-black border border-white/10 rounded-2xl shadow-2xl relative z-10 flex flex-col overflow-hidden group-hover:scale-[1.05] group-hover:-translate-y-4 transition-all duration-700"
                        >
                            <div className="h-10 bg-[#1A1A1A] border-b border-white/10 flex items-center px-4 gap-2">
                                <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
                                <span className="text-white/40 text-xs font-mono ml-3 font-medium">teacher-dashboard</span>
                            </div>
                            <div className="flex-1 p-6 flex flex-col gap-4">
                                <div className="flex justify-between items-center mb-2">
                                    <div className="h-4 w-32 bg-white/10 rounded"></div>
                                    <div className="h-6 w-16 bg-blue-500/10 rounded-full border border-blue-500/20"></div>
                                </div>
                                <div className="flex-1 border border-white/5 bg-white/[0.02] rounded-xl p-4 flex items-end gap-2 justify-between">
                                    <div className="w-full h-[40%] bg-blue-500/40 rounded-t-sm" />
                                    <div className="w-full h-[70%] bg-blue-500/60 rounded-t-sm" />
                                    <div className="w-full h-[50%] bg-blue-500/40 rounded-t-sm" />
                                    <div className="w-full h-[90%] bg-blue-500/80 rounded-t-sm" />
                                    <div className="w-full h-[60%] bg-blue-500/50 rounded-t-sm" />
                                </div>
                                <div className="mt-2 h-10 w-full bg-red-500/10 border border-red-500/20 rounded-lg flex items-center px-3 gap-2">
                                    <AlertTriangle size={14} className="text-red-400" />
                                    <div className="h-1.5 w-24 bg-red-400/30 rounded"></div>
                                </div>
                            </div>
                        </motion.div>
                    </ProjectCard>
                </div>
            </div>
        </section>
    );
}

function ProjectCard({ id, title, category, icon, description, features, tags, github, accentColor, reverse, children }) {
    const cardRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "center center"]
    });

    const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
    const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    };

    const colors = {
        purple: "hover:border-purple-500/50 hover:shadow-[0_40px_100px_rgba(168,85,247,0.15)] ring-purple-500/20",
        blue: "hover:border-blue-500/50 hover:shadow-[0_40px_100px_rgba(59,130,246,0.15)] ring-blue-500/20"
    };

    return (
        <motion.div
            id={id}
            ref={cardRef}
            style={{ scale, opacity }}
            onMouseMove={handleMouseMove}
            className={`group relative w-full rounded-[3rem] overflow-hidden bg-white/[0.02] border border-white/10 transition-all duration-700 ${colors[accentColor] || colors.purple} ring-1`}
        >
            {/* Cursor Following Glow */}
            <motion.div
                className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
                style={{
                    background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.06), transparent 40%)`
                }}
            />

            {/* Shimmer Sweep Effect */}
            <div className="absolute -inset-[100%] group-hover:inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover:animate-[shimmer_3s_infinite] pointer-events-none z-0" />

            <div className="grid grid-cols-1 lg:grid-cols-2 relative z-10">
                {/* Visual Preview */}
                <div className={`relative h-96 lg:h-auto w-full bg-transparent overflow-hidden flex items-center justify-center p-12 border-white/10 ${reverse ? 'lg:order-2 lg:border-l' : 'lg:border-r'}`}>
                    <div className={`absolute inset-0 bg-gradient-to-br from-${accentColor}-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000`} />
                    {children}
                </div>

                {/* Information */}
                <div className="p-12 lg:p-20 flex flex-col justify-center bg-black/40 backdrop-blur-3xl">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                            {icon}
                        </div>
                        <span className={`text-sm font-bold tracking-[0.2em] uppercase text-${accentColor}-400/80`}>{category}</span>
                    </div>

                    <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-8 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/50 transition-all duration-700">
                        {title}
                    </h3>

                    <p className="text-lg md:text-xl text-white/50 leading-relaxed mb-12 font-light">
                        {description}
                    </p>

                    <div className="space-y-4 mb-12">
                        {features.map((feature, i) => (
                            <div key={i} className="flex items-start text-white/70">
                                <CheckCircle2 size={20} className={`mr-4 text-${accentColor}-500/80 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-500`} />
                                <span className="text-lg font-light tracking-tight">{feature}</span>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-12">
                        {tags.map(t => (
                            <span key={t} className="px-5 py-2 bg-white/[0.03] border border-white/10 rounded-full text-[13px] font-medium text-white/60 group-hover:text-white/90 group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-500 shadow-sm">
                                {t}
                            </span>
                        ))}
                    </div>

                    <Button variant="glass" href={github} className="w-fit hover:bg-white/10 transition-all active:scale-95">
                        <Github size={18} />
                        View Source
                    </Button>
                </div>
            </div>
        </motion.div>
    );
}

const TerminalIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/40">
        <polyline points="4 17 10 11 4 5"></polyline>
        <line x1="12" y1="19" x2="20" y2="19"></line>
    </svg>
)
