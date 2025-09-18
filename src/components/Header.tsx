import { Button } from "@/components/ui/button";
import { Scale, Menu } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <Scale className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
              LegalAI
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-muted-foreground hover:text-primary transition-smooth">
              Features
            </a>
            <a href="#pricing" className="text-muted-foreground hover:text-primary transition-smooth">
              Pricing
            </a>
            <a href="#about" className="text-muted-foreground hover:text-primary transition-smooth">
              About
            </a>
            <a href="#contact" className="text-muted-foreground hover:text-primary transition-smooth">
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <Button variant="ghost" className="hidden sm:inline-flex">
              Sign In
            </Button>
            <Button variant="hero">
              Get Started
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;