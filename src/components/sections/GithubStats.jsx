import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GitCommit, Star, Github } from 'lucide-react';
import Button from '../ui/Button';
import { fadeUpVariants, fadeUpDelayedVariants, VIEWPORT } from '../../hooks/useScrollReveal';

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

                const res = await fetch('https://api.github.com/users/tkarthikraja44-ux');

                if (!res.ok) throw new Error('Failed to fetch');

                const data = await res.json();

                setStats({
                    repos: data.public_repos,
                    stars: 12,
                    loading: false,
                    error: false
                });

            } catch (err) {

                setStats({
                    repos: 30,
                    stars: 12,
                    loading: false,
                    error: true
                });

            }

        };

        fetchGithubData();

    }, []);

    return (

        <section
            id="github"
            className="py-16 sm:py-20 md:py-24 lg:py-32 relative bg-transparent w-full z-10"
        >

            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16">

                <div className="glass-card rounded-[1.5rem] sm:rounded-[2.5rem] lg:rounded-[3rem] p-6 sm:p-8 md:p-12 lg:p-16 relative overflow-hidden border border-white/5 bg-[#0A0A0A] shadow-2xl">

                    {/* Background Graphic */}

                    <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden mix-blend-screen">

                        <svg
                            className="w-full h-full text-green-500/20"
                            viewBox="0 0 100 100"
                            preserveAspectRatio="none"
                        >
                            <path
                                d="M0,100 L0,50 Q10,20 25,60 T50,40 T75,60 T100,30 L100,100 Z"
                                fill="currentColor"
                            />
                        </svg>

                    </div>

                    <div className="absolute top-[-20%] right-[-10%] w-[300px] sm:w-[400px] lg:w-[500px] h-[300px] sm:h-[400px] lg:h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 md:gap-16 relative z-10 items-center">

                        {/* LEFT SIDE */}

                        <div className="flex flex-col">

                            <motion.div
                                variants={fadeUpVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={VIEWPORT}
                                className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-white/5 border border-white/10 w-fit mb-6 sm:mb-8 backdrop-blur-md"
                            >

                                <Github size={15} className="text-white/70" />

                                <span className="text-xs sm:text-sm font-medium text-white/70">
                                    Live Metrics
                                </span>

                            </motion.div>

                            <motion.h3
                                variants={fadeUpDelayedVariants(0.1)}
                                initial="hidden"
                                whileInView="visible"
                                viewport={VIEWPORT}
                                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tighter text-white mb-4 sm:mb-6"
                            >

                                Code <br />

                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
                                    Contributions.
                                </span>

                            </motion.h3>

                            <motion.p
                                variants={fadeUpDelayedVariants(0.2)}
                                initial="hidden"
                                whileInView="visible"
                                viewport={VIEWPORT}
                                className="text-sm sm:text-base md:text-xl text-white/50 leading-relaxed mb-6 sm:mb-10 max-w-lg font-light"
                            >

                                Passionate about open-source and pushing code every day.
                                Check out my GitHub for recent commits, repositories, and
                                learning resources.

                            </motion.p>

                            <Button
                                href="https://github.com/tkarthikraja44-ux"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full sm:w-fit min-h-[48px]"
                            >
                                Follow on GitHub
                            </Button>

                        </div>


                        {/* RIGHT SIDE STATS */}

                        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8">

                            {/* REPOSITORIES */}

                            <motion.div
                                whileHover={{ y: -6, scale: 1.02 }}
                                transition={{ duration: 0.35, ease: "easeOut" }}
                                className="bg-[#111] border border-white/5 rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-10 flex flex-col items-center justify-center text-center shadow-[0_20px_40px_rgba(0,0,0,0.5)] backdrop-blur-md hover:bg-[#151515] transition-colors duration-500 relative overflow-hidden group cursor-default"
                            >

                                <div className="absolute inset-0 bg-gradient-to-t from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                <GitCommit
                                    size={24}
                                    className="text-emerald-400 mb-4 sm:mb-6 relative z-10 group-hover:scale-110 transition-transform"
                                />

                                {stats.loading || stats.error ? (
                                    <span className="text-3xl sm:text-4xl md:text-6xl font-bold text-white block mb-2">
                                        --
                                    </span>
                                ) : (
                                    <AnimatedCounter to={stats.repos} />
                                )}

                                <span className="text-white/40 font-semibold text-[10px] sm:text-xs tracking-widest uppercase mt-2">
                                    Repositories
                                </span>

                            </motion.div>


                            {/* STARS */}

                            <motion.div
                                whileHover={{ y: -6, scale: 1.02 }}
                                transition={{ duration: 0.35, ease: "easeOut" }}
                                className="bg-[#111] border border-white/5 rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-10 flex flex-col items-center justify-center text-center shadow-[0_20px_40px_rgba(0,0,0,0.5)] backdrop-blur-md hover:bg-[#151515] transition-colors duration-500 relative overflow-hidden group cursor-default lg:mt-16"
                            >

                                <div className="absolute inset-0 bg-gradient-to-t from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                <Star
                                    size={24}
                                    className="text-yellow-400 mb-4 sm:mb-6 relative z-10 group-hover:scale-110 transition-transform"
                                />

                                {stats.loading || stats.error ? (
                                    <span className="text-3xl sm:text-4xl md:text-6xl font-bold text-white block mb-2">
                                        --
                                    </span>
                                ) : (
                                    <AnimatedCounter to={stats.stars} />
                                )}

                                <span className="text-white/40 font-semibold text-[10px] sm:text-xs tracking-widest uppercase mt-2">
                                    Total Stars
                                </span>

                            </motion.div>

                        </div>

                    </div>

                </div>

            </div>

        </section>

    );

}


/* COUNTER */

const AnimatedCounter = ({ from = 0, to }) => {

    const [count, setCount] = useState(from);

    useEffect(() => {

        let startTimestamp = null;
        const duration = 2500;

        const step = (timestamp) => {

            if (!startTimestamp) startTimestamp = timestamp;

            const progress = Math.min((timestamp - startTimestamp) / duration, 1);

            const easeOut = 1 - Math.pow(1 - progress, 4);

            setCount(Math.floor(easeOut * (to - from) + from));

            if (progress < 1) {
                window.requestAnimationFrame(step);
            }

        };

        window.requestAnimationFrame(step);

    }, [to, from]);

    return (

        <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-6xl font-bold text-white block mb-0 relative z-10 tracking-tighter"
        >
            {count}+
        </motion.span>

    );

};