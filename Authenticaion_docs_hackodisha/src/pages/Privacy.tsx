import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, Eye, UserCheck } from "lucide-react";

export default function Privacy() {
  const user = null; // Mock - in real app this would come from auth context

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-hero-gradient flex items-center justify-center mx-auto">
              <Shield className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-display font-bold">Privacy Policy</h1>
            <p className="text-xl text-muted-foreground">
              How we protect and handle your personal information
            </p>
            <Badge variant="secondary">Last updated: December 2024</Badge>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lock className="h-5 w-5" />
                  <span>Data Collection</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <p>
                  The AuthenTech platform by Team Firewall Breakers collects
                  only the necessary information required to verify academic
                  credentials and maintain system security.
                </p>
                <h4>Information We Collect:</h4>
                <ul>
                  <li>Document images/files uploaded for verification</li>
                  <li>Account information (name, email, role, institution)</li>
                  <li>Verification history and audit logs</li>
                  <li>
                    Technical information (IP address, browser type, usage
                    patterns)
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Eye className="h-5 w-5" />
                  <span>How We Use Your Data</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <h4>Primary Uses:</h4>
                <ul>
                  <li>
                    Authenticating academic credentials against institutional
                    databases
                  </li>
                  <li>Maintaining verification audit trails for compliance</li>
                  <li>Improving system accuracy and security measures</li>
                  <li>Providing customer support and technical assistance</li>
                  <li>
                    Generating aggregated statistics for educational insights
                  </li>
                </ul>
                <p>
                  We never sell, rent, or share personal information with third
                  parties for commercial purposes.
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Data Security</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <h4>Security Measures:</h4>
                <ul>
                  <li>
                    <strong>Encryption:</strong> All data transmitted using TLS
                    1.3 encryption
                  </li>
                  <li>
                    <strong>Storage:</strong> Data encrypted at rest using
                    AES-256
                  </li>
                  <li>
                    <strong>Access Control:</strong> Role-based access with
                    multi-factor authentication
                  </li>
                  <li>
                    <strong>Monitoring:</strong> 24/7 security monitoring and
                    intrusion detection
                  </li>
                  <li>
                    <strong>Compliance:</strong> Follows government
                    cybersecurity guidelines
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <UserCheck className="h-5 w-5" />
                  <span>Your Rights</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <p>
                  Under applicable data protection laws, you have the following
                  rights:
                </p>
                <ul>
                  <li>
                    <strong>Access:</strong> Request copies of your personal
                    data
                  </li>
                  <li>
                    <strong>Rectification:</strong> Correct inaccurate or
                    incomplete data
                  </li>
                  <li>
                    <strong>Erasure:</strong> Request deletion of your personal
                    data
                  </li>
                  <li>
                    <strong>Portability:</strong> Receive your data in a
                    structured format
                  </li>
                  <li>
                    <strong>Object:</strong> Object to processing of your
                    personal data
                  </li>
                </ul>
                <p>
                  To exercise these rights, contact us at privacy@authentech.com
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Contact Information</h3>
                <p className="text-sm text-muted-foreground">
                  For privacy-related questions or concerns, contact our Data
                  Protection Officer:
                </p>
                <div className="mt-4 space-y-2 text-sm">
                  <p>
                    <strong>Email:</strong> privacy@authentech.com
                  </p>
                  <p>
                    <strong>Phone:</strong> +91-651-XXX-XXXX
                  </p>
                  <p>
                    <strong>Address:</strong> Team Firewall Breakers,
                    Bhubaneswar
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
