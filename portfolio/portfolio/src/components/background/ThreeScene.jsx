import { memo, useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ─── Lerp helper — direct mutation, never allocates a GSAP tween ──────────────
const lerp = (a, b, t) => a + (b - a) * t;

// ─── Particles — memo prevents re-mount on parent re-renders ─────────────────
const Particles = memo(function Particles({ count = 150 }) {
    const mesh = useRef();
    // Store mouse target as a ref — avoids triggering re-renders on every mousemove
    const targetRot = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            // Normalize to -1..1 range and store as rotation targets
            targetRot.current.x = -(e.clientY / window.innerHeight) * 2 + 1;
            targetRot.current.y = (e.clientX / window.innerWidth) * 2 - 1;
        };
        // passive: true — tells browser this handler won't call preventDefault,
        // allowing it to scroll without waiting for JS, key to smooth scroll
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const dummy = useMemo(() => new THREE.Object3D(), []);

    // Generate particles data once — stable across all renders
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100;
            const factor = 20 + Math.random() * 100;
            const speed = 0.01 + Math.random() / 200;
            const xFactor = -50 + Math.random() * 100;
            const yFactor = -50 + Math.random() * 100;
            const zFactor = -50 + Math.random() * 100;
            temp.push({ t, factor, speed, xFactor, yFactor, zFactor });
        }
        return temp;
    }, [count]);

    useFrame(() => {
        if (!mesh.current) return;

        // Lerp rotation directly on the mesh ref — compositor-thread friendly.
        // Original code called gsap.to() here which created a new tween EVERY frame (big perf issue).
        mesh.current.rotation.x = lerp(mesh.current.rotation.x, targetRot.current.x * 0.1, 0.04);
        mesh.current.rotation.y = lerp(mesh.current.rotation.y, targetRot.current.y * 0.1, 0.04);

        // Subtle continuous drift
        mesh.current.rotation.y += 0.0005;
        mesh.current.rotation.x += 0.0002;

        particles.forEach((particle, i) => {
            let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
            t = particle.t += speed / 2;
            const a = Math.cos(t) + Math.sin(t * 1) / 10;
            const b = Math.sin(t) + Math.cos(t * 2) / 10;
            const s = Math.cos(t);

            dummy.position.set(
                a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
                b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
                b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
            );

            dummy.scale.setScalar(Math.max(0, s));
            dummy.rotation.set(s * 5, s * 5, s * 5);
            dummy.updateMatrix();

            mesh.current.setMatrixAt(i, dummy.matrix);
        });
        mesh.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={mesh} args={[null, null, count]}>
            <dodecahedronGeometry args={[0.08, 0]} />
            <meshPhysicalMaterial
                color="#ffffff"
                emissive="#4A00E0"
                emissiveIntensity={0.5}
                roughness={0.2}
                metalness={0.8}
                transparent={true}
                opacity={0.6}
            />
        </instancedMesh>
    );
});

// ─── ThreeScene — memo + mobile guard ────────────────────────────────────────
const ThreeScene = memo(function ThreeScene() {
    // Completely skip WebGL on mobile — saves GPU, memory, and battery
    if (typeof window !== 'undefined' && window.innerWidth < 768) return null;

    return (
        <div className="fixed inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen hidden md:block">
            {/*
              Performance settings:
              - antialias: false — massive GPU savings; imperceptible at 40% opacity
              - powerPreference: high-performance — requests discrete GPU on dual-GPU laptops
              - dpr capped at [1, 1.5] — retina looks great, 2.0 is wasteful for a bg effect
            */}
            <Canvas
                camera={{ position: [0, 0, 70], fov: 60 }}
                gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
                dpr={[1, 1.5]}
            >
                <color attach="background" args={['transparent']} />
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 10]} intensity={1.5} color="#8E2DE2" />
                <directionalLight position={[-10, -10, -10]} intensity={1} color="#4A00E0" />
                <Particles count={150} />
            </Canvas>
        </div>
    );
});

export default ThreeScene;
