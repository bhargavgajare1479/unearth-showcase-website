interface SectionContainerProps {
    className?: string;
    children: React.ReactNode;
}

export default function SectionContainer({
    className = "",
    children,
}: SectionContainerProps) {
    return (
        <div
            className={`mx-auto w-full max-w-3xl px-8 sm:px-16 py-32 ${className}`}
        >
            {children}
        </div>
    );
}
