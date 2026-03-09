import { useRef, memo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { fadeUpVariants, fadeUpDelayedVariants, VIEWPORT } from "../../hooks/useScrollReveal";

const About = memo(function About() {
    const sectionRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section
            id="about"
            ref={sectionRef}
            className="py-32 md:py-48 relative min-h-screen flex items-center bg-transparent overflow-hidden z-10 w-full"
        >
            {/* Background Accent */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 w-full">
                <motion.div
                    style={{ opacity, scale }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center"
                >
                    {/* LEFT SIDE TEXT */}
                    {/* LEFT SIDE TEXT */}
                    <motion.div style={{ y: yParallax }} className="flex flex-col gap-8">
                        <div>
                            <motion.h2
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                                className="text-sm font-bold tracking-[0.3em] uppercase text-indigo-400 mb-6"
                            >
                                THE STORY
                            </motion.h2>

                            <motion.h3
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                                className="text-premium text-white mb-8"
                            >
                                Crafting the <br />
                                <span className="text-white/30">future.</span>
                            </motion.h3>
                        </div>

                        <div className="flex flex-col gap-6">
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="text-lg md:text-2xl text-white/90 font-light leading-relaxed tracking-tight"
                            >
                                I am <strong className="text-white font-semibold">Karthik Raja T</strong>,
                                a software craftsman dedicated to building high-performance applications with <span className="text-indigo-400 font-medium">elegant architectures.</span>
                            </motion.p>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.5 }}
                                className="text-lg text-white/40 font-light leading-relaxed"
                            >
                                My journey revolves around architecting scalable solutions using Java and modern web technologies.
                                I believe in the power of clean code and cinematic user experiences.
                            </motion.p>
                        </div>
                    </motion.div>

                    {/* RIGHT SIDE RESUME PREVIEW */}
                    <div className="relative flex items-center justify-center w-full lg:justify-end">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />

                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            className="relative w-full max-w-sm rounded-[2.5rem] border border-white/10 bg-white/[0.02] backdrop-blur-3xl shadow-[0_50px_100px_rgba(0,0,0,0.6)] overflow-hidden group"
                        >
                            {/* Browser Header */}
                            <div className="h-12 bg-white/5 border-b border-white/5 flex items-center px-6 gap-3">
                                <div className="flex gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                                </div>
                                <div className="mx-auto text-[10px] text-white/20 font-mono tracking-widest uppercase">
                                    RESUME_2024.PDF
                                </div>
                            </div>

                            {/* Resume Image */}
                            <div className="p-4 bg-transparent">
                                <motion.div
                                    animate={{
                                        y: [0, -5, 0],
                                        rotate: [0, 0.5, 0]
                                    }}
                                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                    className="rounded-2xl overflow-hidden shadow-2xl relative"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                    <img
                                        src="/resume-preview.png"
                                        alt="Resume Preview"
                                        className="w-full h-auto object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-105 transition-all duration-700 scale-105 group-hover:scale-100"
                                    />
                                </motion.div>
                            </div>

                            {/* Actions */}
                            <div className="p-6 flex gap-3 bg-white/[0.02] border-t border-white/5">
                                <a
                                    href="/karthik-raja-resume.pdf"
                                    target="_blank"
                                    className="flex-1 px-6 py-3 rounded-2xl border border-white/10 text-white/40 text-sm font-medium hover:bg-white/5 hover:text-white transition-all text-center tracking-tight"
                                >
                                    PREVIEW
                                </a>
                                <a
                                    href="/karthik-raja-resume.pdf"
                                    download
                                    className="flex-1 px-6 py-3 rounded-2xl bg-indigo-600/90 text-white text-sm font-bold hover:bg-indigo-500 shadow-lg shadow-indigo-500/20 transition-all text-center tracking-tight"
                                >
                                    GET RESUME
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
});

export default About;