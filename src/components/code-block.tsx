import { codeToHtml } from "shiki";
import { CopyButton } from "./copy-button";

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
    <div className="rounded-lg border border-border overflow-hidden text-sm">
      <div className="flex items-center justify-between gap-2 border-b border-border bg-muted/40 px-3 py-1.5">
        <span className="text-xs text-muted-foreground font-mono">
          {filename ?? `index.${language === "typescript" ? "ts" : language}`}
        </span>
        <CopyButton code={code} />
      </div>
      <div
        className="[&>pre]:p-4 [&>pre]:overflow-x-auto [&>pre]:text-sm [&>pre]:leading-relaxed [&>pre]:m-0 [&>pre]:font-mono"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
