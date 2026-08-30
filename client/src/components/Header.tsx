import { Link } from "wouter";
import { Button } from "./ui/button";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Menu } from "lucide-react";
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
    <header className="border-b border-border/50 bg-card/95 backdrop-blur-sm text-card-foreground sticky top-0 z-50 shadow-sm">
      <div className="container">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex h-12 w-52 shrink-0 items-center overflow-hidden hover:opacity-90 transition-all duration-200 sm:w-56" aria-label="Undercap Stocks home">
              <img 
                src="https://private-us-east-1.manuscdn.com/sessionFile/b3rctggf62jHrMsjiUmoDx/sandbox/g4J6HibEPq9p9UacJ5smzc_1770742352417_na1fn_dW5kZXJjYXAtc3RvY2tzLWxvZ28.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvYjNyY3RnZ2Y2MmpIck1zamlVbW9EeC9zYW5kYm94L2c0SjZIaWJFUHE5cDlVYWNKNXNtemNfMTc3MDc0MjM1MjQxN19uYTFmbl9kVzVrWlhKallYQXRjM1J2WTJ0ekxXeHZaMjgucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=H6gB8aCquA4fgg6YXgF4sFHUbrmLC8jbvRLod2K15OQT8cn5MzIw39vXCLm3lz4BLDV0CRUWRPaglTccTsJOqYjT3TLg3aA-ihsN3WC7UYK9gcVsO67E3GfpMgtqqxS~vp4FagFDvb~CoES3hHFxjnv93GxY5UAnk~lYjWiZVz~I8n95yialyB0HMVia~h0sM0DQggj1fXsF2LPWdspkdmYcfmp87GpMOfjQNfBdjCzONSuASXTLgJaSGZPAaXa01QGYxnwdbmyqpCihZ6AHgyZe6RJ6ZildH-kCIqo-6nRGmZdwN~Ckvni9LJ0r3GfqW9c2dXkBfYVmKWduQAeg0Q__"
                alt="Undercap Stocks Logo" 
                className="h-full w-full scale-[1.24] object-cover object-center"
              />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm font-medium text-foreground/80 hover:text-primary transition-all duration-200 relative group">
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </nav>

          {/* Auth Section */}
          <div className="hidden lg:flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-accent/50">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold text-sm">
                  {(user?.name || user?.email || 'U')[0].toUpperCase()}
                </div>
                <span className="text-sm font-medium">
                  {user?.name || user?.email}
                </span>
              </div>
            ) : (
              <Button asChild size="sm" className="px-6 py-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-sm">
                <a href={getLoginUrl()}>Sign In</a>
              </Button>
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="hover:bg-accent">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="text-lg font-medium hover:text-primary transition-colors">
                      {link.label}
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
