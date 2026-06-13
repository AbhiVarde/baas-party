import { mutation, query } from "./_generated/server";

export const getMyPosts = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthenticated");

    return await ctx.db
      .query("posts")
      .filter((q) => q.eq(q.field("userId"), identity.subject))
      .collect();
  },
});

export const createPost = mutation({
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthenticated");

    return await ctx.db.insert("posts", {
      ...args,
      userId: identity.subject,
    });
  },
});
