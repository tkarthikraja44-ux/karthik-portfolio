import { useRef, memo } from 'react';
import { motion, useInView } from 'framer-motion';
import { Trophy, Award } from 'lucide-react';

// Static data + variant objects outside component
const achievements = [
    {
        title: "Oracle Certified Professional",
        subtitle: "Java SE 17 Developer",
        icon: <Trophy size={32} className="text-yellow-400" />,
        description: "Achieved the prestigious OCP Java SE 17 certification, demonstrating advanced proficiency in Java language features, APIs, and modern programming practices."
    },
    {
        title: "LeetCode Problem Solver",
        subtitle: "Active Contributor & Practitioner",
        icon: <Award size={32} className="text-orange-400" />,
        description: "Consistently solving complex algorithmic challenges and data structure problems to enhance problem-solving skills and code efficiency."
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2 }
    }
};

const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { type: "spring", stiffness: 80, damping: 20 }
    }
};

const Achievements = memo(function Achievements() {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });

    return (
        <section id="achievements" className="py-16 md:py-20 lg:py-24 relative bg-black w-full z-10">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16" ref={containerRef}>
                <div className="mb-16 md:mb-20 text-center">
                    <h2 className="text-lg font-semibold tracking-widest uppercase text-white/40 mb-2">Milestones</h2>
                    <h3 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter text-white">
                        Honors & <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-600">Achievements.</span>
                    </h3>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
                >
                    {achievements.map((item, idx) => (
                        <motion.div
                            key={idx}
                            variants={itemVariants}
                            className="glass-card p-10 rounded-3xl hover:-translate-y-2 transition-transform duration-500 overflow-hidden relative group"
                        >
                            {/* Glow effect */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500/0 via-yellow-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-2xl" />

                            <div className="relative z-10">
                                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8">
                                    {item.icon}
                                </div>

                                <h4 className="text-2xl font-bold text-white mb-2">{item.title}</h4>
                                <p className="text-lg text-white/60 font-medium mb-6">{item.subtitle}</p>
                                <p className="text-white/50 leading-relaxed font-light">{item.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
});

export default Achievements;
