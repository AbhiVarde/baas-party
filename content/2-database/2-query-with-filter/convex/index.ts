import { query } from "./_generated/server";
import { v } from "convex/values";

export const getPublishedPosts = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("posts")
      .filter((q) =>
        q.and(
          q.eq(q.field("userId"), args.userId),
          q.eq(q.field("published"), true),
        ),
      )
      .collect();
  },
});
