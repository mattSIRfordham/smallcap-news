import { Link } from "wouter";
import { Button } from "./ui/button";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { TrendingUp, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Header() {
  const { user, isAuthenticated } = useAuth();

  const navLinks = [
    { href: "/", label: "Latest News" },
    { href: "/stock-screener", label: "Stock Screener" },
    { href: "/featured-companies", label: "Featured Companies" },
    { href: "/company-qa", label: "Company Q&A" },
    { href: "/submit", label: "Submit Content" },
    { href: "/market-transparency", label: "Market Transparency" },
  ];

  return (
    <header className="border-b bg-card text-card-foreground sticky top-0 z-50">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <a className="flex items-center gap-2 font-bold text-xl hover:opacity-80 transition-opacity">
              <TrendingUp className="w-6 h-6 text-primary" />
              <span>SmallCap Market News</span>
            </a>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <a className="text-sm font-medium hover:text-primary transition-colors">
                  {link.label}
                </a>
              </Link>
            ))}
          </nav>

          {/* Auth Section */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">
                  {user?.name || user?.email}
                </span>
              </div>
            ) : (
              <Button asChild size="sm">
                <a href={getLoginUrl()}>Sign In</a>
              </Button>
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href}>
                    <a className="text-lg font-medium hover:text-primary transition-colors">
                      {link.label}
                    </a>
                  </Link>
                ))}
                <div className="border-t pt-4 mt-4">
                  {isAuthenticated ? (
                    <div className="text-sm text-muted-foreground">
                      {user?.name || user?.email}
                    </div>
                  ) : (
                    <Button asChild className="w-full">
                      <a href={getLoginUrl()}>Sign In</a>
                    </Button>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
