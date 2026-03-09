import { memo } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress = memo(function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 origin-left z-[100]"
            style={{
                scaleX,
                boxShadow: '0 0 10px rgba(59, 130, 246, 0.5), 0 0 20px rgba(168, 85, 247, 0.3)'
            }}
        />
    );
});

export default ScrollProgress;

