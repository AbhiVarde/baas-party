-- Enable RLS on the table
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Users can only read their own posts
CREATE POLICY "users can read own posts"
  ON posts FOR SELECT
  USING (auth.uid() = user_id);

-- Users can only insert their own posts
CREATE POLICY "users can insert own posts"
  ON posts FOR INSERT
  WITH CHECK (auth.uid() = user_id);