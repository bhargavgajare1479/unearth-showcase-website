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
  const titleCharsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  const titleText = "Unearth".split("");

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      labelRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 0.2 }
    )
      .fromTo(
        titleCharsRef.current,
        { y: 40, opacity: 0, filter: "blur(8px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.2, stagger: 0.05, ease: "expo.out" },
        "-=0.4"
      )
      .fromTo(
        taglineRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.8"
      )
      .fromTo(
        actionsRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.6"
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
        <div className="mx-auto max-w-7xl">
          <div className="space-y-6 relative z-10 max-w-xl">
            <p
              ref={labelRef}
              className="text-sm font-mono uppercase tracking-widest text-primary font-bold"
              style={{ opacity: 0 }}
            >
              Digital Forensics Platform
            </p>

            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-none flex">
              {titleText.map((char, i) => (
                <span
                  key={i}
                  ref={(el) => {
                    titleCharsRef.current[i] = el;
                  }}
                  className="inline-block"
                  style={{ opacity: 0, filter: "blur(8px)" }}
                >
                  {char}
                </span>
              ))}
            </h1>

            <p
              ref={taglineRef}
              className="text-xl text-text-secondary leading-relaxed max-w-md font-medium"
              style={{ opacity: 0 }}
            >
              Exposing what lies beneath the surface.
            </p>

            <div ref={actionsRef} className="space-y-4 pt-4" style={{ opacity: 0 }}>
              <InstallCommand />

              <div className="flex flex-wrap gap-4 pt-2">
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
                  className="inline-flex items-center gap-2 bg-white/50 border border-foreground/10 text-foreground px-7 py-3.5 rounded-xl font-medium hover:bg-white transition-all"
                >
                  View Source
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
