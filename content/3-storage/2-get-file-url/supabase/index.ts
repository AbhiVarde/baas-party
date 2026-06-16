import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_SUPABASE_PUBLISHABLE_KEY!,
);

// public url
const { data } = supabase.storage.from("uploads").getPublicUrl("hello.txt");

// signed url (private buckets)
const { data: signed, error } = await supabase.storage
  .from("uploads")
  .createSignedUrl("hello.txt", 3600);
