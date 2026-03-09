import { useRef, memo } from 'react';
import { motion, useInView } from 'framer-motion';
import { Trophy, Award } from 'lucide-react';
import { fadeUpVariants, fadeUpDelayedVariants, staggerContainerVariants, staggerItemVariants, VIEWPORT } from '../../hooks/useScrollReveal';

const achievements = [
    {
        title: "Oracle Certified Professional",
        subtitle: "Java SE 17 Developer",
        icon: <Trophy size={28} className="text-yellow-400" />,
        description: "Achieved the prestigious OCP Java SE 17 certification, demonstrating advanced proficiency in Java language features, APIs, and modern programming practices."
    },
    {
        title: "LeetCode Problem Solver",
        subtitle: "Active Contributor & Practitioner",
        icon: <Award size={28} className="text-orange-400" />,
        description: "Consistently solving complex algorithmic challenges and data structure problems to enhance problem-solving skills and code efficiency."
    }
];

const Achievements = memo(function Achievements() {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });

    return (
        <section id="achievements" className="py-32 md:py-48 relative bg-transparent w-full z-10 overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-yellow-500/5 rounded-full blur-[160px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16" ref={containerRef}>
                <div className="mb-24 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-sm font-bold tracking-[0.3em] uppercase text-yellow-500/80 mb-6"
                    >
                        MILESTONES
                    </motion.h2>
                    <motion.h3
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="text-premium text-white"
                    >
                        Honors & <span className="text-white/30">Achievements.</span>
                    </motion.h3>
                </div>

                <motion.div
                    variants={staggerContainerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
                >
                    {achievements.map((item, idx) => (
                        <motion.div
                            key={idx}
                            variants={staggerItemVariants}
                            whileHover={{ y: -10 }}
                            className="p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-3xl relative group overflow-hidden transition-all duration-700 hover:bg-white/[0.05] hover:border-yellow-500/20"
                        >
                            {/* Inner Shimmer */}
                            <div className="absolute -inset-[100%] group-hover:inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover:animate-[shimmer_3s_infinite] pointer-events-none" />

                            <div className="relative z-10 flex flex-col items-center text-center">
                                <motion.div
                                    animate={{ y: [0, -4, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="w-20 h-20 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center mb-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 ease-out shadow-2xl"
                                >
                                    <div className="absolute inset-0 bg-yellow-500/5 blur-xl group-hover:bg-yellow-500/20 transition-colors" />
                                    <div className="relative z-10">{item.icon}</div>
                                </motion.div>

                                <h4 className="text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-yellow-400 transition-colors duration-500">{item.title}</h4>
                                <p className="text-sm font-bold tracking-[0.2em] text-white/30 mb-8 uppercase px-4 py-1.5 rounded-full border border-white/5 bg-white/[0.02]">
                                    {item.subtitle}
                                </p>
                                <p className="text-lg text-white/50 leading-relaxed font-light tracking-tight italic">
                                    "{item.description}"
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
});

export default Achievements;
