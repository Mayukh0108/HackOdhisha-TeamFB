import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Stats } from "@/components/Stats";
import { Showcase } from "@/components/Showcase";
import { Footer } from "@/components/Footer";

const Index = () => {
  // Mock user - in real app this would come from auth context
  const user = null; // Set to null for public homepage

  return (
    <div className="min-h-screen">
      <Navbar user={user} />
      <Hero />
      <Features />
      <Stats />
      <Showcase />
      <Footer />
    </div>
  );
};

export default Index;
