"use client";

import { useState, useEffect, useRef } from "react";

const CHARS = "!<>-_\\\\/[]{}—=+*^?#________";

interface ScrambleTextProps {
    text: string;
    duration?: number;
    delay?: number;
    className?: string;
}

export default function ScrambleText({
    text,
    duration = 1500,
    delay = 0,
    className = "",
}: ScrambleTextProps) {
    const [displayText, setDisplayText] = useState("");
    const [isScrambling, setIsScrambling] = useState(false);
    const frameRef = useRef(0);
    const startTimeRef = useRef(0);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        const startScramble = () => {
            setIsScrambling(true);
            startTimeRef.current = performance.now();

            const animate = (time: number) => {
                const elapsed = time - startTimeRef.current;
                const progress = Math.min(elapsed / duration, 1);

                if (progress < 1) {
                    // Calculate how many characters of the *actual* text should be revealed
                    const revealedCount = Math.floor(text.length * progress);

                    let currentStr = "";
                    for (let i = 0; i < text.length; i++) {
                        if (i < revealedCount) {
                            currentStr += text[i];
                        } else {
                            currentStr += CHARS[Math.floor(Math.random() * CHARS.length)];
                        }
                    }

                    setDisplayText(currentStr);
                    frameRef.current = requestAnimationFrame(animate);
                } else {
                    setDisplayText(text);
                    setIsScrambling(false);
                }
            };

            frameRef.current = requestAnimationFrame(animate);
        };

        timeoutId = setTimeout(startScramble, delay * 1000);

        return () => {
            clearTimeout(timeoutId);
            cancelAnimationFrame(frameRef.current);
        };
    }, [text, duration, delay]);

    // Initial state before delay finishes
    if (!isScrambling && displayText === "") {
        // Return empty spaces to maintain layout width or just render random chars
        return <span className={className}>{text.replace(/./g, "—")}</span>;
    }

    return <span className={className}>{displayText}</span>;
}
