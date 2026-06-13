import { codeToHtml } from "shiki";
import {
  getCategories,
  getTasks,
  getSnippets,
  getEditUrl,
} from "@/lib/content";
import { getPlatformById } from "@/lib/platforms";
import { AllContent } from "@/components/all-content";
import type { RenderedCategory } from "@/lib/types";

export default async function Home() {
  const categories = getCategories();

  const rendered: RenderedCategory[] = await Promise.all(
    categories.map(async (category) => {
      const tasks = getTasks(category.slug);
      const renderedTasks = await Promise.all(
        tasks.map(async (task) => {
          const snippets = getSnippets(category.slug, task.slug);
          const renderedSnippets = await Promise.all(
            snippets.map(async (snippet) => {
              const platform = getPlatformById(snippet.platformId);
              if (!platform) return null;

              const highlightedHtml = await codeToHtml(snippet.code, {
                lang: snippet.language,
                theme: "github-dark",
              });

              const editUrl = getEditUrl(
                category.slug,
                task.slug,
                snippet.platformId,
                snippet.filename,
              );

              return {
                platformId: snippet.platformId,
                filename: snippet.filename,
                code: snippet.code,
                highlightedHtml,
                editUrl,
              };
            }),
          );

          return {
            task,
            snippets: renderedSnippets.filter(
              (s): s is NonNullable<typeof s> => s !== null,
            ),
          };
        }),
      );

      return { category, tasks: renderedTasks };
    }),
  );

  return <AllContent sections={rendered} />;
}
