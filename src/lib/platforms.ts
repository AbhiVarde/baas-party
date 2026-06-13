import type { Platform } from "./types";

export const platforms: Platform[] = [
  {
    id: "supabase",
    name: "Supabase",
    color: "#3FCF8E",
    docsUrl: "https://supabase.com/docs",
  },
  {
    id: "appwrite",
    name: "Appwrite",
    color: "#FD366E",
    docsUrl: "https://appwrite.io/docs",
  },
  {
    id: "convex",
    name: "Convex",
    color: "#F3A445",
    docsUrl: "https://docs.convex.dev",
  },
];

export function getPlatformById(id: string): Platform | undefined {
  return platforms.find((p) => p.id === id);
}
