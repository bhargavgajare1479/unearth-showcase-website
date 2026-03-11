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
            className={`mx-auto w-full max-w-3xl px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-16 sm:py-24 lg:py-32 ${className}`}
        >
            {children}
        </div>
    );
}
