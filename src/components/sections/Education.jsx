import { useRef, memo } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

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
        offset: ["start 70%", "end start"]
    });

    const lineHeight = useTransform(scrollYProgress, [0, 0.5], ["0%", "100%"]);

    return (
        <section id="education" ref={sectionRef} className="py-24 md:py-32 relative bg-transparent w-full z-10 pb-40">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
                <div className="mb-24 text-center pb-10">
                    <h2 className="text-sm font-semibold tracking-widest uppercase text-white/30 mb-3 ml-1">Education</h2>
                    <h3 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white">
                        Academic <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-700">Foundation.</span>
                    </h3>
                </div>

                <div className="relative pl-10 md:pl-0 max-w-4xl mx-auto">
                    {/* Ultra-thin Glow Target Line */}
                    <div className="absolute left-[39.5px] md:left-1/2 md:-ml-px top-0 bottom-0 w-px bg-white/[0.05]">
                        <motion.div
                            className="w-px bg-gradient-to-b from-white via-white/50 to-transparent shadow-[0_0_10px_2px_rgba(255,255,255,0.3)]"
                            style={{ height: lineHeight }}
                        />
                    </div>

                    {educationData.map((edu, idx) => (
                        <TimelineItem key={idx} edu={edu} index={idx} />
                    ))}

                </div>
            </div>
        </section>
    );
});

// Memoized sub-component — avoids re-renders when parent state changes
const TimelineItem = memo(function TimelineItem({ edu, index }) {
    const itemRef = useRef(null);
    const isInView = useInView(itemRef, { once: true, margin: "-100px" });

    const isEven = index % 2 === 0;

    return (
        <motion.div
            ref={itemRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 }}
            className={`relative flex flex-col md:flex-row justify-between items-center w-full mb-12 group ${isEven ? 'md:flex-row-reverse' : ''}`}
        >

            {/* Desktop Hidden Layout to center node */}
            <div className={`hidden md:flex flex-col w-1/2 justify-center ${isEven ? 'text-left pl-16' : 'text-right pr-16'}`}>
                <span className={`font-mono text-sm text-white/40 tracking-widest uppercase mb-1 block ${isEven ? '' : 'ml-auto'}`}>{edu.period}</span>
                <span className={`text-white/30 text-xs tracking-wider block ${isEven ? '' : 'ml-auto'}`}>{edu.institution}</span>
            </div>

            {/* Node Marker */}
            <div className="absolute left-[-8px] md:left-1/2 md:-ml-2 w-4 h-4 rounded-full border-[2.5px] border-white/20 flex items-center justify-center bg-black z-10 shadow-[0_0_10px_rgba(255,255,255,0.1)] group-hover:scale-125 transition-transform duration-500 group-hover:border-white group-hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]">
            </div>

            {/* Mobile View Title */}
            <div className="block md:hidden w-full mb-6 mt-1">
                <span className="font-mono text-sm text-white/50 tracking-widest uppercase block mb-1">{edu.period}</span>
                <span className="text-white/30 text-xs tracking-wider block">{edu.institution}</span>
            </div>

            {/* Content Layout */}
            <div className={`w-full md:w-1/2 flex flex-col justify-center ${isEven ? 'md:pr-16' : 'md:pl-16'}`}>
                <div className="glass-card p-8 rounded-3xl hover:bg-white/[0.03] transition-colors duration-500 hover:border-white/10 flex flex-col justify-center gap-4 bg-[#0A0A0A] border border-white/5">
                    <h4 className="text-3xl font-bold text-white tracking-tight mb-1 leading-tight">{edu.degree}</h4>
                    <span className="text-white/80 font-medium text-lg border-t border-white/10 pt-4 mt-2 inline-block w-fit pr-8">
                        {edu.score}
                    </span>
                </div>
            </div>

        </motion.div>
    );
});

export default Education;
