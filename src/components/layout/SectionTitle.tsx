"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SectionTitleProps {
    label: string;
    title: string;
    description?: string;
}

export default function SectionTitle({
    label,
    title,
    description,
}: SectionTitleProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const elements = containerRef.current?.querySelectorAll(".reveal-item");
            if (!elements) return;

            gsap.fromTo(
                elements,
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 80%",
                        once: true,
                    },
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="mb-10 sm:mb-12 md:mb-16 lg:mb-20 space-y-3 sm:space-y-4 md:space-y-5">
            <p className="reveal-item text-xs sm:text-sm md:text-base uppercase tracking-widest text-primary text-outfit-bold">
                {label}
            </p>
            <h2 className="reveal-item text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight text-nord-bold">
                {title}
            </h2>
            {description && (
                <p className="reveal-item text-text-muted text-base sm:text-lg md:text-xl max-w-xl md:max-w-2xl lg:max-w-3xl leading-relaxed text-outfit-medium">
                    {description}
                </p>
            )}
        </div>
    );
}
