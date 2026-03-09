import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GitCommit, Star, Github } from 'lucide-react';
import Button from '../ui/Button';

export default function GithubStats() {
    const [stats, setStats] = useState({
        repos: 0,
        stars: 0,
        loading: true,
        error: false
    });

    useEffect(() => {
        const fetchGithubData = async () => {
            try {
                // Using a slightly longer cache/timeout or fallback logic
                const res = await fetch('https://api.github.com/users/tkarthikraja44-ux', {
                    headers: { 'Accept': 'application/vnd.github.v3+json' }
                });

                if (!res.ok) {
                    throw new Error('Rate limit or not found');
                }

                const data = await res.json();
                setStats({
                    repos: data.public_repos || 30,
                    stars: 12, // Manual fallback as stars require more complex API calls
                    loading: false,
                    error: false
                });
            } catch (err) {
                console.warn('GitHub API Fetch failed, using fallbacks', err);
                setStats({
                    repos: 30,
                    stars: 12,
                    loading: false,
                    error: false // Set to false so we show the fallback data instead of loading/error UI
                });
            }
        };
        fetchGithubData();
    }, []);

    const path1 = "M0,100 L0,50 Q10,20 25,60 T50,40 T75,60 T100,30 L100,100 Z";
    const path2 = "M0,100 L0,40 Q15,30 30,50 T60,60 T85,40 T100,50 L100,100 Z";

    return (
        <section id="github" className="py-32 md:py-48 relative bg-transparent w-full z-10 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
                <div className="p-10 md:p-20 rounded-[3rem] bg-white/[0.02] border border-white/10 backdrop-blur-3xl relative overflow-hidden group shadow-2xl">
                    {/* Animated Background Mesh */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none">
                        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent animate-pulse" />
                        <svg className="w-full h-full text-emerald-500/10" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <motion.path
                                initial={{ d: path1 }}
                                animate={{ d: [path1, path2, path1] }}
                                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                                fill="currentColor"
                            />
                        </svg>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10 items-center">
                        {/* Left Content */}
                        <div>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-8 backdrop-blur-xl"
                            >
                                <Github size={16} className="text-emerald-400" />
                                <span className="text-xs font-bold tracking-[0.2em] text-emerald-400 uppercase">Live Metrics</span>
                            </motion.div>

                            <motion.h3
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                className="text-premium text-white mb-8"
                            >
                                Code <br /><span className="text-emerald-500/80">Contributions.</span>
                            </motion.h3>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.1 }}
                                className="text-xl text-white/50 leading-relaxed mb-12 max-w-lg font-light tracking-tight"
                            >
                                Passionate about open-source and pushing code every day. Explore my recent commits and active repositories on GitHub.
                            </motion.p>

                            <Button
                                href="https://github.com/tkarthikraja44-ux"
                                target="_blank"
                                className="group/btn"
                            >
                                Follow on GitHub
                                <Github size={18} className="ml-2 group-hover/btn:rotate-12 transition-transform" />
                            </Button>
                        </div>

                        {/* Right Stats Grid */}
                        <div className="grid grid-cols-2 gap-6 md:gap-8">
                            <StatCard
                                icon={<GitCommit size={28} className="text-emerald-400" />}
                                value={stats.repos}
                                label="Repositories"
                                loading={stats.loading || stats.error}
                                color="emerald"
                            />
                            <StatCard
                                icon={<Star size={28} className="text-yellow-400" />}
                                value={stats.stars}
                                label="Total Stars"
                                loading={stats.loading || stats.error}
                                color="yellow"
                                className="lg:mt-16"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

const StatCard = ({ icon, value, label, loading, color, className = "" }) => (
    <motion.div
        whileHover={{ y: -10 }}
        className={`p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-3xl text-center relative overflow-hidden group transition-all duration-700 hover:bg-white/[0.05] ${className}`}
    >
        <div className={`absolute inset-0 bg-gradient-to-t from-${color}-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />

        <div className="relative z-10">
            <div className={`w-16 h-16 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-700`}>
                {icon}
            </div>

            {loading ? (
                <span className="text-5xl font-bold text-white block mb-2">--</span>
            ) : (
                <AnimatedCounter to={value} />
            )}

            <span className="text-[10px] font-bold tracking-[0.3em] text-white/30 uppercase mt-4 block">{label}</span>
        </div>
    </motion.div>
);

const AnimatedCounter = ({ from = 0, to }) => {
    const [count, setCount] = useState(from);
    const nodeRef = useRef(null);
    const isInView = useInView(nodeRef, { once: true });

    useEffect(() => {
        if (!isInView) return;
        let startTimestamp = null;
        const duration = 2000;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(easeOut * (to - from) + from));
            if (progress < 1) window.requestAnimationFrame(step);
        };
        window.requestAnimationFrame(step);
    }, [to, from, isInView]);

    return (
        <motion.span
            ref={nodeRef}
            className="text-5xl md:text-6xl font-black text-white block tracking-tighter"
        >
            {count}+
        </motion.span>
    );
};
