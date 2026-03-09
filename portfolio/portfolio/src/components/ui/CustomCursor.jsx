import { useState, useEffect, memo } from 'react';
import { motion, useSpring } from 'framer-motion';

const CustomCursor = memo(function CustomCursor({ isHovering }) {
    // Mobile check to avoid rendering cursor on touch devices where it causes lag
    const [isMobile, setIsMobile] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
    const [isMouseDown, setIsMouseDown] = useState(false);

    useEffect(() => {
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        setIsMobile(isTouchDevice);

        if (isTouchDevice) return;

        const moveCursor = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseDown = () => setIsMouseDown(true);
        const handleMouseUp = () => setIsMouseDown(false);

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    // Smooth springs for outer ring to create cinematic lag
    const smoothX = useSpring(mousePosition.x, { damping: 20, stiffness: 200, mass: 0.5 });
    const smoothY = useSpring(mousePosition.y, { damping: 20, stiffness: 200, mass: 0.5 });

    useEffect(() => {
        smoothX.set(mousePosition.x);
        smoothY.set(mousePosition.y);
    }, [mousePosition, smoothX, smoothY]);

    if (isMobile) return null;

    // Sizes based on interaction states
    const dotSize = isHovering ? 0 : 6;
    const ringSize = isHovering ? 60 : isMouseDown ? 25 : 40;

    const innerDotVariants = {
        default: {
            x: mousePosition.x - dotSize / 2,
            y: mousePosition.y - dotSize / 2,
            width: dotSize,
            height: dotSize,
            opacity: isHovering ? 0 : 1,
            transition: { type: 'tween', ease: 'backOut', duration: 0.1 }
        }
    };

    const outerRingVariants = {
        default: {
            width: ringSize,
            height: ringSize,
            backgroundColor: isHovering ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0)',
            mixBlendMode: isHovering ? 'normal' : 'difference',
            backdropFilter: isHovering ? 'blur(4px)' : 'none',
            border: isHovering ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(255, 255, 255, 0.5)',
            opacity: 1
        }
    };

    return (
        <>
            {/* Outer Glow Ring (Follower with spring physics) */}
            <motion.div
                className="fixed top-0 left-0 rounded-full pointer-events-none z-[100] flex items-center justify-center overflow-hidden"
                style={{
                    x: smoothX,
                    y: smoothY,
                    translateX: '-50%',
                    translateY: '-50%'
                }}
                variants={outerRingVariants}
                animate="default"
                transition={{ type: 'spring', stiffness: 150, damping: 15 }}
            >
                {isHovering && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-1.5 h-1.5 bg-white rounded-full"
                    />
                )}
            </motion.div>

            {/* Inner Immediate Dot */}
            <motion.div
                className="fixed top-0 left-0 bg-white rounded-full pointer-events-none z-[101] mix-blend-difference"
                variants={innerDotVariants}
                animate="default"
            />
        </>
    );
});

export default CustomCursor;
