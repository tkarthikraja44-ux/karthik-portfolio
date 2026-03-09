import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Loader({ onComplete }) {
    const containerRef = useRef(null);
    const text1Ref = useRef(null);
    const text2Ref = useRef(null);
    const text3Ref = useRef(null);

    useEffect(() => {

        // Disable scroll
        document.body.style.overflow = 'hidden';

        const tl = gsap.timeline({
            onComplete: () => {
                gsap.to(containerRef.current, {
                    yPercent: -100,
                    duration: 0.65,
                    ease: "expo.inOut",
                    onComplete: () => {
                        document.body.style.overflow = '';
                        if (onComplete) onComplete();
                    }
                });
            }
        });

        const timing = {
            inDur: 0.5,
            outDur: 0.35,
            gap: 0.2
        };

        // Text 1
        tl.fromTo(
            text1Ref.current,
            { opacity: 0, y: 20, scale: 0.98 },
            { opacity: 1, y: 0, scale: 1, duration: timing.inDur, ease: "power2.out" }
        )
            .to(
                text1Ref.current,
                { opacity: 0, y: -12, scale: 1.02, duration: timing.outDur, ease: "power2.in" },
                `+=${timing.gap}`
            )

            // Text 2
            .fromTo(
                text2Ref.current,
                { opacity: 0, y: 20, scale: 0.98 },
                { opacity: 1, y: 0, scale: 1, duration: timing.inDur, ease: "power2.out" },
                "-=0.15"
            )
            .to(
                text2Ref.current,
                { opacity: 0, y: -12, scale: 1.02, duration: timing.outDur, ease: "power2.in" },
                `+=${timing.gap}`
            )

            // Text 3
            .fromTo(
                text3Ref.current,
                { opacity: 0, y: 20, scale: 0.98 },
                { opacity: 1, y: 0, scale: 1.05, duration: 0.45, ease: "power3.out" },
                "-=0.15"
            )
            .to(
                text3Ref.current,
                { opacity: 0, scale: 1.1, duration: 0.3, ease: "power3.in" },
                "+=0.25"
            );

        return () => {
            tl.kill();
            document.body.style.overflow = '';
        };

    }, [onComplete]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
        >
            <div className="relative text-white font-bold text-4xl md:text-6xl lg:text-7xl tracking-tight text-center">

                <div
                    ref={text1Ref}
                    className="absolute inset-0 flex items-center justify-center opacity-0"
                >
                    Karthik Raja
                </div>

                <div
                    ref={text2Ref}
                    className="absolute inset-0 flex items-center justify-center opacity-0 text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-gray-600"
                >
                    Software Engineer
                </div>

                <div
                    ref={text3Ref}
                    className="absolute inset-0 flex items-center justify-center opacity-0 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400"
                >
                    Building the Future
                </div>

            </div>
        </div>
    );
}