import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, ArrowRight, Zap, Trophy, Code, Users, Brain } from "lucide-react";
import { useState } from "react";
import ClauseCartographer from "./ClauseCartographer";

const Demo = () => {
  const [showClauseCartographer, setShowClauseCartographer] = useState(false);

  const demoFeatures = [
    "Interactive contract analysis",
    "Real-time risk assessment", 
    "AI-powered clause mapping",
    "Visual risk visualization",
    "Smart negotiation suggestions"
  ];

  const hackathonInfo = [
    { icon: <Trophy className="w-6 h-6" />, label: "Google Cloud Hackathon 2024" },
    { icon: <Code className="w-6 h-6" />, label: "Built with Generative AI" },
    { icon: <Users className="w-6 h-6" />, label: "Team LegalEase" },
    { icon: <Zap className="w-6 h-6" />, label: "48-hour build" }
  ];

  return (
    <>
      {showClauseCartographer && (
        <ClauseCartographer onClose={() => setShowClauseCartographer(false)} />
      )}
      <section id="demo" className="py-24 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">
            See LegalEase in
            <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Action
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Experience the power of AI-driven legal analysis. 
            Try our hackathon demo and see how we transform contracts from confusion to confidence.
          </p>
        </div>

        {/* Main Demo Card */}
        <Card className="max-w-4xl mx-auto p-8 bg-card/90 backdrop-blur-sm border-border/50 shadow-hero mb-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-foreground">
                Interactive Demo Experience
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Upload a sample contract or use our provided examples to see 
                real-time analysis, risk assessment, and negotiation suggestions.
              </p>

              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">What You'll Experience:</h4>
                {demoFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="w-2 h-2 rounded-full gradient-primary"></div>
                    {feature}
                  </div>
                ))}
              </div>

              <Button 
                size="lg" 
                className="gradient-primary text-white hover:opacity-90 shadow-feature animate-pulse-glow"
                onClick={() => setShowClauseCartographer(true)}
              >
                <Brain className="w-5 h-5" />
                Launch Clause Cartographer
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>

            <div className="relative">
              <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 p-8 min-h-80 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Play className="w-20 h-20 text-primary mx-auto animate-pulse-glow" />
                  <p className="text-muted-foreground">Interactive Demo Interface</p>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="h-2 rounded gradient-trust"></div>
                    <div className="h-2 rounded gradient-warning"></div>
                    <div className="h-2 rounded gradient-danger"></div>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-2 -right-2 w-12 h-12 gradient-trust rounded-full opacity-60 animate-float blur-sm"></div>
              <div className="absolute -bottom-2 -left-2 w-8 h-8 gradient-warning rounded-full opacity-40 animate-float blur-sm" style={{animationDelay: '1s'}}></div>
            </div>
          </div>
        </Card>

        {/* Hackathon Info */}
        <div className="text-center space-y-8">
          <h3 className="text-2xl font-bold text-foreground">Hackathon Project Details</h3>
          
          <div className="flex flex-wrap justify-center gap-6">
            {hackathonInfo.map((info, index) => (
              <div key={index} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card/80 border border-border/50">
                <div className="text-primary">
                  {info.icon}
                </div>
                <span className="text-sm font-medium text-foreground">{info.label}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="gradient-primary text-white"
              onClick={() => setShowClauseCartographer(true)}
            >
              <Brain className="w-5 h-5" />
              Try Clause Cartographer
            </Button>
            <Button variant="outline" size="lg" className="border-primary/30 hover:bg-primary/5">
              <Code className="w-5 h-5" />
              View Project Details
            </Button>
          </div>

          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Built during Google Cloud Hackathon 2024 using cutting-edge Generative AI technology. 
            This demo showcases the potential of AI to democratize legal knowledge and empower individuals.
          </p>
        </div>
      </div>
    </section>
    </>
  );
};

export default Demo;