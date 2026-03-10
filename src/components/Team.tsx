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
        name: "Team Member 1",
        role: "Lead Developer",
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        email: "member1@unearth.dev",
    },
    {
        name: "Team Member 2",
        role: "AI / ML Engineer",
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        email: "member2@unearth.dev",
    },
    {
        name: "Team Member 3",
        role: "Forensics Specialist",
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        email: "member3@unearth.dev",
    },
    {
        name: "Team Member 4",
        role: "Frontend Developer",
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        email: "member4@unearth.dev",
    },
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
            <SectionContainer>
                <SectionTitle
                    label="Team"
                    title="Built By"
                    description="The people behind Unearth."
                />

                <div
                    ref={gridRef}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-5"
                >
                    {TEAM.map((member) => (
                        <div key={member.name} className="team-card">
                            {/* Avatar placeholder */}
                            <div className="w-16 h-16 rounded-full bg-primary/8 flex items-center justify-center mx-auto mb-4">
                                <span className="text-xl font-bold text-primary">
                                    {member.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                </span>
                            </div>

                            <h3 className="text-lg font-semibold">{member.name}</h3>
                            <p className="text-text-muted text-sm mb-4">{member.role}</p>

                            <div className="flex items-center justify-center gap-3">
                                <a
                                    href={member.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-lg hover:bg-foreground/5 text-text-muted hover:text-foreground transition-colors"
                                    aria-label={`${member.name} GitHub`}
                                >
                                    <Github size={18} />
                                </a>
                                <a
                                    href={member.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-lg hover:bg-foreground/5 text-text-muted hover:text-foreground transition-colors"
                                    aria-label={`${member.name} LinkedIn`}
                                >
                                    <Linkedin size={18} />
                                </a>
                                <a
                                    href={`mailto:${member.email}`}
                                    className="p-2 rounded-lg hover:bg-foreground/5 text-text-muted hover:text-foreground transition-colors"
                                    aria-label={`${member.name} Email`}
                                >
                                    <Mail size={18} />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </SectionContainer>
        </Section>
    );
}
