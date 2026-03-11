"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Linkedin, Mail } from "lucide-react";
import Section from "@/components/layout/Section";
import SectionContainer from "@/components/layout/SectionContainer";
import SectionTitle from "@/components/layout/SectionTitle";

gsap.registerPlugin(ScrollTrigger);

const TEAM = [
    {
        name: "Dr. Anjalidevi Patil",
        role: "Project Guide",
        work: "Provided academic guidance and technical direction throughout the project. Reviewed the system design, ensured the approach followed proper forensic practices, and helped refine the overall research and implementation strategy.",
        github: "",
        linkedin: "",
        email: ""
    },
    {
        name: "Mr. Bhargav S. Gajare",
        role: "Project Manager & Linux Expert",
        work: "Led the overall development of the project and coordinated the team. Designed the system architecture, implemented the core forensic recovery modules, and handled Linux-based filesystem analysis for Btrfs and XFS.",
        github: "https://github.com/bhargavgajare1479",
        linkedin: "https://www.linkedin.com/in/bhargavsg/",
        email: "gajarebhargav@gmail.com"
    },
    {
        name: "Mr. Divesh K. Dalvi",
        role: "Web Developer",
        work: "Designed and developed the project website and user interfaces. Built the frontend using modern web technologies and ensured the platform was responsive, interactive, and easy to navigate.",
        github: "",
        linkedin: "",
        email: ""
    },
    {
        name: "Mr. Nachiket D. Patil",
        role: "AI Developer",
        work: "Developed the AI analysis components used for content evaluation. Implemented the logic for analysing text, images, videos, and URLs to identify misinformation patterns and contextual insights.",
        github: "",
        linkedin: "",
        email: ""
    },
    {
        name: "Mr. Aayush Y. Thoke",
        role: "Documentation Manager",
        work: "Prepared and maintained the project documentation. Organised technical explanations, research references, and reports to clearly describe the system architecture, methodology, and project outcomes.",
        github: "",
        linkedin: "",
        email: ""
    }
];

export default function Team() {
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = gridRef.current?.querySelectorAll(".team-card");
            if (!cards) return;

            gsap.fromTo(
                cards,
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.1,
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
        <Section id="team" className="bg-background min-h-0">
            <SectionContainer className="max-w-7xl">
                <SectionTitle
                    label="Team"
                    title="Meet the Developers"
                    description="The individuals who are the backbone of Unearth..."
                />

                <div
                    ref={gridRef}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    {TEAM.map((member, index) => {
                        // Guide (index 0) gets centered its own row, visually matching the width of 1 standard column
                        const isGuide = index === 0;
                        const stretchClass = isGuide
                            ? "md:col-span-2 justify-self-center w-full md:w-[calc(50%-12px)]"
                            : "w-full";

                        return (
                            <div key={member.name} className={`team-card p-8 rounded-3xl bg-zinc-50 border border-zinc-100 hover:border-primary/20 hover:shadow-lg transition-all duration-300 flex flex-col h-full ${stretchClass}`}>
                                {/* Avatar placeholder */}
                                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 mx-auto sm:mx-0">
                                    <span className="text-xl text-primary text-nord-bold">
                                        {member.name
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")
                                            .substring(0, 2)}
                                    </span>
                                </div>

                                <h3 className="text-xl text-foreground mb-1 text-center sm:text-left text-nord-bold">{member.name}</h3>
                                <p className="text-primary text-sm mb-4 text-center sm:text-left text-outfit-medium">{member.role}</p>

                                <p className="text-text-muted text-sm leading-relaxed mb-8 flex-grow text-center sm:text-left text-outfit-regular">
                                    {member.work}
                                </p>

                                <div className="flex items-center gap-3 mt-auto justify-center sm:justify-start">
                                    <a
                                        href={member.github || "#"}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2.5 rounded-xl bg-black/5 hover:bg-black/10 text-text-secondary transition-colors"
                                        aria-label={`${member.name} GitHub`}
                                    >
                                        <Github size={18} />
                                    </a>
                                    <a
                                        href={member.linkedin || "#"}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2.5 rounded-xl bg-black/5 hover:bg-black/10 text-text-secondary transition-colors"
                                        aria-label={`${member.name} LinkedIn`}
                                    >
                                        <Linkedin size={18} />
                                    </a>
                                    <a
                                        href={member.email ? `mailto:${member.email}` : "#"}
                                        className="p-2.5 rounded-xl bg-black/5 hover:bg-black/10 text-text-secondary transition-colors"
                                        aria-label={`${member.name} Email`}
                                    >
                                        <Mail size={18} />
                                    </a>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </SectionContainer>
        </Section>
    );
}
