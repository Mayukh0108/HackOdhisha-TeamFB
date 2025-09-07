import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, FileSearch, CheckCircle, Zap, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-verification.jpg";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Document Verification"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 via-secondary/70 to-primary/80" />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-float">
        <div className="p-3 rounded-full bg-white/10 backdrop-blur-sm">
          <Shield className="h-6 w-6 text-white" />
        </div>
      </div>
      <div
        className="absolute top-40 right-20 animate-float"
        style={{ animationDelay: "2s" }}
      >
        <div className="p-3 rounded-full bg-white/10 backdrop-blur-sm">
          <CheckCircle className="h-6 w-6 text-primary-light" />
        </div>
      </div>
      <div
        className="absolute bottom-40 left-20 animate-float"
        style={{ animationDelay: "4s" }}
      >
        <div className="p-3 rounded-full bg-white/10 backdrop-blur-sm">
          <Zap className="h-6 w-6 text-accent-light" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container text-center text-white">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <div className="animate-fade-in">
            <Badge
              variant="secondary"
              className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm"
            >
              <Shield className="h-4 w-4 mr-2" />
              Developed By Team Firewall Breakers
            </Badge>
          </div>

          {/* Headlines */}
          <div
            className="space-y-4 animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight">
              Authenticate Academic
              <span className="block text-accent-light">Credentials</span>
              <span className="block">Instantly</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto">
              OCR + registry verification + cryptographic proofs in a single
              workflow. Protect academic integrity with government-grade
              security.
            </p>
          </div>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-scale-in"
            style={{ animationDelay: "0.4s" }}
          >
            <Link to="/verify">
              <Button
                variant="hero"
                size="lg"
                className="group px-8 py-6 text-lg font-semibold"
              >
                <FileSearch className="h-5 w-5 mr-2" />
                Verify Document Now
                <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/help">
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-6 text-lg bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
              >
                Learn How It Works
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div
            className="flex flex-wrap justify-center gap-8 pt-8 animate-fade-in"
            style={{ animationDelay: "0.6s" }}
          >
            <div className="flex items-center space-x-2 text-white/80">
              <CheckCircle className="h-5 w-5 text-success" />
              <span className="text-sm font-medium">Bank-Grade Security</span>
            </div>
            <div className="flex items-center space-x-2 text-white/80">
              <CheckCircle className="h-5 w-5 text-success" />
              <span className="text-sm font-medium">Instant Results</span>
            </div>
            <div className="flex items-center space-x-2 text-white/80">
              <CheckCircle className="h-5 w-5 text-success" />
              <span className="text-sm font-medium">24/7 Available</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
