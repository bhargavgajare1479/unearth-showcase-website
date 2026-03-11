import Hero from "@/components/Hero";
import Project from "@/components/Project";
import Features from "@/components/Features";
import Demo from "@/components/Demo";
import Team from "@/components/Team";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <div className="section-divider" />
        <Demo />
        <div className="section-divider" />
        <Project />
        <div className="section-divider" />
        <Features />
        <div className="section-divider" />
        <Team />
      </main>
    </>
  );
}
