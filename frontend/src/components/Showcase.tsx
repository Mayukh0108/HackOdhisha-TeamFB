import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Smartphone, 
  Globe, 
  Zap, 
  ArrowRight,
  CheckCircle
} from "lucide-react";
import verificationUI from "@/assets/verification-ui.jpg";
import securityFeatures from "@/assets/security-features.jpg";

const integrations = [
  { name: "REST API", desc: "Complete programmatic access" },
  { name: "Webhooks", desc: "Real-time event notifications" },
  { name: "Bulk Upload", desc: "Process thousands at once" },
  { name: "QR Codes", desc: "Instant mobile verification" },
  { name: "Blockchain", desc: "Immutable audit trail" },
  { name: "Single Sign-On", desc: "Enterprise authentication" }
];

export function Showcase() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        {/* Showcase Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">Platform Preview</Badge>
          <h2 className="text-4xl font-display font-bold mb-6">
            See It In Action
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the most advanced document verification interface
          </p>
        </div>

        {/* Main Showcase */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <Badge variant="outline">Verification Workspace</Badge>
            <h3 className="text-3xl font-display font-bold">
              Three-Pane Verification
            </h3>
            <p className="text-lg text-muted-foreground">
              Upload, analyze, and validate in one seamless workflow. Our interface 
              guides you through each step with real-time feedback and confidence scoring.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Smart OCR Extraction</p>
                  <p className="text-sm text-muted-foreground">Automatically identify and extract key certificate fields</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Visual Anomaly Detection</p>
                  <p className="text-sm text-muted-foreground">Highlight suspicious elements with bounding boxes</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Instant Validation</p>
                  <p className="text-sm text-muted-foreground">Cross-reference with institutional databases</p>
                </div>
              </div>
            </div>

            <Button variant="hero" size="lg" className="group">
              Try Demo
              <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          <div className="relative">
            <div className="glass-card rounded-2xl overflow-hidden shadow-elegant">
              <img 
                src={verificationUI}
                alt="Verification Interface"
                className="w-full h-auto"
              />
            </div>
            
            {/* Floating Badges */}
            <div className="absolute -top-4 -right-4 animate-float">
              <Badge variant="default" className="bg-success shadow-lg">
                <CheckCircle className="h-4 w-4 mr-1" />
                99.7% Accurate
              </Badge>
            </div>
            <div className="absolute -bottom-4 -left-4 animate-float" style={{ animationDelay: '2s' }}>
              <Badge variant="default" className="bg-accent shadow-lg">
                <Zap className="h-4 w-4 mr-1" />
                Sub-30s Processing
              </Badge>
            </div>
          </div>
        </div>

        {/* Integrations */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="glass-card rounded-2xl overflow-hidden shadow-elegant">
              <img 
                src={securityFeatures}
                alt="Security Features"
                className="w-full h-auto"
              />
            </div>
            
            {/* Floating Icons */}
            <div className="absolute top-8 left-8 animate-float">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Globe className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="absolute bottom-8 right-8 animate-float" style={{ animationDelay: '3s' }}>
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Smartphone className="h-6 w-6 text-accent" />
              </div>
            </div>
          </div>

          <div className="space-y-6 order-1 lg:order-2">
            <Badge variant="outline">Integrations & APIs</Badge>
            <h3 className="text-3xl font-display font-bold">
              Connect Everything
            </h3>
            <p className="text-lg text-muted-foreground">
              Seamlessly integrate with your existing systems using our comprehensive API suite.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {integrations.map((integration, index) => (
                <Card key={index} className="hover-lift border-primary/20">
                  <CardContent className="p-4">
                    <p className="font-medium text-sm">{integration.name}</p>
                    <p className="text-xs text-muted-foreground">{integration.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Button variant="outline" size="lg" className="group">
              View API Docs
              <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}