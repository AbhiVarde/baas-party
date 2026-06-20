import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { action } from "./_generated/server";

// schema.ts
export default defineSchema({
  documents: defineTable({
    content: v.string(),
    embedding: v.array(v.float64()),
  }).vectorIndex("by_embedding", {
    vectorField: "embedding",
    dimensions: 1536,
  }),
});

// queries.ts
export const similarDocuments = action({
  args: { embedding: v.array(v.float64()) },
  handler: async (ctx, args) => {
    const results = await ctx.vectorSearch("documents", "by_embedding", {
      vector: args.embedding,
      limit: 5,
    });
    return results;
  },
});
