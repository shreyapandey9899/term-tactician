import { Button } from "@/components/ui/button";
import { ArrowRight, Upload, FileText } from "lucide-react";
import heroImage from "@/assets/hero-legal-ai.jpg";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-accent/30 to-background py-24 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-primary via-primary to-foreground bg-clip-text text-transparent leading-tight">
                Don't Just Read the Fine Print.
                <span className="block text-primary">Rewrite It.</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
                Transform from a passive, confused reader into an active, confident participant in your legal agreements. Your AI-powered personal legal advocate.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="text-lg px-8 py-4">
                <Upload className="w-5 h-5" />
                Upload Your Document
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button variant="feature" size="lg" className="text-lg px-8 py-4">
                <FileText className="w-5 h-5" />
                See How It Works
              </Button>
            </div>

            <div className="flex items-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full gradient-trust"></div>
                Secure & Private
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full gradient-trust"></div>
                Free Analysis
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full gradient-trust"></div>
                Instant Results
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-hero">
              <img 
                src={heroImage} 
                alt="AI-powered legal document analysis interface showing contract optimization"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 gradient-hero opacity-20"></div>
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 gradient-primary rounded-full opacity-20 blur-xl"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 gradient-trust rounded-full opacity-15 blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;