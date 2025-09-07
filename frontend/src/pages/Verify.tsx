import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  Shield,
  ZoomIn,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock user - in real app this would come from auth context
const mockUser = {
  name: "Dr. Sarah Johnson",
  role: "verifier" as const,
};

interface Detection {
  bbox: number[];
  class_name: "fake" | "true";
  confidence: number;
}

interface VerificationApiResponse {
  detections: Detection[];
}

interface VerificationResult {
  status: "valid" | "review" | "invalid";
  detections: Detection[];
  summary: {
    totalDetections: number;
    fakeDetections: number;
    trueDetections: number;
  };
  visualizationUrl?: string;
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
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // For demo, we'll create a mock result
      const canvas = document.createElement("canvas");
      canvas.width = 800;
      canvas.height = 600;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        // Create mock bounding box visualization
        ctx.fillStyle = "#f0f9ff";
        ctx.fillRect(0, 0, 800, 600);

        // Draw bounding boxes
        ctx.strokeStyle = "#22c55e";
        ctx.lineWidth = 3;
        ctx.strokeRect(50, 50, 200, 100); // Seal
        ctx.strokeRect(300, 200, 250, 50); // Signature
        ctx.strokeRect(100, 400, 300, 80); // Certificate ID

        // Add labels
        ctx.fillStyle = "#22c55e";
        ctx.font = "16px Inter";
        ctx.fillText("Official Seal ✓", 55, 45);
        ctx.fillText("Signature ✓", 305, 195);
        ctx.fillText("Certificate ID ✓", 105, 395);
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
          <img
            src={result}
            alt="Bounding Box Detection Result"
            className="w-full h-auto"
          />
        </div>
      )}
    </div>
  );
};

