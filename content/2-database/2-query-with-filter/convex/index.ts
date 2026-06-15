import { query } from "./_generated/server";
import { v } from "convex/values";

export const getPublishedPosts = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    // Requires an explicit index mapping defined inside your convex/schema file
    return await ctx.db
      .query("posts")
      .withIndex("by_user_published", (q) =>
        q.eq("userId", args.userId).eq("published", true),
      )
      .collect();
  },
});
