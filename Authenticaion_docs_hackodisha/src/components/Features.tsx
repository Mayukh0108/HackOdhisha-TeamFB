import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Zap, 
  Shield, 
  CheckCircle, 
  FileSearch, 
  Scan,
  Database,
  Lock,
  Clock
} from "lucide-react";

const steps = [
  {
    icon: FileSearch,
    title: "Upload Document",
    description: "Drag & drop your certificate or scan QR code with camera",
    time: "5 seconds"
  },
  {
    icon: Scan,
    title: "OCR Analysis", 
    description: "AI extracts key information and detects tampering",
    time: "15 seconds"
  },
  {
    icon: Database,
    title: "Cross-Verification",
    description: "Match against institutional databases and registries",
    time: "10 seconds"
  },
  {
    icon: CheckCircle,
    title: "Instant Result",
    description: "Get comprehensive validation report with confidence score",
    time: "2 seconds"
  }
];

const features = [
  {
    icon: Shield,
    title: "Bank-Grade Security",
    description: "End-to-end encryption with government-approved protocols",
    badge: "256-bit SSL"
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Complete verification in under 30 seconds",
    badge: "< 30s"
  },
  {
    icon: Lock,
    title: "Privacy Protected",
    description: "Data anonymization and GDPR compliant processing",
    badge: "GDPR"
  },
  {
    icon: Clock,
    title: "24/7 Available",
    description: "Round-the-clock verification service",
    badge: "Always On"
  }
];

export function Features() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        {/* How It Works */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">How It Works</Badge>
          <h2 className="text-4xl font-display font-bold mb-6">
            Verification Made Simple
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our AI-powered platform verifies academic credentials in four simple steps
          </p>
        </div>

        {/* Steps Timeline */}
        <div className="grid md:grid-cols-4 gap-8 mb-20 stagger-children">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-6 left-full w-full h-0.5 bg-gradient-to-r from-primary to-primary/30 z-0" />
              )}
              
              <Card className="hover-lift glass-card border-primary/20 relative z-10">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-hero-gradient flex items-center justify-center mx-auto mb-4">
                    <step.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-display font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{step.description}</p>
                  <Badge variant="outline" className="text-xs">
                    <Clock className="h-3 w-3 mr-1" />
                    {step.time}
                  </Badge>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Why Trust Us */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">Why Choose Us</Badge>
          <h2 className="text-4xl font-display font-bold mb-6">
            Built for Trust & Reliability
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
          {features.map((feature, index) => (
            <Card key={index} className="hover-lift border-primary/20">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-7 w-7 text-primary" />
                </div>
                <div className="flex justify-center mb-2">
                  <Badge variant="outline" className="text-xs">
                    {feature.badge}
                  </Badge>
                </div>
                <h3 className="font-display font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}