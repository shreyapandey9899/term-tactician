import { Scale, Github, Linkedin, Twitter, Mail } from "lucide-react";

const Footer = () => {
  const teamMembers = [
    "Alex Chen - Full Stack Developer",
    "Sarah Kim - AI/ML Engineer", 
    "David Rodriguez - UI/UX Designer",
    "Maya Patel - Legal Tech Consultant"
  ];

  const socialLinks = [
    { icon: <Github className="w-5 h-5" />, label: "GitHub", href: "#" },
    { icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn", href: "#" },
    { icon: <Twitter className="w-5 h-5" />, label: "Twitter", href: "#" },
    { icon: <Mail className="w-5 h-5" />, label: "Email", href: "#" }
  ];

  const quickLinks = [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Demo", href: "#demo" },
    { label: "About", href: "#about" }
  ];

  return (
    <footer className="bg-card/50 border-t border-border/50 pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
                <Scale className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-foreground">LegalEase AI</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              From contract to confidence. AI-powered legal document analysis 
              that empowers everyone to understand and negotiate better agreements.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-accent/50 hover:bg-primary hover:text-white flex items-center justify-center transition-smooth"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <div className="space-y-2">
              {quickLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.href}
                  className="block text-muted-foreground hover:text-foreground transition-smooth text-sm"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Hackathon Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Hackathon Project</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Google Cloud Hackathon 2024</p>
              <p>Built with Generative AI</p>
              <p>48-hour development sprint</p>
              <div className="inline-flex items-center gap-1 px-2 py-1 rounded bg-primary/10 text-primary text-xs font-medium">
                Demo Ready
              </div>
            </div>
          </div>

          {/* Team */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Team LegalEase</h3>
            <div className="space-y-2">
              {teamMembers.map((member, index) => (
                <p key={index} className="text-muted-foreground text-sm">
                  {member}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              © 2024 LegalEase AI. Built for Google Cloud Hackathon 2024.
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-smooth">Privacy</a>
              <a href="#" className="hover:text-foreground transition-smooth">Terms</a>
              <a href="#" className="hover:text-foreground transition-smooth">Demo License</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;