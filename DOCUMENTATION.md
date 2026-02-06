# SmallCap Market News - Platform Documentation

## Overview

SmallCap Market News is a fully automated finance news platform dedicated to covering nanocap, microcap, and small-cap companies trading under $1 billion market cap on NASDAQ, NYSE, and OTC markets. The platform leverages AI-powered content generation to provide hourly updates, market analysis, and company insights with an editorial stance that acknowledges the unique challenges these underserved companies face.

## Core Features

### AI-Powered Content Generation

The platform includes a sophisticated content generation system built with LLM integration that automatically creates market analysis and company news. The system is designed to:

- Generate articles with a neutral yet supportive editorial voice that highlights how regulators, investors, and exchanges often overlook small-cap companies
- Aggregate market data from Yahoo Finance API for real-time company information
- Create structured content with proper categorization, tagging, and SEO optimization
- Support hourly automated content generation through the cron job system in `server/cronJobs.ts`

### User Engagement Features

**Comments System**: Authenticated users can engage in discussions on articles. The comment system includes user authentication checks, content validation (1000 character limit), and displays user information with timestamps.

**Newsletter Subscriptions**: Visitors can subscribe to receive updates with three frequency options (daily, weekly, monthly). The system handles email validation, duplicate prevention, and subscription management.

**Interactive Polls**: Each poll features randomized initial vote counts (173-894 range) to simulate community engagement. The system tracks votes by user ID (for authenticated users) or IP address (for anonymous users) to prevent duplicate voting.

### IR Client Showcase

**Featured Companies Section**: Dedicated space for investor relations clients to showcase their companies with detailed profiles including logos, descriptions, sector information, market cap data, and website links.

**Company Q&A**: Interactive Q&A sessions with company leadership, presented in an accordion-style interface for easy navigation. Each Q&A includes the question, detailed answer, and attribution to both the person asking and answering.

### SEO & Analytics

The platform implements comprehensive SEO optimization including:

- Dynamic meta tags and Open Graph protocol for social media sharing
- JSON-LD structured data for articles following NewsArticle schema
- Google Analytics integration (ready for measurement ID configuration)
- Automatic page view tracking on route changes
- SEO-friendly URLs with article slugs

## Technical Architecture

### Database Schema

The platform uses a MySQL/TiDB database with the following core tables:

- **users**: Authentication and user profiles with role-based access (admin/user)
- **articles**: News content with categorization, tags, view counts, and timestamps
- **companies**: Company profiles with ticker symbols, exchange info, and metadata
- **articleCompanies**: Many-to-many relationship linking articles to mentioned companies
- **comments**: User comments on articles with moderation support
- **polls**: Poll questions with options stored as JSON arrays
- **pollVotes**: Individual vote records with user/IP tracking
- **newsletterSubscribers**: Email subscription management with frequency preferences
- **companyQA**: Q&A content for featured companies
- **contentGenerationLog**: Tracking for automated content generation runs

### Frontend Stack

- **React 19** with TypeScript for type-safe component development
- **Tailwind CSS 4** for responsive, utility-first styling
- **tRPC** for end-to-end type-safe API calls
- **Wouter** for lightweight client-side routing
- **shadcn/ui** components for consistent, accessible UI elements
- **Streamdown** for markdown rendering with streaming support

### Backend Stack

- **Express 4** server with tRPC integration
- **Drizzle ORM** for type-safe database operations
- **Manus OAuth** for authentication
- **Built-in LLM integration** for AI content generation
- **Yahoo Finance API** for market data

## Configuration & Setup

### Environment Variables

The platform requires the following environment variables (automatically configured in Manus hosting):

**System Variables** (pre-configured):
- `DATABASE_URL`: Database connection string
- `JWT_SECRET`: Session cookie signing
- `OAUTH_SERVER_URL`: Authentication backend
- `VITE_APP_ID`: OAuth application ID
- `BUILT_IN_FORGE_API_KEY`: Server-side API access
- `VITE_FRONTEND_FORGE_API_KEY`: Client-side API access

