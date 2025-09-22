import { AlertTriangle, FileText, Clock, Users } from "lucide-react";
import { Card } from "@/components/ui/card";

const Problem = () => {
  const problems = [
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Complex Jargon",
      description: "Legal documents are filled with confusing terms that disadvantage everyday people."
    },
    {
      icon: <AlertTriangle className="w-8 h-8" />,
      title: "Hidden Risks",
      description: "Critical clauses buried in fine print that could cost you thousands later."
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Missed Deadlines",
      description: "Important obligations and deadlines scattered throughout lengthy contracts."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Unequal Playing Field",
      description: "Corporations have legal teams. Individuals have confusion and uncertainty."
    }
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            The Fine Print Problem
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Every day, millions of people sign contracts they don't fully understand. 
            The legal system favors those who can afford expert advice, leaving everyone else vulnerable.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, index) => (
            <Card key={index} className="p-6 text-center space-y-4 bg-card/80 backdrop-blur-sm border-border/50 hover:shadow-feature transition-smooth">
              <div className="w-16 h-16 mx-auto rounded-2xl gradient-danger flex items-center justify-center text-white">
                {problem.icon}
              </div>
              <h3 className="text-xl font-semibold text-foreground">{problem.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{problem.description}</p>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 p-6 rounded-2xl bg-card border border-border/50 shadow-soft">
            <AlertTriangle className="w-12 h-12 text-destructive" />
            <div className="text-left">
              <div className="text-lg font-semibold text-foreground">The Result?</div>
              <div className="text-muted-foreground">
                Unfair agreements, missed opportunities, and legal vulnerabilities that could have been avoided.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problem;