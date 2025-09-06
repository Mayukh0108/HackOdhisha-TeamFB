import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Upload, 
  FileText, 
  Scan, 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  Camera,
  QrCode,
  Download,
  Copy,
  Eye,
  Clock,
  Shield
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock user - in real app this would come from auth context
const mockUser = {
  name: "Dr. Sarah Johnson",
  role: "verifier" as const
};

interface VerificationResult {
  status: "valid" | "review" | "invalid";
  confidence: number;
  reasons: string[];
  details: {
    institutionMatch: boolean;
    certificateId: boolean;
    signatures: boolean;
    seals: boolean;
    formatting: boolean;
  };
}

const PredictBBoxWidget = () => {
  const [image, setImage] = useState<File | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async () => {
    if (!image) return;
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call to /predict endpoint
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo, we'll create a mock result
      const canvas = document.createElement('canvas');
      canvas.width = 800;
      canvas.height = 600;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        // Create mock bounding box visualization
        ctx.fillStyle = '#f0f9ff';
        ctx.fillRect(0, 0, 800, 600);
        
        // Draw bounding boxes
        ctx.strokeStyle = '#22c55e';
        ctx.lineWidth = 3;
        ctx.strokeRect(50, 50, 200, 100); // Seal
        ctx.strokeRect(300, 200, 250, 50); // Signature
        ctx.strokeRect(100, 400, 300, 80); // Certificate ID
        
        // Add labels
        ctx.fillStyle = '#22c55e';
        ctx.font = '16px Inter';
        ctx.fillText('Official Seal ✓', 55, 45);
        ctx.fillText('Signature ✓', 305, 195);
        ctx.fillText('Certificate ID ✓', 105, 395);
      }
      
      canvas.toBlob((blob) => {
        if (blob) {
          setResult(URL.createObjectURL(blob));
        }
      });
    } catch (e: any) {
      setError(e.message ?? "Detection failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4">
        <input 
          type="file" 
          accept="image/*" 
          onChange={(e) => setImage(e.target.files?.[0] ?? null)}
          className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
        />
      </div>
      
      <Button 
        onClick={handleUpload} 
        disabled={!image || loading} 
        className="w-full"
      >
        {loading ? "Detecting Objects..." : "Detect Seals & Signatures"}
      </Button>
      
      {error && (
        <div className="flex items-center space-x-2 text-destructive text-sm">
          <AlertTriangle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}
      
      {result && (
        <div className="rounded-xl overflow-hidden border shadow-sm">
          <img src={result} alt="Bounding Box Detection Result" className="w-full h-auto" />
        </div>
      )}
    </div>
  );
};

export default function Verify() {

  // ...state declarations...

  // Send uploaded file to verification API
  const sendFileToVerificationAPI = async () => {
    if (!uploadedFile) return;
    const formData = new FormData();
    formData.append("file", uploadedFile);
    try {
      const response = await fetch("https://hackodisha-forge-detection-api-1.onrender.com/predict", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      console.log("Verification API result:", result);
    } catch (error) {
      console.error("Error sending file to verification API:", error);
    }
  };


  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [verificationStep, setVerificationStep] = useState(0);
  const [ocrData, setOcrData] = useState<any>(null);
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setUploadedFile(file);
      setVerificationStep(1);
      // Simulate OCR processing
      processOCR(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg'],
      'application/pdf': ['.pdf']
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: false
  });

  const processOCR = async (file: File) => {
    setIsProcessing(true);
    
    try {
      // Simulate OCR processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const mockOcrData = {
        name: "RAJESH KUMAR SINGH",
        rollNumber: "JU20CSE045",
        course: "Bachelor of Technology",
        branch: "Computer Science & Engineering",
        year: "2024",
        marks: "8.7 CGPA",
        certificateId: "JU-CSE-2024-045-BTech",
        institution: "Jharkhand University",
        issueDate: "June 15, 2024"
      };
      
      setOcrData(mockOcrData);
      setVerificationStep(2);
      
      // Automatically proceed to verification
      setTimeout(() => processVerification(mockOcrData), 1000);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "OCR Processing Failed",
        description: "Could not extract text from document"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const processVerification = async (data: any) => {
    setIsProcessing(true);
    
    try {
      // Simulate verification process
      await new Promise(resolve => setTimeout(resolve, 4000));
      
      const mockResult: VerificationResult = {
        status: "valid",
        confidence: 97,
        reasons: [
          "Institution found in verified database",
          "Certificate ID format matches institutional standards",
          "Digital signature verified",
          "Official seal detected and authenticated"
        ],
        details: {
          institutionMatch: true,
          certificateId: true,
          signatures: true,
          seals: true,
          formatting: true
        }
      };
      
      setVerificationResult(mockResult);
      setVerificationStep(3);
      
      toast({
        title: "Verification Complete",
        description: `Document verified with ${mockResult.confidence}% confidence`
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Verification Failed",
        description: "Could not verify document against registry"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const resetVerification = () => {
    setUploadedFile(null);
    setVerificationStep(0);
    setOcrData(null);
    setVerificationResult(null);
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card-glass to-accent/5">
      <Navbar user={mockUser} />
      
      <div className="container py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-display font-bold mb-4">
              Document Verification Workspace
            </h1>
            <p className="text-xl text-muted-foreground">
              Upload your academic certificate for instant verification
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  verificationStep >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  {verificationStep >= 1 ? <CheckCircle className="h-4 w-4" /> : <Upload className="h-4 w-4" />}
                </div>
                <span className="font-medium">Upload</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  verificationStep >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  {verificationStep >= 2 ? <CheckCircle className="h-4 w-4" /> : <Scan className="h-4 w-4" />}
                </div>
                <span className="font-medium">Extract</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  verificationStep >= 3 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  {verificationStep >= 3 ? <CheckCircle className="h-4 w-4" /> : <Shield className="h-4 w-4" />}
                </div>
                <span className="font-medium">Verify</span>
              </div>
            </div>
            <Progress value={(verificationStep / 3) * 100} className="h-2" />
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Panel 1: Upload & Capture */}
            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-card shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Upload className="h-5 w-5" />
                  <span>Upload Document</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {!uploadedFile ? (
                  <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                      isDragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25 hover:border-primary/50'
                    }`}
                  >
                    <input {...getInputProps()} />
                    <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-lg font-medium mb-2">Drop certificate here</p>
                    <p className="text-sm text-muted-foreground mb-4">
                      or click to browse files
                    </p>
                    <Badge variant="outline">PDF, JPG, PNG up to 10MB</Badge>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-4 bg-muted rounded-lg">
                      <FileText className="h-8 w-8 text-primary" />
                      <div className="flex-1">
                        <p className="font-medium">{uploadedFile.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <Button variant="ghost" size="sm" onClick={resetVerification}>
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </div>
                    {/* Send to Verification API */}
                    <Button
                      onClick={sendFileToVerificationAPI}
                      disabled={!uploadedFile}
                      variant="secondary"
                      className="w-full"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Send to Verification API
                    </Button>
                    <div className="text-xs text-muted-foreground">(Logs result to console)</div>
                    {isProcessing && verificationStep < 3 && (
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 animate-spin" />
                          <span className="text-sm">Processing document...</span>
                        </div>
                        <Progress value={verificationStep * 33} className="h-1" />
                      </div>
                    )}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" className="w-full">
                    <Camera className="h-4 w-4 mr-2" />
                    Camera
                  </Button>
                  <Button variant="outline" size="sm" className="w-full">
                    <QrCode className="h-4 w-4 mr-2" />
                    Scan QR
                  </Button>
                </div>

                <Button variant="ghost" size="sm" className="w-full">
                  Use Sample Data
                </Button>
              </CardContent>
            </Card>

            {/* Panel 2: OCR & Preview */}
            <Card className="border-primary/20 bg-gradient-to-br from-accent/5 to-card shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Scan className="h-5 w-5" />
                  <span>Extracted Data</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {ocrData ? (
                  <Tabs defaultValue="fields" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="fields">Key Fields</TabsTrigger>
                      <TabsTrigger value="bbox">Detection</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="fields" className="space-y-3">
                      {Object.entries(ocrData).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center p-2 bg-muted/50 rounded">
                          <span className="text-sm font-medium capitalize">
                            {key.replace(/([A-Z])/g, ' $1')}:
                          </span>
                          <span className="text-sm">{String(value)}</span>
                        </div>
                      ))}
                    </TabsContent>
                    
                    <TabsContent value="bbox">
                      <PredictBBoxWidget />
                    </TabsContent>
                  </Tabs>
                ) : (
                  <div className="text-center py-8">
                    <Scan className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Upload a document to see extracted data
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Panel 3: Verification Results */}
            <Card className="border-primary/20 bg-gradient-to-br from-secondary/5 to-card shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Verification Result</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {verificationResult ? (
                  <div className="space-y-4">
                    {/* Status Badge */}
                    <div className="text-center">
                      <Badge 
                        variant={
                          verificationResult.status === 'valid' ? 'default' :
                          verificationResult.status === 'review' ? 'secondary' : 
                          'destructive'
                        }
                        className="text-lg px-4 py-2"
                      >
                        {verificationResult.status === 'valid' && <CheckCircle className="h-4 w-4 mr-2" />}
                        {verificationResult.status === 'review' && <AlertTriangle className="h-4 w-4 mr-2" />}
                        {verificationResult.status === 'invalid' && <XCircle className="h-4 w-4 mr-2" />}
                        {verificationResult.status.toUpperCase()}
                      </Badge>
                    </div>

                    {/* Confidence Score */}
                    <div className="text-center">
                      <div className="text-3xl font-bold">{verificationResult.confidence}%</div>
                      <p className="text-sm text-muted-foreground">Confidence Score</p>
                      <Progress value={verificationResult.confidence} className="h-2 mt-2" />
                    </div>

                    {/* Verification Details */}
                    <div className="space-y-2">
                      <h4 className="font-medium">Verification Details</h4>
                      {Object.entries(verificationResult.details).map(([key, passed]) => (
                        <div key={key} className="flex items-center justify-between">
                          <span className="text-sm capitalize">
                            {key.replace(/([A-Z])/g, ' $1')}
                          </span>
                          {passed ? (
                            <CheckCircle className="h-4 w-4 text-success" />
                          ) : (
                            <XCircle className="h-4 w-4 text-destructive" />
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Reasons */}
                    <div className="space-y-2">
                      <h4 className="font-medium">Analysis</h4>
                      {verificationResult.reasons.map((reason, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{reason}</span>
                        </div>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Report
                      </Button>
                      <Button variant="outline" size="sm">
                        <Copy className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Verification results will appear here
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}