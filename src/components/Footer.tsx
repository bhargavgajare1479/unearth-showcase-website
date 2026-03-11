import { Github } from "lucide-react";

export default function Footer() {
    return (
        <footer className="border-t border-foreground/5">
            <div className="mx-auto max-w-3xl px-8 sm:px-16 py-12">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="flex flex-col items-center sm:items-start gap-1">
                        <span className="text-sm text-nord-bold">Unearth</span>
                        <span className="text-xs text-text-muted text-outfit-regular">
                            Exposing what lies beneath the surface.
                        </span>
                    </div>

                    <div className="flex items-center gap-6">
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-text-muted hover:text-foreground transition-colors"
                            aria-label="GitHub Repository"
                        >
                            <Github size={18} />
                        </a>
                        <span className="text-xs text-text-muted text-outfit-regular">
                            © {new Date().getFullYear()} Unearth. All rights reserved.
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