export default function Verify() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [verificationStep, setVerificationStep] = useState(0);
  const [ocrData, setOcrData] = useState<any>(null);
  const [verificationResult, setVerificationResult] =
    useState<VerificationResult | null>(null);
  const [isProcessingOCR, setIsProcessingOCR] = useState(false);
  const [isProcessingVerification, setIsProcessingVerification] =
    useState(false);
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      // Clear all existing data and reset to initial state
      setOcrData(null);
      setVerificationResult(null);
      setIsProcessingOCR(false);
      setIsProcessingVerification(false);

      // Set new file and start process
      setUploadedFile(file);
      setVerificationStep(1);
      // Extract data for UI
      processOCR(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg"],
      "application/pdf": [".pdf"],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: false,
  });

  const processOCR = async (file: File) => {
    setIsProcessingOCR(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch(
        "https://hackodisha-ocr-api.onrender.com/extract/",
        {
          method: "POST",
          body: formData,
        }
      );
      if (!response.ok) throw new Error("OCR API error");
      const ocrResult = await response.json();

      // Check if OCR API returned an error (not an educational certificate)
      if (ocrResult.error) {
        setOcrData({ error: ocrResult.error });
        toast({
          variant: "destructive",
          title: "Invalid Document Type",
          description: ocrResult.error,
        });
        return; // Don't proceed to verification
      }

      setOcrData(ocrResult);
      console.log("OCR Result:", ocrResult.Name, ocrResult.Institution);
      if (ocrResult.Name && ocrResult.Institution) {
        const token = localStorage.getItem("authToken");
        fetch(
          "https://hackodhisha-teamfb-backend.onrender.com/api/users/results",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            body: JSON.stringify({
              name: ocrResult.Name,
              institution: ocrResult.Institution,
            }),
            credentials: "include",
          }
        )
          .then((res) => res.json())
          .then((data) => console.log("Stored in DB:", data))
          .catch((err) => console.error("DB store error:", err));
      }
      setVerificationStep(2);

      // Automatically proceed to verification only if OCR was successful
      setTimeout(() => processVerification(file), 1000);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "OCR Processing Failed",
        description: "Could not extract text from document",
      });
    } finally {
      setIsProcessingOCR(false);
    }
  };

  const processVerification = async (file: File) => {
    setIsProcessingVerification(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch(
        "https://hackodisha-forge-detection-api-1.onrender.com/predict",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Verification API error");

      const apiResult: VerificationApiResponse = await response.json();
      console.log("Verification API result:", apiResult);

      // Process the API result
      const { detections } = apiResult;
      const fakeDetections = detections.filter((d) => d.class_name === "fake");
      const trueDetections = detections.filter((d) => d.class_name === "true");

      // Determine status - if any fake detections found, mark as invalid/review
      let status: "valid" | "review" | "invalid";
      if (fakeDetections.length > 0) {
        // Check if any high confidence fake detections
        const highConfidenceFakes = fakeDetections.filter(
          (d) => d.confidence > 0.7
        );
        status = highConfidenceFakes.length > 0 ? "invalid" : "review";
      } else {
        status = "valid";
      }

      // Create visualization with bounding boxes
      const visualizationUrl = await createVisualization(file, detections);

      const result: VerificationResult = {
        status,
        detections,
        summary: {
          totalDetections: detections.length,
          fakeDetections: fakeDetections.length,
          trueDetections: trueDetections.length,
        },
        visualizationUrl,
      };

      setVerificationResult(result);
      setVerificationStep(3);

      toast({
        title: "Verification Complete",
        description: `Found ${fakeDetections.length} suspicious regions out of ${detections.length} total`,
        variant: status === "invalid" ? "destructive" : "default",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Verification Failed",
        description: "Could not verify document against registry",
      });
    } finally {
      setIsProcessingVerification(false);
    }
  };

  // Create visualization with bounding boxes overlaid on original image
  const createVisualization = async (
    file: File,
    detections: Detection[]
  ): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      img.onload = () => {
        if (!ctx) return;

        // Set canvas size to match image
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw original image
        ctx.drawImage(img, 0, 0);

        // Draw bounding boxes
        detections.forEach((detection, index) => {
          const [x1, y1, x2, y2] = detection.bbox;
          const width = x2 - x1;
          const height = y2 - y1;

          // Set color based on detection result
          const isFake = detection.class_name === "fake";
          const color = isFake ? "#ef4444" : "#22c55e"; // Red for fake, green for authentic
          const confidence = Math.round(detection.confidence * 100);

          // Draw bounding box rectangle
          ctx.strokeStyle = color;
          ctx.lineWidth = 3;
          ctx.strokeRect(x1, y1, width, height);

          // Draw semi-transparent fill
          ctx.fillStyle = color + "20"; // Add transparency
          ctx.fillRect(x1, y1, width, height);

          // Prepare label text
          const statusText = isFake ? "FAKE" : "AUTHENTIC";
          const labelText = `${statusText} (${confidence}%)`;

          // Set label styling
          ctx.font = "bold 14px Arial";
          ctx.textAlign = "left";

          // Measure text for background
          const textMetrics = ctx.measureText(labelText);
          const textWidth = textMetrics.width;
          const textHeight = 20;
          const padding = 4;

          // Position label (try to place it above the box, if space available)
          let labelX = x1;
          let labelY = y1 - textHeight - padding;

          // If label would go off top of image, place it inside the box
          if (labelY < 0) {
            labelY = y1 + textHeight + padding;
          }

          // If label would go off right side, adjust x position
          if (labelX + textWidth + padding * 2 > canvas.width) {
            labelX = canvas.width - textWidth - padding * 2;
          }

          // Draw label background
          ctx.fillStyle = color;
          ctx.fillRect(
            labelX - padding,
            labelY - textHeight,
            textWidth + padding * 2,
            textHeight + padding
          );

          // Draw label text
          ctx.fillStyle = "white";
          ctx.fillText(labelText, labelX, labelY - 4);
        });

        // Convert to blob URL
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(URL.createObjectURL(blob));
          }
        });
      };

      img.src = URL.createObjectURL(file);
    });
  };

  const resetVerification = () => {
    setUploadedFile(null);
    setVerificationStep(0);
    setOcrData(null);
    setVerificationResult(null);
    setIsProcessingOCR(false);
    setIsProcessingVerification(false);
  };

  const downloadReport = async () => {
    if (!verificationResult || !uploadedFile) return;

    // Create report content
    const reportData = {
      documentName: uploadedFile.name,
      timestamp: new Date().toLocaleString(),
      verificationStatus: verificationResult.status,
      summary: verificationResult.summary,
      detections: verificationResult.detections.map((detection, index) => ({
        regionId: index + 1,
        status: detection.class_name === "fake" ? "Suspicious" : "Authentic",
        confidence: Math.round(detection.confidence * 100),
        coordinates: detection.bbox.map((coord) => Math.round(coord)),
      })),
      ocrData: ocrData,
    };

    const baseFileName = uploadedFile.name.split(".")[0];
    const dateString = new Date().toISOString().split("T")[0];

    // Convert visualization image to base64 for embedding
    let imageBase64 = "";
    if (verificationResult.visualizationUrl) {
      try {
        const response = await fetch(verificationResult.visualizationUrl);
        const blob = await response.blob();
        const reader = new FileReader();
        imageBase64 = await new Promise((resolve) => {
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(blob);
        });
      } catch (error) {
        console.error("Failed to convert image to base64:", error);
      }
    }

    // Create comprehensive HTML content for PDF conversion
    const htmlForPdf = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Document Verification Report</title>
    <style>
        @page {
            margin: 1in;
            size: A4;
        }
        body {
            font-family: 'Segoe UI', Arial, sans-serif;
            line-height: 1.4;
            color: #333;
            margin: 0;
            padding: 0;
        }
        .header {
            text-align: center;
            border-bottom: 3px solid #2563eb;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .header h1 {
            color: #1f2937;
            margin: 10px 0;
            font-size: 28px;
        }
        .status-badge {
            display: inline-block;
            padding: 8px 16px;
            border-radius: 20px;
            font-weight: bold;
            font-size: 14px;
            color: white;
            margin: 10px 0;
            background-color: ${
              reportData.verificationStatus === "valid"
                ? "#10b981"
                : reportData.verificationStatus === "review"
                ? "#f59e0b"
                : "#ef4444"
            };
        }
        .document-info {
            background: #f8fafc;
            padding: 15px;
            border-radius: 8px;
            margin: 20px 0;
        }
        .document-info p {
            margin: 5px 0;
            font-size: 14px;
        }
        .analysis-image {
            text-align: center;
            margin: 30px 0;
            page-break-inside: avoid;
        }
        .analysis-image img {
            max-width: 100%;
            max-height: 400px;
            border: 2px solid #e5e7eb;
            border-radius: 8px;
        }
        .legend {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin: 15px 0;
            font-size: 12px;
        }
        .legend-item {
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .legend-color {
            width: 16px;
            height: 16px;
            border-radius: 3px;
        }
        .section {
            margin: 25px 0;
            page-break-inside: avoid;
        }
        .section h3 {
            color: #1f2937;
            font-size: 18px;
            margin-bottom: 15px;
            border-bottom: 2px solid #e5e7eb;
            padding-bottom: 5px;
        }
        .summary-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 15px;
            margin: 20px 0;
        }
        .stat-card {
            text-align: center;
            padding: 15px;
            border: 2px solid #e5e7eb;
            border-radius: 8px;
            background: #f9fafb;
        }
        .stat-number {
            font-size: 24px;
            font-weight: bold;
            margin: 0;
        }
        .stat-label {
            color: #6b7280;
            font-size: 12px;
            margin: 5px 0 0 0;
        }
        .detection-list {
            margin: 15px 0;
        }
        .detection-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
            margin: 8px 0;
            border-radius: 6px;
            font-size: 13px;
        }
        .detection-authentic {
            background-color: #f0fdf4;
            border: 1px solid #22c55e;
        }
        .detection-suspicious {
            background-color: #fef2f2;
            border: 1px solid #ef4444;
        }
        .ocr-table {
            width: 100%;
            border-collapse: collapse;
            margin: 15px 0;
            font-size: 13px;
        }
        .ocr-table th,
        .ocr-table td {
            border: 1px solid #e5e7eb;
            padding: 8px;
            text-align: left;
        }
        .ocr-table th {
            background-color: #f3f4f6;
            font-weight: bold;
        }
        .conclusion {
            background: ${
              reportData.verificationStatus === "valid" ? "#f0fdf4" : "#fef2f2"
            };
            border: 2px solid ${
              reportData.verificationStatus === "valid" ? "#22c55e" : "#ef4444"
            };
            padding: 20px;
            border-radius: 8px;
            margin: 25px 0;
            page-break-inside: avoid;
        }
        .conclusion h3 {
            margin-top: 0;
            color: ${
              reportData.verificationStatus === "valid" ? "#15803d" : "#dc2626"
            };
        }
        .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            color: #6b7280;
            font-size: 12px;
            page-break-inside: avoid;
        }
        @media print {
            body { -webkit-print-color-adjust: exact; }
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🛡️ Document Verification Report</h1>
        <div class="status-badge">
            ${
              reportData.verificationStatus === "valid"
                ? "✅ AUTHENTIC"
                : reportData.verificationStatus === "review"
                ? "⚠️ NEEDS REVIEW"
                : "❌ SUSPICIOUS"
            }
        </div>
    </div>

    <div class="document-info">
        <p><strong>📄 Document:</strong> ${reportData.documentName}</p>
        <p><strong>📅 Verification Date:</strong> ${reportData.timestamp}</p>
        <p><strong>🔍 Status:</strong> ${reportData.verificationStatus.toUpperCase()}</p>
    </div>

    ${
      imageBase64
        ? `
    <div class="analysis-image">
        <h3>🔬 Detection Analysis Visualization</h3>
        <img src="${imageBase64}" alt="Document Analysis with Detection Regions" />
        <div class="legend">
            <div class="legend-item">
                <div class="legend-color" style="background-color: #ef4444;"></div>
                <span>Suspicious Regions</span>
            </div>
            <div class="legend-item">
                <div class="legend-color" style="background-color: #22c55e;"></div>
                <span>Authentic Regions</span>
            </div>
        </div>
    </div>
    `
        : ""
    }

    <div class="section">
        <h3>📊 Verification Summary</h3>
        <div class="summary-grid">
            <div class="stat-card">
                <p class="stat-number">${reportData.summary.totalDetections}</p>
                <p class="stat-label">Total Regions</p>
            </div>
            <div class="stat-card">
                <p class="stat-number" style="color: #22c55e;">${
                  reportData.summary.trueDetections
                }</p>
                <p class="stat-label">Authentic</p>
            </div>
            <div class="stat-card">
                <p class="stat-number" style="color: #ef4444;">${
                  reportData.summary.fakeDetections
                }</p>
                <p class="stat-label">Suspicious</p>
            </div>
        </div>
    </div>

    <div class="section">
        <h3>🔍 Detection Details</h3>
        <div class="detection-list">
            ${reportData.detections
              .map(
                (detection) => `
                <div class="detection-item detection-${detection.status.toLowerCase()}">
                    <span>
                        ${detection.status === "Suspicious" ? "🚨" : "✅"} 
                        Region ${detection.regionId}: ${detection.status}
                    </span>
                    <span style="font-weight: bold;">${
                      detection.confidence
                    }%</span>
                </div>
            `
              )
              .join("")}
        </div>
    </div>

    ${
      reportData.ocrData && !reportData.ocrData.error
        ? `
    <div class="section">
        <h3>📄 Extracted Document Data</h3>
        <table class="ocr-table">
            <thead>
                <tr>
                    <th>Field</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
                ${Object.entries(reportData.ocrData)
                  .map(
                    ([key, value]) => `
                    <tr>
                        <td><strong>${key
                          .replace(/([A-Z])/g, " $1")
                          .trim()}</strong></td>
                        <td>${value}</td>
                    </tr>
                `
                  )
                  .join("")}
            </tbody>
        </table>
    </div>
    `
        : ""
    }

    <div class="conclusion">
        <h3>🎯 Final Assessment</h3>
        <p>
            ${
              reportData.verificationStatus === "valid"
                ? "✅ This certificate appears to be <strong>AUTHENTIC</strong>. All detected regions show genuine characteristics and pass verification checks. The document can be considered legitimate based on the forensic analysis."
                : reportData.verificationStatus === "review"
                ? "⚠️ This certificate requires <strong>MANUAL REVIEW</strong>. Some regions show suspicious patterns that need human verification before making a final determination. Additional scrutiny is recommended."
                : "❌ This certificate may be <strong>FORGED</strong>. Suspicious regions detected with high confidence levels indicate potential document tampering or forgery. This document should not be accepted without further investigation."
            }
        </p>
    </div>

    <div class="footer">
        <p><strong>Report generated by Document Verification System</strong></p>
        <p>Generated on: ${new Date().toISOString()}</p>
        <p>This report contains embedded analysis visualization and comprehensive verification data.</p>
        <p>⚠️ This report is for verification purposes only and should be used in conjunction with other authentication methods.</p>
    </div>
</body>
</html>`;

    // Create a new window for PDF generation
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(htmlForPdf);
      printWindow.document.close();

      // Wait for content to load, then trigger print dialog
      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print();
          // Close the window after printing
          printWindow.onafterprint = () => {
            printWindow.close();
          };
        }, 500);
      };
    }

    toast({
      title: "Report Ready for Download",
      description: "Print dialog opened - save as PDF from the print menu.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card-glass to-accent/5">
      <Navbar />

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
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    verificationStep >= 1
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {verificationStep >= 1 ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <Upload className="h-4 w-4" />
                  )}
                </div>
                <span className="font-medium">Upload</span>
              </div>

              <div className="flex items-center space-x-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    verificationStep >= 2
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {verificationStep >= 2 ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <Scan className="h-4 w-4" />
                  )}
                </div>
                <span className="font-medium">Extract</span>
              </div>

              <div className="flex items-center space-x-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    verificationStep >= 3
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {verificationStep >= 3 ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <Shield className="h-4 w-4" />
                  )}
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
                      isDragActive
                        ? "border-primary bg-primary/5"
                        : "border-muted-foreground/25 hover:border-primary/50"
                    }`}
                  >
                    <input {...getInputProps()} />
                    <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-lg font-medium mb-2">
                      Drop certificate here
                    </p>
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
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={resetVerification}
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Choose New Document Button */}
                    <div
                      {...getRootProps()}
                      className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center cursor-pointer transition-colors hover:border-primary/50 hover:bg-primary/5"
                    >
                      <input {...getInputProps()} />
                      <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm font-medium mb-1">
                        Choose New Document
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Click or drop to upload a different file
                      </p>
                    </div>

                    {/* Processing Status */}
                    {(isProcessingOCR || isProcessingVerification) && (
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 animate-spin" />
                          <span className="text-sm">
                            {isProcessingOCR
                              ? "Extracting text..."
                              : "Verifying document..."}
                          </span>
                        </div>
                        <Progress
                          value={isProcessingOCR ? 50 : 90}
                          className="h-1"
                        />
                      </div>
                    )}
                  </div>
                )}
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
                {isProcessingOCR ? (
                  <div className="text-center py-8">
                    <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4 animate-spin" />
                    <p className="text-muted-foreground">
                      Extracting text from document...
                    </p>
                  </div>
                ) : ocrData ? (
                  <div className="space-y-3">
                    {Object.entries(ocrData).map(([key, value]) => (
                      <div
                        key={key}
                        className="flex justify-between items-center p-2 bg-muted/50 rounded"
                      >
                        <span className="text-sm font-medium capitalize">
                          {key.replace(/([A-Z])/g, " $1")}:
                        </span>
                        <span className="text-sm">{String(value)}</span>
                      </div>
                    ))}
                  </div>
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
                {isProcessingVerification ? (
                  <div className="text-center py-8">
                    <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4 animate-pulse" />
                    <p className="text-muted-foreground">
                      Analyzing document authenticity...
                    </p>
                  </div>
                ) : verificationResult ? (
                  <div className="space-y-4">
                    {/* Status Badge */}
                    <div className="text-center">
                      <Badge
                        variant={
                          verificationResult.status === "valid"
                            ? "default"
                            : "destructive"
                        }
                        className="text-lg px-4 py-2"
                      >
                        {verificationResult.status === "valid" && (
                          <CheckCircle className="h-4 w-4 mr-2" />
                        )}
                        {verificationResult.status === "review" && (
                          <AlertTriangle className="h-4 w-4 mr-2" />
                        )}
                        {verificationResult.status === "invalid" && (
                          <XCircle className="h-4 w-4 mr-2" />
                        )}
                        {verificationResult.status === "valid"
                          ? "AUTHENTIC"
                          : verificationResult.status === "review"
                          ? "NEEDS REVIEW"
                          : "SUSPICIOUS"}
                      </Badge>
                    </div>

                    {/* Visualization */}
                    {verificationResult.visualizationUrl && (
                      <div className="space-y-2">
                        <h4 className="font-medium">Detection Visualization</h4>
                        <Dialog>
                          <DialogTrigger asChild>
                            <div className="rounded-lg overflow-hidden border cursor-pointer hover:border-primary/50 transition-colors group relative">
                              <img
                                src={verificationResult.visualizationUrl}
                                alt="Detection Results"
                                className="w-full h-auto group-hover:opacity-90 transition-opacity"
                              />
                              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                                <div className="bg-white/90 rounded-full p-2">
                                  <ZoomIn className="h-5 w-5 text-gray-700" />
                                </div>
                              </div>
                            </div>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl w-full max-h-[90vh] overflow-auto">
                            <DialogHeader>
                              <DialogTitle className="flex items-center space-x-2">
                                <Shield className="h-5 w-5" />
                                <span>Document Verification Analysis</span>
                              </DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              {/* Large Image Display */}
                              <div className="rounded-lg overflow-hidden border">
                                <img
                                  src={verificationResult.visualizationUrl}
                                  alt="Detailed Detection Results"
                                  className="w-full h-auto"
                                />
                              </div>

                              {/* Legend and Info */}
                              <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-3">
                                  <h4 className="font-medium">Color Legend</h4>
                                  <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                      <div className="w-4 h-4 bg-red-500 rounded border"></div>
                                      <span className="text-sm">
                                        Suspicious/Fake Regions
                                      </span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <div className="w-4 h-4 bg-green-500 rounded border"></div>
                                      <span className="text-sm">
                                        Authentic Regions
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                <div className="space-y-3">
                                  <h4 className="font-medium">
                                    Detection Summary
                                  </h4>
                                  <div className="space-y-2">
                                    <div className="flex justify-between">
                                      <span className="text-sm">
                                        Total Regions:
                                      </span>
                                      <span className="font-medium">
                                        {
                                          verificationResult.summary
                                            .totalDetections
                                        }
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm text-green-600">
                                        Authentic:
                                      </span>
                                      <span className="font-medium text-green-600">
                                        {
                                          verificationResult.summary
                                            .trueDetections
                                        }
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm text-red-600">
                                        Suspicious:
                                      </span>
                                      <span className="font-medium text-red-600">
                                        {
                                          verificationResult.summary
                                            .fakeDetections
                                        }
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Detailed Detection List for Modal */}
                              <div className="space-y-3">
                                <h4 className="font-medium">
                                  Detailed Analysis
                                </h4>
                                <div className="max-h-40 overflow-y-auto space-y-2">
                                  {verificationResult.detections.map(
                                    (detection, index) => (
                                      <div
                                        key={index}
                                        className={`p-3 rounded border ${
                                          detection.class_name === "fake"
                                            ? "bg-red-50 border-red-200"
                                            : "bg-green-50 border-green-200"
                                        }`}
                                      >
                                        <div className="flex items-center justify-between">
                                          <div className="flex items-center space-x-2">
                                            {detection.class_name === "fake" ? (
                                              <XCircle className="h-4 w-4 text-red-600" />
                                            ) : (
                                              <CheckCircle className="h-4 w-4 text-green-600" />
                                            )}
                                            <span
                                              className={`font-medium ${
                                                detection.class_name === "fake"
                                                  ? "text-red-700"
                                                  : "text-green-700"
                                              }`}
                                            >
                                              Region {index + 1}:{" "}
                                              {detection.class_name === "fake"
                                                ? "Suspicious"
                                                : "Authentic"}
                                            </span>
                                          </div>
                                          <span
                                            className={`font-bold ${
                                              detection.class_name === "fake"
                                                ? "text-red-600"
                                                : "text-green-600"
                                            }`}
                                          >
                                            {Math.round(
                                              detection.confidence * 100
                                            )}
                                            %
                                          </span>
                                        </div>
                                        <div className="mt-1 text-xs text-gray-600">
                                          Coordinates: [
                                          {detection.bbox
                                            .map((coord) => Math.round(coord))
                                            .join(", ")}
                                          ]
                                        </div>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <div className="flex items-center justify-center space-x-4 text-xs">
                          <div className="flex items-center space-x-1">
                            <div className="w-3 h-3 bg-red-500 rounded"></div>
                            <span>Suspicious</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <div className="w-3 h-3 bg-green-500 rounded"></div>
                            <span>Authentic</span>
                          </div>
                          <div className="flex items-center space-x-1 text-gray-500">
                            <ZoomIn className="w-3 h-3" />
                            <span>Click to enlarge</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Detection Summary */}
                    <div className="space-y-2">
                      <h4 className="font-medium">Detection Summary</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="p-2 bg-green-50 border border-green-200 rounded text-center">
                          <div className="font-bold text-green-600">
                            {verificationResult.summary.trueDetections}
                          </div>
                          <div className="text-xs text-green-700">
                            Authentic Regions
                          </div>
                        </div>
                        <div className="p-2 bg-red-50 border border-red-200 rounded text-center">
                          <div className="font-bold text-red-600">
                            {verificationResult.summary.fakeDetections}
                          </div>
                          <div className="text-xs text-red-700">
                            Suspicious Regions
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Detailed Detection List */}
                    <div className="space-y-2">
                      <h4 className="font-medium">Detection Details</h4>
                      <div className="max-h-32 overflow-y-auto space-y-1">
                        {verificationResult.detections.map(
                          (detection, index) => (
                            <div
                              key={index}
                              className={`flex items-center justify-between p-2 rounded text-sm ${
                                detection.class_name === "fake"
                                  ? "bg-red-50 border border-red-200"
                                  : "bg-green-50 border border-green-200"
                              }`}
                            >
                              <div className="flex items-center space-x-2">
                                {detection.class_name === "fake" ? (
                                  <XCircle className="h-4 w-4 text-red-600" />
                                ) : (
                                  <CheckCircle className="h-4 w-4 text-green-600" />
                                )}
                                <span
                                  className={
                                    detection.class_name === "fake"
                                      ? "text-red-700"
                                      : "text-green-700"
                                  }
                                >
                                  Region {index + 1}:{" "}
                                  {detection.class_name === "fake"
                                    ? "Suspicious"
                                    : "Authentic"}
                                </span>
                              </div>
                              <span
                                className={`font-medium ${
                                  detection.class_name === "fake"
                                    ? "text-red-600"
                                    : "text-green-600"
                                }`}
                              >
                                {Math.round(detection.confidence * 100)}%
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    {/* Conclusion */}
                    <div className="space-y-2">
                      <h4 className="font-medium">Analysis Result</h4>
                      <div
                        className={`p-3 rounded ${
                          verificationResult.status === "valid"
                            ? "bg-green-50 border border-green-200"
                            : "bg-red-50 border border-red-200"
                        }`}
                      >
                        <p
                          className={`text-sm ${
                            verificationResult.status === "valid"
                              ? "text-green-700"
                              : "text-red-700"
                          }`}
                        >
                          {verificationResult.status === "valid"
                            ? "✅ This certificate appears to be authentic. All detected regions show genuine characteristics."
                            : verificationResult.status === "review"
                            ? "⚠️ This certificate requires manual review. Some regions show suspicious patterns."
                            : "❌ This certificate may be forged. Suspicious regions detected with high confidence."}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="w-full">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={downloadReport}
                        className="w-full"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download Report
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
