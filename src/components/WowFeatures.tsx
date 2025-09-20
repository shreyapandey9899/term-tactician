import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  GitCompare, 
  Camera, 
  ArrowRight,
  Upload,
  FileText
} from "lucide-react";

const WowFeatures = () => {
  const features = [
    {
      icon: <GitCompare className="w-12 h-12" />,
      title: "DocuDuel",
      description: "Compare two contracts side-by-side with AI insights",
      preview: "Contract A vs Contract B",
      action: "Compare Now"
    },
    {
      icon: <Camera className="w-12 h-12" />,
      title: "Snap-a-Clause",
      description: "Upload or photograph any clause for instant analysis",
      preview: "Point • Snap • Understand",
      action: "Snap Clause"
    }
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

        {/* DocuDuel Feature Showcase */}
        <div className="mb-16">
          <Card className="p-8 bg-card/80 backdrop-blur-sm border-border/50 shadow-feature">
            <div className="text-center space-y-6 mb-8">
              <h3 className="text-3xl font-bold flex items-center justify-center gap-3">
                <GitCompare className="w-8 h-8 text-primary" />
                DocuDuel
              </h3>
              <p className="text-muted-foreground">
                Compare two contracts side-by-side with AI-powered insights and recommendations
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-accent/50 border border-border/50">
                  <div className="flex items-center gap-3 mb-2">
                    <FileText className="w-5 h-5 text-primary" />
                    <span className="font-medium">Contract A</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Employment Agreement - TechCorp</p>
                </div>
                <div className="p-4 rounded-lg bg-accent/50 border border-border/50">
                  <div className="flex items-center gap-3 mb-2">
                    <FileText className="w-5 h-5 text-secondary" />
                    <span className="font-medium">Contract B</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Employment Agreement - StartupXYZ</p>
                </div>
              </div>
              
              <div className="relative bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl p-8 min-h-48 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <GitCompare className="w-20 h-20 text-primary mx-auto animate-float" />
                  <p className="text-muted-foreground font-medium">Side-by-Side Comparison</p>
                  <div className="flex gap-2 justify-center">
                    <div className="px-3 py-1 rounded-full bg-green-500/20 text-green-700 text-xs font-medium">Better Terms</div>
                    <div className="px-3 py-1 rounded-full bg-red-500/20 text-red-700 text-xs font-medium">Risk Found</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Snap-a-Clause Feature Showcase */}
        <div className="mb-16">
          <Card className="p-8 bg-card/80 backdrop-blur-sm border-border/50 shadow-feature">
            <div className="text-center space-y-6 mb-8">
              <h3 className="text-3xl font-bold flex items-center justify-center gap-3">
                <Camera className="w-8 h-8 text-secondary" />
                Snap-a-Clause
              </h3>
              <p className="text-muted-foreground">
                Upload or photograph any clause for instant AI analysis and plain-English explanation
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative bg-gradient-to-br from-secondary/5 to-primary/5 rounded-xl p-8 min-h-48 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Camera className="w-20 h-20 text-secondary mx-auto animate-pulse" />
                  <p className="text-muted-foreground font-medium">Point, Snap, Understand</p>
                  <div className="flex gap-2 justify-center">
                    <Upload className="w-5 h-5 text-secondary animate-bounce" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-secondary/10 border border-secondary/20">
                  <h4 className="font-semibold text-foreground mb-2">Clause Analysis</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    "The Employee agrees to a non-compete period of 24 months..."
                  </p>
                  <div className="p-3 rounded bg-background/80">
                    <p className="text-xs font-medium text-secondary">AI Explanation:</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      This restricts you from working with competitors for 2 years. This may be unenforceable in your jurisdiction.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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

              <Button 
                variant="outline" 
                size="sm" 
                className="w-full border-primary/30 hover:bg-primary/5"
              >
                {feature.action} <ArrowRight className="w-4 h-4" />
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WowFeatures;