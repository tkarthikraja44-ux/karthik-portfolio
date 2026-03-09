import { useRef, useState, memo } from 'react';
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
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });

    return (
        <section id="skills" className="py-32 md:py-48 relative w-full min-h-screen flex items-center z-10 bg-transparent overflow-hidden">
            {/* Background Blob */}
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 w-full" ref={containerRef}>

                {/* Section Header */}
                <div className="mb-24 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-sm font-bold tracking-[0.3em] uppercase text-purple-400 mb-6"
                    >
                        TECHNICAL ARSENAL
                    </motion.h2>
                    <motion.h3
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="text-premium text-white"
                    >
                        Tools of the <span className="text-white/30">trade.</span>
                    </motion.h3>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="mt-8 text-lg text-white/40 font-light max-w-2xl mx-auto leading-relaxed"
                    >
                        A specialized skillset focused on foundational programming logic,
                        robust backend architecture, and modern web integration.
                    </motion.p>
                </div>

                <motion.div
                    variants={staggerContainerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {skills.map((skill, index) => (
                        <SkillCard key={index} skill={skill} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
});

const SkillCard = ({ skill }) => {
    const cardRef = useRef(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    };

    return (
        <TiltCard tiltStrength={15}>
            <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                variants={staggerItemVariants}
                className={`h-full p-8 md:p-10 rounded-[2.5rem] transition-all duration-700 group relative overflow-hidden bg-white/[0.03] border border-white/10 backdrop-blur-3xl ${skill.glowColor} ${skill.borderColor}`}
            >
                {/* Cursor Following Glow */}
                <motion.div
                    className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                        background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.06), transparent 40%)`
                    }}
                />

                {/* Floating Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${skill.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

                {/* Animated Inner Glow */}
                <div className="absolute -inset-[100%] group-hover:inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] pointer-events-none" />

                <div className="w-16 h-16 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center mb-10 relative z-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 ease-out shadow-2xl">
                    <div className="absolute inset-0 bg-white/5 blur-xl group-hover:bg-white/10 transition-colors" />
                    <div className="relative z-10">{skill.icon}</div>
                </div>

                <h4 className="text-2xl font-bold text-white mb-8 relative z-10 tracking-tight">{skill.category}</h4>

                <ul className="space-y-4 relative z-10">
                    {skill.items.map((item, i) => (
                        <li key={i} className="flex items-center text-white/40 group-hover:text-white/90 transition-all duration-500 font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-white/10 mr-4 group-hover:bg-indigo-400 group-hover:scale-125 transition-all duration-500 shadow-[0_0_8px_rgba(129,140,248,0)] group-hover:shadow-[0_0_8px_rgba(129,140,248,0.5)]" />
                            {item}
                        </li>
                    ))}
                </ul>
            </motion.div>
        </TiltCard>
    );
};

export default Skills;
