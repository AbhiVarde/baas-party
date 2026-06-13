"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { PlatformLogo } from "@/components/code-block";
import { platforms } from "@/lib/platforms";
import type { CategorySection } from "@/lib/types";

export function AllContent({ sections }: { sections: CategorySection[] }) {
  const [selected, setSelected] = useState<string[]>(
    platforms.slice(0, 2).map((p) => p.id),
  );

  function toggle(id: string) {
    setSelected((prev) => {
      if (prev.includes(id)) {
        return prev.length > 1 ? prev.filter((p) => p !== id) : prev;
      }
      if (prev.length < 2) return [...prev, id];
      return [...prev.slice(1), id];
    });
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-section");
            if (id) {
              history.replaceState(null, "", `#${id}`);
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
  }, []);

  return (
    <>
      <div className="sticky top-14 z-10 border-b border-border bg-background/95 backdrop-blur-sm">
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

      <div className="mx-auto max-w-5xl px-6 py-10">
        {sections.map(({ category, taskSections }) => (
          <div key={category.slug} className="mb-20">
            <h2 className="mb-10 text-2xl font-bold tracking-tight">
              {category.label}
            </h2>
            <div className="flex flex-col gap-16">
              {taskSections.map(({ task, blocks }) => {
                const id = `${category.slug}-${task.slug}`;
                const visible = blocks.filter((b) =>
                  selected.includes(b.platform.id),
                );

                return (
                  <div
                    key={task.slug}
                    id={id}
                    data-section={id}
                    className="scroll-mt-28"
                  >
                    <h3 className="mb-6 text-lg font-semibold tracking-tight">
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
                      {visible.map(({ platform, node }) => (
                        <div
                          key={platform.id}
                          className="flex min-w-0 flex-col gap-2"
                        >
                          <div className="flex items-center gap-2">
                            <PlatformLogo platform={platform} />
                            <span className="text-sm font-medium">
                              {platform.name}
                            </span>
                          </div>
                          {node}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
