import { useState, useRef, useCallback, memo } from 'react';
import { motion, useSpring } from 'framer-motion';

// Static style maps defined outside component — never recreated on re-render
const baseStyles = "relative overflow-hidden flex items-center justify-center gap-2 px-8 py-4 rounded-full font-medium transition-all duration-300 transform-gpu focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black";

const variantStyles = {
    primary: "bg-white text-black hover:bg-gray-100 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]",
    glass: "glass-card text-white hover:bg-white/10 border border-white/10 hover:border-white/30",
    outline: "border border-white/20 text-white hover:bg-white/5"
};

const Button = memo(function Button({
    children,
    onClick,
    href,
    className = "",
    variant = 'primary' // 'primary', 'glass', 'outline'
}) {
    const buttonRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const [ripple, setRipple] = useState(null);

    // Magnetic Spring Setup
    const x = useSpring(0, { stiffness: 150, damping: 15, mass: 0.5 });
    const y = useSpring(0, { stiffness: 150, damping: 15, mass: 0.5 });

    const handleMouseMove = useCallback((e) => {
        if (!buttonRef.current) return;
        const rect = buttonRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Calculate distance from center (magnetic pull)
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;

        x.set(distanceX * 0.2); // 20% pull strength
        y.set(distanceY * 0.2);
    }, [x, y]);

    const handleMouseEnter = useCallback(() => setIsHovered(true), []);

    const handleMouseLeave = useCallback(() => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
    }, [x, y]);

    const handleClick = useCallback((e) => {
        // Generate Ripple effect
        const rect = e.currentTarget.getBoundingClientRect();
        const xPos = e.clientX - rect.left;
        const yPos = e.clientY - rect.top;

        setRipple({ x: xPos, y: yPos, id: Date.now() });

        if (onClick) onClick(e);
    }, [onClick]);

    const Component = href ? motion.a : motion.button;
    const props = href ? { href, target: "_blank", rel: "noreferrer" } : { type: "button" };

    return (
        <Component
            ref={buttonRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            style={{ x, y }}
            className={`${baseStyles} ${variantStyles[variant]} ${className}`}
            {...props}
        >
            {/* Ripple Element */}
            {ripple && (
                <motion.span
                    key={ripple.id}
                    initial={{ scale: 0, opacity: 0.5 }}
                    animate={{ scale: 4, opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="absolute bg-white/30 rounded-full pointer-events-none"
                    style={{
                        left: ripple.x,
                        top: ripple.y,
                        width: 50,
                        height: 50,
                        transform: 'translate(-50%, -50%)',
                    }}
                    onAnimationComplete={() => setRipple(null)}
                />
            )}

            {/* Subtle Glow Outline */}
            <div className={`absolute -inset-px rounded-full opacity-0 transition-opacity duration-500 ${isHovered ? 'opacity-100' : ''}`}>
                <div className="absolute inset-0 rounded-full mix-blend-screen bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            </div>

            <span className="relative z-10 flex items-center justify-center gap-2">
                {children}
            </span>
        </Component>
    );
});

export default Button;

