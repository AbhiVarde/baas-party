import Link from "next/link";
import { getNav } from "@/lib/nav";

export default function Home() {
  const nav = getNav();
  const firstCategory = nav[0];
  const firstTask = firstCategory?.tasks[0];

  return (
    <div className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-5xl flex-col items-center justify-center gap-4 px-6 text-center">
      <span className="text-5xl">🎉</span>
      <h1 className="text-3xl font-semibold tracking-tight">BaaS Party</h1>
      <p className="max-w-md text-base text-muted-foreground">
        Compare Supabase, Appwrite, and Convex syntax side by side — real code,
        real tasks.
      </p>
      {firstCategory && firstTask && (
        <Link
          href={`/${firstCategory.slug}/${firstTask.slug}`}
          className="mt-2 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity cursor-pointer hover:opacity-90"
        >
          Browse snippets →
        </Link>
      )}
    </div>
  );
}
