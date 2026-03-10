interface SectionProps {
  id: string;
  className?: string;
  children: React.ReactNode;
}

export default function Section({ id, className = "", children }: SectionProps) {
  return (
    <section
      id={id}
      className={`relative min-h-screen w-full overflow-hidden ${className}`}
    >
      {children}
    </section>
  );
}
