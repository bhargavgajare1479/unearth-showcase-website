"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "@/components/layout/Section";
import SectionContainer from "@/components/layout/SectionContainer";
import SectionTitle from "@/components/layout/SectionTitle";

gsap.registerPlugin(ScrollTrigger);

const BLOCKS = [
    {
        label: "01",
        title: "Problem Statement",
        content:
            "Digital forensic investigations face mounting challenges. Deleted files are difficult to recover, manipulated media goes undetected, and misinformation spreads unchecked across digital platforms. Investigators lack unified tools that combine data recovery with intelligent content analysis.",
    },
    {
        label: "02",
        title: "Proposed Solution",
        content:
            "Unearth provides an integrated digital forensics platform that combines deleted file recovery from Btrfs and XFS file systems with AI-powered media analysis. The system recovers evidence, verifies integrity through SHA256 hashing, reconstructs timelines, and detects misinformation — all in one unified workflow.",
    },
    {
        label: "03",
        title: "Vision",
        content:
            "To become the standard investigative platform for digital forensics professionals — a system that reveals hidden truths from digital environments with precision, reliability, and intelligence.",
    },
    {
        label: "04",
        title: "Mission",
        content:
            "To empower forensic investigators, cybersecurity researchers, and incident response teams with advanced tools that recover lost data, detect manipulated content, and build unassailable chains of evidence.",
    },
];

export default function Project() {
    const blocksRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const blocks = blocksRef.current?.querySelectorAll(".project-block");
            if (!blocks) return;

            blocks.forEach((block) => {
                gsap.fromTo(
                    block,
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: block,
                            start: "top 85%",
                            once: true,
                        },
                    }
                );
            });
        }, blocksRef);

        return () => ctx.revert();
    }, []);

    return (
        <Section id="project" className="bg-background">
            <SectionContainer>
                <SectionTitle
                    label="About"
                    title="The Idea Behind Unearth"
                    description="A unified platform for digital forensic investigation that combines data recovery with intelligent analysis."
                />

                <div ref={blocksRef} className="space-y-16">
                    {BLOCKS.map((block) => (
                        <div key={block.label} className="project-block">
                            <div className="flex items-baseline gap-4 mb-3">
                                <span className="text-sm font-mono text-primary/50">
                                    {block.label}
                                </span>
                                <h3 className="text-xl sm:text-2xl font-semibold">
                                    {block.title}
                                </h3>
                            </div>
                            <p className="text-text-muted text-lg leading-relaxed pl-10 sm:pl-12">
                                {block.content}
                            </p>
                        </div>
                    ))}
                </div>
            </SectionContainer>
        </Section>
    );
}
