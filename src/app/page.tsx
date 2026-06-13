import { getCategories, getTasks, getSnippets } from "@/lib/content";

export default function Home() {
  const categories = getCategories();
  const tasks = getTasks("authentication");
  const snippets = getSnippets("authentication", "email-signup");

  return (
    <div style={{ padding: "2rem", fontFamily: "monospace" }}>
      <h2>Categories</h2>
      <pre>{JSON.stringify(categories, null, 2)}</pre>

      <h2>Tasks</h2>
      <pre>{JSON.stringify(tasks, null, 2)}</pre>

      <h2>Snippets</h2>
      <pre>{JSON.stringify(snippets, null, 2)}</pre>
    </div>
  );
}
