import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Advocate = () => {
  const advocateUrl = (import.meta as any).env?.VITE_ADVOCATE_URL || "http://localhost:8000";
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-4 text-sm text-muted-foreground">Embedded AdvocateAI Sprint</div>
        <div className="rounded-xl overflow-hidden border border-border/50 bg-card">
          <iframe
            src={advocateUrl}
            title="AdvocateAI Sprint"
            className="w-full h-[80vh]"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Advocate;


