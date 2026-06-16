import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_KEY!,
);

const { data, error } = await supabase
  .from("posts")
  .select("*")
  .eq("user_id", "user-123")
  .eq("published", true);
