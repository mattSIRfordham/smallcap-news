# SmallCap Market News - Project TODO

## Database Schema & Core Infrastructure
- [x] Design database schema for articles, companies, polls, comments, newsletters
- [x] Create database tables and relationships
- [ ] Set up storage integration for company logos and images

## Financial Data Integration
- [x] Research and select financial data APIs (Alpha Vantage, Finnhub, or similar)
- [ ] Integrate market cap filtering for sub-$1B companies
- [ ] Set up data fetching for NASDAQ, NYSE, and OTC markets
- [ ] Create company profile data ingestion system

## AI Content Generation System
- [x] Build AI article generation using LLM integration
- [x] Implement market news aggregation and analysis
- [x] Create editorial voice with neutral-but-supportive tone
- [x] Set up hourly automated content generation with cron jobs (system ready, needs activation)
- [ ] Add content moderation and quality checks (future enhancement)

## Frontend UI & Design
- [x] Design homepage with news feed layout
- [x] Create article detail pages with SEO optimization
- [x] Build Featured Companies section for IR clients
- [x] Build Company Q&A section for IR client profiles
- [x] Implement responsive navigation and layout
- [ ] Add ad placement framework for monetization (future enhancement)

## User Features
- [x] Implement user authentication and profiles
- [x] Build comment system for articles
- [x] Create newsletter signup and management
- [ ] Add user preferences and settings (future enhancement)

## Polls System
- [x] Design poll creation and management interface
- [x] Implement randomized initial vote counts (173-894 range)
- [x] Build poll voting functionality
- [x] Display poll results on articles

## SEO & Analytics
- [x] Implement meta tags and Open Graph optimization
- [x] Add structured data (JSON-LD) for articles
- [x] Integrate Google Analytics trackingeate XML sitemap generation
- [ ] Optimize page load performance

## Admin Features
- [ ] Create admin dashboard for content management
- [ ] Build Featured Companies management interface
- [ ] Add Company Q&A content editor
- [ ] Implement poll creation and management tools

## Testing & Deployment
- [ ] Write unit tests for core functionality
- [ ] Test automated content generation
- [ ] Verify SEO implementation
- [ ] Create deployment checkpoint
- [ ] Document usage and admin procedures

## New Features (In Progress)

### Stock Screening Tool
- [x] Add stock screening database fields (float, additional metrics)
- [x] Create stock screener UI with filters (market cap, sector, float, exchange)
- [x] Build backend API for stock screening queries)
- [x] Add screener results page with sortable table
- [x] Integrate screener into main navigation

### User Content Submission
- [x] Create user submissions database table
- [x] Build submission form UI with rich text editor
- [x] Implement backend submission handling and validation
- [x] Create admin review interface for submissions (API ready, UI for future)
- [x] Add submission status tracking (pending, approved, rejected)

### Reusable Skill Creation
- [x] Initialize finance-news-builder skill
- [x] Document database schema patterns
- [x] Create content generation templates
- [x] Package UI components as references
- [x] Write comprehensive SKILL.md
- [x] Validate and deliver skill

## Real-Time Bid-Ask Spread Dashboard (In Progress)

### Backend Implementation
- [x] Create market data service for fetching real-time quotes
- [x] Implement bid-ask spread calculation logic
- [ ] Add database table for tracking spread history (optional enhancement)
- [x] Create tRPC endpoints for market data queries
- [x] Set up polling/refresh mechanism for live updates

### Frontend Dashboard
- [x] Create MarketTransparency page component
- [x] Build real-time quote display with bid/ask/spread
- [x] Implement spread percentage calculation and visualization
- [ ] Add historical spread charts using recharts (future enhancement)
- [x] Create company selector for multi-ticker monitoring
- [x] Add auto-refresh functionality for live updates
- [x] Integrate dashboard into main navigation

## Market Transparency Dashboard Enhancements (In Progress)

### Real Small-Cap Ticker Integration
- [x] Query companies table for actual small-cap stocks
- [x] Update default watchlist to use real nanocap/microcap tickers
- [x] Add ticker validation against database
- [ ] Display company metadata alongside quotes (future enhancement)

### Historical Spread Tracking
- [x] Create spread_history database table
- [x] Implement background job to log spread data periodically
- [x] Build historical spread query endpoints
- [x] Create spread trend charts using recharts
- [x] Add time range selector (1D, 7D, 30D, 90D)
- [x] Show spread volatility metrics

### Spread Alert System
- [x] Create user_spread_alerts database table
- [x] Build alert creation/management UI
- [x] Implement alert threshold checking logic
- [x] Add notification delivery when alerts trigger (backend ready)
- [x] Create alert history and status tracking
- [ ] Add email/in-app notification preferences (future enhancement)

## Spread Tracking Automation & Notifications (In Progress)

### Cron Job Setup
- [x] Create cron job scheduler for spread tracking
- [x] Configure 15-30 minute interval for data collection (20 min)
- [x] Add error handling and logging for background jobs
- [x] Test automated spread data collection (working in production)

### Database Population
- [x] Research and compile list of real nanocap/microcap companies
- [x] Create seed script to populate companies table
- [x] Add company metadata (ticker, name, exchange, market cap, sector)
- [x] Verify data quality and ticker validity (20 companies added)

### Notification Delivery
- [x] Integrate Manus notification API for alerts
- [x] Implement notification sending when alerts trigger
- [ ] Add notification preferences (in-app, email) (future enhancement)
- [x] Test notification delivery flow (integrated and tested)


## Design Enhancement (In Progress)

### Visual Design Improvements
- [x] Implement premium typography (Playfair Display + Inter)
- [x] Create sophisticated color palette (navy and gold theme)
- [x] Add subtle gradients and shadows for visual depth
- [x] Enhance header with elegant styling and better spacing
- [x] Improve homepage hero section with refined layout
- [x] Add smooth animations and transitions
- [x] Polish card designs with premium styling (hover effects)
- [x] Enhance button and interactive element designs
- [x] Improve overall spacing and visual hierarchy


## Rebranding to Undercap Stocks (In Progress)

### Site Name Updates
- [x] Update site title in Header component
- [x] Update SEO metadata and page titles
- [x] Update Footer branding
- [ ] Update VITE_APP_TITLE environment variable (managed by Manus UI)
- [x] Update package.json project name
- [x] Update all references in documentation

### Domain Preparation
- [x] Document new domains (undercapstocks.com, .io, .ai)
- [x] Update SEO canonical URLs for new primary domain (ready for primary domain)
- [x] Prepare domain binding instructions (see DOMAINS.md)
