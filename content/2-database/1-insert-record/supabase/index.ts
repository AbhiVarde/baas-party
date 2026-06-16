import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_SUPABASE_PUBLISHABLE_KEY!,
);

const { data, error } = await supabase
  .from("posts")
  .insert({ title: "Hello World", body: "My first post", user_id: "user-123" })
  .select();
