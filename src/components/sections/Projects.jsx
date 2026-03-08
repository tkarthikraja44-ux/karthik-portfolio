import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ExternalLink, Github, CheckCircle2, Shield, BarChart3, LayoutDashboard, AlertTriangle } from 'lucide-react';
import Button from '../ui/Button';

export default function Projects() {
    const card1Ref = useRef(null);
    const card2Ref = useRef(null);

    const { scrollYProgress: scroll1 } = useScroll({
        target: card1Ref,
        offset: ["start end", "center center"]
    });

    const { scrollYProgress: scroll2 } = useScroll({
        target: card2Ref,
        offset: ["start end", "center center"]
    });

    const scale1 = useTransform(scroll1, [0, 1], [0.95, 1]);
    const opacity1 = useTransform(scroll1, [0, 1], [0.3, 1]);

    const scale2 = useTransform(scroll2, [0, 1], [0.95, 1]);
    const opacity2 = useTransform(scroll2, [0, 1], [0.3, 1]);

    return (
        <section id="projects" className="py-20 relative w-full min-h-screen z-10 flex flex-col justify-center">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
                <div className="mb-24 text-center max-w-3xl mx-auto">
                    <h2 className="text-sm font-semibold tracking-widest uppercase text-white/40 mb-3">Core Application</h2>
                    <h3 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white">
                        Architecture at <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">scale.</span>
                    </h3>
                    <p className="mt-6 text-xl text-white/50 font-light">
                        Vercel-style component showcase highlighting complex Java OOP architecture and console data control.
                    </p>
                </div>

                <motion.div
                    ref={card1Ref}
                    style={{ scale: scale1, opacity: opacity1 }}
                    whileHover={{ y: -15, scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="group relative w-full rounded-[2.5rem] lg:rounded-[3rem] overflow-hidden bg-[#0A0A0A] border border-white/10 transition-colors duration-500 hover:border-purple-500/70 hover:shadow-[0_40px_120px_rgba(168,85,247,0.25)] ring-1 ring-white/5"
                >
                    {/* Vercel Style Ambient Top Glow */}
                    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        {/* Visual Preview */}
                        <div className="relative h-64 md:h-96 lg:h-auto w-full bg-[#111] overflow-hidden flex items-center justify-center p-6 lg:p-16 border-b lg:border-b-0 lg:border-r border-white/10">

                            {/* Radial gradient background */}
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent opacity-50 transition-opacity duration-700 group-hover:opacity-100" />

                            <motion.div
                                className="w-full max-w-sm aspect-[3/4] bg-black border border-white/10 rounded-2xl shadow-2xl relative z-10 flex flex-col overflow-hidden group-hover:scale-[1.02] group-hover:-translate-y-2 transition-transform duration-700"
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
                        </div>

                        {/* Information */}
                        <div className="p-8 lg:p-16 flex flex-col justify-center relative bg-black/40">

                            <div className="flex items-center gap-3 mb-6">
                                <Shield size={24} className="text-purple-400" />
                                <span className="text-sm font-semibold tracking-wider uppercase text-purple-400/80">Java Console App</span>
                            </div>

                            <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
                                Bank Management System
                            </h3>

                            <p className="text-white/60 leading-relaxed mb-10 text-xl font-light">
                                A secure and efficient application built to handle core banking transactions via robust back-end logic, demonstrating deep understanding of Object-Oriented patterns.
                            </p>

                            <div className="mb-12">
                                <h4 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-6">Core Capabilities</h4>
                                <div className="space-y-4">
                                    {['Deposit and withdrawal operations', 'Balance checking & verification', 'Model-View-Controller architecture'].map((feature, i) => (
                                        <div key={i} className="flex items-start text-white/70">
                                            <CheckCircle2 size={20} className="mr-4 text-purple-500/80 flex-shrink-0" />
                                            <span className="font-light text-lg">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-3 mb-12">
                                {['Java', 'OOP', 'Data Structures', 'Console UI'].map(t => (
                                    <span key={t} className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm font-medium text-white/80">
                                        {t}
                                    </span>
                                ))}
                            </div>

                            <div className="mt-auto">
                                <Button variant="glass" href="https://github.com/tkarthikraja44/Bank-Management-System" className="w-fit hover:bg-white/10 hover:text-white group">
                                    <Github size={18} className="group-hover:scale-110 transition-transform" />
                                    View Repository
                                </Button>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* PROJECT 2: Online Assessment Portal */}
                <motion.div
                    ref={card2Ref}
                    style={{ scale: scale2, opacity: opacity2 }}
                    whileHover={{ y: -15, scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="group relative w-full rounded-[2.5rem] lg:rounded-[3rem] overflow-hidden bg-[#0A0A0A] border border-white/10 transition-colors duration-500 hover:border-blue-500/70 hover:shadow-[0_40px_120px_rgba(59,130,246,0.25)] ring-1 ring-white/5 mt-16"
                >
                    {/* Vercel Style Ambient Top Glow */}
                    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        {/* Information - Left Side for Alternating Layout */}
                        <div className="p-8 lg:p-16 flex flex-col justify-center relative bg-black/40 order-2 lg:order-1 border-t lg:border-t-0 lg:border-r border-white/10">

                            <div className="flex items-center gap-3 mb-6">
                                <LayoutDashboard size={24} className="text-blue-400" />
                                <span className="text-sm font-semibold tracking-wider uppercase text-blue-400/80">Full-Stack Platform</span>
                            </div>

                            <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
                                Online Assessment Portal
                            </h3>

                            <p className="text-white/60 leading-relaxed mb-10 text-xl font-light">
                                Built a comprehensive assessment platform with distinct dashboards for Admins, Teachers, and Students, featuring strict exam integrity and real-time analytics.
                            </p>

                            <div className="mb-12">
                                <h4 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-6">Key Features</h4>
                                <div className="space-y-4">
                                    {[
                                        'Strict exam integrity (tab-switching detection, clipboard locking)',
                                        'Secure data via Supabase PostgreSQL & RLS',
                                        'Interactive Chart.js analytics for performance tracking'
                                    ].map((feature, i) => (
                                        <div key={i} className="flex items-start text-white/70">
                                            <CheckCircle2 size={20} className="mr-4 text-blue-500/80 flex-shrink-0" />
                                            <span className="font-light text-lg">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-3 mb-12">
                                {['React', 'Supabase', 'Tailwind', 'Chart.js'].map(t => (
                                    <span key={t} className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm font-medium text-white/80">
                                        {t}
                                    </span>
                                ))}
                            </div>

                            <div className="mt-auto">
                                <Button variant="glass" href="#" className="w-fit hover:bg-white/10 hover:text-white group">
                                    <Github size={18} className="group-hover:scale-110 transition-transform" />
                                    View Repository
                                </Button>
                            </div>
                        </div>

                        {/* Visual Preview - Right Side */}
                        <div className="relative h-64 md:h-96 lg:h-auto w-full bg-[#111] overflow-hidden flex items-center justify-center p-6 lg:p-16 order-1 lg:order-2">

                            {/* Radial gradient background */}
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent opacity-50 transition-opacity duration-700 group-hover:opacity-100" />

                            <motion.div
                                className="w-full max-w-sm aspect-[4/3] bg-black border border-white/10 rounded-2xl shadow-2xl relative z-10 flex flex-col overflow-hidden group-hover:scale-[1.02] group-hover:-translate-y-2 transition-transform duration-700"
                            >
                                <div className="h-10 bg-[#1A1A1A] border-b border-white/10 flex items-center px-4 gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                                    <span className="text-white/40 text-xs font-mono ml-3 font-medium">teacher-dashboard</span>
                                </div>
                                <div className="flex-1 p-6 flex flex-col gap-4">
                                    {/* Mock Header */}
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="h-4 w-32 bg-white/20 rounded"></div>
                                        <div className="h-6 w-16 bg-blue-500/20 rounded-full border border-blue-500/30"></div>
                                    </div>

                                    {/* Mock Chart Area */}
                                    <div className="flex-1 border border-white/5 bg-white/[0.02] rounded-xl p-4 flex items-end gap-2 justify-between">
                                        <div className="w-full h-[40%] bg-blue-500/40 rounded-t-sm" />
                                        <div className="w-full h-[70%] bg-blue-500/60 rounded-t-sm" />
                                        <div className="w-full h-[50%] bg-blue-500/40 rounded-t-sm" />
                                        <div className="w-full h-[90%] bg-blue-500/80 rounded-t-sm" />
                                        <div className="w-full h-[60%] bg-blue-500/50 rounded-t-sm" />
                                        <div className="w-full h-[80%] bg-blue-500/70 rounded-t-sm" />
                                    </div>

                                    {/* Integrity Warning Mock */}
                                    <div className="mt-2 h-10 w-full bg-red-500/10 border border-red-500/20 rounded-lg flex items-center px-3 gap-2">
                                        <AlertTriangle size={14} className="text-red-400" />
                                        <div className="h-2 w-24 bg-red-400/50 rounded"></div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

const TerminalIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/40">
        <polyline points="4 17 10 11 4 5"></polyline>
        <line x1="12" y1="19" x2="20" y2="19"></line>
    </svg>
)
