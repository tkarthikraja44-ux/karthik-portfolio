import { useRef, memo } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const Experience = memo(function Experience() {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start 70%", "end start"]
    });

    const lineHeight = useTransform(scrollYProgress, [0, 0.4], ["0%", "100%"]);

    return (
        <section id="experience" ref={sectionRef} className="py-24 md:py-32 relative bg-transparent w-full z-10">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
                <div className="mb-24 text-center pb-10">
                    <h2 className="text-sm font-semibold tracking-widest uppercase text-white/30 mb-3 ml-1">Experience</h2>
                    <h3 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white">
                        Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-700">Journey.</span>
                    </h3>
                </div>

                <div className="relative pl-10 md:pl-0 max-w-4xl mx-auto">
                    {/* Linear-style Ultra-thin Glow Target Line */}
                    <div className="absolute left-[39.5px] md:left-1/2 md:-ml-px top-0 bottom-0 w-px bg-white/[0.05]">
                        <motion.div
                            className="w-px bg-gradient-to-b from-white via-white/50 to-transparent shadow-[0_0_10px_2px_rgba(255,255,255,0.3)]"
                            style={{ height: lineHeight }}
                        />
                    </div>

                    <TimelineItem />

                </div>
            </div>
        </section>
    );
});

// Memoized sub-component — prevents re-render from parent scroll state
const TimelineItem = memo(function TimelineItem() {
    const itemRef = useRef(null);
    const isInView = useInView(itemRef, { once: true, margin: "-100px" });

    return (
        <motion.div
            ref={itemRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative flex flex-col md:flex-row justify-between items-center w-full mb-12 group"
        >
            {/* Desktop Left (Empty to push node to center) */}
            <div className="hidden md:block w-1/2 pr-16 text-right">
                <span className="font-mono text-sm text-white/40 tracking-widest uppercase mb-1 block">May 2023</span>
                <span className="text-white/30 text-xs tracking-wider">Litz Tech Pvt Ltd</span>
            </div>

            {/* Node Marker Linear-style */}
            <div className="absolute left-[-8px] md:left-1/2 md:-ml-2 w-4 h-4 rounded-full border-[2.5px] border-white/20 flex items-center justify-center bg-black z-10 shadow-[0_0_10px_rgba(255,255,255,0.1)] group-hover:scale-125 transition-transform duration-500 group-hover:border-white group-hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]">
            </div>

            {/* Desktop Right Layout */}
            <div className="w-full md:w-1/2 md:pl-16">
                <div className="glass-card p-8 rounded-3xl hover:bg-white/[0.03] transition-colors duration-500 hover:border-white/10 bg-[#0A0A0A] border border-white/5">
                    <div className="md:hidden mb-6 block">
                        <span className="font-mono text-sm text-white/50 tracking-widest uppercase block mb-1">May 2023</span>
                        <span className="text-white/30 text-xs tracking-wider block">Litz Tech Pvt Ltd</span>
                    </div>

                    <h4 className="text-3xl font-bold text-white tracking-tight mb-2">Full Stack Developer Intern</h4>
                    <p className="text-xl text-white/50 font-light mb-8">Coimbatore, Tamil Nadu</p>

                    <ul className="space-y-4">
                        <li className="flex items-start text-white/60 hover:text-white/90 transition-colors">
                            <span className="flex-shrink-0 w-1 h-1 rounded-full bg-white/30 mt-3 mr-4" />
                            <span className="text-lg font-light leading-relaxed">Assisted in web development tasks, creating responsive interfaces and back-end logic.</span>
                        </li>
                        <li className="flex items-start text-white/60 hover:text-white/90 transition-colors">
                            <span className="flex-shrink-0 w-1 h-1 rounded-full bg-white/30 mt-3 mr-4" />
                            <span className="text-lg font-light leading-relaxed">Collaborated closely with senior developers in an Agile workflow to trace and fix bugs.</span>
                        </li>
                        <li className="flex items-start text-white/60 hover:text-white/90 transition-colors">
                            <span className="flex-shrink-0 w-1 h-1 rounded-full bg-white/30 mt-3 mr-4" />
                            <span className="text-lg font-light leading-relaxed">Learned industry-standard project lifecycle and version control protocols.</span>
                        </li>
                    </ul>
                </div>
            </div>
        </motion.div>
    );
});

export default Experience;
