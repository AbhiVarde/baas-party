import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

const file = new File(["hello"], "hello.txt", { type: "text/plain" });

const { data, error } = await supabase.storage
  .from("uploads")
  .upload("hello.txt", file, { upsert: true });
