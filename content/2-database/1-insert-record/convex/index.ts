import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const insertPost = mutation({
  args: {
    title: v.string(),
    body: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = (await ctx.auth.getUserIdentity())?.subject;
    return await ctx.db.insert("posts", {
      title: args.title,
      body: args.body,
      userId,
    });
  },
});
