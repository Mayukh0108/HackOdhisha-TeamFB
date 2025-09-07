import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  HelpCircle,
  FileSearch,
  Shield,
  Zap,
  Phone,
  Mail,
  MessageCircle,
  ExternalLink,
  BookOpen,
  Download,
} from "lucide-react";

const faqs = [
  {
    question: "How do I verify an academic certificate?",
    answer:
      "Simply upload your certificate (PDF, JPG, or PNG) to our verification page, or scan the QR code if available. Our AI-powered system will extract key information, cross-verify with institutional databases, and provide you with a comprehensive verification report within seconds.",
  },
  {
    question: "What types of documents can be verified?",
    answer:
      "We support verification of degree certificates, diplomas, mark sheets, transcripts, and other academic credentials issued by authorized educational institutions.",
  },
  {
    question: "How accurate is the verification process?",
    answer:
      "Our platform maintains a 99.7% accuracy rate using advanced OCR, machine learning algorithms, and real-time database verification. All results include confidence scores and detailed analysis.",
  },
  {
    question: "Is my personal data secure?",
    answer:
      "Yes, we use bank-grade encryption and follow strict data privacy protocols. Your documents are processed securely and not stored permanently unless you choose to save them in your account.",
  },
  {
    question: "How long does verification take?",
    answer:
      "Most verifications complete within 30 seconds. Complex cases requiring manual review may take up to 2-3 business days.",
  },
  {
    question: "What happens if a document is flagged as suspicious?",
    answer:
      "Suspicious documents are marked for manual review by our verification experts. The institution is notified, and a detailed investigation report is generated within 48 hours.",
  },
  {
    question: "Can institutions bulk upload their certificate records?",
    answer:
      "Yes, registered institutions can use our bulk upload feature to import historical certificate data via CSV/Excel files or integrate with our API for real-time synchronization.",
  },
  {
    question: "How do I report a technical issue?",
    answer:
      "Use our support form below, email us directly, or check our status page for known issues. Our technical team responds to all queries within 4 hours during business hours.",
  },
];

const resources = [
  {
    title: "API Documentation",
    desc: "Complete integration guide for developers",
    icon: BookOpen,
  },
  {
    title: "Verification Guide",
    desc: "Step-by-step process walkthrough",
    icon: FileSearch,
  },
  {
    title: "Security Whitepaper",
    desc: "Technical security specifications",
    icon: Shield,
  },
  {
    title: "Status Page",
    desc: "Real-time system status and uptime",
    icon: Zap,
  },
];

export default function Help() {
  const user = null; // Mock - in real app this would come from auth context

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-hero-gradient flex items-center justify-center mx-auto">
              <HelpCircle className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-display font-bold">Help Center</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get help with document verification, account management, and
              platform features
            </p>
          </div>

          {/* Quick Links */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {resources.map((resource, index) => (
              <Card key={index} className="hover-lift border-primary/20">
                <CardContent className="p-4 text-center">
                  <resource.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="font-medium mb-2">{resource.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {resource.desc}
                  </p>
                  <Button variant="ghost" size="sm" className="w-full">
                    <ExternalLink className="h-3 w-3 mr-2" />
                    Open
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* FAQ Section */}
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <HelpCircle className="h-5 w-5" />
                <span>Frequently Asked Questions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="space-y-2">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="border rounded-lg px-4"
                  >
                    <AccordionTrigger className="text-left font-medium">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Contact Form */}
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageCircle className="h-5 w-5" />
                  <span>Contact Support</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">First Name</label>
                    <Input placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Last Name</label>
                    <Input placeholder="Doe" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address</label>
                  <Input type="email" placeholder="john.doe@example.com" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject</label>
                  <Input placeholder="Brief description of your issue" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Message</label>
                  <Textarea
                    placeholder="Provide detailed information about your issue or question..."
                    className="min-h-[120px]"
                  />
                </div>

                <Button variant="hero" className="w-full">
                  Send Message
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  We'll respond within 4 hours during business hours
                </p>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Email Support</p>
                      <p className="text-sm text-muted-foreground">
                        support@authentech.com
                      </p>
                      <Badge variant="outline" className="mt-1 text-xs">
                        Response within 4 hours
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Phone Support</p>
                      <p className="text-sm text-muted-foreground">
                        +91-651-XXX-XXXX
                      </p>
                      <Badge variant="outline" className="mt-1 text-xs">
                        Mon-Fri 9AM-6PM IST
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Live Chat</p>
                      <p className="text-sm text-muted-foreground">
                        Available for urgent issues
                      </p>
                      <Button variant="outline" size="sm" className="mt-2">
                        Start Chat
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h4 className="font-medium mb-4">Office Address</h4>
                  <p className="text-sm text-muted-foreground">
                    Team Firewall Breakers
                    <br />
                    Netaji subhash Engineering College
                    <br />
                    Kolkata
                    <br />
                    West Bengal, India
                  </p>
                </div>

                <div className="border-t pt-6">
                  <h4 className="font-medium mb-4">System Status</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Verification API</span>
                      <Badge variant="default" className="bg-success text-xs">
                        Operational
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">OCR Processing</span>
                      <Badge variant="default" className="bg-success text-xs">
                        Operational
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Database Access</span>
                      <Badge variant="default" className="bg-success text-xs">
                        Operational
                      </Badge>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="w-full mt-3">
                    View Status Page
                    <ExternalLink className="h-3 w-3 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
