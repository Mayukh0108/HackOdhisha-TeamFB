import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Home, AlertTriangle, ArrowLeft, HelpCircle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-md mx-auto">
        <Card className="border-primary/20 shadow-elegant">
          <CardContent className="p-8">
            {/* Error Icon */}
            <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="h-10 w-10 text-destructive" />
            </div>

            {/* Error Code */}
            <Badge variant="destructive" className="text-lg px-4 py-2 mb-4">
              404 Error
            </Badge>

            {/* Headlines */}
            <h1 className="text-3xl font-display font-bold mb-4">
              Page Not Found
            </h1>
            <p className="text-muted-foreground mb-8">
              The page you're looking for doesn't exist or has been moved.
            </p>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Link to="/" className="block">
                <Button variant="hero" size="lg" className="w-full">
                  <Home className="h-4 w-4 mr-2" />
                  Return to Home
                </Button>
              </Link>
              
              <div className="grid grid-cols-2 gap-3">
                <Link to="/verify">
                  <Button variant="outline" size="sm" className="w-full">
                    Verify Document
                  </Button>
                </Link>
                <Link to="/help">
                  <Button variant="ghost" size="sm" className="w-full">
                    <HelpCircle className="h-4 w-4 mr-1" />
                    Get Help
                  </Button>
                </Link>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-8 pt-6 border-t text-xs text-muted-foreground">
              <p>
                If you believe this is an error, please{" "}
                <Link to="/help" className="text-primary hover:underline">
                  contact support
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NotFound;
