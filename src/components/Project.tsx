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
        content: (
            <div className="space-y-4 text-outfit-regular">
                <p>
                    Digital investigations today face several challenges. Important information often exists only in digital form, and it may be hidden, deleted, or intentionally manipulated. Investigators need reliable ways to recover this information and understand what actually happened on a system.
                </p>
                <p className="">The main issues can be summarised as follows:</p>
                <div className="space-y-4 pt-2">
                    <div>
                        <h4 className="text-foreground text-outfit-semibold">1. Difficulty in recovering deleted data</h4>
                        <p>Modern file systems such as Btrfs and XFS manage data in complex ways. Once files are deleted, recovering them becomes difficult. Many existing recovery tools either do not fully support these file systems or require deep technical expertise to operate. Because of this, valuable digital evidence may remain unrecovered.</p>
                    </div>
                    <div>
                        <h4 className="text-foreground text-outfit-semibold">2. Fragmented investigation tools</h4>
                        <p>Digital forensic investigations usually involve multiple stages such as data recovery, metadata analysis, and content examination. These tasks are often handled by separate tools. Investigators are forced to switch between different software, which slows down the process and increases the chances of missing critical evidence.</p>
                    </div>
                    <div>
                        <h4 className="text-foreground text-outfit-semibold">3. Growing complexity of digital evidence</h4>
                        <p>Digital evidence is no longer limited to files stored on a device. Images, videos, documents, and online content can all play a role in an investigation. Identifying manipulated media or misleading information requires additional analysis, which many traditional forensic tools do not support.</p>
                    </div>
                    <div>
                        <h4 className="text-foreground text-outfit-semibold">4. Lack of integrated analysis platforms</h4>
                        <p>Most tools focus on only one part of the investigation process. There are very few platforms that combine evidence recovery with deeper analysis in a single environment. This makes investigations less efficient and harder to manage.</p>
                    </div>
                </div>
                <p className="pt-2">
                    Because of these challenges, there is a clear need for a unified platform that can recover digital evidence, analyse it effectively, and help investigators understand the complete sequence of events during an incident.
                </p>
            </div>
        ),
    },
    {
        label: "02",
        title: "Proposed Solution",
        content: (
            <div className="space-y-4 text-outfit-regular">
                <p>
                    To address these challenges, Unearth is designed as a unified platform that brings together digital evidence recovery and intelligent analysis in a single environment. The goal is to simplify the investigation process and give investigators the tools they need to recover, examine, and understand digital evidence more efficiently.
                </p>
                <p className="">The proposed solution focuses on the following key aspects:</p>
                <div className="space-y-4 pt-2">
                    <div>
                        <h4 className="text-foreground text-outfit-semibold">1. Reliable recovery of deleted data</h4>
                        <p>Unearth provides specialised support for modern file systems such as Btrfs and XFS. It uses a combination of metadata analysis and signature-based file carving to recover deleted files. This approach increases the chances of retrieving valuable evidence even when file system structures are partially lost.</p>
                    </div>
                    <div>
                        <h4 className="text-foreground text-outfit-semibold">2. Integrated forensic analysis</h4>
                        <p>Instead of relying on multiple separate tools, Unearth brings important investigation capabilities into one platform. Investigators can recover files, examine metadata, and analyse the recovered data within the same workflow. This reduces complexity and makes the investigation process more efficient.</p>
                    </div>
                    <div>
                        <h4 className="text-foreground text-outfit-semibold">3. Metadata extraction and timeline reconstruction</h4>
                        <p>Unearth automatically extracts key metadata from recovered files, including timestamps, permissions, and embedded information such as EXIF data or document properties. This information is organised into a chronological timeline that helps investigators understand the sequence of events on a system.</p>
                    </div>
                    <div>
                        <h4 className="text-foreground text-outfit-semibold">4. Evidence integrity and verification</h4>
                        <p>To maintain the authenticity of recovered data, Unearth generates a SHA256 hash for every recovered file. This allows investigators to verify that the evidence has not been altered and supports proper chain-of-custody practices.</p>
                    </div>
                    <div>
                        <h4 className="text-foreground text-outfit-semibold">5. Intelligent content analysis</h4>
                        <p>Unearth also includes an AI-assisted analysis component that can evaluate images, videos, audio, text, and URLs. This helps investigators detect manipulated media, analyse suspicious content, and assess the credibility of online information.</p>
                    </div>
                    <div>
                        <h4 className="text-foreground text-outfit-semibold">6. Accessible investigation tools</h4>
                        <p>The platform provides both a command-line interface and a graphical interface, making it usable for both technical experts and investigators who prefer a visual environment. A browser extension also allows users to analyse content directly from web pages.</p>
                    </div>
                </div>
                <p className="pt-2">
                    By combining data recovery with intelligent analysis tools, Unearth aims to provide investigators with a practical and efficient platform for uncovering hidden digital evidence and understanding what lies beneath the surface.
                </p>
            </div>
        ),
    },
    {
        label: "03",
        title: "Vision",
        content: <p className="text-outfit-regular">To make digital investigations more accessible and effective by building tools that help uncover hidden evidence and reveal the truth behind digital activity.</p>,
    },
    {
        label: "04",
        title: "Mission",
        content: <p className="text-outfit-regular">To develop a unified platform that enables investigators to recover digital evidence, analyse it intelligently, and understand incidents with clarity and confidence.</p>,
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
            <SectionContainer className="max-w-6xl">
                <SectionTitle
                    label="About"
                    title="The Idea Behind Unearth"
                    description="A unified platform for digital forensic investigation that brings together data recovery and intelligent analysis..."
                />

                <div
                    ref={blocksRef}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 auto-rows-[minmax(180px,auto)]"
                >
                    {BLOCKS.map((block, index) => {
                        // Dynamically assign grid spans based on the item index to create the Bento effect
                        let gridClass = "";
                        if (index === 0) gridClass = "lg:col-span-2 row-span-2"; // Problem Statement is full width 
                        else if (index === 1) gridClass = "lg:col-span-2 row-span-2"; // Proposed Solution is full width
                        else gridClass = "lg:col-span-1 row-span-1"; // Vision & Mission are equal side-by-side cards

                        return (
                            <div
                                key={block.label}
                                className={`project-block p-6 sm:p-8 md:p-10 lg:p-12 xl:p-14 rounded-3xl bg-zinc-50 border border-zinc-100 flex flex-col justify-between hover:border-primary/20 hover:shadow-lg transition-all duration-300 ${gridClass}`}
                            >
                                <div>
                                    <div className="flex items-center gap-4 mb-6">
                                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm text-outfit-bold">
                                            {block.label}
                                        </span>
                                        <h3 className="text-xl sm:text-2xl text-foreground text-outfit-bold">
                                            {block.title}
                                        </h3>
                                    </div>
                                    <div className="text-text-muted text-base sm:text-lg leading-relaxed text-outfit-regular">
                                        {block.content}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </SectionContainer>
        </Section>
    );
}
