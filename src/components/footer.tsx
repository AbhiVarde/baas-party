export function Footer() {
  return (
    <footer className="border-t border-border mt-auto py-6 lg:pl-56">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 px-6 text-xs text-muted-foreground sm:flex-row">
        <p>
          Built by{" "}
          <a
            href="https://abhivarde.in"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-foreground transition-colors"
          >
            abhivarde.in
          </a>
          {" · "}Inspired by{" "}
          <a
            href="https://component-party.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-foreground transition-colors"
          >
            component-party.dev
          </a>
        </p>
        <p>Snippets verified against official docs · June 2026</p>
      </div>
    </footer>
  );
}
