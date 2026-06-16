import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_SUPABASE_PUBLISHABLE_KEY!,
);

const page = 1;
const pageSize = 10;

const { data, error, count } = await supabase
  .from("posts")
  .select("*", { count: "exact" })
  .order("created_at", { ascending: false })
  .range((page - 1) * pageSize, page * pageSize - 1);
