import { Card } from "@/components/ui/card";
import { Upload, Brain, Zap, ArrowRight } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      step: "01",
      icon: <Upload className="w-12 h-12" />,
      title: "Upload Your Contract",
      description: "Simply upload your PDF, DOCX file, or snap a photo of any clause. Our AI accepts multiple formats and processes them instantly.",
      formats: ["PDF", "DOCX", "Image"],
      color: "gradient-primary"
    },
    {
      step: "02", 
      icon: <Brain className="w-12 h-12" />,
      title: "AI Analyzes & Explains",
      description: "Our Google Cloud-powered AI reads through every clause, identifies risks, deadlines, and obligations, then explains everything in plain English.",
      formats: ["Risk Analysis", "Plain English", "Key Terms"],
      color: "gradient-secondary"
    },
    {
      step: "03",
      icon: <Zap className="w-12 h-12" />,
      title: "Get Actionable Insights",
      description: "Receive specific actions you can take: negotiate better terms, set calendar reminders, understand your rights, and validate against local laws.",
      formats: ["Negotiation Help", "Calendar Sync", "Legal Validation"],
      color: "gradient-trust"
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            From upload to empowerment in just three simple steps. 
            Experience the fastest path from confusion to confidence.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 relative">
          {/* Connection Lines */}
          <div className="hidden lg:block absolute top-1/2 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-primary via-secondary to-green-500 -translate-y-1/2 z-0"></div>
          
          {steps.map((step, index) => (
            <Card key={index} className="relative p-8 bg-card/80 backdrop-blur-sm border-border/50 hover:shadow-hero transition-smooth text-center space-y-6 z-10">
              {/* Step Number */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-foreground text-background rounded-full flex items-center justify-center text-sm font-bold">
                {step.step}
              </div>

              {/* Icon */}
              <div className={`w-24 h-24 mx-auto rounded-2xl ${step.color} flex items-center justify-center text-white shadow-feature animate-pulse-glow`}>
                {step.icon}
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-foreground">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>

              {/* Format Tags */}
              <div className="flex flex-wrap justify-center gap-2">
                {step.formats.map((format, idx) => (
                  <span 
                    key={idx} 
                    className="px-3 py-1 text-xs font-medium bg-accent/50 text-accent-foreground rounded-full"
                  >
                    {format}
                  </span>
                ))}
              </div>

              {/* Arrow for mobile */}
              {index < steps.length - 1 && (
                <div className="lg:hidden flex justify-center pt-4">
                  <ArrowRight className="w-6 h-6 text-muted-foreground" />
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Process Summary */}
        <div className="mt-16 text-center">
          <Card className="inline-block p-6 bg-card/80 backdrop-blur-sm border-border/50 shadow-soft">
            <div className="flex items-center gap-4">
              <div className="text-left">
                <div className="text-lg font-semibold text-foreground">Average Processing Time</div>
                <div className="text-muted-foreground">Upload to insights in under 30 seconds</div>
              </div>
              <div className="text-4xl font-bold gradient-primary bg-clip-text text-transparent">
                30s
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;