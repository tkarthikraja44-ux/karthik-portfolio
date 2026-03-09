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
    const isInView = useInView(containerRef, { once: true, margin: "-80px" });

    return (
        <section id="achievements" className="py-16 md:py-20 lg:py-24 relative bg-black w-full z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16" ref={containerRef}>
                <div className="mb-12 md:mb-16 md:mb-20 text-center">
                    <motion.h2
                        variants={fadeUpVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={VIEWPORT}
                        className="text-sm font-semibold tracking-widest uppercase text-white/40 mb-2"
                    >
                        Milestones
                    </motion.h2>
                    <motion.h3
                        variants={fadeUpDelayedVariants(0.1)}
                        initial="hidden"
                        whileInView="visible"
                        viewport={VIEWPORT}
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter text-white"
                    >
                        Honors &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-600">Achievements.</span>
                    </motion.h3>
                </div>

                <motion.div
                    variants={staggerContainerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 md:gap-8 max-w-5xl mx-auto"
                >
                    {achievements.map((item, idx) => (
                        <motion.div
                            key={idx}
                            variants={staggerItemVariants}
                            whileHover={{ y: -6, scale: 1.02 }}
                            transition={{ duration: 0.35, ease: "easeOut" }}
                            className="glass-card p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl overflow-hidden relative group cursor-default"
                        >
                            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500/0 via-yellow-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-2xl" />

                            <div className="relative z-10">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-5 sm:mb-6 md:mb-8">
                                    {item.icon}
                                </div>

                                <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1.5 sm:mb-2">{item.title}</h4>
                                <p className="text-sm sm:text-base md:text-lg text-white/60 font-medium mb-4 sm:mb-5 md:mb-6">{item.subtitle}</p>
                                <p className="text-white/50 leading-relaxed font-light text-sm sm:text-base">{item.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
});

export default Achievements;
