import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import {
  screenStocks,
  getUniqueSectors,
  getScreenerStats
} from "./stockScreener";
import {
  createSubmission,
  getSubmissionsByStatus,
  getAllSubmissions,
  getUserSubmissions,
  updateSubmissionStatus
} from "./userSubmissions";
import {
  getRecentArticles,
  getArticleBySlug,
  getArticlesByCategory,
  incrementArticleViews,
  getArticleComments,
  createComment,
  getArticleCompanies,
  getFeaturedCompanies,
  getCompanyByTicker,
  getCompanyArticles,
  getCompanyQAs,
  subscribeNewsletter,
  getActivePoll,
  getPollVotes,
  createPollVote,
  hasUserVoted,
  getAllCompanies
} from "./db";

export const appRouter = router({
  system: systemRouter,
  
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  articles: router({
    getRecent: publicProcedure
      .input(z.object({ limit: z.number().optional() }))
      .query(async ({ input }) => {
        return await getRecentArticles(input.limit || 20);
      }),

    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        const article = await getArticleBySlug(input.slug);
        if (article) {
          await incrementArticleViews(article.id);
        }
        return article;
      }),

    getByCategory: publicProcedure
      .input(z.object({ 
        category: z.string(),
        limit: z.number().optional()
      }))
      .query(async ({ input }) => {
        return await getArticlesByCategory(input.category, input.limit || 20);
      }),

    getComments: publicProcedure
      .input(z.object({ articleId: z.number() }))
      .query(async ({ input }) => {
        return await getArticleComments(input.articleId);
      }),

    addComment: protectedProcedure
      .input(z.object({
        articleId: z.number(),
        content: z.string().min(1).max(1000)
      }))
      .mutation(async ({ input, ctx }) => {
        return await createComment({
          articleId: input.articleId,
          userId: ctx.user.id,
          content: input.content
        });
      }),

    getRelatedCompanies: publicProcedure
      .input(z.object({ articleId: z.number() }))
      .query(async ({ input }) => {
        return await getArticleCompanies(input.articleId);
      }),
  }),

  companies: router({
    getFeatured: publicProcedure.query(async () => {
      return await getFeaturedCompanies();
    }),

    getAll: publicProcedure
      .input(z.object({ limit: z.number().optional() }))
      .query(async ({ input }) => {
        return await getAllCompanies(input.limit || 100);
      }),

    getByTicker: publicProcedure
      .input(z.object({ ticker: z.string() }))
      .query(async ({ input }) => {
        return await getCompanyByTicker(input.ticker);
      }),

    getArticles: publicProcedure
      .input(z.object({ 
        companyId: z.number(),
        limit: z.number().optional()
      }))
      .query(async ({ input }) => {
        return await getCompanyArticles(input.companyId, input.limit || 10);
      }),

    getQAs: publicProcedure
      .input(z.object({ companyId: z.number() }))
      .query(async ({ input }) => {
        return await getCompanyQAs(input.companyId);
      }),
  }),

  newsletter: router({
    subscribe: publicProcedure
      .input(z.object({
        email: z.string().email(),
        frequency: z.enum(['daily', 'weekly', 'monthly']).optional()
      }))
      .mutation(async ({ input, ctx }) => {
        return await subscribeNewsletter({
          email: input.email,
          userId: ctx.user?.id,
          frequency: input.frequency || 'weekly'
        });
      }),
  }),

  polls: router({
    getActive: publicProcedure.query(async () => {
      const poll = await getActivePoll();
      if (!poll) return null;

      const votes = await getPollVotes(poll.id);
      const options = JSON.parse(poll.options);
      const initialVotes = JSON.parse(poll.initialVotes);

      // Calculate vote counts
      const voteCounts = options.map((_: string, idx: number) => {
        const realVotes = votes.filter(v => v.optionIndex === idx).length;
        return initialVotes[idx] + realVotes;
      });

      return {
        ...poll,
        options,
        voteCounts,
        totalVotes: voteCounts.reduce((a: number, b: number) => a + b, 0)
      };
    }),

    vote: publicProcedure
      .input(z.object({
        pollId: z.number(),
        optionIndex: z.number()
      }))
      .mutation(async ({ input, ctx }) => {
        const ipAddress = ctx.req.ip || ctx.req.headers['x-forwarded-for'] as string || 'unknown';
        
        // Check if already voted
        const alreadyVoted = await hasUserVoted(
          input.pollId,
          ctx.user?.id,
          ctx.user ? undefined : ipAddress
        );

        if (alreadyVoted) {
          throw new Error('You have already voted in this poll');
        }

        return await createPollVote({
          pollId: input.pollId,
          userId: ctx.user?.id,
          optionIndex: input.optionIndex,
          ipAddress: ctx.user ? undefined : ipAddress
        });
      }),

    hasVoted: publicProcedure
      .input(z.object({ pollId: z.number() }))
      .query(async ({ input, ctx }) => {
        const ipAddress = ctx.req.ip || ctx.req.headers['x-forwarded-for'] as string || 'unknown';
        return await hasUserVoted(
          input.pollId,
          ctx.user?.id,
          ctx.user ? undefined : ipAddress
        );
      }),
  }),

  screener: router({
    search: publicProcedure
      .input(z.object({
        minMarketCap: z.number().optional(),
        maxMarketCap: z.number().optional(),
        minFloat: z.number().optional(),
        maxFloat: z.number().optional(),
        sectors: z.array(z.string()).optional(),
        exchanges: z.array(z.enum(["NASDAQ", "NYSE", "OTC"])).optional(),
        minPrice: z.number().optional(),
        maxPrice: z.number().optional(),
        minVolume: z.number().optional(),
        sortBy: z.enum(["marketCap", "ticker", "price", "volume", "float"]).optional(),
        sortOrder: z.enum(["asc", "desc"]).optional(),
        limit: z.number().optional()
      }))
      .query(async ({ input }) => {
        return await screenStocks(input);
      }),

    getSectors: publicProcedure.query(async () => {
      return await getUniqueSectors();
    }),

    getStats: publicProcedure.query(async () => {
      return await getScreenerStats();
    }),
  }),

  submissions: router({
    create: publicProcedure
      .input(z.object({
        authorName: z.string().min(1).max(100),
        authorEmail: z.string().email().max(320),
        title: z.string().min(5).max(500),
        content: z.string().min(100),
        category: z.enum(["market_analysis", "company_news", "regulatory", "opinion"]),
        companyTickers: z.array(z.string()).optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        const submission = {
          ...input,
          userId: ctx.user?.id,
          companyTickers: input.companyTickers ? JSON.stringify(input.companyTickers) : null,
        };
        return await createSubmission(submission);
      }),

    getMySubmissions: protectedProcedure.query(async ({ ctx }) => {
      return await getUserSubmissions(ctx.user.id);
    }),

    getAll: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== "admin") {
        throw new Error("Unauthorized");
      }
      return await getAllSubmissions();
    }),

    getByStatus: protectedProcedure
      .input(z.object({
        status: z.enum(["pending", "approved", "rejected"])
      }))
      .query(async ({ input, ctx }) => {
        if (ctx.user.role !== "admin") {
          throw new Error("Unauthorized");
        }
        return await getSubmissionsByStatus(input.status);
      }),

    updateStatus: protectedProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(["approved", "rejected"]),
        reviewNotes: z.string().optional(),
        publishedArticleId: z.number().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== "admin") {
          throw new Error("Unauthorized");
        }
        return await updateSubmissionStatus(
          input.id,
          input.status,
          ctx.user.id,
          input.reviewNotes,
          input.publishedArticleId
        );
      }),
  }),
});

export type AppRouter = typeof appRouter;
