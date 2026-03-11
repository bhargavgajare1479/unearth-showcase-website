"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";

export default function Demo() {
    const containerRef = useRef(null);
    const [isMuted, setIsMuted] = useState(true);
    const [showText, setShowText] = useState(true);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
    const scrollOpacity = useTransform(scrollYProgress, [0.8, 1], [1, 0.5]);

    useEffect(() => {
        // Hide text after 3 seconds
        const timer = setTimeout(() => {
            setShowText(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    return (
        <section ref={containerRef} id="demo" className="h-[200vh] relative bg-background">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden group">
                <motion.div
                    style={{ scale }}
                    className="w-full h-full relative"
                >
                    <AnimatePresence>
                        {showText && (
                            <div className="absolute inset-0 bg-black/10 z-10 flex items-center justify-center pointer-events-none">
                                <motion.h2
                                    style={{ opacity: scrollOpacity }}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0, transition: { duration: 1 } }}
                                    className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl uppercase tracking-tighter drop-shadow-lg mix-blend-exclusion text-nord-bold"
                                >
                                    demo
                                </motion.h2>
                            </div>
                        )}
                    </AnimatePresence>

                    {/* Video wrapper */}
                    <div className="w-full h-full bg-zinc-900 relative">
                        {/* Placeholder gradient before video loads or if video is empty */}
                        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 to-zinc-950 flex items-center justify-center pointer-events-none">
                            <p className="text-white/50 text-sm text-outfit-regular">Demo video coming soon</p>
                        </div>

                        {/* 
                         <video
                            className="w-full h-full object-cover relative z-10"
                            autoPlay
                            muted={isMuted}
                            loop
                            playsInline
                            src="/demo.mp4"
                        />
                        */}
                    </div>
                </motion.div>

                {/* Audio Control */}
                <button
                    onClick={toggleMute}
                    className="absolute bottom-8 right-8 top-auto z-30 p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white/20 transition-all active:scale-95 group-hover:opacity-100 opacity-0 duration-300"
                    aria-label={isMuted ? "Unmute video" : "Mute video"}
                >
                    {isMuted ? <FaVolumeMute className="text-xl" /> : <FaVolumeUp className="text-xl" />}
                </button>
            </div>
        </section>
    );
}
