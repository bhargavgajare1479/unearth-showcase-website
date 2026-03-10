"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play } from "lucide-react";
import Section from "@/components/layout/Section";
import SectionContainer from "@/components/layout/SectionContainer";
import SectionTitle from "@/components/layout/SectionTitle";

gsap.registerPlugin(ScrollTrigger);

export default function Demo() {
    const frameRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (!frameRef.current) return;

            gsap.fromTo(
                frameRef.current,
                { y: 60, opacity: 0, scale: 0.96 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: frameRef.current,
                        start: "top 85%",
                        once: true,
                    },
                }
            );
        }, frameRef);

        return () => ctx.revert();
    }, []);

    return (
        <Section id="demo" className="bg-background">
            <SectionContainer>
                <SectionTitle
                    label="Demo"
                    title="See Unearth in Action"
                    description="Watch how the platform recovers deleted files, analyzes content, and generates forensic reports."
                />

                <div ref={frameRef} className="demo-frame" style={{ opacity: 0 }}>
                    {/* Video embed — replace src with actual demo video URL */}
                    <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                        {/* Placeholder state */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gradient-to-b from-zinc-900 to-zinc-950">
                            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/10">
                                <Play size={28} className="text-white ml-1" />
                            </div>
                            <p className="text-white/50 text-sm font-mono">
                                Demo video coming soon
                            </p>
                        </div>

                        {/*
            Uncomment and replace with actual video:
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
              title="Unearth Demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            */}
                    </div>
                </div>
            </SectionContainer>
        </Section>
    );
}
