/**
 * useScrollReveal — shared Framer Motion scroll-reveal variants & hook
 * Use <motion.div variants={fadeUpVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
 */

export const fadeUpVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
};

export const fadeUpDelayedVariants = (delay = 0) => ({
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
    },
});

export const staggerContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
};

export const staggerItemVariants = {
    hidden: { opacity: 0, y: 36, scale: 0.97 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
};

/** Shared viewport config — reveal when 80px inside viewport, animate once */
export const VIEWPORT = { once: true, margin: "-80px" };
