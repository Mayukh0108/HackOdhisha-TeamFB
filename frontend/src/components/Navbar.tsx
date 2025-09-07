import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Shield,
  Menu,
  FileSearch,
  History,
  Settings,
  Building2,
  BarChart3,
  LogOut,
  User,
} from "lucide-react";

export function Navbar() {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const API_BASE_URL = "https://hackodhisha-teamfb-backend.onrender.com";

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
  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (token) {
        await fetch(`${API_BASE_URL}/api/users/logout`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear both localStorage and state
      localStorage.removeItem("authToken");
      setUser(null);
      navigate("/login");
    }
  };

  const isActive = (path) => location.pathname === path;

  // Navigation items
  const navItems = user
    ? [
        {
          href: "/dashboard",
          label: "Dashboard",
          icon: BarChart3,
        },
        {
          href: "/verify",
          label: "Verify Document",
          icon: FileSearch,
        },
      ]
    : [
        { href: "/", label: "Home" },
        { href: "/help", label: "Help" },
      ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center space-x-3 hover:opacity-90 transition-opacity"
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-hero-gradient">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div className="hidden sm:block">
            <h1 className="font-display text-xl font-bold text-foreground">
              AuthenTech
            </h1>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <Link key={item.href} to={item.href}>
              <Button
                variant={isActive(item.href) ? "default" : "ghost"}
                size="sm"
                className="flex items-center space-x-2"
              >
                {item.icon && <item.icon className="h-4 w-4" />}
                <span>{item.label}</span>
              </Button>
            </Link>
          ))}
        </div>

        {/* User Actions */}
        <div className="flex items-center space-x-3">
          {user ? (
            <div className="hidden md:flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">
                  {user.name || user.email}
                </span>
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-2">
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link to="/verify">
                <Button variant="hero" size="sm">
                  Verify Document
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-4 mt-8">
                {user && (
                  <div className="flex items-center space-x-3 p-4 rounded-lg bg-muted">
                    <User className="h-8 w-8 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{user.name || user.email}</p>
                    </div>
                  </div>
                )}

                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                  >
                    <Button
                      variant={isActive(item.href) ? "default" : "ghost"}
                      className="w-full justify-start space-x-3"
                    >
                      {item.icon && <item.icon className="h-4 w-4" />}
                      <span>{item.label}</span>
                    </Button>
                  </Link>
                ))}

                {user ? (
                  <div className="pt-4 border-t space-y-2">
                    <Button
                      variant="ghost"
                      className="w-full justify-start space-x-3"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </Button>
                  </div>
                ) : (
                  <div className="pt-4 border-t space-y-2">
                    <Link to="/login" onClick={() => setIsOpen(false)}>
                      <Button variant="ghost" className="w-full">
                        Login
                      </Button>
                    </Link>
                    <Link to="/verify" onClick={() => setIsOpen(false)}>
                      <Button variant="hero" className="w-full">
                        Verify Document
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
