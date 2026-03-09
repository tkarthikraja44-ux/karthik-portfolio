import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenisInstance = null;

let gsapTickerCallback = null;

export const initSmoothScroll = () => {
    if (typeof window === 'undefined') return;

    lenisInstance = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        wheelMultiplier: 1,
    });

    // Synchronize Lenis scrolling with GSAP ScrollTrigger
    lenisInstance.on('scroll', ScrollTrigger.update);

    gsapTickerCallback = (time) => {
        lenisInstance?.raf(time * 1000); // GSAP ticker provides time in seconds, Lenis expects ms
    };
    gsap.ticker.add(gsapTickerCallback);

    // Allow GSAP ticker to run at up to 120fps (default is 60)
    // This is critical for high-refresh-rate displays (120Hz / ProMotion)
    gsap.ticker.fps(120);

    // Pre-emptively fix GSAP lag smoothing to ensure smooth scrub animations
    gsap.ticker.lagSmoothing(0);

    // Pause Lenis when tab is hidden (Apple/Linear trick: don't waste GPU on invisible tabs)
    const handleVisibilityChange = () => {
        if (document.hidden) {
            lenisInstance?.stop();
        } else {
            lenisInstance?.start();
        }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return lenisInstance;
};

export const destroySmoothScroll = () => {
    if (lenisInstance) {
        lenisInstance.destroy();
        lenisInstance = null;
    }
    if (gsapTickerCallback) {
        gsap.ticker.remove(gsapTickerCallback);
        gsapTickerCallback = null;
    }
    // Remove visibility handler
    document.removeEventListener('visibilitychange', () => { });
    // Kill all hanging ScrollTriggers cleanly to prevent memory leaks
    ScrollTrigger.getAll().forEach(t => t.kill());
};

export const getLenis = () => lenisInstance;
