import { getSnippets } from "@/lib/content";
import { CodeBlock } from "@/components/code-block";
import { getPlatformById } from "@/lib/platforms";

export default async function Home() {
  const snippets = getSnippets("authentication", "email-signup");

  return (
    <div className="max-w-3xl mx-auto p-8 flex flex-col gap-6">
      <h1 className="text-2xl font-semibold">Email Signup</h1>
      {snippets.map((snippet) => {
        const platform = getPlatformById(snippet.platformId);
        return (
          <div key={snippet.platformId} className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: platform?.color }}
              />
              <span className="text-sm font-medium">{platform?.name}</span>
            </div>
            <CodeBlock
              code={snippet.code}
              language={snippet.language}
              filename={snippet.filename}
            />
          </div>
        );
      })}
    </div>
  );
}
