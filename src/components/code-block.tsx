"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Copy, Check, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Platform } from "@/lib/types";

export function PlatformLogo({
  platform,
  size = 16,
}: {
  platform: Platform;
  size?: number;
}) {
  return (
    <Image
      src={platform.logo}
      alt={platform.name}
      width={size}
      height={size}
      unoptimized
      className="shrink-0 rounded-sm"
    />
  );
}

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleCopy}
      className="h-7 w-7 cursor-pointer text-muted-foreground hover:text-foreground"
    >
      {copied ? (
        <Check className="h-3.5 w-3.5" />
      ) : (
        <Copy className="h-3.5 w-3.5" />
      )}
    </Button>
  );
}

type Props = {
  highlightedHtml: string;
  code: string;
  filename?: string;
  editUrl?: string;
};

export function CodeBlock({ highlightedHtml, code, filename, editUrl }: Props) {
  return (
    <div className="overflow-hidden rounded-lg border border-border text-sm">
      <div className="flex items-center justify-between gap-2 border-b border-border bg-muted/40 px-3 py-1.5">
        <span className="font-mono text-xs text-muted-foreground">
          {filename ?? "index.ts"}
        </span>
        <div className="flex items-center gap-0.5">
          {editUrl && (
            <Link
              href={editUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <Pencil className="h-3.5 w-3.5" />
            </Link>
          )}
          <CopyButton code={code} />
        </div>
      </div>
      <div
        className="[&>pre]:m-0 [&>pre]:overflow-x-auto [&>pre]:p-4 [&>pre]:font-mono [&>pre]:text-sm [&>pre]:leading-relaxed"
        dangerouslySetInnerHTML={{ __html: highlightedHtml }}
      />
    </div>
  );
}
