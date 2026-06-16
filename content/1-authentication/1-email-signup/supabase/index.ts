import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_SUPABASE_PUBLISHABLE_KEY!,
);

const { data, error } = await supabase.auth.signUp({
  email: "user@example.com",
  password: "password123",
  options: { emailRedirectTo: `${location.origin}/auth/callback` },
});
