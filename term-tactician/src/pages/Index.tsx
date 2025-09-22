import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";
import WowFeatures from "@/components/WowFeatures";
import HowItWorks from "@/components/HowItWorks";
import Impact from "@/components/Impact";
import Demo from "@/components/Demo";
import Footer from "@/components/Footer";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    // Preconnect advocate URL to speed up first open if configured
    const href = (import.meta as any).env?.VITE_ADVOCATE_URL;
    if (!href) return;
    const link = document.createElement("link");
    link.rel = "preconnect";
    link.href = href;
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <WowFeatures />
        <HowItWorks />
        <Impact />
        <Demo />
      </main>
      <Footer />
    </div>
  );
};

export default Index;