import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Shield, AlertTriangle, Scale } from "lucide-react";

export default function Terms() {
  const user = null; // Mock - in real app this would come from auth context

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-hero-gradient flex items-center justify-center mx-auto">
              <FileText className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-display font-bold">
              Terms of Service
            </h1>
            <p className="text-xl text-muted-foreground">
              Rules and guidelines for using the AuthenTech platform
            </p>
            <Badge variant="secondary">Effective from: December 1, 2024</Badge>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Acceptance of Terms</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <p>
                  By accessing and using the AuthenTech document verification
                  platform operated by Team Firewall Breakers, you agree to be
                  bound by these Terms of Service and all applicable laws and
                  regulations.
                </p>
                <p>
                  If you do not agree with any of these terms, you are
                  prohibited from using this platform.
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Permitted Use</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <h4>You May:</h4>
                <ul>
                  <li>
                    Verify authentic academic documents for legitimate purposes
                  </li>
                  <li>
                    Use the platform for employment verification, admissions, or
                    scholarship applications
                  </li>
                  <li>
                    Access verification reports and maintain verification
                    history
                  </li>
                  <li>
                    Integrate with our API for authorized institutional use
                  </li>
                </ul>

                <h4>You May Not:</h4>
                <ul>
                  <li>Upload fraudulent or tampered documents</li>
                  <li>
                    Attempt to circumvent security measures or verification
                    processes
                  </li>
                  <li>Use the platform for illegal or unauthorized purposes</li>
                  <li>
                    Share your account credentials with unauthorized parties
                  </li>
                  <li>
                    Reverse engineer or attempt to extract proprietary
                    algorithms
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Scale className="h-5 w-5" />
                  <span>User Responsibilities</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <h4>Account Security:</h4>
                <ul>
                  <li>Maintain confidentiality of your login credentials</li>
                  <li>Notify us immediately of any unauthorized access</li>
                  <li>
                    Use strong passwords and enable two-factor authentication
                    when available
                  </li>
                </ul>

                <h4>Document Handling:</h4>
                <ul>
                  <li>
                    Only upload documents you have legal authority to verify
                  </li>
                  <li>Ensure documents contain no malicious code or viruses</li>
                  <li>
                    Respect privacy rights of individuals whose documents you
                    verify
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5" />
                  <span>Limitations and Disclaimers</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <h4>Service Availability:</h4>
                <p>
                  While we strive for 99.9% uptime, the platform may be
                  unavailable due to maintenance, technical issues, or
                  circumstances beyond our control.
                </p>

                <h4>Verification Accuracy:</h4>
                <p>
                  Our verification results are based on available data and
                  algorithms. While highly accurate, they should be used as part
                  of a comprehensive verification process.
                </p>

                <h4>Liability Limitation:</h4>
                <p>
                  Team Firewall Breakers shall not be liable for any indirect,
                  incidental, special, consequential, or punitive damages
                  resulting from your use of this platform.
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle>Institutional Users</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <h4>Additional Requirements for Educational Institutions:</h4>
                <ul>
                  <li>Must be registered with authorized educational bodies</li>
                  <li>Provide accurate and up-to-date certificate databases</li>
                  <li>Maintain data integrity and security standards</li>
                  <li>
                    Report any security incidents or data breaches immediately
                  </li>
                  <li>Comply with all applicable educational regulations</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle>Termination</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <p>
                  We reserve the right to terminate or suspend your access to
                  the platform immediately, without prior notice, for any
                  violation of these Terms of Service.
                </p>
                <p>
                  Upon termination, your right to use the platform will cease,
                  but verification records may be retained for audit and
                  compliance purposes as required by law.
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  For questions about these Terms of Service, contact us:
                </p>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Email:</strong> legal@authentech.com
                  </p>
                  <p>
                    <strong>Phone:</strong> +91-651-XXX-XXXX
                  </p>
                  <p>
                    <strong>Address:</strong> Team Firewall Breakers
                    <br />
                    Technology Innovation Center
                    <br />
                    Bhubaneswar - 751024, Odisha
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
