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
        <div ref={containerRef} className="mb-16 space-y-4">
            <p className="reveal-item text-sm font-mono uppercase tracking-widest text-primary">
                {label}
            </p>
            <h2 className="reveal-item text-3xl sm:text-4xl font-bold leading-tight">
                {title}
            </h2>
            {description && (
                <p className="reveal-item text-text-muted text-lg max-w-xl leading-relaxed">
                    {description}
                </p>
            )}
        </div>
    );
}
