import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  FileSearch, 
  History, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  Users,
  Building2,
  Shield,
  Upload,
  BarChart3,
  Zap,
  Scan
} from "lucide-react";

// Mock user data - in real app this would come from auth context
const mockUser = {
  name: "Dr. Sarah Johnson",
  role: "verifier" as const
};

const recentVerifications = [
  { id: "VER-2024-001", student: "Rajesh Kumar Singh", institution: "Jharkhand University", status: "valid", timestamp: "2 hours ago" },
  { id: "VER-2024-002", student: "Priya Sharma", institution: "BIT Mesra", status: "review", timestamp: "3 hours ago" },
  { id: "VER-2024-003", student: "Amit Das", institution: "NIT Jamshedpur", status: "valid", timestamp: "5 hours ago" },
  { id: "VER-2024-004", student: "Sunita Devi", institution: "Ranchi University", status: "invalid", timestamp: "1 day ago" }
];

const stats = [
  { label: "Today's Verifications", value: 24, change: "+12%", icon: FileSearch },
  { label: "Success Rate", value: 94, suffix: "%", change: "+2%", icon: CheckCircle },
  { label: "Avg. Processing Time", value: 28, suffix: "s", change: "-15%", icon: Clock },
  { label: "Flagged Documents", value: 3, change: "-1", icon: AlertTriangle }
];

