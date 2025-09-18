import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Network, 
  MessageCircle, 
  GitCompare, 
  Camera, 
  ArrowRight,
  Shield,
  AlertTriangle,
  CheckCircle,
  HelpCircle
} from "lucide-react";

const WowFeatures = () => {
  const features = [
    {
      icon: <Network className="w-12 h-12" />,
      title: "Interactive Risk Map",
      description: "Visual mindmap of your contract with color-coded clauses",
      preview: "Safe • Risky • Unusual",
      colors: ["gradient-trust", "gradient-warning", "gradient-danger"],
      action: "Explore Map"
    },
    {
      icon: <MessageCircle className="w-12 h-12" />,
      title: "What If? Simulator",
      description: "Ask questions about scenarios and get instant answers",
      preview: "What if I break the lease early?",
      colors: ["gradient-secondary"],
      action: "Try Simulator"
    },
    {
      icon: <GitCompare className="w-12 h-12" />,
      title: "DocuDuel",
      description: "Compare two contracts side-by-side with AI insights",
      preview: "Contract A vs Contract B",
      colors: ["gradient-primary"],
      action: "Compare Now"
    },
    {
      icon: <Camera className="w-12 h-12" />,
      title: "Snap-a-Clause",
      description: "Upload or photograph any clause for instant analysis",
      preview: "Point • Snap • Understand",
      colors: ["gradient-warning"],
      action: "Snap Clause"
    }
  ];

  const clauseTypes = [
    { icon: <CheckCircle className="w-6 h-6" />, label: "Safe Terms", color: "text-green-600" },
    { icon: <AlertTriangle className="w-6 h-6" />, label: "Risky Clauses", color: "text-amber-600" },
    { icon: <Shield className="w-6 h-6" />, label: "Unusual Terms", color: "text-red-600" }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">
            Wow Features That
            <span className="block bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              Showcase Our Power
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Experience the future of legal document analysis with interactive, 
            visual tools that make complex contracts simple to understand.
          </p>
        </div>

        {/* Interactive Risk Map Demo */}
        <div className="mb-16">
          <Card className="p-8 bg-card/80 backdrop-blur-sm border-border/50 shadow-feature">
            <div className="text-center space-y-6 mb-8">
              <h3 className="text-3xl font-bold flex items-center justify-center gap-3">
                <Network className="w-8 h-8 text-primary" />
                Interactive Risk Map
              </h3>
              <p className="text-muted-foreground">
                Visualize your contract as an interactive mindmap with color-coded risk levels
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {clauseTypes.map((type, index) => (
                <div key={index} className="flex items-center gap-3 p-4 rounded-lg bg-accent/50">
                  <div className={type.color}>
                    {type.icon}
                  </div>
                  <span className="font-medium text-foreground">{type.label}</span>
                </div>
              ))}
            </div>

            <div className="relative bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl p-8 min-h-48 flex items-center justify-center">
              <div className="text-center space-y-4">
                <Network className="w-20 h-20 text-primary mx-auto animate-pulse-glow" />
                <p className="text-muted-foreground">Interactive Contract Visualization</p>
                <div className="flex gap-2 justify-center">
                  <div className="w-3 h-3 rounded-full gradient-trust animate-pulse"></div>
                  <div className="w-3 h-3 rounded-full gradient-warning animate-pulse" style={{animationDelay: '0.5s'}}></div>
                  <div className="w-3 h-3 rounded-full gradient-danger animate-pulse" style={{animationDelay: '1s'}}></div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="group p-6 bg-card/80 backdrop-blur-sm border-border/50 hover:shadow-hero transition-smooth text-center space-y-4">
              <div className="w-20 h-20 mx-auto rounded-2xl gradient-primary flex items-center justify-center text-white shadow-feature group-hover:animate-float">
                {feature.icon}
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                <div className="text-xs font-medium text-primary">{feature.preview}</div>
              </div>

              <Button variant="outline" size="sm" className="w-full border-primary/30 hover:bg-primary/5">
                {feature.action} <ArrowRight className="w-4 h-4" />
              </Button>
            </Card>
          ))}
        </div>

        {/* What If Simulator Preview */}
        <div className="mt-16">
          <Card className="p-8 bg-card/80 backdrop-blur-sm border-border/50 shadow-feature">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <h3 className="text-3xl font-bold flex items-center gap-3">
                  <HelpCircle className="w-8 h-8 text-secondary" />
                  "What If?" Simulator
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Ask natural language questions about your contract scenarios 
                  and get instant, AI-powered answers with legal backing.
                </p>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-accent/50 text-sm">
                    <strong>Q:</strong> "What if I break the lease early?"
                  </div>
                  <div className="p-3 rounded-lg gradient-secondary text-white text-sm">
                    <strong>A:</strong> Based on Section 8.2, you'll owe 2 months rent penalty plus forfeiture of security deposit...
                  </div>
                </div>
              </div>
              <div className="relative bg-gradient-to-br from-secondary/10 to-primary/10 rounded-xl p-8 min-h-48 flex items-center justify-center">
                <MessageCircle className="w-20 h-20 text-secondary animate-float" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default WowFeatures;