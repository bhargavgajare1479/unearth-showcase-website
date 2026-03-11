"use client";

import { Canvas } from "@react-three/fiber";
import { useEffect, useState, useRef } from "react";
import GlobeParticles from "./GlobeParticles";

export default function HeroScene() {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [introProgress, setIntroProgress] = useState(1);
    const introRef = useRef({ start: 0 });
    const [globeConfig, setGlobeConfig] = useState({
        radius: 2.5,
        position: [2.75, 0.85, 0] as [number, number, number]
    });

    // Handle responsive globe sizing
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 425) {
                // Mobile
                setGlobeConfig({ radius: 1.2, position: [0, 1.8, 0] });
            } else if (width < 768) {
                // Tablet
                setGlobeConfig({ radius: 1.5, position: [0, 1.5, 0] });
            } else if (width < 1024) {
                // Small Laptop
                setGlobeConfig({ radius: 1.8, position: [1.2, 0.8, 0] });
            } else if (width < 1440) {
                // Desktop
                setGlobeConfig({ radius: 2.1, position: [2.0, 0.5, 0] });
            } else {
                // Large Desktop
                setGlobeConfig({ radius: 2.3, position: [2.5, 0.5, 0] });
            }
        };

        handleResize(); // Initial check
        window.addEventListener("resize", handleResize, { passive: true });
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Intro animation — form the globe on load (slow)
    useEffect(() => {
        introRef.current.start = performance.now();

        const animate = () => {
            const elapsed = performance.now() - introRef.current.start;
            const duration = 3000; // 3 seconds to form
            const t = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            setIntroProgress(1 - eased);

            if (t < 1) {
                requestAnimationFrame(animate);
            }
        };

        const timer = setTimeout(() => requestAnimationFrame(animate), 300);
        return () => clearTimeout(timer);
    }, []);

    // Scroll-based explosion
    useEffect(() => {
        const handleScroll = () => {
            const heroHeight = window.innerHeight;
            const scrollY = window.scrollY;
            // Slower: starts immediately, fully scattered by 120% of hero height
            const progress = Math.min(
                Math.max(scrollY / (heroHeight * 1.2), 0),
                1
            );
            setScrollProgress(progress);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <Canvas
            camera={{ position: [0, 0, 10], fov: 50 }}
            style={{ background: "transparent" }}
            gl={{ alpha: true, antialias: true }}
            dpr={[1, 2]}
        >
            <GlobeParticles
                count={2500}
                radius={globeConfig.radius}
                color="#2563eb"
                scrollProgress={scrollProgress}
                introProgress={introProgress}
                position={globeConfig.position}
            />
        </Canvas>
    );
}
