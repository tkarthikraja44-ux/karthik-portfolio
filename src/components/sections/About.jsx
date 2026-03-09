import { useRef, memo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { fadeUpVariants, fadeUpDelayedVariants, VIEWPORT } from "../../hooks/useScrollReveal";

const About = memo(function About() {

    const sectionRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start 80%", "end start"]
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [80, -80]);
    const y2 = useTransform(scrollYProgress, [0, 1], [-40, 40]);
    const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

    const textOpacity1 = useTransform(scrollYProgress, [0.1, 0.22], [0, 1]);
    const textY1 = useTransform(scrollYProgress, [0.1, 0.22], [30, 0]);

    const textOpacity2 = useTransform(scrollYProgress, [0.2, 0.32], [0, 1]);
    const textY2 = useTransform(scrollYProgress, [0.2, 0.32], [30, 0]);

    const textOpacity3 = useTransform(scrollYProgress, [0.3, 0.42], [0, 1]);
    const textY3 = useTransform(scrollYProgress, [0.3, 0.42], [30, 0]);

    return (
        <section
            id="about"
            ref={sectionRef}
            className="py-20 md:py-32 lg:py-40 relative min-h-screen flex items-center bg-black overflow-hidden z-10 w-full"
        >

            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 w-full">

                <motion.div
                    style={{ opacity }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 xl:gap-32 items-center"
                >

                    {/* LEFT SIDE TEXT */}

                    <motion.div style={{ y: y1 }} className="flex flex-col gap-6 sm:gap-8">

                        <div>
                            <motion.h2
                                variants={fadeUpVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={VIEWPORT}
                                className="text-sm font-semibold tracking-widest uppercase text-white/40 mb-3"
                            >
                                The Story
                            </motion.h2>

                            <motion.h3
                                variants={fadeUpDelayedVariants(0.1)}
                                initial="hidden"
                                whileInView="visible"
                                viewport={VIEWPORT}
                                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tighter text-white leading-tight"
                            >
                                Crafting the <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-gray-600">
                                    future.
                                </span>
                            </motion.h3>
                        </div>

                        <div className="flex flex-col gap-5 sm:gap-8 mt-2 sm:mt-4">

                            <motion.p
                                style={{ opacity: textOpacity1, y: textY1 }}
                                className="text-base sm:text-lg md:text-xl text-white/80 font-light leading-relaxed"
                            >
                                I am <strong className="text-white font-medium">Karthik Raja T</strong>,
                                a highly motivated Computer Technology student at Bannari Amman Institute
                                of Technology with a passion for software craftsmanship.
                            </motion.p>

                            <motion.p
                                style={{ opacity: textOpacity2, y: textY2 }}
                                className="text-base sm:text-lg md:text-xl text-white/70 font-light leading-relaxed"
                            >
                                My journey revolves around building efficient, scalable applications and diving
                                deep into object-oriented programming. With a strong foundation in Java, data
                                structures and algorithms, I aim to architect solutions that turn complex
                                problems into elegant experiences.
                            </motion.p>

                            <motion.p
                                style={{ opacity: textOpacity3, y: textY3 }}
                                className="text-base sm:text-lg md:text-xl text-white/60 font-light leading-relaxed"
                            >
                                When I'm not writing Java console applications or building web interfaces,
                                I constantly practice problem-solving on platforms like LeetCode to sharpen
                                my analytical thinking.
                            </motion.p>

                        </div>
                    </motion.div>


                    {/* RIGHT SIDE RESUME PREVIEW */}

                    <motion.div
                        style={{ y: y2 }}
                        className="relative flex items-center justify-center w-full mt-8 lg:mt-0 perspective-[1200px]"
                    >

                        <div className="absolute w-[300px] sm:w-[400px] lg:w-[520px] h-[300px] sm:h-[400px] lg:h-[520px] bg-indigo-500/20 blur-[160px] rounded-full animate-pulse" />

                        <motion.div
                            whileHover={{ scale: 1.02, translateY: -6 }}
                            transition={{ type: "spring", stiffness: 150, damping: 20 }}
                            className="relative w-full max-w-[340px] sm:max-w-[380px] md:max-w-[420px] rounded-[28px] sm:rounded-[34px]
                            border border-white/10
                            bg-[#0b0d14]
                            shadow-[0_40px_100px_rgba(0,0,0,0.8)]
                            overflow-hidden group"
                        >

                            {/* browser bar */}

                            <div className="h-9 sm:h-10 bg-[#12141c] border-b border-white/5 flex items-center px-4 gap-2">

                                <div className="flex gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                                </div>

                                <div className="mx-auto text-xs text-white/40 font-mono truncate px-2">
                                    karthik-raja-resume.pdf
                                </div>

                            </div>

                            {/* resume preview */}

                            <motion.img
                                src="/resume-preview.png"
                                alt="resume preview"
                                className="w-full h-[300px] sm:h-[380px] md:h-[440px] object-contain bg-white"
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            />

                            {/* reflection */}

                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 pointer-events-none">
                                <div className="absolute -top-32 left-1/2 w-[500px] h-[200px] bg-white/10 blur-[120px] rotate-12" />
                            </div>

                            {/* buttons */}

                            <div className="flex items-center justify-center gap-3 sm:gap-4 py-4 sm:py-5 bg-black/50 backdrop-blur-lg">

                                <a
                                    href="/karthik-raja-resume.pdf"
                                    target="_blank"
                                    className="px-4 sm:px-5 py-2 text-sm rounded-full border border-white/20 text-white/80 hover:bg-white/10 transition min-h-[44px] flex items-center"
                                >
                                    View
                                </a>

                                <a
                                    href="/karthik-raja-resume.pdf"
                                    download
                                    className="px-5 sm:px-6 py-2 text-sm rounded-full
                                    bg-gradient-to-r from-indigo-500 to-purple-600
                                    hover:opacity-90 text-white transition min-h-[44px] flex items-center"
                                >
                                    Download
                                </a>

                            </div>

                        </motion.div>

                    </motion.div>

                </motion.div>

            </div>

        </section>
    );
});

export default About;