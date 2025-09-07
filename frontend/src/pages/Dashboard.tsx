import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  Scan,
} from "lucide-react";

// Interface for verification data from API
interface VerificationData {
  _id: string;
  name: string;
  institution: string;
  date: string;
}

// Get user info from localStorage (set during login)
const getUserFromStorage = () => {
  try {
    const userStr = localStorage.getItem("userInfo");
    if (userStr) return JSON.parse(userStr);
  } catch {}
  return null;
};

export default function Dashboard() {
  const [user, setUser] = useState<{ name: string; role: string } | null>(
    getUserFromStorage()
  );
  const [uploadedDoc, setUploadedDoc] = useState<File | null>(null);
  const [extractedData, setExtractedData] = useState<any>(null);
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [recentVerifications, setRecentVerifications] = useState<
    VerificationData[]
  >([]);
  const [isLoadingVerifications, setIsLoadingVerifications] = useState(false);
  const [showAllHistoryModal, setShowAllHistoryModal] = useState(false);

  const API_BASE_URL = "https://hackodhisha-teamfb-backend.onrender.com";

  // Static stats data
  const stats = [
    {
      label: "Today's Verifications",
      value: 24,
      change: "+12%",
      icon: FileSearch,
    },
    {
      label: "Success Rate",
      value: 94,
      suffix: "%",
      change: "+2%",
      icon: CheckCircle,
    },
    {
      label: "Avg. Processing Time",
      value: 28,
      suffix: "s",
      change: "-15%",
      icon: Clock,
    },
    { label: "Flagged Documents", value: 3, change: "-1", icon: AlertTriangle },
  ];

  // Function to fetch recent verifications
  const fetchRecentVerifications = async () => {
    setIsLoadingVerifications(true);
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setRecentVerifications([]);
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/users/results`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setRecentVerifications(data.data);
        }
      } else {
        console.error("Failed to fetch recent verifications");
        setRecentVerifications([]);
      }
    } catch (error) {
      console.error("Error fetching recent verifications:", error);
      setRecentVerifications([]);
    } finally {
      setIsLoadingVerifications(false);
    }
  };

  // Helper function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInHours < 48) return "1 day ago";
    return `${Math.floor(diffInHours / 24)} days ago`;
  };

  useEffect(() => {
    // Fetch user data when component mounts
    const fetchUser = async () => {
      try {
        // Get token from localStorage (where your login stores it)
        const token = localStorage.getItem("authToken");

        if (!token) {
          setUser(null);
          return;
        }

        const response = await fetch(`${API_BASE_URL}/api/users/me`, {
          credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setUser(data.data);
          }
        } else {
          // If unauthorized, clear the invalid token
          localStorage.removeItem("authToken");
          setUser(null);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
        localStorage.removeItem("authToken");
        setUser(null);
      }
    };

    fetchUser();
    fetchRecentVerifications(); // Fetch recent verifications on component mount
  }, []);

  const handleDocUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedDoc(file);
    }
  };

  const generateExtractedData = async () => {
    if (!uploadedDoc) return;
    try {
      const formData = new FormData();
      formData.append("file", uploadedDoc);
      const response = await fetch(
        "https://hackodisha-ocr-api.onrender.com/extract/",
        {
          method: "POST",
          body: formData,
        }
      );
      if (!response.ok) throw new Error("OCR API error");
      const ocrResult = await response.json();
      setExtractedData(ocrResult);
    } catch (error) {
      console.error("OCR extraction failed:", error);
      setExtractedData(null);
    }
  };
  // Send uploaded file to verification API
  const sendFileToVerificationAPI = async () => {
    if (!uploadedDoc) return;
    const formData = new FormData();
    formData.append("file", uploadedDoc);
    try {
      const response = await fetch(
        "https://hackodisha-forge-detection-api-1.onrender.com/predict",
        {
          method: "POST",
          body: formData,
        }
      );
      const result = await response.json();
      console.log("Verification API result:", result);
    } catch (error) {
      console.error("Error sending file to verification API:", error);
    }
  };

  const verifyDocument = async () => {
    if (!extractedData) return;

    // Simulate verification process
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setVerificationResult({
      status: "valid",
      confidence: 97,
      timestamp: new Date().toLocaleString(),
    });
  };

  // Mock user data for display while real user data loads
  const mockUser = {
    name: user?.name || "Loading...",
    role: "verifier" as const,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card-glass to-primary/5">
      <Navbar />
      <div className="container py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Welcome Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-display font-bold">
                Welcome back, {user?.name || "User"}
              </h1>
              <p className="text-xl text-muted-foreground">
                Here's your verification activity overview
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-primary/20 hover-lift bg-gradient-to-br from-primary/5 to-accent/5">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-hero-gradient flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <FileSearch className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-display font-semibold text-xl mb-2">
                  New Verification
                </h3>
                <p className="text-muted-foreground mb-4">
                  Upload and verify a new certificate
                </p>
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
                <h3 className="font-display font-semibold text-xl mb-2">
                  View History
                </h3>
                <p className="text-muted-foreground mb-4">
                  Browse your verification records
                </p>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full shadow-md border-accent/20 hover:bg-accent/10"
                  onClick={() => setShowAllHistoryModal(true)}
                >
                  Browse History
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Statistics Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"></div>

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
                {isLoadingVerifications ? (
                  <div className="flex items-center justify-center p-8">
                    <div className="text-sm text-muted-foreground">
                      Loading recent verifications...
                    </div>
                  </div>
                ) : recentVerifications.length > 0 ? (
                  recentVerifications
                    .slice()
                    .reverse()
                    .slice(0, 5)
                    .map((verification) => (
                      <div
                        key={verification._id}
                        className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
                      >
                        <div className="flex-1">
                          <p className="font-medium">{verification.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {verification.institution}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatDate(verification.date)}
                          </p>
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="flex items-center justify-center p-8">
                    <div className="text-sm text-muted-foreground">
                      No recent verifications found.
                    </div>
                  </div>
                )}
                <Dialog
                  open={showAllHistoryModal}
                  onOpenChange={setShowAllHistoryModal}
                >
                  <DialogTrigger asChild>
                    <Button variant="ghost" className="w-full">
                      View All History
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
                    <DialogHeader>
                      <DialogTitle className="flex items-center space-x-2">
                        <History className="h-5 w-5" />
                        <span>All Verification History</span>
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                      {isLoadingVerifications ? (
                        <div className="flex items-center justify-center p-8">
                          <div className="text-sm text-muted-foreground">
                            Loading all verifications...
                          </div>
                        </div>
                      ) : recentVerifications.length > 0 ? (
                        <div className="space-y-3 max-h-96 overflow-y-auto">
                          {recentVerifications
                            .slice()
                            .reverse()
                            .map((verification, index) => (
                              <div
                                key={verification._id}
                                className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border"
                              >
                                <div className="flex items-center space-x-4">
                                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                    <span className="text-sm font-medium text-primary">
                                      {index + 1}
                                    </span>
                                  </div>
                                  <div className="flex-1">
                                    <p className="font-medium">
                                      {verification.name}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                      {verification.institution}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                      {formatDate(verification.date)}
                                    </p>
                                  </div>
                                </div>
                                <Badge variant="outline" className="ml-4">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Processed
                                </Badge>
                              </div>
                            ))}
                        </div>
                      ) : (
                        <div className="flex items-center justify-center p-8">
                          <div className="text-center">
                            <History className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                            <p className="text-sm text-muted-foreground">
                              No verification history found.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
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
                    <span className="text-sm font-medium">
                      Processing Speed
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Excellent
                    </span>
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
                    <span className="text-sm font-medium">
                      System Reliability
                    </span>
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
