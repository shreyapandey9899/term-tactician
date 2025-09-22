import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, MessageSquare, Calendar, MapPin, Edit3, Clock, Globe } from "lucide-react";

const Solution = () => {
  const features = [
    {
      icon: <Edit3 className="w-10 h-10" />,
      title: "Negotiation Copilot",
      subtitle: "Transform Problems into Solutions",
      description: "Don't just identify unfair clauses—fix them. Our AI suggests fairer alternative language and even drafts the email to propose changes to the other party.",
      features: ["Smart clause rewriting", "Email templates", "Legal precedents", "Risk assessment"],
      color: "gradient-primary",
      accent: "from-primary/10 to-primary/5"
    },
    {
      icon: <Calendar className="w-10 h-10" />,
      title: "DutyGuard",
      subtitle: "Never Miss Another Deadline",
      description: "Transform static contracts into dynamic roadmaps. Extract all obligations and deadlines, then sync them directly to your calendar with smart reminders.",
      features: ["Calendar integration", "Deadline tracking", "Obligation alerts", "Progress monitoring"],
      color: "gradient-warning",
      accent: "from-yellow-500/10 to-yellow-500/5"
    },
    {
      icon: <Globe className="w-10 h-10" />,
      title: "GeoLegal Lens",
      subtitle: "Location-Aware Legal Intelligence",
      description: "Get hyper-localized insights that protect you under your specific jurisdiction. Know which clauses are unenforceable in your area before you sign.",
      features: ["Local law validation", "Jurisdiction analysis", "Compliance checking", "Regional expertise"],
      color: "gradient-secondary",
      accent: "from-teal-500/10 to-teal-500/5"
    }
  ];

  return (
    <section id="features" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">
            Your AI-Powered
            <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Legal Co-pilot
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We don't just analyze contracts—we empower you to take control. 
            Here's how we transform confusion into confidence and fear into fairness.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="group relative overflow-hidden p-8 bg-card/80 backdrop-blur-sm border-border/50 hover:shadow-hero transition-smooth">
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.accent} opacity-0 group-hover:opacity-100 transition-smooth`}></div>
              
              <div className="relative space-y-6">
                <div className={`w-20 h-20 rounded-2xl ${feature.color} flex items-center justify-center text-white shadow-feature`}>
                  {feature.icon}
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-foreground">{feature.title}</h3>
                  <p className="text-sm font-semibold text-primary">{feature.subtitle}</p>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>

                <div className="space-y-2">
                  {feature.features.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      {item}
                    </div>
                  ))}
                </div>

                <Button variant="outline" className="w-full border-primary/30 hover:bg-primary/5 group-hover:border-primary/50">
                  Explore Feature <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <div className="inline-flex items-center gap-4 p-6 rounded-2xl bg-card border border-border/50 shadow-soft">
            <MessageSquare className="w-12 h-12 text-primary" />
            <div className="text-left">
              <div className="text-lg font-semibold text-foreground">The Result?</div>
              <div className="text-muted-foreground">
                You become an active, informed participant in your own legal agreements.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solution;