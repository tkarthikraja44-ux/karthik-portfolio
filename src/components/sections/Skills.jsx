import { useRef, memo } from 'react';
import { motion, useInView } from 'framer-motion';
import { Layout, Terminal, Braces } from 'lucide-react';
import TiltCard from '../ui/TiltCard';
import { fadeUpVariants, fadeUpDelayedVariants, staggerContainerVariants, staggerItemVariants, VIEWPORT } from '../../hooks/useScrollReveal';

const skills = [
    {
        category: "Programming Languages",
        icon: <Terminal size={26} className="text-blue-400" />,
        items: ["Java", "C", "C++"],
        glowColor: "group-hover:shadow-[0_0_80px_rgba(59,130,246,0.2)]",
        borderColor: "group-hover:border-blue-500/50",
        gradient: "from-blue-500/10 to-transparent"
    },
    {
        category: "Core Concepts",
        icon: <Braces size={26} className="text-purple-400" />,
        items: ["Data Structures", "Algorithms", "Object-Oriented Programming", "Arrays and Strings", "Basic SQL"],
        glowColor: "group-hover:shadow-[0_0_80px_rgba(168,85,247,0.2)]",
        borderColor: "group-hover:border-purple-500/50",
        gradient: "from-purple-500/10 to-transparent"
    },
    {
        category: "Web Technologies",
        icon: <Layout size={26} className="text-green-400" />,
        items: ["HTML", "CSS", "JavaScript"],
        glowColor: "group-hover:shadow-[0_0_80px_rgba(34,197,94,0.2)]",
        borderColor: "group-hover:border-green-500/50",
        gradient: "from-green-500/10 to-transparent"
    }
];

const Skills = memo(function Skills() {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-80px" });

    return (
        <section id="skills" className="py-20 md:py-32 lg:py-40 relative w-full min-h-screen flex items-center z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 w-full" ref={containerRef}>

                {/* Section Header */}
                <div className="mb-12 sm:mb-16 md:mb-20 text-center">
                    <motion.h2
                        variants={fadeUpVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={VIEWPORT}
                        className="text-sm font-semibold tracking-widest uppercase text-white/40 mb-3"
                    >
                        Technical Arsenal
                    </motion.h2>
                    <motion.h3
                        variants={fadeUpDelayedVariants(0.1)}
                        initial="hidden"
                        whileInView="visible"
                        viewport={VIEWPORT}
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tighter text-white"
                    >
                        Tools of the <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-700">trade.</span>
                    </motion.h3>
                    <motion.p
                        variants={fadeUpDelayedVariants(0.2)}
                        initial="hidden"
                        whileInView="visible"
                        viewport={VIEWPORT}
                        className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-white/50 font-light max-w-2xl mx-auto leading-relaxed px-2 sm:px-0"
                    >
                        A specialized skillset focused on foundational programming logic, robust back-end concepts, and modern web integration.
                    </motion.p>
                </div>

                <motion.div
                    variants={staggerContainerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 md:gap-8"
                >
                    {skills.map((skill, index) => (
                        <TiltCard key={index} tiltStrength={10}>
                            <motion.div
                                variants={staggerItemVariants}
                                whileHover={{ y: -6, scale: 1.02 }}
                                transition={{ duration: 0.35, ease: "easeOut" }}
                                className={`h-full glass-card p-6 sm:p-8 md:p-10 rounded-[1.5rem] sm:rounded-[2rem] transition-all duration-700 group relative overflow-hidden bg-white/[0.02] border border-white/5 ${skill.glowColor} ${skill.borderColor}`}
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${skill.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

                                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-black/50 backdrop-blur-md border border-white/10 shadow-inner flex items-center justify-center mb-6 sm:mb-8 md:mb-10 relative z-10 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-700 ease-out">
                                    {skill.icon}
                                </div>

                                <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-5 sm:mb-6 md:mb-8 relative z-10">{skill.category}</h4>

                                <ul className="space-y-3 sm:space-y-4 relative z-10">
                                    {skill.items.map((item, i) => (
                                        <li key={i} className="flex items-center text-white/60 group-hover:text-white/90 transition-colors duration-500 font-medium text-sm sm:text-base md:text-lg">
                                            <span className="w-1.5 h-1.5 rounded-full bg-white/30 mr-3 sm:mr-4 flex-shrink-0 group-hover:bg-white/80 transition-colors duration-500" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        </TiltCard>
                    ))}
                </motion.div>
            </div>
        </section>
    );
});

export default Skills;
