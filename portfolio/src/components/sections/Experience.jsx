import { useRef, memo } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { fadeUpVariants, fadeUpDelayedVariants, VIEWPORT } from '../../hooks/useScrollReveal';

const Experience = memo(function Experience() {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const lineHeight = useTransform(scrollYProgress, [0.1, 0.5], ["0%", "100%"]);
    const opacityLine = useTransform(scrollYProgress, [0.1, 0.2], [0, 1]);

    return (
        <section id="experience" ref={sectionRef} className="py-32 md:py-48 relative bg-transparent w-full z-10 overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
                <div className="mb-24 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-sm font-bold tracking-[0.3em] uppercase text-indigo-400 mb-6"
                    >
                        THE JOURNEY
                    </motion.h2>
                    <motion.h3
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="text-premium text-white"
                    >
                        Professional <span className="text-white/30">Journey.</span>
                    </motion.h3>
                </div>

                <div className="relative max-w-5xl mx-auto">
                    {/* Animated timeline line */}
                    <div className="absolute left-1/2 -ml-px top-0 bottom-0 w-px bg-white/5 hidden md:block">
                        <motion.div
                            className="w-px bg-gradient-to-b from-indigo-500 via-purple-500 to-transparent shadow-[0_0_20px_rgba(99,102,241,0.5)]"
                            style={{ height: lineHeight, opacity: opacityLine }}
                        />
                    </div>

                    <div className="space-y-16">
                        <TimelineItem
                            date="MAY 2023"
                            company="Litz Tech Pvt Ltd"
                            role="Full Stack Developer Intern"
                            location="Coimbatore, Tamil Nadu"
                            points={[
                                "Assisted in web development tasks, creating responsive interfaces and back-end logic.",
                                "Collaborated closely with senior developers in an Agile workflow to trace and fix bugs.",
                                "Learned industry-standard project lifecycle and version control protocols."
                            ]}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
});

const TimelineItem = memo(function TimelineItem({ date, company, role, location, points }) {
    const itemRef = useRef(null);
    const isInView = useInView(itemRef, { once: true, margin: "-100px" });

    return (
        <motion.div
            ref={itemRef}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24 group"
        >
            {/* Desktop Date (Left) */}
            <div className="hidden md:flex flex-col items-end justify-center pr-4">
                <span className="font-mono text-sm font-bold tracking-[0.2em] text-indigo-400/60 group-hover:text-indigo-400 transition-colors duration-500">{date}</span>
                <span className="text-white/30 text-xs font-medium tracking-wider group-hover:text-white/50 transition-colors duration-500 mt-2 uppercase">{company}</span>
            </div>

            {/* Timeline Node marker */}
            <div className="absolute left-1/2 -ml-2.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-2 border-white/10 bg-black z-20 hidden md:flex items-center justify-center group-hover:scale-125 group-hover:border-indigo-500 transition-all duration-500">
                <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-indigo-500 transition-colors duration-500" />
            </div>

            {/* Card (Right) */}
            <div className="w-full">
                <motion.div
                    whileHover={{ x: 10 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="p-8 md:p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-3xl transition-all duration-700 hover:bg-white/[0.05] hover:border-white/20 relative overflow-hidden"
                >
                    {/* Animated Gradient Sweep */}
                    <div className="absolute -inset-[100%] group-hover:inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent -translate-x-full group-hover:animate-[shimmer_3s_infinite] pointer-events-none" />

                    <div className="md:hidden flex flex-col mb-6">
                        <span className="font-mono text-xs font-bold tracking-[0.2em] text-indigo-400 mb-2">{date}</span>
                        <span className="text-white/40 text-[10px] font-bold tracking-widest uppercase">{company}</span>
                    </div>

                    <h4 className="text-2xl font-bold text-white mb-2 tracking-tight group-hover:text-indigo-400 transition-colors">{role}</h4>
                    <p className="text-sm text-white/40 font-medium mb-8 uppercase tracking-widest">{location}</p>

                    <ul className="space-y-4">
                        {points.map((point, i) => (
                            <li key={i} className="flex items-start text-white/50 group-hover:text-white/80 transition-all duration-500">
                                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-indigo-500/40 mt-2.5 mr-4 group-hover:scale-125 transition-transform" />
                                <span className="text-base font-light leading-relaxed tracking-tight">{point}</span>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </div>
        </motion.div>
    );
});

export default Experience;
