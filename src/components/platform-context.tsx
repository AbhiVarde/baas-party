"use client";

import { createContext, useContext, useState, useEffect, useRef } from "react";
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
  const didInit = useRef(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has("platforms")) {
      const value = params.get("platforms") ?? "";
      if (value === "") {
        setSelected([]);
      } else {
        const ids = value
          .split(",")
          .filter((id) => platforms.find((p) => p.id === id));
        setSelected(
          ids.length > 0 ? ids : platforms.slice(0, 2).map((p) => p.id),
        );
      }
    }
    didInit.current = true;
  }, []);

  useEffect(() => {
    if (!didInit.current) return;
    const url = new URL(window.location.href);
    url.searchParams.set("platforms", selected.join(","));
    if (selected.length === 0) url.hash = "";
    window.history.replaceState(null, "", url.toString());
  }, [selected]);

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
