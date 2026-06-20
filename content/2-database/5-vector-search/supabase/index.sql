-- Enable the extension once
CREATE EXTENSION IF NOT EXISTS vector;

-- Add a vector column to store embeddings
CREATE TABLE documents (
  id BIGSERIAL PRIMARY KEY,
  content TEXT,
  embedding VECTOR(1536)
);

-- HNSW index for fast approximate nearest-neighbor search
CREATE INDEX ON documents
  USING hnsw (embedding vector_cosine_ops);

-- Similarity search function
CREATE FUNCTION match_documents(
  query_embedding VECTOR(1536),
  match_threshold FLOAT,
  match_count INT
)
RETURNS TABLE (id BIGINT, content TEXT, similarity FLOAT)
LANGUAGE SQL STABLE AS $$
  SELECT id, content, 1 - (embedding <=> query_embedding) AS similarity
  FROM documents
  WHERE 1 - (embedding <=> query_embedding) > match_threshold
  ORDER BY embedding <=> query_embedding
  LIMIT match_count;
$$;

-- Querying from your app (supabase-js):
-- const { data, error } = await supabase.rpc("match_documents", {
--   query_embedding: embedding,
--   match_threshold: 0.8,
--   match_count: 5,
-- });