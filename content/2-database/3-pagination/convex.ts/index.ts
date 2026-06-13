import { query } from "./_generated/server";
import { v } from "convex/values";

export const getPaginatedPosts = query({
  args: { paginationOpts: v.any() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("posts")
      .order("desc")
      .paginate(args.paginationOpts);
  },
});
