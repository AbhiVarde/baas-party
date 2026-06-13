"use client";

import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { PlatformLogo, CodeBlock } from "@/components/code-block";
import { platforms, getPlatformById } from "@/lib/platforms";
import { usePlatforms } from "@/components/platform-context";
import type { RenderedCategory } from "@/lib/types";

export function AllContent({ sections }: { sections: RenderedCategory[] }) {
  const { selected, toggle } = usePlatforms();

  useEffect(() => {
    if (selected.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-section");
            if (id) {
              const url = new URL(window.location.href);
              url.hash = id;
              window.history.replaceState(null, "", url.toString());
              window.dispatchEvent(
                new CustomEvent("sectionchange", { detail: id }),
              );
            }
          }
        }
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );

    document
      .querySelectorAll("[data-section]")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [selected.length]);

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] flex-col">
      <div className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl gap-2 overflow-x-auto px-6 py-2.5 scrollbar-hide">
          {platforms.map((platform) => {
            const active = selected.includes(platform.id);
            return (
              <button
                key={platform.id}
                onClick={() => toggle(platform.id)}
                className={cn(
                  "flex shrink-0 cursor-pointer items-center gap-2 whitespace-nowrap rounded-md border px-3 py-1.5 text-sm font-medium transition-colors",
                  active
                    ? "border-foreground/15 bg-accent text-foreground"
                    : "border-border text-muted-foreground hover:bg-accent/50 hover:text-foreground",
                )}
              >
                <PlatformLogo platform={platform} />
                {platform.name}
              </button>
            );
          })}
        </div>
      </div>

      {selected.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 text-center">
          <span className="text-5xl">🎉</span>
          <h1 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
            What is BaaS Party?
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            BaaS Party shows side-by-side code snippets for the same task across
            Supabase, Appwrite, and Convex. Pick one or two platforms above and
            compare auth, database, storage, and functions syntax instantly.
          </p>
        </div>
      ) : (
        <div className="mx-auto max-w-5xl px-6 py-4">
          {sections.map(({ category, tasks }) => (
            <div key={category.slug} className="mb-10">
              <h2 className="mb-3 text-xl font-semibold tracking-tight">
                {category.label}
              </h2>
              <div className="flex flex-col gap-16">
                {tasks.map(({ task, snippets }, idx) => {
                  const id = `${category.slug}-${task.slug}`;
                  const visible = snippets.filter((s) =>
                    selected.includes(s.platformId),
                  );

                  return (
                    <div
                      key={task.slug}
                      id={id}
                      data-section={id}
                      className={cn(
                        "scroll-mt-28",
                        idx > 0 && "border-t border-border pt-16",
                      )}
                    >
                      <h3 className="mb-6 text-lg font-medium tracking-tight">
                        {task.label}
                      </h3>
                      <div
                        className={cn(
                          "grid gap-6",
                          visible.length === 1
                            ? "grid-cols-1"
                            : "grid-cols-1 xl:grid-cols-2",
                        )}
                      >
                        {visible.map((snippet) => {
                          const platform = getPlatformById(snippet.platformId);
                          if (!platform) return null;
                          return (
                            <div
                              key={snippet.platformId}
                              className="flex min-w-0 flex-col gap-2"
                            >
                              <div className="flex items-center gap-2">
                                <PlatformLogo platform={platform} />
                                <span className="text-sm font-medium">
                                  {platform.name}
                                </span>
                              </div>
                              <CodeBlock
                                highlightedHtml={snippet.highlightedHtml}
                                code={snippet.code}
                                filename={snippet.filename}
                                editUrl={snippet.editUrl}
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      <footer className="mt-auto border-t border-border py-6">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 px-6 text-xs text-muted-foreground sm:flex-row">
          <p>
            Built by{" "}
            <a
              href="https://abhivarde.in"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 transition-colors hover:text-foreground"
            >
              abhivarde.in
            </a>
            {" · "}Inspired by{" "}
            <a
              href="https://component-party.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 transition-colors hover:text-foreground"
            >
              component-party.dev
            </a>
          </p>
          <p>Snippets verified against official docs · June 2026</p>
        </div>
      </footer>
    </div>
  );
}
