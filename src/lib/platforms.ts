import type { Platform } from "./types";

export const platforms: Platform[] = [
  {
    id: "supabase",
    name: "Supabase",
    color: "#3FCF8E",
    logo: "https://supabase.com/favicon/favicon-32x32.png",
    docsUrl: "https://supabase.com/docs",
  },
  {
    id: "appwrite",
    name: "Appwrite",
    color: "#FD366E",
    logo: "https://appwrite.io/images/logos/logo.svg",
    docsUrl: "https://appwrite.io/docs",
  },
  {
    id: "convex",
    name: "Convex",
    color: "#F3A445",
    logo: "https://www.convex.dev/favicon.ico",
    docsUrl: "https://docs.convex.dev",
  },
];

export function getPlatformById(id: string): Platform | undefined {
  return platforms.find((p) => p.id === id);
}
