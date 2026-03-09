import { useRef, memo } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { fadeUpVariants, fadeUpDelayedVariants, VIEWPORT } from '../../hooks/useScrollReveal';

const educationData = [
    {
        degree: "B.Tech Computer Technology",
        institution: "Bannari Amman Institute of Technology",
        period: "2023 - 2027",
        score: "CGPA: 7.23"
    },
    {
        degree: "Diploma - Computer Science Engineering",
        institution: "Sri Krishna Polytechnic College",
        period: "2021 - 2024",
        score: "Percentage: 68%"
    }
];

const Education = memo(function Education() {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const lineHeight = useTransform(scrollYProgress, [0.1, 0.5], ["0%", "100%"]);
    const opacityLine = useTransform(scrollYProgress, [0.1, 0.2], [0, 1]);

    return (
        <section id="education" ref={sectionRef} className="py-32 md:py-48 relative bg-transparent w-full z-10 overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
                <div className="mb-24 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-sm font-bold tracking-[0.3em] uppercase text-purple-400 mb-6"
                    >
                        ACADEMIC FOUNDATION
                    </motion.h2>
                    <motion.h3
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="text-premium text-white"
                    >
                        Success through <span className="text-white/30">excellence.</span>
                    </motion.h3>
                </div>

                <div className="relative max-w-5xl mx-auto">
                    {/* Animated timeline line */}
                    <div className="absolute left-1/2 -ml-px top-0 bottom-0 w-px bg-white/5 hidden md:block">
                        <motion.div
                            className="w-px bg-gradient-to-b from-purple-500 via-indigo-500 to-transparent shadow-[0_0_20px_rgba(168,85,247,0.5)]"
                            style={{ height: lineHeight, opacity: opacityLine }}
                        />
                    </div>

                    <div className="space-y-16">
                        {educationData.map((edu, idx) => (
                            <TimelineItem
                                key={idx}
                                edu={edu}
                                index={idx}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
});

const TimelineItem = memo(function TimelineItem({ edu, index }) {
    const itemRef = useRef(null);
    const isInView = useInView(itemRef, { once: true, margin: "-100px" });
    const isEven = index % 2 === 0;

    return (
        <motion.div
            ref={itemRef}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
            className={`relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24 group ${isEven ? '' : 'md:flex-row-reverse'}`}
        >
            {/* Desktop Label */}
            <div className={`hidden md:flex flex-col justify-center ${isEven ? 'items-end pr-4' : 'items-start pl-4 order-2'}`}>
                <span className="font-mono text-sm font-bold tracking-[0.2em] text-purple-400/60 group-hover:text-purple-400 transition-colors duration-500">{edu.period}</span>
                <span className="text-white/30 text-xs font-medium tracking-wider group-hover:text-white/50 transition-colors duration-500 mt-2 uppercase">{edu.institution}</span>
            </div>

            {/* Node */}
            <div className="absolute left-1/2 -ml-2.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-2 border-white/10 bg-black z-20 hidden md:flex items-center justify-center group-hover:scale-125 group-hover:border-purple-500 transition-all duration-500">
                <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-purple-500 transition-colors duration-500" />
            </div>

            {/* Card */}
            <div className={`w-full ${isEven ? '' : 'order-1'}`}>
                <motion.div
                    whileHover={{ x: isEven ? 10 : -10 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="p-8 md:p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-3xl transition-all duration-700 hover:bg-white/[0.05] hover:border-white/20 relative overflow-hidden"
                >
                    <div className="absolute -inset-[100%] group-hover:inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent -translate-x-full group-hover:animate-[shimmer_3s_infinite] pointer-events-none" />

                    <div className="md:hidden flex flex-col mb-6">
                        <span className="font-mono text-xs font-bold tracking-[0.2em] text-purple-400 mb-2">{edu.period}</span>
                        <span className="text-white/40 text-[10px] font-bold tracking-widest uppercase">{edu.institution}</span>
                    </div>

                    <h4 className="text-2xl font-bold text-white mb-6 tracking-tight group-hover:text-purple-400 transition-colors">{edu.degree}</h4>

                    <div className="flex items-center gap-4">
                        <div className="h-px flex-1 bg-white/10" />
                        <span className="px-5 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-bold tracking-wider">
                            {edu.score}
                        </span>
                        <div className="h-px flex-1 bg-white/10" />
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
});

export default Education;
