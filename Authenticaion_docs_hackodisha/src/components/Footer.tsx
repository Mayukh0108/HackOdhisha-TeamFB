import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Github,
  Twitter,
  Linkedin,
} from "lucide-react";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/verify", label: "Verify Document" },
  { href: "/help", label: "Help Center" },
  { href: "/login", label: "Login" },
];

const resources = [
  { href: "/help", label: "Documentation" },
  { href: "/help", label: "API Reference" },
  { href: "/help", label: "Integration Guide" },
  { href: "/help", label: "Status Page" },
];

const legal = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/help", label: "Security Policy" },
  { href: "/help", label: "Cookie Policy" },
];

export function Footer() {
  return (
    <footer className="bg-secondary text-white">
      <div className="container py-16">
        {/* Main Footer */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-hero-gradient">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold">AuthenTech</h3>
                <p className="text-sm text-white/70">Team Firewall Breakers</p>
              </div>
            </div>
            <p className="text-white/80">
              Securing academic credentials with cutting-edge verification
              technology.
            </p>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-white/20 text-white">
                Trusted Platform
              </Badge>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    to={link.href}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              {resources.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    to={link.href}
                    className="text-white/80 hover:text-white transition-colors inline-flex items-center"
                  >
                    {link.label}
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-white/60" />
                <span className="text-sm text-white/80">
                  Team Firewall Breakers
                  <br />
                  Kolkata, West-Bengal
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-white/60" />
                <span className="text-sm text-white/80">+91 8335867482</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-white/60" />
                <span className="text-sm text-white/80">
                  support@authentech.com
                </span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-2 mt-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-white/60 hover:text-white"
              >
                <Twitter className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white/60 hover:text-white"
              >
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white/60 hover:text-white"
              >
                <Github className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-white/60">
              © 2025 team Firewall_Breakers. All rights reserved.
            </div>
            <div className="flex flex-wrap gap-6">
              {legal.map((link) => (
                <Link
                  key={link.href + link.label}
                  to={link.href}
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
