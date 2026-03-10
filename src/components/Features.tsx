"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    HardDrive,
    FileSearch,
    Clock,
    ShieldCheck,
    Search,
    Brain,
    Globe,
    FileDigit,
} from "lucide-react";
import Section from "@/components/layout/Section";
import SectionContainer from "@/components/layout/SectionContainer";
import SectionTitle from "@/components/layout/SectionTitle";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
    {
        icon: HardDrive,
        title: "Deleted File Recovery",
        description:
            "Recover deleted files from Btrfs and XFS file systems using metadata analysis and signature-based file carving.",
    },
    {
        icon: FileDigit,
        title: "File Carving",
        description:
            "Signature-based recovery of images, documents, archives, videos, and audio files from raw disk data.",
    },
    {
        icon: FileSearch,
        title: "Metadata Extraction",
        description:
            "Extract timestamps, inode numbers, permissions, EXIF data, and document metadata for forensic analysis.",
    },
    {
        icon: Clock,
        title: "Timeline Reconstruction",
        description:
            "Organize recovered files into chronological timelines to understand the sequence of digital events.",
    },
    {
        icon: ShieldCheck,
        title: "SHA256 Integrity",
        description:
            "Every recovered file is hashed using SHA256 to maintain chain of custody and verify evidence authenticity.",
    },
    {
        icon: Search,
        title: "Keyword Investigation",
        description:
            "Search recovered files for keywords like password, confidential, secret, and financial records.",
    },
    {
        icon: Brain,
        title: "AI Media Analysis",
        description:
            "Detect manipulated media, misinformation patterns, misleading content, and unreliable sources using AI.",
    },
    {
        icon: Globe,
        title: "Browser Extension",
        description:
            "Analyze social media posts directly from the browser with a Fact Check button and Misinformation Immunity Score.",
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
            <SectionContainer>
                <SectionTitle
                    label="Capabilities"
                    title="Core Features"
                    description="A comprehensive toolkit for digital forensic investigation and content analysis."
                />

                <div
                    ref={gridRef}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-5"
                >
                    {FEATURES.map((feature) => {
                        const Icon = feature.icon;
                        return (
                            <div key={feature.title} className="feature-card">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-lg bg-primary/8 flex items-center justify-center">
                                        <Icon size={20} className="text-primary" />
                                    </div>
                                    <h3 className="font-semibold text-lg">{feature.title}</h3>
                                </div>
                                <p className="text-text-muted leading-relaxed text-sm">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </SectionContainer>
        </Section>
    );
}
