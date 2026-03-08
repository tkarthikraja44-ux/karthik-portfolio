import { useRef, memo } from 'react';
import { motion, useInView } from 'framer-motion';
import { Layout, Terminal, Braces } from 'lucide-react';
import TiltCard from '../ui/TiltCard';

// Static data defined outside — never recreated on re-render
const skills = [
    {
        category: "Programming Languages",
        icon: <Terminal size={28} className="text-blue-400" />,
        items: ["Java", "C", "C++"],
        glowColor: "group-hover:shadow-[0_0_80px_rgba(59,130,246,0.2)]",
        borderColor: "group-hover:border-blue-500/50",
        gradient: "from-blue-500/10 to-transparent"
    },
    {
        category: "Core Concepts",
        icon: <Braces size={28} className="text-purple-400" />,
        items: ["Data Structures", "Algorithms", "Object-Oriented Programming", "Arrays and Strings", "Basic SQL"],
        glowColor: "group-hover:shadow-[0_0_80px_rgba(168,85,247,0.2)]",
        borderColor: "group-hover:border-purple-500/50",
        gradient: "from-purple-500/10 to-transparent"
    },
    {
        category: "Web Technologies",
        icon: <Layout size={28} className="text-green-400" />,
        items: ["HTML", "CSS", "JavaScript"],
        glowColor: "group-hover:shadow-[0_0_80px_rgba(34,197,94,0.2)]",
        borderColor: "group-hover:border-green-500/50",
        gradient: "from-green-500/10 to-transparent"
    }
];

// Variant objects defined outside — never recreated on re-render
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
};

const itemVariants = {
    hidden: { y: 40, opacity: 0, scale: 0.95 },
    visible: {
        y: 0, opacity: 1, scale: 1,
        transition: { type: "spring", stiffness: 100, damping: 20 }
    }
};

const Skills = memo(function Skills() {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });

    return (
        <section id="skills" className="py-24 md:py-32 lg:py-40 relative w-full min-h-screen flex items-center z-10">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 w-full" ref={containerRef}>
                <div className="mb-20 md:mb-24 text-center">
                    <h2 className="text-sm font-semibold tracking-widest uppercase text-white/40 mb-3">Technical Arsenal</h2>
                    <h3 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white">
                        Tools of the <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-700">trade.</span>
                    </h3>
                    <p className="mt-6 text-xl text-white/50 font-light max-w-2xl mx-auto">
                        A specialized skillset focused on foundational programming logic, robust back-end concepts, and modern web integration.
                    </p>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {skills.map((skill, index) => (
                        <TiltCard key={index} tiltStrength={15}>
                            <motion.div
                                variants={itemVariants}
                                className={`h-full glass-card p-10 rounded-[2rem] transition-all duration-700 group relative overflow-hidden bg-white/[0.02] border border-white/5 ${skill.glowColor} ${skill.borderColor}`}
                            >
                                {/* Stripe-style ambient hover gradient */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${skill.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

                                <div className="w-16 h-16 rounded-2xl bg-black/50 backdrop-blur-md border border-white/10 shadow-inner flex items-center justify-center mb-10 relative z-10 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-700 ease-out">
                                    {skill.icon}
                                </div>

                                <h4 className="text-2xl font-bold text-white mb-8 relative z-10">{skill.category}</h4>

                                <ul className="space-y-4 relative z-10">
                                    {skill.items.map((item, i) => (
                                        <li key={i} className="flex items-center text-white/60 group-hover:text-white/90 transition-colors duration-500 font-medium text-lg">
                                            <span className="w-1.5 h-1.5 rounded-full bg-white/30 mr-4 group-hover:bg-white/80 transition-colors duration-500"></span>
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
