import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";
import WowFeatures from "@/components/WowFeatures";
import HowItWorks from "@/components/HowItWorks";
import Impact from "@/components/Impact";
import Demo from "@/components/Demo";
import Footer from "@/components/Footer";

const Index = () => {
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