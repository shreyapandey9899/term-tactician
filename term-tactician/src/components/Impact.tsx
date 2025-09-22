import { Card } from "@/components/ui/card";
import { Users, Briefcase, Home, UserCheck, TrendingUp, Shield, Clock } from "lucide-react";

const Impact = () => {
  const userTypes = [
    {
      icon: <Briefcase className="w-12 h-12" />,
      title: "Freelancers",
      description: "Stop accepting unfair payment terms and protect your creative work",
      stats: "89% report better contracts",
      color: "gradient-primary"
    },
    {
      icon: <Home className="w-12 h-12" />,
      title: "Tenants",
      description: "Understand your rental rights and avoid predatory lease clauses",
      stats: "73% identify hidden fees",
      color: "gradient-secondary"
    },
    {
      icon: <UserCheck className="w-12 h-12" />,
      title: "Employees", 
      description: "Navigate employment contracts with confidence and fairness",
      stats: "92% feel more confident",
      color: "gradient-trust"
    }
  ];

  const impacts = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      metric: "$2.3M",
      label: "Saved in unfair clauses",
      color: "text-green-600"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      metric: "15K+",
      label: "Contracts analyzed",
      color: "text-blue-600"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      metric: "48hrs",
      label: "Average time saved",
      color: "text-purple-600"
    },
    {
      icon: <Users className="w-8 h-8" />,
      metric: "98%",
      label: "User satisfaction",
      color: "text-teal-600"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">
            Leveling the
            <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Legal Playing Field
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Empowering everyday people to negotiate better terms, understand their rights, 
            and protect themselves from unfair agreements.
          </p>
        </div>

        {/* User Types */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {userTypes.map((user, index) => (
            <Card key={index} className="group p-8 bg-card/80 backdrop-blur-sm border-border/50 hover:shadow-hero transition-smooth text-center space-y-6">
              <div className={`w-20 h-20 mx-auto rounded-2xl ${user.color} flex items-center justify-center text-white shadow-feature group-hover:animate-float`}>
                {user.icon}
              </div>
              
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-foreground">{user.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{user.description}</p>
                <div className="text-sm font-semibold text-primary">{user.stats}</div>
              </div>
            </Card>
          ))}
        </div>

        {/* Impact Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {impacts.map((impact, index) => (
            <Card key={index} className="p-6 bg-card/80 backdrop-blur-sm border-border/50 text-center space-y-3">
              <div className={`${impact.color} mx-auto w-fit`}>
                {impact.icon}
              </div>
              <div className="text-3xl font-bold text-foreground">{impact.metric}</div>
              <div className="text-sm text-muted-foreground">{impact.label}</div>
            </Card>
          ))}
        </div>

        {/* Mission Statement */}
        <div className="text-center">
          <Card className="inline-block p-8 bg-card/80 backdrop-blur-sm border-border/50 shadow-feature max-w-4xl">
            <div className="space-y-4">
              <Users className="w-16 h-16 text-primary mx-auto" />
              <h3 className="text-2xl font-bold text-foreground">Our Mission</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Legal documents shouldn't be weapons against everyday people. 
                We're democratizing legal knowledge, one contract at a time, 
                ensuring everyone has the tools to protect their rights and negotiate fairly.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Impact;