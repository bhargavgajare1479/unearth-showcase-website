"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    HardDrive,
    FileDigit,
    FileSearch,
    Clock,
    ShieldCheck,
    Search,
    Brain,
    Globe,
    Terminal,
} from "lucide-react";
import Section from "@/components/layout/Section";
import SectionContainer from "@/components/layout/SectionContainer";
import SectionTitle from "@/components/layout/SectionTitle";
import TiltedCard from "@/components/TiltedCard";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
    {
        icon: HardDrive,
        title: "Deleted File Recovery",
        description:
            "Unearth can recover deleted files from Btrfs and XFS file systems. It uses a combination of metadata analysis and file carving to locate and reconstruct files that have been removed from the system.",
    },
    {
        icon: FileDigit,
        title: "File Carving & Format Detection",
        description:
            "The platform scans raw disk data and identifies files using their unique signatures, also known as magic numbers. This allows the system to detect and recover files even when file names or extensions are missing.",
    },
    {
        icon: FileSearch,
        title: "Metadata Extraction",
        description:
            "Unearth extracts important metadata from recovered files, such as timestamps, permissions, and embedded information from images or documents. This helps investigators understand when and how the files were created or modified.",
    },
    {
        icon: Clock,
        title: "Timeline Reconstruction",
        description:
            "All recovered files are organised into a chronological timeline. This allows investigators to see the sequence of events on the system and identify suspicious activity more easily.",
    },
    {
        icon: ShieldCheck,
        title: "File Integrity Verification",
        description:
            "Each recovered file is assigned a SHA256 hash. This ensures that the evidence remains unchanged and helps maintain the chain of custody during an investigation.",
    },
    {
        icon: Search,
        title: "Keyword Search",
        description:
            "Investigators can search through recovered text files using keywords. This makes it easier to locate specific information such as passwords, confidential terms, or other relevant content.",
    },
    {
        icon: Brain,
        title: "AI-Based Media & Content Analysis",
        description:
            "Unearth includes an AI analysis component that can examine images, videos, audio, text, and URLs. It helps identify manipulated media, analyse content context, and evaluate the credibility of information.",
    },
    {
        icon: Globe,
        title: "Browser Extension for Quick Analysis",
        description:
            "A browser extension allows users to analyse content directly from web pages or social media posts. This makes it easier to investigate suspicious online content without leaving the browser.",
    },
    {
        icon: Terminal,
        title: "Multiple User Interfaces",
        description:
            "The platform provides both a command line interface and a graphical interface. This allows users to choose the environment that best suits their workflow, whether they prefer terminal-based tools or a visual dashboard.",
    },
];

export default function Features() {
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = gridRef.current?.querySelectorAll(".feature-card");
            if (!cards) return;

            gsap.fromTo(
                cards,
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.08,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: gridRef.current,
                        start: "top 80%",
                        once: true,
                    },
                }
            );
        }, gridRef);

        return () => ctx.revert();
    }, []);

    return (
        <Section id="features" className="bg-background">
            <SectionContainer className="max-w-7xl">
                <SectionTitle
                    label="Capabilities"
                    title="Core Features"
                    description="A complete toolkit designed for digital forensic investigation and content analysis..."
                />

                <div
                    ref={gridRef}
                    className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 mt-8"
                >
                    {FEATURES.map((feature) => {
                        const Icon = feature.icon;
                        return (
                            <div key={feature.title} className="feature-card h-full">
                                <TiltedCard
                                    containerHeight="100%"
                                    containerWidth="100%"
                                    rotateAmplitude={12}
                                    scaleOnHover={1.02}
                                >
                                    <div className="flex flex-col h-full p-4 sm:p-6 md:p-8 lg:p-10">
                                        <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 xl:w-16 xl:h-16 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                                <Icon className="text-primary w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 xl:w-8 xl:h-8" />
                                            </div>
                                            <h3 className="text-sm sm:text-sm md:text-base lg:text-lg xl:text-xl leading-tight text-outfit-bold">{feature.title}</h3>
                                        </div>
                                        <p className="text-text-muted leading-relaxed text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl flex-grow text-outfit-regular">
                                            {feature.description}
                                        </p>
                                    </div>
                                </TiltedCard>
                            </div>
                        );
                    })}
                </div>
            </SectionContainer>
        </Section>
    );
}
