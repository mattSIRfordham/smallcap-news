
import { Link } from "wouter";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/30 mt-auto">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="mb-4">
              <img 
                src="https://private-us-east-1.manuscdn.com/sessionFile/b3rctggf62jHrMsjiUmoDx/sandbox/g4J6HibEPq9p9UacJ5smzc_1770742352417_na1fn_dW5kZXJjYXAtc3RvY2tzLWxvZ28.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvYjNyY3RnZ2Y2MmpIck1zamlVbW9EeC9zYW5kYm94L2c0SjZIaWJFUHE5cDlVYWNKNXNtemNfMTc3MDc0MjM1MjQxN19uYTFmbl9kVzVrWlhKallYQXRjM1J2WTJ0ekxXeHZaMjgucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=H6gB8aCquA4fgg6YXgF4sFHUbrmLC8jbvRLod2K15OQT8cn5MzIw39vXCLm3lz4BLDV0CRUWRPaglTccTsJOqYjT3TLg3aA-ihsN3WC7UYK9gcVsO67E3GfpMgtqqxS~vp4FagFDvb~CoES3hHFxjnv93GxY5UAnk~lYjWiZVz~I8n95yialyB0HMVia~h0sM0DQggj1fXsF2LPWdspkdmYcfmp87GpMOfjQNfBdjCzONSuASXTLgJaSGZPAaXa01QGYxnwdbmyqpCihZ6AHgyZe6RJ6ZildH-kCIqo-6nRGmZdwN~Ckvni9LJ0r3GfqW9c2dXkBfYVmKWduQAeg0Q__"
                alt="Undercap Stocks Logo" 
                className="h-8 w-auto"
              />
            </div>
            <p className="text-sm text-muted-foreground max-w-md">
              Your source for news and analysis on nanocap, microcap, and small-cap companies trading under $1 billion market cap. 
              Covering NASDAQ, NYSE, and OTC markets with a focus on the challenges and opportunities facing underserved companies.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/">
                  <a className="text-muted-foreground hover:text-foreground transition-colors">
                    Latest News
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/featured-companies">
                  <a className="text-muted-foreground hover:text-foreground transition-colors">
                    Featured Companies
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/company-qa">
                  <a className="text-muted-foreground hover:text-foreground transition-colors">
                    Company Q&A
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="font-semibold mb-4">About</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground">
                Editorial Policy
              </li>
              <li className="text-muted-foreground">
                Advertise With Us
              </li>
              <li className="text-muted-foreground">
                Contact
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© {currentYear} Undercap Stocks. All rights reserved.</p>
          <p className="mt-2">
            Content is AI-generated and for informational purposes only. Not financial advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
