"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { PlatformLogo } from "@/components/code-block";
import type { Platform } from "@/lib/types";
import type { ReactNode } from "react";

type Block = {
  platform: Platform;
  node: ReactNode;
};

const MAX_SELECTED = 2;

export function TaskView({
  blocks,
  categoryLabel,
  taskLabel,
}: {
  blocks: Block[];
  categoryLabel: string;
  taskLabel: string;
}) {
  const [selected, setSelected] = useState<string[]>(
    blocks.slice(0, MAX_SELECTED).map((b) => b.platform.id),
  );

  function toggle(id: string) {
    setSelected((prev) => {
      if (prev.includes(id)) {
        return prev.length > 1 ? prev.filter((p) => p !== id) : prev;
      }
      if (prev.length < MAX_SELECTED) return [...prev, id];
      return [...prev.slice(1), id];
    });
  }

  const visible = blocks.filter((b) => selected.includes(b.platform.id));

  return (
    <>
      <div className="sticky top-14 z-10 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl gap-2 overflow-x-auto px-6 py-2.5 scrollbar-hide">
          {blocks.map(({ platform }) => {
            const active = selected.includes(platform.id);
            return (
              <button
                key={platform.id}
                onClick={() => toggle(platform.id)}
                className={cn(
                  "flex shrink-0 items-center gap-2 whitespace-nowrap rounded-md border px-3 py-1.5 text-sm font-medium transition-colors cursor-pointer",
                  active
                    ? "border-foreground/15 bg-accent text-foreground"
                    : "border-border text-muted-foreground hover:text-foreground hover:bg-accent/50",
                )}
              >
                <PlatformLogo platform={platform} />
                {platform.name}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-10">
        <div>
          <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {categoryLabel}
          </p>
          <h1 className="text-2xl font-semibold tracking-tight">{taskLabel}</h1>
        </div>

        <div
          className={cn(
            "grid gap-6",
            visible.length === 1 ? "grid-cols-1" : "grid-cols-1 xl:grid-cols-2",
          )}
        >
          {visible.map(({ platform, node }) => (
            <div key={platform.id} className="flex min-w-0 flex-col gap-2">
              <div className="flex items-center gap-2">
                <PlatformLogo platform={platform} />
                <span className="text-sm font-medium">{platform.name}</span>
              </div>
              {node}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
