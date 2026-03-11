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

  const titleText = "UNEARTH".split("");

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

      <div className="absolute bottom-0 left-0 w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 pb-12 sm:pb-16 md:pb-20 lg:pb-24 xl:pb-28">
        <div className="mx-auto max-w-6xl">
          <div className="space-y-4 sm:space-y-6 relative z-10 max-w-2xl">
            <p
              ref={labelRef}
              className="text-xs sm:text-sm md:text-base uppercase tracking-widest text-primary text-outfit-bold"
              style={{ opacity: 0 }}
            >
              Digital Forensics Platform
            </p>

            <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl tracking-tight leading-none flex uppercase text-nord-bold flex-wrap">
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
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-text-secondary leading-relaxed max-w-sm sm:max-w-md lg:max-w-lg text-outfit-medium"
              style={{ opacity: 0 }}
            >
              Exposing what lies beneath the surface...
            </p>

            <div ref={actionsRef} className="space-y-4 pt-4 sm:pt-6" style={{ opacity: 0 }}>
              <div className="w-full sm:w-auto overflow-hidden">
                <InstallCommand />
              </div>

              <div className="flex flex-col xs:flex-row flex-wrap gap-3 sm:gap-4 pt-2">
                <a
                  href="#demo"
                  className="inline-flex items-center justify-center gap-2 bg-primary text-white px-btn-x py-btn-y rounded-xl text-sm sm:text-base md:text-lg text-outfit-medium hover:bg-primary-dark transition-all hover:shadow-lg hover:shadow-primary/20 w-full xs:w-auto px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4"
                >
                  View Demo
                </a>

                <a
                  href="https://github.com/bhargavgajare1479/unearth"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-white/50 border border-foreground/10 text-foreground px-btn-x py-btn-y text-sm sm:text-base md:text-lg rounded-xl text-outfit-medium hover:bg-white transition-all w-full xs:w-auto px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4"
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
