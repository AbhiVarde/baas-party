import { notFound } from "next/navigation";
import { getCategories, getTasks, getSnippets } from "@/lib/content";
import { getPlatformById } from "@/lib/platforms";
import { CodeBlock } from "@/components/code-block";
import { TaskView } from "@/components/task-view";

type Props = {
  params: Promise<{ category: string; task: string }>;
};

export async function generateStaticParams() {
  const categories = getCategories();
  const params = [];
  for (const cat of categories) {
    const tasks = getTasks(cat.slug);
    for (const task of tasks) {
      params.push({ category: cat.slug, task: task.slug });
    }
  }
  return params;
}

export default async function TaskPage({ params }: Props) {
  const { category, task } = await params;
  const tasks = getTasks(category);
  const currentTask = tasks.find((t) => t.slug === task);

  if (!currentTask) notFound();

  const snippets = getSnippets(category, task);

  const blocks = await Promise.all(
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
  );

  const validBlocks = blocks.filter(
    (b): b is NonNullable<typeof b> => b !== null,
  );

  return (
    <TaskView
      blocks={validBlocks}
      categoryLabel={category.replace(/-/g, " ")}
      taskLabel={currentTask.label}
    />
  );
}
