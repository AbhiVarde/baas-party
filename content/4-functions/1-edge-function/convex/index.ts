import { action } from "./_generated/server";
import { v } from "convex/values";

export const hello = action({
  args: { name: v.string() },
  handler: async (ctx, args) => {
    const response = await fetch("https://api.example.com/data");
    const data = await response.json();

    return { message: `Hello ${args.name}!`, data };
  },
});
