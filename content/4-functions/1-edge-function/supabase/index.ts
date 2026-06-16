import { withSupabase } from "npm:@supabase/server";

export default {
  fetch: withSupabase({ auth: "user" }, async (req, ctx) => {
    const { name } = await req.json();

    return Response.json({
      message: `Hello ${name || ctx.user?.email || "world"}!`,
    });
  }),
};
