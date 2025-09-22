import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Shield, Zap, Scale, Brain } from "lucide-react";
import { useState } from "react";
import ClauseCartographer from "./ClauseCartographer";

const Hero = () => {
  const [showClauseCartographer, setShowClauseCartographer] = useState(false);

  return (
    <>
      {showClauseCartographer && (
        <ClauseCartographer onClose={() => setShowClauseCartographer(false)} />
      )}
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-accent/30 to-background pt-16">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 gradient-trust rounded-full opacity-20 blur-3xl animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 gradient-warning rounded-full opacity-15 blur-2xl animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 gradient-secondary rounded-full opacity-10 blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          {/* Main Headline */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                From Contract
              </span>
              <br />
              <span className="text-foreground">to Confidence</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              AI that demystifies legal documents and empowers you to negotiate fairer terms, 
              manage obligations, and understand your rights.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 gradient-primary text-white hover:opacity-90 shadow-hero animate-pulse-glow"
              onClick={() => setShowClauseCartographer(true)}
            >
              <Brain className="w-5 h-5" />
              Launch Clause Cartographer
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-primary/30 hover:bg-primary/5">
              <Shield className="w-5 h-5" />
              Learn More
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground pt-8">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full gradient-trust"></div>
              Google Cloud Powered
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full gradient-trust"></div>
              Secure & Private
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full gradient-trust"></div>
              Instant Analysis
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full gradient-trust"></div>
              Hackathon Ready
            </div>
          </div>

          {/* Hero Visual Placeholder */}
          <div className="relative mt-16">
            <div className="relative mx-auto max-w-4xl">
              <div className="relative rounded-2xl overflow-hidden shadow-hero bg-card border border-border/50 p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 rounded-lg bg-accent/50">
                      <Scale className="w-8 h-8 text-primary" />
                      <div className="text-left">
                        <div className="font-semibold text-foreground">AI Legal Analysis</div>
                        <div className="text-sm text-muted-foreground">Balance scales + Neural network</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary/10">
                      <Zap className="w-8 h-8 text-secondary" />
                      <div className="text-left">
                        <div className="font-semibold text-foreground">Instant Processing</div>
                        <div className="text-sm text-muted-foreground">Upload → Analyze → Empower</div>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="w-full h-48 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center">
                      <div className="text-center space-y-2">
                        <Scale className="w-16 h-16 text-primary mx-auto animate-float" />
                        <p className="text-muted-foreground">AI + Law Visualization</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default Hero;