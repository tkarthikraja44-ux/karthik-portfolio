import { useRef, useState, useCallback, memo } from 'react';
import { motion, useSpring } from 'framer-motion';

const TiltCard = memo(function TiltCard({ children, className = "", tiltStrength = 20 }) {
    const cardRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    // Smooth springs for rotation
    const rotateX = useSpring(0, { stiffness: 300, damping: 30 });
    const rotateY = useSpring(0, { stiffness: 300, damping: 30 });

    const handleMouseMove = useCallback((e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();

        // Calculate mouse position relative to card center (-1 to 1)
        const mouseX = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
        const mouseY = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

        // Tilt follows mouse with strength multiplier
        rotateX.set(-mouseY * tiltStrength);
        rotateY.set(mouseX * tiltStrength);
    }, [rotateX, rotateY, tiltStrength]);

    const handleMouseEnter = useCallback(() => setIsHovered(true), []);

    const handleMouseLeave = useCallback(() => {
        setIsHovered(false);
        rotateX.set(0);
        rotateY.set(0);
    }, [rotateX, rotateY]);

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d"
            }}
            className={`relative perspective-1000 ${className}`}
        >
            {children}
        </motion.div>
    );
});

export default TiltCard;
