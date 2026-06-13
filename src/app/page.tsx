import { getCategories, getTasks, getSnippets } from "@/lib/content";
import { getPlatformById } from "@/lib/platforms";
import { CodeBlock } from "@/components/code-block";
import { AllContent } from "@/components/all-content";
import type { CategorySection, TaskBlock } from "@/lib/types";

export default async function Home() {
  const categories = getCategories();

  const sections: CategorySection[] = await Promise.all(
    categories.map(async (category) => {
      const tasks = getTasks(category.slug);
      const taskSections = await Promise.all(
        tasks.map(async (task) => {
          const snippets = getSnippets(category.slug, task.slug);
          const blocks: TaskBlock[] = (
            await Promise.all(
              snippets.map(async (snippet) => {
                const platform = getPlatformById(snippet.platformId);
                if (!platform) return null;
                return {
                  platform,
                  node: (
                    <CodeBlock
                      code={snippet.code}
                      language={snippet.language}
                      filename={snippet.filename}
                    />
                  ),
                };
              }),
            )
          ).filter((b): b is TaskBlock => b !== null);

          return { task, blocks };
        }),
      );
      return { category, taskSections };
    }),
  );

  return <AllContent sections={sections} />;
}
