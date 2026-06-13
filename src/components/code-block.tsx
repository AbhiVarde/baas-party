import Image from "next/image";
import { codeToHtml } from "shiki";
import { CopyClient } from "./code-block-client";
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

type Props = {
  code: string;
  language: string;
  filename?: string;
};

export async function CodeBlock({ code, language, filename }: Props) {
  const html = await codeToHtml(code, {
    lang: language,
    theme: "github-dark",
  });

  return (
    <div className="overflow-hidden rounded-lg border border-border text-sm">
      <div className="flex items-center justify-between gap-2 border-b border-border bg-muted/40 px-3 py-1.5">
        <span className="font-mono text-xs text-muted-foreground">
          {filename ?? `index.${language === "typescript" ? "ts" : language}`}
        </span>
        <CopyClient code={code} />
      </div>
      <div
        className="[&>pre]:m-0 [&>pre]:overflow-x-auto [&>pre]:p-4 [&>pre]:font-mono [&>pre]:text-sm [&>pre]:leading-relaxed"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