export default function Dashboard() {
  const [uploadedDoc, setUploadedDoc] = useState<File | null>(null);
  const [extractedData, setExtractedData] = useState<any>(null);
  const [verificationResult, setVerificationResult] = useState<any>(null);

  const handleDocUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedDoc(file);
    }
  };

  const generateExtractedData = async () => {
    if (!uploadedDoc) return;
    
    // Simulate OCR processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setExtractedData({
      name: "RAJESH KUMAR SINGH",
      rollNumber: "JU20CSE045",
      course: "Bachelor of Technology",
      branch: "Computer Science & Engineering",
      year: "2024",
      marks: "8.7 CGPA",
      certificateId: "JU-CSE-2024-045-BTech",
      institution: "Jharkhand University"
    });
  };

  const verifyDocument = async () => {
    if (!extractedData) return;
    
    // Simulate verification process
    await new Promise(resolve => setTimeout(resolve, 3000));
    setVerificationResult({
      status: "valid",
      confidence: 97,
      timestamp: new Date().toLocaleString()
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card-glass to-primary/5">
      <Navbar user={mockUser} />
      
      <div className="container py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Welcome Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-display font-bold">
                Welcome back, {mockUser.name.split(' ')[1]}
              </h1>
              <p className="text-xl text-muted-foreground">
                Here's your verification activity overview
              </p>
            </div>
            <Badge variant="secondary" className="px-4 py-2">
              <Shield className="h-4 w-4 mr-2" />
              {mockUser.role.charAt(0).toUpperCase() + mockUser.role.slice(1)}
            </Badge>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-primary/20 hover-lift bg-gradient-to-br from-primary/5 to-accent/5">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-hero-gradient flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <FileSearch className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-display font-semibold text-xl mb-2">New Verification</h3>
                <p className="text-muted-foreground mb-4">Upload and verify a new certificate</p>
                <Link to="/verify">
                  <Button variant="hero" size="lg" className="w-full shadow-md">
                    Start Verification
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-primary/20 hover-lift bg-gradient-to-br from-accent/5 to-secondary/5">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-accent-light flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <History className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-display font-semibold text-xl mb-2">View History</h3>
                <p className="text-muted-foreground mb-4">Browse your verification records</p>
                <Link to="/history">
                  <Button variant="outline" size="lg" className="w-full shadow-md border-accent/20 hover:bg-accent/10">
                    Browse History
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-primary/20 hover-lift bg-gradient-to-br from-secondary/5 to-primary/5">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-secondary to-secondary-light flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <BarChart3 className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-display font-semibold text-xl mb-2">Analytics</h3>
                <p className="text-muted-foreground mb-4">View detailed reports and trends</p>
                <Button variant="outline" size="lg" className="w-full shadow-md border-secondary/20 hover:bg-secondary/10">
                  View Reports
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Statistics Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <stat.icon className="h-5 w-5 text-primary" />
                    </div>
                    <Badge variant="outline" className="text-xs text-success">
                      {stat.change}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-bold">
                      {stat.value}{stat.suffix}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <History className="h-5 w-5" />
                  <span>Recent Verifications</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentVerifications.map((verification) => (
                  <div key={verification.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium">{verification.student}</p>
                      <p className="text-sm text-muted-foreground">{verification.institution}</p>
                      <p className="text-xs text-muted-foreground">{verification.timestamp}</p>
                    </div>
                    <Badge 
                      variant={
                        verification.status === 'valid' ? 'default' :
                        verification.status === 'review' ? 'secondary' : 
                        'destructive'
                      }
                    >
                      {verification.status === 'valid' && <CheckCircle className="h-3 w-3 mr-1" />}
                      {verification.status === 'review' && <Clock className="h-3 w-3 mr-1" />}
                      {verification.status === 'invalid' && <AlertTriangle className="h-3 w-3 mr-1" />}
                      {verification.status}
                    </Badge>
                  </div>
                ))}
                <Link to="/history">
                  <Button variant="ghost" className="w-full">
                    View All History
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>Performance Overview</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Processing Speed</span>
                    <span className="text-sm text-muted-foreground">Excellent</span>
                  </div>
                  <Progress value={95} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Accuracy Rate</span>
                    <span className="text-sm text-muted-foreground">97.5%</span>
                  </div>
                  <Progress value={97.5} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">System Reliability</span>
                    <span className="text-sm text-muted-foreground">99.9%</span>
                  </div>
                  <Progress value={99.9} className="h-2" />
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center space-x-2 text-sm text-success">
                    <CheckCircle className="h-4 w-4" />
                    <span>All systems operational</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Document Upload & Processing Workflow */}
          <Card className="border-primary/20 bg-gradient-to-br from-card to-card-glass">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Upload className="h-5 w-5" />
                <span>Quick Document Processing</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Step 1: Upload */}
              <div className="space-y-4">
                <h4 className="font-medium flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">1</div>
                  <span>Upload Document</span>
                </h4>
                <div className="flex items-center space-x-4">
                  <input
                    type="file"
                    onChange={handleDocUpload}
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                  />
                </div>
                {uploadedDoc && (
                  <div className="flex items-center space-x-2 text-sm text-success">
                    <CheckCircle className="h-4 w-4" />
                    <span>{uploadedDoc.name} uploaded successfully</span>
                  </div>
                )}
              </div>

              {/* Step 2: Extract Data */}
              <div className="space-y-4">
                <h4 className="font-medium flex items-center space-x-2">
                  <div className={`w-6 h-6 rounded-full ${extractedData ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'} flex items-center justify-center text-sm`}>2</div>
                  <span>Generate Extracted Data</span>
                </h4>
                <Button 
                  onClick={generateExtractedData} 
                  disabled={!uploadedDoc}
                  variant="outline"
                  className="w-full"
                >
                  <Scan className="h-4 w-4 mr-2" />
                  Extract Data from Document
                </Button>
                {extractedData && (
                  <div className="p-4 bg-success/5 border border-success/20 rounded-lg space-y-2">
                    <div className="flex items-center space-x-2 text-success font-medium">
                      <CheckCircle className="h-4 w-4" />
                      <span>Data Extracted Successfully</span>
                    </div>
                    <div className="text-sm space-y-1">
                      <p><strong>Name:</strong> {extractedData.name}</p>
                      <p><strong>Institution:</strong> {extractedData.institution}</p>
                      <p><strong>Course:</strong> {extractedData.course}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Step 3: Verify */}
              <div className="space-y-4">
                <h4 className="font-medium flex items-center space-x-2">
                  <div className={`w-6 h-6 rounded-full ${verificationResult ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'} flex items-center justify-center text-sm`}>3</div>
                  <span>Verify Document</span>
                </h4>
                <Button 
                  onClick={verifyDocument} 
                  disabled={!extractedData}
                  variant="hero"
                  className="w-full"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Verify Document Authenticity
                </Button>
                {verificationResult && (
                  <div className="p-4 bg-success/5 border border-success/20 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-success font-medium">
                        <CheckCircle className="h-4 w-4" />
                        <span>Document {verificationResult.status}</span>
                      </div>
                      <Badge variant="default">{verificationResult.confidence}% Confidence</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Verified on {verificationResult.timestamp}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card className="border-primary/20 bg-gradient-to-br from-success/5 to-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>System Health</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-success to-success/80 flex items-center justify-center shadow-lg">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">OCR Engine</p>
                    <p className="text-sm text-success">Operational</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
                    <Building2 className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">Registry Access</p>
                    <p className="text-sm text-success">Connected</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center shadow-lg">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">API Services</p>
                    <p className="text-sm text-success">Active</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}