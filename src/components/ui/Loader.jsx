import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Loader({ onComplete }) {
    const containerRef = useRef(null);
    const text1Ref = useRef(null);
    const text2Ref = useRef(null);
    const text3Ref = useRef(null);

    useEffect(() => {
        // Disable scrolling while loader is active
        document.body.style.overflow = 'hidden';

        const tl = gsap.timeline({
            onComplete: () => {
                gsap.to(containerRef.current, {
                    yPercent: -100,
                    duration: 1.2,
                    ease: "expo.inOut",
                    onComplete: () => {
                        document.body.style.overflow = '';
                        if (onComplete) onComplete();
                    }
                });
            }
        });

        const timing = {
            inDur: 0.8,
            outDur: 0.5,
            delay: 0.4
        };

        tl.to(text1Ref.current, { opacity: 1, y: 0, duration: timing.inDur, ease: "power3.out" })
            .to(text1Ref.current, { opacity: 0, y: -20, duration: timing.outDur, ease: "power3.in", delay: timing.delay })

            .to(text2Ref.current, { opacity: 1, y: 0, duration: timing.inDur, ease: "power3.out" })
            .to(text2Ref.current, { opacity: 0, y: -20, duration: timing.outDur, ease: "power3.in", delay: timing.delay })

            .to(text3Ref.current, { opacity: 1, y: 0, scale: 1.05, duration: 1, ease: "power3.out" })
            .to(text3Ref.current, { opacity: 0, scale: 1.1, duration: 0.6, ease: "power3.in", delay: 0.6 });

        return () => {
            tl.kill();
            document.body.style.overflow = '';
        };
    }, [onComplete]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
        >
            <div className="relative text-white font-bold text-4xl md:text-6xl lg:text-7xl tracking-tighter text-center">

                <div
                    ref={text1Ref}
                    className="absolute inset-0 flex items-center justify-center opacity-0 translate-y-8 whitespace-nowrap"
                >
                    Karthik Raja
                </div>

                <div
                    ref={text2Ref}
                    className="absolute inset-0 flex items-center justify-center opacity-0 translate-y-8 whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-gray-600"
                >
                    Software Engineer
                </div>

                <div
                    ref={text3Ref}
                    className="absolute inset-0 flex items-center justify-center opacity-0 translate-y-8 whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400"
                >
                    Building the Future
                </div>

            </div>
        </div>
    );
}
