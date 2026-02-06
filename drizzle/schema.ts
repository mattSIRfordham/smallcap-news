import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean, bigint, index } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Companies table for tracking small-cap companies
 */
export const companies = mysqlTable("companies", {
  id: int("id").autoincrement().primaryKey(),
  ticker: varchar("ticker", { length: 20 }).notNull().unique(),
  name: text("name").notNull(),
  exchange: mysqlEnum("exchange", ["NASDAQ", "NYSE", "OTC"]).notNull(),
  marketCap: bigint("marketCap", { mode: "number" }), // in USD
  sector: varchar("sector", { length: 100 }),
  industry: varchar("industry", { length: 100 }),
  description: text("description"),
  logoUrl: text("logoUrl"),
  websiteUrl: text("websiteUrl"),
  isFeatured: boolean("isFeatured").default(false).notNull(),
  featuredOrder: int("featuredOrder"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  tickerIdx: index("ticker_idx").on(table.ticker),
  featuredIdx: index("featured_idx").on(table.isFeatured),
}));

export type Company = typeof companies.$inferSelect;
export type InsertCompany = typeof companies.$inferInsert;

/**
 * Articles table for AI-generated news content
 */
export const articles = mysqlTable("articles", {
  id: int("id").autoincrement().primaryKey(),
  title: text("title").notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  imageUrl: text("imageUrl"),
  authorName: varchar("authorName", { length: 100 }).default("SmallCap News AI").notNull(),
  category: mysqlEnum("category", ["market_analysis", "company_news", "regulatory", "opinion", "featured"]).default("market_analysis").notNull(),
  tags: text("tags"), // JSON array of tags
  viewCount: int("viewCount").default(0).notNull(),
  isPublished: boolean("isPublished").default(true).notNull(),
  publishedAt: timestamp("publishedAt").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  slugIdx: index("slug_idx").on(table.slug),
  publishedIdx: index("published_idx").on(table.isPublished, table.publishedAt),
  categoryIdx: index("category_idx").on(table.category),
}));

export type Article = typeof articles.$inferSelect;
export type InsertArticle = typeof articles.$inferInsert;

/**
 * Article-Company relationship (many-to-many)
 */
export const articleCompanies = mysqlTable("article_companies", {
  id: int("id").autoincrement().primaryKey(),
  articleId: int("articleId").notNull(),
  companyId: int("companyId").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => ({
  articleIdx: index("article_idx").on(table.articleId),
  companyIdx: index("company_idx").on(table.companyId),
}));

export type ArticleCompany = typeof articleCompanies.$inferSelect;
export type InsertArticleCompany = typeof articleCompanies.$inferInsert;

/**
 * Comments on articles
 */
export const comments = mysqlTable("comments", {
  id: int("id").autoincrement().primaryKey(),
  articleId: int("articleId").notNull(),
  userId: int("userId").notNull(),
  content: text("content").notNull(),
  isApproved: boolean("isApproved").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  articleIdx: index("article_idx").on(table.articleId),
  userIdx: index("user_idx").on(table.userId),
}));

export type Comment = typeof comments.$inferSelect;
export type InsertComment = typeof comments.$inferInsert;

/**
 * Polls for topical issues
 */
export const polls = mysqlTable("polls", {
  id: int("id").autoincrement().primaryKey(),
  question: text("question").notNull(),
  options: text("options").notNull(), // JSON array of options
  initialVotes: text("initialVotes").notNull(), // JSON array of randomized initial vote counts
  articleId: int("articleId"), // Optional: associate with article
  isActive: boolean("isActive").default(true).notNull(),
  expiresAt: timestamp("expiresAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  articleIdx: index("article_idx").on(table.articleId),
  activeIdx: index("active_idx").on(table.isActive),
}));

export type Poll = typeof polls.$inferSelect;
export type InsertPoll = typeof polls.$inferInsert;

/**
 * Poll votes from users
 */
export const pollVotes = mysqlTable("poll_votes", {
  id: int("id").autoincrement().primaryKey(),
  pollId: int("pollId").notNull(),
  userId: int("userId"), // Nullable for anonymous votes
  optionIndex: int("optionIndex").notNull(),
  ipAddress: varchar("ipAddress", { length: 45 }), // For preventing duplicate anonymous votes
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => ({
  pollIdx: index("poll_idx").on(table.pollId),
  userIdx: index("user_idx").on(table.userId),
}));

export type PollVote = typeof pollVotes.$inferSelect;
export type InsertPollVote = typeof pollVotes.$inferInsert;

/**
 * Newsletter subscribers
 */
export const newsletterSubscribers = mysqlTable("newsletter_subscribers", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  userId: int("userId"), // Optional: link to user account
  isActive: boolean("isActive").default(true).notNull(),
  frequency: mysqlEnum("frequency", ["daily", "weekly", "monthly"]).default("weekly").notNull(),
  subscribedAt: timestamp("subscribedAt").defaultNow().notNull(),
  unsubscribedAt: timestamp("unsubscribedAt"),
}, (table) => ({
  emailIdx: index("email_idx").on(table.email),
  activeIdx: index("active_idx").on(table.isActive),
}));

export type NewsletterSubscriber = typeof newsletterSubscribers.$inferSelect;
export type InsertNewsletterSubscriber = typeof newsletterSubscribers.$inferInsert;

/**
 * Company Q&A entries for IR clients
 */
export const companyQA = mysqlTable("company_qa", {
  id: int("id").autoincrement().primaryKey(),
  companyId: int("companyId").notNull(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  askedBy: varchar("askedBy", { length: 100 }),
  answeredBy: varchar("answeredBy", { length: 100 }),
  displayOrder: int("displayOrder").default(0).notNull(),
  isPublished: boolean("isPublished").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  companyIdx: index("company_idx").on(table.companyId),
  publishedIdx: index("published_idx").on(table.isPublished),
}));

export type CompanyQA = typeof companyQA.$inferSelect;
export type InsertCompanyQA = typeof companyQA.$inferInsert;

/**
 * Content generation log for tracking AI article creation
 */
export const contentGenerationLog = mysqlTable("content_generation_log", {
  id: int("id").autoincrement().primaryKey(),
  articleId: int("articleId"),
  status: mysqlEnum("status", ["success", "failed", "skipped"]).notNull(),
  errorMessage: text("errorMessage"),
  generatedAt: timestamp("generatedAt").defaultNow().notNull(),
}, (table) => ({
  statusIdx: index("status_idx").on(table.status),
  generatedIdx: index("generated_idx").on(table.generatedAt),
}));

export type ContentGenerationLog = typeof contentGenerationLog.$inferSelect;
export type InsertContentGenerationLog = typeof contentGenerationLog.$inferInsert;
