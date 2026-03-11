import { Github } from "lucide-react";

export default function Footer() {
    return (
        <footer className="border-t border-foreground/5">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-12 sm:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 lg:gap-32 mb-12 sm:mb-16">
                    {/* Brand Section */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
                        <span className="text-2xl sm:text-3xl font-bold tracking-tight text-nord-bold">UNEARTH</span>
                        <p className="text-sm sm:text-base text-text-muted max-w-sm text-outfit-regular leading-relaxed">
                            A unified platform for digital forensic investigation, bridging the gap between data recovery and intelligent analysis.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
                        <h4 className="text-base sm:text-lg text-foreground text-outfit-semibold tracking-wide">Quick Links</h4>
                        <nav className="flex flex-col space-y-2.5">
                            <a href="#project" className="text-sm sm:text-base text-text-muted hover:text-primary transition-colors text-outfit-medium">Project</a>
                            <a href="#features" className="text-sm sm:text-base text-text-muted hover:text-primary transition-colors text-outfit-medium">Features</a>
                            <a href="#demo" className="text-sm sm:text-base text-text-muted hover:text-primary transition-colors text-outfit-medium">Demo</a>
                            <a href="#team" className="text-sm sm:text-base text-text-muted hover:text-primary transition-colors text-outfit-medium">Team</a>
                        </nav>
                    </div>
                </div>

                {/* Bottom Separator & Copyright */}
                <div className="pt-8 border-t border-foreground/10 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <span className="text-xs sm:text-sm text-text-muted text-outfit-regular text-center sm:text-left">
                        © {new Date().getFullYear()} Unearth Protocol. All rights reserved.
                    </span>

                    <div className="flex items-center gap-4 sm:gap-6">
                        <a
                            href="https://github.com/bhargavgajare1479/unearth"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-text-muted hover:text-foreground transition-all hover:scale-110 p-2"
                            aria-label="GitHub Repository"
                        >
                            <Github className="w-5 h-5 sm:w-6 sm:h-6" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
