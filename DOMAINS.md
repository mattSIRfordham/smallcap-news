# Undercap Stocks - Domain Setup

## Owned Domains

You have purchased the following domains for Undercap Stocks:

1. **undercapstocks.com** - Primary domain
2. **undercapstocks.io** - Alternative domain
3. **undercapstocks.ai** - Alternative domain

## Domain Binding Instructions

To bind your custom domains to this Manus website:

### Step 1: Access Domain Settings
1. Open the Management UI (right panel)
2. Navigate to Settings → Domains

### Step 2: Add Custom Domain
1. Click "Add Custom Domain"
2. Enter your primary domain: `undercapstocks.com`
3. Follow the DNS configuration instructions provided by Manus
4. Typically you'll need to add a CNAME record pointing to your Manus subdomain

### Step 3: Configure DNS
At your domain registrar (where you purchased the domains), add the following DNS records:

**For undercapstocks.com:**
```
Type: CNAME
Name: @ (or leave blank for root domain)
Value: [Your Manus subdomain].manus.space
TTL: 3600 (or automatic)
```

**For www.undercapstocks.com:**
```
Type: CNAME
Name: www
Value: [Your Manus subdomain].manus.space
TTL: 3600 (or automatic)
```

### Step 4: Repeat for Additional Domains
Repeat steps 2-3 for:
- undercapstocks.io
- undercapstocks.ai

### Step 5: Set Primary Domain
Once all domains are verified:
1. In Settings → Domains, select `undercapstocks.com` as your primary domain
2. This will be used for canonical URLs and SEO

## Domain Strategy

**Recommended setup:**
- **undercapstocks.com** → Primary domain for the main website
- **undercapstocks.io** → Could redirect to .com, or use for API/developer resources
- **undercapstocks.ai** → Could redirect to .com, or use for AI-specific features/content

## SSL/HTTPS

Manus automatically provisions SSL certificates for custom domains. Once DNS propagates (usually 24-48 hours), your site will be accessible via HTTPS on all configured domains.

## SEO Considerations

The website is already configured with:
- Proper meta tags and Open Graph data
- Structured data (JSON-LD) for articles
- Canonical URL support (will use primary domain once set)
- Sitemap generation ready

After binding your primary domain, update the VITE_APP_TITLE in Settings → Secrets if you want to customize the browser tab title further.
