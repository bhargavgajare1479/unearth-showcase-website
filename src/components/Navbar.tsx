"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Menu, X } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
    { label: "Project", href: "#project" },
    { label: "Features", href: "#features" },
    { label: "Demo", href: "#demo" },
    { label: "Team", href: "#team" },
];

export default function Navbar() {
    const navRef = useRef<HTMLElement>(null);
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        gsap.fromTo(
            navRef.current,
            { y: -20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, delay: 0.8, ease: "power2.out" }
        );
    }, []);

    const handleClick = (href: string) => {
        setMobileOpen(false);
        const el = document.querySelector(href);
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <nav
            ref={navRef}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "nav-glass" : "bg-transparent"
                }`}
            style={{ opacity: 0 }}
        >
            <div className="mx-auto max-w-7xl flex items-center justify-between px-6 sm:px-10 py-4">
                {/* Logo */}
                <a
                    href="#hero"
                    onClick={(e) => {
                        e.preventDefault();
                        handleClick("#hero");
                    }}
                    className="text-lg font-bold tracking-tight"
                >
                    <img src="logo.svg" alt="Unearth Logo" className="h-8 w-auto hover:opacity-80 transition-opacity" />
                </a>

                {/* Desktop links */}
                <div className="hidden sm:flex items-center gap-8">
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={(e) => {
                                e.preventDefault();
                                handleClick(link.href);
                            }}
                            className="text-sm text-text-muted hover:text-foreground transition-colors"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                {/* Mobile toggle */}
                <button
                    className="sm:hidden p-2"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle menu"
                >
                    {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Mobile menu */}
            {mobileOpen && (
                <div className="sm:hidden nav-glass border-t border-foreground/5">
                    <div className="flex flex-col py-4 px-6 gap-4">
                        {NAV_LINKS.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleClick(link.href);
                                }}
                                className="text-sm text-text-muted hover:text-foreground transition-colors py-2"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}
