import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Edit3, Calendar, Globe, Zap, Shield, Target } from "lucide-react";

const Features = () => {
  const pillars = [
    {
      icon: <Edit3 className="w-8 h-8" />,
      title: "Negotiation Copilot",
      subtitle: "From Passive Analysis to Active Empowerment",
      description: "Don't just identify problems—solve them. Our AI drafts fairer alternative language and even helps you write the email to propose changes.",
      features: ["Smart clause rewriting", "Email templates", "Legal precedents", "Risk assessment"],
      color: "gradient-primary"
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "DutyGuard",
      subtitle: "Full-Lifecycle Contract Management",
      description: "Transform static documents into dynamic roadmaps. Sync deadlines and obligations directly into your calendar and never miss a critical date.",
      features: ["Calendar integration", "Deadline tracking", "Obligation alerts", "Progress monitoring"],
      color: "gradient-trust"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "GeoLegal Lens",
      subtitle: "Hyper-Contextual & Localized Intelligence",
      description: "Law isn't just about language—it's about location. Get insights that protect you under your specific local jurisdiction.",
      features: ["Local law validation", "Jurisdiction analysis", "Compliance checking", "Regional expertise"],
      color: "gradient-feature"
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold">
            The Three Pillars of Your
            <span className="block gradient-primary bg-clip-text text-transparent">Legal Empowerment</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We don't just analyze—we empower. Here's how we transform you from a passive reader into an active legal participant.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {pillars.map((pillar, index) => (
            <Card key={index} className="p-8 shadow-feature hover:shadow-hero transition-smooth border-border/50 bg-card/80 backdrop-blur-sm">
              <div className="space-y-6">
                <div className={`w-16 h-16 rounded-2xl ${pillar.color} flex items-center justify-center text-white`}>
                  {pillar.icon}
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-foreground">{pillar.title}</h3>
                  <p className="text-sm font-medium text-primary">{pillar.subtitle}</p>
                  <p className="text-muted-foreground leading-relaxed">{pillar.description}</p>
                </div>

                <ul className="space-y-2">
                  {pillar.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button variant="feature" className="w-full">
                  Learn More <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h3 className="text-3xl font-bold">Ready to Transform Your Legal Experience?</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of users who've moved from confusion to confidence with their legal documents.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" className="text-lg px-8 py-4">
              <Zap className="w-5 h-5" />
              Start Free Analysis
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4">
              <Shield className="w-5 h-5" />
              Book a Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;