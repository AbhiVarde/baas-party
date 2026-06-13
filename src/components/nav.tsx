"use client";

import { useState, useEffect, useRef } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/lib/nav";

function NavLinks({
  nav,
  activeId,
  onNavigate,
}: {
  nav: NavItem[];
  activeId: string;
  onNavigate?: () => void;
}) {
  const activeRef = useRef<HTMLAnchorElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeRef.current && containerRef.current) {
      activeRef.current.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [activeId]);

  return (
    <nav ref={containerRef} className="flex flex-col gap-6">
      {nav.map((category) => {
        const categoryActive = activeId.startsWith(category.slug + "-");

        return (
          <div key={category.slug}>
            <p
              className={cn(
                "mb-2 text-xs font-semibold uppercase tracking-wider transition-colors",
                categoryActive ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {category.label}
            </p>
            <ul className="flex flex-col gap-1">
              {category.tasks.map((task) => {
                const id = `${category.slug}-${task.slug}`;
                const active = activeId === id;

                return (
                  <li key={task.slug}>
                    <a
                      href={`#${id}`}
                      ref={active ? activeRef : undefined}
                      onClick={onNavigate}
                      className={cn(
                        "block cursor-pointer rounded-md px-2 py-1.5 text-sm transition-colors",
                        active
                          ? "bg-accent font-medium text-accent-foreground"
                          : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
                      )}
                    >
                      {task.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </nav>
  );
}

function useActiveSection() {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) setActiveId(hash);

    function handleSectionChange(e: Event) {
      setActiveId((e as CustomEvent<string>).detail);
    }

    window.addEventListener("sectionchange", handleSectionChange);
    return () =>
      window.removeEventListener("sectionchange", handleSectionChange);
  }, []);

  return activeId;
}

export function Sidebar({ nav }: { nav: NavItem[] }) {
  const activeId = useActiveSection();

  return (
    <aside className="fixed left-0 top-14 hidden h-[calc(100vh-3.5rem)] w-56 overflow-y-auto border-r border-border px-4 py-6 scrollbar-hide lg:block">
      <NavLinks nav={nav} activeId={activeId} />
    </aside>
  );
}

export function MobileNav({ nav }: { nav: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const activeId = useActiveSection();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 cursor-pointer lg:hidden"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-64 overflow-y-auto px-4 py-6 scrollbar-hide"
      >
        <SheetTitle className="mb-4 text-sm font-semibold">Menu</SheetTitle>
        <NavLinks
          nav={nav}
          activeId={activeId}
          onNavigate={() => setOpen(false)}
        />
      </SheetContent>
    </Sheet>
  );
}
