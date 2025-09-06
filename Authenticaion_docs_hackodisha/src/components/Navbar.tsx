import { useState } from "react";
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
  User
} from "lucide-react";

interface NavbarProps {
  user?: {
    name: string;
    role: 'verifier' | 'institution' | 'admin';
  } | null;
}

export function Navbar({ user }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // In real app, clear auth tokens/session here
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  const navItems = user ? [
    { 
      href: "/dashboard", 
      label: "Dashboard", 
      icon: BarChart3,
      roles: ['verifier', 'institution', 'admin'] 
    },
    { 
      href: "/verify", 
      label: "Verify Document", 
      icon: FileSearch,
      roles: ['verifier', 'institution', 'admin'] 
    },
    { 
      href: "/history", 
      label: "History", 
      icon: History,
      roles: ['verifier', 'institution', 'admin'] 
    },
    { 
      href: "/institutions", 
      label: "Institutions", 
      icon: Building2,
      roles: ['institution', 'admin'] 
    },
    { 
      href: "/admin", 
      label: "Admin", 
      icon: Shield,
      roles: ['admin'] 
    },
  ].filter(item => item.roles.includes(user.role)) : [
    { href: "/", label: "Home" },
    { href: "/help", label: "Help" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 hover:opacity-90 transition-opacity">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-hero-gradient">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div className="hidden sm:block">
            <h1 className="font-display text-xl font-bold text-foreground">
              AuthenTech
            </h1>
            <p className="text-xs text-muted-foreground">Jharkhand HED</p>
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
                <span className="text-sm font-medium">{user.name}</span>
                <Badge variant="secondary" className="text-xs">
                  {user.role}
                </Badge>
              </div>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-2">
              <Link to="/login">
                <Button variant="ghost" size="sm">Login</Button>
              </Link>
              <Link to="/verify">
                <Button variant="hero" size="sm">Verify Document</Button>
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
                      <p className="font-medium">{user.name}</p>
                      <Badge variant="secondary" className="text-xs">
                        {user.role}
                      </Badge>
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
                    <Button variant="ghost" className="w-full justify-start space-x-3">
                      <Settings className="h-4 w-4" />
                      <span>Settings</span>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start space-x-3" onClick={handleLogout}>
                      <LogOut className="h-4 w-4" />
<span>Logout</span>
                    </Button>
                  </div>
                ) : (
                  <div className="pt-4 border-t space-y-2">
                    <Link to="/login" onClick={() => setIsOpen(false)}>
                      <Button variant="ghost" className="w-full">Login</Button>
                    </Link>
                    <Link to="/verify" onClick={() => setIsOpen(false)}>
                      <Button variant="hero" className="w-full">Verify Document</Button>
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