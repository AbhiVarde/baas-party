"use client";

import { createContext, useContext, useState } from "react";
import { platforms } from "@/lib/platforms";

type PlatformContextType = {
  selected: string[];
  toggle: (id: string) => void;
  clear: () => void;
  selectDefaults: () => void;
};

const PlatformContext = createContext<PlatformContextType | null>(null);

export function PlatformProvider({ children }: { children: React.ReactNode }) {
  const [selected, setSelected] = useState<string[]>(
    platforms.slice(0, 2).map((p) => p.id),
  );

  function toggle(id: string) {
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((p) => p !== id);
      if (prev.length < 2) return [...prev, id];
      return [...prev.slice(1), id];
    });
  }

  function clear() {
    setSelected([]);
  }

  function selectDefaults() {
    setSelected(platforms.slice(0, 2).map((p) => p.id));
  }

  return (
    <PlatformContext.Provider
      value={{ selected, toggle, clear, selectDefaults }}
    >
      {children}
    </PlatformContext.Provider>
  );
}

export function usePlatforms() {
  const ctx = useContext(PlatformContext);
  if (!ctx)
    throw new Error("usePlatforms must be used within PlatformProvider");
  return ctx;
}
