"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import Section from "@/components/layout/Section";
import InstallCommand from "@/components/ui/CopyLink";

const HeroScene = dynamic(() => import("@/components/3d/HeroScene"), {
  ssr: false,
});

export default function Hero() {
  const labelRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      labelRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, delay: 0.2 }
    )
      .fromTo(
        titleRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        "-=0.3"
      )
      .fromTo(
        taglineRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.4"
      )
      .fromTo(
        actionsRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        "-=0.3"
      );
  }, []);

  return (
    <Section id="hero">
      {/* 3D Background */}
      <div className="absolute inset-0 -z-10">
        <HeroScene />
      </div>

      {/* Bottom-left content */}
      <div className="absolute bottom-0 left-0 w-full px-8 sm:px-16 pb-20 sm:pb-28">
        <div className="mx-auto space-y-6 max-w-6xl">
          <p
            ref={labelRef}
            className="text-sm font-mono uppercase tracking-widest text-primary"
            style={{ opacity: 0 }}
          >
            Digital Forensics Platform
          </p>

          <h1
            ref={titleRef}
            className="text-6xl sm:text-8xl lg:text-9xl font-bold tracking-tight leading-none"
            style={{ opacity: 0 }}
          >
            Unearth
          </h1>

          <p
            ref={taglineRef}
            className="text-xl sm:text-2xl text-text-secondary leading-relaxed max-w-lg"
            style={{ opacity: 0 }}
          >
            Exposing what lies beneath the surface.
          </p>

          <div ref={actionsRef} className="space-y-4 pt-2" style={{ opacity: 0 }}>
            <InstallCommand />

            <div className="flex flex-wrap gap-4">
              <a
                href="#demo"
                className="inline-flex items-center gap-2 bg-primary text-white px-7 py-3.5 rounded-xl font-medium hover:bg-primary-dark transition-all hover:shadow-lg hover:shadow-primary/20"
              >
                View Demo
              </a>

              <a
                href="https://github.com/bhargavgajare1479/unearth"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-foreground/15 text-foreground px-7 py-3.5 rounded-xl font-medium hover:bg-foreground/5 transition-all"
              >
                View Source
              </a>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
