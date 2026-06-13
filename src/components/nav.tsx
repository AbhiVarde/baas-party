"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  onNavigate,
}: {
  nav: NavItem[];
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-6">
      {nav.map((category) => (
        <div key={category.slug}>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-foreground">
            {category.label}
          </p>
          <ul className="flex flex-col gap-1">
            {category.tasks.map((task) => {
              const href = `/${category.slug}/${task.slug}`;
              const active = pathname === href;
              return (
                <li key={task.slug}>
                  <Link
                    href={href}
                    onClick={onNavigate}
                    className={cn(
                      "block rounded-md px-2 py-1.5 text-sm transition-colors cursor-pointer",
                      active
                        ? "bg-accent font-medium text-accent-foreground"
                        : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
                    )}
                  >
                    {task.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

export function Sidebar({ nav }: { nav: NavItem[] }) {
  return (
    <aside className="fixed top-14 left-0 hidden h-[calc(100vh-3.5rem)] w-56 overflow-y-auto border-r border-border px-4 py-6 scrollbar-hide lg:block">
      <NavLinks nav={nav} />
    </aside>
  );
}

export function MobileNav({ nav }: { nav: NavItem[] }) {
  const [open, setOpen] = useState(false);

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
        <SheetTitle className="mb-2 text-sm font-semibold">Menu</SheetTitle>
        <NavLinks nav={nav} onNavigate={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  );
}