**Optional Configuration**:
- `VITE_GA_MEASUREMENT_ID`: Google Analytics tracking ID (set after deployment)

### Adding Google Analytics

After deployment:

1. Create a Google Analytics 4 property at https://analytics.google.com
2. Copy your Measurement ID (format: G-XXXXXXXXXX)
3. Open the Management UI → Settings → Secrets
4. Add `VITE_GA_MEASUREMENT_ID` with your measurement ID
5. Restart the server for changes to take effect

### Content Generation Activation

The automated content generation system is built but requires activation:

1. The cron job logic is in `server/cronJobs.ts`
2. To activate hourly generation, you'll need to set up a scheduled task or cron job that calls the content generation endpoint
3. Alternatively, you can manually trigger content generation through an admin interface (to be built)

## Adding IR Client Content

### Featured Companies

To add a featured company:

1. Access the database through Management UI → Database
2. Add a record to the `companies` table with:
   - `ticker`: Stock ticker symbol
   - `name`: Company name
   - `exchange`: NASDAQ, NYSE, or OTC
   - `isFeatured`: Set to true
   - `description`: Company overview
   - `sector`, `industry`: Classification
   - `websiteUrl`, `logoUrl`: Links to resources
   - `marketCap`: Current market capitalization

### Company Q&A

To add Q&A content:

1. First ensure the company exists in the `companies` table
2. Add records to the `companyQA` table with:
   - `companyId`: Reference to the company
   - `question`: The question text
   - `answer`: Detailed response
   - `askedBy`: Name of person asking (optional)
   - `answeredBy`: Name of person answering (e.g., "CEO John Smith")
   - `displayOrder`: Number for sorting (lower numbers appear first)

## Creating Polls

To create a new poll:

1. Access the database through Management UI → Database
2. Add a record to the `polls` table with:
   - `question`: Poll question text
   - `options`: JSON array of option strings, e.g., `["Option 1", "Option 2", "Option 3"]`
   - `initialVotes`: JSON array of random numbers (173-894 range), same length as options
   - `isActive`: Set to true to display on the site
   - `startDate`, `endDate`: Poll duration

Example:
```json
{
  "question": "What's the biggest challenge for small-cap companies?",
  "options": ["Lack of analyst coverage", "Limited liquidity", "Regulatory burden", "Access to capital"],
  "initialVotes": [423, 687, 234, 891],
  "isActive": true
}
```

## Deployment

### Publishing the Website

1. Ensure all features are tested and working
2. Click the **Publish** button in the Management UI header
3. Your site will be deployed to `https://[your-subdomain].manus.space`
4. Configure a custom domain in Settings → Domains if desired

### Post-Deployment Tasks

1. **Set up Google Analytics**: Add your measurement ID as described above
2. **Add initial content**: Populate featured companies and Q&A sessions
3. **Create first poll**: Add an active poll to engage visitors
4. **Test newsletter signup**: Verify email subscriptions work correctly
5. **Monitor analytics**: Track visitor engagement and popular content

## Future Enhancements

The platform is designed for extensibility. Recommended additions include:

- **Admin Dashboard**: Interface for managing articles, companies, polls, and content generation
- **Ad Integration**: Framework for display advertising and sponsored content
- **Advanced Search**: Filter articles by company, category, date range, and tags
- **Email Automation**: Automated newsletter delivery based on subscription preferences
- **Content Moderation**: Tools for reviewing and approving AI-generated content before publication
- **User Profiles**: Extended user features with saved articles, comment history, and preferences
- **RSS Feeds**: Syndication feeds for different categories and companies
- **Social Sharing**: Enhanced social media integration with custom share images

## Support & Maintenance

For technical issues or questions about the platform:

- Review the codebase documentation in `server/routers.ts` and `server/db.ts`
- Check the Management UI → Dashboard for system health and analytics
- Use the Database panel for direct data management
- Monitor server logs in `.manus-logs/` directory for debugging

The platform is built on Manus infrastructure with automatic scaling, SSL certificates, and built-in hosting, eliminating the need for external deployment services.
